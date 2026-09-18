const STORE_KEY = 'aws-ready-v2';
const EXAM_MINUTES = 90;
const PASS_SCORE = 700;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pad = n => String(n).padStart(2, '0');
const letter = i => String.fromCharCode(65 + i);
const domainOf = id => DOMAINS.find(d => d.id === id);

// Identifiant stable dérivé de l'énoncé : ajouter des questions ne casse pas la progression enregistrée.
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
function emptyStore() { return { answers: {}, read: {}, exams: [] }; }
function loadStore() {
  try { return { ...emptyStore(), ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; }
  catch { return emptyStore(); }
}
let store = loadStore();
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch { /* stockage indisponible */ }
}

// ── Navigation ───────────────────────────────────────────────────────────────
function showView(name) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  $$('.view').forEach(v => v.classList.toggle('hidden', v.id !== `${name}-view`));
  if (name === 'progress') renderProgress();
  if (name === 'courses') renderCourses();
}
$$('.tab').forEach(t => t.onclick = () => showView(t.dataset.view));

// ── Cours ────────────────────────────────────────────────────────────────────
function renderCourses() {
  $('#course-count').textContent = `${COURSES.length} modules · ${Object.keys(store.read).length} lu(s)`;
  $('#course-list').innerHTML = DOMAINS.map(d => {
    const items = COURSES.map((c, i) => ({ c, i })).filter(x => x.c.d === d.id);
    return `<div class="domain-block">
      <div class="domain-head"><span>DOMAINE ${d.id}</span><h3>${d.name}</h3><small>${d.weight} % de l’examen</small></div>
      <div class="course-grid">${items.map(({ c, i }) => `
        <article class="course ${store.read[i] ? 'read' : ''}">
          <span class="index">${pad(i + 1)}${store.read[i] ? ' · LU ✓' : ''}</span>
          <h3>${c.title}</h3><p>${c.summary}</p>
          <button data-course="${i}">Lire le cours →</button>
        </article>`).join('')}
      </div>
    </div>`;
  }).join('');
  $$('[data-course]').forEach(b => b.onclick = () => openCourse(+b.dataset.course));
}

function openCourse(i) {
  const c = COURSES[i];
  store.read[i] = true;
  save();
  const next = COURSES[i + 1];
  $('#course-count').textContent = `${COURSES.length} modules · ${Object.keys(store.read).length} lu(s)`;
  $('#course-list').innerHTML = `<article class="lesson">
    <span class="index">${pad(i + 1)} / DOMAINE ${c.d} · ${domainOf(c.d).name.toUpperCase()}</span>
    <h3>${c.title}</h3>
    <p class="lead">${c.summary}</p>
    ${c.sections.map(s => `<section>
      <h4>${s.h}</h4>
      ${s.p ? `<p>${s.p}</p>` : ''}
      ${s.points ? `<ul>${s.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
    </section>`).join('')}
    <div class="lesson-nav">
      <button class="back">← Tous les cours</button>
      <button class="ghost" data-practice="${c.d}">S’entraîner sur ce domaine</button>
      ${next ? `<button class="next" data-course="${i + 1}">Module suivant : ${next.title} →</button>` : ''}
    </div>
  </article>`;
  $('.back').onclick = renderCourses;
  $$('.lesson [data-course]').forEach(b => b.onclick = () => openCourse(+b.dataset.course));
  $('[data-practice]').onclick = () => { setFilter(c.d); showView('quiz'); };
  $('#courses-view').scrollIntoView({ behavior: 'smooth' });
}

// ── Entraînement ─────────────────────────────────────────────────────────────
const practice = { filter: 'all', list: [], index: 0, streak: 0, picked: [], session: {}, orders: {} };

function filteredQuestions(filter) {
  if (filter === 'all') return QUESTIONS;
  if (filter === 'review') return QUESTIONS.filter(q => store.answers[q.id] === false);
  if (filter === 'new') return QUESTIONS.filter(q => store.answers[q.id] === undefined);
  return QUESTIONS.filter(q => q.d === filter);
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
    ...DOMAINS.map(d => [d.id, `${d.id}. ${d.name}`])
  ];
  $('#total').textContent = QUESTIONS.length;
  $('#categories').innerHTML = entries.map(([key, label]) =>
    `<button class="category ${key === practice.filter ? 'active' : ''} ${key === 'review' ? 'review' : ''}" data-filter="${key}">${label}<span>${filteredQuestions(key).length}</span></button>`
  ).join('');
  $$('[data-filter]').forEach(b => b.onclick = () => {
    const f = b.dataset.filter;
    setFilter(isNaN(f) ? f : +f);
  });
}

function renderStats() {
  const results = QUESTIONS.map(q => store.answers[q.id]).filter(r => r !== undefined);
  $('#answered').textContent = results.length;
  $('#accuracy').textContent = results.length ? `${Math.round(results.filter(Boolean).length / results.length * 100)}%` : '--';
  $('#streak').textContent = practice.streak;
}

function answersHtml(q, order, picked, reveal) {
  return order.map((ai, pos) => {
    const cls = ['answer'];
    if (q.multi) cls.push('multi');
    if (picked.includes(ai)) cls.push('selected');
    if (reveal && q.correct.includes(ai)) cls.push('correct');
    if (reveal && picked.includes(ai) && !q.correct.includes(ai)) cls.push('incorrect');
    return `<button class="${cls.join(' ')}" data-answer="${ai}" ${reveal ? 'disabled' : ''}><b>${letter(pos)}</b><span>${esc(q.a[ai])}</span></button>`;
  }).join('');
}

function renderPractice() {
  const { list, index } = practice;
  const card = $('#quiz-card');
  if (!list.length) {
    card.innerHTML = `<div class="empty"><h2>${practice.filter === 'review' ? 'Aucune erreur à revoir 🎉' : 'Aucune question ici'}</h2>
      <p>${practice.filter === 'review' ? 'Toutes tes réponses enregistrées sont correctes. Continue avec de nouvelles questions.' : 'Choisis un autre filtre.'}</p>
      <button class="next" data-filter-go="new">Questions jamais répondues →</button></div>`;
    $('[data-filter-go]').onclick = () => setFilter('new');
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
      <label>${domainOf(q.d).name}</label>
      <h2>${esc(q.q)}</h2>
      ${q.multi && !done ? `<p class="hint">Plusieurs réponses attendues : sélectionne ${q.correct.length} réponses puis valide.</p>` : ''}
      <div>${answersHtml(q, order, picked, !!done)}</div>
      ${done ? `<div class="feedback ${ok ? '' : 'wrong'}"><strong>${ok ? 'Bonne réponse' : 'À revoir'}</strong>
        ${ok ? '' : `<p class="solution">Réponse attendue : ${order.map((ai, pos) => q.correct.includes(ai) ? letter(pos) : null).filter(Boolean).join(', ')}</p>`}
        <p>${esc(q.e)}</p></div>` : ''}
    </div>
    <footer>
      <small>${done ? 'Touche Entrée pour continuer' : q.multi ? `${practice.picked.length} / ${q.correct.length} sélectionnée(s)` : 'Choisis une réponse (touches A à E)'}</small>
      <button class="next" id="next" ${!done && (!q.multi || practice.picked.length !== q.correct.length) ? 'disabled' : ''}>${done ? 'Question suivante →' : 'Valider la réponse'}</button>
    </footer>`;

  if (!done) {
    $$('#quiz-card [data-answer]').forEach(b => b.onclick = () => pickPractice(+b.dataset.answer));
  }
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
    // Fin de la série : on repart sur une liste recalculée (utile pour « Erreurs à revoir »).
    setFilter(practice.filter);
    return;
  }
  renderPractice();
  $('#quiz-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Examen blanc ─────────────────────────────────────────────────────────────
let exam = null;

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
    const right = isRight(it.q, it.picked);
    it.right = right;
    byDomain[it.q.d].total++;
    if (right) { ok++; byDomain[it.q.d].ok++; }
    if (it.picked.length) store.answers[it.q.id] = right;
  });
  // Score estimé sur l'échelle officielle 100–1000 (AWS utilise une pondération non publiée).
  const score = Math.round(100 + 900 * ok / exam.items.length);
  exam.result = { ok, total: exam.items.length, score, passed: score >= PASS_SCORE, byDomain };
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
        <button class="flag ${it.flagged ? 'on' : ''}" id="flag">⚑ ${it.flagged ? 'Marquée pour révision' : 'Marquer pour révision'}</button></div>
      <div class="track"><i style="width:${(exam.current + 1) / exam.items.length * 100}%"></i></div>
      <div class="question">
        <h2>${esc(q.q)}</h2>
        ${q.multi ? `<p class="hint">Sélectionne ${q.correct.length} réponses.</p>` : ''}
        <div>${answersHtml(q, it.order, it.picked, false)}</div>
      </div>
      <footer class="exam-footer">
        <button class="ghost" id="prev" ${exam.current === 0 ? 'disabled' : ''}>← Précédente</button>
        <button class="next" id="exam-next">${exam.current === exam.items.length - 1 ? 'Terminer l’examen' : 'Suivante →'}</button>
      </footer>
    </article>
    <aside class="exam-side">
      <div class="timer-box"><small>Temps restant</small><strong id="timer">--:--</strong></div>
      <p class="exam-progress">${answeredCount} / ${exam.items.length} répondues</p>
      <div class="exam-grid">${exam.items.map((x, i) =>
        `<button class="${x.picked.length ? 'done' : ''} ${x.flagged ? 'flagged' : ''} ${i === exam.current ? 'current' : ''}" data-goto="${i}">${i + 1}</button>`
      ).join('')}</div>
      <p class="legend"><i class="l-done"></i>Répondue <i class="l-flag"></i>Marquée</p>
      <button class="finish" id="finish">Terminer l’examen</button>
    </aside>
  </div>`;
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
  const warn = [missing && `${missing} question(s) sans réponse complète`, flagged && `${flagged} question(s) marquée(s)`].filter(Boolean).join(' et ');
  if (confirm(warn ? `Il reste ${warn}. Terminer quand même ?` : 'Terminer l’examen et voir le résultat ?')) finishExam();
}

function renderExamIntro(root) {
  root.innerHTML = `<div class="exam-intro">
    <div class="intro-card">
      <label>SIMULATION CLF-C02</label>
      <h2>Examen blanc en conditions réelles</h2>
      <ul>
        <li><b>${DOMAINS.reduce((n, d) => n + d.examCount, 0)} questions</b> tirées au hasard dans la banque de ${QUESTIONS.length} questions</li>
        <li><b>${EXAM_MINUTES} minutes</b> avec chronomètre</li>
        <li>Répartition selon la pondération officielle : ${DOMAINS.map(d => `D${d.id} ${d.weight} %`).join(' · ')}</li>
        <li>Correction uniquement à la fin, comme le jour J</li>
        <li>Score estimé sur 1000 — il faut <b>${PASS_SCORE}</b> pour réussir</li>
      </ul>
      <button class="next" id="start-exam">Commencer l’examen →</button>
    </div>
    ${historyHtml()}
  </div>`;
  $('#start-exam').onclick = startExam;
}

function renderExamResult(root) {
  const r = exam.result;
  const wrong = exam.items.filter(x => !x.right);
  root.innerHTML = `<div class="result">
    <div class="result-head ${r.passed ? 'pass' : 'fail'}">
      <div><label>${r.passed ? 'RÉUSSI' : 'NON RÉUSSI'}</label><strong>${r.score}<small> / 1000</small></strong>
      <p>${r.ok} bonne(s) réponse(s) sur ${r.total} · seuil de réussite ${PASS_SCORE}</p></div>
      <div class="result-actions"><button class="next" id="restart">Nouvel examen</button>
      ${wrong.length ? '<button class="ghost" id="to-review">Revoir mes erreurs en entraînement</button>' : ''}</div>
    </div>
    <h3 class="sub">Résultats par domaine</h3>
    ${domainBars(r.byDomain)}
    <h3 class="sub">Corrections (${wrong.length})</h3>
    <div class="corrections">${wrong.map(x => `<details>
      <summary><span class="dom">D${x.q.d}</span>${esc(x.q.q)}</summary>
      <div>${answersHtml(x.q, x.order, x.picked, true)}<p class="explain">${esc(x.q.e)}</p></div>
    </details>`).join('') || '<p class="muted">Aucune erreur, bravo !</p>'}</div>
  </div>`;
  $('#restart').onclick = () => { exam = null; renderExam(); };
  const review = $('#to-review');
  if (review) review.onclick = () => { exam = null; renderExam(); setFilter('review'); showView('quiz'); };
}

function domainBars(byDomain) {
  return `<div class="bars">${DOMAINS.map(d => {
    const { ok, total } = byDomain[d.id];
    const pct = total ? Math.round(ok / total * 100) : 0;
    return `<div class="bar-row"><span>${d.id}. ${d.name}</span>
      <div class="bar ${pct >= 70 ? 'good' : 'weak'}"><i style="width:${pct}%"></i></div>
      <b>${total ? `${pct} %` : '--'}</b><small>${ok}/${total}</small></div>`;
  }).join('')}</div>`;
}

function historyHtml() {
  if (!store.exams.length) return '';
  return `<div class="history"><h3 class="sub">Derniers examens</h3>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Score</th><th>Bonnes réponses</th><th>Résultat</th></tr></thead><tbody>
    ${store.exams.map(x => `<tr><td>${new Date(x.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</td>
      <td><b>${x.score}</b></td><td>${x.ok}/${x.total}</td>
      <td><span class="badge ${x.passed ? 'pass' : 'fail'}">${x.passed ? 'Réussi' : 'Échec'}</span></td></tr>`).join('')}
    </tbody></table></div></div>`;
}

// ── Progression ──────────────────────────────────────────────────────────────
function renderProgress() {
  const byDomain = Object.fromEntries(DOMAINS.map(d => {
    const qs = QUESTIONS.filter(q => q.d === d.id);
    const results = qs.map(q => store.answers[q.id]).filter(r => r !== undefined);
    return [d.id, { ok: results.filter(Boolean).length, total: results.length, pool: qs.length }];
  }));
  const tried = DOMAINS.filter(d => byDomain[d.id].total);
  const weakest = tried.sort((a, b) => byDomain[a.id].ok / byDomain[a.id].total - byDomain[b.id].ok / byDomain[b.id].total)[0];
  const best = store.exams.length ? Math.max(...store.exams.map(x => x.score)) : null;

  $('#progress-root').innerHTML = `
    <div class="stats">
      <div><small>Cours lus</small><strong>${Object.keys(store.read).length}/${COURSES.length}</strong><span>modules</span></div>
      <div><small>Questions vues</small><strong>${Object.values(byDomain).reduce((n, x) => n + x.total, 0)}/${QUESTIONS.length}</strong><span>dans la banque</span></div>
      <div class="lime"><small>Meilleur examen blanc</small><strong>${best ?? '--'}</strong><span>${best === null ? 'aucun examen passé' : best >= PASS_SCORE ? 'au-dessus du seuil' : `objectif ${PASS_SCORE}`}</span></div>
    </div>
    <h3 class="sub">Précision par domaine (entraînement et examens)</h3>
    ${domainBars(byDomain)}
    ${weakest ? `<p class="tip"><b>i</b><span><strong>Priorité de révision</strong><br>Ton domaine le plus faible est « ${weakest.name} ».
      <button class="link" id="train-weak">S’entraîner dessus →</button></span></p>` : '<p class="muted">Réponds à quelques questions pour voir ta progression par domaine.</p>'}
    ${historyHtml()}`;
  const weak = $('#train-weak');
  if (weak) weak.onclick = () => { setFilter(weakest.id); showView('quiz'); };
}

// ── Raccourcis clavier ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
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
  if (!confirm('Effacer toute la progression (réponses, cours lus, examens) ?')) return;
  store = emptyStore();
  save();
  practice.streak = 0;
  setFilter('all');
  renderStats();
  renderCourses();
  renderProgress();
  renderExam();
};

renderCourses();
setFilter('all');
renderStats();
renderExam();
