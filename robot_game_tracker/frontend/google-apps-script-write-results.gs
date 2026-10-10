function doPost(e) {
  try {
    const rawBody = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    let payload;

    try {
      payload = JSON.parse(rawBody);
    } catch (jsonError) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        message: 'Invalid JSON payload received.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const attemptNumber = Number(payload.attemptNumber || 1);
    const runNumber = Number(payload.runNumber || 1);
    const results = Array.isArray(payload.results) ? payload.results : [];

    if (!results.length) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        message: 'No mission results were sent.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Results');

    if (!sheet) {
      throw new Error('Results sheet not found. Create a Results tab first.');
    }

    const missionsSheet = spreadsheet.getSheetByName('Missions');
    if (!missionsSheet) {
      throw new Error('Missions sheet not found. Create a Missions tab first.');
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
      return [
        attemptNumber,
        runNumber,
        storedMissionId,
        mission.result === true
      ];
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

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      saved: rows.length,
      startRow: startRow,
      writtenRows: writtenRows
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
