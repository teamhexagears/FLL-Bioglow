function normalizeMission(mission) {
  const missionName = String(mission.missionName || '').trim();
  return {
    ...mission,
    missionId: String(mission.missionId || '').trim().toUpperCase(),
    missionName: missionName ? missionName[0].toUpperCase() + missionName.slice(1) : missionName,
    runNumber: mission.runNumber ?? 'N/A'
  };
}

const defaultRunNumbers = {
  m0: 'N/A', m1a: 5, m1b: 5, m2a: 3, m2b: 3, m2c: 3,
  m3a: 1, m3b: 1, m5a: 3, m5b: 3,
  m6a: 8, m6b: 8, m6c: 8, m6d: 8, m7a: 7, m7b: 7,
  m8: 4, m9a: 4, m9b: 4, m9c: 4, m10a: 'N/A', m10b: 'N/A',
  m11a: 5, m11b: 8, m12a: 6, m12b: 7, m12c: 6, m13: 8,
  m14a: 9, m14b: 9, m14c: 9, m14d: 9, m14e: 9, m14f: 9, m14g: 9, m14h: 9,
  m15a: 2, m15b: 2, m15c: 2,
  pt1: 'N/A', pt2: 'N/A', pt3: 'N/A', pt4: 'N/A', pt5: 'N/A'
};

function getMissionRunOrder(mission) {
  const value = String(mission.runNumber ?? '').trim();
  const runNumber = Number(value);
  return value && value.toUpperCase() !== 'N/A' && Number.isFinite(runNumber)
    ? runNumber
    : Number.POSITIVE_INFINITY;
}

function compareMissionOrder(firstMission, secondMission) {
  return getMissionRunOrder(firstMission) - getMissionRunOrder(secondMission);
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
].map((mission) => normalizeMission({
  ...mission,
  runNumber: defaultRunNumbers[mission.missionId] ?? 'N/A'
})).sort(compareMissionOrder);

const appConfig = {
  apiUrl: 'https://script.google.com/macros/s/AKfycbyCoIUYHrSelajtNOYZnuQmY1FDijxKb94RhZSny8Xt92B7UpCCBWpp_RoemHKq9K4p/exec'
}

const state = {
  missions: [],
  results: {},
  missionTimings: {}
};

const missionList = document.getElementById('missionList');
const currentScoreEl = document.getElementById('currentScore');
const completedCountEl = document.getElementById('completedCount');
const missionCountEl = document.getElementById('missionCount');
const saveStatusEl = document.getElementById('saveStatus');
const saveRunButton = document.getElementById('saveRunButton');
const timerDisplayEl = document.getElementById('timerDisplay');
const timerStateEl = document.getElementById('timerState');
const startTimerButton = document.getElementById('startTimerButton');
const pauseTimerButton = document.getElementById('pauseTimerButton');
const resetTimerButton = document.getElementById('resetTimerButton');
const timerDuration = 2 * 60 * 1000 + 30 * 1000;
let timerRemaining = timerDuration;
let timerDeadline = 0;
let timerInterval = null;
let saveInProgress = false;
let lastMissionClickElapsedMs = null;

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
  const overtime = timerRemaining < 0;
  const totalSeconds = Math.ceil(Math.abs(timerRemaining) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeText = `${minutes}:${String(seconds).padStart(2, '0')}`;
  timerDisplayEl.textContent = overtime ? `-${timeText}` : timeText;
  timerDisplayEl.classList.toggle('timer-low', timerRemaining <= 30 * 1000);
  startTimerButton.disabled = timerInterval !== null;
  pauseTimerButton.disabled = timerInterval === null;
}

function updateTimer() {
  if (timerInterval === null) return;

  timerRemaining = timerDeadline - Date.now();
  if (timerRemaining <= 0) {
    timerStateEl.textContent = 'Time is up';
  }
  renderTimer();
}

function getTimerElapsedMs() {
  const remainingMs = timerInterval === null ? timerRemaining : timerDeadline - Date.now();
  return Math.max(0, Math.round(timerDuration - remainingMs));
}

function startTimer() {
  if (timerInterval !== null) return;
  timerDeadline = Date.now() + timerRemaining;
  timerStateEl.textContent = timerRemaining < 0 ? 'Overtime' : 'Running';
  timerInterval = window.setInterval(updateTimer, 250);
  renderTimer();
}

function pauseTimer() {
  if (timerInterval === null) return;
  timerRemaining = timerDeadline - Date.now();
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerStateEl.textContent = 'Paused';
  renderTimer();
}

function resetTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = timerDuration;
  state.missionTimings = {};
  lastMissionClickElapsedMs = null;
  timerStateEl.textContent = 'Ready';
  renderTimer();
}

function renderMissions() {
  missionList.innerHTML = '';

  const missionsByRun = new Map();
  state.missions.forEach((mission) => {
    const value = String(mission.runNumber ?? '').trim();
    const runNumber = value && value.toUpperCase() !== 'N/A' ? value : 'N/A';
    if (!missionsByRun.has(runNumber)) {
      missionsByRun.set(runNumber, []);
    }
    missionsByRun.get(runNumber).push(mission);
  });

  const runGroups = [...missionsByRun.entries()].sort(([firstRun], [secondRun]) => {
    if (firstRun === 'N/A') return 1;
    if (secondRun === 'N/A') return -1;
    return Number(firstRun) - Number(secondRun);
  });

  runGroups.forEach(([runNumber, missions]) => {
    const runRow = document.createElement('section');
    runRow.className = 'run-row';
    runRow.setAttribute('aria-label', `Run ${runNumber} missions`);

    const heading = document.createElement('h3');
    heading.className = 'run-heading';
    heading.textContent = runNumber === 'N/A' ? 'N/A' : `Run ${runNumber}`;

    const runMissionList = document.createElement('div');
    runMissionList.className = 'run-missions';

    missions.forEach((mission) => {
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

      runMissionList.appendChild(card);
    });

    runRow.append(heading, runMissionList);
    missionList.appendChild(runRow);
  });

  updateTotals();
}

function registerMissionHandlers() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.answer-button');
    if (!button) {
      return;
    }

    if (timerInterval === null) {
      window.alert('click the start button to start the timer before clicking and apologize to your team members!!!!!');
      return;
    }

    const missionId = button.dataset.missionId;
    const mission = state.missions.find((item) => item.missionId === missionId);
    const value = button.dataset.answer === 'true';
    const elapsedMs = getTimerElapsedMs();
    const sincePreviousMs = lastMissionClickElapsedMs === null
      ? elapsedMs
      : Math.max(0, elapsedMs - lastMissionClickElapsedMs);
    state.results[missionId] = value;
    const hasNoScheduledRun = String(mission && mission.runNumber || '').trim().toUpperCase() === 'N/A';
    state.missionTimings[missionId] = hasNoScheduledRun
      ? { elapsedMs: 'N/A', sincePreviousMs: 'N/A' }
      : { elapsedMs, sincePreviousMs };
    lastMissionClickElapsedMs = elapsedMs;
    renderMissions();
  });
}

function resetRun() {
  state.results = {};
  state.missionTimings = {};
  lastMissionClickElapsedMs = null;
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
  if (saveInProgress) {
    return;
  }

  saveInProgress = true;
  saveRunButton.disabled = true;
  saveRunButton.textContent = 'Saving...';

  const selectedMissions = state.missions.filter((mission) => Object.prototype.hasOwnProperty.call(state.results, mission.missionId));

  if (!selectedMissions.length) {
    setStatus('Select at least one mission before saving.', true);
    saveInProgress = false;
    saveRunButton.disabled = false;
    saveRunButton.textContent = 'Save Run to Google Sheet';
    return;
  }

  const payload = {
    results: selectedMissions.map((mission) => {
      const result = state.results[mission.missionId];
      const timing = state.missionTimings[mission.missionId] || { elapsedMs: 0, sincePreviousMs: 0 };
      const row = {
        missionId: mission.missionId,
        missionName: mission.missionName,
        result: Boolean(result),
        score: getMissionScore(mission, result),
        elapsedSeconds: timing.elapsedMs === 'N/A'
          ? 'N/A'
          : Number((timing.elapsedMs / 1000).toFixed(3)),
        sincePreviousSeconds: timing.sincePreviousMs === 'N/A'
          ? 'N/A'
          : Number((timing.sincePreviousMs / 1000).toFixed(3))
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
    saveInProgress = false;
    saveRunButton.disabled = false;
    saveRunButton.textContent = 'Save Run to Google Sheet';
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
    const completionUrl = new URL('save-complete.html', window.location.href);
    completionUrl.searchParams.set('saved', String(savedRows));
    const runNumbers = [...new Set(selectedMissions.map((mission) => String(mission.runNumber ?? 'N/A').trim()).filter(Boolean))];
    completionUrl.searchParams.set('runs', runNumbers.join(', '));
    if (data.startRow) {
      completionUrl.searchParams.set('startRow', String(data.startRow));
    }
    window.location.assign(completionUrl);
  } catch (error) {
    console.error('Save failed:', error);
    setStatus(error.message || 'Save failed. Check the Apps Script URL.', true);
    saveInProgress = false;
    saveRunButton.disabled = false;
    saveRunButton.textContent = 'Save Run to Google Sheet';
  }
}

document.getElementById('resetRunButton').addEventListener('click', () => {
  const confirmed = window.confirm('Are you sure you want to reset this run? Your mission answers will be cleared.');
  if (confirmed) {
    resetRun();
  }
});
saveRunButton.addEventListener('click', saveRun);
startTimerButton.addEventListener('click', startTimer);
pauseTimerButton.addEventListener('click', pauseTimer);
resetTimerButton.addEventListener('click', resetTimer);

registerMissionHandlers();
renderTimer();
loadMissions();
