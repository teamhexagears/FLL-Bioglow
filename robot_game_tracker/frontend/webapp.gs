function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'missions';

  if (action === 'resultsCount') {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet && spreadsheet.getSheetByName('Results');
    const result = sheet
      ? { ok: true, rowCount: sheet.getLastRow() }
      : { ok: false, message: 'Results sheet not found.' };
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'missions') {
    const rows = getMissionLookup_();
    return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: false, message: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const rawBody = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    let data;

    try {
      data = JSON.parse(rawBody);
    } catch (jsonError) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        message: 'Invalid JSON payload received.',
        raw: String(rawBody).slice(0, 500)
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const results = Array.isArray(data.results) ? data.results : [];

    console.log('Received payload:', JSON.stringify({ results }, null, 2));

    if (!results.length) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, message: 'No mission results were sent.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Results');
    if (!sheet) {
      throw new Error('Results sheet not found. Please run the tracker setup first.');
    }
    ensureTimingHeaders_(sheet);

    const missionsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Missions');
    if (!missionsSheet) {
      throw new Error('Missions sheet not found. Please run the tracker setup first.');
    }
    const missionsByKey = Object.create(null);
    const missionLastRow = missionsSheet.getLastRow();
    if (missionLastRow > 1) {
      missionsSheet.getRange(2, 1, missionLastRow - 1, 5).getValues().forEach(function (row) {
        const storedMissionId = String(row[0] || '').trim();
        if (storedMissionId) {
          missionsByKey[storedMissionId.toUpperCase()] = {
            missionId: storedMissionId,
            runNumber: row[1] === '' || row[1] === null ? 'N/A' : row[1],
            missionName: String(row[2] || '').trim(),
            noPoints: Number(row[3] || 0),
            yesPoints: Number(row[4] || 0)
          };
        }
      });
    }

    const previousLastRow = sheet.getLastRow();
    if (previousLastRow > 1) {
      const existingRows = sheet.getRange(2, 1, previousLastRow - 1, 8).getValues();
      clearDerivedFormulaAnchors_(sheet, previousLastRow);
      const derivedColumns = existingRows.map(function (row) {
        const missionId = String(row[2] || '').trim().toUpperCase();
        const mission = missionsByKey[missionId];
        const isNoScheduledRun = mission && String(mission.runNumber).trim().toUpperCase() === 'N/A';
        const hasResult = row[4] !== '' && row[4] !== null;
        const answer = row[4] === true || String(row[4]).toUpperCase() === 'TRUE';
        return [
          mission ? mission.runNumber : row[1],
          missionId ? (mission ? mission.missionName : 'Unknown mission') : '',
          hasResult && mission ? (answer ? mission.yesPoints : mission.noPoints) : '',
          isNoScheduledRun ? 'N/A' : row[6],
          isNoScheduledRun ? 'N/A' : row[7]
        ];
      });
      sheet.getRange(2, 2, derivedColumns.length, 1).setValues(derivedColumns.map(function (row) {
        return [row[0]];
      }));
      sheet.getRange(2, 4, derivedColumns.length, 1).setValues(derivedColumns.map(function (row) {
        return [row[1]];
      }));
      sheet.getRange(2, 6, derivedColumns.length, 1).setValues(derivedColumns.map(function (row) {
        return [row[2]];
      }));
      sheet.getRange(2, 7, derivedColumns.length, 2).setValues(derivedColumns.map(function (row) {
        return [row[3], row[4]];
      }));
    }

    const attemptNumber = getNextAttemptNumber_(sheet);
    const rows = results.map(function (mission) {
      const requestedMissionId = String(mission.missionId || '').trim().toUpperCase();
      const missionDetails = missionsByKey[requestedMissionId];
      if (!missionDetails) {
        throw new Error('Mission ID "' + mission.missionId + '" was not found in the Missions sheet.');
      }
      if (!missionDetails.missionName) {
        throw new Error('Mission ID "' + missionDetails.missionId + '" has no mission name in the Missions sheet.');
      }
      const answer = mission.result === true;
      const isNoScheduledRun = String(missionDetails.runNumber).trim().toUpperCase() === 'N/A';
      const elapsedSeconds = isNoScheduledRun ? 'N/A' : Number(mission.elapsedSeconds);
      const sincePreviousSeconds = isNoScheduledRun ? 'N/A' : Number(mission.sincePreviousSeconds);
      if (!isNoScheduledRun && (!Number.isFinite(elapsedSeconds) || !Number.isFinite(sincePreviousSeconds))) {
        throw new Error('Timing data is missing for mission "' + missionDetails.missionId + '". Reload the latest frontend and redeploy the Apps Script backend.');
      }
      return [
        attemptNumber,
        missionDetails.runNumber,
        missionDetails.missionId,
        missionDetails.missionName,
        answer,
        answer ? missionDetails.yesPoints : missionDetails.noPoints,
        isNoScheduledRun ? 'N/A' : Math.round(elapsedSeconds * 1000) / 1000,
        isNoScheduledRun ? 'N/A' : Math.round(sincePreviousSeconds * 1000) / 1000
      ];
    });

    const startRow = 2;
    sheet.insertRowsBefore(startRow, rows.length);
    sheet.getRange(startRow, 1, rows.length, 8).setValues(rows);
    SpreadsheetApp.flush();
    const writtenRows = sheet.getRange(startRow, 1, rows.length, 8).getDisplayValues();
    console.log('Read back rows from sheet:', JSON.stringify(writtenRows));
    console.log('Wrote rows starting at row', startRow, 'total rows:', rows.length);

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      saved: rows.length,
      startRow: startRow,
      writtenRows: writtenRows
    }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureTimingHeaders_(sheet) {
  const expectedHeaders = ['Elapsed Time (seconds)', 'Since Previous Mission (seconds)'];
  const legacyHeaders = ['Elapsed Time (ms)', 'Since Previous Mission (ms)'];
  const headerRange = sheet.getRange(1, 7, 1, expectedHeaders.length);
  const currentHeaders = headerRange.getDisplayValues()[0];
  const allBlank = currentHeaders.every(function (value) { return value === ''; });
  const matches = expectedHeaders.every(function (header, index) {
    return currentHeaders[index] === header;
  });
  const legacyMatches = legacyHeaders.every(function (header, index) {
    return currentHeaders[index] === header;
  });

  if (allBlank) {
    headerRange.setValues([expectedHeaders]);
  } else if (legacyMatches) {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const timingRange = sheet.getRange(2, 7, lastRow - 1, 2);
      const values = timingRange.getValues().map(function (row) {
        return row.map(function (value) {
          const milliseconds = Number(value);
          return value === '' || value === null || !Number.isFinite(milliseconds)
            ? value
            : Math.round(milliseconds) / 1000;
        });
      });
      timingRange.setValues(values);
    }
    headerRange.setValues([expectedHeaders]);
  } else if (!matches) {
    throw new Error('Results columns G and H must be blank or have the timing headers.');
  }

  sheet.getRange(2, 7, Math.max(sheet.getMaxRows() - 1, 1), 2).setNumberFormat('0.000');
}

function clearDerivedFormulaAnchors_(sheet, lastRow) {
  [4, 6].forEach(function (column) {
    const formulas = sheet.getRange(2, column, lastRow - 1, 1).getFormulas();
    formulas.forEach(function (row, index) {
      if (row[0]) {
        sheet.getRange(index + 2, column).clearContent();
      }
    });
  });
}

function getNextAttemptNumber_(resultsSheet) {
  const lastRow = resultsSheet.getLastRow();
  if (lastRow <= 1) {
    return 1;
  }

  const values = resultsSheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let highestAttempt = 0;

  values.forEach(function (row) {
    const value = Number(row[0]);
    if (!Number.isNaN(value) && value > highestAttempt) {
      highestAttempt = value;
    }
  });

  return highestAttempt > 0 ? highestAttempt + 1 : 1;
}

function getMissionLookup_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('Missions');
  if (!sheet) {
    return [];
  }

  const values = sheet.getDataRange().getValues();
  if (!values.length) {
    return [];
  }

  const headers = values[0];
  const missionIndex = headers.indexOf('Mission ID');
  const runIndex = headers.indexOf('Run number');
  const nameIndex = headers.indexOf('Mission Name');
  const noPointsIndex = headers.indexOf('No Points');
  const yesPointsIndex = headers.indexOf('Yes Points');

  if (missionIndex === -1 || nameIndex === -1 || noPointsIndex === -1 || yesPointsIndex === -1) {
    return [];
  }

  return values.slice(1)
    .filter(function (row) { return row[missionIndex] && row[missionIndex].toString().trim(); })
    .map(function (row) {
      return {
        missionId: String(row[missionIndex]),
        runNumber: runIndex === -1 || row[runIndex] === '' ? 'N/A' : String(row[runIndex]),
        missionName: String(row[nameIndex]),
        noPoints: Number(row[noPointsIndex] || 0),
        yesPoints: Number(row[yesPointsIndex] || 0)
      };
    });
}
