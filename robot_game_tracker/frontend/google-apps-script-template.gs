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

    if (!results.length) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, message: 'No mission results were sent.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Results');
    if (!sheet) {
      throw new Error('Results sheet not found. Please run the tracker setup first.');
    }

    const rows = results.map(function (mission) {
      return [
        attemptNumber,
        runNumber,
        mission.missionId,
        mission.missionName,
        Boolean(mission.result),
        Number(mission.score || 0)
      ];
    });

    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, 6).setValues(rows);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, saved: rows.length }))
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
