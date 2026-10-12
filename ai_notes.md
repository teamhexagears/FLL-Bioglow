# FLL Bioglow Tracker Progress

## Overview
This project is for tracking FLL Bioglow robot game results using a front-end web app and a Google Sheets backend.

## Current status
- A basic front-end interface was created for mission tracking.
- The app includes attempt and run number inputs.
- Mission cards allow Yes/No answers.
- The current run score updates automatically.
- The app is structured to save result rows in the required format:
  - Attempt Number
  - Run Number
  - Mission ID
  - Mission Name
  - Result
  - Score
- A Google Apps Script backend template was created to connect to the Results sheet.

## Project files
- `robot_game_tracker/frontend/index.html` — main page layout
- `robot_game_tracker/frontend/styles.css` — styling for the app
- `robot_game_tracker/frontend/app.js` — front-end logic and save flow
- `robot_game_tracker/frontend/google-apps-script-template.gs` — Google Apps Script backend template
- `robot_game_tracker/frontend/README.md` — usage notes

## Data flow
1. User selects mission outcomes as Yes or No.
2. The app calculates the score for each mission based on the lookup values.
3. The user enters attempt and run numbers.
4. The app prepares rows for the Google Sheet.
5. A backend web app sends the results to the Results sheet.

## Important note
The front end is ready, but the Google Apps Script deployment URL still needs to be added in `app.js` before live saving works.

## Next possible improvements
- Connect directly to the real mission lookup sheet.
- Load mission list from the Google sheet instead of a demo list.
- Add editing of previous attempts/runs.
- Add team statistics dashboard.
- Add export or CSV download.

## Verification
- The front-end page was successfully served locally and returned HTTP 200 OK from `http://localhost:8000`.
