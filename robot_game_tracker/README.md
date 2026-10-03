# FLL Bioglow Results Sheet

This setup creates two tabs in a Google Sheet:

- **Missions**: `Mission ID`, `Mission Name`, `No Points`, `Yes Points`. Add one row per mission and enter the points for each answer.
- **Results**: `Attempt Number`, `Run Number`, `Mission ID`, `Mission Name`, `Result`, `Score`. Record one row for each mission in each run. Select the mission ID and use the checkbox for the result; the mission name and score fill from the lookup tab.

## Create the sheet

1. Create a blank Google Sheet.
2. Open **Extensions > Apps Script**.
3. Replace the contents of `Code.gs` with the contents of this folder's `Code.gs` file, then save.
4. Return to the spreadsheet and reload it. A **FLL Tracker** menu will appear.
5. Select **FLL Tracker > Set up tracker tabs** and approve the requested access.
6. Add the official mission IDs, names, and Yes/No point values to the **Missions** tab.

The setup is safe to run again: it refreshes the formulas and formatting but does not clear mission or result rows. It expects the tab headers to remain unchanged.