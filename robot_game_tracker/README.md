# FLL Bioglow Results Sheet

This setup creates two tabs in a Google Sheet:

- **Missions**: `Mission ID`, `Run number`, `Mission Name`, `No Points`, `Yes Points`. Add one row per mission and enter its run number and points for each answer.
- **Results**: `Attempt Number`, `Run Number`, `Mission ID`, `Mission Name`, `Result`, `Score`, `Elapsed Time (seconds)`, `Since Previous Mission (seconds)`. Timing values are rounded to three decimal places; the first mission uses its elapsed time for both timing columns, and N/A-run missions show `N/A` in both.

## Create the sheet

1. Create a blank Google Sheet.
2. Open **Extensions > Apps Script**.
3. Replace the contents of `Code.gs` with the contents of this folder's `Code.gs` file, then save.
4. Return to the spreadsheet and reload it. A **FLL Tracker** menu will appear.
5. Select **FLL Tracker > Set up tracker tabs** and approve the requested access.
6. Add the official mission IDs, names, and Yes/No point values to the **Missions** tab.

The setup is safe to run again: it refreshes formatting, adds the timing headers when missing, and does not clear mission or result rows. Existing millisecond values are converted to seconds when the timing headers are migrated; N/A-run missions are marked `N/A`, while other rows with no recorded timing remain blank.