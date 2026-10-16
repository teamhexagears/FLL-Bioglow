const TRACKER_MISSIONS_SHEET = 'Missions';
const TRACKER_RESULTS_SHEET = 'Results';
const TRACKER_MISSION_HEADERS = ['Mission ID', 'Run number', 'Mission Name', 'No Points', 'Yes Points'];
const TRACKER_RESULT_HEADERS = [
  'Attempt Number',
  'Run Number',
  'Mission ID',
  'Mission Name',
  'Result',
  'Score',
  'Elapsed Time (seconds)',
  'Since Previous Mission (seconds)'
];
const TRACKER_ROWS = 1000;

function setupTrackerSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const missions = getOrCreateTrackerSheet_(spreadsheet, TRACKER_MISSIONS_SHEET);
  const results = getOrCreateTrackerSheet_(spreadsheet, TRACKER_RESULTS_SHEET);

  ensureTrackerHeaders_(missions, TRACKER_MISSION_HEADERS);
  ensureTrackerHeaders_(results, TRACKER_RESULT_HEADERS);
  setupMissionsTab_(missions);
  setupResultsTab_(results, missions);

  spreadsheet.setActiveSheet(missions);
  spreadsheet.toast('Tracker tabs are ready. Add mission IDs, names, and Yes/No points to Missions.');
}

function getOrCreateTrackerSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function ensureTrackerHeaders_(sheet, expectedHeaders) {
  const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getDisplayValues()[0];
  const hasLegacyTimingHeaders = sheet.getName() === TRACKER_RESULTS_SHEET &&
    currentHeaders[6] === 'Elapsed Time (ms)' &&
    currentHeaders[7] === 'Since Previous Mission (ms)';

  if (hasLegacyTimingHeaders) {
    migrateTimingValuesToSeconds_(sheet);
    sheet.getRange(1, 7, 1, 2).setValues([expectedHeaders.slice(6, 8)]);
    currentHeaders[6] = expectedHeaders[6];
    currentHeaders[7] = expectedHeaders[7];
  }

  const firstBlankIndex = currentHeaders.findIndex(function (value) { return value === ''; });
  const existingHeaderCount = firstBlankIndex === -1 ? expectedHeaders.length : firstBlankIndex;
  const existingHeadersMatch = expectedHeaders.slice(0, existingHeaderCount).every(function (header, index) {
    return currentHeaders[index] === header;
  });
  const remainingHeadersAreBlank = currentHeaders.slice(existingHeaderCount).every(function (value) {
    return value === '';
  });

  if (!existingHeadersMatch || !remainingHeadersAreBlank) {
    throw new Error('The headers in "' + sheet.getName() + '" do not match the tracker layout. No data was changed.');
  }

  if (existingHeaderCount < expectedHeaders.length) {
    sheet.getRange(1, existingHeaderCount + 1, 1, expectedHeaders.length - existingHeaderCount)
      .setValues([expectedHeaders.slice(existingHeaderCount)]);
  }
}

function migrateTimingValuesToSeconds_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return;
  }

  const range = sheet.getRange(2, 7, lastRow - 1, 2);
  const values = range.getValues().map(function (row) {
    return row.map(function (value) {
      const milliseconds = Number(value);
      return value === '' || value === null || !Number.isFinite(milliseconds)
        ? value
        : Math.round(milliseconds) / 1000;
    });
  });
  range.setValues(values);
}

function setupMissionsTab_(sheet) {
  styleTrackerHeader_(sheet, TRACKER_MISSION_HEADERS.length);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 110);
  sheet.setColumnWidth(2, 90);
  sheet.setColumnWidth(3, 260);
  sheet.setColumnWidths(4, 2, 120);
  sheet.getRange(2, 2, TRACKER_ROWS, 1).setNumberFormat('0');
  sheet.getRange(2, 4, TRACKER_ROWS, 2).setNumberFormat('0');
  createFilterIfMissing_(sheet.getRange(1, 1, TRACKER_ROWS + 1, TRACKER_MISSION_HEADERS.length));
}

function setupResultsTab_(sheet, missionsSheet) {
  styleTrackerHeader_(sheet, TRACKER_RESULT_HEADERS.length);
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, 2, 110);
  sheet.setColumnWidth(3, 105);
  sheet.setColumnWidth(4, 240);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 90);
  sheet.setColumnWidth(7, 135);
  sheet.setColumnWidth(8, 205);

  const dataRows = sheet.getRange(2, 1, TRACKER_ROWS, TRACKER_RESULT_HEADERS.length);
  dataRows.setVerticalAlignment('middle');
  sheet.getRange(2, 1, TRACKER_ROWS, 2).setNumberFormat('0');
  sheet.getRange(2, 3, TRACKER_ROWS, 1).setNumberFormat('@');
  sheet.getRange(2, 6, TRACKER_ROWS, 1).setNumberFormat('0');
  sheet.getRange(2, 7, TRACKER_ROWS, 2).setNumberFormat('0.000');

  const missionIdRange = sheet.getRange(2, 3, TRACKER_ROWS, 1);
  const missionIdRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(missionsSheet.getRange('A2:A'), true)
    .setAllowInvalid(true)
    .build();
  missionIdRange.setDataValidation(missionIdRule);

  createFilterIfMissing_(sheet.getRange(1, 1, TRACKER_ROWS + 1, TRACKER_RESULT_HEADERS.length));
}

function styleTrackerHeader_(sheet, columnCount) {
  sheet.getRange(1, 1, 1, columnCount)
    .setBackground('#176b4a')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 34);
}

function createFilterIfMissing_(range) {
  if (!range.getSheet().getFilter()) {
    range.createFilter();
  }
}

function setupTrackerSheetMenu_() {
  SpreadsheetApp.getUi()
    .createMenu('FLL Tracker')
    .addItem('Set up tracker tabs', 'setupTrackerSheet')
    .addToUi();
}

function onOpen() {
  setupTrackerSheetMenu_();
}