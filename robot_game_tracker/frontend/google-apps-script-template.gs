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

    const attemptNumber = Number(data.attemptNumber || 1);
    const runNumber = Number(data.runNumber || 1);
    const results = Array.isArray(data.results) ? data.results : [];

    console.log('Received payload:', JSON.stringify({ attemptNumber, runNumber, results }, null, 2));

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
    const missionIdsByKey = Object.create(null);
    const missionLastRow = missionsSheet.getLastRow();
    if (missionLastRow > 1) {
      missionsSheet.getRange(2, 1, missionLastRow - 1, 1).getDisplayValues().forEach(function (row) {
        const storedMissionId = String(row[0] || '').trim();
        if (storedMissionId) {
          missionIdsByKey[storedMissionId.toUpperCase()] = storedMissionId;
        }
      });
    }

    const rows = results.map(function (mission) {
      const requestedMissionId = String(mission.missionId || '').trim().toUpperCase();
      const storedMissionId = missionIdsByKey[requestedMissionId];
      if (!storedMissionId) {
        throw new Error('Mission ID "' + mission.missionId + '" was not found in the Missions sheet.');
      }
      const row = [
        attemptNumber,
        runNumber,
        storedMissionId,
        mission.result === true
      ];
      console.log('Prepared row for sheet:', JSON.stringify(row));
      return row;
    });

    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, 3).setValues(rows.map(function (row) {
      return row.slice(0, 3);
    }));
    sheet.getRange(startRow, 5, rows.length, 1).setValues(rows.map(function (row) {
      return [row[3]];
    }));
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
        missionName: String(row[nameIndex]),
        noPoints: Number(row[noPointsIndex] || 0),
        yesPoints: Number(row[yesPointsIndex] || 0)
      };
    });
}
