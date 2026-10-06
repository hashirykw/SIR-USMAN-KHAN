/* ============================================================================
   SIR USMAN KHAN — Cambridge Chemistry
   THE ONLY FILE YOU EDIT.  Built by Nexlyr Solutions.

   Every page (index, papers, portal, admin) reads this file. Put the same
   copy beside every page.

   RULE: anything blank stays HIDDEN on the site. Nothing fake ever shows —
   no placeholder phone number, no invented review, no made-up result.
   ============================================================================ */

window.UK_CONFIG = {

  /* ==========================================================================
     1. WHO HE IS — from his own Cambridge Online faculty record
     ========================================================================== */
  name:        'Sir Usman Khan',
  shortName:   'Usman Khan',
  subject:     'Chemistry',
  city:        'Karachi',
  yearsInSubject: 20,           // "twenty years in the subject"
  distinctions:   3,            // Cambridge distinctions on his record

  /* ==========================================================================
     2. CONTACT — blank = hidden. WhatsApp: digits only, country code first.
     ========================================================================== */
  whatsapp:     '',             // TO CONFIRM — e.g. '923001234567'
  phoneDisplay: '',             // TO CONFIRM — e.g. '0300 1234567'
  email:        '',             // TO CONFIRM

  facebook:  'https://facebook.com/Sir-Usman-Khan-Chemistry',
  instagram: '',                // TO CONFIRM
  youtube:   '',                // TO CONFIRM

  /* Where he teaches in person. Empty list = the campus card is hidden and
     the site talks about online classes only.
     { name: 'North Nazimabad', note: 'Evening batch' }                       */
  campuses: [],
  online: true,

  /* ==========================================================================
     3. SUPABASE — sign-in, lectures, registrations, admin
     Supabase → Project Settings → API. The publishable / anon key is meant to
     be public; row level security in backend.sql is what protects the data.
     NEVER paste the service_role / secret key here.
     Blank = the form falls back to WhatsApp/Facebook and the portal says
     sign-in is not switched on yet.
     ========================================================================== */
  SUPABASE_URL:      '',
  SUPABASE_ANON_KEY: '',

  MAX_DEVICES: 2,               // keep in step with backend.sql (max_devices)

  /* ==========================================================================
     4. PAST PAPERS
     Folder URL that holds the PDFs under their Cambridge names, ending in "/".
       5070_s23_qp_12.pdf   May/June 2023, Paper 1 variant 2, question paper
       5070_s23_ms_12.pdf   …its mark scheme
       0620_w24_qp_42.pdf   Oct/Nov 2024, Paper 4 variant 2
       0620_s24_gt.pdf      grade thresholds   ·   0620_s24_er.pdf  examiner report
     A GitHub repo works: 'https://raw.githubusercontent.com/<user>/<repo>/main/'
     Blank = every paper shows a "request it" button instead of a dead link.
     ========================================================================== */
  FILES_BASE: '',
  YEAR_FROM: 2016,
  YEAR_TO:   2025,

  /* Topical books, per syllabus and topic number (1–12). Blank = "being compiled".
     TOPICAL: { '5070': { 3: { book: 'chem-5070-t03.pdf', ms: 'chem-5070-t03-ms.pdf' } } } */
  TOPICAL: { '5070': {}, '0620': {} },

  /* ==========================================================================
     5. VIDEO, RESULTS, REVIEWS — real material only. Empty = section hidden.
     ========================================================================== */
  INTRO_VIDEO: '',              // a YouTube link to his introduction

  /* { value: 'A*', label: '5070 Chemistry', note: 'May/June 2025', name: 'Student name' } */
  RESULTS: [],

  /* Only real reviews, with the student's permission.
     { name: 'Ayesha K.', meta: 'O Level 5070 · 2025', text: 'What they actually said.' } */
  REVIEWS: [],

  /* ==========================================================================
     6. THE ENROL PROMPT (times in minutes)
     ========================================================================== */
  promo: {
    enabled:     true,
    firstDelay:  0.75,          // 45 s before the first prompt
    reappear:    20,            // minutes before a dismissed prompt returns
    maxDismissals: 3,
    mobile:      false
  },

  /* ==========================================================================
     7. SITE + AGENCY
     ========================================================================== */
  siteUrl:   'https://sirusmankhan.vercel.app',
  agency:    'Nexlyr Solutions',
  agencyUrl: 'https://nexlyr.solutions'
};


/* ============================================================================
   Plumbing below. Nothing to edit.
   ============================================================================ */
(function () {
  var C = window.UK_CONFIG;
  if (C.FILES_BASE && C.FILES_BASE.slice(-1) !== '/') C.FILES_BASE += '/';
  C.live = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  if (C.SUPABASE_URL) C.SUPABASE_URL = C.SUPABASE_URL.replace(/\/+$/, '');
  if (/service_role|sb_secret/.test(C.SUPABASE_ANON_KEY || '')) {
    console.error('[UK] That looks like a SECRET Supabase key. It must never sit in a ' +
      'file a browser can load. Use the publishable / anon key instead.');
    C.live = false;
  }

  /* where a "message us" button should go: WhatsApp first, then Facebook */
  C.contactUrl = function (text) {
    if (C.whatsapp) return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
    if (C.facebook) return C.facebook;
    if (C.email) return 'mailto:' + C.email + (text ? '?body=' + encodeURIComponent(text) : '');
    return '#register';
  };
  C.contactLabel = C.whatsapp ? 'WhatsApp' : (C.facebook ? 'Facebook' : 'Email');
})();
