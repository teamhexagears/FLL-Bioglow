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
      const existingRows = sheet.getRange(2, 1, previousLastRow - 1, 5).getValues();
      clearDerivedFormulaAnchors_(sheet, previousLastRow);
      const derivedColumns = existingRows.map(function (row) {
        const missionId = String(row[2] || '').trim().toUpperCase();
        const mission = missionsByKey[missionId];
        const hasResult = row[4] !== '' && row[4] !== null;
        const answer = row[4] === true || String(row[4]).toUpperCase() === 'TRUE';
        return [
          mission ? mission.runNumber : row[1],
          missionId ? (mission ? mission.missionName : 'Unknown mission') : '',
          hasResult && mission ? (answer ? mission.yesPoints : mission.noPoints) : ''
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
      return [
        attemptNumber,
        missionDetails.runNumber,
        missionDetails.missionId,
        missionDetails.missionName,
        answer,
        answer ? missionDetails.yesPoints : missionDetails.noPoints
      ];
    });

    const startRow = 2;
    sheet.insertRowsBefore(startRow, rows.length);
    sheet.getRange(startRow, 1, rows.length, 6).setValues(rows);
    SpreadsheetApp.flush();
    const writtenRows = sheet.getRange(startRow, 1, rows.length, 6).getDisplayValues();
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
