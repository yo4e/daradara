const screens = [...document.querySelectorAll('.screen')];
const parkingForms = [...document.querySelectorAll('[data-parking-form]')];
const restCue = document.querySelector('#restCue');
const restTimeMessage = document.querySelector('#restTimeMessage');
const restParkingPanel = document.querySelector('#restParkingPanel');
const restParkingInput = document.querySelector('#restParkingInput');
const exitTitle = document.querySelector('#exit-title');
const exitMessage = document.querySelector('#exitMessage');

const REST_MINUTES = 5;

const restCues = {
  thinking: '答えを出さない時間にする。',
  body: '身体をどこかに預けていい。',
  stimulus: '情報をこれ以上増やさない。',
  unsure: '理由を決めなくていい。',
  thought: '預けた。忘れないから、いまはやらなくていい。'
};

let state = freshState();
let restTimeoutId = null;

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
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveThought(text) {
  const thoughts = readList('darareco.thoughts');
  thoughts.push({ text, createdAt: new Date().toISOString() });
  localStorage.setItem('darareco.thoughts', JSON.stringify(thoughts));
  state.parkedCount += 1;
}

function saveSession() {
  if (state.saved || !state.startedAt) return;

  const sessions = readList('darareco.sessions');
  sessions.push({
    entry: state.entry,
    unwind: state.unwind,
    plannedMinutes: state.plannedMinutes,
    startedAt: state.startedAt,
    endedAt: state.endedAt || new Date().toISOString(),
    parkedCount: state.parkedCount
  });
  localStorage.setItem('darareco.sessions', JSON.stringify(sessions));
  state.saved = true;
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

document.addEventListener('click', event => {
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
