/* ==========================================================
   OSSAE Exam Portal — Help assistant (predefined FAQ chatbot)
   Self-contained: injects its own styles and markup.
   Answers come only from the FAQ list below (no AI / no server).
   ========================================================== */
(function(){
  "use strict";
  if (window.__ssbotLoaded) return;
  window.__ssbotLoaded = true;

  // ---------- FAQ content ----------
  // k: keywords used to match typed questions (English + Malayalam + common spellings)
  var FAQ = [
    { id:'start',
      q:{ en:'How do I start the exam?', ml:'പരീക്ഷ എങ്ങനെ ആരംഭിക്കാം?' },
      a:{ en:'1) On the home page, tap your class (V to XII).\n2) Choose English or Malayalam.\n3) Fill in your student details and Sunday School details.\n4) Tap “Start Exam”, then “I am Ready · Start Exam”. The timer starts immediately.',
          ml:'1) ഹോം പേജിൽ നിങ്ങളുടെ ക്ലാസ്സ് (V മുതൽ XII വരെ) ടാപ്പ് ചെയ്യുക.\n2) English അല്ലെങ്കിൽ മലയാളം തിരഞ്ഞെടുക്കുക.\n3) വിദ്യാർത്ഥിയുടെയും സൺഡേ സ്കൂളിന്റെയും വിവരങ്ങൾ നൽകുക.\n4) “പരീക്ഷ ആരംഭിക്കുക” ടാപ്പ് ചെയ്ത് “ഞാൻ തയ്യാറാണ്” അമർത്തുക. ഉടൻ സമയം ആരംഭിക്കും.' },
      k:['start','begin','how to','take exam','write exam','attend','ആരംഭി','തുടങ്ങ','എങ്ങനെ'] },

    { id:'details',
      q:{ en:'What details do I need to enter?', ml:'ഏതെല്ലാം വിവരങ്ങൾ നൽകണം?' },
      a:{ en:'You need: full name, roll number, phone number (e.g. +966xxxxxxxx or +91xxxxxxxxxx), Sunday School name, Sunday School code and your diocese. Every field is required.',
          ml:'മുഴുവൻ പേര്, റോൾ നമ്പർ, ഫോൺ നമ്പർ (ഉദാ: +966xxxxxxxx / +91xxxxxxxxxx), സൺഡേ സ്കൂളിന്റെ പേര്, സൺഡേ സ്കൂൾ കോഡ്, ഭദ്രാസനം — എല്ലാം നിർബന്ധമാണ്.' },
      k:['detail','details','form','fill','name','roll','phone','mobile','number','diocese','വിവര','പേര്','റോൾ','ഫോൺ','ഭദ്രാസന'] },

    { id:'code',
      q:{ en:'Where do I get the Sunday School code?', ml:'സൺഡേ സ്കൂൾ കോഡ് എവിടെ നിന്ന് ലഭിക്കും?' },
      a:{ en:'The Sunday School code is given by your Sunday School HM (Headmaster/Headmistress). Please ask your HM or class teacher for it.',
          ml:'സൺഡേ സ്കൂൾ കോഡ് നിങ്ങളുടെ സൺഡേ സ്കൂൾ HM ആണ് നൽകുന്നത്. ദയവായി HM-നോടോ ക്ലാസ്സ് അധ്യാപകനോടോ ചോദിക്കുക.' },
      k:['code','school code','password','pin','hm','headmaster','കോഡ്'] },

    { id:'wrongcode',
      q:{ en:'It says “Wrong Sunday School Code”', ml:'“തെറ്റായ സൺഡേ സ്കൂൾ കോഡ്” എന്ന് കാണിക്കുന്നു' },
      a:{ en:'Check the code for typing mistakes or extra spaces/characters, and make sure a diocese is selected. If it still fails, contact your Sunday School HM for the correct code.',
          ml:'കോഡിൽ ടൈപ്പിംഗ് പിശകോ അധിക അക്ഷരങ്ങളോ ഉണ്ടോ എന്ന് പരിശോധിക്കുക, ഭദ്രാസനം തിരഞ്ഞെടുത്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക. തുടർന്നും പ്രശ്നമുണ്ടെങ്കിൽ ശരിയായ കോഡിനായി HM-നെ ബന്ധപ്പെടുക.' },
      k:['wrong','invalid','incorrect','error','not working','code error','തെറ്റ','പിശക്'] },

    { id:'startbtn',
      q:{ en:'The Start Exam button is not working', ml:'“പരീക്ഷ ആരംഭിക്കുക” ബട്ടൺ പ്രവർത്തിക്കുന്നില്ല' },
      a:{ en:'The Start button stays grey until every field is filled: name, roll number, phone, Sunday School name, Sunday School code and diocese. Check that none are empty and the code is correct.',
          ml:'എല്ലാ വിവരങ്ങളും (പേര്, റോൾ നമ്പർ, ഫോൺ, സൺഡേ സ്കൂളിന്റെ പേര്, കോഡ്, ഭദ്രാസനം) നൽകുന്നതുവരെ ബട്ടൺ പ്രവർത്തിക്കില്ല. ഒന്നും ഒഴിഞ്ഞുകിടക്കുന്നില്ലെന്നും കോഡ് ശരിയാണെന്നും ഉറപ്പാക്കുക.' },
      k:['button','grey','gray','disabled','cannot start','can\'t start','not start','ബട്ടൺ','പ്രവർത്തിക്കുന്നില്ല'] },

    { id:'time',
      q:{ en:'How many questions and how much time?', ml:'എത്ര ചോദ്യങ്ങൾ, എത്ര സമയം?' },
      a:{ en:'Classes V–IX: 25 questions in 25 minutes.\nClasses X–XII: 30 questions in 30 minutes.\nQuestions are chosen randomly from the full question bank each time.',
          ml:'ക്ലാസ്സ് V–IX: 25 മിനിറ്റിൽ 25 ചോദ്യങ്ങൾ.\nക്ലാസ്സ് X–XII: 30 മിനിറ്റിൽ 30 ചോദ്യങ്ങൾ.\nഓരോ തവണയും ചോദ്യബാങ്കിൽ നിന്ന് ക്രമരഹിതമായി ചോദ്യങ്ങൾ തിരഞ്ഞെടുക്കുന്നു.' },
      k:['how many','questions','time','minutes','duration','long','timer','ചോദ്യ','സമയം','മിനിറ്റ്'] },

    { id:'timeup',
      q:{ en:'What happens when time runs out?', ml:'സമയം കഴിഞ്ഞാൽ എന്ത് സംഭവിക്കും?' },
      a:{ en:'The timer turns orange at 5 minutes left and red at 2 minutes left. When time reaches zero, the exam is submitted automatically and your result is shown.',
          ml:'5 മിനിറ്റ് ബാക്കിയുള്ളപ്പോൾ ടൈമർ ഓറഞ്ചും 2 മിനിറ്റ് ബാക്കിയുള്ളപ്പോൾ ചുവപ്പും ആകും. സമയം തീരുമ്പോൾ പരീക്ഷ തനിയെ സമർപ്പിക്കപ്പെടുകയും ഫലം കാണിക്കുകയും ചെയ്യും.' },
      k:['time up','time out','runs out','over','finish','auto','submit','കഴിഞ്ഞ','തീരു','സമർപ്പി'] },

    { id:'pass',
      q:{ en:'What is the pass mark?', ml:'വിജയിക്കാൻ എത്ര മാർക്ക് വേണം?' },
      a:{ en:'You need 50% or more to PASS. Below 50% shows “TRY AGAIN”. Your score, percentage and time taken are shown on the result screen.',
          ml:'വിജയിക്കാൻ 50% അല്ലെങ്കിൽ അതിൽ കൂടുതൽ വേണം. 50%-ൽ താഴെയെങ്കിൽ “വീണ്ടും ശ്രമിക്കുക” എന്ന് കാണിക്കും. സ്കോർ, ശതമാനം, എടുത്ത സമയം എന്നിവ ഫലത്തിൽ കാണാം.' },
      k:['pass','mark','marks','score','percentage','result','fail','വിജയ','മാർക്ക്','സ്കോർ','ഫലം'] },

    { id:'change',
      q:{ en:'Can I change my answer?', ml:'ഉത്തരം മാറ്റാൻ കഴിയുമോ?' },
      a:{ en:'No. Once you tap an option, the answer is locked. A correct answer turns green; a wrong answer turns red and the correct one is shown in green. Read all options carefully before tapping.',
          ml:'ഇല്ല. ഒരു ഉത്തരം ടാപ്പ് ചെയ്താൽ അത് മാറ്റാൻ കഴിയില്ല. ശരിയാണെങ്കിൽ പച്ചയും തെറ്റാണെങ്കിൽ ചുവപ്പും (ശരിയുത്തരം പച്ചയിൽ) കാണിക്കും. ടാപ്പ് ചെയ്യുന്നതിനു മുൻപ് എല്ലാ ഉത്തരങ്ങളും ശ്രദ്ധയോടെ വായിക്കുക.' },
      k:['change','edit','undo','modify','go back','previous','skip','മാറ്റ','തിരുത്ത'] },

    { id:'lang',
      q:{ en:'Can I write the exam in Malayalam?', ml:'മലയാളത്തിൽ പരീക്ഷ എഴുതാമോ?' },
      a:{ en:'Yes. Choose English or മലയാളം before starting. During the exam you can switch language any time with the 🌐 button above each question.',
          ml:'എഴുതാം. ആരംഭിക്കുന്നതിനു മുൻപ് English അല്ലെങ്കിൽ മലയാളം തിരഞ്ഞെടുക്കുക. പരീക്ഷയ്ക്കിടയിൽ ഓരോ ചോദ്യത്തിനു മുകളിലുള്ള 🌐 ബട്ടൺ ഉപയോഗിച്ച് എപ്പോൾ വേണമെങ്കിലും ഭാഷ മാറ്റാം.' },
      k:['malayalam','english','language','translate','ഭാഷ','മലയാള','ഇംഗ്ലീഷ്'] },

    { id:'closed',
      q:{ en:'The page closed or refreshed during my exam', ml:'പരീക്ഷയ്ക്കിടെ പേജ് അടഞ്ഞുപോയി' },
      a:{ en:'That attempt cannot be continued. Open your class again and start a new exam — you will get a fresh set of questions. Tip: don’t refresh, close or go back while the exam is running.',
          ml:'ആ പരീക്ഷ തുടരാൻ കഴിയില്ല. ക്ലാസ്സ് വീണ്ടും തുറന്ന് പുതിയ പരീക്ഷ ആരംഭിക്കുക — പുതിയ ചോദ്യങ്ങൾ ലഭിക്കും. പരീക്ഷയ്ക്കിടയിൽ പേജ് റിഫ്രഷ് ചെയ്യുകയോ അടയ്ക്കുകയോ ചെയ്യരുത്.' },
      k:['closed','close','refresh','reload','crash','internet','network','lost','back button','അടഞ്ഞ','റിഫ്രഷ്','ഇന്റർനെറ്റ്'] },

    { id:'abort',
      q:{ en:'What does “Abort Exam” do?', ml:'“പരീക്ഷ ഉപേക്ഷിക്കുക” എന്തിനാണ്?' },
      a:{ en:'“Abort Exam” stops the exam immediately. All your answers and score for that attempt are lost and you return to the start form. Only use it if you really want to stop.',
          ml:'“പരീക്ഷ ഉപേക്ഷിക്കുക” പരീക്ഷ ഉടൻ നിർത്തും. ആ ശ്രമത്തിലെ എല്ലാ ഉത്തരങ്ങളും സ്കോറും നഷ്ടപ്പെടും. ശരിക്കും നിർത്തണമെങ്കിൽ മാത്രം ഉപയോഗിക്കുക.' },
      k:['abort','quit','stop','cancel','exit','ഉപേക്ഷി','നിർത്ത'] },

    { id:'retake',
      q:{ en:'Can I take the exam again?', ml:'വീണ്ടും പരീക്ഷ എഴുതാമോ?' },
      a:{ en:'Yes. This is a practice exam — after your result, tap “Take Exam Again”. A new random set of questions is chosen each time, so practise as often as you like.',
          ml:'എഴുതാം. ഇത് പരിശീലന പരീക്ഷയാണ് — ഫലം കണ്ട ശേഷം “വീണ്ടും പരീക്ഷയെഴുതുക” അമർത്തുക. ഓരോ തവണയും പുതിയ ചോദ്യങ്ങൾ ലഭിക്കും.' },
      k:['again','retake','repeat','second time','another','more than once','വീണ്ടും'] },

    { id:'review',
      q:{ en:'How can I see the correct answers?', ml:'ശരിയുത്തരങ്ങൾ എങ്ങനെ കാണാം?' },
      a:{ en:'On the result screen, tap “Show Answer Review”. It lists every question with your answer and the correct answer.',
          ml:'ഫല സ്ക്രീനിൽ “ഉത്തരങ്ങൾ പരിശോധിക്കുക” ടാപ്പ് ചെയ്യുക. ഓരോ ചോദ്യവും നിങ്ങളുടെ ഉത്തരവും ശരിയുത്തരവും കാണാം.' },
      k:['correct answer','answers','review','check answer','solution','ശരിയുത്തര','പരിശോധി'] },

    { id:'share',
      q:{ en:'How do I share my result?', ml:'ഫലം എങ്ങനെ പങ്കിടാം?' },
      a:{ en:'On the result screen, tap “Share Result”. On phones you can send it through WhatsApp or other apps; on computers it is copied so you can paste it anywhere.',
          ml:'ഫല സ്ക്രീനിൽ “ഫലം പങ്കിടുക” ടാപ്പ് ചെയ്യുക. ഫോണിൽ WhatsApp-ലോ മറ്റ് ആപ്പുകളിലോ അയയ്ക്കാം; കമ്പ്യൂട്ടറിൽ അത് കോപ്പി ആകും.' },
      k:['share','whatsapp','send','screenshot','copy','പങ്കിട','അയയ്ക്ക'] },

    { id:'tutorial',
      q:{ en:'Is there a tutorial video?', ml:'ട്യൂട്ടോറിയൽ വീഡിയോ ഉണ്ടോ?' },
      a:{ en:'Yes! Watch the step-by-step tutorial video and full exam guide on the tutorial page.',
          ml:'ഉണ്ട്! ട്യൂട്ടോറിയൽ പേജിൽ വീഡിയോയും പൂർണ്ണ പരീക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങളും കാണാം.' },
      link:{ href:'support.html', en:'▶ Open tutorial page', ml:'▶ ട്യൂട്ടോറിയൽ പേജ് തുറക്കുക' },
      k:['tutorial','video','guide','help','procedure','instructions','ട്യൂട്ടോറിയൽ','വീഡിയോ','സഹായ'] },

    { id:'study12',
      q:{ en:'Is there study help for Class XII?', ml:'ക്ലാസ്സ് XII-ന് പഠനസഹായി ഉണ്ടോ?' },
      a:{ en:'Yes! The Class XII Study Help (Vedapraveen Diploma) has key points, questions with answers and think-and-answer questions for all 38 chapters, in English and Malayalam. Turn on Practice mode to hide answers and test yourself.',
          ml:'ഉണ്ട്! ക്ലാസ്സ് XII പഠനസഹായിയിൽ (വേദപ്രവീൺ ഡിപ്ലോമ) 38 അധ്യായങ്ങളുടെയും പ്രധാന പോയിന്റുകളും ചോദ്യോത്തരങ്ങളും ചിന്തിച്ച് ഉത്തരം എഴുതേണ്ട ചോദ്യങ്ങളും ഇംഗ്ലീഷിലും മലയാളത്തിലും ഉണ്ട്. ഉത്തരങ്ങൾ മറച്ച് സ്വയം പരീക്ഷിക്കാൻ "പരിശീലന മോഡ്" ഓണാക്കുക.' },
      link:{ href:'class12-help.html', en:'📖 Open Class XII Study Help', ml:'📖 ക്ലാസ്സ് XII പഠനസഹായി തുറക്കുക' },
      k:['study','notes','material','key points','vedapraveen','diploma','class 12','class xii','12th','textbook','പഠനസഹായി','നോട്ട്','വേദപ്രവീൺ','ഡിപ്ലോമ','പാഠപുസ്തക'] },

    { id:'contact',
      q:{ en:'Who can I contact for help?', ml:'സഹായത്തിന് ആരെ ബന്ധപ്പെടാം?' },
      a:{ en:'For the Sunday School code, results or anything about your exam, please contact your Sunday School HM or class teacher.',
          ml:'സൺഡേ സ്കൂൾ കോഡ്, ഫലം, അല്ലെങ്കിൽ പരീക്ഷയുമായി ബന്ധപ്പെട്ട മറ്റെന്തിനും ദയവായി നിങ്ങളുടെ സൺഡേ സ്കൂൾ HM-നെയോ ക്ലാസ്സ് അധ്യാപകനെയോ ബന്ധപ്പെടുക.' },
      k:['contact','call','teacher','support','complaint','problem','ബന്ധപ്പെ','അധ്യാപക'] }
  ];

  // Quick chips shown at start (most common questions)
  var QUICK = ['start','code','time','pass','change','lang','retake','tutorial'];

  var T = {
    en:{ title:'Malpan AI', sub:'Exam help assistant', hello:'Hello! 👋 I am Malpan AI. I can answer common questions about the OSSAE practice exam. Tap a question below or type your own.',
         placeholder:'Type your question…', send:'Send', more:'Other questions', notFound:'Sorry, I don’t have an answer for that yet. Try one of these questions, or contact your Sunday School HM.',
         open:'Open Malpan AI', close:'Close', restart:'Start over',
         fbChip:'✍️ Write feedback', fbIntro:'We’d love to hear from you! Share your feedback or suggestions about the exam portal.',
         fbName:'Your name (optional)', fbPhone:'Phone number (optional)', fbClass:'Class (optional)', fbAny:'Select class', fbRating:'How useful is the portal?',
         fbMsg:'Your feedback', fbMsgPh:'Write your feedback or suggestion…', fbSend:'Send feedback', fbNeed:'Please write your feedback before sending.',
         fbThanks:'Thank you for your feedback! 🙏 It has been sent to the Sunday School team.',
         fbThanksLocal:'Thank you for your feedback! 🙏' },
    ml:{ title:'മൽപാൻ AI', sub:'പരീക്ഷ സഹായി', hello:'നമസ്കാരം! 👋 ഞാൻ മൽപാൻ AI. OSSAE പരിശീലന പരീക്ഷയെക്കുറിച്ചുള്ള സാധാരണ ചോദ്യങ്ങൾക്ക് ഞാൻ ഉത്തരം നൽകാം. താഴെയുള്ള ഒരു ചോദ്യം ടാപ്പ് ചെയ്യുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക.',
         placeholder:'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക…', send:'അയയ്ക്കുക', more:'മറ്റ് ചോദ്യങ്ങൾ', notFound:'ക്ഷമിക്കണം, അതിനുള്ള ഉത്തരം എന്റെ പക്കൽ ഇല്ല. താഴെയുള്ള ചോദ്യങ്ങളിൽ ഒന്ന് ശ്രമിക്കുക, അല്ലെങ്കിൽ സൺഡേ സ്കൂൾ HM-നെ ബന്ധപ്പെടുക.',
         open:'മൽപാൻ AI തുറക്കുക', close:'അടയ്ക്കുക', restart:'വീണ്ടും തുടങ്ങുക',
         fbChip:'✍️ അഭിപ്രായം എഴുതുക', fbIntro:'നിങ്ങളുടെ അഭിപ്രായം അറിയാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു! പരീക്ഷ പോർട്ടലിനെക്കുറിച്ചുള്ള അഭിപ്രായങ്ങളും നിർദ്ദേശങ്ങളും പങ്കിടുക.',
         fbName:'നിങ്ങളുടെ പേര് (നിർബന്ധമില്ല)', fbPhone:'ഫോൺ നമ്പർ (നിർബന്ധമില്ല)', fbClass:'ക്ലാസ്സ് (നിർബന്ധമില്ല)', fbAny:'ക്ലാസ്സ് തിരഞ്ഞെടുക്കുക', fbRating:'പോർട്ടൽ എത്രത്തോളം ഉപകാരപ്രദമാണ്?',
         fbMsg:'നിങ്ങളുടെ അഭിപ്രായം', fbMsgPh:'അഭിപ്രായമോ നിർദ്ദേശമോ എഴുതുക…', fbSend:'അയയ്ക്കുക', fbNeed:'അയയ്ക്കുന്നതിനു മുൻപ് അഭിപ്രായം എഴുതുക.',
         fbThanks:'അഭിപ്രായത്തിന് നന്ദി! 🙏 അത് സൺഡേ സ്കൂൾ ടീമിന് അയച്ചിട്ടുണ്ട്.',
         fbThanksLocal:'അഭിപ്രായത്തിന് നന്ദി! 🙏' }
  };

  function lang(){
    try { return localStorage.getItem('ss_lang') === 'ml' ? 'ml' : 'en'; } catch(e){ return 'en'; }
  }
  function byId(id){ for (var i = 0; i < FAQ.length; i++) if (FAQ[i].id === id) return FAQ[i]; return null; }

  // ---------- Styles ----------
  var css = '' +
  '.ssbot{--sb-navy:#14213d;--sb-navy2:#1f3160;--sb-gold:#b8862b;--sb-gold2:#e0b25a;--sb-bg:#ffffff;--sb-bg2:#f3f1ec;--sb-ink:#14213d;--sb-muted:#5b6474;--sb-border:#e4dfd3;' +
    'font-family:"Source Sans 3",system-ui,-apple-system,"Segoe UI",sans-serif;}' +
  ':root[data-theme="dark"] .ssbot{--sb-bg:#111a2e;--sb-bg2:#18233b;--sb-ink:#eef2f8;--sb-muted:#9aa6b8;--sb-border:#26324a;--sb-gold:#e0b25a;}' +
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ssbot{--sb-bg:#111a2e;--sb-bg2:#18233b;--sb-ink:#eef2f8;--sb-muted:#9aa6b8;--sb-border:#26324a;--sb-gold:#e0b25a;}}' +
  '.ssbot.ml{font-family:"Noto Sans Malayalam","Source Sans 3",sans-serif;}' +
  '.ssbot-launch{position:fixed;right:18px;bottom:18px;z-index:900;width:60px;height:60px;border-radius:999px;border:2px solid var(--sb-gold2);' +
    'background:linear-gradient(135deg,var(--sb-navy),var(--sb-navy2));color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 14px 30px -10px rgba(20,33,61,.7);transition:transform .18s ease;}' +
  '.ssbot-launch:hover{transform:translateY(-2px) scale(1.04);}' +
  '.ssbot-launch:focus-visible{outline:3px solid var(--sb-gold2);outline-offset:3px;}' +
  '.ssbot-launch svg{width:28px;height:28px;}' +
  '.ssbot-badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:var(--sb-gold2);color:#1a1405;font-size:.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;}' +
  '.ssbot-tip{position:fixed;right:88px;bottom:30px;z-index:900;background:var(--sb-bg);color:var(--sb-ink);border:1px solid var(--sb-border);border-radius:14px;padding:9px 14px;font-size:.88rem;font-weight:600;box-shadow:0 10px 24px -12px rgba(0,0,0,.4);white-space:nowrap;animation:ssbotIn .3s ease;}' +
  '.ssbot-panel{position:fixed;right:18px;bottom:90px;z-index:901;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));' +
    'background:var(--sb-bg);color:var(--sb-ink);border:1px solid var(--sb-border);border-radius:22px;box-shadow:0 30px 60px -20px rgba(0,0,0,.55);' +
    'display:flex;flex-direction:column;overflow:hidden;animation:ssbotIn .22s ease;}' +
  '.ssbot-panel[hidden],.ssbot-launch[hidden],.ssbot-tip[hidden]{display:none !important;}' +
  '@keyframes ssbotIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}' +
  '.ssbot-head{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;background:linear-gradient(135deg,var(--sb-navy),var(--sb-navy2));color:#fff;border-bottom:3px solid var(--sb-gold2);}' +
  '.ssbot-avatar{flex:none;width:38px;height:38px;border-radius:999px;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;}' +
  '.ssbot-avatar img{width:100%;height:100%;object-fit:contain;padding:3px;}' +
  '.ssbot-htext{flex:1;min-width:0;}' +
  '.ssbot-htext strong{display:block;font-size:1rem;line-height:1.2;}' +
  '.ssbot-htext span{display:flex;align-items:center;gap:6px;font-size:.78rem;color:#c8cfe0;}' +
  '.ssbot-htext span::before{content:"";width:7px;height:7px;border-radius:999px;background:#4ade80;}' +
  '.ssbot-hbtn{flex:none;width:34px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.08);color:#fff;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;}' +
  '.ssbot-hbtn:hover{background:rgba(255,255,255,.18);}' +
  '.ssbot-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--sb-bg2);}' +
  '.ssbot-msg{max-width:88%;padding:10px 13px;border-radius:16px;font-size:.93rem;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere;}' +
  '.ssbot-msg.bot{align-self:flex-start;background:var(--sb-bg);border:1px solid var(--sb-border);border-bottom-left-radius:5px;}' +
  '.ssbot-msg.user{align-self:flex-end;background:var(--sb-navy);color:#fff;border-bottom-right-radius:5px;}' +
  ':root[data-theme="dark"] .ssbot-msg.user{background:var(--sb-gold2);color:#1a1405;}' +
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ssbot-msg.user{background:var(--sb-gold2);color:#1a1405;}}' +
  '.ssbot-msg a{display:inline-block;margin-top:8px;font-weight:700;color:var(--sb-gold);}' +
  '.ssbot-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:var(--sb-bg);border:1px solid var(--sb-border);border-radius:16px;border-bottom-left-radius:5px;}' +
  '.ssbot-typing i{width:7px;height:7px;border-radius:999px;background:var(--sb-muted);animation:ssbotDot 1s infinite ease-in-out;}' +
  '.ssbot-typing i:nth-child(2){animation-delay:.15s;} .ssbot-typing i:nth-child(3){animation-delay:.3s;}' +
  '@keyframes ssbotDot{0%,80%,100%{opacity:.3;transform:translateY(0);}40%{opacity:1;transform:translateY(-3px);}}' +
  '.ssbot-chips{display:flex;flex-wrap:wrap;gap:6px;}' +
  '.ssbot-chip{border:1.5px solid color-mix(in srgb,var(--sb-gold) 55%,transparent);background:var(--sb-bg);color:var(--sb-ink);border-radius:999px;padding:7px 12px;font:600 .84rem/1.25 inherit;font-family:inherit;cursor:pointer;text-align:left;transition:background .15s ease,border-color .15s ease;}' +
  '.ssbot-chip:hover{border-color:var(--sb-gold);background:color-mix(in srgb,var(--sb-gold) 12%,var(--sb-bg));}' +
  '.ssbot-chip:focus-visible{outline:2px solid var(--sb-gold);outline-offset:2px;}' +
  '.ssbot-label{font-size:.74rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sb-muted);margin-top:2px;}' +
  '.ssbot-form{display:flex;gap:8px;padding:10px;border-top:1px solid var(--sb-border);background:var(--sb-bg);}' +
  '.ssbot-input{flex:1;min-width:0;min-height:44px;padding:0 14px;border-radius:999px;border:1.5px solid var(--sb-border);background:var(--sb-bg2);color:var(--sb-ink);font-size:.95rem;font-family:inherit;}' +
  '.ssbot-input:focus{outline:none;border-color:var(--sb-gold);}' +
  '.ssbot-send{flex:none;width:44px;height:44px;border-radius:999px;border:none;background:var(--sb-navy);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;}' +
  ':root[data-theme="dark"] .ssbot-send{background:var(--sb-gold2);color:#1a1405;}' +
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ssbot-send{background:var(--sb-gold2);color:#1a1405;}}' +
  '.ssbot-send svg{width:18px;height:18px;}' +
  '.ssbot-chip.fb{background:var(--sb-navy);color:#fff;border-color:var(--sb-navy);}' +
  '.ssbot-chip.fb:hover{background:var(--sb-navy2);}' +
  ':root[data-theme="dark"] .ssbot-chip.fb{background:var(--sb-gold2);color:#1a1405;border-color:var(--sb-gold2);}' +
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ssbot-chip.fb{background:var(--sb-gold2);color:#1a1405;border-color:var(--sb-gold2);}}' +
  '.ssbot-fb{align-self:stretch;background:var(--sb-bg);border:1px solid var(--sb-border);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:9px;}' +
  '.ssbot-fb label{font-size:.8rem;font-weight:700;color:var(--sb-muted);display:flex;flex-direction:column;gap:5px;}' +
  '.ssbot-fb input,.ssbot-fb select,.ssbot-fb textarea{width:100%;padding:9px 11px;border-radius:10px;border:1.5px solid var(--sb-border);background:var(--sb-bg2);color:var(--sb-ink);font-size:.92rem;font-family:inherit;font-weight:400;}' +
  '.ssbot-fb textarea{min-height:84px;resize:vertical;}' +
  '.ssbot-fb input:focus,.ssbot-fb select:focus,.ssbot-fb textarea:focus{outline:none;border-color:var(--sb-gold);}' +
  '.ssbot-stars{display:flex;gap:4px;}' +
  '.ssbot-star{width:36px;height:36px;border-radius:10px;border:1.5px solid var(--sb-border);background:var(--sb-bg2);color:#c9c2b2;font-size:1.2rem;cursor:pointer;line-height:1;}' +
  '.ssbot-star.on{color:#e0a91b;border-color:#e0b25a;background:color-mix(in srgb,#e0b25a 15%,var(--sb-bg));}' +
  '.ssbot-star:focus-visible{outline:2px solid var(--sb-gold);outline-offset:1px;}' +
  '.ssbot-fb-err{color:#b91c1c;font-size:.82rem;font-weight:600;}' +
  '.ssbot-fb-send{min-height:42px;border:none;border-radius:12px;background:var(--sb-navy);color:#fff;font-weight:700;font-size:.92rem;font-family:inherit;cursor:pointer;}' +
  ':root[data-theme="dark"] .ssbot-fb-send{background:var(--sb-gold2);color:#1a1405;}' +
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .ssbot-fb-send{background:var(--sb-gold2);color:#1a1405;}}' +
  '.ssbot-fb-send:disabled{opacity:.5;cursor:default;}' +
  '.ssbot-fb.done{opacity:.6;pointer-events:none;}' +
  'body.ssbot-ready footer{padding-bottom:84px;}' +
  '@media (max-width:480px){.ssbot-panel{right:12px;bottom:84px;}.ssbot-launch{right:14px;bottom:14px;width:56px;height:56px;}.ssbot-tip{display:none !important;}}' +
  '@media (prefers-reduced-motion: reduce){.ssbot *{animation:none !important;transition:none !important;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Markup ----------
  var root = document.createElement('div');
  root.className = 'ssbot';
  root.innerHTML =
    '<button type="button" class="ssbot-launch" aria-expanded="false" aria-controls="ssbotPanel">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.4"/><path d="M12 17h.01"/></svg>' +
      '<span class="ssbot-badge" aria-hidden="true">?</span>' +
    '</button>' +
    '<div class="ssbot-tip" hidden></div>' +
    '<section class="ssbot-panel" id="ssbotPanel" role="dialog" aria-modal="false" hidden>' +
      '<header class="ssbot-head">' +
        '<span class="ssbot-avatar"><img src="logo.png" alt=""></span>' +
        '<div class="ssbot-htext"><strong></strong><span></span></div>' +
        '<button type="button" class="ssbot-hbtn ssbot-restart">↺</button>' +
        '<button type="button" class="ssbot-hbtn ssbot-close">✕</button>' +
      '</header>' +
      '<div class="ssbot-body" aria-live="polite"></div>' +
      '<form class="ssbot-form" autocomplete="off">' +
        '<input class="ssbot-input" type="text" maxlength="200">' +
        '<button type="submit" class="ssbot-send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></button>' +
      '</form>' +
    '</section>';
  document.body.appendChild(root);
  document.body.classList.add('ssbot-ready');

  var launch = root.querySelector('.ssbot-launch');
  var tip = root.querySelector('.ssbot-tip');
  var panel = root.querySelector('.ssbot-panel');
  var body = root.querySelector('.ssbot-body');
  var form = root.querySelector('.ssbot-form');
  var input = root.querySelector('.ssbot-input');
  var started = false;
  var L = lang();

  function applyChrome(){
    L = lang();
    var t = T[L];
    root.classList.toggle('ml', L === 'ml');
    root.querySelector('.ssbot-htext strong').textContent = t.title;
    root.querySelector('.ssbot-htext span').textContent = t.sub;
    input.placeholder = t.placeholder;
    root.querySelector('.ssbot-send').setAttribute('aria-label', t.send);
    root.querySelector('.ssbot-close').setAttribute('aria-label', t.close);
    root.querySelector('.ssbot-close').title = t.close;
    root.querySelector('.ssbot-restart').setAttribute('aria-label', t.restart);
    root.querySelector('.ssbot-restart').title = t.restart;
    launch.setAttribute('aria-label', t.open);
    launch.title = t.title;
    panel.setAttribute('aria-label', t.title);
    tip.textContent = (L === 'ml') ? 'സഹായം വേണോ? മൽപാൻ AI-യോട് ചോദിക്കൂ 💬' : 'Need help? Ask Malpan AI 💬';
  }

  function scrollDown(){ body.scrollTop = body.scrollHeight; }

  function addMsg(text, who, link){
    var m = document.createElement('div');
    m.className = 'ssbot-msg ' + who;
    m.textContent = text;
    if (link){
      m.appendChild(document.createElement('br'));
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link[L];
      m.appendChild(a);
    }
    body.appendChild(m);
    scrollDown();
  }

  function addChips(ids, label){
    if (label){
      var l = document.createElement('div');
      l.className = 'ssbot-label';
      l.textContent = label;
      body.appendChild(l);
    }
    var wrap = document.createElement('div');
    wrap.className = 'ssbot-chips';
    ids.forEach(function(id){
      var f = byId(id); if (!f) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ssbot-chip';
      b.textContent = f.q[L];
      b.addEventListener('click', function(){ ask(f); });
      wrap.appendChild(b);
    });
    var fb = document.createElement('button');
    fb.type = 'button';
    fb.className = 'ssbot-chip fb';
    fb.textContent = T[L].fbChip;
    fb.addEventListener('click', function(){ addMsg(T[L].fbChip.replace(/^\S+\s/, ''), 'user'); reply(showFeedbackForm); });
    wrap.appendChild(fb);
    body.appendChild(wrap);
    scrollDown();
  }

  // ---------- Feedback ----------
  var CLASSES = ['V','VI','VII','VIII','IX','X','XI','XII'];
  var FEEDBACK_WORDS = ['feedback','suggest','suggestion','review the portal','opinion','comment','അഭിപ്രായ','നിർദ്ദേശ'];

  function feedbackUrl(){
    var c = window.SS_CONFIG || {};
    var u = String(c.sheetUrl || c.feedbackUrl || '').trim();
    return /^https:\/\//.test(u) ? u : '';
  }

  function saveFeedbackLocal(item){
    try {
      var list = JSON.parse(localStorage.getItem('ss_feedback') || '[]');
      list.unshift(item);
      if (list.length > 200) list = list.slice(0, 200);
      localStorage.setItem('ss_feedback', JSON.stringify(list));
    } catch(e){}
  }

  function showFeedbackForm(){
    var t = T[L];
    addMsg(t.fbIntro, 'bot');
    var card = document.createElement('form');
    card.className = 'ssbot-fb';
    card.noValidate = true;

    var nameL = document.createElement('label');
    nameL.textContent = t.fbName;
    var name = document.createElement('input');
    name.type = 'text'; name.maxLength = 80; name.autocomplete = 'name';
    nameL.appendChild(name);

    var phoneL = document.createElement('label');
    phoneL.textContent = t.fbPhone;
    var phone = document.createElement('input');
    phone.type = 'tel'; phone.maxLength = 20; phone.autocomplete = 'tel'; phone.inputMode = 'tel';
    phone.placeholder = '+966xxxxxxxx / +91xxxxxxxxxx';
    phoneL.appendChild(phone);

    var clsL = document.createElement('label');
    clsL.textContent = t.fbClass;
    var cls = document.createElement('select');
    var o0 = document.createElement('option'); o0.value = ''; o0.textContent = t.fbAny; cls.appendChild(o0);
    CLASSES.forEach(function(c){ var o = document.createElement('option'); o.value = 'Class ' + c; o.textContent = (L === 'ml' ? 'ക്ലാസ്സ് ' : 'Class ') + c; cls.appendChild(o); });
    clsL.appendChild(cls);

    var rateL = document.createElement('div');
    rateL.className = 'ssbot-label';
    rateL.style.textTransform = 'none'; rateL.style.letterSpacing = '0'; rateL.style.fontSize = '.8rem';
    rateL.textContent = t.fbRating;
    var stars = document.createElement('div');
    stars.className = 'ssbot-stars';
    stars.setAttribute('role', 'radiogroup');
    stars.setAttribute('aria-label', t.fbRating);
    var rating = 0;
    for (var s = 1; s <= 5; s++){
      (function(n){
        var st = document.createElement('button');
        st.type = 'button'; st.className = 'ssbot-star'; st.textContent = '★';
        st.setAttribute('role', 'radio');
        st.setAttribute('aria-label', n + ' / 5');
        st.setAttribute('aria-checked', 'false');
        st.addEventListener('click', function(){
          rating = n;
          stars.querySelectorAll('.ssbot-star').forEach(function(b, i){
            b.classList.toggle('on', i < n);
            b.setAttribute('aria-checked', i === n - 1 ? 'true' : 'false');
          });
        });
        stars.appendChild(st);
      })(s);
    }

    var msgL = document.createElement('label');
    msgL.textContent = t.fbMsg;
    var msg = document.createElement('textarea');
    msg.maxLength = 1000; msg.placeholder = t.fbMsgPh; msg.required = true;
    msgL.appendChild(msg);

    var err = document.createElement('div');
    err.className = 'ssbot-fb-err'; err.hidden = true; err.textContent = t.fbNeed;

    var send = document.createElement('button');
    send.type = 'submit'; send.className = 'ssbot-fb-send'; send.textContent = t.fbSend;

    [nameL, phoneL, clsL, rateL, stars, msgL, err, send].forEach(function(el){ card.appendChild(el); });

    card.addEventListener('submit', function(e){
      e.preventDefault();
      var text = msg.value.trim();
      if (!text){ err.hidden = false; msg.focus(); return; }
      err.hidden = true;
      send.disabled = true;
      var item = {
        type: 'feedback',
        id: 'fb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        timestamp: new Date().toISOString(),
        name: name.value.trim(),
        phone: phone.value.trim(),
        className: cls.value,
        rating: rating || '',
        message: text,
        page: (location.pathname.split('/').pop() || 'index.html'),
        lang: L
      };
      saveFeedbackLocal(item);
      var url = feedbackUrl();
      if (url){
        try {
          fetch(url, { method:'POST', mode:'no-cors', headers:{ 'Content-Type':'text/plain;charset=utf-8' }, body: JSON.stringify(item) })
            .catch(function(){});
        } catch(ex){}
      }
      card.classList.add('done');
      reply(function(){
        addMsg(url ? t.fbThanks : t.fbThanksLocal, 'bot');
        addChips(QUICK, T[L].more);
      });
    });

    body.appendChild(card);
    scrollDown();
    setTimeout(function(){ msg.focus(); }, 60);
  }

  function related(id){
    // Suggest the next 3 questions in the list after each answer
    var idx = 0;
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i].id === id) idx = i;
    var out = [];
    for (var j = 1; j <= 3; j++) out.push(FAQ[(idx + j) % FAQ.length].id);
    return out;
  }

  function reply(fn){
    var tdots = document.createElement('div');
    tdots.className = 'ssbot-typing';
    tdots.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(tdots);
    scrollDown();
    setTimeout(function(){ tdots.remove(); fn(); }, 450);
  }

  function ask(f){
    addMsg(f.q[L], 'user');
    reply(function(){
      addMsg(f.a[L], 'bot', f.link);
      addChips(related(f.id), T[L].more);
    });
  }

  function norm(s){ return String(s || '').toLowerCase().replace(/[?.!,“”"'’]/g, ' ').replace(/\s+/g, ' ').trim(); }

  function match(text){
    var q = ' ' + norm(text) + ' ';
    var best = null, bestScore = 0;
    FAQ.forEach(function(f){
      var score = 0;
      f.k.forEach(function(kw){
        var k = norm(kw);
        if (k && q.indexOf(k) !== -1) score += k.split(' ').length > 1 ? 3 : (k.length > 4 ? 2 : 1);
      });
      if (norm(f.q.en) === norm(text) || norm(f.q.ml) === norm(text)) score += 10;
      if (score > bestScore){ bestScore = score; best = f; }
    });
    return bestScore > 0 ? best : null;
  }

  function greet(){
    body.innerHTML = '';
    addMsg(T[L].hello, 'bot');
    addChips(QUICK);
    started = true;
  }

  function open(){
    var prevL = L;
    applyChrome();
    if (!started || prevL !== L) greet();
    panel.hidden = false;
    tip.hidden = true;
    launch.setAttribute('aria-expanded', 'true');
    try { sessionStorage.setItem('ssbot_seen', '1'); } catch(e){}
    setTimeout(function(){ if (window.matchMedia && matchMedia('(min-width: 600px)').matches) input.focus(); }, 50);
  }
  function close(){
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  }

  launch.addEventListener('click', function(){ panel.hidden ? open() : close(); });
  root.querySelector('.ssbot-close').addEventListener('click', close);
  root.querySelector('.ssbot-restart').addEventListener('click', function(){ applyChrome(); greet(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !panel.hidden) close(); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMsg(text, 'user');
    var lower = text.toLowerCase();
    if (FEEDBACK_WORDS.some(function(w){ return lower.indexOf(w) !== -1; })){
      reply(showFeedbackForm);
      return;
    }
    var f = match(text);
    reply(function(){
      if (f){
        addMsg(f.a[L], 'bot', f.link);
        addChips(related(f.id), T[L].more);
      } else {
        addMsg(T[L].notFound, 'bot');
        addChips(QUICK);
      }
    });
  });

  // Hide the assistant while an exam is in progress (class pages)
  var quiz = document.getElementById('screenQuiz');
  if (quiz){
    var sync = function(){
      var inExam = !quiz.hidden;
      launch.hidden = inExam;
      if (inExam){ panel.hidden = true; tip.hidden = true; }
    };
    new MutationObserver(sync).observe(quiz, { attributes:true, attributeFilter:['hidden'] });
    sync();
  }

  // One-time friendly hint per session
  applyChrome();
  var seen = false;
  try { seen = sessionStorage.getItem('ssbot_seen') === '1'; } catch(e){}
  if (!seen){
    setTimeout(function(){ if (panel.hidden && !launch.hidden){ tip.hidden = false; } }, 2500);
    setTimeout(function(){ tip.hidden = true; }, 9000);
  }
  tip.addEventListener('click', open);
})();
