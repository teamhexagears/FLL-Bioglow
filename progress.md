# FLL Bioglow Progress Log

## Conversation recap
- We are building a front-end mission tracker for FLL Bioglow and saving results to a Google Sheet.
- Each saved mission gets its Run Number from that mission's row in the Missions tab; attempt numbers are generated automatically by the backend.
- The tracker loads mission data and allows Yes/No mission answers.
- Results are saved in this column order:
  - Attempt Number
  - Run Number
  - Mission ID
  - Mission Name
  - Result
  - Score
- The Google Apps Script backend inserts each new run below the headers at row 2 and writes all six result columns directly.
- The live deployment must be redeployed after changing Apps Script code because the browser app points to the deployed web app URL, not the local file contents.
- Each save now counts as a new attempt: the backend reads the highest existing attempt number and sets the next one to highest + 1, or 1 if the sheet is empty.

## Current status
- Front-end no longer asks for a global run number; the backend looks up the correct run number for each mission.
- Apps Script logic is in place for saving results and auto-generating the attempt number.
- New results are inserted at row 2 so the latest run appears at the top of the Results sheet.
- A live redeploy of the Google Apps Script web app is required for the change to take effect.
- Blank Mission Name and Score values came from relying on D2/F2 array formulas, which could be missing, displaced by row insertion, or conflict with direct writes.
- Both Apps Script source copies now look up mission names and Yes/No points from the Missions tab, remove stale D/F formula anchors, backfill existing rows, and write all six columns for new rows.
- Tracker setup no longer installs D2/F2 array formulas, preventing them from conflicting with saved values.
- The configured live deployment responds to the read-only results-count request, and a no-op POST returns the expected "No mission results were sent" validation response.
- The user observed "Run reset" after saving. The frontend's successful-save path called resetRun after setting the saved message, overwriting the confirmation; the backend was also appending rows below the existing data.
- The frontend now sets the saved confirmation after resetting answers, and both backend copies insert new rows at row 2.
- After a successful save and row-count verification, the frontend now navigates to save-complete.html with the run number, saved result count, and sheet row range. The completion page links back to index.html.
- The live Results sheet reports last row 1006; after deployment, a save should be visible immediately below the headers.
- The configured Missions endpoint returns per-mission run numbers. Both save handlers now source Results column B from those lookup values and backfill existing rows to match.
- The current apiUrl in app.js was queried directly and returns 44 Missions records with their assigned run numbers (for example m1a=5 and m2a=2).
- The local save payload sends mission IDs and results; the local webapp.gs maps each ID to its Missions run number. A live GET proves the Missions lookup is current, but not that the deployed POST handler is current; Results showing 1 indicates the active doPost may still be an older deployment.

## Files involved
- [robot_game_tracker/frontend/index.html](robot_game_tracker/frontend/index.html) — main app UI
- [robot_game_tracker/frontend/app.js](robot_game_tracker/frontend/app.js) — front-end logic and payload creation
- [robot_game_tracker/frontend/webapp.gs](robot_game_tracker/frontend/webapp.gs) — deployed Apps Script backend
- [robot_game_tracker/frontend/google-apps-script-write-results.gs](robot_game_tracker/frontend/google-apps-script-write-results.gs) — backup backend version

## Next steps
1. Deploy the current frontend/webapp.gs code as a new version of the Apps Script deployment used by app.js.
2. Save a mission with a known run assignment (for example m1a should save Run Number 5) and confirm the completion page.
3. Confirm Results column B matches the Missions tab for each new row.
