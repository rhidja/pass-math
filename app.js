const STORE_KEY = 'pass-maths-biostats-v1';
const EXAM_MINUTES = 60;
const PASS_MARK = 10; // seuil indicatif, note sur 20
const MASTERY_MIN = 3; // questions minimum pour qu'un objectif soit « Maîtrisé »
const MASTERY_RATE = 0.8;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
// Rendu des formules LaTeX écrites entre \( … \) dans les données (KaTeX, fourni dans vendor/).
function math(el) {
  if (!el || typeof renderMathInElement !== 'function') return;
  renderMathInElement(el, { delimiters: [{ left: '\\(', right: '\\)', display: false }], throwOnError: false });
}
const pad = n => String(n).padStart(2, '0');
const letter = i => String.fromCharCode(65 + i);
const pct = (ok, total) => total ? Math.round(ok / total * 100) : 0;
const domainOf = id => DOMAINS.find(d => d.id === id);
const objectiveOf = id => OBJECTIVES.find(o => o.id === id);
const coursesFor = objId => COURSES.map((c, i) => ({ c, i })).filter(x => x.c.o.includes(objId));
const examSize = DOMAINS.reduce((n, d) => n + d.examCount, 0);

// Identifiant stable dérivé de l'énoncé : ajouter ou réordonner des questions ne casse pas la progression.
function hash(text) {
  let h = 5381;
  for (const ch of text) h = ((h << 5) + h + ch.codePointAt(0)) | 0;
  return (h >>> 0).toString(36);
}
QUESTIONS.forEach(q => {
  q.id = hash(q.q);
  q.multi = Array.isArray(q.c);
  q.correct = q.multi ? q.c : [q.c];
});

function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const answerOrder = q => shuffle(q.a.map((_, i) => i));
const isRight = (q, picked) => picked.length === q.correct.length && q.correct.every(i => picked.includes(i));

// ── Stockage local ───────────────────────────────────────────────────────────
// answers : id de question → dernier résultat ; read : titre de cours → lu ;
// mastered : objectif → case « Je maîtrise » cochée ; exams : 20 derniers examens.
function emptyStore() { return { answers: {}, read: {}, mastered: {}, exams: [] }; }
function loadStore() {
  try { return { ...emptyStore(), ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; }
  catch { return emptyStore(); }
}
let store = loadStore();
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* stockage indisponible */ }
}
const isRead = i => !!store.read[COURSES[i].title];
const readCount = () => COURSES.filter((_, i) => isRead(i)).length;

// ── État d'un objectif ───────────────────────────────────────────────────────
function objectiveStats(id) {
  const qs = QUESTIONS.filter(q => q.o === id);
  const results = qs.map(q => store.answers[q.id]).filter(r => r !== undefined);
  const ok = results.filter(Boolean).length;
  const computed = results.length >= MASTERY_MIN && ok / results.length >= MASTERY_RATE;
  const started = results.length > 0 || coursesFor(id).some(x => isRead(x.i));
  const status = computed || store.mastered[id] ? 'mastered' : started ? 'started' : 'new';
  return { pool: qs.length, seen: results.length, ok, status };
}
const STATUS_LABEL = { new: 'À découvrir', started: 'En cours', mastered: 'Maîtrisé' };

// ── Navigation ───────────────────────────────────────────────────────────────
function showView(name) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  $$('.view').forEach(v => v.classList.toggle('hidden', v.id !== `${name}-view`));
  if (name === 'programme') renderProgramme();
  if (name === 'courses') renderCourses();
  if (name === 'progress') renderProgress();
}
$$('.tab').forEach(t => t.onclick = () => showView(t.dataset.view));

function goToCourse(i) {
  showView('courses');
  openCourse(i);
}
function goToPractice(filter) {
  setFilter(filter);
  showView('quiz');
  $('#quiz-view').scrollIntoView({ behavior: 'smooth' });
}
// Délégation : liens vers un cours ou vers un entraînement filtré, où qu'ils soient.
document.addEventListener('click', e => {
  const course = e.target.closest('[data-open-course]');
  if (course) return goToCourse(+course.dataset.openCourse);
  const train = e.target.closest('[data-train]');
  if (train) return goToPractice(train.dataset.train);
});

// ── Programme ────────────────────────────────────────────────────────────────
function renderProgramme() {
  const mastered = OBJECTIVES.filter(o => objectiveStats(o.id).status === 'mastered').length;
  $('#programme-root').innerHTML = `
    <div class="global-progress">
      <div><strong>${mastered} / ${OBJECTIVES.length}</strong> objectifs maîtrisés</div>
      <div class="bar good"><i style="width:${pct(mastered, OBJECTIVES.length)}%"></i></div>
      <small>« Maîtrisé » : au moins ${MASTERY_RATE * 100} % de bonnes réponses sur au moins ${MASTERY_MIN} questions, ou case « Je maîtrise » cochée.</small>
    </div>
    ${DOMAINS.map(d => `<div class="domain-block">
      <div class="domain-head"><span>DOMAINE ${d.id}</span><h3>${esc(d.name)}</h3><small>${d.weight} % du programme</small></div>
      <div class="objectives">${OBJECTIVES.filter(o => o.d === d.id).map(objectiveHtml).join('')}</div>
    </div>`).join('')}`;
  math($('#programme-root'));
  $$('[data-master]').forEach(box => box.onchange = () => {
    if (box.checked) store.mastered[box.dataset.master] = true;
    else delete store.mastered[box.dataset.master];
    save();
    renderProgramme();
  });
}

function objectiveHtml(o) {
  const s = objectiveStats(o.id);
  return `<article class="objective">
    <div class="objective-head">
      <span class="obj-id">${esc(o.id)}</span>
      <h4>${esc(o.title)}</h4>
      <span class="pill ${s.status}">${STATUS_LABEL[s.status]}</span>
    </div>
    <ul class="notions">${o.notions.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    <div class="objective-foot">
      <span class="modules">Cours : ${coursesFor(o.id).map(({ c, i }) =>
        `<button class="link" type="button" data-open-course="${i}">${pad(i + 1)}. ${esc(c.title)}</button>`).join(' ')}</span>
      <span class="obj-stats">${s.seen ? `${pct(s.ok, s.seen)} % de réussite` : 'Pas encore de réponse'} · ${s.seen}/${s.pool} questions vues</span>
      <label class="check"><input type="checkbox" data-master="${esc(o.id)}" ${store.mastered[o.id] ? 'checked' : ''}> Je maîtrise</label>
      <button class="ghost small" type="button" data-train="o:${esc(o.id)}">S’entraîner</button>
    </div>
  </article>`;
}

// ── Cours ────────────────────────────────────────────────────────────────────
function renderCourseCount() {
  $('#course-count').textContent = `${COURSES.length} modules · ${readCount()} lu(s)`;
}

function renderCourses() {
  renderCourseCount();
  $('#course-list').innerHTML = DOMAINS.map(d => {
    const items = COURSES.map((c, i) => ({ c, i })).filter(x => x.c.d === d.id);
    return `<div class="domain-block">
      <div class="domain-head"><span>DOMAINE ${d.id}</span><h3>${esc(d.name)}</h3><small>${d.weight} % du programme</small></div>
      <div class="course-grid">${items.map(({ c, i }) => `
        <article class="course ${isRead(i) ? 'read' : ''}">
          <span class="index">${pad(i + 1)}${isRead(i) ? ' <em class="badge-read">LU ✓</em>' : ''}</span>
          <h3>${(c.title)}</h3><p>${(c.summary)}</p>
          <span class="objs">${c.o.join(' · ')}</span>
          <button type="button" data-course="${i}">Lire le cours →</button>
        </article>`).join('')}
      </div>
    </div>`;
  }).join('');
  $$('[data-course]').forEach(b => b.onclick = () => openCourse(+b.dataset.course));
  math($('#course-list'));
}

function openCourse(i) {
  const c = COURSES[i];
  store.read[c.title] = true;
  save();
  renderCourseCount();
  const next = COURSES[i + 1];
  $('#course-list').innerHTML = `<article class="lesson">
    <span class="index">${pad(i + 1)} / DOMAINE ${c.d} · ${esc(domainOf(c.d).name.toUpperCase())}</span>
    <h3>${(c.title)}</h3>
    <p class="lead">${(c.summary)}</p>
    <div class="covers"><strong>Objectifs du programme couverts</strong>
      <ul>${c.o.map(id => `<li><b>${esc(id)}</b> ${esc(objectiveOf(id).title)}</li>`).join('')}</ul></div>
    ${c.sections.map(s => `<section class="${s.extra ? 'extra' : ''}">
      <h4>${(s.h)}${s.extra ? ' <span class="tag">Complément · hors programme</span>' : ''}</h4>
      ${s.p ? `<p>${(s.p)}</p>` : ''}
      ${s.points ? `<ul>${s.points.map(p => `<li>${(p)}</li>`).join('')}</ul>` : ''}
    </section>`).join('')}
    <div class="lesson-nav">
      <button class="back" type="button">← Tous les cours</button>
      <button class="ghost" type="button" data-train="o:${c.o.join(',')}">S’entraîner sur ces objectifs</button>
      ${next ? `<button class="next" type="button" data-course="${i + 1}">Module suivant : ${next.title} →</button>` : ''}
    </div>
  </article>`;
  math($('#course-list'));
  $('.lesson .back').onclick = renderCourses;
  $$('.lesson [data-course]').forEach(b => b.onclick = () => openCourse(+b.dataset.course));
  $('#courses-view').scrollIntoView({ behavior: 'smooth' });
}

// ── Entraînement ─────────────────────────────────────────────────────────────
// Filtres : 'all', 'new', 'review', 'd:<domaine>' ou 'o:<objectif>[,<objectif>…]'.
const practice = { filter: 'all', list: [], index: 0, streak: 0, picked: [], session: {}, orders: {} };

function filteredQuestions(filter) {
  if (filter === 'all') return QUESTIONS;
  if (filter === 'review') return QUESTIONS.filter(q => store.answers[q.id] === false);
  if (filter === 'new') return QUESTIONS.filter(q => store.answers[q.id] === undefined);
  const [kind, value] = filter.split(':');
  if (kind === 'd') return QUESTIONS.filter(q => q.d === +value);
  const ids = value.split(',');
  return QUESTIONS.filter(q => ids.includes(q.o));
}

function setFilter(filter) {
  Object.assign(practice, { filter, list: shuffle(filteredQuestions(filter)), index: 0, picked: [], session: {}, orders: {} });
  renderFilters();
  renderPractice();
}

function renderFilters() {
  const entries = [
    ['all', 'Toutes les questions'],
    ['new', 'Jamais répondues'],
    ['review', 'Erreurs à revoir'],
    ...DOMAINS.map(d => [`d:${d.id}`, `${d.id}. ${d.name}`])
  ];
  $('#total').textContent = QUESTIONS.length;
  const objFilter = practice.filter.startsWith('o:') ? practice.filter.slice(2).split(',') : null;
  $('#active-filter').innerHTML = objFilter ? `<div class="active-filter">
      <span>Objectif${objFilter.length > 1 ? 's' : ''} ${objFilter.map(esc).join(' · ')}
        <small>${filteredQuestions(practice.filter).length} questions</small></span>
      <button type="button" id="clear-filter" aria-label="Retirer le filtre">✕</button>
    </div>` : '';
  if (objFilter) $('#clear-filter').onclick = () => setFilter('all');
  $('#categories').innerHTML = entries.map(([key, label]) =>
    `<button type="button" class="category ${key === practice.filter ? 'active' : ''} ${key === 'review' ? 'review' : ''}" data-filter="${key}">${esc(label)}<span>${filteredQuestions(key).length}</span></button>`
  ).join('');
  $$('[data-filter]').forEach(b => b.onclick = () => setFilter(b.dataset.filter));
}

function renderStats() {
  const results = QUESTIONS.map(q => store.answers[q.id]).filter(r => r !== undefined);
  $('#answered').textContent = results.length;
  $('#accuracy').textContent = results.length ? `${pct(results.filter(Boolean).length, results.length)}%` : '--';
  $('#streak').textContent = practice.streak;
}

function answersHtml(q, order, picked, reveal) {
  return order.map((ai, pos) => {
    const cls = ['answer'];
    if (q.multi) cls.push('multi');
    if (picked.includes(ai)) cls.push('selected');
    if (reveal && q.correct.includes(ai)) cls.push('correct');
    if (reveal && picked.includes(ai) && !q.correct.includes(ai)) cls.push('incorrect');
    return `<button type="button" class="${cls.join(' ')}" data-answer="${ai}" ${reveal ? 'disabled' : ''}><b>${letter(pos)}</b><span>${esc(q.a[ai])}</span></button>`;
  }).join('');
}
const expectedLetters = (q, order) => order.map((ai, pos) => q.correct.includes(ai) ? letter(pos) : null).filter(Boolean).join(', ');
const objectiveLabel = q => `${esc(q.o)} · ${esc(objectiveOf(q.o).title)}`;

function renderPractice() {
  const { list, index } = practice;
  const card = $('#quiz-card');
  if (!list.length) {
    const review = practice.filter === 'review';
    card.innerHTML = `<div class="empty"><h2>${review ? 'Aucune erreur à revoir 🎉' : 'Aucune question ici'}</h2>
      <p>${review ? 'Bravo : toutes tes réponses enregistrées sont justes. Continue avec de nouvelles questions.' : 'Choisis un autre filtre.'}</p>
      <button type="button" class="next" id="go-new">Questions jamais répondues →</button></div>`;
    $('#go-new').onclick = () => setFilter('new');
    return;
  }
  const q = list[index];
  const order = practice.orders[q.id] ||= answerOrder(q);
  const done = practice.session[q.id];
  const picked = done || practice.picked;
  const ok = done && isRight(q, done);

  card.innerHTML = `
    <div class="quiz-top"><small>QUESTION ${pad(index + 1)} / ${pad(list.length)}</small><b>DOMAINE ${q.d}</b></div>
    <div class="track"><i style="width:${(index + 1) / list.length * 100}%"></i></div>
    <div class="question">
      <label>OBJECTIF ${objectiveLabel(q)}</label>
      <h2>${esc(q.q)}</h2>
      ${q.multi && !done ? `<p class="hint">Plusieurs réponses attendues : sélectionne ${q.correct.length} réponses puis valide.</p>` : ''}
      <div>${answersHtml(q, order, picked, !!done)}</div>
      ${done ? `<div class="feedback ${ok ? '' : 'wrong'}"><strong>${ok ? 'Bonne réponse' : 'À revoir'}</strong>
        <p class="solution">Réponse${q.multi ? 's' : ''} attendue${q.multi ? 's' : ''} : ${expectedLetters(q, order)}</p>
        <p>${esc(q.e)}</p></div>` : ''}
    </div>
    <footer>
      <small>${done ? 'Touche Entrée pour continuer' : q.multi ? `${practice.picked.length} / ${q.correct.length} sélectionnée(s)` : 'Choisis une réponse (touches A à D)'}</small>
      <button type="button" class="next" id="next" ${!done && (!q.multi || practice.picked.length !== q.correct.length) ? 'disabled' : ''}>${done ? 'Question suivante →' : 'Valider la réponse'}</button>
    </footer>`;

  math(card);
  if (!done) $$('#quiz-card [data-answer]').forEach(b => b.onclick = () => pickPractice(+b.dataset.answer));
  $('#next').onclick = () => done ? nextPractice() : submitPractice();
}

function pickPractice(ai) {
  const q = practice.list[practice.index];
  if (!q.multi) {
    practice.picked = [ai];
    submitPractice();
    return;
  }
  const p = practice.picked;
  practice.picked = p.includes(ai) ? p.filter(x => x !== ai) : p.length < q.correct.length ? [...p, ai] : p;
  renderPractice();
}

function submitPractice() {
  const q = practice.list[practice.index];
  const ok = isRight(q, practice.picked);
  practice.session[q.id] = practice.picked;
  practice.picked = [];
  practice.streak = ok ? practice.streak + 1 : 0;
  store.answers[q.id] = ok;
  save();
  renderPractice();
  renderStats();
  renderFilters();
}

function nextPractice() {
  practice.index++;
  if (practice.index >= practice.list.length) {
    // Fin de la série : liste recalculée et mélangée (utile pour « Erreurs à revoir »).
    setFilter(practice.filter);
    return;
  }
  renderPractice();
  $('#quiz-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Examen blanc ─────────────────────────────────────────────────────────────
let exam = null;
const formatMark = n => n.toFixed(1).replace('.', ',');

function startExam() {
  const drawn = DOMAINS.flatMap(d => shuffle(QUESTIONS.filter(q => q.d === d.id)).slice(0, d.examCount));
  exam = {
    items: shuffle(drawn).map(q => ({ q, order: answerOrder(q), picked: [], flagged: false })),
    current: 0,
    end: Date.now() + EXAM_MINUTES * 60000,
    result: null
  };
  exam.timer = setInterval(tickExam, 1000);
  renderExam();
}

function tickExam() {
  const left = Math.max(0, exam.end - Date.now());
  const el = $('#timer');
  if (el) {
    el.textContent = `${pad(Math.floor(left / 60000))}:${pad(Math.floor(left / 1000) % 60)}`;
    el.classList.toggle('warn', left < 5 * 60000);
  }
  if (!left) finishExam();
}

function finishExam() {
  clearInterval(exam.timer);
  const byDomain = Object.fromEntries(DOMAINS.map(d => [d.id, { ok: 0, total: 0 }]));
  let ok = 0;
  exam.items.forEach(it => {
    it.right = isRight(it.q, it.picked);
    byDomain[it.q.d].total++;
    if (it.right) { ok++; byDomain[it.q.d].ok++; }
    if (it.picked.length) store.answers[it.q.id] = it.right;
  });
  // Note estimée : règle linéaire sur 20, sans points négatifs (le barème réel dépend de la faculté).
  const score = Math.round(200 * ok / exam.items.length) / 10;
  exam.result = { ok, total: exam.items.length, score, passed: score >= PASS_MARK, byDomain };
  store.exams = [{ date: Date.now(), ...exam.result }, ...store.exams].slice(0, 20);
  save();
  renderStats();
  renderFilters();
  renderExam();
}

function renderExam() {
  const root = $('#exam-root');
  if (!exam) return renderExamIntro(root);
  if (exam.result) return renderExamResult(root);

  const it = exam.items[exam.current];
  const { q } = it;
  const answeredCount = exam.items.filter(x => x.picked.length).length;
  root.innerHTML = `<div class="exam-layout">
    <article class="quiz-card">
      <div class="quiz-top"><small>QUESTION ${pad(exam.current + 1)} / ${pad(exam.items.length)}</small>
        <button type="button" class="flag ${it.flagged ? 'on' : ''}" id="flag">⚑ ${it.flagged ? 'Marquée pour révision' : 'Marquer pour révision'}</button></div>
      <div class="track"><i style="width:${(exam.current + 1) / exam.items.length * 100}%"></i></div>
      <div class="question">
        <h2>${esc(q.q)}</h2>
        ${q.multi ? `<p class="hint">Sélectionne ${q.correct.length} réponses.</p>` : ''}
        <div>${answersHtml(q, it.order, it.picked, false)}</div>
      </div>
      <footer class="exam-footer">
        <button type="button" class="ghost" id="prev" ${exam.current === 0 ? 'disabled' : ''}>← Précédente</button>
        <button type="button" class="next" id="exam-next">${exam.current === exam.items.length - 1 ? 'Terminer l’examen' : 'Suivante →'}</button>
      </footer>
    </article>
    <aside class="exam-side">
      <div class="timer-box"><small>Temps restant</small><strong id="timer">--:--</strong></div>
      <p class="exam-progress">${answeredCount} / ${exam.items.length} répondues</p>
      <div class="exam-grid">${exam.items.map((x, i) =>
        `<button type="button" class="${x.picked.length ? 'done' : ''} ${x.flagged ? 'flagged' : ''} ${i === exam.current ? 'current' : ''}" data-goto="${i}">${i + 1}</button>`
      ).join('')}</div>
      <p class="legend"><i class="l-done"></i>Répondue <i class="l-flag"></i>Marquée <i class="l-current"></i>En cours</p>
      <button type="button" class="finish" id="finish">Terminer l’examen</button>
    </aside>
  </div>`;
  math(root);
  tickExam();

  $$('#exam-root [data-answer]').forEach(b => b.onclick = () => {
    const ai = +b.dataset.answer;
    if (!q.multi) it.picked = [ai];
    else if (it.picked.includes(ai)) it.picked = it.picked.filter(x => x !== ai);
    else if (it.picked.length < q.correct.length) it.picked = [...it.picked, ai];
    renderExam();
  });
  $$('[data-goto]').forEach(b => b.onclick = () => { exam.current = +b.dataset.goto; renderExam(); });
  $('#flag').onclick = () => { it.flagged = !it.flagged; renderExam(); };
  $('#prev').onclick = () => { exam.current--; renderExam(); };
  $('#exam-next').onclick = () => exam.current === exam.items.length - 1 ? confirmFinish() : (exam.current++, renderExam());
  $('#finish').onclick = confirmFinish;
}

function confirmFinish() {
  const missing = exam.items.filter(x => x.picked.length < x.q.correct.length).length;
  const flagged = exam.items.filter(x => x.flagged).length;
  const warn = [missing && `${missing} question(s) sans réponse complète`, flagged && `${flagged} question(s) marquée(s) pour révision`].filter(Boolean).join(' et ');
  if (confirm(warn ? `Il reste ${warn}. Terminer quand même ?` : 'Terminer l’examen et voir le résultat ?')) finishExam();
}

function renderExamIntro(root) {
  root.innerHTML = `<div class="exam-intro">
    <div class="intro-card">
      <label>SIMULATION D’ÉPREUVE</label>
      <h2>Examen blanc chronométré</h2>
      <ul>
        <li><b>${examSize} QCM</b> tirés au hasard dans la banque de ${QUESTIONS.length} questions</li>
        <li><b>${EXAM_MINUTES} minutes</b> avec chronomètre ; l’examen se termine automatiquement à zéro</li>
        <li>Répartition selon la pondération du programme : ${DOMAINS.map(d => `D${d.id} ${d.examCount} q.`).join(' · ')}</li>
        <li>Correction uniquement à la fin</li>
        <li>Note estimée sur 20 (1 point par bonne réponse, sans points négatifs) ; seuil indicatif <b>${PASS_MARK}/20</b></li>
      </ul>
      <p class="muted">Ce format est une simulation interne. Le nombre de questions, la durée et le barème réels dépendent de ta faculté : réfère-toi à ses modalités officielles.</p>
      <button type="button" class="next" id="start-exam">Commencer l’examen →</button>
    </div>
    ${historyHtml()}
  </div>`;
  $('#start-exam').onclick = startExam;
}

function renderExamResult(root) {
  const r = exam.result;
  const wrong = exam.items.filter(x => !x.right);
  const missedObjectives = [...new Set(wrong.map(x => x.q.o))].sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
  root.innerHTML = `<div class="result">
    <div class="result-head ${r.passed ? 'pass' : 'fail'}">
      <div><label>${r.passed ? 'RÉUSSI' : 'NON RÉUSSI'}</label><strong>${formatMark(r.score)}<small> / 20</small></strong>
      <p>${r.ok} bonne(s) réponse(s) sur ${r.total} · note estimée, seuil indicatif ${PASS_MARK}/20</p></div>
      <div class="result-actions"><button type="button" class="next" id="restart">Nouvel examen</button>
      ${wrong.length ? '<button type="button" class="ghost" id="to-review">Revoir mes erreurs en entraînement</button>' : ''}</div>
    </div>
    <h3 class="sub">Résultats par domaine</h3>
    ${domainBars(r.byDomain)}
    ${missedObjectives.length ? `<h3 class="sub">Objectifs à retravailler (${missedObjectives.length})</h3>
      <ul class="missed">${missedObjectives.map(id => {
        const first = coursesFor(id)[0];
        return `<li><b>${esc(id)}</b> ${esc(objectiveOf(id).title)}
          ${first ? `<button type="button" class="link" data-open-course="${first.i}">Revoir le cours « ${esc(first.c.title)} » →</button>` : ''}</li>`;
      }).join('')}</ul>` : ''}
    <h3 class="sub">Corrections (${wrong.length})</h3>
    <div class="corrections">${wrong.map(x => `<details>
      <summary><span class="dom">${esc(x.q.o)}</span><span>${esc(x.q.q)}</span></summary>
      <div><p class="muted">Objectif ${objectiveLabel(x.q)} · ${x.picked.length ? `ta réponse : ${x.order.map((ai, pos) => x.picked.includes(ai) ? letter(pos) : null).filter(Boolean).join(', ')}` : 'sans réponse'} · attendu : ${expectedLetters(x.q, x.order)}</p>
      ${answersHtml(x.q, x.order, x.picked, true)}<p class="explain">${esc(x.q.e)}</p></div>
    </details>`).join('') || '<p class="muted">Aucune erreur, bravo !</p>'}</div>
  </div>`;
  math(root);
  $('#restart').onclick = () => { exam = null; renderExam(); };
  const review = $('#to-review');
  if (review) review.onclick = () => { exam = null; renderExam(); goToPractice('review'); };
}

function domainBars(byDomain) {
  return `<div class="bars">${DOMAINS.map(d => {
    const { ok, total } = byDomain[d.id];
    const p = pct(ok, total);
    return `<div class="bar-row"><span>${d.id}. ${esc(d.name)}</span>
      <div class="bar ${p >= 70 ? 'good' : 'weak'}"><i style="width:${p}%"></i></div>
      <b>${total ? `${p} %` : '--'}</b><small>${ok}/${total}</small></div>`;
  }).join('')}</div>`;
}

function historyHtml() {
  if (!store.exams.length) return '';
  return `<div class="history"><h3 class="sub">Derniers examens</h3>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Note</th><th>Bonnes réponses</th><th>Résultat</th></tr></thead><tbody>
    ${store.exams.map(x => `<tr><td>${new Date(x.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</td>
      <td><b>${formatMark(x.score)}/20</b></td><td>${x.ok}/${x.total}</td>
      <td><span class="badge ${x.passed ? 'pass' : 'fail'}">${x.passed ? 'Réussi' : 'Non réussi'}</span></td></tr>`).join('')}
    </tbody></table></div></div>`;
}

// ── Progression ──────────────────────────────────────────────────────────────
function renderProgress() {
  const byDomain = Object.fromEntries(DOMAINS.map(d => {
    const results = QUESTIONS.filter(q => q.d === d.id).map(q => store.answers[q.id]).filter(r => r !== undefined);
    return [d.id, { ok: results.filter(Boolean).length, total: results.length }];
  }));
  const stats = OBJECTIVES.map(o => ({ o, ...objectiveStats(o.id) }));
  const mastered = stats.filter(s => s.status === 'mastered').length;
  const seen = Object.values(byDomain).reduce((n, x) => n + x.total, 0);
  const best = store.exams.length ? Math.max(...store.exams.map(x => x.score)) : null;
  const weakest = stats.filter(s => s.seen && s.status !== 'mastered').sort((a, b) => a.ok / a.seen - b.ok / b.seen).slice(0, 3);
  const untouched = stats.filter(s => s.status === 'new').slice(0, 3);
  const priority = [...weakest, ...untouched];

  $('#progress-root').innerHTML = `
    <div class="stats four">
      <div><small>Objectifs maîtrisés</small><strong>${mastered}/${OBJECTIVES.length}</strong><span>du programme</span></div>
      <div><small>Cours lus</small><strong>${readCount()}/${COURSES.length}</strong><span>modules</span></div>
      <div><small>Questions vues</small><strong>${seen}/${QUESTIONS.length}</strong><span>dans la banque</span></div>
      <div class="vivid"><small>Meilleur examen blanc</small><strong>${best === null ? '--' : formatMark(best)}</strong><span>${best === null ? 'aucun examen passé' : 'sur 20'}</span></div>
    </div>
    <h3 class="sub">Précision par domaine (entraînement et examens)</h3>
    ${domainBars(byDomain)}
    <div class="priority">
      <h3 class="sub">Priorité de révision</h3>
      ${priority.length ? `<ul>${priority.map(s => `<li>
        <span><b>${esc(s.o.id)}</b> ${esc(s.o.title)}
          <small>${s.seen ? `${pct(s.ok, s.seen)} % sur ${s.seen} question(s)` : 'jamais abordé'}</small></span>
        <button type="button" class="ghost small" data-train="o:${esc(s.o.id)}">S’entraîner →</button></li>`).join('')}</ul>`
        : '<p class="muted">Tous les objectifs sont maîtrisés. Passe un examen blanc pour le confirmer !</p>'}
    </div>
    ${historyHtml()}`;
  math($('#progress-root'));
}

// ── Raccourcis clavier ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.target.matches('input, textarea')) return;
  const view = $$('.view:not(.hidden)')[0]?.id;
  const scope = view === 'quiz-view' ? '#quiz-card' : view === 'exam-view' ? '#exam-root .question' : null;
  if (!scope) return;
  const pos = e.key.toUpperCase().charCodeAt(0) - 65;
  if (e.key.length === 1 && pos >= 0 && pos < 5) {
    $$(`${scope} [data-answer]`)[pos]?.click();
  } else if (e.key === 'Enter') {
    const btn = view === 'quiz-view' ? $('#next') : $('#exam-next');
    if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
  }
});

window.addEventListener('beforeunload', e => {
  if (exam && !exam.result) e.preventDefault();
});

$('#reset').onclick = () => {
  if (!confirm('Effacer toute la progression (réponses, cours lus, objectifs cochés, examens) ?')) return;
  if (exam) clearInterval(exam.timer);
  exam = null;
  store = emptyStore();
  save();
  practice.streak = 0;
  setFilter('all');
  renderStats();
  renderExam();
  showView($('.tab.active').dataset.view);
};

$('#exam-summary').textContent = `${examSize} QCM · ${EXAM_MINUTES} minutes · note sur 20`;
renderProgramme();
setFilter('all');
renderStats();
renderExam();
