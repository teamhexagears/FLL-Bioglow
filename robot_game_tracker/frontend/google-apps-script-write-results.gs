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

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      saved: rows.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
