const screens = [...document.querySelectorAll('.screen')];
const checkinButtons = [...document.querySelectorAll('[data-checkin]')];
const recoveryChoices = document.querySelector('#recoveryChoices');
const timerEl = document.querySelector('#timer');
const timerMessage = document.querySelector('#timerMessage');
const sessionName = document.querySelector('#sessionName');
const parkingForm = document.querySelector('#parkingForm');
const parkingInput = document.querySelector('#parkingInput');
const parkingStatus = document.querySelector('#parkingStatus');
const reflectionForm = document.querySelector('#reflectionForm');
const doneMessage = document.querySelector('#doneMessage');

const recoveryOptions = {
  none: { label: '何もしない', minutes: 10, note: 'ただ休む。画面から離れてもいい。' },
  'lie-down': { label: '横になる', minutes: 20, note: '眠らなくてもいい。身体を預ける。' },
  outside: { label: '外を見る / 少し歩く', minutes: 10, note: '距離や歩数は決めない。' },
  'warm-drink': { label: '温かい飲み物と休む', minutes: 10, note: '飲み終えることも目標にしない。' }
};

const menus = {
  head: ['none', 'outside', 'warm-drink'],
  body: ['lie-down', 'outside', 'none'],
  stimulus: ['none', 'outside', 'lie-down'],
  sleepy: ['lie-down', 'none', 'warm-drink'],
  rest: ['none', 'lie-down', 'warm-drink'],
  default: ['none', 'lie-down', 'outside']
};

let state = freshState();
let timerId = null;
let remainingSeconds = 0;

function freshState() {
  return {
    checkIn: null,
    recovery: null,
    plannedMinutes: null,
    startedAt: null,
    endedAt: null
  };
}

function showScreen(name) {
  screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderMenu() {
  const keys = menus[state.checkIn] || menus.default;
  recoveryChoices.innerHTML = keys.map(key => {
    const option = recoveryOptions[key];
    return `
      <button class="choice" data-recovery="${key}">
        ${option.label} ${option.minutes}分
        <small>${option.note}</small>
      </button>`;
  }).join('');
}

function selectCheckin(value) {
  state.checkIn = value;
  checkinButtons.forEach(button => {
    button.classList.toggle('selected', button.dataset.checkin === value);
  });
}

function startSession(key) {
  const option = recoveryOptions[key];
  state.recovery = key;
  state.plannedMinutes = option.minutes;
  state.startedAt = new Date().toISOString();
  sessionName.textContent = `${option.label} · ${option.minutes}分`;
  parkingStatus.textContent = '';
  timerMessage.textContent = '画面は閉じても、そのままでも大丈夫。';
  remainingSeconds = option.minutes * 60;
  updateTimer();
  clearInterval(timerId);
  timerId = setInterval(() => {
    remainingSeconds = Math.max(0, remainingSeconds - 1);
    updateTimer();
    if (remainingSeconds === 0) {
      clearInterval(timerId);
      timerMessage.textContent = '時間です。急いで戻らなくて大丈夫。';
    }
  }, 1000);
  showScreen('session');
}

function updateTimer() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
}

function finishSession(reflection) {
  clearInterval(timerId);
  state.endedAt ||= new Date().toISOString();
  const sessions = readList('darareco.sessions');
  sessions.push({ ...state, reflection: reflection || null });
  localStorage.setItem('darareco.sessions', JSON.stringify(sessions));
  reflectionForm.hidden = true;
  doneMessage.hidden = false;
}

function reset() {
  clearInterval(timerId);
  state = freshState();
  checkinButtons.forEach(button => button.classList.remove('selected'));
  reflectionForm.hidden = false;
  doneMessage.hidden = true;
  parkingInput.value = '';
  parkingStatus.textContent = '';
  showScreen('start');
}

document.addEventListener('click', event => {
  const actionButton = event.target.closest('[data-action]');
  const checkinButton = event.target.closest('[data-checkin]');
  const recoveryButton = event.target.closest('[data-recovery]');
  const reflectionButton = event.target.closest('[data-reflection]');

  if (checkinButton) {
    selectCheckin(checkinButton.dataset.checkin);
    return;
  }

  if (recoveryButton) {
    startSession(recoveryButton.dataset.recovery);
    return;
  }

  if (reflectionButton) {
    finishSession(reflectionButton.dataset.reflection);
    return;
  }

  if (!actionButton) return;

  switch (actionButton.dataset.action) {
    case 'start':
      showScreen('checkin');
      break;
    case 'checkin-next':
    case 'checkin-skip':
      if (actionButton.dataset.action === 'checkin-skip') selectCheckin(null);
      renderMenu();
      showScreen('menu');
      break;
    case 'end-session':
      clearInterval(timerId);
      state.endedAt = new Date().toISOString();
      showScreen('reflection');
      break;
    case 'reset':
      reset();
      break;
  }
});

parkingForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = parkingInput.value.trim();
  if (!text) return;
  saveThought(text);
  parkingInput.value = '';
  parkingStatus.textContent = 'あとで見る箱に置きました。いまは戻らなくて大丈夫。';
  parkingInput.blur();
});
