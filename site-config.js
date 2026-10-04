/* ==========================================================
   OSSAE Exam Portal — shared site settings
   ----------------------------------------------------------
   feedbackUrl: the Google Apps Script "Web app" URL that stores
   student feedback in a Google Sheet (see Admin page → Student
   Feedback → "How to connect a Google Sheet").
   Leave empty ('') until the Sheet is set up — feedback is then
   kept only on the device where it was written.
   ========================================================== */
window.SS_CONFIG = window.SS_CONFIG || {
  feedbackUrl: ''
};
