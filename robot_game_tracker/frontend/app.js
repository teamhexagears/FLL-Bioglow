const defaultMissions = [
  { missionId: 'M01', missionName: 'Mission 1', noPoints: 0, yesPoints: 20 },
  { missionId: 'M02', missionName: 'Mission 2', noPoints: 0, yesPoints: 15 },
  { missionId: 'M03', missionName: 'Mission 3', noPoints: 0, yesPoints: 25 },
  { missionId: 'M04', missionName: 'Mission 4', noPoints: 5, yesPoints: 30 },
  { missionId: 'M05', missionName: 'Mission 5', noPoints: 0, yesPoints: 10 },
  { missionId: 'M06', missionName: 'Mission 6', noPoints: 5, yesPoints: 35 },
];

const appConfig = {
  apiUrl: ''
};

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
  currentScoreEl.textContent = getCurrentRunScore();
  completedCountEl.textContent = `${getCompletedMissionCount()} / ${state.missions.length}`;
  missionCountEl.textContent = state.missions.length;
}

function setStatus(message, isError = false) {
  saveStatusEl.textContent = message;
  saveStatusEl.style.background = isError ? 'rgba(212, 71, 71, 0.1)' : 'var(--primary-soft)';
  saveStatusEl.style.color = isError ? 'var(--danger)' : 'var(--primary-dark)';
}

function renderMissions() {
  missionList.innerHTML = '';

  state.missions.forEach((mission) => {
    const card = document.createElement('article');
    card.className = 'mission-card';

    const selectedResult = state.results[mission.missionId];

    card.innerHTML = `
      <div class="mission-top">
        <span class="mission-id">${mission.missionId}</span>
        <span class="mission-name">${mission.missionName}</span>
      </div>
      <div class="score-strip">
        <span>No: ${mission.noPoints}</span>
        <span>Yes: ${mission.yesPoints}</span>
      </div>
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
    state.missions = missions.length ? missions : defaultMissions;
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
  const payload = {
    attemptNumber: Number(attemptInput.value) || 1,
    runNumber: Number(runInput.value) || 1,
    results: state.missions.map((mission) => {
      const result = state.results[mission.missionId];
      return {
        missionId: mission.missionId,
        missionName: mission.missionName,
        result: Boolean(result),
        score: getMissionScore(mission, result)
      };
    })
  };

  if (!appConfig.apiUrl) {
    console.log('Preview payload:', payload);
    setStatus('Front-end demo mode: save is ready for backend hookup');
    return;
  }

  try {
    const response = await fetch(appConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Invalid JSON from Apps Script:', text);
      throw new Error('The server returned invalid JSON. Check the deployment and script code.');
    }

    if (!response.ok || !data.ok) {
      throw new Error(data.message || 'Unable to save data');
    }

    setStatus(`Saved ${data.saved || payload.results.length} rows`);
    resetRun();
  } catch (error) {
    console.error('Save failed:', error);
    setStatus(error.message || 'Save failed. Check the Apps Script URL.', true);
  }
}

attemptInput.addEventListener('input', (event) => {
  state.attempt = Number(event.target.value) || 1;
});

runInput.addEventListener('input', (event) => {
  state.run = Number(event.target.value) || 1;
});

document.getElementById('nextRunButton').addEventListener('click', () => {
  state.run = (Number(runInput.value) || 1) + 1;
  runInput.value = state.run;
  resetRun();
  setStatus(`Run set to ${state.run}`);
});

document.getElementById('resetRunButton').addEventListener('click', resetRun);
document.getElementById('saveRunButton').addEventListener('click', saveRun);

registerMissionHandlers();
loadMissions();
