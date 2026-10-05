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
  sheetUrl: 'https://script.google.com/macros/s/AKfycbxRleZTNrtaTowRvYXvqiOWebqRCjK_3iV3vwsDyN3FD7Yq0qIr2Wy_wcM-UhnVU98j/exec'
};
