const TRACKER_MISSIONS_SHEET = 'Missions';
const TRACKER_RESULTS_SHEET = 'Results';
const TRACKER_MISSION_HEADERS = ['Mission ID', 'Mission Name', 'No Points', 'Yes Points'];
const TRACKER_RESULT_HEADERS = [
  'Attempt Number',
  'Run Number',
  'Mission ID',
  'Mission Name',
  'Result',
  'Score'
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
  const isEmpty = currentHeaders.every(function (value) { return value === ''; });

  if (isEmpty) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    return;
  }

  const matches = expectedHeaders.every(function (header, index) {
    return currentHeaders[index] === header;
  });
  if (!matches) {
    throw new Error('The headers in "' + sheet.getName() + '" do not match the tracker layout. No data was changed.');
  }
}

function setupMissionsTab_(sheet) {
  styleTrackerHeader_(sheet, TRACKER_MISSION_HEADERS.length);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 110);
  sheet.setColumnWidth(2, 260);
  sheet.setColumnWidths(3, 2, 120);
  sheet.getRange(2, 3, TRACKER_ROWS, 2).setNumberFormat('0');
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

  const dataRows = sheet.getRange(2, 1, TRACKER_ROWS, TRACKER_RESULT_HEADERS.length);
  dataRows.setVerticalAlignment('middle');
  sheet.getRange(2, 1, TRACKER_ROWS, 2).setNumberFormat('0');
  sheet.getRange(2, 3, TRACKER_ROWS, 1).setNumberFormat('@');
  sheet.getRange(2, 6, TRACKER_ROWS, 1).setNumberFormat('0');

  const missionIdRange = sheet.getRange(2, 3, TRACKER_ROWS, 1);
  const missionIdRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(missionsSheet.getRange('A2:A'), true)
    .setAllowInvalid(true)
    .build();
  missionIdRange.setDataValidation(missionIdRule);

  sheet.getRange('D2').setFormula(
    '=ARRAYFORMULA(IF(C2:C="","",IFNA(VLOOKUP(C2:C,Missions!A:B,2,FALSE),"Unknown mission")))'
  );
  sheet.getRange('F2').setFormula(
    '=ARRAYFORMULA(IF(C2:C="","",IF(E2:E="","",IFNA(IF(E2:E,VLOOKUP(C2:C,Missions!A:D,4,FALSE),VLOOKUP(C2:C,Missions!A:D,3,FALSE)),""))))'
  );

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