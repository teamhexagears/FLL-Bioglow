function normalizeMission(mission) {
  const missionName = String(mission.missionName || '').trim();
  return {
    ...mission,
    missionId: String(mission.missionId || '').toUpperCase(),
    missionName: missionName ? missionName[0].toUpperCase() + missionName.slice(1) : missionName
  };
}

const missionOrder = [
  'M0', 'M3A', 'M3B', 'M2A', 'M2B', 'M2C', 'M5A', 'M5B', 'M8',
  'M9A', 'M9B', 'M9C', 'M15A', 'M15B', 'M15C', 'M1A', 'M1B',
  'M6A', 'M6B', 'M6C', 'M6D', 'M11A', 'M12A', 'M12B', 'M11B',
  'M7A', 'M7B', 'M12C', 'M13', 'M14A', 'M14B', 'M14C', 'M14D', 'M14E',
  'M14F', 'M14G', 'M14H', 'PT1', 'PT2', 'PT3', 'PT4', 'PT5', 'M10A', 'M10B'
];
const missionOrderIndex = new Map(missionOrder.map((missionId, index) => [missionId, index]));

function compareMissionOrder(firstMission, secondMission) {
  const firstIndex = missionOrderIndex.get(firstMission.missionId);
  const secondIndex = missionOrderIndex.get(secondMission.missionId);
  if (firstIndex === undefined) return secondIndex === undefined ? 0 : 1;
  if (secondIndex === undefined) return -1;
  return firstIndex - secondIndex;
}

const defaultMissions = [
  { missionId: 'm0', missionName: 'does all your attatchments fit in the launch area?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm1a', missionName: 'drone is up?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm1b', missionName: 'drone is in the flap, and is the flap up?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm2a', missionName: 'first seed down?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm2b', missionName: 'second seed down?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm2c', missionName: 'third seed down?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm3a', missionName: 'is flag down?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm3b', missionName: 'is rock back to it\'s original position?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm5a', missionName: 'is root halfway up?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm5b', missionName: 'is root fully up?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm6a', missionName: 'is first leaf still standing?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm6b', missionName: 'is second leaf still standing?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm6c', missionName: 'is third leaf still standing?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm6d', missionName: 'is last leaf still standing?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm7a', missionName: 'is myceilem up?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm7b', missionName: 'is myceilem connected with the other team\'s roots?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm8', missionName: 'vine is down?', noPoints: 0, yesPoints: 30 },
  { missionId: 'm9a', missionName: 'platform is raised?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm9b', missionName: 'camera tap is down?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm9c', missionName: 'seed is down?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm10a', missionName: 'is snail untouched?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm10b', missionName: 'is spider untouched?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm11a', missionName: 'root cover is down?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm11b', missionName: 'catch the seed?', noPoints: 0, yesPoints: 0 },
  { missionId: 'm12a', missionName: 'catch the seed?', noPoints: 0, yesPoints: 0 },
  { missionId: 'm12b', missionName: 'is the ring tie on the stick?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm12c', missionName: 'is the support cane up?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm13', missionName: 'is keystone species in the platform and trees up?', noPoints: 0, yesPoints: 30 },
  { missionId: 'm14a', missionName: 'is first seed in box?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14b', missionName: 'is second seed in box?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14c', missionName: 'is third seed in box?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14d', missionName: 'is fourth seed in box?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14e', missionName: 'is first seed touching the ground?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14f', missionName: 'is second seed touching the ground?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14g', missionName: 'is third seed touching the ground?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm14h', missionName: 'is fourth seed touching the ground?', noPoints: 0, yesPoints: 5 },
  { missionId: 'm15a', missionName: 'is garden skylight in?', noPoints: 0, yesPoints: 10 },
  { missionId: 'm15b', missionName: 'is compost hatch down?', noPoints: 0, yesPoints: 20 },
  { missionId: 'm15c', missionName: 'is nesting canopy up?', noPoints: 0, yesPoints: 10 },
  { missionId: 'pt1', missionName: 'is there at least one precision tokens?', noPoints: 0, yesPoints: 10 },
  { missionId: 'pt2', missionName: 'is there at least two precision tokens?', noPoints: 0, yesPoints: 5 },
  { missionId: 'pt3', missionName: 'is there at least three precision tokens?', noPoints: 0, yesPoints: 10 },
  { missionId: 'pt4', missionName: 'is there at least four precision tokens?', noPoints: 0, yesPoints: 10 },
  { missionId: 'pt5', missionName: 'is there at least five precision tokens?', noPoints: 0, yesPoints: 15 }
].map(normalizeMission).sort(compareMissionOrder);

const appConfig = {
  apiUrl: 'https://script.google.com/macros/s/AKfycbz0jzrIy4KBrsc6PS0cEbon-ozOt4eg1R2k4m7OtUhm7J4byx4PchgYuzFSxlv_z8lD/exec'
}

const state = {
  missions: [],
  results: {},
  attempt: 1,
  run: 1
};

const attemptInput = document.getElementById('attemptNumber');
const runInput = document.getElementById('runNumber');
const missionList = document.getElementById('missionList');
const currentScoreEl = document.getElementById('currentScore');
const completedCountEl = document.getElementById('completedCount');
const missionCountEl = document.getElementById('missionCount');
const saveStatusEl = document.getElementById('saveStatus');
const timerDisplayEl = document.getElementById('timerDisplay');
const timerStateEl = document.getElementById('timerState');
const startTimerButton = document.getElementById('startTimerButton');
const pauseTimerButton = document.getElementById('pauseTimerButton');
const resetTimerButton = document.getElementById('resetTimerButton');
const timerDuration = 2 * 60 * 1000 + 30 * 1000;
let timerRemaining = timerDuration;
let timerDeadline = 0;
let timerInterval = null;

function getAttemptValue() {
  if (!attemptInput) {
    return state.attempt;
  }
  return Number(attemptInput.value) || state.attempt;
}

function getRunValue() {
  if (!runInput) {
    return state.run;
  }
  return Number(runInput.value) || state.run;
}

function getMissionScore(mission, result) {
  const answer = result === true;
  return answer ? Number(mission.yesPoints || 0) : Number(mission.noPoints || 0);
}

function getCurrentRunScore() {
  return state.missions.reduce((total, mission) => {
    const missionResult = state.results[mission.missionId];
    return total + getMissionScore(mission, missionResult);
  }, 0);
}

function getCompletedMissionCount() {
  return state.missions.filter((mission) => Object.prototype.hasOwnProperty.call(state.results, mission.missionId)).length;
}

function updateTotals() {
  const totalScore = getCurrentRunScore();
  currentScoreEl.textContent = totalScore;
  completedCountEl.textContent = `${getCompletedMissionCount()} / ${state.missions.length}`;
  missionCountEl.textContent = state.missions.length;
}

function setStatus(message, isError = false) {
  saveStatusEl.textContent = message;
  saveStatusEl.style.background = isError ? 'rgba(212, 71, 71, 0.1)' : 'var(--primary-soft)';
  saveStatusEl.style.color = isError ? 'var(--danger)' : 'var(--primary-dark)';
}

function renderTimer() {
  const totalSeconds = Math.ceil(timerRemaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerDisplayEl.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
  timerDisplayEl.classList.toggle('timer-low', timerRemaining <= 30 * 1000);
  startTimerButton.disabled = timerInterval !== null || timerRemaining === 0;
  pauseTimerButton.disabled = timerInterval === null;
}

function updateTimer() {
  timerRemaining = Math.max(0, timerDeadline - Date.now());
  if (timerRemaining === 0) {
    window.clearInterval(timerInterval);
    timerInterval = null;
    timerStateEl.textContent = 'Time is up';
  }
  renderTimer();
}

function startTimer() {
  if (timerInterval !== null || timerRemaining === 0) return;
  timerDeadline = Date.now() + timerRemaining;
  timerStateEl.textContent = 'Running';
  timerInterval = window.setInterval(updateTimer, 250);
  renderTimer();
}

function pauseTimer() {
  if (timerInterval === null) return;
  timerRemaining = Math.max(0, timerDeadline - Date.now());
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerStateEl.textContent = timerRemaining === 0 ? 'Time is up' : 'Paused';
  renderTimer();
}

function resetTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = timerDuration;
  timerStateEl.textContent = 'Ready';
  renderTimer();
}

function renderMissions() {
  missionList.innerHTML = '';

  state.missions.forEach((mission) => {
    const card = document.createElement('article');
    card.className = 'mission-card';

    const selectedResult = state.results[mission.missionId];
    const statusText = selectedResult === true ? 'Yes' : selectedResult === false ? 'No' : 'Pending';
    const statusClass = selectedResult === true ? 'yes' : selectedResult === false ? 'no' : '';

    card.innerHTML = `
      <div class="mission-top">
        <span class="mission-id">${mission.missionId}</span>
        <span class="mission-name">${mission.missionName}</span>
      </div>
      <div class="score-strip">
        <span>No: ${mission.noPoints}</span>
        <span>Yes: ${mission.yesPoints}</span>
      </div>
      <div class="status-badge ${statusClass}">${statusText}</div>
      <div class="answer-row">
        <button class="answer-button no ${selectedResult === false ? 'selected' : 'inactive'}" type="button" data-mission-id="${mission.missionId}" data-answer="false">
          No
        </button>
        <button class="answer-button yes ${selectedResult === true ? 'selected' : 'inactive'}" type="button" data-mission-id="${mission.missionId}" data-answer="true">
          Yes
        </button>
      </div>
    `;

    missionList.appendChild(card);
  });

  updateTotals();
}

function registerMissionHandlers() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.answer-button');
    if (!button) {
      return;
    }

    const missionId = button.dataset.missionId;
    const value = button.dataset.answer === 'true';
    state.results[missionId] = value;
    renderMissions();
  });
}

function resetRun() {
  state.results = {};
  renderMissions();
  setStatus('Run reset');
}

async function getResultsRowCount() {
  const response = await fetch(`${appConfig.apiUrl}?action=resultsCount`);
  if (!response.ok) {
    throw new Error(`Unable to verify Results sheet (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.message || 'Unable to verify Results sheet.');
  }
  return Number(data.rowCount);
}

async function loadMissions() {
  if (!appConfig.apiUrl || appConfig.apiUrl.includes('PASTE_YOUR')) {
    state.missions = defaultMissions;
    renderMissions();
    setStatus('Demo mode active');
    return;
  }

  try {
    const response = await fetch(`${appConfig.apiUrl}?action=missions`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const missions = await response.json();
    state.missions = missions.length
      ? missions.map(normalizeMission).sort(compareMissionOrder)
      : defaultMissions;
    renderMissions();
    setStatus('Connected to Google Sheet');
  } catch (error) {
    console.error('Unable to load missions:', error);
    state.missions = defaultMissions;
    renderMissions();
    setStatus('Using local fallback missions', true);
  }
}

async function saveRun() {
  const selectedMissions = state.missions.filter((mission) => Object.prototype.hasOwnProperty.call(state.results, mission.missionId));

  if (!selectedMissions.length) {
    setStatus('Select at least one mission before saving.', true);
    return;
  }

  const payload = {
    attemptNumber: getAttemptValue(),
    runNumber: getRunValue(),
    results: selectedMissions.map((mission) => {
      const result = state.results[mission.missionId];
      const row = {
        missionId: mission.missionId,
        missionName: mission.missionName,
        result: Boolean(result),
        score: getMissionScore(mission, result)
      };
      console.log('Mission payload row:', row);
      return row;
    })
  };

  console.log('Saving payload to Apps Script:', payload);
  setStatus('Sending data to Google Apps Script...');

  if (!appConfig.apiUrl) {
    console.log('Preview payload:', payload);
    setStatus('Front-end demo mode: save is ready for backend hookup');
    return;
  }

  try {
    let previousRowCount = null;
    try {
      previousRowCount = await getResultsRowCount();
    } catch (error) {
      if (error.message !== 'Unknown action') {
        throw error;
      }
    }

    const response = await fetch(appConfig.apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log('Apps Script raw response:', text);

    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Invalid JSON from Apps Script:', text);
      throw new Error('The server returned invalid JSON. Check the deployment and script code.');
    }

    console.log('Parsed Apps Script response:', data);

    if (!response.ok || !data.ok) {
      throw new Error(data.message || 'Unable to save data');
    }

    if (previousRowCount !== null) {
      const currentRowCount = await getResultsRowCount();
      const expectedRowCount = previousRowCount + payload.results.length;
      console.log('Row count verification:', { previousRowCount, currentRowCount, expectedRowCount, sent: payload.results.length });
      if (currentRowCount < expectedRowCount) {
        throw new Error(`Save did not add the expected rows (${currentRowCount - previousRowCount} of ${payload.results.length}). Check Apps Script Executions.`);
      }
    }

    const savedRows = data.saved || payload.results.length;
    const rowLocation = data.startRow ? ` starting at sheet row ${data.startRow}` : '';
    setStatus(`Saved ${savedRows} rows${rowLocation}`);
    resetRun();
  } catch (error) {
    console.error('Save failed:', error);
    setStatus(error.message || 'Save failed. Check the Apps Script URL.', true);
  }
}

if (attemptInput) {
  attemptInput.addEventListener('input', (event) => {
    state.attempt = Number(event.target.value) || 1;
  });
}

if (runInput) {
  runInput.addEventListener('input', (event) => {
    state.run = Number(event.target.value) || 1;
  });
}

document.getElementById('resetRunButton').addEventListener('click', () => {
  const confirmed = window.confirm('Are you sure you want to reset this run? Your mission answers will be cleared.');
  if (confirmed) {
    resetRun();
  }
});
document.getElementById('saveRunButton').addEventListener('click', saveRun);
startTimerButton.addEventListener('click', startTimer);
pauseTimerButton.addEventListener('click', pauseTimer);
resetTimerButton.addEventListener('click', resetTimer);

registerMissionHandlers();
renderTimer();
loadMissions();
