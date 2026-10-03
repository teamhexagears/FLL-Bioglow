# FLL Bioglow Results Front End

This folder contains a lightweight front-end app for tracking FLL Bioglow mission results.

## What it does

- Lets the user choose an attempt number and run number
- Shows each mission as a Yes/No selector
- Looks up the resulting points from the mission table
- Calculates the score for the current run
- Saves the results to a Google Sheet using a Google Apps Script web app

## Result row format

Each row saved to the Google Sheet matches the required data layout:

- Attempt Number
- Run Number
- Mission ID
- Mission Name
- Result (Boolean)
- Score

## Required Google Apps Script backend

Add a Google Apps Script deployment URL into `app.js`:

```js
const appConfig = {
  apiUrl: 'PASTE_YOUR_DEPLOYED_GOOGLE_SCRIPT_WEB_APP_URL_HERE'
};
```

Then deploy your Apps Script project as a web app and paste the final URL there.

## Backend template

A working Apps Script template is included in the project as `google-apps-script-template.gs`.

## Run locally

Open the `index.html` file in a browser, or serve the folder with a small local server:

```bash
cd robot_game_tracker/frontend
python -m http.server 8000
```

Then open `http://localhost:8000`.
