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
  sheetUrl: 'https://script.google.com/macros/s/AKfycbxJfpxee_Dx_bp-AXUy_1z8JBqjEZ-t_qpVA0_nBgq5oZOquO_RIc2rNjy4LRtMeuIWcQ/exec'
};
