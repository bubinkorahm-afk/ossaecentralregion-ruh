/* ==========================================================
   OSSAE Exam Portal — shared site settings
   ----------------------------------------------------------
   sheetUrl: the Google Apps Script "Web app" URL (ends in /exec)
   connected to the OSSAE Google Sheet. Every student's exam result
   and every feedback message is sent here.
   Set up / update the script from: Admin page → ☁️ Cloud Sync.
   Leave empty ('') to keep data only on each device.
   ========================================================== */
window.SS_CONFIG = window.SS_CONFIG || {
  sheetUrl: 'https://script.google.com/macros/s/AKfycbwEoZ69NHx3J2SiWo8-_6m45Xz7A_39rg79VN2fXo1HDNXNkBFFKDw568BI3HCuPgwYtg/exec'
};
