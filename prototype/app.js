const screens = [...document.querySelectorAll('.screen')];
const parkingForms = [...document.querySelectorAll('[data-parking-form]')];
const restCue = document.querySelector('#restCue');
const restTimeMessage = document.querySelector('#restTimeMessage');
const restParkingPanel = document.querySelector('#restParkingPanel');
const restParkingInput = document.querySelector('#restParkingInput');
const exitTitle = document.querySelector('#exit-title');
const exitMessage = document.querySelector('#exitMessage');
const triggerHint = document.querySelector('#triggerHint');
const returnWindowButton = document.querySelector('#returnWindowButton');
const returnList = document.querySelector('#returnList');
const returnEmpty = document.querySelector('#returnEmpty');
const returnStatus = document.querySelector('#returnStatus');

const REST_MINUTES = 5;
const THOUGHTS_KEY = 'darareco.thoughts';
const SESSIONS_KEY = 'darareco.sessions';

const restCues = {
  thinking: '答えを出さない時間にする。',
  body: '身体をどこかに預けていい。',
  stimulus: '情報をこれ以上増やさない。',
  unsure: '理由を決めなくていい。',
  thought: '預けた。忘れないから、いまはやらなくていい。'
};

let state = freshState();
let restTimeoutId = null;

function getTriggerMode() {
  return new URLSearchParams(window.location.search).get('trigger') === 'hotkey' ? 'hotkey' : null;
}

function freshState() {
  return {
    entry: null,
    unwind: null,
    plannedMinutes: REST_MINUTES,
    startedAt: null,
    endedAt: null,
    parkedCount: 0,
    saved: false
  };
}

function showScreen(name) {
  screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screen === name));
  if (name === 'start') syncStartScreen();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function makeThoughtId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `thought-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readThoughts() {
  const raw = readList(THOUGHTS_KEY);
  let changed = false;
  const thoughts = raw.map((thought, index) => {
    if (thought && thought.id) return thought;
    changed = true;
    return {
      ...thought,
      id: `legacy-${thought?.createdAt || 'unknown'}-${index}`
    };
  });

  if (changed) writeThoughts(thoughts);
  return thoughts;
}

function writeThoughts(thoughts) {
  localStorage.setItem(THOUGHTS_KEY, JSON.stringify(thoughts));
}

function saveThought(text) {
  const thoughts = readThoughts();
  thoughts.push({
    id: makeThoughtId(),
    text,
    createdAt: new Date().toISOString(),
    reviewedAt: null
  });
  writeThoughts(thoughts);
  state.parkedCount += 1;
}

function saveSession() {
  if (state.saved || !state.startedAt) return;

  const sessions = readList(SESSIONS_KEY);
  sessions.push({
    entry: state.entry,
    unwind: state.unwind,
    plannedMinutes: state.plannedMinutes,
    startedAt: state.startedAt,
    endedAt: state.endedAt || new Date().toISOString(),
    parkedCount: state.parkedCount
  });
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  state.saved = true;
}

function syncStartScreen() {
  const isHotkey = getTriggerMode() === 'hotkey';
  triggerHint.hidden = !isHotkey;
  returnWindowButton.hidden = readThoughts().length === 0;
}

function startRest(unwind, entry = state.entry || 'pause') {
  state.entry = entry;
  state.unwind = unwind;
  state.startedAt ||= new Date().toISOString();
  state.endedAt = null;
  state.saved = false;

  restCue.textContent = restCues[unwind] || restCues.unsure;
  restTimeMessage.textContent = `${REST_MINUTES}分くらいを目安に。画面から離れても、そのままでも大丈夫。`;
  restParkingPanel.hidden = true;
  clearParkingForms();

  clearTimeout(restTimeoutId);
  restTimeoutId = setTimeout(() => {
    restTimeMessage.textContent = '目安の時間は過ぎた。急いで戻らなくて大丈夫。';
  }, REST_MINUTES * 60 * 1000);

  showScreen('rest');
}

function clearParkingForms() {
  parkingForms.forEach(form => {
    const input = form.querySelector('[data-parking-input]');
    const status = form.querySelector('[data-parking-status]');
    if (input) input.value = '';
    if (status) status.textContent = '';
  });
}

function showExit(kind) {
  clearTimeout(restTimeoutId);

  if (kind === 'continue') {
    exitTitle.textContent = '続けるを選んだ。';
    exitMessage.textContent = 'それでいい。いったん選び直したことだけで、この介入は終わり。';
  } else {
    exitTitle.textContent = 'ここまで。';
    exitMessage.textContent = '続けても、まだ止まっていてもいい。ここから作業再開を急かすことはしない。';
  }

  showScreen('exit');
}

function reset() {
  clearTimeout(restTimeoutId);
  state = freshState();
  clearParkingForms();
  restParkingPanel.hidden = true;
  showScreen('start');
}

function formatThoughtDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function renderReturnWindow() {
  const thoughts = readThoughts();
  returnList.replaceChildren();
  returnStatus.textContent = '';
  returnEmpty.hidden = thoughts.length !== 0;

  thoughts.forEach(thought => {
    const card = document.createElement('article');
    card.className = 'return-card';

    const text = document.createElement('p');
    text.className = 'return-card__text';
    text.textContent = thought.text || '';

    const meta = document.createElement('p');
    meta.className = 'return-card__meta';
    const created = formatThoughtDate(thought.createdAt);
    meta.textContent = created ? `${created} に預けた` : '預けていたもの';

    const actions = document.createElement('div');
    actions.className = 'return-card__actions';

    [
      ['keep', '残す'],
      ['copy', 'コピー'],
      ['discard', '捨てる']
    ].forEach(([action, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action === 'discard' ? 'return-action danger' : 'return-action';
      button.dataset.returnAction = action;
      button.dataset.thoughtId = thought.id;
      button.textContent = label;
      actions.append(button);
    });

    card.append(text, meta, actions);
    returnList.append(card);
  });
}

function markThoughtReviewed(id) {
  const thoughts = readThoughts();
  const thought = thoughts.find(item => item.id === id);
  if (!thought) return null;
  thought.reviewedAt = new Date().toISOString();
  writeThoughts(thoughts);
  return thought;
}

function discardThought(id) {
  const thoughts = readThoughts();
  const next = thoughts.filter(item => item.id !== id);
  if (next.length === thoughts.length) return false;
  writeThoughts(next);
  return true;
}

async function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('copy failed');
}

async function handleReturnAction(button) {
  const id = button.dataset.thoughtId;
  const action = button.dataset.returnAction;

  if (action === 'discard') {
    if (discardThought(id)) {
      returnStatus.textContent = '捨てました。';
      renderReturnWindow();
      returnStatus.textContent = '捨てました。';
    }
    return;
  }

  const thought = readThoughts().find(item => item.id === id);
  if (!thought) return;

  if (action === 'copy') {
    try {
      await copyText(thought.text || '');
      markThoughtReviewed(id);
      returnStatus.textContent = 'コピーしました。預けた内容は残しています。';
    } catch {
      returnStatus.textContent = 'コピーできませんでした。内容はそのまま残しています。';
    }
    return;
  }

  if (action === 'keep') {
    markThoughtReviewed(id);
    returnStatus.textContent = 'そのまま残しました。';
  }
}

document.addEventListener('click', async event => {
  const returnActionButton = event.target.closest('[data-return-action]');
  if (returnActionButton) {
    await handleReturnAction(returnActionButton);
    return;
  }

  const unwindButton = event.target.closest('[data-unwind]');
  if (unwindButton) {
    startRest(unwindButton.dataset.unwind, 'pause');
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  switch (actionButton.dataset.action) {
    case 'pause':
      state.entry = 'pause';
      showScreen('unwind');
      break;
    case 'park-first':
      state.entry = 'park';
      clearParkingForms();
      showScreen('park');
      break;
    case 'continue':
      showExit('continue');
      break;
    case 'park-skip':
      startRest('unsure', 'park');
      break;
    case 'toggle-rest-parking':
      restParkingPanel.hidden = false;
      restParkingInput.focus();
      break;
    case 'cancel-rest-parking':
      restParkingPanel.hidden = true;
      restParkingInput.value = '';
      break;
    case 'end-rest':
      state.endedAt = new Date().toISOString();
      saveSession();
      showExit('rest');
      break;
    case 'open-return':
      renderReturnWindow();
      showScreen('return');
      break;
    case 'return-done':
      showScreen('start');
      break;
    case 'reset':
      reset();
      break;
  }
});

parkingForms.forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const input = form.querySelector('[data-parking-input]');
    const status = form.querySelector('[data-parking-status]');
    const text = input.value.trim();
    if (!text) return;

    saveThought(text);
    input.value = '';
    input.blur();

    if (form.dataset.source === 'gate') {
      if (status) status.textContent = '預かりました。';
      startRest('thought', 'park');
      return;
    }

    restCue.textContent = restCues.thought;
    if (status) status.textContent = '預けた。いまは戻らなくて大丈夫。';
    restParkingPanel.hidden = true;
  });
});

syncStartScreen();
