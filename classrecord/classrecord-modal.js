/* v18.71 ECR Initial Grade conformance: Summative Tests and Term Examination now use combined raw-score PS (total score / total HPS) before the EX weight; removes the incorrect fixed ST1/ST2/TE 30/30/40 sub-weighting. */
/* v18.70 MAPEH Excel export screenshot conformance: MAPEH_Tn value-cell borders/alignment fixed; consolidated Summary of Grades now places Division at G3:J3 and School ID at G4:H4 for hidden-G layout, with F-width and H6 right-alignment fixes. */
/* v18.69 MAPEH Excel export screenshot conformance fix: MA/PEH School Year label style, MAPEH_Tn E-column header labels, Summary of Grades title/division placement; v18.68 Summary of Grades subject merge uses H6 label + I6:J6 value; MAPEH_Tn descriptors are term-grade based; Excel numbering stays sex-reset and blank template rows are unnumbered; headers align to corrected workbook. */
/* v18.67 MAPEH consolidated Excel header-fill fix: MAPEH_T1/T2/T3 and Summary of Grades now populate Region, Division, School Name, and School ID from the base or paired component headers; v18.66 MAPEH Summary duplicate warning UI fix; v18.65 Summary table descriptor narrative fix: Summary rows now materialize General Description and Instructional Response for Table 10/11 final results; v18.64 G12 descriptor render fix: learner cards and Summary table materialize Table 10/11 descriptor text; v18.63 MAPEH_Tn View in Excel format-map activation fix: MAPEH_T1/T2/T3 now actually apply the fixed XLSX 8-column merge/style map instead of falling back to the generic summary styling. */
/* v18.62 MAPEH View in Excel fixed-xlsx conformance: MAPEH_T1/T2/T3 and Summary of Grades now use the fixed workbook row starts, merges, widths, and 3-term Term 4 hiding. */
/* v18.61 MAPEH consolidated View in Excel layout fix: Summary of Grades and MAPEH_Tn now align to the captured MAPEH-aware class record template; fixes shifted headers/learner rows and term-summary formatting. */
/* v18.60 MAPEH Summary-tab trigger fix: opening the Summary tab on any eligible MAPEH component now renders/exports the consolidated paired MAPEH Summary workbook. */
/* v18.59 MAPEH consolidated Excel alignment: Summary view exports MA_Tn/PEH_Tn/MAPEH_Tn plus combined Summary of Grades; component views remain component-only. */
/* v18.58 View in Excel header alignment fix: teacher value merges Q5:T5; SCHOOL YEAR caption/value merges V3:W3 and X3:Y3. */
/* v18.57 MAPEH-aware Summary + consolidated View in Excel: virtual paired Music & Arts / PE & Health summary with read-only UI and XLSX export. */
/* v18.56 View in Excel Phase 2 hardening: uses a style-capable writer when available, preserves mapped formats, and adds optional XML verification for widths/styles. */
/* v18.55 View in Excel map-format export: Term/Quarter and Summary sheets now apply the attached cell format map for row heights, widths, merges, borders, fills, alignment, and number formats. */
/* v18.54 Summary auto-refresh + Summary detailed computations: entering Summary recomputes latest term/quarter values and shows per-term plus final computation details. */
/* v18.53 View in Excel export: generates a saveable .xlsx copy from Class Record state without scraping rendered tables. */
/* v18.52 Detailed Computations toggle fix: summary clicks/taps are treated as an interactive control and no longer get swallowed by learner-card swipe handling. */
/* v18.51 MAPEH bundle delete fix: Delete now works from component or Summary view and removes all indexed paired-component records safely. */
/* v18.50 MAPEH paired-component records: MAPEH is paired as Music and Arts plus PE and Health; existing four-component records are not deleted. */
/* v18.49 Initial Grade / Term Grade pill display: numeric learner achievement cards now show Initial Grade whenever available plus Term Grade, without changing computation, saved data, CSV, or shared-header compatibility. */
/* v18.48 MAPEH component bundle + consolidated summary: Grades 4-10 MAPEH can be encoded as Music/Arts/PE/Health component records with a virtual read-only consolidated summary; data/CSV/shared-header compatibility retained. */
/* v18.47 mobile-safe HPS encoding: Shared HPS inputs now use whole-number encoding and recompute/save without full panel render to avoid mobile keyboard jumps. */
/* v18.46 mobile-safe score blur/change: learner-card score edits sanitize/recompute/save without full render to avoid mobile keyboard focus flicker. */
/* v18.45 learner-card score encoding: Grade Sheet-style whole-number score entry, HPS clamping, arrow/Enter movement, and live state updates. */
/* v18.44 EX share normalization fix: ST/TE percentage now normalizes to encoded positive-HPS fields, so full scores with ST2 blank can return 100. */
/* v18.42 empty-roster authority fix: deleting all learners in Manage Class now clears Class Record roster instead of restoring saved learners. */
/* v18.41 HPS unlock-after-save fix: newly saved Class Records immediately rebuild Term / Quarter panels so Shared HPS inputs unlock without double-loading the saved record. */
/* v18.40 Grade 12 SY 2026-2027 descriptor source selector: Official DepEd G12 records can choose DO No. 8, s. 2015 or DO No. 015, s. 2026 descriptors after the G12 grading system dropdown; record/CSV/shared-header compatibility retained. */
/* v18.39 Descriptor source live-refresh fix: Custom Institutional learner cards and Summary tab now recompute against the selected descriptor source immediately; data/CSV/shared-header compatibility retained. */
/* v18.38 Descriptor source selector: users can choose DO No. 8, s. 2015 or DO No. 015, s. 2026 descriptors for Custom Institutional academic structures; data/CSV/shared-header compatibility retained. */
/* v18.34 UI-only: Edit-mode record status caption refresh; data/CSV/shared-header compatibility retained. */
/* v18.33 UI-only: Post-save record status caption refresh + compact record manager controls. Data/CSV/shared-header compatibility retained. */
/* v18.32 UI-only: Saved Class Record Edit flow now shows Save + Cancel Edit, and saved-record picker width adjusts to option content. Data/CSV/shared-header compatibility retained. */
/* v18.31 UI-only: Grading Framework control is inserted at the top of Header Fields before School Name; functionality/data/CSV/shared-header compatibility retained. */
/* v18.30 fix: Restores Official DepEd Grade 12 SY 2026-2027 tab/summary switching after Modified Three Term. Quarter/Semester shows semester quarters; Three Term shows Term 1-3; Modified Three Term remains term-bound. Custom Institutional mode unchanged. */
/* CTM form accessibility semantics handled globally by index.html patch v1; Class Record APIs/data formats unchanged. */
/* v18.28 fix: Official DepEd term/quarter tab labels and Summary term columns no longer display the encoded Subject; they show only Term 1/2/3 or Quarter 1/2/3/4 as applicable. */
/* v18.27 fix: Official DepEd follows DO No. 015, s. 2026 three-term school calendar; Term 4 is hidden/excluded from saved Official DepEd records. */
/* v18.26 fix: Subject Group Custom Institutional guidance note is shown only in Custom Institutional mode and hidden/cleared in Official DepEd mode. */
/* v18.25 fix: Switching Grading Framework from Custom Institutional back to Official DepEd now clears custom-only header state and rerenders Official DepEd tabs/summary. */
/* v18.23 fix: Summary tab term/quarter columns now use the effective custom academic structure selection; official DepEd logic remains unchanged. */
(() => {
  'use strict';
  if (window.CTMClassRecord && typeof window.CTMClassRecord.init === 'function') return;

  const MODULE_HTML_PATH = 'classrecord/classrecord-modal.html';
  const FORM_VERSION = 'CTM-CLASSRECORD-SY-2026.18.71-ecr-initial-grade-conformance'; // New Record shared-header isolation fix: New clears only Class Record school year, grade level, subject group, and subject; SF1/SF2/SF3/SF8 shared header values remain untouched; New reset now also runs on every module open and after saved-record deletion // Descriptive learner pill fix: for KS1 descriptive modes, hide Complete/Needs support + IG/TG pills and keep only a full Descriptor pill; compat/data/CSV logic unchanged // Descriptive mode patch: hide entire Shared HPS / Term Setup block while keeping autosave, CSV, computation, legacy, and numeric workflows compatible // Policy Setup compact grid v2.1: first row = Resolved Mode / Table / Numeric Mode; second row = full-width Transition Rule; logic/compat unchanged // UI fix: hide Summary tab Letter / Final Descriptor columns by default for DO No. 015, s. 2026 compliance while retaining underlying data/computation // Term / Quarter compactness patch v5 restores General Description + Instructional Response to 1-column notes layout; no logic changes // Draft/New status locks Shared HPS editing; Duplicate button removed from UI/bindings; compat/data/CSV unchanged
  // Term / Quarter fixed 4x2 card compactness patch v4; no logic changes
  // Term/Quarter compactness patch v3: CSS-driven layout only; no logic changes.
  // Summary tab column visibility switches (UI-only).
  // To show the hidden columns again for testing/legacy review, either:
  //   1) set these defaults below to true, OR
  //   2) before opening Class Record, set window.CTM_CLASSRECORD_SHOW_SUMMARY_LETTER_COLUMN = true;
  //      and/or window.CTM_CLASSRECORD_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN = true;
  const DEFAULT_SHOW_SUMMARY_LETTER_COLUMN = false;
  const DEFAULT_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN = false;
  // UI-only: hide General Description / Instructional Response columns in the Summary table
  // for Grade 12 SY 2026-2027 when Three Term or Modified Three Term is selected.
  // Data is still computed, stored, CSV-compatible, and available in term/learner detail views.
  const HIDE_SUMMARY_DESC_RESPONSE_FOR_G12_THREE_TERM = false;
  const PASSING_GRADE = 75;
  const TERMS = ['term1', 'term2', 'term3', 'term4'];
  // v18.50 MAPEH paired component bundle + consolidated summary
  const MAPEH_COMPONENTS = [
    { key: 'musicArts', legacyKeys: ['music', 'arts'], label: 'Music and Arts', shortLabel: 'Music & Arts', subject: 'MAPEH - Music and Arts' },
    { key: 'peHealth', legacyKeys: ['pe', 'health'], label: 'Physical Education and Health', shortLabel: 'PE & Health', subject: 'MAPEH - Physical Education and Health' }
  ];
  const MAPEH_LEGACY_COMPONENTS = [
    { key: 'music', label: 'Music', shortLabel: 'Music', subject: 'MAPEH - Music' },
    { key: 'arts', label: 'Arts', shortLabel: 'Arts', subject: 'MAPEH - Arts' },
    { key: 'pe', label: 'Physical Education', shortLabel: 'PE', subject: 'MAPEH - Physical Education' },
    { key: 'health', label: 'Health', shortLabel: 'Health', subject: 'MAPEH - Health' }
  ];
  const MAPEH_SUMMARY_KEY = 'summary';
  const TERM_LABELS = { term1: 'Term 1', term2: 'Term 2', term3: 'Term 3', term4: 'Term 4' };
  const CUSTOM_QUARTER_LABELS = { term1: 'Quarter 1', term2: 'Quarter 2', term3: 'Quarter 3', term4: 'Quarter 4' };
  const LEGACY_G12_TERM_LABELS = { term1: 'Quarter 1', term2: 'Quarter 2', term3: 'Quarter 3', term4: 'Quarter 4' };
  const LEGACY_G12_SEMESTER_LABELS = { first: 'First Semester', second: 'Second Semester' };
  const ATTENDANCE_STATUS_LABELS = ['Present', 'Absent', 'Tardy', 'Cutting', 'Excuse', 'Pending'];
  const ATTENDANCE_STATUS_SHORT = { Present: '✓', Absent: 'X', Tardy: 'T', Cutting: 'C', Excuse: 'E', Pending: 'P' };
  const SUBJECT_GROUP_OPTIONS_BY_MODE = {
    basic: [
      'AP / English / Filipino / Mathematics / Science / GMRC / Values',
      'EPP / TLE / MAPEH'
    ],
    shs: [
      'SHS Core / Other SHS Academic Electives',
      'SHS Field Exposure / Arts Apprenticeship / Creative Production',
      'SHS Arts / Sports / Health / Wellness',
      'SHS Research Electives / Design & Innovation',
      'SHS TechPro Electives',
      'SHS Work Immersion'
    ],
    legacyG12: [
      'SHS Grade 12 (DO 8, s. 2015) Core Subjects',
      'SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects',
      'SHS Grade 12 (DO 8, s. 2015) Academic Track Work Immersion / Research / Business Enterprise Simulation / Exhibit / Performance',
      'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects',
      'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance'
    ]
  };

const GRADE_AWARE_SUBJECT_GROUP_OPTIONS = {
  'Kindergarten': ['Sensory Perceptual and Motor Development / Socio-emotional Development / Cognitive Development / Language, Literacy and Communication Development'],
  'Grade 1': {
    default: ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2026-2027': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2027-2028': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2028-2029+': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa']
  },
  'Grade 2': {
    default: ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2026-2027': ['Filipino / English / Mathematics / GMRC / Makabansa'],
    '2027-2028': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2028-2029+': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa']
  },
  'Grade 3': {
    default: ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa'],
    '2026-2027': ['Filipino / English / Mathematics / Science / GMRC / Makabansa'],
    '2027-2028': ['Filipino / English / Mathematics / Science / GMRC / Makabansa'],
    '2028-2029+': ['Language / Reading and Literacy / Mathematics / GMRC / Makabansa']
  }
};

const SCORE_FIELDS = [
  { key: 'ww1', group: 'ww', label: 'WW1' },
  { key: 'ww2', group: 'ww', label: 'WW2' },
  { key: 'ww3', group: 'ww', label: 'WW3' },
  { key: 'ww4', group: 'ww', label: 'WW4' },
  { key: 'ww5', group: 'ww', label: 'WW5' },
  { key: 'pt1', group: 'pt', label: 'PT1' },
  { key: 'pt2', group: 'pt', label: 'PT2' },
  { key: 'pt3', group: 'pt', label: 'PT3' },
  { key: 'pt4', group: 'pt', label: 'PT4' },
  { key: 'pt5', group: 'pt', label: 'PT5' },
  { key: 'st1', group: 'ex', label: 'ST1' },
  { key: 'st2', group: 'ex', label: 'ST2' },
  { key: 'te', group: 'ex', label: 'TE' },
  { key: 'qa1', group: 'ex', label: 'QA1' }
];
const LEGACY_G12_SCORE_FIELDS = [
  { key: 'ww1', group: 'ww', label: 'WW1' },
  { key: 'ww2', group: 'ww', label: 'WW2' },
  { key: 'ww3', group: 'ww', label: 'WW3' },
  { key: 'ww4', group: 'ww', label: 'WW4' },
  { key: 'ww5', group: 'ww', label: 'WW5' },
  { key: 'pt1', group: 'pt', label: 'PT1' },
  { key: 'pt2', group: 'pt', label: 'PT2' },
  { key: 'pt3', group: 'pt', label: 'PT3' },
  { key: 'pt4', group: 'pt', label: 'PT4' },
  { key: 'pt5', group: 'pt', label: 'PT5' },
  { key: 'qa1', group: 'ex', label: 'QA1' }
];
  const CUSTOM_SCORE_FIELDS = [
  { key: 'ww1', group: 'ww', label: 'WW1' }, { key: 'ww2', group: 'ww', label: 'WW2' }, { key: 'ww3', group: 'ww', label: 'WW3' }, { key: 'ww4', group: 'ww', label: 'WW4' }, { key: 'ww5', group: 'ww', label: 'WW5' },
  { key: 'pt1', group: 'pt', label: 'PT1' }, { key: 'pt2', group: 'pt', label: 'PT2' }, { key: 'pt3', group: 'pt', label: 'PT3' }, { key: 'pt4', group: 'pt', label: 'PT4' }, { key: 'pt5', group: 'pt', label: 'PT5' },
  { key: 'st1', group: 'ex', label: 'ST1' }, { key: 'st2', group: 'ex', label: 'ST2' }, { key: 'te1', group: 'ex', label: 'TE1' }, { key: 'te2', group: 'ex', label: 'TE2' }, { key: 'qe1', group: 'ex', label: 'QE1' }, { key: 'qe2', group: 'ex', label: 'QE2' }
];
const TABLE7 = [
    { code: 'CO', label: 'Consistent', localizedLabel: 'Palagiang Naipapakita', generalDescription: 'Consistently demonstrates the expected competency; actively participates in activities; works independently; may exceed expectations in some areas.' },
    { code: 'DV', label: 'Developing', localizedLabel: 'Umuusbong', generalDescription: 'Demonstrates the competency inconsistently; participates with minimal supervision; shows progress with continued practice.' },
    { code: 'BG', label: 'Beginning', localizedLabel: 'Nagsisimula', generalDescription: 'Rarely demonstrates the expected competency; participates with close supervision; requires sustained guidance and support.' }
  ];
  const TABLE8 = [
    { code: 'A', label: 'Advancing', localizedLabel: 'Namumukod-tangi', generalDescription: 'Consistently demonstrates advanced skills, understanding, and values beyond expectations; performs with confidence, accuracy, and independence.' },
    { code: 'B', label: 'Benchmarking', localizedLabel: 'Napamamalas', generalDescription: 'Demonstrates expected skills, understanding, and values at grade level with consistency; performs tasks accurately and independently.' },
    { code: 'C', label: 'Connecting', localizedLabel: 'Natutungo', generalDescription: 'Demonstrates foundational skills, understanding, and values; applies learning in familiar tasks with minimal guidance.' },
    { code: 'D', label: 'Developing', localizedLabel: 'Napauunlad', generalDescription: 'Demonstrates partial understanding and inconsistent application of skills and values; requires targeted support and regular practice to improve performance.' },
    { code: 'E', label: 'Emerging', localizedLabel: 'Nagsisimula', generalDescription: 'Beginning to demonstrate basic skills, understanding, and values; requires intensive support and close guidance.' }
  ];
const TABLE11 = [
  { min: 90, max: 100, descriptorCode: 'ADVANCING', descriptorLabel: 'Advancing', localizedLabel: 'Namumukod-tangi', generalDescription: 'Consistently demonstrates skills and understanding that meet or exceed standards with independence, flexibility, and depth.', instructionalResponse: 'Provide enrichment opportunities; encourage leadership, transfer, or peer mentoring.' },
  { min: 80, max: 89, descriptorCode: 'BENCHMARKING', descriptorLabel: 'Benchmarking', localizedLabel: 'Napamamalas', generalDescription: 'Demonstrates expected grade-level skills and understanding competently and independently.', instructionalResponse: 'Encourage deeper application, transfer of learning, and increased independence.' },
  { min: 75, max: 79, descriptorCode: 'CONNECTING', descriptorLabel: 'Connecting', localizedLabel: 'Natutungo', generalDescription: 'Demonstrates sufficient understanding and application of grade-level standards with occasional guidance and support.', instructionalResponse: 'Provide guided practice to strengthen consistency, accuracy, and confidence.' },
  { min: 65, max: 74, descriptorCode: 'DEVELOPING', descriptorLabel: 'Developing', localizedLabel: 'Napauunlad', generalDescription: 'Demonstrates partial understanding and inconsistent application of skills; requires targeted support and scaffolding.', instructionalResponse: 'Provide targeted remediation, scaffolded instruction, and additional opportunities for practice.' },
  { min: 0, max: 64, descriptorCode: 'EMERGING', descriptorLabel: 'Emerging', localizedLabel: 'Nagsisimula', generalDescription: 'Does not yet demonstrate foundational skills and understanding; requires intensive support.', instructionalResponse: 'Implement structured and sustained intervention programs.' }
];
const TABLE10 = [
  { min: 90, max: 100, descriptorCode: 'O', descriptorLabel: 'Outstanding', remarks: 'Passed' },
  { min: 85, max: 89, descriptorCode: 'VS', descriptorLabel: 'Very Satisfactory', remarks: 'Passed' },
  { min: 80, max: 84, descriptorCode: 'S', descriptorLabel: 'Satisfactory', remarks: 'Passed' },
  { min: 75, max: 79, descriptorCode: 'FS', descriptorLabel: 'Fairly Satisfactory', remarks: 'Passed' },
  { min: 0, max: 74, descriptorCode: 'DNME', descriptorLabel: 'Did Not Meet Expectations', remarks: 'Failed' }
];
  const KS1_TRANSITION = {
    '2026-2027': { 'Grade 1': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' }, 'Grade 2': { table: 'table11', gradingMode: 'numeric', numericMode: 'adjusted-transmutation' }, 'Grade 3': { table: 'table11', gradingMode: 'numeric', numericMode: 'adjusted-transmutation' } },
    '2027-2028': { 'Grade 1': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' }, 'Grade 2': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' }, 'Grade 3': { table: 'table11', gradingMode: 'numeric', numericMode: 'zero-based' } },
    '2028-2029+': { 'Grade 1': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' }, 'Grade 2': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' }, 'Grade 3': { table: 'table8', gradingMode: 'descriptive', numericMode: 'none' } }
  };
const NUMERIC_TRANSMUTATION_TABLE = [
  [99.50,100.00,100],[98.32,99.49,99],[97.14,98.31,98],[95.96,97.13,97],[94.78,95.95,96],[93.60,94.77,95],[92.42,93.59,94],[91.24,92.41,93],[90.06,91.23,92],[88.88,90.05,91],[87.70,88.87,90],[86.52,87.69,89],[85.34,86.51,88],[84.16,85.33,87],[82.98,84.15,86],[81.80,82.97,85],[80.62,81.79,84],[79.44,80.61,83],[78.26,79.43,82],[77.08,78.25,81],[75.90,77.07,80],[74.72,75.89,79],[73.54,74.71,78],[72.36,73.53,77],[71.18,72.35,76],[70.00,71.17,75],[65.34,69.99,74],[60.67,65.33,73],[56.01,60.66,72],[51.34,56.00,71],[46.67,51.33,70],[42.01,46.66,69],[37.34,42.00,68],[32.68,37.33,67],[28.01,32.67,66],[23.35,28.00,65],[18.68,23.34,64],[14.01,18.67,63],[9.35,14.00,62],[4.68,9.34,61],[0.00,4.67,60]
];
const DO8_APPENDIX_B_TRANSMUTATION_TABLE = [
  [100.00,100.00,100],[98.40,99.99,99],[96.80,98.39,98],[95.20,96.79,97],[93.60,95.19,96],[92.00,93.59,95],[90.40,91.99,94],[88.80,90.39,93],[87.20,88.79,92],[85.60,87.19,91],[84.00,85.59,90],[82.40,83.99,89],[80.80,82.39,88],[79.20,80.79,87],[77.60,79.19,86],[76.00,77.59,85],[74.40,75.99,84],[72.80,74.39,83],[71.20,72.79,82],[69.60,71.19,81],[68.00,69.59,80],[66.40,67.99,79],[64.80,66.39,78],[63.20,64.79,77],[61.60,63.19,76],[60.00,61.59,75],[56.00,59.99,74],[52.00,55.99,73],[48.00,51.99,72],[44.00,47.99,71],[40.00,43.99,70],[36.00,39.99,69],[32.00,35.99,68],[28.00,31.99,67],[24.00,27.99,66],[20.00,23.99,65],[16.00,19.99,64],[12.00,15.99,63],[8.00,11.99,62],[4.00,7.99,61],[0.00,3.99,60]
];

const TRANSMUTATION_TABLE_REGISTRY = {
  none: { key: 'none', label: 'Zero Based Direct Computation', source: 'Custom', table: null },
  'deped-do8-2015-appendix-b': { key: 'deped-do8-2015-appendix-b', label: 'DO No. 8, s. 2015 - Appendix B', source: 'DepEd Order No. 8, s. 2015', table: DO8_APPENDIX_B_TRANSMUTATION_TABLE },
  'deped-do015-2026-adjusted': { key: 'deped-do015-2026-adjusted', label: 'DO No. 015, s. 2026 - Adjusted Transmutation Table', source: 'DepEd Order No. 015, s. 2026', table: NUMERIC_TRANSMUTATION_TABLE }
};
const SUBJECT_PROFILES = {
  'Filipino / English / Mathematics / Science / GMRC / Makabansa': { profileName: 'Grade 3 Subject Group', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Filipino / English / Mathematics / GMRC / Makabansa': { profileName: 'Grade 2 Subject Group', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Language / Reading and Literacy / Mathematics / GMRC / Makabansa': { profileName: 'KS1 Integrated Subject Group', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Sensory Perceptual and Motor Development / Socio-emotional Development / Cognitive Development / Language, Literacy and Communication Development': { profileName: 'Kinder Domains Group', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Domains only': { profileName: 'Kinder Domains', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Language': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Reading and Literacy': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Filipino': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'English': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Mathematics': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Science': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'GMRC': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'Makabansa': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'AP / English / Filipino / Mathematics / Science / GMRC / Values': { profileName: 'Core Academic', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'EPP / TLE / MAPEH': { profileName: 'Skills / MAPEH', weights: { ww: 0.20, pt: 0.60, ex: 0.20 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'SHS Core / Other SHS Academic Electives': { profileName: 'SHS Core', weights: { ww: 0.20, pt: 0.50, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'SHS Field Exposure / Arts Apprenticeship / Creative Production': { profileName: 'SHS Field Exposure', weights: { ww: 0.15, pt: 0.70, ex: 0.15 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'SHS Arts / Sports / Health / Wellness': { profileName: 'SHS Arts / Sports / Health / Wellness', weights: { ww: 0.20, pt: 0.60, ex: 0.20 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'SHS Research Electives / Design & Innovation': { profileName: 'SHS Research / Design and Innovation', weights: { ww: 0.40, pt: 0.60, ex: 0.00 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 0, hasTE: false } },
  'SHS TechPro Electives': { profileName: 'SHS TechPro', weights: { ww: 0.15, pt: 0.65, ex: 0.20 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 2, hasTE: true } },
  'SHS Work Immersion': { profileName: 'SHS Work Immersion', weights: { ww: 0.20, pt: 0.80, ex: 0.00 }, assessmentCounts: { wwCount: 5, ptCount: 3, stCount: 0, hasTE: false } }
};
const LEGACY_G12_DO8_2015_PROFILES = {
  'SHS Grade 12 (DO 8, s. 2015) Core Subjects': { profileName: 'SHS Grade 12 Legacy Core Subjects', weights: { ww: 0.25, pt: 0.50, ex: 0.25 }, assessmentCounts: { wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 } },
  'SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects': { profileName: 'SHS Grade 12 Legacy Academic Track Other Subjects', weights: { ww: 0.25, pt: 0.45, ex: 0.30 }, assessmentCounts: { wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 } },
  'SHS Grade 12 (DO 8, s. 2015) Academic Track Work Immersion / Research / Business Enterprise Simulation / Exhibit / Performance': { profileName: 'SHS Grade 12 Legacy Academic Track Immersion / Research / BES / Exhibit / Performance', weights: { ww: 0.35, pt: 0.40, ex: 0.25 }, assessmentCounts: { wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 } },
  'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects': { profileName: 'SHS Grade 12 Legacy TVL / Sports / Arts & Design Other Subjects', weights: { ww: 0.20, pt: 0.60, ex: 0.20 }, assessmentCounts: { wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 } },
  'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance': { profileName: 'SHS Grade 12 Legacy TVL / Sports / Arts & Design Immersion / Research / Exhibit / Performance', weights: { ww: 0.20, pt: 0.60, ex: 0.20 }, assessmentCounts: { wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 } }
};
  const fallbackHtml = "<div id=\"classRecordModal\" class=\"modal\" aria-hidden=\"true\" role=\"dialog\" aria-modal=\"true\" style=\"display:none\">\n  <div class=\"modal-content ctm-cr-modal-content\" style=\"max-width:1200px;\">\n    <div class=\"ctm-cr-topbar\">\n      <div>\n        <h3 style=\"margin:0\">Class Record</h3>\n        <div class=\"ctm-cr-subtitle\"><span id=\"crTopClassName\">No class loaded</span><span>\u2022</span><span id=\"crTopSubject\">No subject</span><span>\u2022</span><span id=\"crTopSchoolYear\">No school year</span></div>\n      </div>\n      <div class=\"ctm-cr-topbar-actions\">\n<button class=\"edit\" id=\"crBtnNew\">New Record</button>\n        <button class=\"danger\" id=\"crBtnDelete\">Delete</button>\n        <button class=\"primary\" id=\"crBtnSave\">Save</button>\n        <button class=\"edit\" id=\"crBtnCancelEdit\" hidden>Cancel Edit</button>\n        <button class=\"primary\" id=\"crBtnImportCsv\">Import CSV</button>\n        <button class=\"primary\" id=\"crBtnViewExcel\">View in Excel</button>\n        <button class=\"primary\" id=\"crBtnExportCsv\">Export CSV</button>\n        <button class=\"danger\" id=\"crBtnClose\" style=\"padding:.25rem .6rem\">\u2715</button>\n      </div>\n    </div>\n    <div class=\"ctm-cr-disclaimer\"><b>Testing Build:</b> Mobile-first Class Record with shared HPS per term, individual learner cards, full CSV import/export, and validation.</div>\n    <div class=\"ctm-cr-manager section-lite\">\n      <div class=\"ctm-cr-manager-grid\">\n        <div><label class=\"ctm-cr-label\">Saved Record</label><select id=\"crRecordPicker\"></select></div>\n        <div><label class=\"ctm-cr-label\">Record Status</label><div id=\"crRecordStatus\" class=\"ctm-cr-status-pill\">Draft / unsaved school-year record</div></div>\n        <div><label class=\"ctm-cr-label\">Policy Source</label><div class=\"ctm-cr-status-pill\">DO No. 015, s. 2026 / DO No. 8, s. 2015 (G12 SY 2026-2027)</div></div>\n      </div>\n    </div>\n    <div class=\"ctm-cr-tabs\" aria-label=\"Class Record Tabs\">\n      <div id=\"crTabsShell\" class=\"ctm-cr-tabs-shell\" role=\"tablist\" aria-label=\"Class Record Tabs\" aria-hidden=\"false\">\n      <button class=\"primary ctm-cr-tab active\" data-tab=\"header\" type=\"button\">Header Fields</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"policy\" type=\"button\">Policy Setup</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term1\" type=\"button\">Term 1</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term2\" type=\"button\">Term 2</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term3\" type=\"button\">Term 3</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term4\" type=\"button\" style=\"display:none\">Term 4</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"final\" type=\"button\">Summary</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"attendance\" type=\"button\">Attendance</button>\n      </div>\n      <div class=\"ctm-cr-tabs-footer\"><p class=\"ctm-cr-tabs-source\"><a href=\"https://drive.google.com/drive/folders/13APGK-OoX_g2bWqVZ9h-iGd16DCDNa5_?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\">Source: DO No. 015, s. 2026 / DO No. 8, s. 2015</a></p></div>\n    </div>\n    <div id=\"crFlash\" class=\"ctm-cr-flash\" style=\"display:none\" aria-live=\"polite\" aria-atomic=\"true\" aria-hidden=\"true\"></div>\n    <section id=\"crPanelHeader\" class=\"ctm-cr-panel active\">\n      <div class=\"ctm-cr-panel-title\">Record Header</div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\">\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crSchoolName\">School Name</label><input id=\"crSchoolName\" placeholder=\"School Name\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSchoolYear\">School Year</label><input id=\"crSchoolYear\" placeholder=\"2026-2027\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crGradeLevel\">Grade Level</label>\n          <select id=\"crGradeLevel\"><option value=\"\">Select Grade Level</option><option>Kindergarten</option><option>Grade 1</option><option>Grade 2</option><option>Grade 3</option><option>Grade 4</option><option>Grade 5</option><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option></select>\n        </div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSection\">Class / Section</label><input id=\"crSection\" placeholder=\"Section\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSemester\">Semester</label><select id=\"crSemester\"><option value=\"\">Select Semester</option><option value=\"First Semester\">First Semester</option><option value=\"Second Semester\">Second Semester</option></select></div>\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crTeacher\">Teacher / Class Adviser</label><input id=\"crTeacher\" placeholder=\"Teacher / Class Adviser\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSchoolId\">School ID</label><input id=\"crSchoolId\" placeholder=\"School ID\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crDistrict\">District</label><input id=\"crDistrict\" placeholder=\"District\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crDivision\">Division</label><input id=\"crDivision\" placeholder=\"Division\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crRegion\">Region</label><input id=\"crRegion\" placeholder=\"Region\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSubjectGroup\">Subject Group</label>\n          <select id=\"crSubjectGroup\"><option value=\"\">Select Subject Group</option><option>Sensory Perceptual and Motor Development / Socio-emotional Development / Cognitive Development / Language, Literacy and Communication Development</option><option>Language / Reading and Literacy / Mathematics / GMRC / Makabansa</option><option>Filipino / English / Mathematics / GMRC / Makabansa</option><option>Filipino / English / Mathematics / Science / GMRC / Makabansa</option><option>AP / English / Filipino / Mathematics / Science / GMRC / Values</option><option>EPP / TLE / MAPEH</option><option>SHS Core / Other SHS Academic Electives</option><option>SHS Field Exposure / Arts Apprenticeship / Creative Production</option><option>SHS Arts / Sports / Health / Wellness</option><option>SHS Research Electives / Design & Innovation</option><option>SHS TechPro Electives</option><option>SHS Work Immersion</option><option>SHS Grade 12 (DO 8, s. 2015) Core Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) Academic Track Work Immersion / Research / Business Enterprise Simulation / Exhibit / Performance</option><option>SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance</option></select>\n        </div>\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crSubject\">Subject</label><input id=\"crSubject\" placeholder=\"Subject\"></div>\n<div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crKeyStage\">Key Stage</label><input id=\"crKeyStage\" placeholder=\"Auto\" readonly></div>\n      </div>\n    </section>\n    <!-- Policy Setup fallback remains structurally compatible; primary layout is governed by external HTML/CSS module. -->\n    <section id=\"crPanelPolicy\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Policy Setup (Resolved)</div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Resolved Grading Mode</div><div id=\"crResolvedMode\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Resolved Table</div><div id=\"crResolvedTable\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Numeric Mode</div><div id=\"crResolvedNumericMode\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Transition Rule</div><div id=\"crResolvedTransition\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">WW Weight</div><div id=\"crWeightWW\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">PT Weight</div><div id=\"crWeightPT\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">EX Weight</div><div id=\"crWeightEX\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Has TE</div><div id=\"crHasTE\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">WW Count</div><div id=\"crCountWW\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">PT Count</div><div id=\"crCountPT\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">ST Count</div><div id=\"crCountST\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Uses Descriptors</div><div id=\"crUseDescriptors\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-field\" style=\"margin-top:1rem;\"><label class=\"ctm-cr-label\" for=\"crPolicyNotes\">Validation / Notes</label><textarea id=\"crPolicyNotes\" rows=\"3\" readonly></textarea></div>\n    </section>\n    <section id=\"crPanelTerm1\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm2\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm3\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm4\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelFinal\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Summary</div>\n      <div class=\"ctm-cr-disclaimer\" style=\"margin-bottom:.75rem;\">Final Grade Summary based on the selected Grade 12 SY 2026-2027 grading system.</div>\n      <div class=\"table-scroll ctm-cr-table-scroll ctm-cr-final-scroll\" id=\"crFinalTableScroll\" aria-label=\"Scrollable class record summary table\"><table id=\"crFinalTable\" class=\"ctm-cr-table\"><thead><tr><th>#</th><th>Learner</th><th>Sex</th><th>T1</th><th>T2</th><th>T3</th><th>Remarks</th><th>Teacher Remarks</th><th>Intervention Notes</th><th>General Description</th><th>Instructional Response</th></tr></thead><tbody></tbody></table></div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Class Average</div><div id=\"crFinalClassAverage\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Passing Count</div><div id=\"crFinalPassingCount\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Non-Passing Count</div><div id=\"crFinalNonPassingCount\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Table Used</div><div id=\"crFinalTableUsed\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n    </section>\n    <section id=\"crPanelAttendance\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Attendance (Read-only)</div>\n      <div class=\"ctm-cr-disclaimer\">Source: attendance / SF2 data already tracked by the app. Read-only inside Class Record.</div>\n      <div class=\"table-scroll\"><table id=\"crAttendanceTable\" class=\"ctm-cr-table\"><thead><tr><th>#</th><th>Learner</th><th>Sex</th><th>Present</th><th>Absent</th><th>Tardy</th><th>Cutting</th><th>Excuse</th><th>Pending</th></tr></thead><tbody></tbody></table></div>\n    </section>\n    <div class=\"meta\" style=\"color:#667;font-size:.85rem;margin-top:1rem;text-align:justify;\"><b>Disclaimer:</b> Generated document is not an official DepEd School Form.</div>\n  </div>\n</div>\n";

  const state = {
    classId: '', className: '', roster: [], savedRoster: [], activeLearnerId: '', activeTab: 'header', htmlInjected: false, suppressHostRosterOnce: false, connectedHostClassKey: '', hostSyncBound: false, hostSyncTimer: 0, autoSaveTimer: 0, finalSelectedLearnerId: '', mapehSummarySelectedLearnerId: '', mapehVirtualBaseHeader: null, isMapehSummaryView: false, isTransientDraft: true, headerEditMode: false, headerDirty: false,
    recordHeader: null, setupProfile: null, attendance: null, finalSummary: null, term1: null, term2: null, term3: null, term4: null
  };
  const dom = {};
  const TABS_COLLAPSE_STORAGE_KEY = 'ctm-classrecord-tabs-collapsed-v1';
  const TABS_COLLAPSE_DEFAULT = false;

  function defaultRecordHeader() { return { recordId: '', classId: '', className: '', schoolYear: '', schoolId: '', schoolName: '', district: '', division: '', region: '', gradeLevel: '', keyStage: '', section: '', semester: '', g12Sy2026System: 'quarterSemester', g12DescriptorSource: 'do8-2015', modifiedTerm: 'term1', teacherName: '', subject: '', subjectKey: '', subjectGroup: '', recordLabel: '', sourcePolicy: 'DO No. 015, s. 2026 / DO No. 8, s. 2015 (G12 SY 2026-2027)', customPolicyEnabled: false, gradingFramework: 'officialDepEd', customAcademicStructure: 'trimesterContinuous', customActiveTerm: 'term1', customSelectedTerms: ['term1', 'term2', 'term3'], customFinalRule: 'averageVisibleTerms', customDescriptorSource: 'do8-2015', gradeConversionMethod: 'zeroBased', transmutationTableKey: 'none', mapehMode: 'single', mapehComponent: '', mapehBundleId: '', mapehReportSubject: '' }; }
function defaultSetupProfile() { return { profileKey: '', profileName: '', gradingModeResolved: '', resultTableResolved: '', transitionRuleResolved: { schoolYear: '', gradeLevel: '', table: '', gradingMode: '', numericMode: '', transitionLabel: '' }, componentWeights: { ww: 0, pt: 0, ex: 0 }, assessmentCounts: { wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0, teCount: 0, qeCount: 0 }, customComponents: { ww: { count: 5, weight: 20 }, pt: { count: 5, weight: 50 }, st: { count: 2, weight: 15 }, te: { count: 1, weight: 15 }, qe: { count: 0, weight: 0 } }, customPolicyEnabled: false, gradeConversionMethod: 'zeroBased', transmutationTableKey: 'none', customAcademicStructure: 'trimesterContinuous', customFinalRule: 'averageVisibleTerms', customDescriptorSource: 'do8-2015', usesTransmutation: false, usesZeroBased: false, usesDescriptors: true, validationNotes: [] }; }
function blankHps() { return { ww: { ww1: null, ww2: null, ww3: null, ww4: null, ww5: null }, pt: { pt1: null, pt2: null, pt3: null, pt4: null, pt5: null }, ex: { st1: null, st2: null, te: null, qa1: null, te1: null, te2: null, qe1: null, qe2: null } }; }
function blankScores() { return { ww: { ww1: null, ww2: null, ww3: null, ww4: null, ww5: null }, pt: { pt1: null, pt2: null, pt3: null, pt4: null, pt5: null }, ex: { st1: null, st2: null, te: null, qa1: null, te1: null, te2: null, qe1: null, qe2: null } }; }
function defaultComputed() { return { tableUsed: '', initialGrade: null, transmutedGrade: null, termGrade: null, finalDisplayedNumeric: null, letterGrade: '', descriptorCode: '', descriptorLabel: '', generalDescription: '', instructionalResponse: '', remarks: '', teacherNotes: '', interventionFlag: false, interventionNotes: '' }; }
function defaultTerm(key) { return { termKey: key, termLabel: TERM_LABELS[key], applicableTable: '', gradingMode: '', numericMode: '', assessmentConfig: { wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 }, hps: blankHps(), learners: [] }; }
  function defaultAttendance() { return { source: 'attendance/sf2', readOnly: true, asOfDate: '', rows: [] }; }
  function defaultFinalSummary() { return { applicableTable: '', gradingMode: '', numericMode: '', finalComputationMode: '', learners: [], classSummary: { tableUsed: '', classAverage: null, passingCount: 0, nonPassingCount: 0 } }; }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function text(v) { return v == null ? '' : String(v); }
  function num(v) { if (v === '' || v == null) return null; const n = Number(v); return Number.isFinite(n) ? n : null; }
  function slugify(v) { return text(v).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'default'; }
  // v18.48 MAPEH component bundle + consolidated summary helpers
  function isMapehSubjectGroup(value) { return text(value).trim() === 'EPP / TLE / MAPEH'; }
  function isMapehEligibleGrade(gradeLevel) { return /^Grade\s+(?:4|5|6|7|8|9|10)$/.test(text(gradeLevel).trim()); }
  function isMapehBaseSubject(value) {
    const raw = text(value).trim();
    const s = raw.toLowerCase().replace(/&/g, ' and ');
    return s === 'mapeh' || s === 'music' || s === 'arts' || s === 'music and arts' || s === 'physical education' || s === 'pe' || s === 'p.e.' || s === 'health' || s === 'pe and health' || s === 'physical education and health' || /^mapeh\s*-/i.test(raw);
  }
  function normalizeMapehComponent(value) {
    const s = text(value).trim().toLowerCase().replace(/&/g, ' and ');
    if (!s) return '';
    if (s.includes('music') || s.includes('arts')) return 'musicArts';
    if (s.includes('physical') || s === 'pe' || s.includes('p.e') || s.includes('health')) return 'peHealth';
    return '';
  }
  function getMapehComponentMeta(componentKey) { return MAPEH_COMPONENTS.find(c => c.key === componentKey) || null; }
  function canonicalMapehHeaderSource(header) { return header || (state && state.recordHeader) || {}; }
  function makeMapehBundleId(header) {
    const h = canonicalMapehHeaderSource(header);
    const parts = ['mapeh', h.gradeLevel || '', h.section || h.className || '', h.schoolYear || '', h.classId || state.classId || ''];
    return parts.map(slugify).join('-').replace(/-+/g, '-');
  }
  function getMapehComponentSubject(componentKey) { const meta = getMapehComponentMeta(componentKey); return meta ? meta.subject : 'MAPEH'; }
  function isMapehBundleCandidate(header = state.recordHeader) {
    const h = header || {};
    if (!isMapehEligibleGrade(h.gradeLevel)) return false;
    if (!isMapehSubjectGroup(h.subjectGroup)) return false;
    return isMapehBaseSubject(h.subject) || ['component','consolidated'].includes(text(h.mapehMode).trim());
  }
  // v18.57 MAPEH-aware Summary + consolidated View in Excel helpers
  function isMapehSummaryEligible(header = state.recordHeader) { return isMapehBundleCandidate(header); }
  function getMapehBundleId(header = state.recordHeader) { const h = canonicalMapehHeaderSource(header); return text(h.mapehBundleId).trim() || makeMapehBundleId(h); }
  function isMapehPairedComponentHeader(header, componentKey) { const h = header || {}; return isMapehSummaryEligible(h) && (text(h.mapehComponent).trim() === componentKey || normalizeMapehComponent(h.subject) === componentKey); }
  function sameMapehFallbackBundle(a, b) { const x = a || {}, y = b || {}; return isMapehSummaryEligible(x) && isMapehSummaryEligible(y) && text(x.gradeLevel).trim() === text(y.gradeLevel).trim() && text(x.schoolYear).trim() === text(y.schoolYear).trim() && text(x.subjectGroup).trim() === text(y.subjectGroup).trim() && text(x.classId || state.classId).trim() === text(y.classId || state.classId).trim() && text(x.section || x.className).trim().toLowerCase() === text(y.section || y.className).trim().toLowerCase(); }
  function shouldShowMapehUi(header = state.recordHeader) { return isMapehBundleCandidate(header); }
  function normalizeMapehHeader(header = state.recordHeader) {
    if (!header) return header;
    if (!isMapehBundleCandidate(header)) {
      header.mapehMode = header.mapehMode || 'single';
      header.mapehComponent = '';
      header.mapehBundleId = '';
      header.mapehReportSubject = '';
      return header;
    }
    const comp = normalizeMapehComponent(header.subject) || normalizeMapehComponent(header.mapehComponent);
    header.subjectGroup = 'EPP / TLE / MAPEH';
    header.mapehBundleId = header.mapehBundleId || makeMapehBundleId(header);
    header.mapehReportSubject = header.mapehReportSubject || 'MAPEH';
    // v18.57: preserve the virtual read-only consolidated Summary; do not coerce it into a third editable component record.
    if (text(header.mapehMode).trim() === 'consolidated') {
      header.subject = 'MAPEH';
      header.subjectKey = 'mapeh';
      header.mapehComponent = '';
      header.mapehReportSubject = 'MAPEH';
      return header;
    }
    if (comp) {
      header.mapehMode = 'component';
      header.mapehComponent = comp;
      header.subject = getMapehComponentSubject(comp);
      header.subjectKey = slugify(header.subject);
    } else if (text(header.subject).trim().toLowerCase() === 'mapeh') {
      header.mapehMode = 'component';
      header.mapehComponent = 'musicArts';
      header.subject = getMapehComponentSubject('musicArts');
      header.subjectKey = slugify(header.subject);
    }
    return header;
  }
  function mapLearnerIdentity(row) {
    return { id: text(row && (row.learnerId || row.id || row.studentId)).trim(), fallback: `${normalizeName(row && row.name)}|${normalizeSex(row && row.sex).toLowerCase()}` };
  }
  function esc(v) { return text(v).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
  function fmt(v) { return v == null || v === '' ? '—' : String(v); }
  function round2(v) { return Number.isFinite(Number(v)) ? Math.round(Number(v) * 100) / 100 : null; }
  function roundWhole(v) { return Number.isFinite(Number(v)) ? Math.round(Number(v)) : null; }
  function clampReportFloor(v, floor = 60) { const n = Number(v); return Number.isFinite(n) ? (n <= floor ? floor : n) : null; }
  function summaryReportedNumeric(value, floor = 60) { if (value == null || value === '') return floor; const n = Number(value); if (!Number.isFinite(n)) return floor; return clampReportFloor(n, floor); }
  function summaryAverageFromReported(values, floor = 60) { const list = (Array.isArray(values) ? values : []).map(v => summaryReportedNumeric(v, floor)).filter(v => Number.isFinite(Number(v))).map(Number); return list.length ? roundWhole(list.reduce((a, b) => a + b, 0) / list.length) : floor; }
  function normalizeSex(v) { const s = text(v).trim().toLowerCase(); if (s === 'male' || s === 'm') return 'Male'; if (s === 'female' || s === 'f') return 'Female'; return text(v).trim(); }
  function $id(id) { return document.getElementById(id); }

  function prepareModalForHide(modal) {
    if (!modal || !modal.contains) return;
    try {
      if (window.CTMModalA11y && typeof window.CTMModalA11y.prepareForHide === 'function') {
        window.CTMModalA11y.prepareForHide(modal);
        return;
      }
    } catch (_) {}
    const active = document.activeElement;
    if (active && active !== document.body && modal.contains(active)) {
      try { active.blur(); } catch (_) {}
      const fallback = document.getElementById('btnOpenClassRecord') || document.body || document.documentElement;
      if (fallback && typeof fallback.focus === 'function' && modal.contains(document.activeElement)) {
        const hadTabIndex = fallback.hasAttribute && fallback.hasAttribute('tabindex');
        try { if (!hadTabIndex && fallback.setAttribute) fallback.setAttribute('tabindex', '-1'); } catch (_) {}
        try { fallback.focus({ preventScroll: true }); } catch (_) { try { fallback.focus(); } catch (__) {} }
        if (!hadTabIndex && fallback.removeAttribute) setTimeout(() => { try { fallback.removeAttribute('tabindex'); } catch (_) {} }, 0);
      }
    }
  }
  function markModalShown(modal) {
    if (!modal) return;
    try { modal.inert = false; } catch (_) {}
    try { if (window.CTMModalA11y && typeof window.CTMModalA11y.markShown === 'function') window.CTMModalA11y.markShown(modal); } catch (_) {}
  }
  function markModalHidden(modal) {
    if (!modal) return;
    prepareModalForHide(modal);
    try { modal.inert = true; } catch (_) {}
  }
  function normalizeName(v) { return text(v).trim().toLowerCase().replace(/\s+/g, ' '); }
  function shouldShowSummaryLetterColumn() {
    return !!((typeof window !== 'undefined' && window.CTM_CLASSRECORD_SHOW_SUMMARY_LETTER_COLUMN != null)
      ? window.CTM_CLASSRECORD_SHOW_SUMMARY_LETTER_COLUMN
      : DEFAULT_SHOW_SUMMARY_LETTER_COLUMN);
  }
  function shouldShowSummaryFinalDescriptorColumn() {
    return !!((typeof window !== 'undefined' && window.CTM_CLASSRECORD_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN != null)
      ? window.CTM_CLASSRECORD_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN
      : DEFAULT_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN);
  }
  function shouldHideSummaryDescResponseColumnsForG12ThreeTerm() {
    if (!HIDE_SUMMARY_DESC_RESPONSE_FOR_G12_THREE_TERM) return false;
    return isLegacyGrade12Do8(state.recordHeader && state.recordHeader.gradeLevel, state.recordHeader && state.recordHeader.schoolYear)
      && (isG12ThreeTermLayout() || isG12ModifiedThreeTermLayout());
  }
  function rosterMatchKey(item) { return `${normalizeName(item && item.name)}|${normalizeSex(item && item.sex).toLowerCase()}`; }
  function learnerSexGroup(value) { const sex = normalizeSex(value).toLowerCase(); if (sex === 'male') return 'male'; if (sex === 'female') return 'female'; return 'other'; }
  function buildLearnerDisplayList(list) {
    const males = [];
    const females = [];
    const others = [];
    (Array.isArray(list) ? list : []).forEach((row, originalIndex) => {
      const entry = { row, originalIndex, sexGroup: learnerSexGroup(row && row.sex) };
      if (entry.sexGroup === 'male') males.push(entry);
      else if (entry.sexGroup === 'female') females.push(entry);
      else others.push(entry);
    });
    let maleNo = 0;
    let femaleNo = 0;
    let otherNo = 0;
    return males.concat(females, others).map((entry, orderIndex) => {
      let displayNo = orderIndex + 1;
      if (entry.sexGroup === 'male') displayNo = ++maleNo;
      else if (entry.sexGroup === 'female') displayNo = ++femaleNo;
      else displayNo = ++otherNo;
      return Object.assign({}, entry, { orderIndex, overallNo: orderIndex + 1, displayNo });
    });
  }
  function learnerDisplayMeta(list, learnerId) {
    const key = text(learnerId);
    return buildLearnerDisplayList(list).find(entry => text(entry && entry.row && entry.row.learnerId) === key) || null;
  }
  function getKeyStage(g) { g = text(g).trim(); if (g === 'Kindergarten' || /^Grade\s+[1-3]$/.test(g)) return 'KS1'; if (/^Grade\s+[4-6]$/.test(g)) return 'KS2'; if (/^Grade\s+(?:7|8|9|10)$/.test(g)) return 'KS3'; if (/^Grade\s+(11|12)$/.test(g)) return 'KS4'; return ''; }
  function normalizeSchoolYearRange(sy) { const raw = text(sy).trim(); const m = raw.match(/(\d{4})\s*-\s*(\d{4})/); return m ? `${m[1]}-${m[2]}` : raw; }
  function getSharedHeaderApi() { return window.CTMSharedHeader && typeof window.CTMSharedHeader === 'object' ? window.CTMSharedHeader : null; }
  function getSharedHeaderValue(field, fallback = '') { const api = getSharedHeaderApi(); return api && typeof api.get === 'function' ? text(api.get(field) || fallback) : text(fallback); }

  function readSharedHeaderSnapshot() {
    const api = getSharedHeaderApi();
    const fallbackMap = {
      schoolName: ['sf1SchoolName', 'sf2SchoolName', 'sf3SchoolName', 'sf8SchoolName'],
      schoolYear: ['sf1SchoolYear', 'sf2SchoolYear', 'sf3SchoolYear', 'sf8SchoolYear'],
      gradeLevel: ['sf1GradeLevel', 'sf2GradeLevel', 'sf3GradeLevel', 'sf8Grade'],
      section: ['sf1Section', 'sf2Section', 'sf3Section', 'sf8Section'],
      semester: ['sf1Semester', 'sf3Semester'],
      g12Sy2026System: ['sf1G12Sy2026System', 'sf2G12Sy2026System', 'sf3G12Sy2026System', 'sf8G12Sy2026System', 'crG12Sy2026System'],
      modifiedTerm: ['sf1ModifiedTerm', 'sf2ModifiedTerm', 'sf3ModifiedTerm', 'sf8ModifiedTerm', 'crModifiedTerm'],
      teacherName: ['sf1Teacher', 'sf2Teacher', 'sf3Teacher'],
      schoolId: ['sf1SchoolId', 'sf2SchoolId', 'sf3SchoolId', 'sf8SchoolId'],
      district: ['sf1District', 'sf3District', 'sf8District'],
      division: ['sf1Division', 'sf3Division', 'sf8Division'],
      region: ['sf1Region', 'sf3Region', 'sf8Region']
    };
    const snapshot = {};
    Object.keys(fallbackMap).forEach(field => {
      let value = '';
      try { value = api && typeof api.get === 'function' ? text(api.get(field)).trim() : ''; } catch (_) { value = ''; }
      if (!value) {
        for (const id of fallbackMap[field]) {
          const el = $id(id);
          if (el && text(el.value).trim()) { value = text(el.value).trim(); break; }
        }
      }
      snapshot[field] = field === 'semester' ? getSemesterLabel(value) : value;
    });
    return snapshot;
  }

function clearClassScopedHeaderFields() {
  // Class Record local reset only. Do not call CTMSharedHeader.set/setMany here;
  // otherwise New Record would erase the shared SF1/SF2/SF3/SF8 header values.
  const payload = { schoolYear: '', gradeLevel: '', subjectGroup: '', subject: '' };
  const domMap = {
    schoolYear: ['crSchoolYear'],
    gradeLevel: ['crGradeLevel'],
    subjectGroup: ['crSubjectGroup'],
    subject: ['crSubject']
  };

  Object.keys(domMap).forEach(field => {
    domMap[field].forEach(id => {
      const el = $id(id);
      if (!el) return;
      if (el.value !== payload[field]) el.value = payload[field];
    });
  });

  Object.assign(state.recordHeader, {
    schoolYear: '',
    gradeLevel: '',
    keyStage: '',
    subject: '',
    subjectKey: '',
    subjectGroup: '',
    recordLabel: ''
  });
}

function applySharedHeaderData(payload, opts = {}) {
  if (!payload || typeof payload !== 'object') return false;

  const options = Object.assign({ forceEmptyOnly: false, rerender: false }, opts || {});
  const fieldMap = {
    schoolName: 'schoolName',
    schoolYear: 'schoolYear',
    gradeLevel: 'gradeLevel',
    section: 'section',
    semester: 'semester',
    teacherName: 'teacherName',
    schoolId: 'schoolId',
    district: 'district',
    division: 'division',
    region: 'region',
    g12Sy2026System: 'g12Sy2026System',
    modifiedTerm: 'modifiedTerm'
  };

  let changed = false;

  Object.keys(fieldMap).forEach(sharedKey => {
    if (!Object.prototype.hasOwnProperty.call(payload, sharedKey)) return;
    const recordKey = fieldMap[sharedKey];
    const incoming = text(payload[sharedKey]).trim();
    const current = text(state.recordHeader[recordKey]).trim();

    if (options.forceEmptyOnly && current && incoming) return;

    const nextValue = sharedKey === 'semester' ? getSemesterLabel(incoming) : (sharedKey === 'g12Sy2026System' ? normalizeG12Sy2026System(incoming) : (sharedKey === 'modifiedTerm' ? normalizeModifiedTerm(incoming) : incoming));
    if (current !== nextValue) {
      state.recordHeader[recordKey] = nextValue;
      changed = true;
    }
  });

  const nextKeyStage = getKeyStage(state.recordHeader.gradeLevel);
  if (state.recordHeader.keyStage !== nextKeyStage) {
    state.recordHeader.keyStage = nextKeyStage;
    changed = true;
  }

  if (options.rerender && changed) {
    recompute();
    render();
  }

  return changed;
}


function buildSharedHeaderPayloadFromRecordHeader(includeEmpty = true) {
  const header = state.recordHeader || {};
  const keys = ['schoolName', 'schoolYear', 'gradeLevel', 'section', 'semester', 'g12Sy2026System', 'modifiedTerm', 'teacherName', 'schoolId', 'district', 'division', 'region'];
  return keys.reduce((payload, key) => {
    if (!Object.prototype.hasOwnProperty.call(header, key)) return payload;
    const value = key === 'semester' ? getSemesterLabel(header[key]) : (key === 'g12Sy2026System' ? normalizeG12Sy2026System(header[key]) : (key === 'modifiedTerm' ? normalizeModifiedTerm(header[key]) : text(header[key]).trim()));
    if (includeEmpty || value) payload[key] = value;
    return payload;
  }, {});
}

function pushRecordHeaderToSharedSchoolForms(reason = 'class-record') {
  const payload = buildSharedHeaderPayloadFromRecordHeader(true);
  if (!Object.keys(payload).length) return;

  const sourceId = `cr-${reason || 'sync'}`;
  const api = getSharedHeaderApi();
  if (api && typeof api.setMany === 'function') {
    api.setMany(payload, sourceId);
    return;
  }

  // Fallback for standalone/offline testing if index.html's CTMSharedHeader API is not ready yet.
  const fallbackMap = {
    schoolName: ['crSchoolName', 'sf1SchoolName', 'sf2SchoolName', 'sf3SchoolName', 'sf8SchoolName'],
    schoolYear: ['crSchoolYear', 'sf1SchoolYear', 'sf2SchoolYear', 'sf3SchoolYear', 'sf8SchoolYear'],
    gradeLevel: ['crGradeLevel', 'sf1GradeLevel', 'sf2GradeLevel', 'sf3GradeLevel', 'sf8Grade'],
    section: ['crSection', 'sf1Section', 'sf2Section', 'sf3Section', 'sf8Section'],
    semester: ['crSemester', 'sf1Semester', 'sf3Semester'],
    g12Sy2026System: ['crG12Sy2026System', 'sf1G12Sy2026System', 'sf2G12Sy2026System', 'sf3G12Sy2026System', 'sf8G12Sy2026System'],
    modifiedTerm: ['crModifiedTerm', 'sf1ModifiedTerm', 'sf2ModifiedTerm', 'sf3ModifiedTerm', 'sf8ModifiedTerm'],
    teacherName: ['crTeacher', 'sf1Teacher', 'sf2Teacher', 'sf3Teacher'],
    schoolId: ['crSchoolId', 'sf1SchoolId', 'sf2SchoolId', 'sf3SchoolId', 'sf8SchoolId'],
    district: ['crDistrict', 'sf1District', 'sf3District', 'sf8District'],
    division: ['crDivision', 'sf1Division', 'sf3Division', 'sf8Division'],
    region: ['crRegion', 'sf1Region', 'sf3Region', 'sf8Region']
  };

  Object.keys(payload).forEach(field => {
    (fallbackMap[field] || []).forEach(id => {
      const el = $id(id);
      if (!el) return;
      const next = text(payload[field]);
      if (text(el.value) !== next) {
        el.value = next;
        try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch (_) {}
      }
    });
  });

  try {
    window.dispatchEvent(new CustomEvent('ctm:shared-header-sync-all', {
      detail: { sourceId, data: Object.assign({}, payload) }
    }));
  } catch (_) {}
}

  function transitionYearKey(sy) { const normalized = normalizeSchoolYearRange(sy); if (KS1_TRANSITION[normalized]) return normalized; const m = normalized.match(/^(\d{4})-(\d{4})$/); return m && Number(m[1]) >= 2028 ? '2028-2029+' : normalized; }
function getDescriptorProfile(id) { return id === 'table7' ? TABLE7 : id === 'table8' ? TABLE8 : id === 'table10' ? TABLE10 : TABLE11; }
function numericDescriptor(grade, tableId = 'table11') { const table = tableId === 'table10' ? TABLE10 : TABLE11; return table.find(r => grade >= r.min && grade <= r.max) || null; }
function numericDescriptorByCodeOrLabel(codeOrLabel, tableId = 'table11') {
  const key = tableId === 'table10' ? 'table10' : 'table11';
  const wanted = text(codeOrLabel).trim().toUpperCase();
  if (!wanted) return null;
  const table = key === 'table10' ? TABLE10 : TABLE11;
  return table.find(row => {
    const code = text(row && row.descriptorCode).trim().toUpperCase();
    const label = text(row && row.descriptorLabel).trim().toUpperCase();
    return wanted === code || wanted === label;
  }) || null;
}
function descriptorNarrativeFallback(desc, tableId) {
  if (!desc) return { generalDescription: '', instructionalResponse: '' };
  const key = tableId === 'table10' ? 'table10' : (tableId === 'table11' ? 'table11' : '');
  if (key === 'table11') return {
    generalDescription: text(desc.generalDescription || ''),
    instructionalResponse: text(desc.instructionalResponse || '')
  };
  if (key !== 'table10') return { generalDescription: '', instructionalResponse: '' };
  const label = text(desc.descriptorLabel || desc.descriptorCode).trim();
  const range = Number.isFinite(Number(desc.min)) && Number.isFinite(Number(desc.max)) ? `${desc.min}-${desc.max}` : '';
  const code = text(desc.descriptorCode).trim().toUpperCase();
  const generalMap = {
    O: 'Performance is Outstanding and consistently exceeds the expected standard for the grading period.',
    VS: 'Performance is Very Satisfactory and consistently meets the expected standard for the grading period.',
    S: 'Performance is Satisfactory and meets the expected standard for the grading period.',
    FS: 'Performance is Fairly Satisfactory and meets the minimum expected standard for the grading period.',
    DNME: 'Performance Did Not Meet Expectations and needs additional support to reach the expected standard.'
  };
  const responseMap = {
    O: 'Provide enrichment, extension, and leadership opportunities to sustain advanced performance.',
    VS: 'Sustain performance through continued practice, deeper application, and independent work.',
    S: 'Provide guided practice and feedback to strengthen consistency and mastery.',
    FS: 'Provide focused reinforcement and monitoring to improve accuracy and confidence.',
    DNME: 'Provide remediation, intervention, and close monitoring until the minimum standard is met.'
  };
  return {
    generalDescription: generalMap[code] || (label ? `${label}${range ? ` (${range})` : ''}.` : ''),
    instructionalResponse: responseMap[code] || ''
  };
}
function applyNumericDescriptorFields(target, desc, tableId, gradeValue) {
  if (!target || !desc) return target;
  const support = descriptorNarrativeFallback(desc, tableId);
  target.tableUsed = tableId || target.tableUsed || '';
  target.letterGrade = desc.descriptorCode || '';
  target.descriptorCode = desc.descriptorCode || '';
  target.descriptorLabel = `${desc.descriptorLabel || desc.descriptorCode || ''}`;
  target.generalDescription = support.generalDescription || '';
  target.instructionalResponse = support.instructionalResponse || '';
  const n = num(gradeValue);
  target.remarks = text(desc.remarks || (n != null ? (n >= PASSING_GRADE ? 'Passed' : 'Failed') : target.remarks || ''));
  return target;
}
function ensureDescriptorFieldsForDisplay(result, tableId) {
  const key = tableId || (result && result.tableUsed) || '';
  if (!result || !isNumericTable(key)) return result || {};
  const grade = num(result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade);
  const desc = grade != null ? numericDescriptor(grade, key) : numericDescriptorByCodeOrLabel(result.descriptorCode || result.letterGrade || result.descriptorLabel, key);
  if (!desc) return result;
  const out = Object.assign({}, result);
  return applyNumericDescriptorFields(out, desc, key, grade != null ? grade : out.termGrade);
}
function transmute(initial, options = {}) { const table = options && options.table === 'do8' ? DO8_APPENDIX_B_TRANSMUTATION_TABLE : NUMERIC_TRANSMUTATION_TABLE; for (const row of table) if (initial >= row[0] && initial <= row[1]) return row[2]; return roundWhole(initial); }
function descriptiveInstruction(code) { return ({ A:'Provide enrichment opportunities and deeper application tasks.', B:'Sustain grade-level work and increase independence.', C:'Provide guided practice to strengthen confidence and consistency.', D:'Provide targeted support and regular practice.', E:'Provide intensive support and close guidance.' })[code] || ''; }
function usesDescriptiveNoNumeric(setup) { return !!(setup && (setup.resultTableResolved === 'table7' || setup.resultTableResolved === 'table8')); }
function isNumericTable(tableId) { return tableId === 'table11' || tableId === 'table10'; }
function isLegacyGrade12Term(term, gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { return isLegacyGrade12Do8(text(gradeLevel).trim(), text(schoolYear).trim()) && !!(term && (term.applicableTable === 'table10' || num(term.assessmentConfig && term.assessmentConfig.qaCount) > 0)); }
function getScoreFieldsForTerm(term, gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { if (isCustomInstitutionalMode()) return CUSTOM_SCORE_FIELDS; return isLegacyGrade12Term(term, gradeLevel, schoolYear) ? LEGACY_G12_SCORE_FIELDS : SCORE_FIELDS.filter(f => f.key !== 'qa1' && f.key !== 'pt4' && f.key !== 'pt5'); }
function cloneScoreStructWithCompat(source, legacyMode) { const out = blankScores(); const raw = source || {}; ['ww','pt','ex'].forEach(group => { const src = raw[group] || {}; Object.keys(out[group]).forEach(key => { const v = num(src[key]); out[group][key] = v == null ? null : v; }); }); if (legacyMode && out.ex.qa1 == null) out.ex.qa1 = num((raw.ex || {}).te) ?? num((raw.ex || {}).st2) ?? num((raw.ex || {}).st1); if (isCustomInstitutionalMode() && out.ex.te1 == null) out.ex.te1 = num((raw.ex || {}).te); return out; }
function cloneHpsStructWithCompat(source, legacyMode) { const out = blankHps(); const raw = source || {}; ['ww','pt','ex'].forEach(group => { const src = raw[group] || {}; Object.keys(out[group]).forEach(key => { const v = num(src[key]); out[group][key] = v == null ? null : v; }); }); if (legacyMode && out.ex.qa1 == null) out.ex.qa1 = num((raw.ex || {}).te) ?? num((raw.ex || {}).st2) ?? num((raw.ex || {}).st1); if (isCustomInstitutionalMode() && out.ex.te1 == null) out.ex.te1 = num((raw.ex || {}).te); return out; }
function concatNotesForVisibleTerms(rowsByKey, getter) { const visibleTerms = getVisibleTerms(); return visibleTerms.map(k => { const value = text(getter(rowsByKey[k])); return value ? `${getTermLabel(k)}: ${value}` : ''; }).filter(Boolean).join(' | '); }
  function transitionLabelFor(rule, gradeLevel, schoolYear) {
    if (!rule) return `${gradeLevel || '—'} • ${schoolYear || '—'}`;
    if (gradeLevel === 'Kindergarten') return 'Kindergarten • Descriptive (Table 7)';
    const bits = ['Table 12'];
    if (gradeLevel) bits.push(gradeLevel);
    if (schoolYear) bits.push(schoolYear);
    if (rule.table === 'table8') bits.push('Descriptive');
    else if (rule.numericMode === 'adjusted-transmutation') bits.push('Numerical (adjusted transmutation)');
    else if (rule.numericMode === 'zero-based') bits.push('Numerical (zero-based)');
    return bits.join(' • ');
  }

function normalizeGradingFramework(v) { return text(v).trim() === 'customInstitutional' ? 'customInstitutional' : 'officialDepEd'; }
function isCustomInstitutionalMode(header = state.recordHeader) { return normalizeGradingFramework(header && header.gradingFramework) === 'customInstitutional'; }
function resetCustomInstitutionalStateForOfficialDepEd() {
  hideSubjectGroupContextNote();
  // Framework switch guard: Custom Institutional state must not keep controlling
  // Official DepEd tabs, term labels, final computation, or Summary columns.
  const header = state.recordHeader || (state.recordHeader = defaultRecordHeader());
  header.gradingFramework = 'officialDepEd';
  header.customPolicyEnabled = false;
  header.customAcademicStructure = 'trimesterContinuous';
  header.customActiveTerm = 'term1';
  header.customSelectedTerms = ['term1', 'term2', 'term3'];
  header.customFinalRule = 'averageVisibleTerms';
  header.customDescriptorSource = 'do8-2015';
  header.gradeConversionMethod = 'zeroBased';
  header.transmutationTableKey = 'none';
  if (state.setupProfile) {
    state.setupProfile.customPolicyEnabled = false;
    state.setupProfile.gradeConversionMethod = 'zeroBased';
    state.setupProfile.transmutationTableKey = 'none';
    state.setupProfile.customAcademicStructure = 'trimesterContinuous';
    state.setupProfile.customFinalRule = 'averageVisibleTerms';
    state.setupProfile.customDescriptorSource = 'do8-2015';
    state.setupProfile.customComponents = defaultCustomComponents();
  }
}

function normalizeCustomAcademicStructure(v) { return ['semester','trimesterContinuous','modifiedTrimester','quarterlyYearRound'].includes(text(v).trim()) ? text(v).trim() : 'trimesterContinuous'; }
function normalizeCustomDescriptorSource(v) { return text(v).trim() === 'do015-2026' ? 'do015-2026' : 'do8-2015'; }
function getCustomDescriptorSourceLabel(source) { return normalizeCustomDescriptorSource(source) === 'do015-2026' ? 'DO No. 015, s. 2026 descriptors (Table 11)' : 'DO No. 8, s. 2015 descriptors (Table 10)'; }
function getCustomDescriptorTable(source) { return normalizeCustomDescriptorSource(source) === 'do015-2026' ? 'table11' : 'table10'; }
function normalizeG12DescriptorSource(v) { return normalizeCustomDescriptorSource(v); }
function getG12DescriptorSourceLabel(source) { return getCustomDescriptorSourceLabel(source); }
function getG12DescriptorTable(source) { return getCustomDescriptorTable(source); }
function getCustomAcademicStructureLabel(structure) {
  const s = normalizeCustomAcademicStructure(structure);
  return ({ semester: 'Semester', trimesterContinuous: 'Three Term', modifiedTrimester: 'Modified Three Term', quarterlyYearRound: 'Quarterly' })[s] || 'Three Term';
}
function isCustomQuarterlyYearRoundStructure(header = state.recordHeader) {
  return isCustomInstitutionalMode(header) && normalizeCustomAcademicStructure(header && header.customAcademicStructure) === 'quarterlyYearRound';
}
function normalizeTermKey(v) { return ['term1','term2','term3','term4'].includes(text(v).trim()) ? text(v).trim() : 'term1'; }
function customTermPoolForStructure(structure = state.recordHeader && state.recordHeader.customAcademicStructure) { const s = normalizeCustomAcademicStructure(structure); return (s === 'semester' || s === 'quarterlyYearRound') ? ['term1','term2','term3','term4'] : ['term1','term2','term3']; }
function isCustomSemesterStructure(header = state.recordHeader) { return isCustomInstitutionalMode(header) && normalizeCustomAcademicStructure(header && header.customAcademicStructure) === 'semester'; }
function getCustomTermLabel(termKey, structure = state.recordHeader && state.recordHeader.customAcademicStructure) { const s = normalizeCustomAcademicStructure(structure); return (s === 'semester' || s === 'quarterlyYearRound') ? (CUSTOM_QUARTER_LABELS[termKey] || termKey) : (TERM_LABELS[termKey] || termKey); }
function normalizeCustomSelectedTerms(value, structure = state.recordHeader && state.recordHeader.customAcademicStructure, fallbackTerm = state.recordHeader && state.recordHeader.customActiveTerm) {
  const s = normalizeCustomAcademicStructure(structure);
  const allowed = customTermPoolForStructure(s);
  const raw = Array.isArray(value) ? value : text(value).split(/[|,;\s]+/);
  const selected = [];
  raw.forEach(item => { const key = normalizeTermKey(item); if (allowed.includes(key) && !selected.includes(key)) selected.push(key); });
  if (!selected.length) {
    const fallback = normalizeTermKey(fallbackTerm);
    if (allowed.includes(fallback)) selected.push(fallback);
  }
  if (!selected.length) selected.push(allowed[0] || 'term1');
  return selected;
}
function customSelectableTermsForStructure(structure = state.recordHeader && state.recordHeader.customAcademicStructure) {
  const s = normalizeCustomAcademicStructure(structure);
  if (s === 'semester') return getLegacySemesterTerms(getSemesterLabel(state.recordHeader && state.recordHeader.semester) || 'First Semester');
  return customTermPoolForStructure(s);
}
function getEffectiveCustomSummaryTerms(structure = state.recordHeader && state.recordHeader.customAcademicStructure) {
  const s = normalizeCustomAcademicStructure(structure);
  const selectable = customSelectableTermsForStructure(s);
  if (s === 'quarterlyYearRound') return selectable.slice();
  const selected = normalizeCustomSelectedTerms(state.recordHeader && state.recordHeader.customSelectedTerms, s, state.recordHeader && state.recordHeader.customActiveTerm);
  const filtered = selected.filter(termKey => selectable.includes(termKey));
  return filtered.length ? filtered : selectable.slice();
}
function normalizeCustomFinalRule(v, structure) { const st = normalizeCustomAcademicStructure(structure); const s = text(v).trim(); if (['averageVisibleTerms','averageSelectedTerms','selectedTermOnly'].includes(s)) return s; if (st === 'modifiedTrimester') return 'selectedTermOnly'; if (st === 'quarterlyYearRound') return 'averageSelectedTerms'; return 'averageVisibleTerms'; }
function normalizeGradeConversionMethod(v) { return text(v).trim() === 'transmutation' ? 'transmutation' : 'zeroBased'; }
function normalizeTransmutationTableKey(v, method) { const k = text(v).trim(); if (normalizeGradeConversionMethod(method) !== 'transmutation') return 'none'; return TRANSMUTATION_TABLE_REGISTRY[k] && k !== 'none' ? k : 'deped-do015-2026-adjusted'; }
function defaultCustomComponents() { return clone(defaultSetupProfile().customComponents); }
function normalizeCustomComponents(source) { const def = defaultCustomComponents(), out = clone(def), src = source || {}, max = { ww:5, pt:5, st:2, te:2, qe:2 }; Object.keys(out).forEach(k => { const item = src[k] || {}; out[k] = { count: Math.min(max[k], Math.max(0, Math.round(num(item.count) == null ? out[k].count : Number(item.count)))), weight: Math.max(0, Number(num(item.weight) == null ? out[k].weight : Number(item.weight))) }; }); return out; }
function validateCustomPolicy(setup) { const c = normalizeCustomComponents(setup && setup.customComponents); const total = round2(Object.keys(c).reduce((s,k)=>s+Number(c[k].weight||0),0)); const notes=[]; if (total !== 100) notes.push(`Custom component weights total ${total}%. Total must equal 100%.`); Object.keys(c).forEach(k=>{ const L=k.toUpperCase(); if(c[k].count===0&&Number(c[k].weight)>0) notes.push(`${L} has weight but count is 0.`); if(c[k].count>0&&Number(c[k].weight)===0) notes.push(`${L} has count but 0% weight (allowed).`); }); return { valid: notes.filter(n=>!/allowed/.test(n)).length===0, notes, total }; }
function getTransmutationRegistryEntry(key) { return TRANSMUTATION_TABLE_REGISTRY[key] || TRANSMUTATION_TABLE_REGISTRY.none; }
function transmuteWithRegistry(initial, key) { const entry = getTransmutationRegistryEntry(key), table = entry && entry.table; if (!table) return round2(initial); for (const row of table) if (initial >= row[0] && initial <= row[1]) return row[2]; return roundWhole(initial); }
function getScoreFieldDefinition(fieldKey) { return CUSTOM_SCORE_FIELDS.find(f=>f.key===fieldKey) || SCORE_FIELDS.find(f=>f.key===fieldKey) || LEGACY_G12_SCORE_FIELDS.find(f=>f.key===fieldKey) || null; }
function customNumericDescriptor(grade, tableId = getCustomDescriptorTable(state.recordHeader && state.recordHeader.customDescriptorSource)) { const g=Number(grade); const key=tableId==='table11'?'table11':'table10'; if(!Number.isFinite(g)) return null; const table=key==='table11'?TABLE11:TABLE10; return table.find(r=>g>=r.min&&g<=r.max) || table[table.length-1] || null; }
function customTermKeysForFinal() { const h=state.recordHeader||{}, structure=normalizeCustomAcademicStructure(h.customAcademicStructure); const selected=getEffectiveCustomSummaryTerms(structure), active=selected.includes(normalizeModifiedTerm(h.customActiveTerm)) ? normalizeModifiedTerm(h.customActiveTerm) : (selected[0] || 'term1'), visible=getVisibleTerms(), rule=normalizeCustomFinalRule(h.customFinalRule, structure); if(rule==='selectedTermOnly') return [active]; if(rule==='averageSelectedTerms') return selected; return visible; }
function clearLearnerTermEntry(row, term) {
  if (!row) return;
  row.scores = blankScores();
  row.computed = Object.assign(defaultComputed(), row.computed || {}, {
    letterGrade: '',
    descriptorCode: '',
    descriptorLabel: '',
    generalDescription: '',
    instructionalResponse: '',
    remarks: '',
    teacherNotes: '',
    interventionNotes: '',
    termGrade: '',
    initialGrade: null,
    transmutedGrade: null,
    finalDisplayedNumeric: null,
    interventionFlag: false
  });
  if (term) computeLearnerTerm(row, term);
}
function isLegacyGrade12Do8(gradeLevel, schoolYear) { return text(gradeLevel).trim() === 'Grade 12' && normalizeSchoolYearRange(schoolYear) === '2026-2027'; }
function isOfficialDepEdG12Sy2026NoContinuity(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
  // v18.30 compatibility shim retained for older saved records/code paths.
  // The previous v18.29 guard forced every Official DepEd G12 SY 2026-2027
  // record to Term 1 only. That broke Quarter/Semester and Three Term after
  // viewing Modified Three Term. Official tab/summary visibility is now driven
  // by the selected G12 grading system in getVisibleTerms().
  return false;
}
  const G12_SY2026_SYSTEMS = {
    quarterSemester: 'Quarter / Semester',
    threeTerm: 'Three Term',
    modifiedThreeTerm: 'Modified Three Term'
  };
  function normalizeG12Sy2026System(v) {
    const s = text(v).trim();
    if (s === 'threeTerm' || /three\s*term/i.test(s) && !/modified/i.test(s)) return 'threeTerm';
    if (s === 'modifiedThreeTerm' || /modified/i.test(s)) return 'modifiedThreeTerm';
    return 'quarterSemester';
  }
  function getG12Sy2026System(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    return isLegacyGrade12Do8(gradeLevel, schoolYear) ? normalizeG12Sy2026System(state.recordHeader && state.recordHeader.g12Sy2026System) : '';
  }
  function normalizeModifiedTerm(v) { return ['term1','term2','term3','term4'].includes(text(v).trim()) ? text(v).trim() : 'term1'; }
  function isLegacyGrade12SemesterLayout(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { return isLegacyGrade12Do8(gradeLevel, schoolYear) && getG12Sy2026System(gradeLevel, schoolYear) === 'quarterSemester'; }
  function isG12ThreeTermLayout(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { return isLegacyGrade12Do8(gradeLevel, schoolYear) && getG12Sy2026System(gradeLevel, schoolYear) === 'threeTerm'; }
  function isG12ModifiedThreeTermLayout(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { return isLegacyGrade12Do8(gradeLevel, schoolYear) && getG12Sy2026System(gradeLevel, schoolYear) === 'modifiedThreeTerm'; }
  function normalizeSemesterLabel(v) { const s = text(v).trim().toLowerCase(); if (s === '1st' || s === 'first' || s === 'first semester') return 'First Semester'; if (s === '2nd' || s === 'second' || s === 'second semester') return 'Second Semester'; return ''; }
  function getSemesterLabel(semester = state.recordHeader && state.recordHeader.semester) { return normalizeSemesterLabel(semester); }
  function getLegacySemesterTerms(semester = state.recordHeader && state.recordHeader.semester) { return getSemesterLabel(semester) === 'Second Semester' ? ['term3', 'term4'] : ['term1', 'term2']; }
  function getVisibleTerms(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear, system = state.recordHeader && state.recordHeader.g12Sy2026System) {
    if (isCustomInstitutionalMode()) {
      const s = normalizeCustomAcademicStructure(state.recordHeader && state.recordHeader.customAcademicStructure);
      if (s === 'semester' || s === 'quarterlyYearRound' || s === 'modifiedTrimester' || s === 'trimesterContinuous') return getEffectiveCustomSummaryTerms(s);
    }
    // Official DepEd Grade 12 SY 2026-2027 visibility must follow the selected
    // G12 Grading System and must not inherit a previous Modified Three Term state.
    if (isLegacyGrade12Do8(gradeLevel, schoolYear)) {
      const selectedSystem = normalizeG12Sy2026System(system || (state.recordHeader && state.recordHeader.g12Sy2026System));
      if (selectedSystem === 'quarterSemester') return getLegacySemesterTerms(state.recordHeader && state.recordHeader.semester);
      if (selectedSystem === 'threeTerm') return ['term1','term2','term3'];
      if (selectedSystem === 'modifiedThreeTerm') return [normalizeModifiedTerm(state.recordHeader && state.recordHeader.modifiedTerm)];
    }
    // Other Official DepEd contexts remain under the existing three-term calendar behavior.
    return ['term1','term2','term3'];
  }
  function getTermLabel(termKey, gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    if (isCustomInstitutionalMode()) return getCustomTermLabel(termKey, state.recordHeader && state.recordHeader.customAcademicStructure);
    if (isLegacyGrade12SemesterLayout(gradeLevel, schoolYear)) return LEGACY_G12_TERM_LABELS[termKey] || TERM_LABELS[termKey] || termKey;
    // Official DepEd must use period labels only. Do not prefix with "Modified" and do not use the Subject text.
    return TERM_LABELS[termKey] || termKey;
  }
  function getModifiedSubjectTabLabel(termKey) {
    // Backward-compatible function name retained, but the label is now period-only.
    // Previous behavior returned the encoded Subject, causing all modified term tabs and summary columns to show the subject name.
    return TERM_LABELS[termKey] || termKey;
  }
  function getSubjectAchievementMeterTitle(fallbackLabel = 'Subject') { const subject = text(state.recordHeader && state.recordHeader.subject).trim(); return subject || fallbackLabel || 'Subject'; }
  function getAttendanceTermLabel(termKey) { return getTermLabel(termKey); }
  function getSummaryTermColumnLabel(termKey) { return getTermLabel(termKey); }
  function currentG12SystemLabel() { const key = getG12Sy2026System(); return G12_SY2026_SYSTEMS[key] || ''; }
  function resolveSubjectGroupMode(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) { const grade = text(gradeLevel).trim(); if (isLegacyGrade12Do8(grade, schoolYear)) return 'legacyG12'; if (/^Grade\s+(11|12)$/.test(grade)) return 'shs'; return 'basic'; }
  function getGradeAwareSubjectGroups(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
  const grade = text(gradeLevel).trim();
  const config = GRADE_AWARE_SUBJECT_GROUP_OPTIONS[grade];
  if (!config) return null;
  if (Array.isArray(config)) return config.slice();
  const normalizedSchoolYear = normalizeSchoolYearRange(schoolYear);
  const yearKey = normalizedSchoolYear ? transitionYearKey(normalizedSchoolYear) : '';
  if (!yearKey) return [];
  return (config[yearKey] || config.default || []).slice();
}
  function isKs1DescriptiveContext(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    const grade = text(gradeLevel).trim();
    if (!/^Grade\s+[1-3]$/.test(grade)) return false;
    const normalizedSchoolYear = normalizeSchoolYearRange(schoolYear);
    const yearKey = normalizedSchoolYear ? transitionYearKey(normalizedSchoolYear) : '';
    const rule = (KS1_TRANSITION[yearKey] || {})[grade] || null;
    return !!(rule && rule.table === 'table8');
}
function isKinderContext(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel) { return text(gradeLevel).trim() === 'Kindergarten'; }
function shouldHideTermInstructionalResponse(termKey, gradeLevel = state.recordHeader && state.recordHeader.gradeLevel) { return isKinderContext(gradeLevel) && ['term1', 'term2', 'term3'].includes(text(termKey).trim()); }
function shouldHideFinalKinderUnusedColumns(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel) { return isKinderContext(gradeLevel); }
function shouldHideSummaryRemarksForDescriptiveGrading(finalSummary) { return !isLegacyGrade12SemesterLayout() && !['table10', 'table11'].includes(text(finalSummary && finalSummary.applicableTable)); }
  function coerceSubjectGroupForContext(value, gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    const allowedList = getAllowedSubjectGroups(gradeLevel, schoolYear);
    const current = text(value).trim();
    if (current && allowedList.includes(current)) return current;
    if (allowedList.length === 1) return allowedList[0];
    return '';
}
  function getAllowedSubjectGroups(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    const grade = text(gradeLevel).trim();
    const gradeAware = getGradeAwareSubjectGroups(gradeLevel, schoolYear);
    if (gradeAware) return gradeAware;
    return SUBJECT_GROUP_OPTIONS_BY_MODE[resolveSubjectGroupMode(gradeLevel, schoolYear)] || SUBJECT_GROUP_OPTIONS_BY_MODE.basic;
  }
  function uniqueSubjectGroups(list) {
    const out = [];
    (Array.isArray(list) ? list : []).forEach(item => {
      const value = text(item).trim();
      if (value && !out.includes(value)) out.push(value);
    });
    return out;
  }
  function flattenGradeAwareSubjectGroups() {
    const out = [];
    Object.keys(GRADE_AWARE_SUBJECT_GROUP_OPTIONS || {}).forEach(grade => {
      const cfg = GRADE_AWARE_SUBJECT_GROUP_OPTIONS[grade];
      if (Array.isArray(cfg)) out.push(...cfg);
      else if (cfg && typeof cfg === 'object') Object.keys(cfg).forEach(key => out.push(...(Array.isArray(cfg[key]) ? cfg[key] : [])));
    });
    return uniqueSubjectGroups(out);
  }
  function getCustomInstitutionalAllSubjectGroups(currentValue = '') {
    return uniqueSubjectGroups([
      ...flattenGradeAwareSubjectGroups(),
      ...(SUBJECT_GROUP_OPTIONS_BY_MODE.basic || []),
      ...(SUBJECT_GROUP_OPTIONS_BY_MODE.shs || []),
      ...(SUBJECT_GROUP_OPTIONS_BY_MODE.legacyG12 || []),
      text(currentValue).trim()
    ]);
  }
  function getCustomRecommendedSubjectGroups(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    const grade = text(gradeLevel).trim();
    const sy = normalizeSchoolYearRange(schoolYear);
    if (!grade) return [];
    const gradeAware = getGradeAwareSubjectGroups(grade, sy || schoolYear);
    if (gradeAware && gradeAware.length) return uniqueSubjectGroups(gradeAware);
    if ((grade === 'Grade 1' || grade === 'Grade 2' || grade === 'Grade 3') && gradeAware && !gradeAware.length) {
      const cfg = GRADE_AWARE_SUBJECT_GROUP_OPTIONS[grade];
      return uniqueSubjectGroups((cfg && cfg.default) || []);
    }
    if (/^Grade\s+[4-9]$/.test(grade) || grade === 'Grade 10') return uniqueSubjectGroups(SUBJECT_GROUP_OPTIONS_BY_MODE.basic || []);
    if (/^Grade\s+(11|12)$/.test(grade)) {
      const recommended = [...(SUBJECT_GROUP_OPTIONS_BY_MODE.shs || [])];
      if (isLegacyGrade12Do8(grade, sy || schoolYear)) recommended.push(...(SUBJECT_GROUP_OPTIONS_BY_MODE.legacyG12 || []));
      return uniqueSubjectGroups(recommended);
    }
    return [];
  }
  function customSubjectGroupRecommendationLabel(gradeLevel = state.recordHeader && state.recordHeader.gradeLevel, schoolYear = state.recordHeader && state.recordHeader.schoolYear) {
    const grade = text(gradeLevel).trim();
    const ks = getKeyStage(grade);
    const sy = normalizeSchoolYearRange(schoolYear);
    if (!grade) return 'Recommended after selecting Grade / Key Stage';
    const extra = isLegacyGrade12Do8(grade, sy || schoolYear) ? ' • includes legacy G12 SY 2026-2027 choices' : '';
    return `Recommended for ${grade}${ks ? ' / ' + ks : ''}${extra}`;
  }
  function getOrCreateSubjectGroupHelper(select) {
    if (!select || !select.parentElement) return null;
    let helper = $id('crSubjectGroupContextNote');
    if (!helper) {
      helper = document.createElement('div');
      helper.id = 'crSubjectGroupContextNote';
      helper.className = 'ctm-cr-small ctm-cr-subject-group-context-note';
      helper.setAttribute('aria-live', 'polite');
      select.insertAdjacentElement('afterend', helper);
    }
    return helper;
  }
  function hideSubjectGroupContextNote() {
    const helper = $id('crSubjectGroupContextNote');
    if (!helper) return;
    helper.textContent = '';
    helper.style.display = 'none';
    helper.setAttribute('hidden', 'hidden');
    helper.setAttribute('aria-hidden', 'true');
  }
  function rebuildSubjectGroupSelect(select, groups, selectedValue) {
    if (!select) return;
    const selected = text(selectedValue).trim();
    const makeOption = (value, label) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label || value;
      return opt;
    };
    const addGroup = (label, items) => {
      const clean = uniqueSubjectGroups(items);
      if (!clean.length) return;
      const og = document.createElement('optgroup');
      og.label = label;
      clean.forEach(value => og.appendChild(makeOption(value)));
      select.appendChild(og);
    };
    select.innerHTML = '';
    select.appendChild(makeOption('', 'Select Subject Group / Template'));
    (Array.isArray(groups) ? groups : []).forEach(group => addGroup(group.label, group.items));
    const values = Array.from(select.options || []).map(opt => text(opt.value).trim());
    if (selected && !values.includes(selected)) addGroup('Current Saved Value', [selected]);
    select.value = selected && Array.from(select.options || []).some(opt => opt.value === selected) ? selected : '';
  }
  function applyCustomInstitutionalSubjectGroupOptions(select) {
    if (!select) return;
    const current = text(select.value || state.recordHeader.subjectGroup).trim();
    const recommended = getCustomRecommendedSubjectGroups(state.recordHeader.gradeLevel, state.recordHeader.schoolYear);
    const all = getCustomInstitutionalAllSubjectGroups(current);
    const recommendedSet = new Set(recommended);
    const other = all.filter(value => !recommendedSet.has(value));
    const grade = text(state.recordHeader.gradeLevel).trim();
    const groups = grade ? [
      { label: customSubjectGroupRecommendationLabel(state.recordHeader.gradeLevel, state.recordHeader.schoolYear), items: recommended },
      { label: 'Other Custom Institutional Groups', items: other }
    ] : [
      { label: 'KS1 / Early Grades Templates', items: flattenGradeAwareSubjectGroups() },
      { label: 'KS2–KS3 / Grades 4–10 Templates', items: SUBJECT_GROUP_OPTIONS_BY_MODE.basic || [] },
      { label: 'KS4 / SHS Templates', items: SUBJECT_GROUP_OPTIONS_BY_MODE.shs || [] },
      { label: 'Legacy Grade 12 SY 2026-2027 Templates', items: SUBJECT_GROUP_OPTIONS_BY_MODE.legacyG12 || [] }
    ];
    rebuildSubjectGroupSelect(select, groups, current);
    Array.from(select.options || []).forEach(opt => { opt.hidden = false; opt.disabled = false; });
    const helper = getOrCreateSubjectGroupHelper(select);
    if (helper) {
      helper.removeAttribute('hidden');
      helper.setAttribute('aria-hidden', 'false');
      helper.style.display = 'block';
      const selected = text(select.value).trim();
      const status = selected && recommendedSet.size
        ? (recommendedSet.has(selected) ? 'Recommended for the selected Grade / Key Stage.' : 'Outside the usual Grade / KS recommendation, but allowed under Custom Institutional mode.')
        : 'Select a Grade Level to get recommendation grouping; all custom-compatible groups remain available.';
      helper.textContent = `Custom Institutional: Subject Group is grade/KS-aware for guidance only. ${status}`;
    }
  }
  function resolveLegacyGrade12Profile(subjectGroup) {
    const exact = LEGACY_G12_DO8_2015_PROFILES[subjectGroup];
    if (exact) return { profile: exact, exact: true, selectedKey: subjectGroup, advisory: '' };
    const fallbackMap = {
      'SHS Core / Other SHS Academic Electives': 'SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects',
      'SHS Research Electives / Design & Innovation': 'SHS Grade 12 (DO 8, s. 2015) Academic Track Work Immersion / Research / Business Enterprise Simulation / Exhibit / Performance',
      'SHS Arts / Sports / Health / Wellness': 'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects',
      'SHS TechPro Electives': 'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects',
      'SHS Work Immersion': 'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance',
      'SHS Field Exposure / Arts Apprenticeship / Creative Production': 'SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance'
    };
    const mappedKey = fallbackMap[subjectGroup] || 'SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects';
    return { profile: LEGACY_G12_DO8_2015_PROFILES[mappedKey], exact: false, selectedKey: mappedKey, advisory: 'For Grade 12 in SY 2026-2027, select one of the legacy DO No. 8, s. 2015 subject-group options for exact weights.' };
  }

function resolvePolicy() {
  const h = state.recordHeader;
  const gradeLevel = text(h.gradeLevel).trim();
  const schoolYear = text(h.schoolYear).trim();
  const normalizedSchoolYear = normalizeSchoolYearRange(schoolYear);
  const subjectGroup = text(h.subjectGroup).trim();
  const legacyGrade12 = isLegacyGrade12Do8(gradeLevel, normalizedSchoolYear || schoolYear);
  const legacyProfileInfo = legacyGrade12 ? resolveLegacyGrade12Profile(subjectGroup) : null;
  const profile = legacyGrade12 ? legacyProfileInfo.profile : (SUBJECT_PROFILES[subjectGroup] || SUBJECT_PROFILES['AP / English / Filipino / Mathematics / Science / GMRC / Values']);
  const setup = defaultSetupProfile();
  setup.profileKey = slugify(subjectGroup || (legacyProfileInfo && legacyProfileInfo.selectedKey) || '');
  setup.profileName = profile.profileName;
  setup.componentWeights = clone(profile.weights);
  setup.assessmentCounts = Object.assign({ wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 }, clone(profile.assessmentCounts || {}));

  if (isCustomInstitutionalMode(h)) {
    const prev = state.setupProfile || {}; const components = normalizeCustomComponents(prev.customComponents || defaultCustomComponents()); const conversion = normalizeGradeConversionMethod(h.gradeConversionMethod || prev.gradeConversionMethod); const tableKey = normalizeTransmutationTableKey(h.transmutationTableKey || prev.transmutationTableKey, conversion);
    h.customPolicyEnabled = true; h.customAcademicStructure = normalizeCustomAcademicStructure(h.customAcademicStructure); if (h.customAcademicStructure === 'semester') h.semester = getSemesterLabel(h.semester) || 'First Semester'; else if (!isLegacyGrade12SemesterLayout(gradeLevel, normalizedSchoolYear || schoolYear)) h.semester = ''; h.customActiveTerm = normalizeTermKey(h.customActiveTerm); h.customSelectedTerms = normalizeCustomSelectedTerms(h.customSelectedTerms, h.customAcademicStructure, h.customActiveTerm); if (!h.customSelectedTerms.includes(h.customActiveTerm)) h.customActiveTerm = h.customSelectedTerms[0] || 'term1'; h.customFinalRule = normalizeCustomFinalRule(h.customFinalRule, h.customAcademicStructure); h.customDescriptorSource = normalizeCustomDescriptorSource(h.customDescriptorSource); if (h.customAcademicStructure === 'quarterlyYearRound') { h.customSelectedTerms = ['term1','term2','term3','term4']; h.customFinalRule = 'averageSelectedTerms'; } h.gradeConversionMethod = conversion; h.transmutationTableKey = tableKey;
    setup.profileKey='custom-institutional'; setup.profileName='Custom Institutional'; setup.customPolicyEnabled=true; setup.customComponents=components; setup.customAcademicStructure=h.customAcademicStructure; setup.customFinalRule=h.customFinalRule; setup.customDescriptorSource=h.customDescriptorSource; setup.gradeConversionMethod=conversion; setup.transmutationTableKey=tableKey;
    setup.componentWeights={ ww:components.ww.weight/100, pt:components.pt.weight/100, ex:(components.st.weight+components.te.weight+components.qe.weight)/100 }; setup.assessmentCounts={ wwCount:components.ww.count, ptCount:components.pt.count, stCount:components.st.count, hasTE:components.te.count>0, qaCount:0, teCount:components.te.count, qeCount:components.qe.count };
    const descriptorTable=getCustomDescriptorTable(h.customDescriptorSource); setup.gradingModeResolved='numeric-custom-institutional'; setup.resultTableResolved=descriptorTable; setup.transitionRuleResolved={ schoolYear:normalizedSchoolYear||schoolYear, gradeLevel, table:descriptorTable, gradingMode:setup.gradingModeResolved, numericMode:conversion==='transmutation'?tableKey:'zero-based', transitionLabel:`Custom Institutional • ${getCustomAcademicStructureLabel(h.customAcademicStructure)} • ${getCustomDescriptorSourceLabel(h.customDescriptorSource)} • ${conversion==='transmutation'?getTransmutationRegistryEntry(tableKey).label:'Zero Based Direct Computation'}`}; setup.usesTransmutation=conversion==='transmutation'; setup.usesZeroBased=conversion!=='transmutation'; setup.usesDescriptors=true; const v=validateCustomPolicy(setup); setup.validationNotes=v.notes.length?v.notes:['Custom setup valid. Total weight: 100%.']; const recommendedCustomGroups=getCustomRecommendedSubjectGroups(gradeLevel, normalizedSchoolYear||schoolYear); if (subjectGroup) setup.validationNotes.push(recommendedCustomGroups.includes(subjectGroup)?'Subject Group / Custom Template is recommended for the selected Grade / Key Stage.':'Subject Group / Custom Template is outside the usual Grade / Key Stage recommendation, but allowed because Custom Institutional mode is advisory/flexible.'); else setup.validationNotes.push('Select a Subject Group / Custom Template; recommendations are based on Grade / Key Stage but not enforced in Custom Institutional mode.'); return setup;
  }

  if (gradeLevel === 'Kindergarten') {
    setup.gradingModeResolved = 'kindergarten-descriptive';
    setup.resultTableResolved = 'table7';
    setup.assessmentCounts = { wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 };
    setup.componentWeights = { ww: 0, pt: 0, ex: 0 };
    setup.transitionRuleResolved.transitionLabel = transitionLabelFor({ table: 'table7', gradingMode: 'kindergarten-descriptive', numericMode: 'none' }, gradeLevel, schoolYear);
  } else if (/^Grade\s+[1-3]$/.test(gradeLevel)) {
    const rule = (KS1_TRANSITION[transitionYearKey(normalizedSchoolYear || schoolYear)] || {})[gradeLevel] || { table:'table8', gradingMode:'descriptive', numericMode:'none' };
    setup.gradingModeResolved = rule.gradingMode;
    setup.resultTableResolved = rule.table;
    setup.transitionRuleResolved.numericMode = rule.numericMode;
    setup.transitionRuleResolved.transitionLabel = transitionLabelFor(rule, gradeLevel, schoolYear);
    if (rule.table === 'table8') {
      setup.assessmentCounts = { wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 };
      setup.componentWeights = { ww: 0, pt: 0, ex: 0 };
    }
  } else if (legacyGrade12) {
    setup.gradingModeResolved = 'numeric-legacy-g12';
    h.g12DescriptorSource = normalizeG12DescriptorSource(h.g12DescriptorSource);
    const g12DescriptorTable = getG12DescriptorTable(h.g12DescriptorSource);
    setup.resultTableResolved = g12DescriptorTable;
    setup.transitionRuleResolved.numericMode = 'legacy-do8-appendix-b';
    setup.transitionRuleResolved.transitionLabel = `${gradeLevel} • ${schoolYear} • ${currentG12SystemLabel() || 'Quarter / Semester'} • ${isLegacyGrade12SemesterLayout() ? (getSemesterLabel() || 'Semester not set') : 'No semester'} • ${getG12DescriptorSourceLabel(h.g12DescriptorSource)} • DO No. 8, s. 2015 legacy Grade 12 weights`;
    setup.assessmentCounts = Object.assign({ wwCount: 5, ptCount: 5, stCount: 0, hasTE: false, qaCount: 1 }, setup.assessmentCounts || {});
    setup.assessmentCounts.ptCount = 5;
    setup.assessmentCounts.qaCount = 1;
    setup.assessmentCounts.stCount = 0;
    setup.assessmentCounts.hasTE = false;
  } else {
    setup.gradingModeResolved = 'numeric';
    setup.resultTableResolved = 'table11';
    setup.transitionRuleResolved.numericMode = schoolYear === '2026-2027' ? 'adjusted-transmutation' : 'zero-based';
    setup.transitionRuleResolved.transitionLabel = `${gradeLevel || '—'} • ${schoolYear || '—'} • ${setup.transitionRuleResolved.numericMode === 'adjusted-transmutation' ? 'Adjusted transmutation' : 'Zero-based'}`;
  }
  setup.transitionRuleResolved.schoolYear = normalizedSchoolYear || schoolYear;
  setup.transitionRuleResolved.gradeLevel = gradeLevel;
  setup.transitionRuleResolved.table = setup.resultTableResolved;
  setup.transitionRuleResolved.gradingMode = setup.gradingModeResolved;
  setup.usesTransmutation = setup.transitionRuleResolved.numericMode === 'adjusted-transmutation' || setup.transitionRuleResolved.numericMode === 'legacy-do8-appendix-b';
  setup.usesZeroBased = setup.transitionRuleResolved.numericMode === 'zero-based';
  setup.usesDescriptors = true;
  setup.validationNotes = [`Resolved from ${gradeLevel || 'unselected grade'} + ${(normalizedSchoolYear || schoolYear) || 'unselected school year'} + ${subjectGroup || 'default subject group'}.`, `Result table: ${setup.resultTableResolved || '—'}.`];
  if (/^Grade\s+[1-3]$/.test(gradeLevel)) {
    const allowedKs1Groups = getAllowedSubjectGroups(gradeLevel, normalizedSchoolYear || schoolYear);
    setup.validationNotes.push('Grades 1–3 transition schedule applied per Table 12 of DO No. 015, s. 2026.');
    if (allowedKs1Groups.length) setup.validationNotes.push(`Allowed subject-group template for this KS1 context: ${allowedKs1Groups.join(' | ')}.`);
    if (setup.resultTableResolved === 'table8') setup.validationNotes.push('This KS1 context uses integrated descriptive reporting; numeric WW/PT/EX weights are suppressed in the class record.');
    else setup.validationNotes.push('This KS1 context remains under numerical grading for the transition year; subject-based numerical computation remains active.');
  }
  if (gradeLevel === 'Kindergarten') setup.validationNotes.push('Kindergarten uses Table 7 descriptive grading and no TE.');
  if (legacyGrade12) {
    setup.validationNotes.push('Grade 12 in SY 2026-2027 legacy mode uses DO No. 8, s. 2015 SHS component weights.');
    setup.validationNotes.push('Legacy Grade 12 score slots are WW1–WW5, PT1–PT5, and QA1 only.');
    setup.validationNotes.push('Quarterly grades use Appendix B transmutation of DO No. 8, s. 2015 and descriptors/remarks from Table 10.');
    if (isLegacyGrade12SemesterLayout()) {
      setup.validationNotes.push('Selected system: Quarter / Semester. First Semester = Quarter 1 and Quarter 2; Second Semester = Quarter 3 and Quarter 4.');
      setup.validationNotes.push(`Active record scope: ${getSemesterLabel() || 'Semester not set'}. Save First Semester and Second Semester as separate subject records.`);
    } else if (isG12ThreeTermLayout()) {
      setup.validationNotes.push('Selected system: Three Term. Quarter 1, Quarter 2, and Quarter 3 slots are reused as Term 1, Term 2, and Term 3; Quarter 4 is preserved but excluded/NA.');
    } else if (isG12ModifiedThreeTermLayout()) {
      setup.validationNotes.push(`Selected system: Modified Three Term. This subject is term-bound to ${getTermLabel(normalizeModifiedTerm(state.recordHeader.modifiedTerm))}; other terms are preserved but excluded/NA.`);
      setup.validationNotes.push('Modified Three Term observes the DO No. 8, s. 2015 Grade 12 weights/transmutation while treating each subject as lasting only in its enrolled term.');
    }
    if (legacyProfileInfo && legacyProfileInfo.exact) setup.validationNotes.push(`Legacy Grade 12 profile applied: ${legacyProfileInfo.selectedKey}.`);
    if (legacyProfileInfo && !legacyProfileInfo.exact) {
      setup.validationNotes.push(legacyProfileInfo.advisory);
      setup.validationNotes.push(`Current fallback mapping applied: ${legacyProfileInfo.selectedKey}.`);
    }
  }
  if (usesDescriptiveNoNumeric(setup)) setup.validationNotes.push('Descriptor-based KS1 grading uses qualitative evidence; WW/PT/EX weights and counts are not displayed.');
  else if (setup.transitionRuleResolved.numericMode === 'legacy-do8-appendix-b') setup.validationNotes.push('Legacy Grade 12 uses Appendix B transmutation from DO No. 8, s. 2015.');
  else if (setup.usesTransmutation) setup.validationNotes.push('Adjusted transmutation applies for SY 2026-2027 to applicable numerical grade levels.');
  else if (setup.usesZeroBased) setup.validationNotes.push('Zero-based numerical grading applies with no transmutation.');
  return setup;
}
  function initDefaults() {
    state.headerEditMode = false;
    state.headerDirty = false;
    state.recordHeader = defaultRecordHeader();
    state.setupProfile = defaultSetupProfile();
    state.attendance = defaultAttendance();
    state.finalSummary = defaultFinalSummary();
    state.term1 = defaultTerm('term1');
    state.term2 = defaultTerm('term2');
    state.term3 = defaultTerm('term3');
    state.term4 = defaultTerm('term4');
    state.isMapehSummaryView = false;
    state.mapehVirtualBaseHeader = null;
    state.mapehSummarySelectedLearnerId = '';
  }
  initDefaults();

  function normalizeRoster(list) { return Array.isArray(list) ? list.map((item, i) => ({ id: text(item && (item.id || item.studentId || item.learnerId || item.lrn || i + 1)), name: text(item && (item.name || item.student || item.learner || '')), sex: normalizeSex(item && item.sex), lrn: text(item && (item.lrn || '')) })).filter(r => r.name) : []; }
  function mergeRosters(hostRoster, savedRoster, options = {}) {
    const host = normalizeRoster(hostRoster), saved = normalizeRoster(savedRoster);
    const hostAuthoritative = !!(options && options.hostAuthoritative);
    // When Manage Class has an actively loaded roster, even an empty array is authoritative.
    // This prevents a saved Class Record roster from resurrecting learners after all learners
    // are deleted from Manage Learners.
    if (!host.length) return hostAuthoritative ? [] : saved;
    if (!saved.length) return host;

    // Manage Class is the authoritative roster.
    // Preserve compatible saved metadata only for learners that still exist in the host roster;
    // never append saved-only learners, because that resurrects learners deleted in Manage Class.
    const byId = new Map(saved.map(r => [text(r.id), r]));
    const byMatch = new Map(saved.map(r => [rosterMatchKey(r), r]));
    return host.map(item => {
      const match = byId.get(text(item.id)) || byMatch.get(rosterMatchKey(item));
      return {
        id: text(item.id || (match && match.id) || ''),
        name: text(item.name || (match && match.name) || ''),
        sex: normalizeSex(item.sex || (match && match.sex) || ''),
        lrn: text(item.lrn || (match && match.lrn) || '')
      };
    });
  }

  function currentHostClassContext() {
    const loadedId = text(window.currentClassId || '').trim();
    const dropdownId = text($id('classDropdown') && $id('classDropdown').value || '').trim();
    const classId = text(loadedId || dropdownId).trim();
    const rawClassName = text(window.currentClassName || ($id('classHeader') && $id('classHeader').textContent) || '').replace(/[\[\]]/g, '').trim();
    const placeholder = !rawClassName || rawClassName.toLowerCase() === 'class name';
    const className = placeholder ? '' : rawClassName;
    const key = classId ? [slugify(classId), slugify(className)].filter(Boolean).join('::') : '';
    return { classId, className, key };
  }

function disconnectCurrentRecordForHost(host) {
  initDefaults();

  state.classId = text((host && host.classId) || '').trim();
  state.className = text((host && host.className) || '').trim();
  state.roster = [];
  state.savedRoster = [];
  state.activeLearnerId = '';
  state.connectedHostClassKey = text((host && host.key) || '').trim();

  Object.assign(state.recordHeader, {
    classId: state.classId,
    className: state.className
  });

  clearClassScopedHeaderFields();
}

function syncHostClassContext() {
  const host = currentHostClassContext();
  const previousKey = text(state.connectedHostClassKey).trim();
  const nextKey = text(host.key).trim();
  const hadContext = !!(previousKey || text(state.classId).trim() || text(state.className).trim());
  const lostContext = !nextKey && hadContext;

  // Treat BOTH cases as real changes:
  // 1) previous class -> different class
  // 2) no previous class -> newly loaded class
  // 3) previously loaded class -> deleted / unloaded class
  const changed = lostContext || (!!nextKey && (
    !previousKey ||
    previousKey !== nextKey ||
    text(state.classId).trim() !== text(host.classId).trim() ||
    text(state.className).trim() !== text(host.className).trim()
  ));

  if (changed) {
    disconnectCurrentRecordForHost(host);
  } else if (nextKey) {
    state.connectedHostClassKey = nextKey;
  } else {
    state.connectedHostClassKey = '';
  }

  return { host, changed };
}

  function handleHostClassChange() {
    const result = syncHostClassContext();
    if (!result.changed) return;
    loadFromHost();
    recompute();
    if (state.htmlInjected) render();
    if (dom.modal && dom.modal.style.display === 'block') flash('Previously opened Class Record was reset because the loaded class changed or was removed.', 'success');
  }

  function replaceRosterFromHost(hostRoster, options = {}) {
    const normalized = normalizeRoster(hostRoster || []);
    state.savedRoster = clone(normalized);
    state.roster = clone(normalized);
    hydrateTerms();
    buildAttendanceRows();
    recompute();
    if (state.htmlInjected) render();
    if (dom.modal && dom.modal.style.display === 'block' && options.showToast) {
      flash('Class Record roster synced with Manage Class.', 'success');
    }
    scheduleAutoPersist(0);
  }

  function handleRosterChangedEvent(ev) {
    try {
      const detail = (ev && ev.detail) || {};
      const eventClassId = text(detail.classId || '').trim();
      const host = currentHostClassContext();
      const activeClassId = text(state.classId || host.classId || '').trim();
      if (eventClassId && activeClassId && eventClassId !== activeClassId) return;
      if (eventClassId && host.classId && eventClassId !== text(host.classId).trim()) return;

      state.classId = text(host.classId || eventClassId || state.classId).trim();
      state.className = text(host.className || state.className).trim();
      state.connectedHostClassKey = text(host.key || state.connectedHostClassKey).trim();
      Object.assign(state.recordHeader, { classId: state.classId, className: state.className });

      replaceRosterFromHost(Array.isArray(detail.roster) ? detail.roster : (window.currentStudents || []), {
        showToast: detail.action === 'delete-student'
      });
    } catch (_) {}
  }

  function bindHostClassSync() {
    if (state.hostSyncBound) return;
    state.hostSyncBound = true;
    const schedule = () => window.setTimeout(() => { try { handleHostClassChange(); } catch (_) {} }, 0);
    const classDropdown = $id('classDropdown');
    if (classDropdown) {
      classDropdown.addEventListener('change', schedule);
      classDropdown.addEventListener('input', schedule);
    }
    const classHeader = $id('classHeader');
    if (classHeader && typeof MutationObserver === 'function') {
      new MutationObserver(schedule).observe(classHeader, { childList: true, characterData: true, subtree: true });
    }
    const classContent = $id('classContent');
    if (classContent && typeof MutationObserver === 'function') {
      new MutationObserver(schedule).observe(classContent, { attributes: true, attributeFilter: ['class'] });
    }
    window.addEventListener('focus', schedule);
    window.addEventListener('ctm:roster-changed', handleRosterChangedEvent);
    window.addEventListener('rosterChanged', handleRosterChangedEvent);
    if (!state.hostSyncTimer && typeof window.setInterval === 'function') {
      state.hostSyncTimer = window.setInterval(() => {
        if (!state.htmlInjected || !dom.modal || dom.modal.style.display !== 'block') return;
        schedule();
      }, 250);
    }
  }

function loadFromHost() {
  const hostSync = syncHostClassContext();
  const host = hostSync.host;

  // Always sync from current host class first
  state.classId = text(host.classId || '').trim();
  state.className = text(host.className || '').replace(/\[\[\]\]/g, '').trim();

  // Fallback only if host truly has nothing
  if (!state.classId) state.classId = text(state.recordHeader.classId || '').trim();
  if (!state.className) state.className = text(state.recordHeader.className || '').replace(/\[\[\]\]/g, '').trim();

  const suppressHostRoster = !!state.suppressHostRosterOnce;
  const rawHostRoster = suppressHostRoster ? null : window.currentStudents;
  const hostRosterAuthoritative = !suppressHostRoster && Array.isArray(rawHostRoster) && !!text(host.classId || '').trim();
  const hostRoster = hostRosterAuthoritative ? normalizeRoster(rawHostRoster) : [];
  state.suppressHostRosterOnce = false;
  state.roster = mergeRosters(hostRoster, state.savedRoster || state.roster || [], { hostAuthoritative: hostRosterAuthoritative });
  if (hostRosterAuthoritative) state.savedRoster = clone(state.roster);

  Object.assign(state.recordHeader, {
    classId: state.classId,
    className: state.className,
    teacherName: state.recordHeader.teacherName || text($id('sf2Teacher') && $id('sf2Teacher').value || ''),
    schoolName: state.recordHeader.schoolName || text($id('sf2SchoolName') && $id('sf2SchoolName').value || ''),
    schoolYear: state.recordHeader.schoolYear || text($id('sf2SchoolYear') && $id('sf2SchoolYear').value || ''),
    gradeLevel: state.recordHeader.gradeLevel || text($id('sf2GradeLevel') && $id('sf2GradeLevel').value || ''),
    schoolId: state.recordHeader.schoolId || text($id('sf2SchoolId') && $id('sf2SchoolId').value || '')
  });

  if (isLegacyGrade12SemesterLayout(state.recordHeader.gradeLevel, state.recordHeader.schoolYear) || isCustomSemesterStructure(state.recordHeader)) {
    state.recordHeader.semester = getSemesterLabel(state.recordHeader.semester) || 'First Semester';
  } else {
    state.recordHeader.semester = '';
  }

  state.recordHeader.keyStage = getKeyStage(state.recordHeader.gradeLevel);
}

  function makeLearnerRow(learner) { return { learnerId: text(learner.id || learner.name), studentId: text(learner.id), lrn: text(learner.lrn), name: text(learner.name), sex: normalizeSex(learner.sex), scores: blankScores(), computed: defaultComputed() }; }

function hydrateTerms() {
  TERMS.forEach(k => {
    const t = state[k];
    t.termLabel = getTermLabel(k);
    t.applicableTable = state.setupProfile.resultTableResolved;
    t.gradingMode = state.setupProfile.gradingModeResolved;
    t.numericMode = state.setupProfile.transitionRuleResolved.numericMode || 'none';
    t.assessmentConfig = Object.assign({ wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 }, clone(state.setupProfile.assessmentCounts));
    const legacyMode = isLegacyGrade12Term(t);
    t.hps = cloneHpsStructWithCompat(t.hps, legacyMode);
    const existing = new Map((t.learners || []).map(r => [text(r.learnerId), r]));
    const existingByMatch = new Map((t.learners || []).map(r => [rosterMatchKey(r), r]));
    t.learners = state.roster.map(learner => {
      const id = text(learner.id || learner.name);
      const row = existing.get(id) || existingByMatch.get(rosterMatchKey(learner)) || makeLearnerRow(learner);
      row.learnerId = id;
      row.studentId = text(learner.id);
      row.lrn = text(learner.lrn);
      row.name = text(learner.name);
      row.sex = normalizeSex(learner.sex);
      row.scores = cloneScoreStructWithCompat(row.scores, legacyMode);
      row.computed = Object.assign(defaultComputed(), clone(row.computed || {}));
      row.computed.teacherNotes = text(row.computed.teacherNotes || '');
      computeLearnerTerm(row, t);
      return row;
    });
    if (!state.activeLearnerId && t.learners[0]) state.activeLearnerId = t.learners[0].learnerId;
  });
}

function scoreAsZeroWhenBlank(scores, key) { const sv = num(scores && scores[key]); return sv == null ? 0 : sv; }
function categoryPercent(scores, hps) { let e = 0, t = 0; Object.keys(hps || {}).forEach(k => { const hv = num(hps[k]); if (hv != null && hv > 0) { e += scoreAsZeroWhenBlank(scores, k); t += hv; } }); return t > 0 ? (e / t) * 100 : null; }
function examPercent(scores, hps) {
  const qaHps = num(hps && hps.qa1);
  if (qaHps != null && qaHps > 0) return (scoreAsZeroWhenBlank(scores, 'qa1') / qaHps) * 100;
  // v18.71 ECR conformance: Summative Tests and Term Examination form one
  // assessment component. The ECR first totals all earned scores and all HPS,
  // then computes PS = total earned / total HPS * 100. Do not assign fixed
  // 30%/30%/40% shares to ST1/ST2/TE because their HPS already determine their
  // proportional contribution inside the component.
  return categoryPercent(scores, {
    st1: hps && hps.st1,
    st2: hps && hps.st2,
    te: hps && hps.te
  });
}

function computeCustomLearnerTerm(row, term) { const prev=clone(row.computed||defaultComputed()); row.computed=Object.assign(defaultComputed(), prev, { teacherNotes:prev.teacherNotes||'', interventionNotes:prev.interventionNotes||'' }); const setup=state.setupProfile||defaultSetupProfile(), c=normalizeCustomComponents(setup.customComponents), map={ww:['ww1','ww2','ww3','ww4','ww5'],pt:['pt1','pt2','pt3','pt4','pt5'],st:['st1','st2'],te:['te1','te2'],qe:['qe1','qe2']}; let ig=0; Object.keys(c).forEach(k=>{ const cfg=c[k]; if(Number(cfg.weight)<=0||Number(cfg.count)<=0) return; let e=0,t=0; map[k].slice(0,cfg.count).forEach(fieldKey=>{ const g=(k==='ww'||k==='pt')?k:'ex'; const hv=num(term&&term.hps&&term.hps[g]&&term.hps[g][fieldKey]); if(hv!=null&&hv>0){t+=hv; e+=scoreAsZeroWhenBlank(row.scores&&row.scores[g],fieldKey);} }); ig += (t>0 ? (e/t)*100 : 0) * Number(cfg.weight)/100; }); ig=round2(ig); const method=normalizeGradeConversionMethod(setup.gradeConversionMethod||state.recordHeader.gradeConversionMethod), key=normalizeTransmutationTableKey(setup.transmutationTableKey||state.recordHeader.transmutationTableKey,method), descriptorTable=getCustomDescriptorTable((setup&&setup.customDescriptorSource)||(state.recordHeader&&state.recordHeader.customDescriptorSource)), tg=method==='transmutation'?transmuteWithRegistry(ig,key):ig, d=customNumericDescriptor(tg, descriptorTable); Object.assign(row.computed,{ tableUsed:descriptorTable, gradeConversionTableUsed:method==='transmutation'?getTransmutationRegistryEntry(key).label:'Zero Based Direct Computation', initialGrade:ig, transmutedGrade:method==='transmutation'?tg:null, termGrade:tg, finalDisplayedNumeric:tg, letterGrade:d?d.descriptorCode:'', descriptorCode:d?d.descriptorCode:'', descriptorLabel:d?(d.descriptorLabel||d.descriptorCode):'', generalDescription:d?(d.generalDescription||''):'', instructionalResponse:d?(d.instructionalResponse||''):'', remarks:Number(tg)>=PASSING_GRADE?'Passed':'Failed', interventionFlag:Number(tg)<PASSING_GRADE }); return row.computed; }
function computeLearnerTerm(row, term) {
  if (isCustomInstitutionalMode()) return computeCustomLearnerTerm(row, term);
  const table = term.applicableTable;
  const legacyMode = isLegacyGrade12Term(term);
  const previous = clone(row.computed || defaultComputed());
  row.computed = row.computed || defaultComputed();
  Object.assign(row.computed, defaultComputed(), {
    letterGrade: previous.letterGrade || '',
    descriptorCode: previous.descriptorCode || '',
    remarks: previous.remarks || '',
    teacherNotes: previous.teacherNotes || '',
    interventionNotes: previous.interventionNotes || ''
  });
  row.computed.tableUsed = table;
  if (table === 'table7' || table === 'table8') {
    const profile = getDescriptorProfile(table);
    const currentCode = text(row.computed.letterGrade || row.computed.descriptorCode).trim();
    const chosen = profile.find(p => p.code === currentCode) || null;
    row.computed.initialGrade = null;
    row.computed.transmutedGrade = null;
    row.computed.finalDisplayedNumeric = null;
    row.computed.interventionFlag = !!(chosen && (chosen.code === 'D' || chosen.code === 'E' || chosen.code === 'BG'));
    row.computed.letterGrade = chosen ? chosen.code : '';
    row.computed.descriptorCode = chosen ? chosen.code : '';
    row.computed.descriptorLabel = chosen ? `${chosen.label} (${chosen.localizedLabel})` : '';
    row.computed.generalDescription = chosen ? chosen.generalDescription : '';
    row.computed.termGrade = chosen ? chosen.code : '';
    row.computed.instructionalResponse = chosen && table === 'table8' ? descriptiveInstruction(chosen.code) : '';
    return;
  }
  // Running-total numeric calculation: compute from the assessments already configured/encoded.
  // Blank learner score cells under a positive HPS are counted as zero, so grades update immediately while encoding.
  const activeFields = visibleScoreFields(term);
  const hasEncodedHps = activeFields.some(field => num(term.hps[field.group][field.key]) > 0);
  const invalidScore = hasValidationIssue(row, term);
  if (!activeFields.length || !hasEncodedHps || invalidScore) {
    row.computed.initialGrade = null;
    row.computed.transmutedGrade = null;
    row.computed.termGrade = null;
    row.computed.finalDisplayedNumeric = null;
    row.computed.letterGrade = '';
    row.computed.descriptorCode = '';
    row.computed.descriptorLabel = '';
    row.computed.generalDescription = '';
    row.computed.instructionalResponse = '';
    if (legacyMode) row.computed.remarks = '';
    row.computed.interventionFlag = false;
    return;
  }
  const weights = state.setupProfile.componentWeights;
  const ww = categoryPercent(row.scores.ww, term.hps.ww);
  const pt = categoryPercent(row.scores.pt, term.hps.pt);
  const ex = examPercent(row.scores.ex, term.hps.ex);
  const parts = [];
  if (ww != null) parts.push(ww * weights.ww);
  if (pt != null) parts.push(pt * weights.pt);
  if (ex != null) parts.push(ex * weights.ex);
  const initial = parts.length ? round2(parts.reduce((a, b) => a + b, 0)) : null;
  const displayed = initial == null ? null : (legacyMode ? transmute(initial, { table: 'do8' }) : (state.setupProfile.usesTransmutation ? transmute(initial) : roundWhole(initial)));
  const desc = displayed == null ? null : numericDescriptor(displayed, table);
  row.computed.initialGrade = initial;
  row.computed.transmutedGrade = legacyMode || state.setupProfile.usesTransmutation ? displayed : null;
  row.computed.termGrade = displayed;
  row.computed.finalDisplayedNumeric = displayed;
  row.computed.generalDescription = '';
  row.computed.instructionalResponse = '';
  if (desc) {
    applyNumericDescriptorFields(row.computed, desc, table, displayed);
    if (!legacyMode) row.computed.remarks = text(row.computed.remarks || '');
  }
  row.computed.interventionFlag = displayed != null && displayed < PASSING_GRADE;
  if (legacyMode && !desc) row.computed.remarks = displayed != null && displayed >= PASSING_GRADE ? 'Passed' : displayed != null ? 'Failed' : '';
}

function recomputeCustomFinal() { const keys=customTermKeysForFinal(); const descriptorTable=getCustomDescriptorTable(state.recordHeader&&state.recordHeader.customDescriptorSource); const rows=state.roster.map(learner=>{ const id=text(learner.id||learner.name), termGrades={}; TERMS.forEach(k=>{ const r=learnerRow(k,id); termGrades[k]=r&&r.computed?r.computed.termGrade:null; }); const vals=keys.map(k=>num(termGrades[k])).filter(v=>v!=null), fg=vals.length?round2(vals.reduce((a,b)=>a+b,0)/vals.length):null, d=fg==null?null:customNumericDescriptor(fg, descriptorTable); return { learnerId:id, studentId:text(learner.id), lrn:text(learner.lrn), name:text(learner.name), sex:normalizeSex(learner.sex), termGrades, finalGrade:fg, finalDisplayedNumeric:fg, tableUsed:descriptorTable, descriptorCode:d?d.descriptorCode:'', descriptorLabel:d?d.descriptorLabel:'', remarks:fg==null?'':(fg>=PASSING_GRADE?'Passed':'Failed'), teacherNotes:'', interventionNotes:'', generalDescription:d?(d.generalDescription||''):'', instructionalResponse:d?(d.instructionalResponse||''):'', finalResult:Object.assign(defaultComputed(),{ tableUsed:descriptorTable, finalDisplayedNumeric:fg, termGrade:fg, letterGrade:d?d.descriptorCode:'', descriptorCode:d?d.descriptorCode:'', descriptorLabel:d?d.descriptorLabel:'', remarks:fg==null?'':(fg>=PASSING_GRADE?'Passed':'Failed'), generalDescription:d?(d.generalDescription||''):'', instructionalResponse:d?(d.instructionalResponse||''):'', interventionFlag:fg!=null&&fg<PASSING_GRADE }) }; }); const nums=rows.map(r=>num(r.finalGrade)).filter(v=>v!=null); const conversion=normalizeGradeConversionMethod(state.recordHeader.gradeConversionMethod); state.finalSummary={ applicableTable:descriptorTable, gradingMode:'numeric-custom-institutional', numericMode:conversion, finalComputationMode:state.recordHeader.customFinalRule||'', learners:rows, classSummary:{ tableUsed:`${getCustomDescriptorSourceLabel(state.recordHeader&&state.recordHeader.customDescriptorSource)} • ${conversion==='transmutation'?getTransmutationRegistryEntry(state.recordHeader.transmutationTableKey).label:'Zero Based Direct Computation'}`, classAverage:nums.length?round2(nums.reduce((a,b)=>a+b,0)/nums.length):null, passingCount:rows.filter(r=>num(r.finalGrade)!=null&&num(r.finalGrade)>=PASSING_GRADE).length, nonPassingCount:rows.filter(r=>num(r.finalGrade)!=null&&num(r.finalGrade)<PASSING_GRADE).length } }; }
function recomputeFinal() {
  if (isCustomInstitutionalMode()) return recomputeCustomFinal();
  const final = defaultFinalSummary();
  final.applicableTable = state.setupProfile.resultTableResolved;
  final.gradingMode = state.setupProfile.gradingModeResolved;
  final.numericMode = state.setupProfile.transitionRuleResolved.numericMode || 'none';
  const visibleTerms = getVisibleTerms();
  final.finalComputationMode = isOfficialDepEdG12Sy2026NoContinuity() ? 'term1-only-no-continuity' : (isLegacyGrade12SemesterLayout() ? 'semester-average-rounded' : (isG12ModifiedThreeTermLayout() ? 'term-bound-single-term' : (final.applicableTable === 'table11' || final.applicableTable === 'table10' ? 'average-of-term-grades-rounded' : 'evidence-based-holistic')));
  // Semester Final Grade remarks fix: Summary Register remarks must come from the computed semester final grade, not concatenated quarter remarks.
  final.learners = state.roster.map(learner => {
    const id = text(learner.id || learner.name);
    const rowsByKey = {};
    TERMS.forEach(k => rowsByKey[k] = (state[k].learners || []).find(r => r.learnerId === id) || (state[k].learners || []).find(r => rosterMatchKey(r) === rosterMatchKey(learner)) || null);
    const out = { learnerId: id, name: text(learner.name), sex: normalizeSex(learner.sex), termResults: {}, semesterGrade: null, finalResult: defaultComputed() };
    TERMS.forEach(k => out.termResults[k] = rowsByKey[k] ? clone(rowsByKey[k].computed) : defaultComputed());
    if (final.applicableTable === 'table11' || final.applicableTable === 'table10') {
      const reportedGrades = visibleTerms.map(k => {
        const grade = rowsByKey[k] && rowsByKey[k].computed ? rowsByKey[k].computed.termGrade : null;
        return summaryReportedNumeric(grade, 60);
      });
      const fg = summaryAverageFromReported(reportedGrades, 60);
      const desc = fg == null ? null : numericDescriptor(fg, final.applicableTable);
      out.semesterGrade = fg;
      out.finalResult.tableUsed = final.applicableTable;
      out.finalResult.finalDisplayedNumeric = fg;
      out.finalResult.termGrade = fg;
      out.finalResult.teacherNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.teacherNotes);
      out.finalResult.remarks = '';
      out.finalResult.interventionNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.interventionNotes);
      if (desc) {
        applyNumericDescriptorFields(out.finalResult, desc, final.applicableTable, fg);
      }
      if (fg != null && !out.finalResult.remarks) {
        out.finalResult.remarks = text((desc && desc.remarks) || (fg >= PASSING_GRADE ? 'Passed' : 'Failed'));
      }
      out.finalResult.interventionFlag = fg != null && fg < PASSING_GRADE;
    } else {
      const profile = getDescriptorProfile(final.applicableTable);
      const counts = {};
      visibleTerms.forEach(k => {
        const r = rowsByKey[k];
        const c = r && text(r.computed.descriptorCode || r.computed.letterGrade).trim();
        if (c) counts[c] = (counts[c] || 0) + 1;
      });
      const ranked = profile.map((p, idx) => ({ p, count: counts[p.code] || 0, idx })).filter(x => x.count > 0).sort((a, b) => b.count - a.count || a.idx - b.idx);
      const chosen = ranked.length ? ranked[0].p : null;
      out.finalResult.letterGrade = chosen ? chosen.code : '';
      out.finalResult.descriptorCode = chosen ? chosen.code : '';
      out.finalResult.descriptorLabel = chosen ? `${chosen.label} (${chosen.localizedLabel})` : '';
      out.finalResult.generalDescription = chosen ? chosen.generalDescription : '';
      out.finalResult.instructionalResponse = chosen && final.applicableTable === 'table8' ? descriptiveInstruction(chosen.code) : '';
      out.finalResult.termGrade = chosen ? chosen.code : '';
      out.finalResult.teacherNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.teacherNotes);
      out.finalResult.remarks = '';
      out.finalResult.interventionNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.interventionNotes);
      out.finalResult.interventionFlag = visibleTerms.some(k => !!(rowsByKey[k] && rowsByKey[k].computed && rowsByKey[k].computed.interventionFlag));
    }
    return out;
  });
  const nums = (final.applicableTable === 'table11' || final.applicableTable === 'table10')
    ? final.learners.map(r => {
        const value = r && r.finalResult ? r.finalResult.finalDisplayedNumeric : null;
        return summaryReportedNumeric(value, 60);
      })
    : final.learners.map(r => r && r.finalResult ? r.finalResult.finalDisplayedNumeric : null).filter(v => v != null).map(Number);
  final.classSummary = { tableUsed: final.applicableTable, classAverage: nums.length ? roundWhole(nums.reduce((a, b) => a + b, 0) / nums.length) : null, passingCount: nums.filter(v => v >= PASSING_GRADE).length, nonPassingCount: nums.filter(v => v < PASSING_GRADE).length };
  state.finalSummary = final;
}

  function emptyAttendanceCounts() {
    return { Present: 0, Absent: 0, Tardy: 0, Cutting: 0, Excuse: 0, Pending: 0 };
  }

  function normalizeAttendanceStatus(v) {
    return ({ present:'Present', p:'Present', absent:'Absent', a:'Absent', tardy:'Tardy', t:'Tardy', cutting:'Cutting', c:'Cutting', excuse:'Excuse', e:'Excuse', pending:'Pending', '':'Pending' })[text(v).trim().toLowerCase()] || 'Pending';
  }

  function cloneAttendanceCounts(source) {
    const out = emptyAttendanceCounts();
    ATTENDANCE_STATUS_LABELS.forEach(key => { out[key] = Number(source && source[key]) || 0; });
    return out;
  }

  function addIsoDays(isoDate, delta) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text(isoDate))) return '';
    const dt = new Date(`${isoDate}T00:00:00`);
    if (!Number.isFinite(dt.getTime())) return '';
    dt.setDate(dt.getDate() + Number(delta || 0));
    return dt.toISOString().slice(0, 10);
  }

  function previousIsoDate(isoDate) { return addIsoDays(isoDate, -1); }
  function nextIsoDate(isoDate) { return addIsoDays(isoDate, 1); }

  function formatIsoDateForDisplay(isoDate) {
    const raw = text(isoDate).trim();
    const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return '';
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (month < 1 || month > 12 || day < 1 || day > 31) return raw;
    return `${monthNames[month - 1]} ${day}, ${year}`;
  }

  function attendanceWindowText(windowInfo, termKey) {
    if (!termKey || !windowInfo || !windowInfo.windows) return '';
    const scope = windowInfo.windows[termKey];
    if (!scope) return '';
    const start = formatIsoDateForDisplay(scope.start);
    const end = formatIsoDateForDisplay(scope.end);
    if (start && end) return start === end ? start : `${start} – ${end}`;
    return start || end || '';
  }

  function parseClassScopedDateKey(key, prefix, classId) {
    const m = text(key).match(new RegExp(`^${prefix}-(\d{4}-\d{2}-\d{2})-(.+)$`, 'i'));
    if (!m) return null;
    return text(m[2]).trim() === text(classId).trim() ? m[1] : null;
  }

  function parseAttendanceMarkersFromNote(note) {
    const src = text(note);
    if (!src) return { eot: null, sot: null, tokens: [] };
    const tokens = [];
    const patterns = [
      /\[(EOT|SOT)\s*([1-4])\]/ig,
      /(END\s+OF\s+TERM|START\s+OF\s+TERM|EOT|SOT)\s*([1-4])/ig
    ];
    patterns.forEach(re => {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(src))) {
        const kindRaw = text(match[1]).trim().toUpperCase();
        const kind = kindRaw.indexOf('START') === 0 ? 'SOT' : kindRaw.indexOf('END') === 0 ? 'EOT' : kindRaw;
        const num = Number(match[2]);
        if (kind && num >= 1 && num <= 4) tokens.push({ kind, termKey: `term${num}`, index: match.index });
      }
    });
    tokens.sort((a, b) => a.index - b.index);
    const getLast = kind => {
      const filtered = tokens.filter(token => token.kind === kind);
      return filtered.length ? filtered[filtered.length - 1] : null;
    };
    return { eot: getLast('EOT'), sot: getLast('SOT'), tokens };
  }

  function buildAttendanceEntryMaps(payload) {
    const byId = new Map();
    const byName = new Map();
    const add = (item, fallbackId) => {
      if (!item || typeof item !== 'object') return;
      const status = normalizeAttendanceStatus(item.status || item.Status || item.value || item.dayStatus);
      const learnerId = text(item.learnerId || item.studentId || item.id || fallbackId).trim();
      const learnerName = normalizeName(item.student || item.name || item.learner || '');
      if (learnerId) byId.set(learnerId, status);
      if (learnerName) byName.set(learnerName, status);
    };
    if (Array.isArray(payload)) {
      payload.forEach(item => add(item));
    } else if (payload && typeof payload === 'object') {
      Object.keys(payload).forEach(key => {
        const value = payload[key];
        if (Array.isArray(value)) value.forEach(item => add(item, key));
        else if (value && typeof value === 'object') add(value, key);
        else if (value != null) add({ status: value }, key);
      });
    }
    return { byId, byName };
  }

  function collectAttendanceDayData() {
    const exactClassIds = new Set([
      text(state.recordHeader.classId || '').trim(),
      text(state.classId || '').trim(),
      text(window.currentClassId || '').trim(),
      text((currentHostClassContext() || {}).classId || '').trim()
    ].filter(Boolean));
    const rosterIds = new Set((state.roster || []).map(learner => text(learner && learner.id).trim()).filter(Boolean));
    const rosterNames = new Set((state.roster || []).map(learner => normalizeName(learner && learner.name)).filter(Boolean));
    const matchedClassIds = new Set(exactClassIds);
    const days = new Map();

    const ensureDay = (date, classSuffix) => {
      if (!date) return null;
      if (!days.has(date)) days.set(date, { date, note: '', nsd: false, nsdReason: '', payload: {}, statusById: new Map(), statusByName: new Map(), eot: null, sot: null, classSuffix: text(classSuffix).trim() });
      const day = days.get(date);
      if (classSuffix && !day.classSuffix) day.classSuffix = text(classSuffix).trim();
      return day;
    };

    const attendanceKeyRe = /^attendance-(\d{4}-\d{2}-\d{2})-(.+)$/i;
    const cdnKeyRe = /^cdn-(\d{4}-\d{2}-\d{2})-(.+)$/i;
    const nsdKeyRe = /^nsd-(\d{4}-\d{2}-\d{2})-(.+)$/i;

    const payloadMatchesRoster = payload => {
      const maps = buildAttendanceEntryMaps(payload);
      if ([...maps.byId.keys()].some(id => rosterIds.has(text(id).trim()))) return true;
      if ([...maps.byName.keys()].some(name => rosterNames.has(normalizeName(name)))) return true;
      return false;
    };

    const attachAttendancePayload = (date, classSuffix, payload) => {
      const day = ensureDay(date, classSuffix);
      if (!day) return;
      day.payload = payload || {};
    };

    try {
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key) continue;
        const match = text(key).match(attendanceKeyRe);
        if (!match) continue;
        const date = match[1];
        const classSuffix = text(match[2]).trim();
        let payload = {};
        try { payload = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (_) { payload = {}; }
        if (exactClassIds.has(classSuffix)) {
          matchedClassIds.add(classSuffix);
          attachAttendancePayload(date, classSuffix, payload);
        }
      }

      if (!days.size && (rosterIds.size || rosterNames.size)) {
        for (let i = 0; i < localStorage.length; i += 1) {
          const key = localStorage.key(i);
          if (!key) continue;
          const match = text(key).match(attendanceKeyRe);
          if (!match) continue;
          const date = match[1];
          const classSuffix = text(match[2]).trim();
          let payload = {};
          try { payload = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (_) { payload = {}; }
          if (!payloadMatchesRoster(payload)) continue;
          matchedClassIds.add(classSuffix);
          attachAttendancePayload(date, classSuffix, payload);
        }
      }

      if (matchedClassIds.size) {
        for (let i = 0; i < localStorage.length; i += 1) {
          const key = localStorage.key(i);
          if (!key) continue;
          let match = text(key).match(cdnKeyRe);
          if (match && matchedClassIds.has(text(match[2]).trim())) {
            const day = ensureDay(match[1], match[2]);
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || 'null');
              day.note = text(parsed && parsed.note).trim();
            } catch (_) {
              day.note = '';
            }
            continue;
          }
          match = text(key).match(nsdKeyRe);
          if (match && matchedClassIds.has(text(match[2]).trim())) {
            const day = ensureDay(match[1], match[2]);
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || 'null');
              day.nsd = !!(parsed && parsed.enabled);
              day.nsdReason = text(parsed && parsed.reason).trim();
            } catch (_) {
              day.nsd = false;
              day.nsdReason = '';
            }
          }
        }
      }
    } catch (_) {}

    return Array.from(days.values()).sort((a, b) => a.date.localeCompare(b.date)).map(day => {
      const markers = parseAttendanceMarkersFromNote(day.note);
      const maps = buildAttendanceEntryMaps(day.payload);
      day.statusById = maps.byId;
      day.statusByName = maps.byName;
      day.eot = day.nsd ? null : markers.eot;
      day.sot = day.nsd ? null : markers.sot;
      return day;
    });
  }

  function resolveTermMarkers(dayRecords, kind) {
    const markerKey = text(kind).trim().toUpperCase() === 'SOT' ? 'sot' : 'eot';
    const latest = {};
    dayRecords.forEach(day => {
      if (!day || day.nsd) return;
      const marker = day[markerKey];
      if (!marker || !marker.termKey) return;
      const existing = latest[marker.termKey];
      if (!existing || day.date > existing.date) latest[marker.termKey] = { date: day.date, note: text(day.note).trim() };
    });
    const ordered = {};
    let prevDate = '';
    TERMS.forEach(termKey => {
      const candidate = latest[termKey] || null;
      if (candidate && (!prevDate || candidate.date > prevDate)) {
        ordered[termKey] = candidate;
        prevDate = candidate.date;
      } else {
        ordered[termKey] = null;
      }
    });
    return ordered;
  }

  function buildTermWindows(dayRecords) {
    const windows = { term1: null, term2: null, term3: null, term4: null };
    const schoolDays = dayRecords.filter(day => day && !day.nsd).map(day => day.date).sort();
    const earliest = schoolDays[0] || '';
    const latest = schoolDays[schoolDays.length - 1] || '';
    const eot = resolveTermMarkers(dayRecords, 'EOT');
    const sot = resolveTermMarkers(dayRecords, 'SOT');
    const hasEot = TERMS.some(termKey => !!(eot[termKey] && eot[termKey].date));
    const hasSot = TERMS.some(termKey => !!(sot[termKey] && sot[termKey].date));
    const fallbackMode = !earliest ? 'empty' : (!hasEot && !hasSot ? 'cumulative' : 'windowed');
    if (fallbackMode !== 'windowed') return { windows, eot, sot, fallbackMode, earliest, latest };
    let previousEnd = '';
    TERMS.forEach((termKey, idx) => {
      const nextTermKey = TERMS[idx + 1] || '';
      const explicitStart = sot[termKey] && sot[termKey].date;
      const explicitEnd = eot[termKey] && eot[termKey].date;
      const nextStart = nextTermKey && sot[nextTermKey] && sot[nextTermKey].date;
      let start = explicitStart || (previousEnd ? nextIsoDate(previousEnd) : (idx === 0 ? earliest : ''));
      let end = explicitEnd || (nextStart ? previousIsoDate(nextStart) : latest);
      if (!start && idx === 0) start = earliest;
      if (start && end && start <= end) {
        windows[termKey] = { start, end, inferredStart: !explicitStart, inferredEnd: !explicitEnd };
        previousEnd = end;
      }
    });
    return { windows, eot, sot, fallbackMode, earliest, latest };
  }

  function resolveLearnerDayStatus(day, learner) {
    if (!day || day.nsd) return '';
    const learnerId = text(learner && (learner.id || learner.learnerId || learner.studentId || learner.name)).trim();
    const learnerName = normalizeName(learner && learner.name);
    return day.statusById.get(learnerId) || day.statusByName.get(learnerName) || 'Pending';
  }

  function aggregateAttendanceForLearner(learner, dayRecords, window) {
    const counts = emptyAttendanceCounts();
    const scopedDays = Array.isArray(dayRecords) ? dayRecords.filter(day => day && !day.nsd && (!window || (window.start && day.date >= window.start && (!window.end || day.date <= window.end)))) : [];
    scopedDays.forEach(day => {
      const status = resolveLearnerDayStatus(day, learner);
      if (status && counts[status] != null) counts[status] += 1;
    });
    return counts;
  }

  function buildLearnerAttendanceLookup(dayRecords, windowInfo) {
    const byLearner = {};
    state.roster.forEach(learner => {
      const learnerId = text(learner.id || learner.name);
      const cumulative = aggregateAttendanceForLearner(learner, dayRecords, null);
      byLearner[learnerId] = { cumulative, terms: {} };
      TERMS.forEach(termKey => {
        if (windowInfo.fallbackMode === 'cumulative') byLearner[learnerId].terms[termKey] = cloneAttendanceCounts(cumulative);
        else byLearner[learnerId].terms[termKey] = aggregateAttendanceForLearner(learner, dayRecords, windowInfo.windows[termKey]);
      });
    });
    return byLearner;
  }

  function attendanceSummaryNote(windowInfo) {
    if (!windowInfo || windowInfo.fallbackMode === 'empty') return 'No school-day attendance data found.';
    if (windowInfo.fallbackMode === 'cumulative') return 'Using cumulative attendance fallback for this active term (no resolved term markers found).';
    if (TERMS.some(termKey => windowInfo.windows[termKey] && (windowInfo.windows[termKey].inferredStart || windowInfo.windows[termKey].inferredEnd))) return 'Term windows were inferred from EOT/SOT markers at Class Day Note.';
    return '';
  }

  
function finalSummaryDisplayPair(finalResult, fallbackLabel) {
  const result = finalResult || defaultComputed();
  const numeric = result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade;
  const descriptorBits = [text(result.descriptorLabel).trim(), text(result.descriptorCode).trim(), text(result.letterGrade).trim()].filter(Boolean);
  const descriptor = descriptorBits[0] || '';
  const numericText = numeric == null || numeric === '' ? '' : fmt(numeric);
  const pieces = [numericText, descriptor].filter(Boolean);
  return {
    title: text(fallbackLabel).trim() || 'Final Result / Descriptor',
    value: pieces.length ? pieces.join(' • ') : '—',
    subtext: pieces.length > 1 ? descriptor : (descriptor || '')
  };
}

function learnerAttendanceSummaryHtml(learner, termKey) {
    if (!learner || !termKey) return '';
    const learnerId = text(learner.learnerId || learner.studentId || learner.name);
    const summaryRoot = state.attendance && state.attendance.termSummaryByLearner && state.attendance.termSummaryByLearner[learnerId];
    if (!summaryRoot) return '';
    const windowInfo = (state.attendance && state.attendance.termWindows) || null;
    const counts = cloneAttendanceCounts(summaryRoot.terms && summaryRoot.terms[termKey]);
    const note = attendanceSummaryNote(windowInfo);
    const rangeText = attendanceWindowText(windowInfo, termKey);
    const parts = ATTENDANCE_STATUS_LABELS.map(statusKey => `<span class="ctm-cr-attendance-chip"><b>${ATTENDANCE_STATUS_SHORT[statusKey]}</b> ${counts[statusKey]}</span>`).join('');
    return `<div class="ctm-cr-card ctm-cr-attendance-summary"><div class="ctm-cr-attendance-row"><div class="ctm-cr-attendance-term">${esc(getAttendanceTermLabel(termKey))}</div><div class="ctm-cr-attendance-body"><div class="ctm-cr-attendance-counts">${parts}</div>${rangeText ? `<div class="ctm-cr-attendance-range ctm-cr-small ctm-cr-muted">${esc(rangeText)}</div>` : ''}</div></div>${note ? `<div class="ctm-cr-small ctm-cr-muted" style="margin-top:.55rem;">${esc(note)}</div>` : ''}</div>`;
  }

  function finalLearnerAttendanceSummaryHtml(learner, termKeys, rangeMarkup) {
    if (!learner) return '';
    const learnerId = text(learner.learnerId || learner.studentId || learner.name);
    const summaryRoot = state.attendance && state.attendance.termSummaryByLearner && state.attendance.termSummaryByLearner[learnerId];
    const scopedTerms = (Array.isArray(termKeys) ? termKeys : []).filter(Boolean);
    if (!summaryRoot || !scopedTerms.length) return '';
    const windowInfo = (state.attendance && state.attendance.termWindows) || null;
    const rows = scopedTerms.map(termKey => {
      const counts = cloneAttendanceCounts(summaryRoot.terms && summaryRoot.terms[termKey]);
      const rangeText = attendanceWindowText(windowInfo, termKey);
      const parts = ATTENDANCE_STATUS_LABELS.map(statusKey => `<span class="ctm-cr-attendance-chip"><b>${ATTENDANCE_STATUS_SHORT[statusKey]}</b> ${counts[statusKey]}</span>`).join('');
      return `<div class="ctm-cr-attendance-row"><div class="ctm-cr-attendance-term">${esc(getAttendanceTermLabel(termKey))}</div><div class="ctm-cr-attendance-body"><div class="ctm-cr-attendance-counts">${parts}</div>${rangeText ? `<div class="ctm-cr-attendance-range ctm-cr-small ctm-cr-muted">${esc(rangeText)}</div>` : ''}</div></div>`;
    }).join('');
    const note = attendanceSummaryNote(windowInfo);
    return `<div class="ctm-cr-card ctm-cr-summary-attendance-card"><div class="ctm-cr-mini-label">Attendance Summary</div>${rows}${note ? `<div class="ctm-cr-small ctm-cr-muted" style="margin-top:.55rem;">${esc(note)}</div>` : ''}</div>`;
  }


  function buildAttendanceRows() {
    const dayRecords = collectAttendanceDayData();
    const windowInfo = buildTermWindows(dayRecords);
    const summaryByLearner = buildLearnerAttendanceLookup(dayRecords, windowInfo);
    state.attendance.rows = state.roster.map(learner => {
      const learnerId = text(learner.id || learner.name);
      const summary = summaryByLearner[learnerId] || { cumulative: emptyAttendanceCounts() };
      return Object.assign({ learnerId, name: text(learner.name), sex: normalizeSex(learner.sex) }, cloneAttendanceCounts(summary.cumulative));
    });
    state.attendance.termSummaryByLearner = summaryByLearner;
    state.attendance.termWindows = windowInfo;
    state.attendance.asOfDate = new Date().toISOString().slice(0, 10);
  }

  // Option C: keep newly-opened blank Class Record as an in-memory/transient draft.
  // This prevents accidental creation of `No Subject • No SY` records when the modal is merely opened/closed.
  function hasPersistableRecordIdentity() {
    return !!(
      text(state.recordHeader && (state.recordHeader.classId || state.classId)).trim() &&
      text(state.recordHeader && state.recordHeader.schoolYear).trim() &&
      text(state.recordHeader && state.recordHeader.subject).trim()
    );
  }
  function hasManualClassRecordContent(payload) {
    const snap = payload && typeof payload === 'object' ? payload : snapshot();
    const h = snap.recordHeader || {};
    if (text(h.subject).trim() || text(h.recordLabel).trim()) return true;
    const hasNumber = v => v !== '' && v != null && Number.isFinite(Number(v));
    const hasText = v => !!text(v).trim();
    const termHasContent = term => {
      if (!term || typeof term !== 'object') return false;
      const hps = term.hps || {};
      if (['ww','pt','ex'].some(group => Object.values(hps[group] || {}).some(hasNumber))) return true;
      return (Array.isArray(term.learners) ? term.learners : []).some(row => {
        const scores = row && row.scores || {};
        if (['ww','pt','ex'].some(group => Object.values(scores[group] || {}).some(hasNumber))) return true;
        const c = row && row.computed || {};
        return ['letterGrade','descriptorCode','remarks','teacherNotes','interventionNotes'].some(k => hasText(c[k]));
      });
    };
    return TERMS.some(k => termHasContent(snap[k]));
  }
  function isPlaceholderDraftSnapshot(payload, key, label) {
    const snap = payload && typeof payload === 'object' ? payload : null;
    const h = snap && snap.recordHeader || {};
    const subjectBlank = !text(h.subject).trim() && !text(h.recordLabel).trim();
    const keyLooksBlank = /::default(?:::|$)/i.test(text(key));
    const labelLooksBlank = /(^|•)\s*No Subject\b/i.test(text(label));
    return !!(subjectBlank && (keyLooksBlank || labelLooksBlank) && !hasManualClassRecordContent(snap));
  }
  function purgeTransientPlaceholderRecords() {
    // Defensive cleanup for blank records created by older builds. It only removes records with no subject/label
    // and no manual HPS, scores, descriptors, remarks, or notes. Roster/attendance mirrors are ignored.
    let list = loadIndex();
    if (!list.length) return;
    const remove = [];
    list.forEach(item => {
      const key = text(item && item.key).trim();
      if (!key) return;
      let payload = null;
      try { payload = JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { payload = null; }
      if (isPlaceholderDraftSnapshot(payload, key, item && item.label)) remove.push(key);
    });
    if (!remove.length) return;
    remove.forEach(key => { try { localStorage.removeItem(key); } catch (_) {} });
    try { localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(list, remove))); } catch (_) {}
  }

  function storageKey() {
    const semesterSuffix = isLegacyGrade12SemesterLayout() ? `::${slugify(getSemesterLabel() || 'first-semester')}` : '';
    const g12System = getG12Sy2026System();
    const g12Suffix = g12System && g12System !== 'quarterSemester' ? `::${slugify(g12System)}${isG12ModifiedThreeTermLayout() ? `::${slugify(normalizeModifiedTerm(state.recordHeader.modifiedTerm))}` : ''}` : '';
    return `classrecord-sy::${slugify(state.recordHeader.classId || state.classId)}::${slugify(state.recordHeader.schoolYear)}::${slugify(state.recordHeader.subject)}${semesterSuffix}${g12Suffix}`;
  }
  function indexKey() { return `classrecord-sy-index::${slugify(state.classId || state.recordHeader.classId)}`; }
  function snapshot() {
    const payload = { schemaVersion: FORM_VERSION, roster: clone(state.roster), recordHeader: clone(state.recordHeader), setupProfile: clone(state.setupProfile), finalSummary: clone(state.finalSummary), attendance: clone(state.attendance) };
    const visible = new Set(getVisibleTerms());
    TERMS.forEach(termKey => {
      if (visible.has(termKey)) payload[termKey] = clone(state[termKey]);
    });
    return payload;
  }
  function cleanIndexList(list, keysToRemove = []) {
    const removeSet = new Set((Array.isArray(keysToRemove) ? keysToRemove : [keysToRemove]).map(text).filter(Boolean));
    const seen = new Set();
    return (Array.isArray(list) ? list : []).filter(item => {
      const key = text(item && item.key).trim();
      if (!key || removeSet.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function saveIndex(key, oldKey = '') {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(indexKey()) || '[]'); } catch (_) {}
    list = cleanIndexList(list, [key, oldKey]);
    const semesterLabel = getSemesterLabel(state.recordHeader.semester) || (isLegacyGrade12SemesterLayout() ? 'No Semester' : '');
    const bits = [state.recordHeader.subject || state.recordHeader.recordLabel || 'No Subject'];
    if (semesterLabel) bits.push(semesterLabel);
    bits.push(state.recordHeader.schoolYear || 'No SY');
    bits.push(state.recordHeader.section || state.className || 'No Class');
    list.unshift({ key, label: bits.join(' • ') });
    localStorage.setItem(indexKey(), JSON.stringify(list));
  }
  function loadIndex() { try { return cleanIndexList(JSON.parse(localStorage.getItem(indexKey()) || '[]')); } catch (_) { return []; } }
  function removeRecordFromCurrentIndex(key) {
    if (!key) return;
    try { localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(loadIndex(), key))); } catch (_) {}
  }
  function persist(showToast = true, options = {}) {
    const opts = Object.assign({ auto: false, force: false }, options || {});
    if (state.isMapehSummaryView || (state.recordHeader && state.recordHeader.mapehMode === 'consolidated')) return false;
    const oldKey = text(state.recordHeader && state.recordHeader.recordId).trim();
    const wasUnsavedDraft = !oldKey;
    const transient = !!state.isTransientDraft && !oldKey;
    // Never allow auto-save/close/roster-sync to materialize a blank transient draft.
    if (transient && opts.auto && !opts.force) return false;
    // A saved Class Record must have a real identity. This blocks accidental `No Subject` / `No SY` keys.
    if (!hasPersistableRecordIdentity()) {
      if (showToast) flash('Set at least School Year and Subject before saving this Class Record.', 'warning');
      return false;
    }
    const key = storageKey();
    const renamedExistingRecord = !!(oldKey && oldKey !== key);
    state.recordHeader.recordId = key;
    localStorage.setItem(key, JSON.stringify(snapshot()));
    saveIndex(key, oldKey);
    if (isMapehBundleCandidate(state.recordHeader) && state.recordHeader.mapehMode === 'component') { try { ensureMapehComponentRecords(state.recordHeader.mapehBundleId || makeMapehBundleId(state.recordHeader), { header: state.recordHeader }); } catch (_) {} }
    state.isTransientDraft = false;
    state.headerEditMode = false;
    state.headerDirty = false;
    if (renamedExistingRecord) {
      try { localStorage.removeItem(oldKey); } catch (_) {}
      removeRecordFromCurrentIndex(oldKey);
    }
    renderRecordPicker();
    // Save-then-lock fix: persist() updates the saved/edit state flags, but the
    // already-rendered Header Fields must also be re-protected immediately.
    // This keeps New Save, Edit→Save, and Load→Edit→Save in the same locked
    // saved-record state without changing storage, CSV, roster, or computation formats.
    try { applyHeaderSettingsLock(); } catch (_) {}
    // Status caption fix: renderRecordPicker() can run without a full render(), so
    // explicitly refresh the Save/Edit button and record-status caption after a
    // new/edited record becomes saved and Header Fields are locked.
    refreshRecordManagerState();
    // v18.41 HPS unlock-after-save fix:
    // HPS inputs are rendered disabled while recordId is blank. On the first manual
    // Save, persist() assigns recordId after the Term / Quarter panels have already
    // been built, so the current panel can keep stale disabled attributes until the
    // saved record is loaded again. Rebuild the UI immediately only for manual saves
    // that convert a draft/unsaved record into a saved record (or rename through the
    // Save/Edit button). Auto-save is intentionally excluded to avoid interrupting
    // typing in learner score/HPS fields.
    if (!opts.auto && (wasUnsavedDraft || renamedExistingRecord || opts.force)) {
      try { render(); } catch (_) {}
    }
    if (showToast) flash(renamedExistingRecord ? 'Class Record renamed and saved. Header Fields locked.' : 'Class Record saved. Header Fields locked.', 'success');
    return true;
  }
  function scheduleAutoPersist(delay = 160) {
    if (state.autoSaveTimer) clearTimeout(state.autoSaveTimer);
    state.autoSaveTimer = window.setTimeout(() => {
      state.autoSaveTimer = 0;
      try { persist(false, { auto: true }); } catch (_) {}
    }, Math.max(0, Number(delay) || 0));
  }
  function flushAutoPersist() {
    if (state.autoSaveTimer) {
      clearTimeout(state.autoSaveTimer);
      state.autoSaveTimer = 0;
    }
    try { persist(false, { auto: true }); } catch (_) {}
  }
  function applySnapshot(payload) { initDefaults(); if (!payload || typeof payload !== 'object') return; state.headerEditMode = false; state.headerDirty = false; state.savedRoster = normalizeRoster(payload.roster || []); state.roster = clone(state.savedRoster); state.recordHeader = Object.assign(defaultRecordHeader(), clone(payload.recordHeader || {})); state.setupProfile = Object.assign(defaultSetupProfile(), clone(payload.setupProfile || {})); state.term1 = Object.assign(defaultTerm('term1'), clone(payload.term1 || {})); state.term2 = Object.assign(defaultTerm('term2'), clone(payload.term2 || {})); state.term3 = Object.assign(defaultTerm('term3'), clone(payload.term3 || {})); state.term4 = Object.assign(defaultTerm('term4'), clone(payload.term4 || {})); state.finalSummary = Object.assign(defaultFinalSummary(), clone(payload.finalSummary || {})); state.attendance = Object.assign(defaultAttendance(), clone(payload.attendance || {})); state.recordHeader.gradingFramework = normalizeGradingFramework(state.recordHeader.gradingFramework); state.recordHeader.g12DescriptorSource = normalizeG12DescriptorSource(state.recordHeader.g12DescriptorSource); state.recordHeader.customAcademicStructure = normalizeCustomAcademicStructure(state.recordHeader.customAcademicStructure); state.recordHeader.customActiveTerm = normalizeModifiedTerm(state.recordHeader.customActiveTerm); state.recordHeader.customSelectedTerms = normalizeCustomSelectedTerms(state.recordHeader.customSelectedTerms, state.recordHeader.customAcademicStructure, state.recordHeader.customActiveTerm); if (!state.recordHeader.customSelectedTerms.includes(state.recordHeader.customActiveTerm)) state.recordHeader.customActiveTerm = state.recordHeader.customSelectedTerms[0] || 'term1'; state.recordHeader.gradeConversionMethod = normalizeGradeConversionMethod(state.recordHeader.gradeConversionMethod); state.recordHeader.transmutationTableKey = normalizeTransmutationTableKey(state.recordHeader.transmutationTableKey, state.recordHeader.gradeConversionMethod); state.recordHeader.customFinalRule = normalizeCustomFinalRule(state.recordHeader.customFinalRule, state.recordHeader.customAcademicStructure); state.recordHeader.customPolicyEnabled = isCustomInstitutionalMode(state.recordHeader); state.setupProfile.customComponents = normalizeCustomComponents(state.setupProfile.customComponents); normalizeMapehHeader(state.recordHeader); state.isMapehSummaryView = false; state.mapehVirtualBaseHeader = null; state.isTransientDraft = !text(state.recordHeader && state.recordHeader.recordId).trim(); }

  function getSortedRecordPickerIndex() {
    // UI-only ordering fix: keep the draft/new entry first, but always show saved
    // Class Record entries alphabetically by their visible label. Do not mutate
    // the stored localStorage index so existing save/load/delete/CSV compatibility
    // and record history formats remain unchanged.
    return loadIndex().slice().sort((a, b) => {
      const labelA = text(a && a.label).trim();
      const labelB = text(b && b.label).trim();
      const byLabel = labelA.localeCompare(labelB, undefined, { sensitivity: 'base', numeric: true });
      if (byLabel) return byLabel;
      return text(a && a.key).localeCompare(text(b && b.key), undefined, { sensitivity: 'base', numeric: true });
    });
  }
  function adjustRecordPickerWidth() {
    const picker = dom.recordPicker || $id('crRecordPicker');
    if (!picker) return;
    const labels = Array.from(picker.options || []).map(opt => text(opt && opt.textContent).trim()).filter(Boolean);
    const selectedOption = picker.options && picker.selectedIndex >= 0 ? picker.options[picker.selectedIndex] : null;
    const selectedLabel = text(selectedOption && selectedOption.textContent).trim();
    const longest = labels.reduce((max, label) => Math.max(max, label.length), 0);
    // Use ch units so the control grows/shrinks with its saved-record labels, while staying viewport-safe.
    const ch = Math.max(30, Math.min(76, longest + 4));
    const width = `min(${ch}ch, calc(100vw - 32px))`;
    picker.style.setProperty('--ctm-cr-picker-width', `${ch}ch`);
    picker.style.width = width;
    picker.style.maxWidth = 'min(720px, calc(100vw - 32px))';
    picker.title = selectedLabel || 'Saved Class Record';
    const status = dom.recordStatus || $id('crRecordStatus');
    if (status) {
      status.style.setProperty('--ctm-cr-picker-width', `${ch}ch`);
      status.style.width = width;
      status.style.maxWidth = 'min(720px, calc(100vw - 32px))';
    }
  }
  function renderRecordPicker() {
    if (!dom.recordPicker) return;
    const options = ['<option value="">Draft / New school-year record</option>']
      .concat(getSortedRecordPickerIndex().map(item => `<option value="${esc(item.key)}" title="${esc(item.label)}">${esc(item.label)}</option>`));
    dom.recordPicker.innerHTML = options.join('');
    if (state.recordHeader.recordId) dom.recordPicker.value = state.recordHeader.recordId;
    adjustRecordPickerWidth();
  }
  function closeFlash() {
    clearTimeout(flash._t);
    if (!dom.flash) return;
    dom.flash.style.display = 'none';
    dom.flash.setAttribute('aria-hidden', 'true');
    dom.flash.textContent = '';
  }

  function flash(msg, mode) {
    if (!dom.flash) return;
    const safeMode = ({ info:1, success:1, error:1, warning:1 })[text(mode).trim().toLowerCase()] ? text(mode).trim().toLowerCase() : 'info';
    clearTimeout(flash._t);
    dom.flash.className = `ctm-cr-flash ${safeMode}`;
    dom.flash.textContent = '';
    const inner = document.createElement('div');
    inner.className = 'ctm-cr-flash-inner';
    const body = document.createElement('div');
    body.className = 'ctm-cr-flash-body';
    body.textContent = text(msg);
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ctm-cr-flash-close';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closeFlash);
    inner.appendChild(body);
    inner.appendChild(closeBtn);
    dom.flash.appendChild(inner);
    dom.flash.style.display = 'block';
    dom.flash.setAttribute('aria-hidden', 'false');
    flash._t = setTimeout(() => { closeFlash(); }, 9000);
  }
  function getRecordStatusText() {
    if (!state.recordHeader || !state.recordHeader.recordId) return 'Draft / unsaved school-year record';
    if (shouldLockHeaderSettings()) return 'Saved school-year record ready. Header Fields locked.';
    if (state.headerDirty) return 'Saved record edited. Click Save to keep changes or Cancel Edit to discard.';
    return 'Saved school-year record ready. Header Fields editable. Click Save or Cancel Edit.';
  }
  function setStatus(msg) {
    const status = dom.recordStatus || $id('crRecordStatus');
    if (!status) return;
    status.textContent = msg == null ? getRecordStatusText() : text(msg);
  }
  function refreshRecordManagerState() {
    try { updateSaveEditButton(); } catch (_) {}
    try { setStatus(); } catch (_) {}
    try { updateExcelButtonState(); } catch (_) {}
  }

  function hasSavedClassRecordLoaded() {
    return !!text(state.recordHeader && state.recordHeader.recordId).trim();
  }
  function canEditHeaderSettings() {
    return !hasSavedClassRecordLoaded() || !!state.headerEditMode || !!state.headerDirty;
  }
  function shouldLockHeaderSettings() {
    return hasSavedClassRecordLoaded() && !canEditHeaderSettings();
  }
  function isHeaderSettingsFieldKey(key) {
    return !!({
      schoolName: 1, schoolYear: 1, gradeLevel: 1, section: 1, semester: 1,
      teacherName: 1, schoolId: 1, district: 1, division: 1, region: 1,
      subjectGroup: 1, subject: 1, recordLabel: 1, g12Sy2026System: 1, g12DescriptorSource: 1, modifiedTerm: 1
    }[key]);
  }
  function updateSaveEditButton() {
    const btn = $id('crBtnSave');
    const cancelBtn = $id('crBtnCancelEdit');
    if (!btn) return;
    const saved = hasSavedClassRecordLoaded();
    const editing = saved && !!state.headerEditMode;
    const showSave = !saved || editing || !!state.headerDirty;
    btn.textContent = showSave ? 'Save' : 'Edit';
    btn.classList.toggle('primary', showSave);
    btn.classList.toggle('edit', !showSave);
    btn.title = showSave
      ? (editing ? 'Save header edits and lock Header Fields again.' : 'Save this Class Record.')
      : 'Unlock Header Fields for editing.';
    btn.setAttribute('aria-label', btn.textContent);
    if (cancelBtn) {
      cancelBtn.hidden = !editing;
      cancelBtn.disabled = !editing;
      cancelBtn.title = editing ? 'Discard header edits and restore the last saved Header Fields.' : '';
      cancelBtn.setAttribute('aria-label', 'Cancel Edit');
    }
  }
  function applyHeaderSettingsLock() {
    const locked = shouldLockHeaderSettings();
    const headerPanel = $id('crPanelHeader');
    if (headerPanel) {
      headerPanel.classList.toggle('ctm-cr-header-locked', locked);
      headerPanel.setAttribute('data-header-locked', locked ? 'true' : 'false');
    }
    Object.keys(dom.headerInputs || {}).forEach(key => {
      const el = dom.headerInputs[key];
      if (!el) return;
      const alwaysReadonly = key === 'keyStage';
      const shouldProtect = locked && isHeaderSettingsFieldKey(key);
      if (el.tagName === 'SELECT') {
        // Header-lock fix: when Edit is clicked, saved-record dropdowns must be
        // explicitly re-enabled. The previous logic preserved an old true
        // disabled state, so Grade Level and Grade 12 SY 2026-2027 Grading
        // System could remain locked after headerEditMode became true.
        el.disabled = !!(shouldProtect || alwaysReadonly);
        el.setAttribute('aria-disabled', el.disabled ? 'true' : 'false');
      } else {
        el.readOnly = shouldProtect || alwaysReadonly;
        if (shouldProtect || alwaysReadonly) el.setAttribute('readonly', 'readonly');
        else el.removeAttribute('readonly');
        el.setAttribute('aria-readonly', (shouldProtect || alwaysReadonly) ? 'true' : 'false');
      }
      if (shouldProtect) {
        el.classList.add('ctm-cr-header-field-locked');
        el.title = 'Locked because this is a loaded saved Class Record. Click Edit to allow changes.';
      } else if (el.classList.contains('ctm-cr-header-field-locked')) {
        el.classList.remove('ctm-cr-header-field-locked');
        if (key !== 'section') el.removeAttribute('title');
      }
    });
    updateSaveEditButton();
  }
  function enableSavedHeaderEditing() {
    if (!hasSavedClassRecordLoaded()) return true;
    state.headerEditMode = true;
    state.headerDirty = false;
    applyHeaderSettingsLock();
    // v18.34: keep the saved-record manager caption in sync with the same
    // edit-mode state used by the floating prompt. This is UI-only and does
    // not touch storage, CSV, roster, shared-header, or computation data.
    refreshRecordManagerState();
    try { window.setTimeout(refreshRecordManagerState, 0); } catch (_) {}
    flash('Header Fields unlocked. Use Save to keep changes or Cancel Edit to discard them.', 'info');
    return true;
  }
  function cancelSavedHeaderEditing() {
    const key = text(state.recordHeader && state.recordHeader.recordId).trim();
    if (!key) return false;
    try {
      const payload = JSON.parse(localStorage.getItem(key) || '{}');
      if (!payload || !payload.recordHeader) throw new Error('Missing saved header');
      // Restore the last saved Header Fields without touching the already loaded roster/score rows.
      state.recordHeader = Object.assign(defaultRecordHeader(), clone(payload.recordHeader || {}));
      state.classId = text(state.recordHeader.classId || state.classId).trim();
      state.className = text(state.recordHeader.className || state.className).trim();
      state.recordHeader.keyStage = getKeyStage(state.recordHeader.gradeLevel);
      state.headerEditMode = false;
      state.headerDirty = false;
      recompute();
      pushRecordHeaderToSharedSchoolForms('cancel-header-edit');
      render();
      flash('Header edit cancelled. Last saved Header Fields restored and locked.', 'info');
      return true;
    } catch (_) {
      state.headerEditMode = false;
      state.headerDirty = false;
      recompute();
      render();
      flash('Header edit cancelled, but the saved header could not be reloaded.', 'warning');
      return false;
    }
  }
  function markHeaderSettingsDirty() {
    if (!hasSavedClassRecordLoaded() || !state.headerEditMode) return;
    state.headerDirty = true;
    updateSaveEditButton();
  }

  function ensureActiveTabHighlightStyle() {
    if (document.getElementById('ctm-cr-active-tab-highlight-style')) return;
    const style = document.createElement('style');
    style.id = 'ctm-cr-active-tab-highlight-style';
    style.textContent = `
#classRecordModal .ctm-cr-tab {
  transition: background-color .18s ease, background-image .18s ease, color .18s ease, box-shadow .18s ease, transform .18s ease, opacity .18s ease;
  background: linear-gradient(135deg, #7c8ef5 0%, #8a63c9 100%);
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
  opacity: .88;
}
#classRecordModal .ctm-cr-tab:hover {
  opacity: .96;
}
#classRecordModal .ctm-cr-tab.active,
#classRecordModal .ctm-cr-tab[aria-selected="true"],
#classRecordModal .ctm-cr-tab[data-active="true"] {
  background: linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 18px rgba(29, 78, 216, 0.28), inset 0 0 0 1px rgba(255,255,255,0.25);
  opacity: 1;
  transform: translateY(-1px);
}
#classRecordModal .ctm-cr-tab:not(.active):not([aria-selected="true"]):not([data-active="true"]) {
  background: linear-gradient(135deg, #8ea0ff 0%, #8b67cf 100%);
  color: rgba(255,255,255,0.96);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
}
#classRecordModal .ctm-cr-tab:focus-visible {
  outline: 3px solid rgba(29, 78, 216, 0.28);
  outline-offset: 2px;
}`;
    (document.head || document.documentElement).appendChild(style);
  }

  
  function readTabsCollapsedPreference() {
    try {
      const raw = localStorage.getItem(TABS_COLLAPSE_STORAGE_KEY);
      if (raw == null) return TABS_COLLAPSE_DEFAULT;
      return raw === '1' || raw === 'true';
    } catch (_) {
      return TABS_COLLAPSE_DEFAULT;
    }
  }

  function writeTabsCollapsedPreference(collapsed) {
    try { localStorage.setItem(TABS_COLLAPSE_STORAGE_KEY, collapsed ? '1' : '0'); } catch (_) {}
  }

  function ensureTabsCollapseStyles() {
    if ($id('ctmCrTabsCollapseStyles')) return;
    const style = document.createElement('style');
    style.id = 'ctmCrTabsCollapseStyles';
    style.textContent = `#classRecordModal .ctm-cr-tabs-shell[hidden]{display:none!important}#classRecordModal .ctm-cr-tabs-footer[hidden]{display:none!important}#classRecordModal .ctm-cr-close-cell{gap:10px;align-items:center}#classRecordModal .ctm-cr-close-cell .ctm-cr-tabs-toggle{order:1;margin-right:0}#classRecordModal .ctm-cr-close-cell .ctm-cr-close-btn{order:2}#classRecordModal .ctm-cr-tabs-container{gap:2px}#classRecordModal .ctm-cr-tabs-footer{display:flex;align-items:center;justify-content:center;gap:0;padding:0 14px 6px 14px;flex-wrap:wrap}#classRecordModal .ctm-cr-tabs-source{margin:0;font-size:11px;text-align:center;flex:0 1 auto}#classRecordModal .ctm-cr-tabs-source a{color:#5b21b6}#classRecordModal .ctm-cr-tabs-toggle{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:30px;padding:.38rem .95rem;border-radius:8px;border:1px solid #76c260;background:#f7fff3;color:#1f2937;font-size:.82rem;line-height:1;cursor:pointer;white-space:nowrap;transition:background-color .18s ease,border-color .18s ease,box-shadow .18s ease,transform .18s ease}#classRecordModal .ctm-cr-tabs-toggle:hover{background:#f0faea;border-color:#5fb54b;box-shadow:0 4px 10px rgba(95,181,75,.15)}#classRecordModal .ctm-cr-tabs-toggle:focus-visible{outline:3px solid rgba(95,181,75,.22);outline-offset:2px}#classRecordModal .ctm-cr-tabs-toggle-icon{display:inline-block;min-width:.8rem;text-align:center;font-size:.78rem;line-height:1;transform-origin:center}#classRecordModal .ctm-cr-tabs-toggle[aria-expanded="true"] .ctm-cr-tabs-toggle-icon{transform:rotate(180deg)}#classRecordModal .ctm-cr-tabs-footer .ctm-cr-tabs-toggle{display:none!important}@media (max-width:700px){#classRecordModal .ctm-cr-close-cell{gap:8px;padding:8px 16px}#classRecordModal .ctm-cr-close-cell .ctm-cr-tabs-toggle{min-height:28px;padding:.34rem .75rem;font-size:.78rem}#classRecordModal .ctm-cr-tabs-footer{padding:0 8px 8px 8px}#classRecordModal .ctm-cr-tabs-source{flex-basis:100%}}`;
    document.head.appendChild(style);
  }

  function setTabsCollapsed(collapsed, options = {}) {
    const opts = Object.assign({ persist: true }, options || {});
    const shell = dom.tabsShell;
    const footer = dom.tabsFooter;
    const toggle = dom.tabsCollapseToggle;
    if (!shell || !toggle) return;
    const isCollapsed = !!collapsed;
    shell.hidden = isCollapsed;
    shell.setAttribute('aria-hidden', isCollapsed ? 'true' : 'false');
    if (footer) {
      footer.hidden = isCollapsed;
      footer.setAttribute('aria-hidden', isCollapsed ? 'true' : 'false');
    }
    toggle.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    toggle.dataset.collapsed = isCollapsed ? 'true' : 'false';
    if (opts.persist) writeTabsCollapsedPreference(isCollapsed);
  }

  function toggleTabsCollapsed(forceState) {
    const nextState = typeof forceState === 'boolean'
      ? forceState
      : !(dom.tabsShell && dom.tabsShell.hidden);
    setTabsCollapsed(nextState, { persist: true });
  }

  function ensureTabsCollapsibleUi() {
    ensureTabsCollapseStyles();
    if (!dom.modal) return;
    let container = dom.modal.querySelector('.ctm-cr-tabs-container');
    if (!container) return;
    let shell = $id('crTabsShell');
    let toggle = $id('crTabsCollapseToggle');
    const closeCell = dom.modal.querySelector('.ctm-cr-close-cell');
    const closeBtn = $id('crBtnClose');

    if (!shell) {
      const row1 = container.querySelector('.ctm-cr-tab-row-1');
      const row2 = container.querySelector('.ctm-cr-tab-row-2');
      if (row1 || row2) {
        shell = document.createElement('div');
        shell.id = 'crTabsShell';
        shell.className = 'ctm-cr-tabs-shell';
        shell.setAttribute('role', 'tablist');
        shell.setAttribute('aria-label', 'Class Record Tabs');
        shell.setAttribute('aria-hidden', 'false');
        container.insertBefore(shell, container.firstChild);
        if (row1) shell.appendChild(row1);
        if (row2) shell.appendChild(row2);
      }
    }

    let footer = container.querySelector('.ctm-cr-tabs-footer');
    if (!footer) {
      footer = document.createElement('div');
      footer.className = 'ctm-cr-tabs-footer';
      footer.innerHTML = '<p class="ctm-cr-tabs-source"><a href="https://drive.google.com/drive/folders/13APGK-OoX_g2bWqVZ9h-iGd16DCDNa5_?usp=sharing" target="_blank" rel="noopener noreferrer">Source: DO No. 015, s. 2026 / DO No. 8, s. 2015</a></p>';
      container.appendChild(footer);
    } else {
      let source = footer.querySelector('.ctm-cr-tabs-source');
      if (!source) {
        source = document.createElement('p');
        source.className = 'ctm-cr-tabs-source';
        source.innerHTML = '<a href="https://drive.google.com/drive/folders/13APGK-OoX_g2bWqVZ9h-iGd16DCDNa5_?usp=sharing" target="_blank" rel="noopener noreferrer">Source: DO No. 015, s. 2026 / DO No. 8, s. 2015</a>';
        footer.prepend(source);
      }
      Array.from(footer.querySelectorAll('#crTabsCollapseToggle')).forEach(node => node.remove());
    }

    if (!toggle && closeCell) {
      toggle = document.createElement('button');
      toggle.id = 'crTabsCollapseToggle';
      toggle.className = 'ctm-cr-tabs-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-controls', 'crTabsShell');
      toggle.innerHTML = '<span class="ctm-cr-tabs-toggle-label">Show/Hide</span><span class="ctm-cr-tabs-toggle-icon" aria-hidden="true">∨</span>';
    }
    if (toggle && closeCell) {
      if (toggle.parentNode !== closeCell) {
        if (closeBtn && closeBtn.parentNode === closeCell) closeCell.insertBefore(toggle, closeBtn);
        else closeCell.appendChild(toggle);
      } else if (closeBtn && toggle.nextElementSibling !== closeBtn) {
        closeCell.insertBefore(toggle, closeBtn);
      }
    }

    toggle = $id('crTabsCollapseToggle');
    dom.tabsShell = $id('crTabsShell');
    dom.tabsFooter = container.querySelector('.ctm-cr-tabs-footer');
    dom.tabsCollapseToggle = toggle;
    dom.tabsCollapseLabel = toggle ? toggle.querySelector('.ctm-cr-tabs-toggle-label') : null;
    dom.tabsCollapseIcon = toggle ? toggle.querySelector('.ctm-cr-tabs-toggle-icon') : null;
    if (toggle && !toggle.dataset.boundCollapse) {
      toggle.dataset.boundCollapse = 'true';
      toggle.addEventListener('click', () => toggleTabsCollapsed());
    }
    setTabsCollapsed(readTabsCollapsedPreference(), { persist: false });
  }

  function bindTabsCollapseUi() {
    ensureTabsCollapsibleUi();
  }

function switchTab(name) {
    const visibleTerms = getVisibleTerms();
    if (['term1','term2','term3','term4'].includes(name) && !visibleTerms.includes(name)) name = visibleTerms[0] || 'final';
    state.activeTab = name;
    ensureActiveTabHighlightStyle();
    (dom.tabs || []).forEach(btn => {
      const active = btn.dataset.tab === name;
      btn.classList.toggle('active', active);
      btn.classList.toggle('primary', active);
      btn.classList.toggle('edit', !active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.setAttribute('data-active', active ? 'true' : 'false');
    });
    Object.keys(dom.panels).forEach(k => dom.panels[k].classList.toggle('active', k === name));
    if (name === 'final') refreshFinalPanelForEntry();
  }

  function refreshFinalPanelForEntry() {
    // v18.54: Score/HPS input handlers intentionally avoid full re-rendering while typing
    // to prevent mobile keyboard flicker. When the Summary tab is opened, force a safe
    // recompute and rebuild only the final/summary view so values no longer stay stale
    // until a learner row is clicked.
    recompute();
    if (!renderMapehSummaryIfNeeded()) renderFinal();
    renderAttendance();
    updateSaveEditButton();
    setStatus();
    applyMapehSummaryActionLocks();
    updateExcelButtonState();
  }

  
  function ensureG12Sy2026Controls() {
    const subjectField = $id('crSubject') && $id('crSubject').closest('.ctm-cr-field');
    const semesterField = $id('crSemester') && $id('crSemester').closest('.ctm-cr-field');
    const anchor = semesterField || subjectField;
    if (!anchor || !anchor.parentNode) return;
    if (!$id('crG12Sy2026System')) {
      const field = document.createElement('div');
      field.className = 'ctm-cr-field ctm-cr-g12-system-field';
      field.innerHTML = '<label class="ctm-cr-label" for="crG12Sy2026System">Grade 12 SY 2026-2027 System</label><select id="crG12Sy2026System"><option value="quarterSemester">Quarter / Semester</option><option value="threeTerm">Three Term</option><option value="modifiedThreeTerm">Modified Three Term</option></select>';
      anchor.parentNode.insertBefore(field, anchor.nextSibling);
    }
    const systemField = $id('crG12Sy2026System') && $id('crG12Sy2026System').closest('.ctm-cr-field');
    if (!$id('crG12DescriptorSource')) {
      const field = document.createElement('div');
      field.className = 'ctm-cr-field ctm-cr-g12-descriptor-source-field';
      field.innerHTML = '<label class="ctm-cr-label" for="crG12DescriptorSource">Grade 12 SY 2026-2027 Descriptor Source</label><select id="crG12DescriptorSource"><option value="do8-2015">DO No. 8, s. 2015 descriptors</option><option value="do015-2026">DO No. 015, s. 2026 descriptors</option></select>';
      const insertAfter = systemField || anchor;
      insertAfter.parentNode.insertBefore(field, insertAfter.nextSibling);
    }
    if (!$id('crModifiedTerm')) {
      const field = document.createElement('div');
      field.className = 'ctm-cr-field ctm-cr-modified-term-field';
      field.innerHTML = '<label class="ctm-cr-label" for="crModifiedTerm">Subject Term</label><select id="crModifiedTerm" title="Select the term where this subject belongs"><option value="term1">Term 1</option><option value="term2">Term 2</option><option value="term3">Term 3</option></select>';
      const descriptorField = $id('crG12DescriptorSource') && $id('crG12DescriptorSource').closest('.ctm-cr-field');
      const insertAfter = descriptorField || systemField || anchor;
      insertAfter.parentNode.insertBefore(field, insertAfter.nextSibling);
    }
  }



function ensureGradingFrameworkSelectOptions() {
  const el = $id('crGradingFramework');
  if (!el) return;
  const value = normalizeGradingFramework((state.recordHeader && state.recordHeader.gradingFramework) || el.value);
  const hasOfficial = Array.from(el.options || []).some(opt => opt.value === 'officialDepEd');
  const hasCustom = Array.from(el.options || []).some(opt => opt.value === 'customInstitutional');
  if (!hasOfficial || !hasCustom) {
    el.innerHTML = '<option value="officialDepEd">Official DepEd</option><option value="customInstitutional">Custom Institutional</option>';
  }
  el.value = value;
  if (el.selectedIndex < 0) el.value = 'officialDepEd';
  el.setAttribute('title', el.options[el.selectedIndex] ? el.options[el.selectedIndex].textContent : 'Grading Framework');
}
function ensureCustomInstitutionalControls() {
  const hp = $id('crPanelHeader');
  if (hp) {
    const g = hp.querySelector('.ctm-cr-compact-header, .ctm-cr-grid, .ctm-cr-form-grid') || hp;
    const frameworkHtml = `<div class="ctm-cr-field ctm-cr-custom-framework-field"><label class="ctm-cr-label" for="crGradingFramework">Grading Framework</label><select id="crGradingFramework" title="Select Official DepEd or Custom Institutional grading framework"><option value="officialDepEd">Official DepEd</option><option value="customInstitutional">Custom Institutional</option></select><div id="crCustomInstitutionalNotice" class="ctm-cr-disclaimer ctm-cr-custom-note" style="display:none;">Custom Institutional mode is not an official DepEd Class Record configuration. Use only for institutional pilot private school internal or local tracking purposes or in special cases where official policy does not apply.</div></div>`;
    const customControlsHtml = `<div id="crCustomHeaderControls" class="ctm-cr-custom-header-controls" style="display:none;"><div class="ctm-cr-form-grid ctm-cr-custom-header-grid"><div class="ctm-cr-field"><label class="ctm-cr-label" for="crCustomAcademicStructure">Academic Structure</label><select id="crCustomAcademicStructure"><option value="semester">Semester</option><option value="quarterlyYearRound">Quarterly</option><option value="trimesterContinuous">Three Term</option><option value="modifiedTrimester">Modified Three Term</option></select></div><div class="ctm-cr-field"><label class="ctm-cr-label" for="crCustomDescriptorSource">Descriptor Source</label><select id="crCustomDescriptorSource"><option value="do8-2015">DO No. 8, s. 2015 descriptors</option><option value="do015-2026">DO No. 015, s. 2026 descriptors</option></select></div><div class="ctm-cr-field"><label class="ctm-cr-label" for="crGradeConversionMethod">Grade Conversion</label><select id="crGradeConversionMethod"><option value="zeroBased">Zero Based Direct Computation</option><option value="transmutation">Transmutation</option></select></div><div class="ctm-cr-field"><label class="ctm-cr-label" for="crTransmutationTableKey">Transmutation Table</label><select id="crTransmutationTableKey"><option value="none">None Zero Based</option><option value="deped-do8-2015-appendix-b">DO No. 8, s. 2015 - Appendix B</option><option value="deped-do015-2026-adjusted">DO No. 015, s. 2026 - Adjusted Transmutation Table</option></select></div><div class="ctm-cr-field" id="crCustomActiveTermWrap" style="display:none;"><label class="ctm-cr-label" for="crCustomActiveTerm">Primary / Selected Term</label><select id="crCustomActiveTerm"><option value="term1">Term 1</option><option value="term2">Term 2</option><option value="term3">Term 3</option><option value="term4">Quarter 4</option></select></div><div class="ctm-cr-field" id="crCustomSelectedTermsWrap"><label class="ctm-cr-label">Include Term(s)</label><div class="ctm-cr-term-multiselect" role="group" aria-label="Include terms"><label><input type="checkbox" value="term1" data-cr-custom-term="term1"> Term 1</label><label><input type="checkbox" value="term2" data-cr-custom-term="term2"> Term 2</label><label><input type="checkbox" value="term3" data-cr-custom-term="term3"> Term 3</label><label><input type="checkbox" value="term4" data-cr-custom-term="term4"> Quarter 4</label><div class="ctm-cr-small ctm-cr-term-multiselect-note">Use this when the subject should appear in more than one term. For “Average Selected Terms,” only checked terms are included.</div></div></div></div></div>`;

    if (!$id('crGradingFramework')) {
      g.insertAdjacentHTML('afterbegin', frameworkHtml);
    }
    const frameworkField = $id('crGradingFramework') && $id('crGradingFramework').closest('.ctm-cr-custom-framework-field');
    if (frameworkField && frameworkField.parentElement === g && g.firstElementChild !== frameworkField) {
      g.insertBefore(frameworkField, g.firstElementChild);
    }

    if (!$id('crCustomHeaderControls')) {
      if (frameworkField && frameworkField.parentElement === g) {
        frameworkField.insertAdjacentHTML('afterend', customControlsHtml);
      } else {
        g.insertAdjacentHTML('afterbegin', customControlsHtml);
      }
    }
    const customControls = $id('crCustomHeaderControls');
    if (customControls && customControls.parentElement === g && frameworkField && frameworkField.parentElement === g && frameworkField.nextElementSibling !== customControls) {
      g.insertBefore(customControls, frameworkField.nextElementSibling);
    }
  }
  ensureGradingFrameworkSelectOptions();
  const pp = $id('crPanelPolicy');
  if (pp && !$id('crCustomPolicySetup')) {
    pp.insertAdjacentHTML('beforeend', `<div id="crCustomPolicySetup" class="ctm-cr-card" style="display:none; margin-top:.75rem;"><div class="ctm-cr-panel-title">Custom Policy Setup</div><div class="ctm-cr-form-grid">${['WW','PT','ST','TE','QE'].map(L=>`<div class="ctm-cr-field"><label class="ctm-cr-label" for="crCustom${L}Count">${L} Count</label><input id="crCustom${L}Count" type="number" min="0" max="${(L==='WW'||L==='PT')?5:2}" step="1"></div><div class="ctm-cr-field"><label class="ctm-cr-label" for="crCustom${L}Weight">${L} Weight %</label><input id="crCustom${L}Weight" type="number" min="0" max="100" step="1"></div>`).join('')}<div class="ctm-cr-field"><label class="ctm-cr-label" for="crCustomFinalRule">Final Grade Rule</label><select id="crCustomFinalRule"><option value="averageVisibleTerms">Average all visible terms</option><option value="averageSelectedTerms">Average selected/active terms only</option><option value="selectedTermOnly">Selected term only</option></select></div><div class="ctm-cr-card"><div class="ctm-cr-mini-label">Total Weight</div><div id="crCustomWeightTotal" class="ctm-cr-strong">—</div></div></div><div id="crCustomValidationNotes" class="ctm-cr-disclaimer" style="margin-top:.6rem;"></div></div>`);
  }

}
function syncCustomTermCaptionControls(structure) {
  const termWord = ['semester','quarterlyYearRound'].includes(normalizeCustomAcademicStructure(structure)) ? 'Quarter' : 'Term';
  const activeWrap = $id('crCustomActiveTermWrap');
  const activeLabel = activeWrap && activeWrap.querySelector('label');
  const activeSelect = $id('crCustomActiveTerm');
  const selectedWrap = $id('crCustomSelectedTermsWrap');
  const selectedLabel = selectedWrap && selectedWrap.querySelector(':scope > .ctm-cr-label');
  const multiselect = selectedWrap && selectedWrap.querySelector('.ctm-cr-term-multiselect');
  const note = selectedWrap && selectedWrap.querySelector('.ctm-cr-term-multiselect-note');
  const allowed = customSelectableTermsForStructure(structure);
  if (activeLabel) activeLabel.textContent = `Primary / Selected ${termWord}`;
  if (selectedLabel) selectedLabel.textContent = `Include ${termWord}(s)`;
  if (multiselect) multiselect.setAttribute('aria-label', `Include ${termWord.toLowerCase()}s`);
  if (note) note.textContent = `Use this when the subject should appear in more than one ${termWord.toLowerCase()}. For “Average Selected ${termWord}s,” only checked ${termWord.toLowerCase()}s are included.`;
  if (activeSelect) {
    allowed.forEach(termKey => {
      if (!Array.from(activeSelect.options || []).some(opt => opt.value === termKey)) activeSelect.add(new Option(getCustomTermLabel(termKey, structure), termKey));
    });
    Array.from(activeSelect.options || []).forEach(opt => {
      const allowedOpt = allowed.includes(opt.value);
      opt.textContent = getCustomTermLabel(opt.value, structure);
      opt.hidden = !allowedOpt;
      opt.disabled = !allowedOpt;
    });
  }
  document.querySelectorAll('[data-cr-custom-term]').forEach(cb => {
    const label = cb.closest('label');
    if (label) {
      let textNode = Array.from(label.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
      if (!textNode) { textNode = document.createTextNode(''); label.appendChild(textNode); }
      textNode.nodeValue = ` ${getCustomTermLabel(cb.value, structure)}`;
    }
  });
}
function renderCustomPolicyControls() { if(!state.recordHeader) return; ensureGradingFrameworkSelectOptions(); const custom=isCustomInstitutionalMode(); const ids=(id,v)=>{const el=$id(id); if(el) el.value=v??'';}; const notice=$id('crCustomInstitutionalNotice'); if(notice) notice.style.display=custom?'':'none'; const hw=$id('crCustomHeaderControls'); if(hw){ hw.style.display=custom?'':'none'; hw.classList.toggle('is-visible', custom); } const structure=normalizeCustomAcademicStructure(state.recordHeader.customAcademicStructure); if(custom && structure==='semester') { state.recordHeader.semester=getSemesterLabel(state.recordHeader.semester)||'First Semester'; const semesterTerms=getLegacySemesterTerms(state.recordHeader.semester); const currentSelected=normalizeCustomSelectedTerms(state.recordHeader.customSelectedTerms,structure,state.recordHeader.customActiveTerm); if(currentSelected.some(k=>!semesterTerms.includes(k)) || !currentSelected.some(k=>semesterTerms.includes(k))) state.recordHeader.customSelectedTerms=semesterTerms.slice(); } if(custom && structure==='quarterlyYearRound') { state.recordHeader.customSelectedTerms=['term1','term2','term3','term4']; state.recordHeader.customFinalRule='averageSelectedTerms'; } syncCustomTermCaptionControls(structure); const selected=getEffectiveCustomSummaryTerms(structure); const aw=$id('crCustomActiveTermWrap'); if(aw) aw.style.display=custom?'':'none'; const sw=$id('crCustomSelectedTermsWrap'); if(sw) sw.style.display=custom?'':'none'; const pw=$id('crCustomPolicySetup'); if(pw) pw.style.display=custom?'':'none'; ids('crGradingFramework',normalizeGradingFramework(state.recordHeader.gradingFramework)); ensureGradingFrameworkSelectOptions(); ids('crCustomAcademicStructure',structure); ids('crCustomDescriptorSource',normalizeCustomDescriptorSource(state.recordHeader.customDescriptorSource)); ids('crGradeConversionMethod',normalizeGradeConversionMethod(state.recordHeader.gradeConversionMethod)); ids('crTransmutationTableKey',normalizeTransmutationTableKey(state.recordHeader.transmutationTableKey,state.recordHeader.gradeConversionMethod)); const tt=$id('crTransmutationTableKey'); if(tt){ const m=normalizeGradeConversionMethod(state.recordHeader.gradeConversionMethod); tt.disabled = (m!=='transmutation') || (hasSavedClassRecordLoaded()&&!canEditHeaderSettings()); tt.title = m!=='transmutation' ? 'Zero Based Direct Computation uses None Zero Based.' : ''; } ids('crCustomActiveTerm',selected.includes(normalizeTermKey(state.recordHeader.customActiveTerm))?normalizeTermKey(state.recordHeader.customActiveTerm):(selected[0]||'term1')); document.querySelectorAll('[data-cr-custom-term]').forEach(cb=>{ const allowed=customSelectableTermsForStructure(structure).includes(cb.value); cb.checked=selected.includes(cb.value); cb.disabled=!allowed || structure==='quarterlyYearRound' || (hasSavedClassRecordLoaded()&&!canEditHeaderSettings()); const label=cb.closest('label'); if(label) label.style.display=allowed?'':'none'; }); ids('crCustomFinalRule',normalizeCustomFinalRule(state.recordHeader.customFinalRule,state.recordHeader.customAcademicStructure)); const fr=$id('crCustomFinalRule'); if(fr){ fr.disabled = (structure==='quarterlyYearRound') || (hasSavedClassRecordLoaded()&&!canEditHeaderSettings()); fr.title = structure==='quarterlyYearRound' ? 'Quarterly uses Quarter 1-4 year-round average.' : ''; } const c=normalizeCustomComponents(state.setupProfile&&state.setupProfile.customComponents); [['WW','ww'],['PT','pt'],['ST','st'],['TE','te'],['QE','qe']].forEach(([L,k])=>{ids(`crCustom${L}Count`,c[k].count); ids(`crCustom${L}Weight`,c[k].weight);}); const v=validateCustomPolicy({customComponents:c}); const total=$id('crCustomWeightTotal'); if(total) total.textContent=`${v.total}%`; const notes=$id('crCustomValidationNotes'); if(notes) notes.textContent=v.notes.length?v.notes.join(' '):'Custom setup valid. Total weight: 100%.'; }
function bindCustomPolicyControls() { const m={crGradingFramework:'gradingFramework',crCustomAcademicStructure:'customAcademicStructure',crCustomDescriptorSource:'customDescriptorSource',crGradeConversionMethod:'gradeConversionMethod',crTransmutationTableKey:'transmutationTableKey',crCustomActiveTerm:'customActiveTerm',crCustomFinalRule:'customFinalRule'}; Object.keys(m).forEach(id=>{const el=$id(id); if(!el||el.dataset.ctmCrCustomBound)return; el.dataset.ctmCrCustomBound='1'; const h=()=>{ if(hasSavedClassRecordLoaded()&&!canEditHeaderSettings()) return; markHeaderSettingsDirty(); state.recordHeader[m[id]]=el.value; if(id==='crGradingFramework'&&normalizeGradingFramework(el.value)==='officialDepEd') resetCustomInstitutionalStateForOfficialDepEd(); if(id==='crGradeConversionMethod'&&normalizeGradeConversionMethod(el.value)==='zeroBased') state.recordHeader.transmutationTableKey='none'; if(id==='crCustomAcademicStructure'&&isCustomInstitutionalMode()){ const nextStructure=normalizeCustomAcademicStructure(el.value); if(nextStructure==='semester') { state.recordHeader.semester=getSemesterLabel(state.recordHeader.semester)||'First Semester'; state.recordHeader.customSelectedTerms=getLegacySemesterTerms(state.recordHeader.semester); } else { state.recordHeader.semester=''; state.recordHeader.customSelectedTerms=normalizeCustomSelectedTerms(nextStructure==='quarterlyYearRound'?['term1','term2','term3','term4']:state.recordHeader.customSelectedTerms,nextStructure,state.recordHeader.customActiveTerm); } if(nextStructure==='quarterlyYearRound') { state.recordHeader.customSelectedTerms=['term1','term2','term3','term4']; state.recordHeader.customFinalRule='averageSelectedTerms'; } } if(id==='crCustomActiveTerm'){ const active=normalizeTermKey(el.value); const selected=normalizeCustomSelectedTerms(state.recordHeader.customSelectedTerms,state.recordHeader.customAcademicStructure,active); if(!selected.includes(active)) selected.push(active); state.recordHeader.customSelectedTerms=selected; } state.recordHeader.customPolicyEnabled=isCustomInstitutionalMode(); recompute(); render();}; el.addEventListener('input',h); el.addEventListener('change',h);}); document.querySelectorAll('[data-cr-custom-term]').forEach(cb=>{ if(!cb||cb.dataset.ctmCrCustomBound)return; cb.dataset.ctmCrCustomBound='1'; const h=()=>{ if(hasSavedClassRecordLoaded()&&!canEditHeaderSettings()) return; markHeaderSettingsDirty(); const structure=normalizeCustomAcademicStructure(state.recordHeader.customAcademicStructure); const allowed=customSelectableTermsForStructure(structure); let selected=Array.from(document.querySelectorAll('[data-cr-custom-term]:checked')).map(x=>x.value).filter(v=>allowed.includes(v)); if(!selected.length) selected=[normalizeTermKey(state.recordHeader.customActiveTerm)]; selected=normalizeCustomSelectedTerms(selected,structure,state.recordHeader.customActiveTerm); state.recordHeader.customSelectedTerms=selected; if(!selected.includes(normalizeTermKey(state.recordHeader.customActiveTerm))) state.recordHeader.customActiveTerm=selected[0]||'term1'; state.recordHeader.customPolicyEnabled=isCustomInstitutionalMode(); recompute(); render();}; cb.addEventListener('change',h); }); [['WW','ww'],['PT','pt'],['ST','st'],['TE','te'],['QE','qe']].forEach(([L,k])=>['Count','Weight'].forEach(kind=>{const el=$id(`crCustom${L}${kind}`); if(!el||el.dataset.ctmCrCustomBound)return; el.dataset.ctmCrCustomBound='1'; const h=()=>{state.setupProfile.customComponents=normalizeCustomComponents(state.setupProfile.customComponents); state.setupProfile.customComponents[k][kind.toLowerCase()]=num(el.value)==null?0:Number(el.value); markHeaderSettingsDirty(); recompute(); render();}; el.addEventListener('input',h); el.addEventListener('change',h);})); }
function applyCustomHeaderLockState(){ const locked=hasSavedClassRecordLoaded()&&!canEditHeaderSettings(); ['crG12DescriptorSource','crGradingFramework','crCustomAcademicStructure','crGradeConversionMethod','crTransmutationTableKey','crCustomActiveTerm','crCustomFinalRule','crCustomWWCount','crCustomWWWeight','crCustomPTCount','crCustomPTWeight','crCustomSTCount','crCustomSTWeight','crCustomTECount','crCustomTEWeight','crCustomQECount','crCustomQEWeight'].forEach(id=>{const el=$id(id); if(el) el.disabled=locked;}); document.querySelectorAll('[data-cr-custom-term]').forEach(el=>{ if(el) el.disabled=locked; }); }
function cacheDom() {
    ensureG12Sy2026Controls();
    ensureCustomInstitutionalControls();
    dom.modal = $id('classRecordModal'); dom.recordPicker = $id('crRecordPicker'); dom.cancelEditButton = $id('crBtnCancelEdit'); dom.viewExcelButton = $id('crBtnViewExcel'); dom.recordStatus = $id('crRecordStatus'); dom.flash = $id('crFlash'); dom.topClassName = $id('crTopClassName'); dom.topSubject = $id('crTopSubject'); dom.topSchoolYear = $id('crTopSchoolYear'); dom.tabs = Array.from(document.querySelectorAll('.ctm-cr-tab')); dom.panels = { header:$id('crPanelHeader'), policy:$id('crPanelPolicy'), term1:$id('crPanelTerm1'), term2:$id('crPanelTerm2'), term3:$id('crPanelTerm3'), term4:$id('crPanelTerm4'), final:$id('crPanelFinal'), attendance:$id('crPanelAttendance') }; dom.headerInputs = { schoolName:$id('crSchoolName'), schoolYear:$id('crSchoolYear'), gradeLevel:$id('crGradeLevel'), section:$id('crSection'), semester:$id('crSemester'), teacherName:$id('crTeacher'), schoolId:$id('crSchoolId'), district:$id('crDistrict'), division:$id('crDivision'), region:$id('crRegion'), subjectGroup:$id('crSubjectGroup'), subject:$id('crSubject'), recordLabel:$id('crRecordLabel'), g12Sy2026System:$id('crG12Sy2026System'), g12DescriptorSource:$id('crG12DescriptorSource'), modifiedTerm:$id('crModifiedTerm'), gradingFramework:$id('crGradingFramework'), customAcademicStructure:$id('crCustomAcademicStructure'), customActiveTerm:$id('crCustomActiveTerm'), customFinalRule:$id('crCustomFinalRule'), gradeConversionMethod:$id('crGradeConversionMethod'), transmutationTableKey:$id('crTransmutationTableKey'), keyStage:$id('crKeyStage') }; dom.policy = { mode:$id('crResolvedMode'), table:$id('crResolvedTable'), numericMode:$id('crResolvedNumericMode'), transition:$id('crResolvedTransition'), ww:$id('crWeightWW'), pt:$id('crWeightPT'), ex:$id('crWeightEX'), hasTE:$id('crHasTE'), countWW:$id('crCountWW'), countPT:$id('crCountPT'), countST:$id('crCountST'), useDescriptors:$id('crUseDescriptors'), notes:$id('crPolicyNotes') }; dom.finalTable = $id('crFinalTable'); dom.finalBody = document.querySelector('#crFinalTable tbody'); dom.attBody = document.querySelector('#crAttendanceTable tbody'); dom.finalClassAverage = $id('crFinalClassAverage'); dom.finalPassingCount = $id('crFinalPassingCount'); dom.finalNonPassingCount = $id('crFinalNonPassingCount'); dom.finalTableUsed = $id('crFinalTableUsed'); dom.tabsFooter = dom.modal ? dom.modal.querySelector('.ctm-cr-tabs-footer') : null; } ensureActiveTabHighlightStyle(); (dom.tabs || []).forEach(btn => { if (!btn.hasAttribute('role')) btn.setAttribute('role', 'tab'); if (!btn.hasAttribute('aria-selected')) btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false'); if (!btn.hasAttribute('data-active')) btn.setAttribute('data-active', btn.classList.contains('active') ? 'true' : 'false'); });

  function applyTermVisibility() {
    const custom = isCustomInstitutionalMode();
    const noContinuityG12 = isOfficialDepEdG12Sy2026NoContinuity();
    const legacy = !custom && isLegacyGrade12SemesterLayout() && !noContinuityG12;
    const threeTerm = !custom && isG12ThreeTermLayout() && !noContinuityG12;
    const modified = !custom && isG12ModifiedThreeTermLayout() && !noContinuityG12;
    const visibleTerms = getVisibleTerms();
    ['term1','term2','term3','term4'].forEach(termKey => {
      const tab = document.querySelector(`.ctm-cr-tab[data-tab="${termKey}"]`);
      const panel = dom.panels[termKey];
      const visible = visibleTerms.includes(termKey);
      if (tab) {
        tab.style.display = visible ? '' : 'none';
        tab.textContent = modified ? getModifiedSubjectTabLabel(termKey) : getTermLabel(termKey);
        tab.title = modified ? `${getModifiedSubjectTabLabel(termKey)} belongs to ${TERM_LABELS[termKey] || termKey}` : getTermLabel(termKey);
      }
      if (panel && !visible && state.activeTab !== termKey) panel.style.display = 'none';
      else if (panel) panel.style.display = '';
    });
    const finalTab = document.querySelector('.ctm-cr-tab[data-tab="final"]');
    if (finalTab) finalTab.textContent = legacy ? `${getSemesterLabel() || 'Semester'} Final Grade` : 'Summary';
    const finalTitle = dom.panels.final && dom.panels.final.querySelector('.ctm-cr-panel-title');
    if (finalTitle) finalTitle.textContent = legacy ? `${getSemesterLabel() || 'Semester'} Final Grade Summary` : 'Summary';
    const finalNote = dom.panels.final && dom.panels.final.querySelector('.ctm-cr-disclaimer');
    if (finalNote) {
      if (custom) {
        const structure = normalizeCustomAcademicStructure(state.recordHeader && state.recordHeader.customAcademicStructure);
        const rule = normalizeCustomFinalRule(state.recordHeader && state.recordHeader.customFinalRule, structure);
        const labels = customTermKeysForFinal().map(getTermLabel).join(', ') || 'none';
        finalNote.textContent = `${structure === 'semester' ? 'Semester' : (structure === 'quarterlyYearRound' ? 'Quarterly' : (structure === 'modifiedTrimester' ? 'Modified Three Term' : 'Three Term'))} Summary. Final Grade Rule: ${rule === 'selectedTermOnly' ? 'Selected Term Only' : (rule === 'averageSelectedTerms' ? 'Average Selected Terms' : 'Average Visible Terms')}. Included term(s): ${labels}.`;
      } else {
        finalNote.textContent = legacy
          ? (getSemesterLabel() === 'Second Semester'
              ? 'Second Semester subject record based on Quarter 3 and Quarter 4. Final Grade = average of Quarter 3 and Quarter 4.'
              : 'First Semester subject record based on Quarter 1 and Quarter 2. Final Grade = average of Quarter 1 and Quarter 2.')
          : (modified
              ? `Modified Three Term: this subject belongs to ${TERM_LABELS[visibleTerms[0]] || visibleTerms[0]}. Final Grade = selected term grade; other terms are NA/excluded.`
              : (threeTerm
                  ? 'Three Term Summary based on Term 1, Term 2, and Term 3. Quarter 4 is preserved but NA/excluded.'
                  : (noContinuityG12
                      ? 'Final Grade Summary based on Term 1 only. No subject continuity to succeeding terms.'
                      : 'Final Grade Summary based on the selected Grade 12 SY 2026-2027 grading system.')));
      }
    }
    if (['term1','term2','term3','term4'].includes(state.activeTab) && !visibleTerms.includes(state.activeTab)) state.activeTab = visibleTerms[0] || 'final';
  }

  function appendStyles() {
    if ($id('ctmClassRecordStyles')) return;
    const style = document.createElement('style');
    style.id = 'ctmClassRecordStyles';
    style.textContent = `#classRecordModal{position:fixed;inset:0;padding:0!important;overflow:hidden;background:rgba(15,23,42,.45)}#classRecordModal .ctm-cr-modal-content{width:min(1200px,100vw);max-width:min(1200px,100vw)!important;height:100vh;max-height:100vh;overflow:auto;box-sizing:border-box;margin:0 auto;border-radius:0;padding:1rem clamp(.75rem,1.3vw,1.1rem) 1rem;background:#fff}@supports (height:100dvh){#classRecordModal .ctm-cr-modal-content{height:100dvh;max-height:100dvh}}.ctm-cr-sticky-shell{position:sticky;top:0;z-index:30;background:#fff;padding-bottom:.65rem;box-shadow:0 1px 0 #e8ecf4}.section-lite{background:#fafbff;border:1px solid #e8ecf4;border-radius:14px;padding:.85rem;margin:.85rem 0}.ctm-cr-topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:.75rem;flex-wrap:nowrap;margin-bottom:.55rem;position:relative}.ctm-cr-topbar-actions{display:flex;gap:.5rem;flex-wrap:wrap}.ctm-cr-close-actions{margin-left:auto;justify-content:flex-end;align-items:flex-start;flex:0 0 auto}.ctm-cr-close-btn{min-width:2.25rem;min-height:2.15rem;padding:.25rem .6rem!important;line-height:1;font-weight:800;border-radius:999px}.ctm-cr-subtitle{color:#667;font-size:.92rem;display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.25rem}.ctm-cr-disclaimer{background:#fafbff;border:1px solid #e8ecf4;border-radius:12px;padding:.55rem .75rem;color:#475569;font-size:.88rem}.ctm-cr-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.45rem;margin:.7rem 0 .55rem}.ctm-cr-tab{width:100%;min-height:2.25rem;padding:.38rem .5rem;font-size:.84rem;line-height:1.15;display:flex;align-items:center;justify-content:center;text-align:center}.ctm-cr-panel{display:none}.ctm-cr-panel.active{display:block}.ctm-cr-tab.active{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}.ctm-cr-grid{display:grid;gap:.75rem;width:100%}.ctm-cr-grid-4{grid-template-columns:repeat(4,minmax(0,1fr))}.ctm-cr-manager-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.ctm-cr-manager-actions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.5rem}.ctm-cr-manager-actions button{width:100%;min-width:0}.ctm-cr-field{display:flex;flex-direction:column;gap:.3rem}.ctm-cr-field.span-2{grid-column:span 2}.ctm-cr-label{font-weight:600;color:#334155}.ctm-cr-mini-label{font-size:.82rem;color:#64748b}.ctm-cr-strong{font-weight:700}.ctm-cr-card{background:#fff;border:1px solid #e8ecf4;border-radius:14px;padding:.8rem}.ctm-cr-panel-title{font-weight:600;margin-bottom:.75rem;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.ctm-cr-flash{position:fixed;top:max(12px,calc(env(safe-area-inset-top,0px) + 12px));left:50%;transform:translateX(-50%);z-index:3005;width:min(420px,calc(100vw - 24px));max-width:420px;box-sizing:border-box;display:none;padding:12px 14px;border-radius:14px;border:1px solid rgba(15,23,42,.08);background:#fff;color:#1f2937;text-align:left;box-shadow:0 12px 32px rgba(15,23,42,.22);animation:ctmCrFlashSlideIn .18s ease-out;pointer-events:auto}.ctm-cr-flash .ctm-cr-flash-inner{display:flex;align-items:flex-start;gap:10px}.ctm-cr-flash .ctm-cr-flash-body{flex:1 1 auto;min-width:0;line-height:1.45;font-size:.92rem;font-weight:600;word-break:break-word}.ctm-cr-flash .ctm-cr-flash-close{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;min-width:28px;height:28px;min-height:28px;padding:0;border:none;border-radius:999px;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;opacity:.82}.ctm-cr-flash .ctm-cr-flash-close:hover,.ctm-cr-flash .ctm-cr-flash-close:focus-visible{opacity:1;outline:none;background:rgba(255,255,255,.18)}.ctm-cr-flash.info{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.ctm-cr-flash.success{background:#ecfdf5;color:#047857;border-color:#a7f3d0}.ctm-cr-flash.error{background:#fef2f2;color:#b91c1c;border-color:#fecaca}.ctm-cr-flash.warning{background:#fffbeb;color:#b45309;border-color:#fde68a}@keyframes ctmCrFlashSlideIn{from{opacity:0;transform:translateX(-50%) translateY(-8px) scale(.985)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}@keyframes ctmCrFlashSlideInMobile{from{opacity:0;transform:translateY(-8px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}@media (max-width:600px){.ctm-cr-flash{width:auto;max-width:none;left:12px;right:12px;transform:none;animation-name:ctmCrFlashSlideInMobile}}.ctm-cr-status-pill{padding:.65rem .75rem;background:#eef2ff;border-radius:12px;font-size:.92rem}.ctm-cr-table{width:100%;border-collapse:collapse;background:#fff}.ctm-cr-table th,.ctm-cr-table td{padding:.45rem .4rem;border-bottom:1px solid #e8ecf4;font-size:.8rem;vertical-align:top}.ctm-cr-table th{position:sticky;top:0;background:linear-gradient(135deg,#f0f4ff,#e8f0ff);z-index:5}.ctm-cr-table input,.ctm-cr-table select,.ctm-cr-table textarea{width:100%;box-sizing:border-box;padding:.55rem .7rem;font-size:.92rem}.ctm-cr-table textarea{min-height:2.6rem;resize:vertical}.ctm-cr-term-shell{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.85rem}.ctm-cr-hps-grid,.ctm-cr-score-grid,.ctm-cr-meta-grid{display:grid;gap:.55rem}.ctm-cr-hps-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.ctm-cr-score-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ctm-cr-meta-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.ctm-cr-learner-card{background:linear-gradient(135deg,#ffecd2,#fcb69f);border-radius:18px;padding:1rem;border:1px solid rgba(0,0,0,.06)}.ctm-cr-nav{display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin-bottom:.75rem}.ctm-cr-nav-center{text-align:center;flex:1}.ctm-cr-status-tag{display:inline-block;padding:.22rem .45rem;border-radius:999px;font-size:.72rem;font-weight:700;background:#eef2ff;color:#334155}.ctm-cr-status-tag.warn{background:#fef3c7;color:#92400e}.ctm-cr-status-tag.bad{background:#fee2e2;color:#991b1b}.ctm-cr-pill-list{display:flex;gap:.35rem;flex-wrap:wrap}.ctm-cr-chip{display:inline-flex;align-items:center;gap:.35rem;padding:.28rem .5rem;border-radius:999px;background:#f8fafc;border:1px solid #e2e8f0;font-size:.78rem}.ctm-cr-attendance-summary{margin:.75rem 0}.ctm-cr-attendance-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.3rem .75rem;align-items:start;min-width:0;padding:.35rem 0;border-top:1px solid rgba(255,255,255,.35)}.ctm-cr-attendance-row:first-of-type{border-top:none;padding-top:0}.ctm-cr-attendance-term{font-weight:700;font-size:.8rem;white-space:nowrap;align-self:start;padding-top:.15rem}.ctm-cr-attendance-body{min-width:0}.ctm-cr-attendance-counts{display:flex;gap:.3rem;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;min-width:0;-webkit-overflow-scrolling:touch;scrollbar-width:thin}.ctm-cr-attendance-chip{display:inline-flex;align-items:center;gap:.22rem;padding:.18rem .42rem;border-radius:999px;background:#fff8ed;border:1px solid rgba(0,0,0,.08);font-size:.72rem;line-height:1.2;white-space:nowrap;flex:0 0 auto}.ctm-cr-attendance-chip b{font-weight:800}.ctm-cr-list{display:grid;gap:.5rem}.ctm-cr-learner-mini{display:grid;grid-template-columns:auto 1fr auto;gap:.55rem;align-items:center;padding:.55rem .65rem;border:1px solid #e8ecf4;border-radius:12px;background:#fff}.ctm-cr-learner-mini.active{border-color:#667eea;background:#eef2ff}.ctm-cr-learner-mini button{padding:.25rem .45rem;font-size:.78rem}.ctm-cr-cell-bad{border-color:#dc2626!important;background:#fff5f5!important}.ctm-cr-score-disabled label{color:#64748b!important}.ctm-cr-score-disabled input:disabled{background:#eef2f7!important;color:#64748b!important;border-color:#cbd5e1!important;cursor:not-allowed;opacity:.9}.ctm-cr-muted{color:#64748b}.ctm-cr-small{font-size:.78rem}.ctm-cr-actions{display:flex;gap:.5rem;flex-wrap:wrap}.table-scroll{overflow:auto}#classRecordModal #crPanelFinal.ctm-cr-panel,#classRecordModal #crPanelFinal.ctm-cr-panel.active,#classRecordModal .ctm-cr-summary-table{min-width:0}#classRecordModal .ctm-cr-final-scroll,#classRecordModal #crFinalTableScroll{width:100%;min-width:0;overflow:auto;overflow-x:auto;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-gutter:stable both-edges;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,.08);background:#fff;margin:.75rem 0 0;min-height:220px;height:clamp(220px,46vh,420px);max-height:min(46vh,420px)}#classRecordModal #crFinalTable{width:max-content;min-width:auto;max-width:none;table-layout:auto;border-collapse:collapse;margin:0;box-shadow:none;border-radius:0;overflow:visible;background:#fff}#classRecordModal #crFinalTable th,#classRecordModal #crFinalTable td{padding:.5rem .375rem;font-size:.75rem;border-bottom:1px solid #e8ecf4;vertical-align:middle;white-space:nowrap}#classRecordModal #crFinalTable th{background:linear-gradient(135deg,#f0f4ff,#e8f0ff);font-weight:700}#classRecordModal #crFinalTable thead th{position:sticky;top:0;z-index:20;background:linear-gradient(135deg,#f0f4ff,#e8f0ff);background-clip:padding-box;box-shadow:0 1px 0 rgba(0,0,0,.08)}.ctm-cr-final-row{cursor:pointer;transition:background-color .15s ease}#classRecordModal #crFinalTable tbody tr:hover,.ctm-cr-final-row:hover{background:rgba(102,126,234,.08)}#classRecordModal #crFinalTable tbody tr.is-selected:hover,#classRecordModal #crFinalTable tbody tr[aria-selected="true"]:hover{background:rgba(102,126,234,.20)}#classRecordModal #crFinalTable tbody tr.is-selected,#classRecordModal #crFinalTable tbody tr[aria-selected="true"]{background:rgba(102,126,234,.16);outline:2px solid rgba(102,126,234,.32);outline-offset:-2px}#classRecordModal #crFinalTable tbody tr.is-selected td:nth-child(2),#classRecordModal #crFinalTable tbody tr[aria-selected="true"] td:nth-child(2){font-weight:700}.ctm-cr-final-row:focus,#classRecordModal #crFinalTable tbody tr:focus-visible{outline:2px solid rgba(102,126,234,.48);outline-offset:-2px}#classRecordModal #crFinalTable th:nth-child(1),#classRecordModal #crFinalTable td:nth-child(1),#classRecordModal #crFinalTable th:nth-child(3),#classRecordModal #crFinalTable td:nth-child(3),#classRecordModal #crFinalTable th:nth-child(4),#classRecordModal #crFinalTable td:nth-child(4),#classRecordModal #crFinalTable th:nth-child(5),#classRecordModal #crFinalTable td:nth-child(5),#classRecordModal #crFinalTable th:nth-child(6),#classRecordModal #crFinalTable td:nth-child(6){width:1%;text-align:center;white-space:nowrap}#classRecordModal #crFinalTable th:nth-child(2),#classRecordModal #crFinalTable td:nth-child(2){min-width:12rem;max-width:18rem;white-space:normal;word-break:break-word;text-align:left}#classRecordModal #crFinalTable th:nth-child(7),#classRecordModal #crFinalTable td:nth-child(7){min-width:9rem;white-space:normal;word-break:break-word;text-align:left}#classRecordModal #crFinalTable th:nth-child(n+8),#classRecordModal #crFinalTable td:nth-child(n+8){min-width:12rem;white-space:normal;word-break:break-word;text-align:left}@media (max-width:980px){#classRecordModal .ctm-cr-modal-content{padding:.85rem}.ctm-cr-tabs{grid-template-columns:repeat(4,minmax(0,1fr))}.ctm-cr-grid-4,.ctm-cr-meta-grid,.ctm-cr-term-shell,.ctm-cr-hps-grid,.ctm-cr-score-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ctm-cr-manager-grid{grid-template-columns:1fr}.ctm-cr-manager-actions{grid-template-columns:repeat(3,minmax(0,1fr))}.ctm-cr-field.span-2{grid-column:span 1}}@media (max-width:640px){.ctm-cr-topbar{flex-wrap:wrap}.ctm-cr-close-actions{width:100%}.ctm-cr-close-actions .ctm-cr-close-btn{margin-left:auto}.ctm-cr-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}.ctm-cr-manager-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.ctm-cr-grid-4,.ctm-cr-meta-grid,.ctm-cr-term-shell,.ctm-cr-hps-grid,.ctm-cr-score-grid{grid-template-columns:1fr}.ctm-cr-nav{gap:.35rem}.ctm-cr-nav button{padding:.45rem .55rem}.ctm-cr-attendance-row{grid-template-columns:1fr}.ctm-cr-attendance-counts{gap:.25rem}.ctm-cr-table input,.ctm-cr-table select,.ctm-cr-table textarea{font-size:.95rem}#classRecordModal .ctm-cr-final-scroll,#classRecordModal #crFinalTableScroll{min-height:200px;height:clamp(200px,42vh,380px);max-height:min(42vh,380px)}#classRecordModal #crFinalTable th,#classRecordModal #crFinalTable td{padding:.4rem .25rem;font-size:.65rem}#classRecordModal #crFinalTable{width:max-content}#classRecordModal #crFinalTable th:nth-child(2),#classRecordModal #crFinalTable td:nth-child(2){min-width:10rem;max-width:14rem}#classRecordModal #crFinalTable th:nth-child(7),#classRecordModal #crFinalTable td:nth-child(7),#classRecordModal #crFinalTable th:nth-child(n+8),#classRecordModal #crFinalTable td:nth-child(n+8){min-width:9rem}}`;
    style.textContent += `.ctm-cr-section-card{background:#fff;border:1px solid #e8ecf4;border-radius:14px;padding:.85rem;box-sizing:border-box}.ctm-cr-section-heading{font-size:.82rem;font-weight:700;color:#334155}.ctm-cr-section-note{margin-top:.28rem;font-size:.78rem;color:#64748b;line-height:1.45}.ctm-cr-term-layout,.ctm-cr-summary-layout{display:flex;flex-wrap:wrap;gap:10px 12px;margin-top:.75rem;align-items:stretch}.ctm-cr-term-layout>.ctm-cr-section-card,.ctm-cr-summary-layout>.ctm-cr-section-card{flex:1 1 280px;min-width:260px}.ctm-cr-term-layout>.ctm-cr-term-editor,.ctm-cr-summary-layout>.ctm-cr-summary-table{flex:2 1 420px;min-width:320px}.ctm-cr-term-layout>.ctm-cr-term-roster{flex:1 1 240px}.ctm-cr-form-grid{display:grid;gap:10px 12px;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}.ctm-cr-term-entry-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}.ctm-cr-roster-list{display:grid;gap:.5rem;max-height:min(48vh,420px);overflow:auto;padding-right:.15rem}.ctm-cr-roster-list .ctm-cr-learner-mini{width:100%;border:none;text-align:left;cursor:pointer;background:#fff}.ctm-cr-roster-list .ctm-cr-learner-mini .ctm-cr-chip{margin-left:auto}.ctm-cr-roster-list .ctm-cr-learner-mini.active .ctm-cr-chip{background:#667eea;color:#fff;border-color:#667eea}.ctm-cr-compact-cards-tight{gap:8px 10px}.ctm-cr-compact-cards-tight .ctm-cr-card{min-width:160px}.ctm-cr-learner-card{background:#fff;border:1px solid #e8ecf4;border-radius:14px;padding:.85rem}.ctm-cr-learner-picker-inline{margin:0 0 .35rem 0;width:100%}.ctm-cr-learner-picker-inline select{width:100%}.ctm-cr-nav-center .ctm-cr-learner-picker-inline{margin:0 0 .35rem 0;width:100%}.ctm-cr-nav-center .ctm-cr-learner-picker-inline select{width:100%}.ctm-cr-hps-grid,.ctm-cr-score-grid,.ctm-cr-meta-grid{grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}.ctm-cr-summary-detail textarea,.ctm-cr-term-editor textarea{width:100%;box-sizing:border-box;padding:.55rem .7rem;font-size:.92rem;resize:vertical}.ctm-cr-summary-detail textarea[readonly]{background:#f8fafc}.ctm-cr-term-layout .ctm-cr-field input,.ctm-cr-term-layout .ctm-cr-field select,.ctm-cr-term-layout .ctm-cr-field textarea,.ctm-cr-summary-layout .ctm-cr-field input,.ctm-cr-summary-layout .ctm-cr-field select,.ctm-cr-summary-layout .ctm-cr-field textarea{width:100%;box-sizing:border-box;padding:4px 8px;font-size:.85rem;border:1px solid #ccc;border-radius:4px}.ctm-cr-term-layout .ctm-cr-field label,.ctm-cr-summary-layout .ctm-cr-field label{font-size:.75rem;font-weight:600;color:#555;margin-bottom:3px}.ctm-cr-term-layout .ctm-cr-field,.ctm-cr-summary-layout .ctm-cr-field{display:flex;flex-direction:column}.ctm-cr-summary-layout .ctm-cr-card,.ctm-cr-term-layout .ctm-cr-card{min-width:140px}@media (max-width:700px){.ctm-cr-term-layout,.ctm-cr-summary-layout{gap:8px}.ctm-cr-term-layout>.ctm-cr-section-card,.ctm-cr-summary-layout>.ctm-cr-section-card{min-width:100%}}`;
    style.textContent += `
/* ===== Summary compactness patch v4 (UI-only; logic/compat unchanged) ===== */
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid {
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px 10px !important;
  width: 100%;
  align-items: stretch;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-field,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-card {
  min-width: 0 !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card {
  padding: .55rem .65rem !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-field,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-card {
  grid-column: span 1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-computation-card {
  grid-column: 1 / -1 !important;
  width: 100%;
  max-width: 100%;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-computation-card .ctm-cr-strong {
  overflow-wrap: anywhere;
  word-break: break-word;
}
#classRecordModal #crPanelFinal .ctm-cr-selected-learner-title {
  display: block;
  margin-top: .28rem;
  font-size: clamp(1rem, 1.65vw, 1.18rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-strong {
  line-height: 1.18;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card {
  display: flex;
  flex-direction: column;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: .85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 52px;
  resize: vertical;
  background: #f8fafc;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid textarea {
  width: 100%;
  box-sizing: border-box;
  padding: .55rem .7rem;
  font-size: .92rem;
  resize: vertical;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid textarea[readonly] {
  background: #f8fafc;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-mini-label,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-mini-label,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-field label {
  font-size: 0.66rem;
  line-height: 1.08;
  margin-bottom: 2px;
  letter-spacing: -0.01em;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-strong,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-strong {
  font-size: 0.88rem;
}
/* Auto-fill partial last row in 5-column summary grids */
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):last-child {
  grid-column: 1 / -1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):nth-last-child(2) {
  grid-column: span 3;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):nth-last-child(2) + * {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):nth-last-child(3),
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):nth-last-child(3) + * {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4),
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4),
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > :nth-child(5n + 1):nth-last-child(4) {
  grid-column: span 2;
}
@media (max-width: 640px) {
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-mini-label,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-mini-label,
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-field label {
    font-size: .60rem !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-card,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-card {
    padding: .46rem .5rem !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-strong,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-strong {
    font-size: .76rem !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card textarea {
    padding: 2px 4px;
    min-height: 46px;
    font-size: .72rem;
    border-radius: 3px;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-field,
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-card {
    grid-column: 1 / -1 !important;
  }
}
`;
    style.textContent += `
/* ===== Summary compactness patch v5 (UI-only; logic/compat unchanged) ===== */
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 8px 10px !important;
  width: 100%;
  align-items: stretch;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card {
  min-width: 0 !important;
  padding: .55rem .65rem !important;
  grid-column: span 1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card.ctm-cr-summary-row2-half {
  grid-column: span 2 !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):last-child {
  grid-column: 1 / -1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):nth-last-child(2):not(.ctm-cr-summary-row2-half) {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):nth-last-child(2):not(.ctm-cr-summary-row2-half) + .ctm-cr-card:not(.ctm-cr-summary-row2-half) {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):nth-last-child(3),
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):nth-last-child(3) + .ctm-cr-card {
  grid-column: span 1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid > .ctm-cr-card:nth-child(4n + 1):nth-last-child(3) {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 8px 10px !important;
  width: 100%;
  align-items: stretch;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card {
  min-width: 0 !important;
  padding: .55rem .65rem !important;
  grid-column: span 1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(3n + 1):last-child {
  grid-column: 1 / -1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(3n + 1):nth-last-child(2) {
  grid-column: span 2;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid > .ctm-cr-card:nth-child(3n + 1):nth-last-child(2) + .ctm-cr-card {
  grid-column: span 1;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 8px !important;
  width: 100%;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-field,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid > .ctm-cr-card {
  grid-column: 1 / -1 !important;
  min-width: 0 !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card {
  display: flex;
  flex-direction: column;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card textarea,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid textarea {
  width: 100%;
  box-sizing: border-box;
  padding: .55rem .7rem;
  font-size: .92rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 52px;
  resize: vertical;
  background: #f8fafc;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-mini-label,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-mini-label,
#classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-field label {
  font-size: 0.66rem;
  line-height: 1.08;
  margin-bottom: 2px;
  letter-spacing: -0.01em;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-strong,
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-strong {
  font-size: 0.88rem;
  line-height: 1.18;
}
@media (max-width: 640px) {
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-card,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-card {
    padding: .46rem .5rem !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-mini-label,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-mini-label,
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid .ctm-cr-field label {
    font-size: .60rem !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-top-grid .ctm-cr-strong,
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-strong {
    font-size: .76rem !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-grid .ctm-cr-summary-remarks-card textarea,
  #classRecordModal #crPanelFinal .ctm-cr-summary-detail-grid textarea {
    padding: 2px 4px;
    min-height: 46px;
    font-size: .72rem;
    border-radius: 3px;
  }
}
`;
    style.textContent += `
/* ===== Summary learner-row order patch v6 (UI-only; logic/compat unchanged) ===== */
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 8px 10px !important;
  width: 100%;
  align-items: stretch;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row.row-count-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row.row-count-1 {
  grid-template-columns: 1fr !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row > .ctm-cr-card {
  min-width: 0 !important;
  padding: .55rem .65rem !important;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row .ctm-cr-summary-input {
  width: 100%;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: .85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 30px;
  height: 30px;
  background: #f8fafc;
}
#classRecordModal #crPanelFinal .ctm-cr-summary-selected-row .ctm-cr-summary-input[readonly] {
  color: inherit;
}
@media (max-width: 640px) {
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-row {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-row.row-count-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-row.row-count-1 {
    grid-template-columns: 1fr !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-row > .ctm-cr-card {
    padding: .46rem .5rem !important;
  }
  #classRecordModal #crPanelFinal .ctm-cr-summary-selected-row .ctm-cr-summary-input {
    padding: 2px 4px;
    min-height: 26px;
    height: 26px;
    font-size: .72rem;
    border-radius: 3px;
  }
}
`;
    style.textContent += `

/* ===== Term / Quarter compactness patch v4 (fixed 4x2 cards; UI-only; logic/compat unchanged) ===== */
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  grid-template-rows: repeat(2, minmax(0, auto));
  grid-auto-flow: row;
  gap: 6px 8px !important;
  align-items: stretch;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards > .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4) {
  grid-column: span 1 !important;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-card {
  min-width: 0 !important;
  padding: .42rem .52rem !important;
  border-radius: 11px !important;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-mini-label,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-mini-label {
  font-size: .61rem !important;
  line-height: 1.04;
  margin: 0;
  white-space: normal;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-strong,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-strong {
  font-size: .76rem !important;
  font-weight: 500 !important;
  line-height: 1.14;
  margin: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}
@media (max-width: 640px) {
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight),
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    grid-template-rows: repeat(2, minmax(0, auto));
    gap: 5px 6px !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-card,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-card {
    padding: .38rem .45rem !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-mini-label,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-mini-label {
    font-size: .58rem !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards .ctm-cr-strong,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight .ctm-cr-strong {
    font-size: .71rem !important;
  }
}
`;
    style.textContent += `

/* ===== Term / Quarter compactness patch v5 (4x2 summary cards + 1-column notes; UI-only; logic/compat unchanged) ===== */
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight):not(.ctm-cr-term-notes-stack),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  grid-template-rows: repeat(2, minmax(0, auto));
  grid-auto-flow: row;
  gap: 6px 8px !important;
  align-items: stretch;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):last-child,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(2) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(3) + .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4),
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) > .ctm-cr-card:nth-child(5n + 1):nth-last-child(4) {
  grid-column: span 1 !important;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-card,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-card {
  min-width: 0 !important;
  padding: .42rem .52rem !important;
  border-radius: 11px !important;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-mini-label,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-mini-label {
  font-size: .61rem !important;
  line-height: 1.04;
  margin: 0;
  white-space: normal;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-strong,
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-strong {
  font-size: .76rem !important;
  font-weight: 500 !important;
  line-height: 1.14;
  margin: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-term-notes-stack {
  display: grid !important;
  grid-template-columns: 1fr !important;
  grid-template-rows: none !important;
  gap: 8px !important;
  width: 100%;
  align-items: stretch;
}
#classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-term-notes-stack > .ctm-cr-card {
  grid-column: 1 / -1 !important;
  width: 100%;
  min-width: 0 !important;
}
@media (max-width: 640px) {
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-compact-cards-tight):not(.ctm-cr-term-notes-stack),
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    grid-template-rows: repeat(2, minmax(0, auto));
    gap: 5px 6px !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-card,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-card {
    padding: .38rem .45rem !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-mini-label,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-mini-label {
    font-size: .58rem !important;
  }
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards:not(.ctm-cr-term-notes-stack) .ctm-cr-strong,
  #classRecordModal .ctm-cr-panel[id^="crPanelTerm"] .ctm-cr-compact-cards-tight:not(.ctm-cr-term-notes-stack) .ctm-cr-strong {
    font-size: .71rem !important;
  }
}
`;


    document.head.appendChild(style);
  }

  async function ensureInjected() { if (state.htmlInjected && $id('classRecordModal')) return; let htmlText = ''; try { const res = await fetch(MODULE_HTML_PATH, { cache:'no-store' }); if (!res.ok) throw new Error('load failed'); htmlText = await res.text(); } catch (_) { htmlText = fallbackHtml; } const wrap = document.createElement('div'); wrap.innerHTML = htmlText.trim(); document.body.appendChild(wrap.firstElementChild); appendStyles(); state.htmlInjected = true; cacheDom(); ensureTabsCollapsibleUi(); bindUi(); bindHostClassSync(); }

function updateHeaderFields() {
  // Safety sync before painting UI
  if (text(state.className).trim()) {
    state.recordHeader.classId = text(state.classId).trim();
    state.recordHeader.className = text(state.className).trim();
  }

  Object.keys(dom.headerInputs).forEach(k => {
    if (!dom.headerInputs[k]) return;
    dom.headerInputs[k].value =
      (k === 'semester')
        ? getSemesterLabel(state.recordHeader[k])
        : (k === 'g12Sy2026System' ? normalizeG12Sy2026System(state.recordHeader[k]) : (k === 'g12DescriptorSource' ? normalizeG12DescriptorSource(state.recordHeader[k]) : (k === 'modifiedTerm' ? normalizeModifiedTerm(state.recordHeader[k]) : (state.recordHeader[k] || ''))));
  });

  dom.headerInputs.keyStage.value = state.recordHeader.keyStage || '';
  dom.topClassName.textContent = state.className || state.recordHeader.className || 'No class loaded';
  dom.topSubject.textContent = state.recordHeader.subject || 'No subject';
  dom.topSchoolYear.textContent = state.recordHeader.schoolYear || 'No school year';

  applySubjectGroupFilter();

  if (dom.headerInputs.section) {
    dom.headerInputs.section.readOnly = false;
    dom.headerInputs.section.removeAttribute('readonly');
    dom.headerInputs.section.removeAttribute('aria-readonly');
    dom.headerInputs.section.style.cursor = '';
    dom.headerInputs.section.style.backgroundColor = '';
    dom.headerInputs.section.title = 'Shared across School Forms';
  }

  const customUi = isCustomInstitutionalMode();
  if (dom.headerInputs.g12Sy2026System && dom.headerInputs.g12Sy2026System.closest('.ctm-cr-field')) {
    dom.headerInputs.g12Sy2026System.closest('.ctm-cr-field').style.display = (!customUi && isLegacyGrade12Do8(state.recordHeader.gradeLevel, state.recordHeader.schoolYear)) ? '' : 'none';
  }
  if (dom.headerInputs.g12DescriptorSource && dom.headerInputs.g12DescriptorSource.closest('.ctm-cr-field')) {
    dom.headerInputs.g12DescriptorSource.closest('.ctm-cr-field').style.display = (!customUi && isLegacyGrade12Do8(state.recordHeader.gradeLevel, state.recordHeader.schoolYear)) ? '' : 'none';
    dom.headerInputs.g12DescriptorSource.title = 'Select the descriptor table used for Grade 12 SY 2026-2027 numeric results.';
  }
  if (dom.headerInputs.modifiedTerm && dom.headerInputs.modifiedTerm.closest('.ctm-cr-field')) {
    const modifiedTermField = dom.headerInputs.modifiedTerm.closest('.ctm-cr-field');
    modifiedTermField.style.display = (!customUi && isG12ModifiedThreeTermLayout()) ? '' : 'none';
    const modifiedTermLabel = modifiedTermField.querySelector('label');
    if (modifiedTermLabel) modifiedTermLabel.textContent = 'Subject Term';
    dom.headerInputs.modifiedTerm.title = 'Select the term where this subject belongs';
    Array.from(dom.headerInputs.modifiedTerm.options || []).forEach(opt => {
      const key = normalizeModifiedTerm(opt.value);
      opt.textContent = TERM_LABELS[key] || opt.textContent;
    });
  }
  if (dom.headerInputs.semester && dom.headerInputs.semester.closest('.ctm-cr-field')) {
    dom.headerInputs.semester.closest('.ctm-cr-field').style.display =
      ((!customUi && isLegacyGrade12SemesterLayout()) || (customUi && normalizeCustomAcademicStructure(state.recordHeader.customAcademicStructure) === 'semester')) ? '' : 'none';
  }
  if (dom.headerInputs.subjectGroup) {
    const sgLabel = dom.headerInputs.subjectGroup.closest('.ctm-cr-field') && dom.headerInputs.subjectGroup.closest('.ctm-cr-field').querySelector('label');
    if (sgLabel) sgLabel.textContent = customUi ? 'Subject Group / Custom Template' : 'Subject Group';
  }
  if (dom.headerInputs.keyStage && dom.headerInputs.keyStage.closest('.ctm-cr-field')) {
    dom.headerInputs.keyStage.closest('.ctm-cr-field').style.display = '';
    dom.headerInputs.keyStage.title = customUi ? 'Informational only under Custom Institutional mode; custom grading may span multiple grades.' : 'Auto-resolved from Grade Level.';
  }
  applyHeaderSettingsLock();
 renderCustomPolicyControls(); applyCustomHeaderLockState(); }


  function applySubjectGroupFilter() {
    const select = dom.headerInputs && dom.headerInputs.subjectGroup;
    if (!select) return;
    if (isCustomInstitutionalMode()) {
      applyCustomInstitutionalSubjectGroupOptions(select);
      select.disabled = shouldLockHeaderSettings();
      select.title = shouldLockHeaderSettings()
        ? 'Locked because this is a loaded saved Class Record. Click Edit to allow changes.'
        : 'Custom Institutional mode is grade/KS-aware for recommendations only. All custom-compatible subject groups remain selectable; selected group is classification only and does not control custom weights, counts, conversion, tabs, or final grade rules.';
      state.recordHeader.subjectGroup = text(select.value || state.recordHeader.subjectGroup).trim();
      return;
    }
    hideSubjectGroupContextNote();
    const allowedList = getAllowedSubjectGroups(state.recordHeader.gradeLevel, state.recordHeader.schoolYear);
    const allowed = new Set(allowedList);
    const gradeLevel = text(state.recordHeader.gradeLevel).trim();
    const schoolYear = normalizeSchoolYearRange(state.recordHeader.schoolYear);
    const needsKs1Year = /^Grade\s+[1-3]$/.test(gradeLevel) && !schoolYear;
    Array.from(select.options || []).forEach(opt => {
      const val = text(opt.value || opt.text).trim();
      if (!val) { opt.hidden = false; opt.disabled = false; return; }
      const ok = allowed.has(val);
      opt.hidden = !ok;
      opt.disabled = !ok;
    });
    if (needsKs1Year) {
      select.value = '';
      state.recordHeader.subjectGroup = '';
      select.disabled = true;
      select.title = shouldLockHeaderSettings() ? 'Locked because this is a loaded saved Class Record. Click Edit to allow changes.' : 'Select School Year first to resolve the KS1 Table 12 subject-group template.';
      return;
    }
    const coerced = coerceSubjectGroupForContext(select.value || state.recordHeader.subjectGroup, state.recordHeader.gradeLevel, state.recordHeader.schoolYear);
    select.disabled = shouldLockHeaderSettings() || !allowedList.length;
    select.title = shouldLockHeaderSettings() ? 'Locked because this is a loaded saved Class Record. Click Edit to allow changes.' : isKs1DescriptiveContext(state.recordHeader.gradeLevel, state.recordHeader.schoolYear)
      ? 'Integrated KS1 subject-group template enforced for this grade level and school year.'
      : (allowedList.length <= 1
          ? 'Context-resolved subject-group template for this grade level and school year.'
          : 'Filtered by grade level and school year.');
    if (text(select.value).trim() !== coerced) select.value = coerced || '';
    state.recordHeader.subjectGroup = coerced || '';
  }

  function renderPolicy() { const descriptiveNoNumeric = usesDescriptiveNoNumeric(state.setupProfile); dom.policy.mode.textContent = fmt(state.setupProfile.gradingModeResolved); dom.policy.table.textContent = fmt(state.setupProfile.resultTableResolved); dom.policy.numericMode.textContent = fmt(state.setupProfile.transitionRuleResolved.numericMode || 'none'); dom.policy.transition.textContent = fmt(state.setupProfile.transitionRuleResolved.transitionLabel || `${fmt(state.setupProfile.transitionRuleResolved.gradeLevel)} • ${fmt(state.setupProfile.transitionRuleResolved.schoolYear)}`); dom.policy.ww.textContent = descriptiveNoNumeric ? '—' : `${Math.round((state.setupProfile.componentWeights.ww || 0) * 100)}%`; dom.policy.pt.textContent = descriptiveNoNumeric ? '—' : `${Math.round((state.setupProfile.componentWeights.pt || 0) * 100)}%`; dom.policy.ex.textContent = descriptiveNoNumeric ? '—' : `${Math.round((state.setupProfile.componentWeights.ex || 0) * 100)}%`; dom.policy.hasTE.textContent = descriptiveNoNumeric ? '—' : (state.setupProfile.assessmentCounts.hasTE ? 'Yes' : 'No'); dom.policy.countWW.textContent = descriptiveNoNumeric ? '—' : fmt(state.setupProfile.assessmentCounts.wwCount); dom.policy.countPT.textContent = descriptiveNoNumeric ? '—' : fmt(state.setupProfile.assessmentCounts.ptCount); dom.policy.countST.textContent = descriptiveNoNumeric ? '—' : fmt(state.setupProfile.assessmentCounts.stCount); dom.policy.useDescriptors.textContent = state.setupProfile.usesDescriptors ? 'Yes' : 'No'; dom.policy.notes.value = state.setupProfile.validationNotes.join(' ');  renderCustomPolicyControls(); }
function visibleScoreFields(term) { if (!isNumericTable(term.applicableTable)) return []; const fields = getScoreFieldsForTerm(term); if (isCustomInstitutionalMode()) { const cfg=term.assessmentConfig||{}; return fields.filter(f=>{ if(f.group==='ww') return Number(cfg.wwCount||0)>=Number(f.key.slice(-1)); if(f.group==='pt') return Number(cfg.ptCount||0)>=Number(f.key.slice(-1)); if(f.key.startsWith('st')) return Number(cfg.stCount||0)>=Number(f.key.slice(-1)); if(f.key.startsWith('te')) return Number(cfg.teCount||(cfg.hasTE?1:0))>=Number(f.key.slice(-1)); if(f.key.startsWith('qe')) return Number(cfg.qeCount||0)>=Number(f.key.slice(-1)); return true; }); } return fields.filter(f => { if (f.group === 'ww') return Number(term.assessmentConfig.wwCount || 0) >= Number(f.key.slice(-1)); if (f.group === 'pt') return Number(term.assessmentConfig.ptCount || 0) >= Number(f.key.slice(-1)); if (f.key === 'qa1') return Number(term.assessmentConfig.qaCount || 0) >= 1; if (f.key === 'te') return !!term.assessmentConfig.hasTE; if (f.key.startsWith('st')) return Number(term.assessmentConfig.stCount || 0) >= Number(f.key.slice(-1)); return true; }); }
function learnerRow(termKey, learnerId) { return (state[termKey].learners || []).find(r => r.learnerId === learnerId) || null; }
function activeLearnerRow(termKey) { return learnerRow(termKey, state.activeLearnerId) || (state[termKey].learners || [])[0] || null; }
function syncActiveLearner(termKey) { const ordered = buildLearnerDisplayList(state[termKey].learners || []); if (!ordered.length) { state.activeLearnerId = ''; return null; } if (!state.activeLearnerId || !ordered.some(entry => entry.row && entry.row.learnerId === state.activeLearnerId)) state.activeLearnerId = ordered[0].row.learnerId; const activeEntry = ordered.find(entry => entry.row && entry.row.learnerId === state.activeLearnerId); return (activeEntry && activeEntry.row) || ordered[0].row; }
function hasValidationIssue(row, term) { if (!isNumericTable(term.applicableTable)) return false; return visibleScoreFields(term).some(field => { const hv = num(term.hps[field.group][field.key]); const sv = num(row.scores[field.group][field.key]); return sv != null && ((hv != null && hv > 0 && sv > hv) || sv < 0); }); }
function missingScoreCount(row, term) { if (!isNumericTable(term.applicableTable)) return 0; return visibleScoreFields(term).filter(field => { const hv = num(term.hps[field.group][field.key]); if (!(hv > 0)) return false; return num(row.scores[field.group][field.key]) == null; }).length; }
function descriptorMissing(row, term) { return !isNumericTable(term.applicableTable) && !text(row && row.computed && (row.computed.descriptorCode || row.computed.letterGrade)).trim(); }
function learnerIndex(termKey, learnerId) { return buildLearnerDisplayList(state[termKey].learners || []).findIndex(entry => entry.row && entry.row.learnerId === learnerId); }
function jumpLearner(termKey, dir) { const ordered = buildLearnerDisplayList(state[termKey].learners || []); if (!ordered.length) return; let idx = ordered.findIndex(entry => entry.row && entry.row.learnerId === state.activeLearnerId); if (idx < 0) idx = 0; idx = dir === 'prev' ? Math.max(0, idx - 1) : Math.min(ordered.length - 1, idx + 1); state.activeLearnerId = ordered[idx].row.learnerId; render(); switchTab(termKey); }

function jumpFinalLearner(dir) {
  const ordered = buildLearnerDisplayList((state.finalSummary && state.finalSummary.learners) || []);
  if (!ordered.length) return;
  let idx = ordered.findIndex(entry => text(entry && entry.row && (entry.row.learnerId || entry.row.name)).trim() === text(state.finalSelectedLearnerId).trim());
  if (idx < 0) idx = 0;
  idx = dir === 'prev' ? Math.max(0, idx - 1) : Math.min(ordered.length - 1, idx + 1);
  const nextRow = ordered[idx] && ordered[idx].row ? ordered[idx].row : null;
  if (!nextRow) return;
  state.finalSelectedLearnerId = text(nextRow.learnerId || nextRow.name).trim();
  renderFinal();
}
function isSwipeInteractiveTarget(target) {
  return !!(target && target.closest && target.closest('button, a, input, select, textarea, label, option, summary, details, .ctm-cr-computation-details, [role="button"], [data-nav], [data-term-picker], [data-pick-learner]'));
}
function bindSwipeNavigator(card, handlers) {
  if (!card || !handlers || card.__ctmSwipeNavBound) return;
  card.__ctmSwipeNavBound = true;
  card.style.touchAction = 'pan-y';
  card.style.userSelect = 'none';
  card.style.webkitUserSelect = 'none';
  const onPrev = typeof handlers.prev === 'function' ? handlers.prev : null;
  const onNext = typeof handlers.next === 'function' ? handlers.next : null;
  if (!onPrev || !onNext) return;

  let active = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let axis = null;
  let triggered = false;

  const SWIPE_THRESHOLD = 40;
  const AXIS_LOCK_SLOP = 8;
  const AXIS_DOMINANCE = 1.2;

  function resetPointer() {
    if (pointerId != null && card.releasePointerCapture) {
      try { card.releasePointerCapture(pointerId); } catch (_) { }
    }
    active = false;
    pointerId = null;
    axis = null;
    triggered = false;
  }
  function tryNavigate(dx) {
    if (triggered) return;
    triggered = true;
    if (dx > 0) onPrev(); else onNext();
  }
  function onPointerDown(ev) {
    if (isSwipeInteractiveTarget(ev.target)) return;
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    active = true;
    triggered = false;
    axis = null;
    pointerId = ev.pointerId;
    startX = ev.clientX;
    startY = ev.clientY;
    if (card.setPointerCapture) {
      try { card.setPointerCapture(pointerId); } catch (_) { }
    }
  }
  function onPointerMove(ev) {
    if (!active || triggered || ev.pointerId !== pointerId) return;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if (!axis) {
      if (Math.abs(dx) < AXIS_LOCK_SLOP && Math.abs(dy) < AXIS_LOCK_SLOP) return;
      axis = Math.abs(dx) > Math.abs(dy) * AXIS_DOMINANCE ? 'x' : 'y';
    }
    if (axis !== 'x') return;
    if (ev.cancelable) ev.preventDefault();
    if (Math.abs(dx) >= SWIPE_THRESHOLD) tryNavigate(dx);
  }

  card.addEventListener('pointerdown', onPointerDown, { passive: true });
  card.addEventListener('pointermove', onPointerMove, { passive: false });
  card.addEventListener('pointerup', resetPointer, { passive: true });
  card.addEventListener('pointercancel', resetPointer, { passive: true });

  if (!('PointerEvent' in window)) {
    let tActive = false;
    let tStartX = 0;
    let tStartY = 0;
    let tAxis = null;
    let tTriggered = false;
    function resetTouch() {
      tActive = false;
      tAxis = null;
      tTriggered = false;
    }
    card.addEventListener('touchstart', (ev) => {
      if (isSwipeInteractiveTarget(ev.target)) return;
      if (!ev.touches || !ev.touches[0]) return;
      tActive = true;
      tAxis = null;
      tTriggered = false;
      tStartX = ev.touches[0].clientX;
      tStartY = ev.touches[0].clientY;
    }, { passive: true });
    card.addEventListener('touchmove', (ev) => {
      if (!tActive || tTriggered || !ev.touches || !ev.touches[0]) return;
      const dx = ev.touches[0].clientX - tStartX;
      const dy = ev.touches[0].clientY - tStartY;
      if (!tAxis) {
        if (Math.abs(dx) < AXIS_LOCK_SLOP && Math.abs(dy) < AXIS_LOCK_SLOP) return;
        tAxis = Math.abs(dx) > Math.abs(dy) * AXIS_DOMINANCE ? 'x' : 'y';
      }
      if (tAxis !== 'x') return;
      if (ev.cancelable) ev.preventDefault();
      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        tTriggered = true;
        if (dx > 0) onPrev(); else onNext();
      }
    }, { passive: false });
    card.addEventListener('touchend', resetTouch, { passive: true });
    card.addEventListener('touchcancel', resetTouch, { passive: true });
  }
}
function bindTermLearnerCardSwipe(termKey) {
  const panel = dom.panels[termKey];
  const card = panel && panel.querySelector ? panel.querySelector('.ctm-cr-learner-card') : null;
  if (!card) return;
  bindSwipeNavigator(card, {
    prev: () => jumpLearner(termKey, 'prev'),
    next: () => jumpLearner(termKey, 'next')
  });
}
function bindFinalLearnerCardSwipe() {
  const panel = dom.panels.final || $id('crPanelFinal');
  const card = panel && panel.querySelector ? panel.querySelector('.ctm-cr-summary-detail') : null;
  if (!card) return;
  bindSwipeNavigator(card, {
    prev: () => jumpFinalLearner('prev'),
    next: () => jumpFinalLearner('next')
  });
}
function termStats(termKey) {
  const term = state[termKey], rows = term.learners || [];
  const hasNumeric = isNumericTable(term.applicableTable);
  const activeFields = hasNumeric ? visibleScoreFields(term) : [];
  const hasEncodedHps = hasNumeric && activeFields.some(field => num(term.hps[field.group][field.key]) > 0);
  const numericGrades = hasNumeric
    ? rows
        .filter(r => hasEncodedHps && !hasValidationIssue(r, term))
        .map(r => r && r.computed ? r.computed.termGrade : null)
        .filter(v => v != null && Number.isFinite(Number(v)))
        .map(Number)
    : rows.map(r => r && r.computed ? r.computed.termGrade : null).filter(v => typeof v === 'number').map(Number);
  return {
    learners: rows.length,
    encoded: rows.filter(r => hasNumeric ? activeFields.some(f => num(r.scores[f.group][f.key]) != null) : !descriptorMissing(r, term)).length,
    complete: rows.filter(r => hasNumeric ? hasEncodedHps && !hasValidationIssue(r, term) : !descriptorMissing(r, term)).length,
    incomplete: rows.filter(r => hasNumeric ? !hasEncodedHps || hasValidationIssue(r, term) : descriptorMissing(r, term)).length,
    atRisk: rows.filter(r => r.computed.interventionFlag).length,
    average: numericGrades.length ? roundWhole(numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length) : null
  };
}
  function isDraftNewSchoolYearRecord() {
    return !text(state.recordHeader && state.recordHeader.recordId).trim();
  }

  function hpsField(termKey, field, term) {
    const value = term.hps[field.group][field.key] == null ? '' : term.hps[field.group][field.key];
    const hpsLocked = isDraftNewSchoolYearRecord();
    const lockedAttrs = hpsLocked
      ? ' disabled aria-disabled="true" data-hps-draft-locked="true" title="Save or select a school-year record before editing HPS."'
      : '';
    return `<div class="ctm-cr-field ctm-cr-term-mini-field${hpsLocked ? ' ctm-cr-hps-draft-locked' : ''}"><label class="ctm-cr-label" for="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" title="${esc(field.label)} Highest Possible Score">${field.label} HPS</label><input id="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" name="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" data-term="${termKey}" data-hps-group="${field.group}" data-hps-key="${field.key}" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="${esc(field.label)} highest possible score" value="${esc(value)}" placeholder="HPS"${lockedAttrs}></div>`;
  }

  function isScoreFieldEnabledByHps(term, field) {
    const hv = num(term && term.hps && term.hps[field.group] && term.hps[field.group][field.key]);
    return hv != null && hv > 0;
  }

  function scoreField(termKey, learner, field, term) {
    const hv = num(term.hps[field.group][field.key]);
    const hpsEnabled = isScoreFieldEnabledByHps(term, field);
    const sv = num(learner.scores[field.group][field.key]);
    const bad = hpsEnabled && sv != null && (sv > hv || sv < 0);
    const labelText = `${field.label}${hpsEnabled ? `/${hv}` : ''}`;
    const titleText = hpsEnabled ? `${field.label} / ${hv}` : `${field.label} disabled because HPS is blank`;
    const disabledAttrs = hpsEnabled ? '' : ' disabled aria-disabled="true"';
    const disabledClass = hpsEnabled ? '' : ' ctm-cr-score-disabled';
    const placeholder = hpsEnabled ? 'Score' : 'No HPS';
    return `<div class="ctm-cr-field ctm-cr-term-mini-field${disabledClass}"><label class="ctm-cr-label" for="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" title="${esc(titleText)}">${esc(labelText)}</label><input id="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" name="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" class="${bad ? 'ctm-cr-cell-bad' : ''}" data-term="${termKey}" data-score-group="${field.group}" data-score-key="${field.key}" data-learner-id="${esc(learner.learnerId)}" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="${esc(hpsEnabled ? `${field.label} learner score` : `${field.label} learner score disabled because HPS is blank`)}" value="${esc(sv == null ? '' : sv)}" placeholder="${placeholder}"${disabledAttrs}></div>`;
  }

  function descriptorSelect(termKey, learner, term) {
    const profile = getDescriptorProfile(term.applicableTable);
    const current = text(learner.computed.letterGrade || learner.computed.descriptorCode).trim();
    const selectId = `cr-${esc(termKey)}-descriptor-${esc(slugify(learner.learnerId))}`;
    return `<div class="ctm-cr-field ctm-cr-term-mini-field ctm-cr-descriptor-field">
  <label class="ctm-cr-label" for="${selectId}">Descriptor</label>
  <select id="${selectId}" name="${selectId}" required data-term="${termKey}" data-descriptor="1" data-learner-id="${esc(learner.learnerId)}">
    <option value="" ${!current ? 'selected' : ''}>Select Descriptor</option>
    ${profile.map(item => `
      <option value="${esc(item.code)}" ${item.code === current ? 'selected' : ''}>
        ${esc(item.code)} — ${esc(item.label)} (${esc(item.localizedLabel || '')})
      </option>
    `).join('')}
  </select>
</div>`;
  }

  function descriptorDisplayText(result) {
    const label = text(result && (result.descriptorLabel || result.letterGrade || result.descriptorCode)).trim();
    const localized = text(result && result.localizedLabel).trim();
    return localized && label && !label.includes(`(${localized})`) ? `${label} (${localized})` : (label || localized || '—');
  }

  function getAchievementMeterConfig(tableKey) {
    const key = text(tableKey).trim();
    if (key === 'table7') return { title: 'Achievement Meter', steps: [
      { code: 'CO', shortCode: 'CO', label: 'Consistent', localizedLabel: 'Palagiang Naipapakita', levelClass: 'level-1' },
      { code: 'DV', shortCode: 'DV', label: 'Developing', localizedLabel: 'Umuusbong', levelClass: 'level-3' },
      { code: 'BG', shortCode: 'BG', label: 'Beginning', localizedLabel: 'Nagsisimula', levelClass: 'level-5' }
    ] };
    if (key === 'table8') return { title: 'Achievement Meter', steps: [
      { code: 'A', shortCode: 'A', label: 'Advancing', localizedLabel: 'Namumukod-tangi', levelClass: 'level-1' },
      { code: 'B', shortCode: 'B', label: 'Benchmarking', localizedLabel: 'Napamamalas', levelClass: 'level-2' },
      { code: 'C', shortCode: 'C', label: 'Connecting', localizedLabel: 'Natutungo', levelClass: 'level-3' },
      { code: 'D', shortCode: 'D', label: 'Developing', localizedLabel: 'Napauunlad', levelClass: 'level-4' },
      { code: 'E', shortCode: 'E', label: 'Emerging', localizedLabel: 'Nagsisimula', levelClass: 'level-5' }
    ] };
    if (key === 'table11') return { title: 'Achievement Meter', steps: [
      { code: 'ADVANCING', shortCode: 'A', label: 'Advancing', localizedLabel: 'Namumukod-tangi', levelClass: 'level-1' },
      { code: 'BENCHMARKING', shortCode: 'B', label: 'Benchmarking', localizedLabel: 'Napamamalas', levelClass: 'level-2' },
      { code: 'CONNECTING', shortCode: 'C', label: 'Connecting', localizedLabel: 'Natutungo', levelClass: 'level-3' },
      { code: 'DEVELOPING', shortCode: 'D', label: 'Developing', localizedLabel: 'Napauunlad', levelClass: 'level-4' },
      { code: 'EMERGING', shortCode: 'E', label: 'Emerging', localizedLabel: 'Nagsisimula', levelClass: 'level-5' }
    ] };
    if (key === 'table10') return { title: 'Achievement Meter', steps: [
      { code: 'O', shortCode: 'O', label: 'Outstanding', localizedLabel: '', levelClass: 'level-1' },
      { code: 'VS', shortCode: 'VS', label: 'Very Satisfactory', localizedLabel: '', levelClass: 'level-2' },
      { code: 'S', shortCode: 'S', label: 'Satisfactory', localizedLabel: '', levelClass: 'level-3' },
      { code: 'FS', shortCode: 'FS', label: 'Fairly Satisfactory', localizedLabel: '', levelClass: 'level-4' },
      { code: 'DNME', shortCode: 'DNME', label: 'Did Not Meet Expectations', localizedLabel: '', levelClass: 'level-5' }
    ] };
    return { title: 'Achievement Meter', steps: [{ code: '', shortCode: '—', label: 'No descriptor', localizedLabel: '', levelClass: 'level-neutral' }] };
  }

  function resolveAchievementMeterActiveCode(result, config) {
    const currentRaw = text(result && (result.descriptorCode || result.letterGrade || result.descriptorLabel)).trim();
    if (!currentRaw) return '';
    const upper = currentRaw.toUpperCase();
    const exact = (config.steps || []).find(step => text(step.code).trim().toUpperCase() === upper);
    if (exact) return exact.code;
    const byLabel = (config.steps || []).find(step => text(step.label).trim().toUpperCase() === upper);
    return byLabel ? byLabel.code : currentRaw;
  }

  function achievementMeterRangeText(result, tableKey, activeCode) {
    const key = text(tableKey).trim();
    if (!['table10', 'table11'].includes(key)) return '';
    const numericValue = num(result && (result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade));
    if (numericValue != null) {
      const numericRow = numericDescriptor(numericValue, key);
      if (numericRow) return `${numericRow.min}-${numericRow.max}`;
    }
    const normalizedCode = text(activeCode || '').trim().toUpperCase();
    if (!normalizedCode) return '';
    const table = key === 'table10' ? TABLE10 : TABLE11;
    const codedRow = table.find(row => {
      const descriptorCode = text(row && row.descriptorCode).trim().toUpperCase();
      const descriptorLabel = text(row && row.descriptorLabel).trim().toUpperCase();
      return normalizedCode === descriptorCode || normalizedCode === descriptorLabel;
    });
    return codedRow ? `${codedRow.min}-${codedRow.max}` : '';
  }

  function achievementMeterRemarksText(result, tableKey, activeCode) {
    const key = text(tableKey).trim();
    const explicitRemarks = text(result && result.remarks).trim();
    const numericValue = num(result && (result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade));
    if (numericValue != null && ['table10', 'table11'].includes(key)) {
      return numericValue >= PASSING_GRADE ? 'Passed' : 'Failed';
    }
    if (explicitRemarks) return explicitRemarks;
    const normalizedCode = text(activeCode || '').trim().toUpperCase();
    if (normalizedCode === 'DNME') return 'Failed';
    if (['O', 'VS', 'S', 'FS', 'ADVANCING', 'BENCHMARKING', 'CONNECTING'].includes(normalizedCode)) return 'Passed';
    if (['DEVELOPING', 'EMERGING'].includes(normalizedCode) && ['table10', 'table11'].includes(key)) return 'Failed';
    return '';
  }

  function resultGradeDisplayText(result, options = {}) {
    const fallback = text(options.fallbackValue != null ? options.fallbackValue : '—').trim() || '—';
    const candidate = options && Object.prototype.hasOwnProperty.call(options, 'gradeValue')
      ? options.gradeValue
      : (result && (result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade));
    if (candidate == null || candidate === '') return fallback;
    if (typeof candidate === 'number') {
      return options.reportedNumeric ? fmt(summaryReportedNumeric(candidate, options.floor == null ? 60 : options.floor)) : fmt(candidate);
    }
    const raw = text(candidate).trim();
    if (!raw) return fallback;
    if (/^-?\d+(?:\.\d+)?$/.test(raw)) {
      return options.reportedNumeric ? fmt(summaryReportedNumeric(Number(raw), options.floor == null ? 60 : options.floor)) : fmt(Number(raw));
    }
    return raw;
  }

  function resultNumericDisplayValue(value, options = {}) {
    const fallback = text(options.fallbackValue != null ? options.fallbackValue : '—').trim() || '—';
    if (value == null || value === '') return fallback;
    if (typeof value === 'number') return fmt(options.reportedNumeric ? summaryReportedNumeric(value, options.floor == null ? 60 : options.floor) : value);
    const raw = text(value).trim();
    if (!raw) return fallback;
    if (/^-?\d+(?:\.\d+)?$/.test(raw)) {
      const n = Number(raw);
      return fmt(options.reportedNumeric ? summaryReportedNumeric(n, options.floor == null ? 60 : options.floor) : n);
    }
    return raw;
  }

  function isNumericLikeGradeValue(value) {
    if (value == null || value === '') return false;
    if (typeof value === 'number') return Number.isFinite(value);
    return /^-?\d+(?:\.\d+)?$/.test(text(value).trim());
  }

  function renderGradePill(label, value, className = '', options = {}) {
    if (!isNumericLikeGradeValue(value)) return '';
    const display = resultNumericDisplayValue(value, Object.assign({ fallbackValue: '' }, options));
    if (!display) return '';
    const cls = ['ctm-cr-achievement-chip', 'ctm-cr-grade-pill', className].filter(Boolean).join(' ');
    return `<span class="${esc(cls)}"><span class="ctm-cr-achievement-chip-label">${esc(label)}</span><span class="ctm-cr-achievement-chip-value">${esc(display)}</span></span>`;
  }

  function numericTermGradeValue(result) {
    if (!result) return null;
    if (result.termGrade != null && result.termGrade !== '') return result.termGrade;
    if (result.finalDisplayedNumeric != null && result.finalDisplayedNumeric !== '') return result.finalDisplayedNumeric;
    return null;
  }

  function summaryDescriptorText(result) {
    result = ensureDescriptorFieldsForDisplay(result || {}, result && result.tableUsed);
    return text(result && result.descriptorLabel).trim()
      || text(result && result.descriptorCode).trim()
      || text(result && result.letterGrade).trim()
      || text(result && result.termGrade).trim()
      || '—';
  }

  function buildResultChipText(result, options = {}) {
    const gradeText = text(resultGradeDisplayText(result, options)).trim();
    const descriptorText = text(options.descriptorText != null ? options.descriptorText : summaryDescriptorText(result)).trim();
    return [gradeText && gradeText !== '—' ? gradeText : '', descriptorText && descriptorText !== '—' ? descriptorText : ''].filter(Boolean).join(' • ') || '—';
  }

  function renderResultTextChipCard(label, result, options = {}) {
    return `<div class="ctm-cr-card ctm-cr-result-chip-card"><div class="ctm-cr-mini-label">${esc(text(label).trim() || 'Result')}</div><div class="ctm-cr-strong">${esc(buildResultChipText(result, options))}</div></div>`;
  }

  function renderAchievementMeter(result, options = {}) {
    const tableKey = options.tableKey || (result && (result.tableUsed || result.applicableTable)) || '';
    result = ensureDescriptorFieldsForDisplay(result || {}, tableKey);
    const config = getAchievementMeterConfig(tableKey);
    const compact = !!options.compact;
    const activeCode = resolveAchievementMeterActiveCode(result, config);
    const currentStep = (config.steps || []).find(step => step.code === activeCode) || null;
    const displayName = descriptorDisplayText({
      descriptorLabel: result && result.descriptorLabel,
      descriptorCode: result && result.descriptorCode,
      letterGrade: result && result.letterGrade,
      localizedLabel: (result && result.localizedLabel) || (currentStep && currentStep.localizedLabel) || ''
    });
    const description = text((result && result.generalDescription) || '').trim();
    const instructionalResponse = text((result && result.instructionalResponse) || '').trim();
    const codePill = currentStep ? (currentStep.shortCode || currentStep.code || '—') : (text(activeCode).trim() || '—');
    const title = text(options.title || config.title || 'Achievement Meter').trim();
    const steps = config.steps || [];
    const wrapperClass = compact ? 'ctm-cr-achievement-wrap compact' : 'ctm-cr-achievement-wrap';
    const meterClass = compact ? 'ctm-cr-achievement-meter compact' : 'ctm-cr-achievement-meter';
    const ariaLabel = text(options.ariaLabel || `${title}: ${displayName}`).trim() || title;
    const termGradeValue = numericTermGradeValue(result);
    const remarksText = compact ? '' : achievementMeterRemarksText(result, tableKey, activeCode);
    const chipBits = [];
    const activeLevelClass = currentStep ? (currentStep.levelClass || 'level-neutral') : 'level-neutral';
    const achievementChipClass = `ctm-cr-achievement-chip ctm-cr-achievement-chip-colored ${activeLevelClass}`;
    if (!compact) {
      const showInitialGrade = !!(result && result.transmutedGrade != null && result.transmutedGrade !== '' && result.initialGrade != null && result.initialGrade !== '');
      const initialChip = showInitialGrade ? renderGradePill('Initial Grade', result && result.initialGrade, 'ctm-cr-grade-pill-initial') : '';
      if (initialChip) chipBits.push(initialChip);
      const termChip = renderGradePill('Term Grade', termGradeValue, `ctm-cr-grade-pill-term ctm-cr-achievement-chip-colored ${activeLevelClass}`);
      if (termChip) chipBits.push(termChip);
    }
    if (remarksText) chipBits.push(`<span class="${esc(achievementChipClass)}"><span class="ctm-cr-achievement-chip-label">Remarks</span><span class="ctm-cr-achievement-chip-value">${esc(remarksText)}</span></span>`);
    const chipsHtml = chipBits.length ? `<div class="ctm-cr-achievement-chip-row ctm-cr-grade-chip-row">${chipBits.join('')}</div>` : '';
    const stepsHtml = steps.map(step => {
      const fullLabel = step.localizedLabel ? `${step.label} (${step.localizedLabel})` : step.label;
      const stepRangeText = compact ? '' : achievementMeterRangeText({ descriptorCode: step.code }, tableKey, step.code);
      return `<div class="ctm-cr-achievement-step ${esc(step.levelClass || 'level-neutral')} ${step.code === activeCode ? 'is-active' : ''}" title="${esc(fullLabel)}"><span class="ctm-cr-achievement-step-code">${esc(step.shortCode || step.code || '—')}</span><span class="ctm-cr-achievement-step-label">${esc(step.label || step.code || '—')}</span>${stepRangeText ? `<span class="ctm-cr-achievement-step-range">${esc(stepRangeText)}</span>` : ''}</div>`;
    }).join('');
    const descriptionHtml = compact ? '' : `<div class="ctm-cr-achievement-desc">${esc(description || 'Descriptor becomes available once the learner has enough evidence for the selected grading table.')}</div>`;
    const instructionalResponseHtml = (!compact && instructionalResponse)
      ? `<div class="ctm-cr-achievement-text"><div class="ctm-cr-achievement-text-label">Instructional Response</div><div class="ctm-cr-achievement-text-body">${esc(instructionalResponse)}</div></div>`
      : '';
    return `<div class="${wrapperClass}"><div class="${meterClass}"><div class="ctm-cr-achievement-head"><span class="ctm-cr-achievement-title">${esc(title)}</span><span class="ctm-cr-achievement-code">${esc(codePill || '—')}</span></div><div class="ctm-cr-achievement-scale" style="--ctm-meter-steps:${Math.max(1, steps.length)};" role="img" aria-label="${esc(ariaLabel)}">${stepsHtml}</div><div class="ctm-cr-achievement-meta"><div class="ctm-cr-achievement-name">${esc(displayName || 'No descriptor yet')}</div>${chipsHtml}${descriptionHtml}${instructionalResponseHtml}</div></div></div>`;
  }



  // v18.52 UI-only detailed computation breakdown helpers. Do not mutate saved data, CSV schema, localStorage, shared headers, MAPEH bundles, or computed results.
  function computationFormatNumber(value, digits = 2) {
    const n = Number(value);
    if (!Number.isFinite(n)) return '—';
    return n.toFixed(digits);
  }
  function computationFormatWholeOrNumber(value, digits = 2) {
    const n = Number(value);
    if (!Number.isFinite(n)) return '—';
    return Number.isInteger(n) ? String(n) : n.toFixed(digits);
  }
  function computationFormatPercent(value, digits = 2) {
    const n = Number(value);
    if (!Number.isFinite(n)) return '—';
    return `${n.toFixed(digits)}%`;
  }
  function computationSafeNumber(value) {
    const n = num(value);
    return n == null || !Number.isFinite(Number(n)) ? null : Number(n);
  }
  function componentFieldLabel(fieldKey) {
    const def = getScoreFieldDefinition(fieldKey);
    return def ? def.label : text(fieldKey).toUpperCase();
  }
  function computationTableLabel(tableKey) {
    const key = text(tableKey).trim();
    if (key === 'table7') return 'Table 7';
    if (key === 'table8') return 'Table 8';
    if (key === 'table10') return 'Table 10';
    if (key === 'table11') return 'Table 11';
    return key || '—';
  }
  function lookupDescriptorForComputation(result, tableKey) {
    const key = text(tableKey || (result && result.tableUsed)).trim();
    const code = text(result && (result.descriptorCode || result.letterGrade)).trim().toUpperCase();
    const label = text(result && result.descriptorLabel).trim().toUpperCase();
    const grade = num(result && (result.finalDisplayedNumeric != null ? result.finalDisplayedNumeric : result.termGrade));
    let row = null;
    if (key === 'table10' || key === 'table11') row = grade != null ? numericDescriptor(grade, key) : null;
    else if (key === 'table7' || key === 'table8') {
      row = getDescriptorProfile(key).find(item => text(item.code).trim().toUpperCase() === code || text(item.label).trim().toUpperCase() === label) || null;
    }
    if (!row && (key === 'table10' || key === 'table11')) {
      const table = key === 'table10' ? TABLE10 : TABLE11;
      row = table.find(item => text(item.descriptorCode).trim().toUpperCase() === code || text(item.descriptorLabel).trim().toUpperCase() === label) || null;
    }
    return row || null;
  }
  function getActiveScoreFieldsForBreakdown(term, setupProfile) {
    if (!term || !isNumericTable(term.applicableTable)) return [];
    return visibleScoreFields(term).map(field => Object.assign({}, field));
  }
  function getComputationComponentDefinitions(term, setupProfile) {
    const setup = setupProfile || state.setupProfile || defaultSetupProfile();
    if (isCustomInstitutionalMode()) {
      const c = normalizeCustomComponents(setup.customComponents || (state.recordHeader && state.recordHeader.customComponents));
      const map = {
        ww: { label: 'Written Works', group: 'ww', keys: ['ww1','ww2','ww3','ww4','ww5'] },
        pt: { label: 'Performance Tasks', group: 'pt', keys: ['pt1','pt2','pt3','pt4','pt5'] },
        st: { label: 'Summative Test', group: 'ex', keys: ['st1','st2'] },
        te: { label: 'Term Exam', group: 'ex', keys: ['te1','te2'] },
        qe: { label: 'Quarter Exam', group: 'ex', keys: ['qe1','qe2'] }
      };
      return Object.keys(map).map(key => {
        const cfg = c[key] || { count: 0, weight: 0 };
        const meta = map[key];
        return { key, label: meta.label, group: meta.group, weight: Number(cfg.weight || 0) / 100, fieldKeys: meta.keys.slice(0, Math.max(0, Number(cfg.count || 0))), custom: true };
      }).filter(def => def.weight > 0 || def.fieldKeys.length > 0);
    }
    const weights = (setup && setup.componentWeights) || { ww: 0, pt: 0, ex: 0 };
    const fields = getActiveScoreFieldsForBreakdown(term, setup);
    const byGroup = group => fields.filter(f => f.group === group).map(f => f.key);
    return [
      { key: 'ww', label: 'Written Works', group: 'ww', weight: Number(weights.ww || 0), fieldKeys: byGroup('ww') },
      { key: 'pt', label: 'Performance Tasks', group: 'pt', weight: Number(weights.pt || 0), fieldKeys: byGroup('pt') },
      { key: 'ex', label: 'Summative Test and Term Exam', group: 'ex', weight: Number(weights.ex || 0), fieldKeys: byGroup('ex') }
    ];
  }
  function buildNormalComponentBreakdown(componentKey, fields, row, term, weight, label) {
    const used = [];
    const skipped = [];
    let scoreTotal = 0;
    let hpsTotal = 0;
    (fields || []).forEach(fieldKey => {
      const group = componentKey === 'ww' ? 'ww' : (componentKey === 'pt' ? 'pt' : 'ex');
      const hv = computationSafeNumber(term && term.hps && term.hps[group] && term.hps[group][fieldKey]);
      const rawScore = computationSafeNumber(row && row.scores && row.scores[group] && row.scores[group][fieldKey]);
      const fieldLabel = componentFieldLabel(fieldKey);
      if (!(hv != null && hv > 0)) {
        skipped.push({ key: fieldKey, label: fieldLabel, reason: 'HPS not set. This field is not included.' });
        return;
      }
      const scoreUsed = rawScore == null ? 0 : Math.max(0, Math.min(rawScore, hv));
      hpsTotal += hv;
      scoreTotal += scoreUsed;
      used.push({ key: fieldKey, label: fieldLabel, hps: hv, score: rawScore, scoreUsed, missing: rawScore == null, clamped: rawScore != null && rawScore !== scoreUsed });
    });
    const percentageScore = hpsTotal > 0 ? (scoreTotal / hpsTotal) * 100 : null;
    const weightedScore = percentageScore == null ? null : percentageScore * Number(weight || 0);
    return { key: componentKey, label, weight: Number(weight || 0), scoreTotal, hpsTotal, percentageScore, weightedScore, used, skipped, subShareMode: false };
  }
  function buildExamShareComponentBreakdown(fields, row, term, weight, label) {
    const qaHps = computationSafeNumber(term && term.hps && term.hps.ex && term.hps.ex.qa1);
    if (qaHps != null && qaHps > 0) return buildNormalComponentBreakdown('ex', fields, row, term, weight, label);
    const shares = { st1: 0.3, st2: 0.3, te: 0.4 };
    const used = [];
    const skipped = [];
    let activeShareTotal = 0;
    let normalizedContribution = 0;
    let scoreTotal = 0;
    let hpsTotal = 0;
    (fields || []).forEach(fieldKey => {
      const hv = computationSafeNumber(term && term.hps && term.hps.ex && term.hps.ex[fieldKey]);
      const rawScore = computationSafeNumber(row && row.scores && row.scores.ex && row.scores.ex[fieldKey]);
      const fieldLabel = componentFieldLabel(fieldKey);
      const share = Number(shares[fieldKey] || 0);
      if (!(hv != null && hv > 0)) {
        skipped.push({ key: fieldKey, label: fieldLabel, reason: 'HPS not set. This field is not included.' });
        return;
      }
      const scoreUsed = rawScore == null ? 0 : Math.max(0, Math.min(rawScore, hv));
      const ps = (scoreUsed / hv) * 100;
      activeShareTotal += share;
      normalizedContribution += ps * share;
      scoreTotal += scoreUsed;
      hpsTotal += hv;
      used.push({ key: fieldKey, label: fieldLabel, hps: hv, score: rawScore, scoreUsed, missing: rawScore == null, clamped: rawScore != null && rawScore !== scoreUsed, share, ps, weightedShare: ps * share });
    });
    const percentageScore = activeShareTotal > 0 ? normalizedContribution / activeShareTotal : null;
    const weightedScore = percentageScore == null ? null : percentageScore * Number(weight || 0);
    return { key: 'ex', label, weight: Number(weight || 0), scoreTotal, hpsTotal, percentageScore, weightedScore, used, skipped, subShareMode: activeShareTotal > 0 };
  }
  function buildComponentBreakdown(componentKey, fields, row, term, weight, label) {
    if (!term || !row) return null;
    if (!isCustomInstitutionalMode() && componentKey === 'ex') return buildExamShareComponentBreakdown(fields, row, term, weight, label || 'Summative Test and Term Exam');
    return buildNormalComponentBreakdown(componentKey, fields, row, term, weight, label || componentKey.toUpperCase());
  }
  function buildLearnerComputationBreakdown(row, term, setupProfile) {
    if (!row || !term || !setupProfile) return null;
    const result = row.computed || defaultComputed();
    const tableKey = term.applicableTable || result.tableUsed || '';
    if (tableKey === 'table7' || tableKey === 'table8') {
      const descriptorRow = lookupDescriptorForComputation(result, tableKey);
      return { descriptive: true, tableLabel: computationTableLabel(tableKey), descriptorCode: text(result.descriptorCode || result.letterGrade), descriptorLabel: text((descriptorRow && descriptorRow.label) || result.descriptorLabel), localizedLabel: text((descriptorRow && descriptorRow.localizedLabel) || result.localizedLabel), generalDescription: text(result.generalDescription || (descriptorRow && descriptorRow.generalDescription)), instructionalResponse: text(result.instructionalResponse) };
    }
    if (!isNumericTable(tableKey)) return null;
    const defs = getComputationComponentDefinitions(term, setupProfile);
    const components = defs.map(def => buildComponentBreakdown(def.key, def.fieldKeys, row, term, def.weight, def.label)).filter(Boolean);
    const included = components.filter(c => c.percentageScore != null && c.hpsTotal > 0 && c.weight > 0);
    const unroundedInitial = included.reduce((sum, c) => sum + Number(c.weightedScore || 0), 0);
    const storedInitial = computationSafeNumber(result.initialGrade);
    const termGrade = result.termGrade != null && result.termGrade !== '' ? result.termGrade : result.finalDisplayedNumeric;
    const storedTermGrade = computationSafeNumber(termGrade);
    const method = isCustomInstitutionalMode()
      ? normalizeGradeConversionMethod((setupProfile && setupProfile.gradeConversionMethod) || (state.recordHeader && state.recordHeader.gradeConversionMethod))
      : (isLegacyGrade12Term(term) || (setupProfile && setupProfile.usesTransmutation) ? 'transmutation' : 'zeroBased');
    const transmutationKey = isCustomInstitutionalMode()
      ? normalizeTransmutationTableKey((setupProfile && setupProfile.transmutationTableKey) || (state.recordHeader && state.recordHeader.transmutationTableKey), method)
      : (isLegacyGrade12Term(term) ? 'deped-do8-2015-appendix-b' : ((setupProfile && setupProfile.usesTransmutation) ? 'deped-do015-2026-adjusted' : 'none'));
    const conversionLabel = method === 'transmutation' ? getTransmutationRegistryEntry(transmutationKey).label : 'Zero-Based Direct Computation';
    const descriptorRow = lookupDescriptorForComputation(result, tableKey);
    const warnings = [];
    if (storedInitial != null && included.length) {
      const diff = Math.abs(unroundedInitial - storedInitial);
      if (diff > 0.005) warnings.push(`Note: Displayed breakdown uses rounded values. Official stored result remains ${computationFormatNumber(storedInitial, 2)}.`);
      if (diff > 0.05) warnings.push('Please review active HPS, missing scores, or selected conversion table.');
    }
    return { descriptive: false, tableLabel: computationTableLabel(tableKey), components, included, unroundedInitial, storedInitial, termGrade: termGrade, storedTermGrade, conversionLabel, method, transmutationKey, descriptorCode: text(result.descriptorCode || result.letterGrade), descriptorLabel: text((descriptorRow && (descriptorRow.descriptorLabel || descriptorRow.label)) || result.descriptorLabel), localizedLabel: text((descriptorRow && descriptorRow.localizedLabel) || result.localizedLabel), remarks: text(result.remarks || achievementMeterRemarksText(result, tableKey, result.descriptorCode)), generalDescription: text(result.generalDescription), instructionalResponse: text(result.instructionalResponse), warnings };
  }
  function renderComputationFieldList(component) {
    const usedLines = (component.used || []).map(item => {
      const scoreText = item.missing ? 'Missing' : computationFormatWholeOrNumber(item.scoreUsed, 2);
      const clampText = item.clamped ? ' (clamped to HPS)' : '';
      return `<div class="ctm-cr-computation-line ctm-cr-computation-muted">${esc(item.label)}: ${esc(scoreText)} / ${esc(computationFormatWholeOrNumber(item.hps, 2))}${esc(clampText)}${item.missing ? ' <span class="ctm-cr-computation-warning">Missing score counted as 0 by current app logic.</span>' : ''}</div>`;
    }).join('');
    const skippedLines = (component.skipped || []).map(item => `<div class="ctm-cr-computation-line ctm-cr-computation-muted">${esc(item.label)}: Not included — HPS not set.</div>`).join('');
    return usedLines + skippedLines;
  }
  function renderComponentBreakdownHtml(component) {
    if (!component) return '';
    if (!(component.hpsTotal > 0)) {
      return `<div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">${esc(component.label)}</div><div class="ctm-cr-computation-line ctm-cr-computation-muted">HPS not set. This component is not included.</div>${renderComputationFieldList(component)}</div>`;
    }
    const weightPct = component.weight * 100;
    const shareLines = component.subShareMode ? (component.used || []).map(item => `<div class="ctm-cr-computation-line ctm-cr-computation-muted">${esc(item.label)} Share: ${esc(computationFormatNumber(item.scoreUsed, 2))} ÷ ${esc(computationFormatNumber(item.hps, 2))} × 100 × ${esc(computationFormatPercent(item.share * 100, 0))} = ${esc(computationFormatNumber(item.weightedShare, 2))}</div>`).join('') : '';
    return `<div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">${esc(component.label)}</div><div class="ctm-cr-computation-line">Component Score: ${esc(computationFormatNumber(component.scoreTotal, 2))} / ${esc(computationFormatNumber(component.hpsTotal, 2))}</div>${renderComputationFieldList(component)}${shareLines}<div class="ctm-cr-computation-line">Percentage Score: ${esc(computationFormatNumber(component.scoreTotal, 2))} ÷ ${esc(computationFormatNumber(component.hpsTotal, 2))} × 100 = ${esc(computationFormatPercent(component.percentageScore, 2))}${component.subShareMode ? ' <span class="ctm-cr-computation-muted">(normalized from active ST/TE shares)</span>' : ''}</div><div class="ctm-cr-computation-line">Weighted Score: ${esc(computationFormatNumber(component.percentageScore, 2))} × ${esc(computationFormatPercent(weightPct, 0))} = ${esc(computationFormatNumber(component.weightedScore, 2))}</div></div>`;
  }
  function renderComputationBreakdownHtml(breakdown) {
    if (!breakdown) return '';
    if (breakdown.descriptive) {
      return `<details class="ctm-cr-computation-details"><summary role="button" tabindex="0" aria-expanded="false">Detailed Computations</summary><div class="ctm-cr-computation-body"><div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">Descriptor</div><div class="ctm-cr-computation-line ctm-cr-computation-muted">Detailed numeric computation is not applicable because this term uses descriptive grading.</div><div class="ctm-cr-computation-line">Applicable Table: ${esc(breakdown.tableLabel)}</div><div class="ctm-cr-computation-line">Descriptor Code: ${esc(breakdown.descriptorCode || '—')}</div><div class="ctm-cr-computation-line">Descriptor Label: ${esc(breakdown.descriptorLabel || '—')}</div>${breakdown.localizedLabel ? `<div class="ctm-cr-computation-line">Localized Label: ${esc(breakdown.localizedLabel)}</div>` : ''}${breakdown.generalDescription ? `<div class="ctm-cr-computation-line">General Description: ${esc(breakdown.generalDescription)}</div>` : ''}${breakdown.instructionalResponse ? `<div class="ctm-cr-computation-line">Instructional Response: ${esc(breakdown.instructionalResponse)}</div>` : ''}</div></div></details>`;
    }
    if (!breakdown.components || !breakdown.components.length) {
      return `<details class="ctm-cr-computation-details"><summary role="button" tabindex="0" aria-expanded="false">Detailed Computations</summary><div class="ctm-cr-computation-body"><div class="ctm-cr-computation-warning">No active numeric components available for detailed computation.</div></div></details>`;
    }
    const componentHtml = breakdown.components.map(renderComponentBreakdownHtml).join('');
    const formulaLabels = (breakdown.included || []).map(c => `${c.key.toUpperCase()} WS`).join(' + ');
    const formulaValues = (breakdown.included || []).map(c => computationFormatNumber(c.weightedScore, 2)).join(' + ');
    const officialInitial = breakdown.storedInitial != null ? breakdown.storedInitial : breakdown.unroundedInitial;
    const conversionLine = breakdown.method === 'transmutation'
      ? `Initial Grade ${computationFormatNumber(officialInitial, 2)} → Term Grade ${fmt(breakdown.termGrade)}`
      : `Initial Grade ${computationFormatNumber(officialInitial, 2)} → Term Grade ${fmt(breakdown.termGrade)}`;
    const warningsHtml = (breakdown.warnings || []).map(w => `<div class="ctm-cr-computation-warning">${esc(w)}</div>`).join('');
    return `<details class="ctm-cr-computation-details"><summary role="button" tabindex="0" aria-expanded="false">Detailed Computations <span>Tap/click to view how the Initial Grade and Term Grade were computed</span></summary><div class="ctm-cr-computation-body">${componentHtml}<div class="ctm-cr-computation-section ctm-cr-computation-total"><div class="ctm-cr-computation-title">Initial Grade</div><div class="ctm-cr-computation-line">Initial Grade = ${esc(formulaLabels || 'sum of included weighted scores')}</div><div class="ctm-cr-computation-line">Initial Grade = ${esc(formulaValues || '—')} = ${esc(computationFormatNumber(officialInitial, 2))}</div><div class="ctm-cr-computation-muted">Displayed values are rounded to 2 decimal places; actual computation uses the app’s internal precision.</div></div><div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">Grade Conversion</div><div class="ctm-cr-computation-line">Grade Conversion: ${esc(breakdown.conversionLabel || 'Zero-Based Direct Computation')}</div><div class="ctm-cr-computation-line">${esc(conversionLine)}</div></div><div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">Descriptor</div><div class="ctm-cr-computation-line">Applicable Table: ${esc(breakdown.tableLabel)}</div><div class="ctm-cr-computation-line">Term Grade: ${esc(fmt(breakdown.termGrade))}</div><div class="ctm-cr-computation-line">Descriptor Code: ${esc(breakdown.descriptorCode || '—')}</div><div class="ctm-cr-computation-line">Descriptor Label: ${esc(breakdown.descriptorLabel || '—')}</div>${breakdown.localizedLabel ? `<div class="ctm-cr-computation-line">Localized Label: ${esc(breakdown.localizedLabel)}</div>` : ''}<div class="ctm-cr-computation-line">Remarks: ${esc(breakdown.remarks || '—')}</div></div>${warningsHtml}</div></details>`;
  }

  function findSummarySourceTermRow(summaryRow, termKey) {
    const term = state[termKey];
    const rows = term && Array.isArray(term.learners) ? term.learners : [];
    if (!rows.length || !summaryRow) return null;
    const id = text(summaryRow.learnerId || summaryRow.studentId || summaryRow.id || summaryRow.name).trim();
    return rows.find(row => text(row && row.learnerId).trim() === id)
      || rows.find(row => mapLearnerIdentity(row).fallback === mapLearnerIdentity(summaryRow).fallback)
      || null;
  }

  function renderSummaryDetailedComputationsHtml(selected, visibleTerms, finalSummary, opts = {}) {
    if (!selected) return '';
    const terms = Array.isArray(visibleTerms) ? visibleTerms : getVisibleTerms();
    const numericFinal = !(opts && opts.isDescriptiveFinal);
    const finalResult = selected.finalResult || defaultComputed();
    const termLines = terms.map(termKey => {
      const result = selected.termResults && selected.termResults[termKey] ? selected.termResults[termKey] : defaultComputed();
      const rawValue = result.termGrade != null ? result.termGrade : result.finalDisplayedNumeric;
      const displayValue = numericFinal ? summaryReportedNumeric(rawValue, 60) : fmt(rawValue);
      return `${getSummaryTermColumnLabel(termKey)} = ${fmt(displayValue)}`;
    });
    const includedValues = terms.map(termKey => {
      const result = selected.termResults && selected.termResults[termKey] ? selected.termResults[termKey] : defaultComputed();
      const rawValue = result.termGrade != null ? result.termGrade : result.finalDisplayedNumeric;
      return numericFinal ? summaryReportedNumeric(rawValue, 60) : rawValue;
    }).filter(value => value != null && value !== '');
    const finalNumeric = finalResult.finalDisplayedNumeric != null ? finalResult.finalDisplayedNumeric : finalResult.termGrade;
    const finalFormula = numericFinal
      ? (terms.length > 1 ? `Final Grade = (${termLines.join(' + ')}) ÷ ${terms.length}` : `Final Grade = ${termLines[0] || 'selected term only'}`)
      : 'Final Descriptor = descriptor summary from the visible term/quarter results';
    const summarySection = `<div class="ctm-cr-computation-section ctm-cr-computation-total"><div class="ctm-cr-computation-title">Final / Summary Computation</div><div class="ctm-cr-computation-line">Included Periods: ${esc(terms.map(getSummaryTermColumnLabel).join(', ') || '—')}</div><div class="ctm-cr-computation-line">Computation Mode: ${esc(fmt(finalSummary && (finalSummary.finalComputationMode || finalSummary.numericMode)))}</div><div class="ctm-cr-computation-line">${esc(finalFormula)}</div><div class="ctm-cr-computation-line">Final / Summary Result: ${esc(fmt(numericFinal ? summaryReportedNumeric(finalNumeric, 60) : summaryDescriptorText(finalResult)))}</div><div class="ctm-cr-computation-line">Descriptor: ${esc(summaryDescriptorText(finalResult) || '—')}</div><div class="ctm-cr-computation-line">Remarks: ${esc(finalResult.remarks || '—')}</div></div>`;
    const termDetails = terms.map(termKey => {
      const term = state[termKey];
      const sourceRow = findSummarySourceTermRow(selected, termKey);
      if (!term || !sourceRow) {
        return `<div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">${esc(getSummaryTermColumnLabel(termKey))}</div><div class="ctm-cr-computation-warning">No source learner row was found for this period.</div></div>`;
      }
      const detail = renderComputationBreakdownHtml(buildLearnerComputationBreakdown(sourceRow, term, state.setupProfile || defaultSetupProfile()));
      return `<div class="ctm-cr-computation-section"><div class="ctm-cr-computation-title">${esc(getSummaryTermColumnLabel(termKey))} Source Computation</div>${detail || '<div class="ctm-cr-computation-warning">No detailed computation is available for this period.</div>'}</div>`;
    }).join('');
    return `<details class="ctm-cr-computation-details ctm-cr-summary-final-computation"><summary role="button" tabindex="0" aria-expanded="false">Summary Detailed Computations <span>Tap/click to view the final computation plus each term/quarter source breakdown</span></summary><div class="ctm-cr-computation-body">${summarySection}${termDetails}</div></details>`;
  }

  function syncComputationDetailsExpandedState(details) {
    if (!details) return;
    const summary = details.querySelector('summary');
    if (summary) summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
  }

  function toggleComputationDetailsFromSummary(summary) {
    if (!summary || !summary.closest) return;
    const details = summary.closest('.ctm-cr-computation-details');
    if (!details) return;
    details.open = !details.open;
    syncComputationDetailsExpandedState(details);
  }

  function onComputationDetailsClick(ev) {
    const summary = ev && ev.target && ev.target.closest ? ev.target.closest('.ctm-cr-computation-details > summary') : null;
    if (!summary) return;
    if (ev.cancelable) ev.preventDefault();
    if (ev.stopPropagation) ev.stopPropagation();
    toggleComputationDetailsFromSummary(summary);
  }

  function onComputationDetailsKeydown(ev) {
    const summary = ev && ev.target && ev.target.closest ? ev.target.closest('.ctm-cr-computation-details > summary') : null;
    if (!summary) return;
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    if (ev.cancelable) ev.preventDefault();
    if (ev.stopPropagation) ev.stopPropagation();
    toggleComputationDetailsFromSummary(summary);
  }

  function learnerStatusBadge(row, term) {
    const invalid = hasValidationIssue(row, term);
    const missing = missingScoreCount(row, term);
    const hasNumeric = isNumericTable(term.applicableTable);
    const hasEncodedHps = hasNumeric && visibleScoreFields(term).some(field => num(term.hps[field.group][field.key]) > 0);
    if (invalid) return '<span class="ctm-cr-status-tag bad">Invalid score</span>';
    if (!isNumericTable(term.applicableTable) && descriptorMissing(row, term)) return '<span class="ctm-cr-status-tag warn">Descriptor required</span>';
    if (hasNumeric && !hasEncodedHps) return '<span class="ctm-cr-status-tag warn">Set HPS</span>';
    if (row.computed.interventionFlag) return '<span class="ctm-cr-status-tag bad">Needs support</span>';
    if (missing) return `<span class="ctm-cr-status-tag">${missing} blank=0</span>`;
    return '<span class="ctm-cr-status-tag">Complete</span>';
  }

  function summaryMetricRangeNote(metricLabel, rangeText) {
    const label = text(metricLabel).trim() || 'Window';
    const value = text(rangeText).trim();
    return value ? `<div class="ctm-cr-summary-card-range ctm-cr-small ctm-cr-muted">${esc(label)}: ${esc(value)}</div>` : '<div class="ctm-cr-summary-card-range ctm-cr-small ctm-cr-muted">&nbsp;</div>';
  }

  function buildLearnerMiniList(termKey, term) {
    return buildLearnerDisplayList(term.learners || []).map(entry => { const row = entry.row; return `<div class="ctm-cr-learner-mini ${row.learnerId === state.activeLearnerId ? 'active' : ''}"><div>${entry.displayNo}</div><div><div><b>${esc(row.name)}</b></div><div class="ctm-cr-small ctm-cr-muted">${esc(row.sex)} • ${esc(fmt(row.computed.termGrade))}</div></div><button type="button" class="edit" data-pick-learner="${esc(row.learnerId)}" data-term-pick="${termKey}">Open</button></div>`; }).join('') || '<div class="ctm-cr-disclaimer">No learners loaded.</div>';
  }

function buildTermPanel(termKey) {
  const visibleTerms = getVisibleTerms();
  if (!visibleTerms.includes(termKey) && !(termKey === 'term4' && !isLegacyGrade12SemesterLayout())) {
    dom.panels[termKey].innerHTML = '';
    return;
  }
  const term = state[termKey];
  const learner = syncActiveLearner(termKey);
  const scoreFields = visibleScoreFields(term);
  const stats = termStats(termKey);
  const hasNumeric = isNumericTable(term.applicableTable);
  const legacyMode = isLegacyGrade12Term(term);
  const hideInstructionalResponse = shouldHideTermInstructionalResponse(termKey);
  const learnerEntries = buildLearnerDisplayList(term.learners || []);
  const learnerCount = learnerEntries.length;
  const activeLearnerMeta = learner ? (learnerDisplayMeta(term.learners || [], learner.learnerId) || null) : null;
  const idx = activeLearnerMeta ? activeLearnerMeta.displayNo : 0;
  const navIdx = activeLearnerMeta ? activeLearnerMeta.overallNo : 0;
  const hpsHtml = hasNumeric
    ? scoreFields.map(field => hpsField(termKey, field, term)).join('')
    : '';
  const scoreHtml = learner && hasNumeric ? scoreFields.map(field => scoreField(termKey, learner, field, term)).join('') : '';
  const descriptorHtml = learner && !hasNumeric ? descriptorSelect(termKey, learner, term) : '';
  const learnerAchievementSource = learner
    ? Object.assign({}, learner.computed || {}, (hideInstructionalResponse ? { instructionalResponse: '' } : {}))
    : null;
  const learnerAchievementTitle = getSubjectAchievementMeterTitle('Subject');
  const learnerAchievementHtml = learner ? renderAchievementMeter(learnerAchievementSource || {}, { tableKey: term.applicableTable, title: learnerAchievementTitle, ariaLabel: learner ? `${learner.name} ${learnerAchievementTitle} achievement meter` : `${learnerAchievementTitle} achievement meter` }) : '';
  const learnerComputationHtml = learner ? renderComputationBreakdownHtml(buildLearnerComputationBreakdown(learner, term, state.setupProfile || defaultSetupProfile())) : '';
  const learnerInfoHtml = learner
    ? `${hasNumeric ? `<div class="ctm-cr-pill-list" style="margin-bottom:.65rem;">${learnerStatusBadge(learner, term)}</div>` : ''}${learnerAchievementHtml}${learnerComputationHtml}`
    : '';
  const notesHtml = learner
    ? `<div class="ctm-cr-compact-header" style="margin-top:.75rem;"><div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-${esc(termKey)}-teacher-notes-${esc(slugify(learner.learnerId))}">Teacher Remarks</label><textarea id="cr-${esc(termKey)}-teacher-notes-${esc(slugify(learner.learnerId))}" name="cr-${esc(termKey)}-teacher-notes-${esc(slugify(learner.learnerId))}" rows="2" data-term="${termKey}" data-teacher-notes="1" data-learner-id="${esc(learner.learnerId)}">${esc(learner.computed.teacherNotes || '')}</textarea></div><div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-${esc(termKey)}-intervention-${esc(slugify(learner.learnerId))}">Intervention Notes</label><textarea id="cr-${esc(termKey)}-intervention-${esc(slugify(learner.learnerId))}" name="cr-${esc(termKey)}-intervention-${esc(slugify(learner.learnerId))}" rows="2" data-term="${termKey}" data-intervention="1" data-learner-id="${esc(learner.learnerId)}">${esc(learner.computed.interventionNotes || '')}</textarea></div></div>`
    : '';
  const validationNote = legacyMode
    ? 'Quarter layout retained with DO No. 8, s. 2015 weights and QA1 compatibility.'
    : (hasNumeric
        ? 'Shared HPS stays class-wide, while scores remain learner-specific and fully compatible with CSV import/export.'
        : 'Descriptor-based evidence entry remains intact and fully compatible with existing computation and CSV flows.');
  const termWindowText = attendanceWindowText((state.attendance && state.attendance.termWindows) || null, termKey);
  const termWindowNote = termWindowText
    ? `<div class="ctm-cr-attendance-range ctm-cr-small ctm-cr-muted">${esc(termWindowText)}</div>`
    : '';
  const termSetupHtml = hasNumeric
    ? `<div class="ctm-cr-section-card ctm-cr-term-setup" style="background:#e6e6e6;">
	
    <div class="ctm-cr-compact-cards" style="margin-top:.75rem;">
      <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Learners</div>
	  <div class="ctm-cr-strong">${learnerCount}</div></div>
      
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Encoded</div>
	  <div class="ctm-cr-strong">${stats.encoded}</div></div>
      
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Complete</div>
	  <div class="ctm-cr-strong">${stats.complete}</div></div>
      
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Incomplete</div>
	  <div class="ctm-cr-strong">${stats.incomplete}</div></div>
      
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Average</div><div class="ctm-cr-strong">${esc(fmt(stats.average))}</div></div>
	  
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Grading Mode</div>
	  <div class="ctm-cr-strong">${esc(fmt(term.gradingMode))}</div></div>
	  
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Numeric Mode</div>
	  <div class="ctm-cr-strong">${esc(fmt(term.numericMode || 'none'))}</div></div>
	  
	  <div class="ctm-cr-card"><div class="ctm-cr-mini-label">Applicable Table</div>
	  <div class="ctm-cr-strong">${esc(fmt(term.applicableTable))}</div></div><br />
    </div>	
	
	
	
        <div class="ctm-cr-mini-label ctm-cr-section-heading">Shared HPS / ${esc(term.termLabel)} Setup</div>
        <div class="ctm-cr-section-note" hidden>${esc(validationNote)}</div>
        ${isDraftNewSchoolYearRecord() ? '<div class="ctm-cr-section-note ctm-cr-hps-draft-note" role="note">HPS fields are disabled while the record status is Draft / New school-year record. Save or select a saved school-year record to edit HPS.</div>' : ''}
        <div class="ctm-cr-form-grid ctm-cr-term-entry-grid ctm-cr-term-setup-grid" style="margin-top:.75rem;">${hpsHtml}</div>
        <div class="ctm-cr-actions" style="margin-top:.85rem;"><button class="edit" type="button" data-term-action="clear-hps" data-term-key="${termKey}" ${isDraftNewSchoolYearRecord() ? 'disabled aria-disabled="true" title="Save or select a school-year record before editing HPS."' : ''}>Clear HPS</button><button class="edit" type="button" data-term-action="copy-prev" data-term-key="${termKey}" ${isDraftNewSchoolYearRecord() ? 'disabled aria-disabled="true" title="Save or select a school-year record before editing HPS."' : ''}>Copy Previous ${legacyMode ? 'Quarter' : 'Term'} HPS</button><button class="primary" type="button" data-term-action="save" data-term-key="${termKey}">Save ${legacyMode ? 'Quarter' : 'Term'}</button></div>
      </div>`
    : '';
  const learnersHtml = term.learners.length
    ? term.learners.map((row, rowIndex) => {
        const isActive = learner && row.learnerId === learner.learnerId;
        const status = hasNumeric ? fmt(row.computed.termGrade) : (row.computed.descriptorCode || row.computed.letterGrade || '—');
        return `<button class="ctm-cr-learner-mini ${isActive ? 'active' : ''}" type="button" data-pick-learner="${esc(row.learnerId)}"><div class="ctm-cr-status-tag">${rowIndex + 1}</div><div><div style="font-weight:700;">${esc(row.name)}</div><div class="ctm-cr-small ctm-cr-muted">${esc(row.sex)}${row.lrn ? ` • ${esc(row.lrn)}` : ''}</div></div><span class="ctm-cr-chip"><b>${esc(status)}</b></span></button>`;
      }).join('')
    : '<div class="ctm-cr-disclaimer">No learners available.</div>';
  dom.panels[termKey].dataset.showTermSetup = hasNumeric ? 'true' : 'false';
  dom.panels[termKey].classList.toggle('ctm-cr-descriptive-term', !hasNumeric);
  dom.panels[termKey].innerHTML = `
    <div class="ctm-cr-panel-title">${esc(term.termLabel)}</div>
	

    <div class="ctm-cr-term-layout">
      ${termSetupHtml}
      <div class="ctm-cr-section-card ctm-cr-term-editor ctm-cr-learner-card" style="background:#defcc7;" role="group" aria-label="Learner card. Swipe left or right to move to the next or previous learner.">
        
        ${learner ? `<div class="ctm-cr-nav" style="margin-top:.65rem;"><button class="edit" type="button" data-nav="prev" data-term="${termKey}" ${navIdx <= 1 ? 'disabled' : ''}>◀</button><div class="ctm-cr-nav-center"><div class="ctm-cr-field ctm-cr-term-mini-field ctm-cr-learner-picker-inline" style="margin:0 0 .35rem 0;"><select id="cr-${esc(termKey)}-learner-picker" name="cr-${esc(termKey)}-learner-picker" class="ctm-cr-picker-emphasis" style="width:100%;text-align:center;text-align-last:center;font-size:1.02rem;font-weight:700;" data-term-picker="${termKey}" aria-label="${esc(term.termLabel)} learner picker">${learnerEntries.map(entry => { const r = entry.row; return `<option value="${esc(r.learnerId)}" ${learner && r.learnerId === learner.learnerId ? 'selected' : ''}>${entry.displayNo}. ${esc(r.name)} (${esc(r.sex)})</option>`; }).join('')}</select></div><div class="ctm-cr-small">Learner ${idx} of ${learnerCount} • ${esc(learner.sex)}${learner.lrn ? ` • ${esc(learner.lrn)}` : ''}</div></div><button class="edit" type="button" data-nav="next" data-term="${termKey}" ${navIdx >= learnerCount ? 'disabled' : ''}>▶</button></div>${learnerInfoHtml}<div class="ctm-cr-form-grid ctm-cr-term-entry-grid" style="margin-top:.75rem;">${hasNumeric ? scoreHtml : descriptorHtml}</div>${learnerAttendanceSummaryHtml(learner, termKey)}${notesHtml}<div class="ctm-cr-actions" style="margin-top:.85rem;"><button class="edit" type="button" data-term-action="clear-active" data-term-key="${termKey}" data-active-learner="${esc(learner.learnerId)}">Clear Active Learner</button><button class="danger" type="button" data-term-action="clear-all-scores" data-term-key="${termKey}">Clear All ${hasNumeric ? 'Scores' : 'Descriptors'}</button></div>` : '<div class="ctm-cr-disclaimer" style="margin-top:.75rem;">No learners available.</div>'}
      </div>
    </div>`;
  bindTermPanel(termKey);
}
  function normalizeScoreEntryValue(term, row, group, key, rawValue, opts = {}) {
    const hv = num(term && term.hps && term.hps[group] && term.hps[group][key]);
    const result = { value: null, display: '', changed: false, clamped: false, max: hv };
    if (!(hv != null && hv > 0)) {
      if (row && row.scores && row.scores[group] && row.scores[group][key] != null) result.changed = true;
      if (row && row.scores && row.scores[group]) row.scores[group][key] = null;
      return result;
    }
    const raw = text(rawValue);
    const clean = raw.replace(/\D/g, '').slice(0, 4);
    if (!clean) {
      if (row && row.scores && row.scores[group] && row.scores[group][key] != null) result.changed = true;
      if (row && row.scores && row.scores[group]) row.scores[group][key] = null;
      return result;
    }
    let sv = Number(clean);
    if (!Number.isFinite(sv)) sv = null;
    if (sv == null) {
      if (row && row.scores && row.scores[group] && row.scores[group][key] != null) result.changed = true;
      if (row && row.scores && row.scores[group]) row.scores[group][key] = null;
      return result;
    }
    if (sv < 0) sv = 0;
    if (sv > hv) {
      sv = hv;
      result.clamped = true;
      if (!opts.silentClamp) flash(`${key.toUpperCase()} score was limited to HPS ${hv} for ${row.name}.`, 'warning');
    }
    if (Number.isInteger(hv)) sv = Math.round(sv);
    const old = num(row && row.scores && row.scores[group] && row.scores[group][key]);
    result.changed = old !== sv;
    result.value = sv;
    result.display = String(sv);
    if (row && row.scores && row.scores[group]) row.scores[group][key] = sv;
    return result;
  }

  function sanitizeScoreInput(term, row, group, key, rawValue, opts = {}) {
    return normalizeScoreEntryValue(term, row, group, key, rawValue, opts);
  }

  function normalizeHpsEntryValue(term, group, key, rawValue, opts = {}) {
    const target = term && term.hps && term.hps[group] ? term.hps[group] : null;
    const old = num(target && target[key]);
    const result = { value: null, display: '', changed: false, clamped: false, max: 9999 };
    const raw = text(rawValue);
    const clean = raw.replace(/\D/g, '').slice(0, 4);
    if (!clean) {
      result.changed = old != null;
      if (target) target[key] = null;
      return result;
    }
    let hv = Number(clean);
    if (!Number.isFinite(hv)) hv = null;
    if (hv == null) {
      result.changed = old != null;
      if (target) target[key] = null;
      return result;
    }
    if (hv < 0) hv = 0;
    if (hv > result.max) {
      hv = result.max;
      result.clamped = true;
      if (!opts.silentClamp) flash(`${key.toUpperCase()} HPS was limited to ${result.max}.`, 'warning');
    }
    hv = Math.round(hv);
    result.value = hv;
    result.display = String(hv);
    result.changed = old !== hv;
    if (target) target[key] = hv;
    return result;
  }

  function sanitizeHpsInput(term, group, key, rawValue, opts = {}) {
    return normalizeHpsEntryValue(term, group, key, rawValue, opts);
  }

  function hpsInputsForPanel(panel) {
    return Array.from((panel || document).querySelectorAll('[data-hps-key]:not(:disabled)'));
  }

  function focusRelativeHpsInput(panel, current, delta) {
    const inputs = hpsInputsForPanel(panel);
    if (!inputs.length || !current) return;
    const i = inputs.indexOf(current);
    const next = inputs[Math.max(0, Math.min(inputs.length - 1, (i < 0 ? 0 : i) + delta))];
    if (next && next !== current) {
      next.focus();
      try { next.select(); } catch (_) {}
    }
  }

  function refreshActiveLearnerScoreFieldsForHps(termKey, term) {
    const panel = dom.panels[termKey];
    if (!panel || !term || !isNumericTable(term.applicableTable)) return;
    visibleScoreFields(term).forEach(field => {
      const hv = num(term.hps[field.group][field.key]);
      const enabled = hv != null && hv > 0;
      const input = panel.querySelector(`[data-score-group="${CSS.escape(field.group)}"][data-score-key="${CSS.escape(field.key)}"]`);
      if (!input) return;
      const wrap = input.closest('.ctm-cr-field');
      const label = wrap ? wrap.querySelector('label') : null;
      const titleText = enabled ? `${field.label} / ${hv}` : `${field.label} disabled because HPS is blank`;
      if (wrap) wrap.classList.toggle('ctm-cr-score-disabled', !enabled);
      if (label) {
        label.textContent = `${field.label}${enabled ? `/${hv}` : ''}`;
        label.title = titleText;
      }
      input.disabled = !enabled;
      if (enabled) input.removeAttribute('aria-disabled');
      else input.setAttribute('aria-disabled', 'true');
      input.placeholder = enabled ? 'Score' : 'No HPS';
      input.setAttribute('aria-label', enabled ? `${field.label} learner score` : `${field.label} learner score disabled because HPS is blank`);
    });
  }

  function applyHpsChangeWithoutFullRender(termKey, fieldEl, opts = {}) {
    if (isDraftNewSchoolYearRecord()) {
      flash('HPS fields are disabled while this is a Draft / New school-year record. Save or select a saved school-year record first.', 'warning');
      return null;
    }
    const term = state[termKey];
    if (!term || !isNumericTable(term.applicableTable) || !fieldEl) return null;
    const result = sanitizeHpsInput(term, fieldEl.dataset.hpsGroup, fieldEl.dataset.hpsKey, fieldEl.value, opts);
    if (fieldEl.value !== result.display) {
      fieldEl.value = result.display;
      try { fieldEl.setSelectionRange(fieldEl.value.length, fieldEl.value.length); } catch (_) {}
    }
    recompute();
    const row = learnerRow(termKey, state.activeLearnerId) || syncActiveLearner(termKey);
    refreshActiveLearnerScoreFieldsForHps(termKey, term);
    if (row) refreshActiveLearnerCardComputed(termKey, row, term);
    return result;
  }

  function scoreInputsForPanel(panel) {
    return Array.from((panel || document).querySelectorAll('[data-score-key]:not(:disabled)'));
  }

  function refreshActiveLearnerCardComputed(termKey, row, term) {
    const panel = dom.panels[termKey];
    if (!panel || !row || !term) return;
    const hideInstructionalResponse = shouldHideTermInstructionalResponse(termKey);
    const achievementSource = Object.assign({}, row.computed || {}, (hideInstructionalResponse ? { instructionalResponse: '' } : {}));
    const title = getSubjectAchievementMeterTitle('Subject');
    const statusWrap = panel.querySelector('.ctm-cr-learner-card .ctm-cr-pill-list');
    if (statusWrap) statusWrap.innerHTML = learnerStatusBadge(row, term);
    const achievementWrap = panel.querySelector('.ctm-cr-learner-card .ctm-cr-achievement-wrap');
    if (achievementWrap) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderAchievementMeter(achievementSource, {
        tableKey: term.applicableTable,
        title,
        ariaLabel: `${row.name} ${title} achievement meter`
      });
      const next = wrapper.firstElementChild;
      if (next) achievementWrap.replaceWith(next);
    }
    const computationDetails = panel.querySelector('.ctm-cr-learner-card .ctm-cr-computation-details');
    const computationHtml = renderComputationBreakdownHtml(buildLearnerComputationBreakdown(row, term, state.setupProfile || defaultSetupProfile()));
    if (computationDetails && computationHtml) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = computationHtml;
      const next = wrapper.firstElementChild;
      if (next) computationDetails.replaceWith(next);
    }
    const activeMini = panel.querySelector(`[data-pick-learner="${CSS.escape(row.learnerId)}"] .ctm-cr-chip b`);
    if (activeMini) activeMini.textContent = fmt(row.computed && row.computed.termGrade);
  }

  function focusRelativeScoreInput(panel, current, delta) {
    const inputs = scoreInputsForPanel(panel);
    if (!inputs.length || !current) return;
    const i = inputs.indexOf(current);
    const next = inputs[Math.max(0, Math.min(inputs.length - 1, (i < 0 ? 0 : i) + delta))];
    if (next && next !== current) {
      next.focus();
      try { next.select(); } catch (_) {}
    }
  }

  function copyPreviousTermHps(termKey) {
    if (isDraftNewSchoolYearRecord()) {
      flash('HPS fields are disabled while this is a Draft / New school-year record. Save or select a saved school-year record first.', 'warning');
      return;
    }
    const term = state[termKey];
    if (!term || !isNumericTable(term.applicableTable)) {
      flash('Shared HPS is hidden and unused in descriptive grading mode.', 'info');
      return;
    }
    const visibleTerms = getVisibleTerms();
    const idx = visibleTerms.indexOf(termKey);
    const prev = idx > 0 ? state[visibleTerms[idx - 1]] : null;
    if (!prev || !isNumericTable(prev.applicableTable)) { flash('No previous visible numeric term HPS to copy.', 'info'); return; }
    state[termKey].hps = clone(prev.hps || blankHps());
    recompute();
    render();
    switchTab(termKey);
    persist(false);
    flash(`${getTermLabel(termKey)} HPS copied from previous visible term.`, 'success');
  }

function bindTermPanel(termKey) {
  const panel = dom.panels[termKey];
  panel.querySelectorAll('[data-hps-key]').forEach(el => {
    let lastValue = el.value;
    const applyHps = (options = {}) => {
      if (el.disabled || el.readOnly) return null;
      const result = applyHpsChangeWithoutFullRender(termKey, el, options);
      if (!result) return null;
      lastValue = el.value;
      return result;
    };
    el.addEventListener('input', () => {
      const result = applyHps({ silentClamp: true });
      if (!result) return;
      scheduleAutoPersist();
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === 'ArrowRight') {
        ev.preventDefault();
        applyHps({ silentClamp: true });
        focusRelativeHpsInput(panel, el, 1);
      } else if (ev.key === 'ArrowLeft') {
        const atStart = (el.selectionStart == null) || el.selectionStart <= 0;
        if (atStart) {
          ev.preventDefault();
          applyHps({ silentClamp: true });
          focusRelativeHpsInput(panel, el, -1);
        }
      }
    });
    el.addEventListener('focus', () => { try { el.select(); } catch (_) {} });
    el.addEventListener('change', () => {
      const result = applyHps({ silentClamp: false });
      if (!result) return;
      flushAutoPersist();
    });
    el.addEventListener('blur', () => {
      if (el.value === lastValue) return;
      const result = applyHps({ silentClamp: false });
      if (!result) return;
      flushAutoPersist();
    });
  });
  panel.querySelectorAll('[data-score-key]').forEach(el => {
    let lastValue = el.value;
    const applyScore = (options = {}) => {
      const row = learnerRow(termKey, el.dataset.learnerId), term = state[termKey];
      if (!row || !term || el.disabled || el.readOnly) return null;
      const result = sanitizeScoreInput(term, row, el.dataset.scoreGroup, el.dataset.scoreKey, el.value, options);
      if (el.value !== result.display) {
        el.value = result.display;
        try { el.setSelectionRange(el.value.length, el.value.length); } catch (_) {}
      }
      computeLearnerTerm(row, term);
      recomputeFinal();
      refreshActiveLearnerCardComputed(termKey, row, term);
      lastValue = el.value;
      return result;
    };
    el.addEventListener('input', () => {
      const result = applyScore({ silentClamp: true });
      if (!result) return;
      scheduleAutoPersist();
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === 'ArrowRight') {
        ev.preventDefault();
        applyScore({ silentClamp: true });
        focusRelativeScoreInput(panel, el, 1);
      } else if (ev.key === 'ArrowLeft') {
        const atStart = (el.selectionStart == null) || el.selectionStart <= 0;
        if (atStart) {
          ev.preventDefault();
          applyScore({ silentClamp: true });
          focusRelativeScoreInput(panel, el, -1);
        }
      }
    });
    el.addEventListener('focus', () => { try { el.select(); } catch (_) {} });
    el.addEventListener('change', () => {
      const result = applyScore({ silentClamp: false });
      if (!result) return;
      flushAutoPersist();
    });
    el.addEventListener('blur', () => {
      if (el.value === lastValue) return;
      const result = applyScore({ silentClamp: false });
      if (!result) return;
      flushAutoPersist();
    });
  });
  panel.querySelectorAll('[data-descriptor]').forEach(el => el.addEventListener('change', () => { const row = learnerRow(termKey, el.dataset.learnerId); if (!row) return; row.computed.letterGrade = el.value; row.computed.descriptorCode = el.value; computeLearnerTerm(row, state[termKey]); recomputeFinal(); render(); switchTab(termKey); persist(false); }));
  panel.querySelectorAll('[data-remarks]').forEach(el => {
    el.addEventListener('input', () => {
      const row = learnerRow(termKey, el.dataset.learnerId);
      if (!row) return;
      row.computed.remarks = el.value;
      recomputeFinal();
      renderFinal();
      scheduleAutoPersist();
    });
    el.addEventListener('change', () => {
      recomputeFinal();
      renderFinal();
      flushAutoPersist();
    });
  });
  panel.querySelectorAll('[data-teacher-notes]').forEach(el => {
    el.addEventListener('input', () => {
      const row = learnerRow(termKey, el.dataset.learnerId);
      if (!row) return;
      row.computed.teacherNotes = el.value;
      recomputeFinal();
      renderFinal();
      scheduleAutoPersist();
    });
    el.addEventListener('change', () => {
      recomputeFinal();
      renderFinal();
      flushAutoPersist();
    });
  });
  panel.querySelectorAll('[data-intervention]').forEach(el => {
    el.addEventListener('input', () => {
      const row = learnerRow(termKey, el.dataset.learnerId);
      if (!row) return;
      row.computed.interventionNotes = el.value;
      recomputeFinal();
      renderFinal();
      scheduleAutoPersist();
    });
    el.addEventListener('change', () => {
      recomputeFinal();
      renderFinal();
      flushAutoPersist();
    });
  });
  panel.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => jumpLearner(termKey, btn.dataset.nav)));
  panel.querySelectorAll('[data-term-picker]').forEach(el => el.addEventListener('change', () => { state.activeLearnerId = el.value; render(); switchTab(termKey); }));
  panel.querySelectorAll('[data-pick-learner]').forEach(btn => btn.addEventListener('click', () => { state.activeLearnerId = btn.dataset.pickLearner; render(); switchTab(termKey); }));
  bindTermLearnerCardSwipe(termKey);
  panel.querySelectorAll('[data-term-action]').forEach(btn => btn.addEventListener('click', () => {
    const term = state[termKey];
    if (btn.dataset.termAction === 'save') { persist(); return; }
    if (btn.dataset.termAction === 'copy-prev') { copyPreviousTermHps(termKey); return; }
    if (btn.dataset.termAction === 'clear-hps') { if (isDraftNewSchoolYearRecord()) { flash('HPS fields are disabled while this is a Draft / New school-year record. Save or select a saved school-year record first.', 'warning'); return; } if (!isNumericTable(term.applicableTable)) { flash('Shared HPS is hidden and unused in descriptive grading mode.', 'info'); return; } if (!window.confirm(`Clear shared HPS for ${TERM_LABELS[termKey]}?`)) return; term.hps = blankHps(); recompute(); render(); switchTab(termKey); persist(false); flash(`${TERM_LABELS[termKey]} HPS cleared.`, 'success'); return; }
    if (btn.dataset.termAction === 'clear-active') { const row = learnerRow(termKey, btn.dataset.activeLearner); if (!row) return; if (!window.confirm(isNumericTable(term.applicableTable) ? `Clear raw scores for ${row.name}?` : `Clear descriptor for ${row.name}?`)) return; clearLearnerTermEntry(row, term); recomputeFinal(); render(); switchTab(termKey); persist(false); flash(isNumericTable(term.applicableTable) ? `${row.name} scores cleared.` : `${row.name} descriptor cleared.`, 'success'); return; }
    if (btn.dataset.termAction === 'clear-all-scores') { if (!window.confirm(isNumericTable(term.applicableTable) ? `Clear all learner scores in ${TERM_LABELS[termKey]}?` : `Clear all learner descriptors in ${TERM_LABELS[termKey]}?`)) return; term.learners.forEach(row => clearLearnerTermEntry(row, term)); recomputeFinal(); render(); switchTab(termKey); persist(false); flash(isNumericTable(term.applicableTable) ? `${TERM_LABELS[termKey]} scores cleared.` : `${TERM_LABELS[termKey]} descriptors cleared.`, 'success'); return; }
  }));
}
function scrollFinalSelectedRowIntoView(tr) {
  const wrap = $id('crFinalTableScroll') || (tr && tr.closest && tr.closest('.ctm-cr-final-scroll'));
  if (!wrap || !tr) return;
  const head = wrap.querySelector('thead');
  const headH = head ? head.offsetHeight : 0;
  const top = tr.offsetTop;
  const bottom = top + tr.offsetHeight;
  const viewTop = wrap.scrollTop;
  const viewBottom = viewTop + wrap.clientHeight;
  if (top < viewTop + headH) {
    wrap.scrollTop = Math.max(0, top - headH);
  } else if (bottom > viewBottom) {
    wrap.scrollTop = bottom - wrap.clientHeight;
  }
}
function syncSelectableFinalRows(table) {
  const tbody = table && table.querySelector ? table.querySelector('tbody') : null;
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr[data-learner-id]'));
  let selectedId = text(state.finalSelectedLearnerId).trim();
  const selectedExists = selectedId && rows.some(tr => tr.getAttribute('data-learner-id') === selectedId);
  if (selectedId && !selectedExists) {
    state.finalSelectedLearnerId = '';
    selectedId = '';
  }
  rows.forEach(tr => {
    const rowId = tr.getAttribute('data-learner-id') || '';
    const isSelected = !!selectedId && rowId === selectedId;
    tr.classList.add('ctm-cr-final-row');
    tr.tabIndex = 0;
    tr.setAttribute('role', 'button');
    tr.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    tr.classList.toggle('is-selected', isSelected);
    tr.title = 'Click to select this learner row';
    const selectRow = () => {
      state.finalSelectedLearnerId = rowId;
      renderFinal();
    };
    tr.onclick = selectRow;
    tr.onkeydown = (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        selectRow();
      }
    };
    if (isSelected) window.requestAnimationFrame(() => scrollFinalSelectedRowIntoView(tr));
  });
}
function renderFinal() {
  const panel = dom.panels.final || $id('crPanelFinal');
  if (!panel) return;
  const customFinalMode = isCustomInstitutionalMode();
  const noContinuityG12 = isOfficialDepEdG12Sy2026NoContinuity();
  const legacy = !customFinalMode && isLegacyGrade12SemesterLayout() && !noContinuityG12;
  const finalSummary = state.finalSummary || defaultFinalSummary();
  // Compatibility guard: official DepEd final summaries store per-term data in
  // learner.termResults/finalResult, while the custom institutional final
  // summary stores learner.termGrades and row-level final fields. Normalize the
  // render-only row shape so Summary can display either format without changing
  // saved records, CSV payloads, or existing computation logic.
  const normalizeFinalSummaryLearnerRow = (sourceRow) => {
    const source = sourceRow && typeof sourceRow === 'object' ? sourceRow : {};
    const termResults = {};
    const sourceTermResults = source.termResults && typeof source.termResults === 'object' ? source.termResults : {};
    const sourceTermGrades = source.termGrades && typeof source.termGrades === 'object' ? source.termGrades : {};
    TERMS.forEach(termKey => {
      const fromResults = sourceTermResults[termKey] && typeof sourceTermResults[termKey] === 'object' ? sourceTermResults[termKey] : null;
      const fromGrades = Object.prototype.hasOwnProperty.call(sourceTermGrades, termKey) ? sourceTermGrades[termKey] : null;
      const base = Object.assign(defaultComputed(), fromResults || {});
      if (base.termGrade == null && fromGrades != null) base.termGrade = fromGrades;
      if (base.finalDisplayedNumeric == null && fromGrades != null && Number.isFinite(Number(fromGrades))) base.finalDisplayedNumeric = Number(fromGrades);
      termResults[termKey] = base;
    });
    const sourceFinal = source.finalResult && typeof source.finalResult === 'object' ? source.finalResult : {};
    const finalResult = Object.assign(defaultComputed(), sourceFinal);
    const fallbackFinalNumeric = source.finalDisplayedNumeric != null ? source.finalDisplayedNumeric : (source.finalGrade != null ? source.finalGrade : source.semesterGrade);
    if (finalResult.finalDisplayedNumeric == null && fallbackFinalNumeric != null) finalResult.finalDisplayedNumeric = fallbackFinalNumeric;
    if (finalResult.termGrade == null && fallbackFinalNumeric != null) finalResult.termGrade = fallbackFinalNumeric;
    if (!finalResult.letterGrade && source.letterGrade) finalResult.letterGrade = source.letterGrade;
    if (!finalResult.descriptorCode && source.descriptorCode) finalResult.descriptorCode = source.descriptorCode;
    if (!finalResult.descriptorLabel && source.descriptorLabel) finalResult.descriptorLabel = source.descriptorLabel;
    if (!finalResult.remarks && source.remarks) finalResult.remarks = source.remarks;
    if (!finalResult.teacherNotes && source.teacherNotes) finalResult.teacherNotes = source.teacherNotes;
    if (!finalResult.interventionNotes && source.interventionNotes) finalResult.interventionNotes = source.interventionNotes;
    if (!finalResult.generalDescription && source.generalDescription) finalResult.generalDescription = source.generalDescription;
    if (!finalResult.instructionalResponse && source.instructionalResponse) finalResult.instructionalResponse = source.instructionalResponse;
    if (!finalResult.tableUsed && source.tableUsed) finalResult.tableUsed = source.tableUsed;
    // v18.65: Some saved/final summary rows only carry the numeric grade plus
    // descriptor code/label. Rehydrate the Table 10 / Table 11 narrative fields
    // at render time so the Summary table cells do not stay blank, without
    // changing saved data, CSV shape, or computation logic.
    const finalNarrativeTable = finalResult.tableUsed || source.tableUsed || (finalSummary && finalSummary.applicableTable) || (state.setupProfile && state.setupProfile.resultTableResolved) || '';
    if (isNumericTable(finalNarrativeTable)) {
      const finalWithNarratives = ensureDescriptorFieldsForDisplay(finalResult, finalNarrativeTable);
      Object.assign(finalResult, finalWithNarratives || {});
    }
    const learnerId = text(source.learnerId || source.studentId || source.id || source.name);
    return Object.assign({}, source, {
      learnerId,
      name: text(source.name),
      sex: normalizeSex(source.sex),
      termResults,
      semesterGrade: source.semesterGrade != null ? source.semesterGrade : fallbackFinalNumeric,
      finalResult
    });
  };
  const learners = (Array.isArray(finalSummary.learners) ? finalSummary.learners : []).map(normalizeFinalSummaryLearnerRow);
  const learnerEntries = buildLearnerDisplayList(learners);
  const isDescriptiveFinal = !legacy && !['table10', 'table11'].includes(text(finalSummary.applicableTable));
  const hideSummaryRemarksForDescriptive = shouldHideSummaryRemarksForDescriptiveGrading(finalSummary);
  const hideFinalInstructionalResponseUnusedFields = shouldHideFinalKinderUnusedColumns();
  const showSummaryLetterColumn = shouldShowSummaryLetterColumn();
  const showSummaryFinalDescriptorColumn = shouldShowSummaryFinalDescriptorColumn();
  const visibleTerms = getVisibleTerms();
  const modified = !customFinalMode && isG12ModifiedThreeTermLayout();
  const threeTerm = !customFinalMode && isG12ThreeTermLayout();
  const hideDescResponseColumns = shouldHideSummaryDescResponseColumnsForG12ThreeTerm();
  const finalTitle = legacy ? `${getSemesterLabel() || 'Semester'} Final Grade Summary` : (modified ? `${getSummaryTermColumnLabel(visibleTerms[0])} Final Grade` : 'Summary');
  const finalNote = legacy
    ? (getSemesterLabel() === 'Second Semester'
        ? 'Second Semester subject record based on Quarter 3 and Quarter 4. Final Grade = average of Quarter 3 and Quarter 4.'
        : 'First Semester subject record based on Quarter 1 and Quarter 2. Final Grade = average of Quarter 1 and Quarter 2.')
    : (modified
        ? `Modified Three Term: Summary table uses the selected term label (${getSummaryTermColumnLabel(visibleTerms[0])}). Final Grade = selected term grade; other terms are NA/excluded.`
        : (noContinuityG12 ? 'Final Grade Summary based on Term 1 only. No subject continuity to succeeding terms.' : (threeTerm ? 'Three Term Summary based on Term 1, Term 2, and Term 3. Quarter 4 is preserved but NA/excluded.' : 'Final Grade Summary based on the selected Grade 12 SY 2026-2027 grading system.')));
  const selectedId = text(state.finalSelectedLearnerId).trim();
  const selectedEntry = learnerEntries.find(entry => text(entry && entry.row && (entry.row.learnerId || entry.row.name)).trim() === selectedId) || learnerEntries[0] || null;
  const selected = selectedEntry ? selectedEntry.row : null;
  if (selected) state.finalSelectedLearnerId = text(selected.learnerId || selected.name).trim();

  let tableHead = '';
  let rowColspan = 0;
  if (legacy) {
    const firstKey = visibleTerms[0];
    const secondKey = visibleTerms[1];
    rowColspan = 10;
    tableHead = `<thead><tr><th>#</th><th>Learner</th><th>Sex</th><th>${esc(getTermLabel(firstKey))}</th><th>${esc(getTermLabel(secondKey))}</th><th>Final Grade</th><th>Descriptor</th><th>Remarks</th><th>Teacher Remarks</th><th>Intervention Notes</th></tr></thead>`;
  } else if (isDescriptiveFinal) {
    const showInstructionalResponseColumn = !hideFinalInstructionalResponseUnusedFields && !hideDescResponseColumns;
    rowColspan = 8 + visibleTerms.length - (hideSummaryRemarksForDescriptive ? 1 : 0) - (showInstructionalResponseColumn ? 0 : 1) - (hideDescResponseColumns ? 1 : 0);
    tableHead = `<thead><tr><th>#</th><th>Learner</th><th>Sex</th>${visibleTerms.map(k => `<th>${esc(getSummaryTermColumnLabel(k))}</th>`).join('')}<th>Descriptor</th>${hideSummaryRemarksForDescriptive ? '' : '<th>Remarks</th>'}<th>Teacher Remarks</th><th>Intervention Notes</th>${hideDescResponseColumns ? '' : '<th>General Description</th>'}${showInstructionalResponseColumn ? '<th>Instructional Response</th>' : ''}</tr></thead>`;
  } else {
    rowColspan = 11 + visibleTerms.length - (showSummaryLetterColumn ? 0 : 1) - (hideDescResponseColumns ? 2 : 0);
    tableHead = `<thead><tr><th>#</th><th>Learner</th><th>Sex</th>${visibleTerms.map(k => `<th>${esc(getSummaryTermColumnLabel(k))}</th>`).join('')}<th>Final</th>${showSummaryLetterColumn ? '<th>Letter</th>' : ''}<th>Descriptor</th><th>Remarks</th><th>Teacher Remarks</th><th>Intervention Notes</th>${hideDescResponseColumns ? '' : '<th>General Description</th><th>Instructional Response</th>'}</tr></thead>`;
  }

  const tableRows = learnerEntries.map(entry => {
    const row = entry.row;
    const rowId = esc(row.learnerId || row.name);
    const rowNo = entry.displayNo;
    if (legacy) {
      const firstKey = visibleTerms[0];
      const secondKey = visibleTerms[1];
      return `<tr data-learner-id="${rowId}" data-sex-group="${esc(entry.sexGroup)}"><td>${rowNo}</td><td>${esc(row.name)}</td><td>${esc(row.sex)}</td><td>${esc(fmt(summaryReportedNumeric(row.termResults[firstKey] && row.termResults[firstKey].termGrade, 60)))}</td><td>${esc(fmt(summaryReportedNumeric(row.termResults[secondKey] && row.termResults[secondKey].termGrade, 60)))}</td><td>${esc(fmt(summaryReportedNumeric(row.semesterGrade, 60)))}</td><td>${esc(summaryDescriptorText(row.finalResult))}</td><td>${esc(row.finalResult.remarks || '')}</td><td>${esc(row.finalResult.teacherNotes || '')}</td><td>${esc(row.finalResult.interventionNotes || '')}</td></tr>`;
    }
    if (isDescriptiveFinal) {
      const termCells = visibleTerms.map(termKey => `<td>${esc(fmt(row.termResults[termKey] && row.termResults[termKey].termGrade))}</td>`).join('');
      const descriptionCells = hideDescResponseColumns ? '' : `<td>${esc(row.finalResult.generalDescription || '')}</td>${hideFinalInstructionalResponseUnusedFields ? '' : `<td>${esc(row.finalResult.instructionalResponse || '')}</td>`}`;
      return `<tr data-learner-id="${rowId}" data-sex-group="${esc(entry.sexGroup)}"><td>${rowNo}</td><td>${esc(row.name)}</td><td>${esc(row.sex)}</td>${termCells}<td>${esc(summaryDescriptorText(row.finalResult))}</td>${hideSummaryRemarksForDescriptive ? '' : `<td>${esc(row.finalResult.remarks || '')}</td>`}<td>${esc(row.finalResult.teacherNotes || '')}</td><td>${esc(row.finalResult.interventionNotes || '')}</td>${descriptionCells}</tr>`;
    }
    const termCells = visibleTerms.map(termKey => `<td>${esc(fmt(summaryReportedNumeric(row.termResults[termKey] && row.termResults[termKey].termGrade, 60)))}</td>`).join('');
    const descriptionCells = hideDescResponseColumns ? '' : `<td>${esc(row.finalResult.generalDescription || '')}</td><td>${esc(row.finalResult.instructionalResponse || '')}</td>`;
    return `<tr data-learner-id="${rowId}" data-sex-group="${esc(entry.sexGroup)}"><td>${rowNo}</td><td>${esc(row.name)}</td><td>${esc(row.sex)}</td>${termCells}<td>${esc(fmt(summaryReportedNumeric((row.finalResult.finalDisplayedNumeric != null ? row.finalResult.finalDisplayedNumeric : row.finalResult.termGrade), 60)))}</td>${showSummaryLetterColumn ? `<td>${esc(row.finalResult.letterGrade || '')}</td>` : ''}<td>${esc(summaryDescriptorText(row.finalResult))}</td><td>${esc(row.finalResult.remarks || '')}</td><td>${esc(row.finalResult.teacherNotes || '')}</td><td>${esc(row.finalResult.interventionNotes || '')}</td>${descriptionCells}</tr>`;
  }).join('') || `<tr><td colspan="${rowColspan}">${legacy ? 'No semester summary yet.' : 'No final summary yet.'}</td></tr>`;
  const finalRangeNote = '';
  const topCards = [
    `<div class="ctm-cr-card"><div class="ctm-cr-mini-label">Class Average</div><div id="crFinalClassAverage" class="ctm-cr-strong">${esc(fmt(finalSummary.classSummary && finalSummary.classSummary.classAverage))}</div></div>`,
    `<div class="ctm-cr-card"><div class="ctm-cr-mini-label">Passing Count</div><div id="crFinalPassingCount" class="ctm-cr-strong">${esc(fmt(finalSummary.classSummary && finalSummary.classSummary.passingCount))}</div></div>`,
    `<div class="ctm-cr-card"><div class="ctm-cr-mini-label">Non-Passing Count</div><div id="crFinalNonPassingCount" class="ctm-cr-strong">${esc(fmt(finalSummary.classSummary && finalSummary.classSummary.nonPassingCount))}</div></div>`,
    `<div class="ctm-cr-card"><div class="ctm-cr-mini-label">Learners Summarized</div><div class="ctm-cr-strong">${learners.length}</div></div>`,
    `<div class="ctm-cr-card ctm-cr-summary-row2-half"><div class="ctm-cr-mini-label">Computation Mode</div><div class="ctm-cr-strong">${esc(fmt(finalSummary.finalComputationMode || finalSummary.numericMode || '—'))}</div></div>`,
	`<div class="ctm-cr-card ctm-cr-summary-row2-half"><div class="ctm-cr-mini-label">Table Used</div><div id="crFinalTableUsed" class="ctm-cr-strong">${esc(fmt(finalSummary.classSummary && finalSummary.classSummary.tableUsed))}</div></div>`
  ].join('');

  let selectedSummaryHtml = '<div class="ctm-cr-disclaimer">Select a learner row to review the summary details.</div>';
  if (selected) {
    const row1Cards = [];
    const selectedAchievementTitle = getSubjectAchievementMeterTitle('Subject');
    const selectedAchievementHtml = renderAchievementMeter(selected.finalResult || {}, { tableKey: selected.finalResult.tableUsed || finalSummary.applicableTable, title: selectedAchievementTitle, ariaLabel: selected ? `${selected.name} ${selectedAchievementTitle} achievement meter` : `${selectedAchievementTitle} achievement meter` });
    if (legacy) {
      const firstKey = visibleTerms[0];
      const secondKey = visibleTerms[1];
      row1Cards.push(renderResultTextChipCard(getTermLabel(firstKey), selected.termResults[firstKey] || {}, { gradeValue: summaryReportedNumeric(selected.termResults[firstKey] && selected.termResults[firstKey].termGrade, 60), fallbackValue: '—' }));
      row1Cards.push(renderResultTextChipCard(getTermLabel(secondKey), selected.termResults[secondKey] || {}, { gradeValue: summaryReportedNumeric(selected.termResults[secondKey] && selected.termResults[secondKey].termGrade, 60), fallbackValue: '—' }));
    } else {
      visibleTerms.forEach(termKey => {
        const result = selected.termResults && selected.termResults[termKey] ? selected.termResults[termKey] : defaultComputed();
        const displayValue = isDescriptiveFinal ? result.termGrade : summaryReportedNumeric(result.termGrade, 60);
        row1Cards.push(renderResultTextChipCard(getTermLabel(termKey), result || {}, { gradeValue: displayValue, fallbackValue: '—' }));
      });
    }

    const attendanceSummaryCard = finalLearnerAttendanceSummaryHtml(selected, visibleTerms);
    const summaryComputationHtml = renderSummaryDetailedComputationsHtml(selected, visibleTerms, finalSummary, { legacy, isDescriptiveFinal });
    const detailFields = [
      `<div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-final-teacher-notes-readonly">Teacher Remarks</label><textarea id="cr-final-teacher-notes-readonly" name="cr-final-teacher-notes-readonly" rows="2" readonly>${esc(selected.finalResult.teacherNotes || '')}</textarea></div>`,
      `<div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-final-intervention-notes-readonly">Intervention Notes</label><textarea id="cr-final-intervention-notes-readonly" name="cr-final-intervention-notes-readonly" rows="2" readonly>${esc(selected.finalResult.interventionNotes || '')}</textarea></div>`
    ];

    selectedSummaryHtml = `<div class="ctm-cr-summary-selected-row row-count-${row1Cards.length}">${row1Cards.join('')}</div>${selectedAchievementHtml}${summaryComputationHtml ? `<div class="ctm-cr-summary-detail-grid" style="margin-top:.85rem;">${summaryComputationHtml}</div>` : ''}${attendanceSummaryCard ? `<div class="ctm-cr-summary-detail-grid" style="margin-top:.85rem;">${attendanceSummaryCard}</div>` : ''}<div class="ctm-cr-summary-detail-grid" style="margin-top:.85rem;">${detailFields.join('')}</div>`;
  }

  panel.innerHTML = `
    <div class="ctm-cr-panel-title">${esc(finalTitle)}</div>
    <div class="ctm-cr-disclaimer" hidden>${esc(finalNote)} This refreshed Summary layout matches the compact card/field treatment used in the Term and Quarter tabs while retaining all computations and data compatibility.</div>
    <div class="ctm-cr-summary-layout">
      <div class="ctm-cr-section-card ctm-cr-summary-table" style="background:#e6e6e6;">
        <div class="ctm-cr-summary-table-header">
          <div class="ctm-cr-mini-label ctm-cr-section-heading">Summary Register</div>
          <div class="ctm-cr-section-note">Click a learner row to inspect the selected summary details below.</div>
        </div>
        <div class="ctm-cr-summary-top-grid ctm-cr-summary-top-grid--inside">${topCards}</div>
        <div class="table-scroll ctm-cr-table-scroll ctm-cr-final-scroll" id="crFinalTableScroll" aria-label="Scrollable class record summary table"><table id="crFinalTable" class="ctm-cr-table">${tableHead}<tbody>${tableRows}</tbody></table></div>
      </div>
      <div class="ctm-cr-section-card ctm-cr-summary-detail" style="background:#defcc7;">
        <div class="ctm-cr-mini-label ctm-cr-section-heading">Selected Learner Summary</div>
        <div class="ctm-cr-section-note">Swipe left or right on this card to move through learners.</div>
        ${selected ? `<div class="ctm-cr-selected-learner-title">${esc(selected.name)} • ${esc(selected.sex)}</div>` : '<div class="ctm-cr-section-note">No learner selected.</div>'}
        <div style="margin-top:.75rem;">${selectedSummaryHtml}</div>
      </div>
    </div>`;

  dom.finalTable = $id('crFinalTable');
  dom.finalBody = dom.finalTable ? dom.finalTable.querySelector('tbody') : null;
  dom.finalClassAverage = $id('crFinalClassAverage');
  dom.finalPassingCount = $id('crFinalPassingCount');
  dom.finalNonPassingCount = $id('crFinalNonPassingCount');
  dom.finalTableUsed = $id('crFinalTableUsed');
  if (dom.finalTable) syncSelectableFinalRows(dom.finalTable);
  bindFinalLearnerCardSwipe();
}
  function renderAttendance() { dom.attBody.innerHTML = state.attendance.rows.map((row, idx) => `<tr><td>${idx + 1}</td><td>${esc(row.name)}</td><td>${esc(row.sex)}</td><td>${row.Present}</td><td>${row.Absent}</td><td>${row.Tardy}</td><td>${row.Cutting}</td><td>${row.Excuse}</td><td>${row.Pending}</td></tr>`).join('') || '<tr><td colspan="9">No attendance data found.</td></tr>'; }
  // v18.48 MAPEH component bundle + consolidated summary
  function findMapehComponentRecordKey(bundleId, componentKey) {
    const targetSubject = getMapehComponentSubject(componentKey);
    const bundle = text(bundleId).trim();
    const baseHeader = state.recordHeader || {};
    const keys = loadIndex().map(item => text(item && item.key).trim()).filter(Boolean);
    let safeFallbackKey = '';
    for (const key of keys) {
      try {
        const payload = JSON.parse(localStorage.getItem(key) || 'null');
        const h = payload && payload.recordHeader;
        if (!h) continue;
        const isTarget = text(h.mapehComponent).trim() === componentKey || text(h.subject).trim() === targetSubject || normalizeMapehComponent(h.subject) === componentKey;
        if (!isTarget) continue;
        if (bundle && text(h.mapehBundleId).trim() === bundle) return key;
        if (!safeFallbackKey && sameMapehFallbackBundle(h, baseHeader)) safeFallbackKey = key;
      } catch (_) {}
    }
    if (safeFallbackKey) return safeFallbackKey;
    const legacyKey = `classrecord-sy::${slugify(state.recordHeader.classId || state.classId)}::${slugify(state.recordHeader.schoolYear)}::${slugify(targetSubject)}`;
    try { if (localStorage.getItem(legacyKey)) return legacyKey; } catch (_) {}
    return '';
  }
  function findMapehPairedRecords(bundleId = getMapehBundleId(state.recordHeader)) {
    const out = { bundleId: text(bundleId).trim(), musicArts: null, peHealth: null, legacyDetected: false, warnings: [] };
    MAPEH_COMPONENTS.forEach(meta => {
      const key = findMapehComponentRecordKey(out.bundleId, meta.key);
      if (!key) {
        out[meta.key] = null;
        out.warnings.push(`${meta.shortLabel || meta.label} component record is missing.`);
        return;
      }
      try {
        const payload = JSON.parse(localStorage.getItem(key) || 'null');
        out[meta.key] = payload ? Object.assign({ __storageKey: key }, payload) : null;
      } catch (_) {
        out[meta.key] = null;
        out.warnings.push(`${meta.shortLabel || meta.label} component record could not be loaded.`);
      }
    });
    try {
      loadIndex().forEach(item => {
        const key = text(item && item.key).trim();
        if (!key) return;
        const payload = JSON.parse(localStorage.getItem(key) || 'null');
        const h = payload && payload.recordHeader || {};
        const legacyHit = MAPEH_LEGACY_COMPONENTS.some(meta => text(h.mapehComponent).trim() === meta.key || text(h.subject).trim() === meta.subject || normalizeMapehComponent(h.subject) === meta.key);
        if (legacyHit && (text(h.mapehBundleId).trim() === out.bundleId || sameMapehFallbackBundle(h, state.recordHeader))) out.legacyDetected = true;
      });
    } catch (_) {}
    if (out.legacyDetected) out.warnings.push('Legacy four-component MAPEH records detected. This Summary currently expects paired Music & Arts and PE & Health records.');
    return out;
  }
  function makeMapehComponentSnapshot(componentKey, baseHeader) {
    const h = Object.assign(defaultRecordHeader(), clone(baseHeader || state.recordHeader || {}));
    h.recordId = '';
    h.subjectGroup = 'EPP / TLE / MAPEH';
    h.subject = getMapehComponentSubject(componentKey);
    h.subjectKey = slugify(h.subject);
    h.mapehMode = 'component';
    h.mapehComponent = componentKey;
    h.mapehBundleId = h.mapehBundleId || makeMapehBundleId(h);
    h.mapehReportSubject = 'MAPEH';
    const prevHeader = state.recordHeader, prevSetup = state.setupProfile;
    state.recordHeader = h;
    state.setupProfile = resolvePolicy();
    const setup = clone(state.setupProfile);
    const payload = { schemaVersion: FORM_VERSION, roster: clone(state.roster), recordHeader: clone(h), setupProfile: setup, finalSummary: defaultFinalSummary(), attendance: defaultAttendance() };
    TERMS.forEach(k => {
      const t = defaultTerm(k);
      t.termLabel = getTermLabel(k, h.gradeLevel, h.schoolYear);
      t.applicableTable = setup.resultTableResolved;
      t.gradingMode = setup.gradingModeResolved;
      t.numericMode = setup.transitionRuleResolved.numericMode || 'none';
      t.assessmentConfig = Object.assign({ wwCount: 0, ptCount: 0, stCount: 0, hasTE: false, qaCount: 0 }, clone(setup.assessmentCounts));
      t.learners = state.roster.map(makeLearnerRow);
      payload[k] = t;
    });
    state.recordHeader = prevHeader;
    state.setupProfile = prevSetup;
    return payload;
  }
  function ensureMapehComponentRecords(bundleId, options = {}) {
    if (!bundleId || !shouldShowMapehUi()) return { created: [], existing: [] };
    const created = [], existing = [];
    MAPEH_COMPONENTS.forEach(meta => {
      const found = findMapehComponentRecordKey(bundleId, meta.key);
      if (found) { existing.push(meta.key); return; }
      const payload = makeMapehComponentSnapshot(meta.key, Object.assign({}, state.recordHeader, options.header || {}, { mapehBundleId: bundleId }));
      const oldHeader = state.recordHeader;
      state.recordHeader = payload.recordHeader;
      const key = storageKey();
      payload.recordHeader.recordId = key;
      localStorage.setItem(key, JSON.stringify(payload));
      saveIndex(key, '');
      state.recordHeader = oldHeader;
      created.push(meta.key);
    });
    return { created, existing };
  }
  function loadMapehComponentRecords(bundleId) {
    const out = {};
    MAPEH_COMPONENTS.forEach(meta => {
      const key = findMapehComponentRecordKey(bundleId, meta.key);
      if (!key) { out[meta.key] = null; return; }
      try { out[meta.key] = JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { out[meta.key] = null; }
    });
    return out;
  }
  function getMapehBundleRecordKeys(bundleId) {
    const id = text(bundleId).trim();
    if (!id) return [];
    const found = new Set();
    loadIndex().forEach(item => {
      const key = text((item && item.key) || item).trim();
      if (!key) return;
      try {
        const payload = JSON.parse(localStorage.getItem(key) || 'null');
        const h = payload && payload.recordHeader || {};
        if (text(h.mapehBundleId).trim() === id) found.add(key);
      } catch (_) {}
    });
    MAPEH_COMPONENTS.forEach(meta => {
      const key = findMapehComponentRecordKey(id, meta.key);
      if (key) found.add(key);
    });
    return Array.from(found);
  }
  function deleteMapehBundleRecords(bundleId) {
    const keys = getMapehBundleRecordKeys(bundleId);
    keys.forEach(key => { try { localStorage.removeItem(key); } catch (_) {} });
    try { localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(loadIndex(), keys))); } catch (_) {}
    return keys.length;
  }
  function componentRowForLearner(record, termKey, learner) {
    const term = record && record[termKey];
    const rows = term && Array.isArray(term.learners) ? term.learners : [];
    const ident = mapLearnerIdentity(learner);
    return rows.find(r => ident.id && text(r && r.learnerId).trim() === ident.id) || rows.find(r => mapLearnerIdentity(r).fallback === ident.fallback) || null;
  }
  function mapehRowKey(row) { const ident = mapLearnerIdentity(row || {}); return ident.id ? `id:${ident.id}` : `name:${ident.fallback}`; }
  function mapehLearnerFromRow(row) { return { learnerId: text(row && (row.learnerId || row.id || row.studentId || row.lrn || row.name)).trim(), id: text(row && (row.learnerId || row.id || row.studentId || row.lrn || row.name)).trim(), lrn: text(row && row.lrn).trim(), name: text(row && row.name).trim(), sex: normalizeSex(row && row.sex) }; }
  function collectMapehRecordLearners(record) {
    const keyed = new Map();
    const add = row => { if (!row) return; const learner = mapehLearnerFromRow(row); if (!learner.name && !learner.learnerId) return; const key = mapehRowKey(learner); if (!keyed.has(key)) keyed.set(key, learner); };
    (Array.isArray(record && record.roster) ? record.roster : []).forEach(add);
    TERMS.forEach(k => { const term = record && record[k]; (Array.isArray(term && term.learners) ? term.learners : []).forEach(add); });
    return Array.from(keyed.values());
  }
  function buildMapehLearnerRows(musicArtsRecord, peHealthRecord) {
    const keyed = new Map();
    (Array.isArray(state.roster) ? state.roster : []).forEach(row => { const l = mapehLearnerFromRow(row); if (l.name || l.learnerId) keyed.set(mapehRowKey(l), l); });
    collectMapehRecordLearners(musicArtsRecord).forEach(l => { const key = mapehRowKey(l); if (!keyed.has(key)) keyed.set(key, l); });
    collectMapehRecordLearners(peHealthRecord).forEach(l => { const key = mapehRowKey(l); if (!keyed.has(key)) keyed.set(key, l); });
    return Array.from(keyed.values());
  }
  function computeMapehTermGrade(musicArtsGrade, peHealthGrade) {
    const ma = num(musicArtsGrade), pe = num(peHealthGrade);
    return ma == null || pe == null ? null : roundWhole((ma + pe) / 2);
  }
  function computeMapehFinalGrade(termGrades) {
    const vals = (Array.isArray(termGrades) ? termGrades : Object.values(termGrades || {})).map(num).filter(v => v != null);
    return vals.length ? roundWhole(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }
  function mapehComponentFinal(record, learner) {
    const vals = getVisibleTerms().map(k => {
      const row = componentRowForLearner(record, k, learner);
      return row && row.computed ? num(row.computed.finalDisplayedNumeric != null ? row.computed.finalDisplayedNumeric : row.computed.termGrade) : null;
    }).filter(v => v != null);
    return vals.length ? roundWhole(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }
  function computeMapehConsolidatedSummary(bundleIdOrRecords) {
    const paired = (bundleIdOrRecords && (bundleIdOrRecords.musicArts !== undefined || bundleIdOrRecords.peHealth !== undefined)) ? bundleIdOrRecords : findMapehPairedRecords(bundleIdOrRecords || getMapehBundleId(state.recordHeader));
    const componentRecords = { musicArts: paired.musicArts || null, peHealth: paired.peHealth || null };
    const visibleTerms = getVisibleTerms();
    const warnings = Array.isArray(paired.warnings) ? paired.warnings.slice() : [];
    const genericWarning = 'MAPEH Summary combines Music & Arts and PE & Health. Missing paired component grades are not treated as zero and are marked Incomplete.';
    if (!warnings.includes(genericWarning)) warnings.unshift(genericWarning);
    const learnersBase = buildMapehLearnerRows(componentRecords.musicArts, componentRecords.peHealth);
    const rows = learnersBase.map(learner => {
      const id = text(learner.learnerId || learner.id || learner.name);
      const terms = {}, termGrades = {}, termBreakdown = {}, warningNotes = [];
      visibleTerms.forEach(termKey => {
        const maRow = componentRowForLearner(componentRecords.musicArts, termKey, learner);
        const peRow = componentRowForLearner(componentRecords.peHealth, termKey, learner);
        const maGrade = maRow && maRow.computed ? num(maRow.computed.finalDisplayedNumeric != null ? maRow.computed.finalDisplayedNumeric : maRow.computed.termGrade) : null;
        const peGrade = peRow && peRow.computed ? num(peRow.computed.finalDisplayedNumeric != null ? peRow.computed.finalDisplayedNumeric : peRow.computed.termGrade) : null;
        const missing = [];
        if (maGrade == null) missing.push('Music & Arts');
        if (peGrade == null) missing.push('PE & Health');
        const mapehGrade = computeMapehTermGrade(maGrade, peGrade);
        const complete = mapehGrade != null;
        if (!complete) warningNotes.push(`${getSummaryTermColumnLabel(termKey)}: Missing ${missing.join(' and ')}`);
        terms[termKey] = { label: getSummaryTermColumnLabel(termKey), musicArtsGrade: maGrade, peHealthGrade: peGrade, mapehGrade, complete, missing };
        termGrades[termKey] = mapehGrade;
        termBreakdown[termKey] = { musicArts: maGrade, peHealth: peGrade };
      });
      const completeTermValues = visibleTerms.map(k => termGrades[k]).filter(v => num(v) != null);
      const finalMapehGrade = computeMapehFinalGrade(completeTermValues);
      const incomplete = visibleTerms.some(k => !(terms[k] && terms[k].complete)) || !componentRecords.musicArts || !componentRecords.peHealth;
      const descriptorTable = (state.setupProfile && state.setupProfile.resultTableResolved) || 'table11';
      const desc = finalMapehGrade == null ? null : numericDescriptor(finalMapehGrade, descriptorTable);
      const componentFinals = { musicArts: mapehComponentFinal(componentRecords.musicArts, learner), peHealth: mapehComponentFinal(componentRecords.peHealth, learner) };
      return {
        learnerId: id, name: text(learner.name), sex: normalizeSex(learner.sex), terms, termGrades, termBreakdown, componentFinals,
        finalMapehGrade, finalGrade: finalMapehGrade, finalDisplayedNumeric: finalMapehGrade,
        descriptorCode: desc ? (desc.descriptorCode || desc.code || '') : '', descriptorLabel: desc ? (desc.descriptorLabel || desc.label || '') : '',
        generalDescription: desc ? (desc.generalDescription || '') : '', instructionalResponse: desc ? (desc.instructionalResponse || '') : '',
        remarks: finalMapehGrade == null ? 'Incomplete' : (incomplete ? 'Incomplete' : (finalMapehGrade >= PASSING_GRADE ? 'Passed' : 'Failed')),
        incomplete, warningNotes
      };
    });
    // roster alignment warnings
    const maKeys = new Set(collectMapehRecordLearners(componentRecords.musicArts).map(mapehRowKey));
    const peKeys = new Set(collectMapehRecordLearners(componentRecords.peHealth).map(mapehRowKey));
    maKeys.forEach(k => { if (!peKeys.has(k)) warnings.push('A learner exists in Music & Arts but not in PE & Health.'); });
    peKeys.forEach(k => { if (!maKeys.has(k)) warnings.push('A learner exists in PE & Health but not in Music & Arts.'); });
    if (maKeys.size && peKeys.size && (maKeys.size !== peKeys.size || Array.from(maKeys).some(k => !peKeys.has(k)))) warnings.push('Component rosters do not align.');
    rows.forEach(r => (r.warningNotes || []).forEach(note => warnings.push(`${r.name || r.learnerId}: ${note}`)));
    const nums = rows.map(r => num(r.finalMapehGrade)).filter(v => v != null && !rows.find(x => x.finalMapehGrade === v && x.incomplete));
    const completeRows = rows.filter(r => !r.incomplete && num(r.finalMapehGrade) != null);
    return {
      mode: 'mapehConsolidated', tableUsed: 'MAPEH paired average', visibleTerms,
      components: {
        musicArts: { recordId: text(componentRecords.musicArts && (componentRecords.musicArts.__storageKey || componentRecords.musicArts.recordHeader && componentRecords.musicArts.recordHeader.recordId)), subject: getMapehComponentSubject('musicArts'), found: !!componentRecords.musicArts },
        peHealth: { recordId: text(componentRecords.peHealth && (componentRecords.peHealth.__storageKey || componentRecords.peHealth.recordHeader && componentRecords.peHealth.recordHeader.recordId)), subject: getMapehComponentSubject('peHealth'), found: !!componentRecords.peHealth }
      },
      missingComponents: MAPEH_COMPONENTS.filter(meta => !componentRecords[meta.key]).map(meta => meta.shortLabel || meta.label),
      learners: rows,
      classSummary: { learnerCount: rows.length, classAverage: completeRows.length ? round2(completeRows.reduce((sum, r) => sum + Number(r.finalMapehGrade), 0) / completeRows.length) : null, passingCount: completeRows.filter(r => Number(r.finalMapehGrade) >= PASSING_GRADE).length, nonPassingCount: completeRows.filter(r => Number(r.finalMapehGrade) < PASSING_GRADE).length, incompleteCount: rows.filter(r => r.incomplete || r.finalMapehGrade == null).length, tableUsed: 'MAPEH paired average' },
      warnings: Array.from(new Set(warnings.filter(Boolean)))
    };
  }
  function selectedMapehSummaryLearner(summary) {
    const rows = summary && summary.learners || [];
    if (!rows.length) return null;
    if (!state.mapehSummarySelectedLearnerId || !rows.some(r => text(r.learnerId) === text(state.mapehSummarySelectedLearnerId))) state.mapehSummarySelectedLearnerId = text(rows[0].learnerId);
    return rows.find(r => text(r.learnerId) === text(state.mapehSummarySelectedLearnerId)) || rows[0];
  }
  function renderMapehSelectedLearnerDetail(learnerId, summary) {
    const rows = summary && summary.learners || [];
    const selected = rows.find(r => text(r.learnerId) === text(learnerId)) || rows[0] || null;
    if (!selected) return '<div class="ctm-cr-disclaimer">Select a learner row to review the MAPEH breakdown.</div>';
    const termRows = (summary.visibleTerms || []).map(k => {
      const t = selected.terms[k] || {};
      return `<tr><td>${esc(t.label || getSummaryTermColumnLabel(k))}</td><td>${fmt(t.musicArtsGrade)}</td><td>${fmt(t.peHealthGrade)}</td><td>${fmt(t.mapehGrade)}</td><td>${t.complete ? 'Complete' : esc('Incomplete' + (t.missing && t.missing.length ? ': Missing ' + t.missing.join(', ') : ''))}</td></tr>`;
    }).join('');
    return `<div class="ctm-cr-panel-title" style="margin-top:1rem;">Selected Learner: ${esc(selected.name)}</div>
	<div class="ctm-cr-grid ctm-cr-grid-4 ctm-cr-summary-selected-grid">
	<!--
	<div class="ctm-cr-card">	
	 <div class="ctm-cr-mini-label">Learner</div>
	 <div class="ctm-cr-strong">${esc(selected.name)}</div>
	</div>
	<div class="ctm-cr-card">
	 <div class="ctm-cr-mini-label">Sex</div>
	 <div class="ctm-cr-strong">${esc(selected.sex)}</div>
	</div>
	-->
	 <div class="ctm-cr-card">
	 <div class="ctm-cr-mini-label">Music & Arts Final</div>
	 <div class="ctm-cr-strong">${fmt(selected.componentFinals && selected.componentFinals.musicArts)}</div>
	</div>
	<div class="ctm-cr-card">
	 <div class="ctm-cr-mini-label">PE & Health Final</div>
	 <div class="ctm-cr-strong">${fmt(selected.componentFinals && selected.componentFinals.peHealth)}</div>
	</div>
	<div class="ctm-cr-card">
	<div class="ctm-cr-mini-label">Final MAPEH</div>
	 <div class="ctm-cr-strong">${fmt(selected.finalMapehGrade)}</div>
	</div>
	<div class="ctm-cr-card">
	 <div class="ctm-cr-mini-label">Descriptor</div>
	 <div class="ctm-cr-strong">${esc(selected.descriptorLabel || selected.descriptorCode || '—')}</div>
	</div>
	<div class="ctm-cr-card">
	 <div class="ctm-cr-mini-label">Remarks</div>
	 <div class="ctm-cr-strong">${esc(selected.remarks)}</div>
	</div>
	</div>
	
	<div class="table-scroll ctm-cr-table-scroll" style="margin-top:.75rem;">
		<table class="ctm-cr-table"><thead><tr><th>Term</th><th>Music & Arts</th><th>PE & Health</th><th>MAPEH</th><th>Status</th></tr></thead><tbody>${termRows}</tbody></table></div>`;
  }
  function renderMapehSummary(summary) { return renderMapehConsolidatedSummary(summary); }
  function renderMapehConsolidatedSummary(summary) {
    if (!dom.panels || !dom.panels.final) return;
    const panel = dom.panels.final;
    const visibleTerms = summary.visibleTerms || [];
    const selected = selectedMapehSummaryLearner(summary);
    const warnings = (summary.warnings || []).map(w => `<div class="ctm-cr-disclaimer warning">${esc(w)}</div>`).join('');
    const headTerms = visibleTerms.map(k => `<th>${esc(getSummaryTermColumnLabel(k))}</th>`).join('');
    const body = (summary.learners || []).map((r, idx) => {
      const termCells = visibleTerms.map(k => {
        const t = r.terms && r.terms[k] || {};
        return `<td>${t.complete ? `${esc(t.mapehGrade)}<div class="ctm-cr-small">M&A: ${fmt(t.musicArtsGrade)} | PE&H: ${fmt(t.peHealthGrade)}</div>` : `—<div class="ctm-cr-small">${esc((t.missing || []).length ? 'Missing ' + t.missing.join(', ') : 'Incomplete')}</div>`}</td>`;
      }).join('');
      return `<tr data-mapeh-summary-learner="${esc(r.learnerId)}" aria-selected="${text(r.learnerId)===text(state.mapehSummarySelectedLearnerId) ? 'true' : 'false'}"><td>${idx+1}</td><td>${esc(r.name)}</td><td>${esc(r.sex)}</td>${termCells}<td>${fmt(r.finalMapehGrade)}</td><td>${esc(r.descriptorLabel || r.descriptorCode || '—')}</td><td>${esc(r.remarks)}</td></tr>`;
    }).join('') || `<tr><td colspan="${6+visibleTerms.length}">No learners found.</td></tr>`;
    panel.innerHTML = `<div class="ctm-cr-panel-title">MAPEH Summary (Read-only)</div>${warnings}<div class="table-scroll ctm-cr-table-scroll ctm-cr-final-scroll"><table id="crFinalTable" class="ctm-cr-table"><thead><tr><th>#</th><th>Learner</th><th>Sex</th>${headTerms}<th>Final MAPEH</th><th>Descriptor</th><th>Remarks</th></tr></thead><tbody>${body}</tbody></table></div><div class="ctm-cr-grid ctm-cr-grid-4 ctm-cr-summary-top-grid" style="margin-top:.75rem;"><div class="ctm-cr-card"><div class="ctm-cr-mini-label">Class Average</div><div class="ctm-cr-strong">${fmt(summary.classSummary.classAverage)}</div></div><div class="ctm-cr-card"><div class="ctm-cr-mini-label">Passing Count</div><div class="ctm-cr-strong">${summary.classSummary.passingCount}</div></div><div class="ctm-cr-card"><div class="ctm-cr-mini-label">Non-Passing Count</div><div class="ctm-cr-strong">${summary.classSummary.nonPassingCount}</div></div><div class="ctm-cr-card"><div class="ctm-cr-mini-label">Incomplete Count</div><div class="ctm-cr-strong">${summary.classSummary.incompleteCount}</div></div><div class="ctm-cr-card ctm-cr-summary-row2-half"><div class="ctm-cr-mini-label">Table Used</div><div class="ctm-cr-strong">MAPEH paired average</div></div><div class="ctm-cr-card ctm-cr-summary-row2-half"><div class="ctm-cr-mini-label">Learner Count</div><div class="ctm-cr-strong">${summary.classSummary.learnerCount}</div></div></div>${selected ? renderMapehSelectedLearnerDetail(selected.learnerId, summary) : ''}`;
    panel.querySelectorAll('[data-mapeh-summary-learner]').forEach(row => row.addEventListener('click', () => { state.mapehSummarySelectedLearnerId = row.getAttribute('data-mapeh-summary-learner') || ''; renderMapehConsolidatedSummary(summary); }));
  }
  function shouldUseMapehConsolidatedSummaryMode() {
    const h = state.recordHeader || {};
    return !!(isMapehSummaryEligible(h) && (state.isMapehSummaryView || text(h.mapehMode).trim() === 'consolidated' || text(state.activeTab).trim() === 'final'));
  }
  function shouldExportMapehConsolidatedWorkbook() {
    const h = state.recordHeader || {};
    return !!(isMapehSummaryEligible(h) && (state.isMapehSummaryView || text(h.mapehMode).trim() === 'consolidated' || text(state.activeTab).trim() === 'final'));
  }
  function renderMapehSummaryIfNeeded() {
    if (!shouldUseMapehConsolidatedSummaryMode()) return false;
    const bundleId = getMapehBundleId(state.recordHeader);
    const summary = computeMapehConsolidatedSummary(bundleId);
    state.mapehConsolidatedSummary = summary;
    renderMapehConsolidatedSummary(summary);
    return true;
  }
  function ensureMapehComponentSwitcherUi() {
    if (!dom.modal) return;
    let bar = $id('crMapehComponentBar');
    const should = shouldShowMapehUi();
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'crMapehComponentBar';
      bar.className = 'ctm-cr-mapeh-bar';
      const tabs = dom.modal.querySelector('.ctm-cr-tabs');
      if (tabs && tabs.parentNode) tabs.parentNode.insertBefore(bar, tabs.nextSibling);
      if (!$id('ctm-cr-mapeh-style')) {
        const st = document.createElement('style');
        st.id = 'ctm-cr-mapeh-style';
        st.textContent = '#classRecordModal .ctm-cr-mapeh-bar{display:flex;flex-wrap:wrap;gap:6px;padding:8px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0}#classRecordModal .ctm-cr-mapeh-chip{border:1px solid #c7d2fe;background:#eef2ff;color:#3730a3;border-radius:999px;padding:.38rem .72rem;font-weight:700;font-size:.82rem;cursor:pointer}#classRecordModal .ctm-cr-mapeh-chip.active{background:#4f46e5;color:#fff;border-color:#4f46e5}#classRecordModal .ctm-cr-mapeh-chip.summary{background:#ecfdf5;color:#047857;border-color:#a7f3d0}#classRecordModal .ctm-cr-mapeh-chip.summary.active{background:#059669;color:#fff}#classRecordModal .ctm-cr-disclaimer.warning{background:#fffbeb;border-color:#fde68a;color:#92400e}';
        document.head.appendChild(st);
      }
    }
    bar.style.display = should ? '' : 'none';
    if (!should) return;
    const active = state.isMapehSummaryView ? MAPEH_SUMMARY_KEY : text(state.recordHeader.mapehComponent || normalizeMapehComponent(state.recordHeader.subject) || 'musicArts');
    bar.innerHTML = MAPEH_COMPONENTS.map(meta => `<button type="button" class="ctm-cr-mapeh-chip ${active===meta.key?'active':''}" data-mapeh-switch="${meta.key}">${esc(meta.shortLabel || meta.label)}</button>`).join('') + `<button type="button" class="ctm-cr-mapeh-chip summary ${active===MAPEH_SUMMARY_KEY?'active':''}" data-mapeh-switch="${MAPEH_SUMMARY_KEY}">Summary</button>`;
    bar.querySelectorAll('[data-mapeh-switch]').forEach(btn => btn.addEventListener('click', () => switchMapehComponent(btn.getAttribute('data-mapeh-switch'))));
  }
  function applyMapehSummaryActionLocks() {
    const readonly = !!state.isMapehSummaryView;
    ['crBtnSave','crBtnImportCsv','crBtnExportCsv'].forEach(id => {
      const el = $id(id);
      if (!el) return;
      if (readonly) {
        el.disabled = true;
        el.title = 'MAPEH Summary is read-only. Switch to Music and Arts or PE and Health to edit/export a paired component record.';
      } else if (el.title && /MAPEH Summary is read-only/.test(el.title)) {
        el.disabled = false;
        el.title = '';
      }
    });
    const del = $id('crBtnDelete');
    if (del) {
      if (readonly && text(state.recordHeader && state.recordHeader.mapehBundleId).trim()) {
        del.disabled = false;
        del.title = 'Delete the entire MAPEH bundle.';
      } else if (del.title === 'Delete the entire MAPEH bundle.') {
        del.disabled = false;
        del.title = '';
      }
    }
  }
  function switchMapehComponent(componentKeyOrSummary) {
    if (!shouldShowMapehUi()) return;
    if (!state.isMapehSummaryView) flushAutoPersist();
    const bundleId = state.recordHeader.mapehBundleId || makeMapehBundleId(state.recordHeader);
    if (componentKeyOrSummary === MAPEH_SUMMARY_KEY) {
      state.mapehVirtualBaseHeader = clone(state.recordHeader);
      state.isMapehSummaryView = true;
      Object.assign(state.recordHeader, { recordId: '', subject: 'MAPEH', subjectKey: 'mapeh', mapehMode: 'consolidated', mapehComponent: '', mapehBundleId: bundleId, mapehReportSubject: 'MAPEH' });
      state.activeTab = 'final';
      render();
      switchTab('final');
      return;
    }
    ensureMapehComponentRecords(bundleId, { header: state.recordHeader });
    const meta = getMapehComponentMeta(componentKeyOrSummary) || MAPEH_COMPONENTS[0];
    const key = findMapehComponentRecordKey(bundleId, meta.key);
    if (key) {
      const payload = JSON.parse(localStorage.getItem(key) || '{}');
      applySnapshot(payload);
      loadFromHost();
      normalizeMapehHeader(state.recordHeader);
      recompute();
      render();
      switchTab(state.activeTab === 'final' ? 'term1' : state.activeTab);
    }
  }
  function render() { cacheDom(); normalizeMapehHeader(state.recordHeader); updateHeaderFields(); renderPolicy(); applyTermVisibility(); ensureMapehComponentSwitcherUi(); TERMS.forEach(termKey => { if (dom.panels[termKey]) buildTermPanel(termKey); }); if (!renderMapehSummaryIfNeeded()) renderFinal(); renderAttendance(); renderRecordPicker(); updateSaveEditButton(); setStatus(); applyMapehSummaryActionLocks(); updateExcelButtonState(); }
  function recompute() { state.recordHeader.keyStage = getKeyStage(state.recordHeader.gradeLevel); normalizeMapehHeader(state.recordHeader); state.recordHeader.subjectGroup = coerceSubjectGroupForContext(state.recordHeader.subjectGroup, state.recordHeader.gradeLevel, state.recordHeader.schoolYear); if (dom.headerInputs && dom.headerInputs.subjectGroup && text(dom.headerInputs.subjectGroup.value).trim() !== text(state.recordHeader.subjectGroup).trim()) dom.headerInputs.subjectGroup.value = state.recordHeader.subjectGroup || ''; state.setupProfile = resolvePolicy(); hydrateTerms(); recomputeFinal(); buildAttendanceRows(); }
  function resetDraft(keepContext) { const old = clone(state.recordHeader), oldRoster = clone(state.roster); initDefaults(); state.isTransientDraft = true; state.headerEditMode = false; state.headerDirty = false; state.savedRoster = keepContext ? oldRoster : []; state.roster = clone(state.savedRoster); Object.assign(state.recordHeader, { classId: state.classId, className: state.className, section: keepContext ? (old.section || '') : '', schoolName: keepContext ? old.schoolName : '', schoolYear: keepContext ? old.schoolYear : '', gradeLevel: keepContext ? old.gradeLevel : '', teacherName: keepContext ? old.teacherName : '', subjectGroup: keepContext ? old.subjectGroup : '', subject: keepContext ? old.subject : '', schoolId: keepContext ? old.schoolId : '' }); loadFromHost(); recompute(); render(); }

  function resetDraftForNewRecord() { const shared = readSharedHeaderSnapshot(); initDefaults(); state.isTransientDraft = true; state.headerEditMode = false; state.headerDirty = false; state.savedRoster = []; state.roster = []; loadFromHost(); applySharedHeaderData(shared, { forceEmptyOnly: false, rerender: false }); clearClassScopedHeaderFields(); recompute(); render(); }

  function triggerNewRecordReset(options = {}) {
    // Centralized local-only New behavior. This intentionally does not call CTMSharedHeader.set/setMany,
    // so SF1/SF2/SF3/SF8 shared header values remain untouched while the Class Record draft is reset.
    resetDraftForNewRecord();
    switchTab('header');
    if (options.showFlash) {
      flash('New blank draft ready. Only School Year, Grade Level, Subject Group, and Subject were cleared for Class Record; shared SF header values were preserved.', 'success');
    }
  }

  function csvEscape(v) { v = text(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function exportCsv() {
    if (state.isMapehSummaryView || (state.recordHeader && state.recordHeader.mapehMode === 'consolidated')) { flash('MAPEH Summary is read-only. Export each MAPEH component CSV separately.', 'warning'); return; }
    const lines = [];
    lines.push(['TYPE','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].join(','));
    lines.push(['META','schemaVersion',FORM_VERSION].map(csvEscape).join(','));
    ['classId','className','recordId'].forEach(k => lines.push(['META', k, state.recordHeader[k] || state[k] || ''].map(csvEscape).join(',')));
    Object.keys(state.recordHeader).forEach(k => {
      if (['recordId','classId','className'].includes(k)) return;
      lines.push(['HEADER', k, state.recordHeader[k]].map(csvEscape).join(','));
    });
    state.roster.forEach(r => lines.push(['ROSTER', r.id, r.lrn, r.name, r.sex].map(csvEscape).join(',')));
    TERMS.forEach(termKey => {
      const term = state[termKey];
      const fields = visibleScoreFields(term);
      lines.push(['TERM_CONFIG', termKey, term.termLabel, term.applicableTable, term.gradingMode, term.numericMode, term.assessmentConfig.wwCount, term.assessmentConfig.ptCount, term.assessmentConfig.stCount, term.assessmentConfig.hasTE ? '1' : '0', term.assessmentConfig.qaCount || 0, term.assessmentConfig.teCount || 0, term.assessmentConfig.qeCount || 0].map(csvEscape).join(','));
      lines.push(['TERM_FIELDS', termKey].concat(fields.map(f => f.key)).map(csvEscape).join(','));
      lines.push(['TERM_HPS', termKey].concat(fields.map(f => term.hps[f.group][f.key] == null ? '' : term.hps[f.group][f.key])).map(csvEscape).join(','));
      term.learners.forEach(row => {
        const trailing = isLegacyGrade12Term(term)
          ? [row.computed.descriptorLabel || '', row.computed.remarks || '', row.computed.teacherNotes || '', row.computed.interventionNotes || '']
          : [row.computed.letterGrade || row.computed.descriptorCode || '', row.computed.remarks || '', row.computed.teacherNotes || '', row.computed.interventionNotes || ''];
        lines.push(['TERM_ROW', termKey, row.learnerId, row.studentId, row.lrn, row.name, row.sex].concat(fields.map(f => row.scores[f.group][f.key] == null ? '' : row.scores[f.group][f.key])).concat(trailing).map(csvEscape).join(','));
      });
    });

    const csvText = '\uFEFF' + lines.join('\r\n');
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const filename = `${slugify(state.className || 'class')}_${slugify(state.recordHeader.subject || 'subject')}_${slugify(state.recordHeader.schoolYear || 'school-year')}_classrecord_full.csv`;

    if (window.navigator && typeof window.navigator.msSaveOrOpenBlob === 'function') {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      flash('CSV exported.', 'success');
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    flash('CSV exported.', 'success');
  }
  function parseCsv(textIn) { const rows = []; let row = [], value = '', inQuotes = false; for (let i = 0; i < textIn.length; i += 1) { const ch = textIn[i], next = textIn[i + 1]; if (inQuotes) { if (ch === '"' && next === '"') { value += '"'; i += 1; } else if (ch === '"') inQuotes = false; else value += ch; } else { if (ch === '"') inQuotes = true; else if (ch === ',') { row.push(value); value = ''; } else if (ch === '\n') { row.push(value); rows.push(row); row = []; value = ''; } else if (ch !== '\r') value += ch; } } row.push(value); if (row.length && row.some(cell => cell !== '')) rows.push(row); return rows; }
function importCsvText(csvText) {
  const rows = parseCsv(csvText);
  if (!rows.length) throw new Error('CSV file is empty.');
  const imported = { header: defaultRecordHeader(), roster: [], terms: { term1: defaultTerm('term1'), term2: defaultTerm('term2'), term3: defaultTerm('term3'), term4: defaultTerm('term4') }, termFields: { term1: null, term2: null, term3: null, term4: null } }, termRowsByKey = { term1: new Map(), term2: new Map(), term3: new Map(), term4: new Map() };
  rows.forEach(cols => {
    const type = text(cols[0]).trim();
    if (!type || type === 'TYPE') return;
    if (type === 'META') {
      const key = text(cols[1]).trim();
      if (key === 'classId') imported.header.classId = text(cols[2]);
      if (key === 'className') imported.header.className = text(cols[2]);
      if (key === 'recordId') imported.header.recordId = text(cols[2]);
      return;
    }
    if (type === 'HEADER') {
      const key = text(cols[1]).trim();
      if (key in imported.header) imported.header[key] = text(cols[2]);
      return;
    }
    if (type === 'ROSTER') {
      const item = { id: text(cols[1]), lrn: text(cols[2]), name: text(cols[3]), sex: normalizeSex(cols[4]) };
      if (item.name) imported.roster.push(item);
      return;
    }
    if (type === 'TERM_CONFIG') {
      const key = text(cols[1]);
      const term = imported.terms[key];
      if (!term) return;
      term.termKey = key;
      term.termLabel = text(cols[2]) || getTermLabel(key, imported.header.gradeLevel, imported.header.schoolYear);
      term.applicableTable = text(cols[3]);
      term.gradingMode = text(cols[4]);
      term.numericMode = text(cols[5]);
      term.assessmentConfig = { wwCount: num(cols[6]) || 0, ptCount: num(cols[7]) || 0, stCount: num(cols[8]) || 0, hasTE: text(cols[9]) === '1', qaCount: num(cols[10]) || 0, teCount: num(cols[11]) || 0, qeCount: num(cols[12]) || 0 };
      return;
    }
    if (type === 'TERM_FIELDS') {
      const key = text(cols[1]);
      imported.termFields[key] = cols.slice(2).map(v => text(v).trim()).filter(Boolean);
      return;
    }
    if (type === 'TERM_HPS') {
      const key = text(cols[1]);
      const term = imported.terms[key];
      if (!term) return;
      const fields = imported.termFields[key] && imported.termFields[key].length ? imported.termFields[key] : getScoreFieldsForTerm(term, imported.header.gradeLevel, imported.header.schoolYear).map(f => f.key);
      fields.forEach((fieldKey, i) => {
        const field = getScoreFieldDefinition(fieldKey);
        if (field) term.hps[field.group][field.key] = num(cols[i + 2]);
      });
      return;
    }
    if (type === 'TERM_ROW') {
      const key = text(cols[1]);
      const learnerId = text(cols[2]);
      const term = imported.terms[key];
      const row = { learnerId, studentId: text(cols[3]), lrn: text(cols[4]), name: text(cols[5]), sex: normalizeSex(cols[6]), scores: blankScores(), computed: defaultComputed() };
      const fields = imported.termFields[key] && imported.termFields[key].length ? imported.termFields[key] : getScoreFieldsForTerm(term, imported.header.gradeLevel, imported.header.schoolYear).map(f => f.key);
      fields.forEach((fieldKey, i) => {
        const field = getScoreFieldDefinition(fieldKey);
        if (field) row.scores[field.group][field.key] = num(cols[i + 7]);
      });
      const tailIndex = 7 + fields.length;
      const legacyMode = isLegacyGrade12Do8(imported.header.gradeLevel, imported.header.schoolYear) || term.applicableTable === 'table10' || (term.assessmentConfig && num(term.assessmentConfig.qaCount) > 0);
      if (legacyMode) {
        row.computed.descriptorLabel = text(cols[tailIndex]) || '';
        row.computed.remarks = text(cols[tailIndex + 1]) || '';
        row.computed.teacherNotes = text(cols[tailIndex + 2]) || '';
        row.computed.interventionNotes = text(cols[tailIndex + 3]) || '';
      } else {
        row.computed.letterGrade = text(cols[tailIndex]) || '';
        row.computed.descriptorCode = row.computed.letterGrade;
        row.computed.remarks = text(cols[tailIndex + 1]) || '';
        if (cols.length >= tailIndex + 4) {
          row.computed.teacherNotes = text(cols[tailIndex + 2]) || '';
          row.computed.interventionNotes = text(cols[tailIndex + 3]) || '';
        } else {
          row.computed.teacherNotes = '';
          row.computed.interventionNotes = text(cols[tailIndex + 2]) || '';
        }
      }
      termRowsByKey[key].set(learnerId || `${normalizeName(row.name)}|${normalizeSex(row.sex).toLowerCase()}`, row);
      return;
    }
  });
  state.suppressHostRosterOnce = true;
  initDefaults();
  state.savedRoster = imported.roster.length ? normalizeRoster(imported.roster) : normalizeRoster(state.savedRoster || state.roster || []);
  state.roster = clone(state.savedRoster);
  state.recordHeader = Object.assign(defaultRecordHeader(), imported.header);
  loadFromHost();
  state.recordHeader = Object.assign(state.recordHeader, imported.header);
  state.recordHeader.subjectKey = slugify(state.recordHeader.subject || '');
  if (isMapehEligibleGrade(state.recordHeader.gradeLevel) && isMapehBaseSubject(state.recordHeader.subject)) { if (!state.recordHeader.subjectGroup) state.recordHeader.subjectGroup = 'EPP / TLE / MAPEH'; normalizeMapehHeader(state.recordHeader); }
  state.setupProfile = resolvePolicy();
  TERMS.forEach(key => {
    const fresh = defaultTerm(key), importedTerm = imported.terms[key], importedMap = termRowsByKey[key];
    fresh.applicableTable = importedTerm.applicableTable || state.setupProfile.resultTableResolved;
    fresh.gradingMode = importedTerm.gradingMode || state.setupProfile.gradingModeResolved;
    fresh.numericMode = importedTerm.numericMode || state.setupProfile.transitionRuleResolved.numericMode || 'none';
    fresh.assessmentConfig = Object.assign(clone(state.setupProfile.assessmentCounts), importedTerm.assessmentConfig || {});
    const legacyMode = isLegacyGrade12Term(fresh, imported.header.gradeLevel, imported.header.schoolYear);
    fresh.hps = cloneHpsStructWithCompat(importedTerm.hps || blankHps(), legacyMode);
    fresh.learners = state.roster.map(learner => {
      const row = importedMap.get(text(learner.id)) || importedMap.get(rosterMatchKey(learner)) || makeLearnerRow(learner);
      row.learnerId = text(learner.id || row.learnerId || learner.name);
      row.studentId = text(learner.id || row.studentId || '');
      row.lrn = text(learner.lrn || row.lrn || '');
      row.name = text(learner.name || row.name || '');
      row.sex = normalizeSex(learner.sex || row.sex || '');
      row.scores = cloneScoreStructWithCompat(row.scores || {}, legacyMode);
      row.computed = Object.assign(defaultComputed(), clone(row.computed || {}));
      computeLearnerTerm(row, fresh);
      return row;
    });
    state[key] = fresh;
  });
  if (state.roster[0]) state.activeLearnerId = text(state.roster[0].id || state.roster[0].name);
  recomputeFinal();
  buildAttendanceRows();
  render();
  flash('CSV Class Record imported.', 'success');
}

  // v18.53 View in Excel export
  const EXCEL_COPY_NOTE = 'This Excel workbook is a generated copy for viewing, printing, and offline reference. To Edit go to Review and Unprotect Sheet. Edits made in Excel will not update the Class Record module.';

  function excelValue(v) {
    if (v == null) return '';
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return String(v);
  }
  function excelPercent(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return '';
    return Math.round(n * 10000) / 100;
  }
  function excelRound(v) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : '';
  }
  function sanitizeExcelFileName(value) {
    return text(value || '')
      .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '-')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^\.+|\.+$/g, '')
      .slice(0, 120) || 'ClassRecord';
  }
  function getExcelSheetSafeName(value, fallback) {
    const raw = text(value || fallback || 'Sheet').replace(/[\\/*?:\[\]]+/g, ' ').replace(/\s+/g, ' ').trim() || fallback || 'Sheet';
    return raw.slice(0, 31);
  }
  function getExcelVisibleTerms() {
    try { return getVisibleTerms().filter(k => TERMS.includes(k)); } catch (_) { return ['term1','term2','term3'].filter(k => state[k]); }
  }
  function getExcelSheetNameForTerm(termKey) {
    return getExcelSheetSafeName(getTermLabel(termKey).toUpperCase(), (TERM_LABELS[termKey] || termKey).toUpperCase());
  }
  function getExcelActiveSheetFromCurrentTab(snapshot) {
    const tab = text(state.activeTab || 'header');
    if (tab === 'header') return 'COVER';
    if (tab === 'policy') return 'POLICY SETUP';
    if (tab === 'attendance') return 'ATTENDANCE SUMMARY';
    if (tab === 'final') return 'SUMMARY OF GRADES';
    if (TERMS.includes(tab)) return snapshot.termSheetNames && snapshot.termSheetNames[tab] || getExcelSheetNameForTerm(tab);
    return 'COVER';
  }
  function hasMapehConsolidatedExcelExportableData() {
    if (!shouldExportMapehConsolidatedWorkbook()) return false;
    try {
      const summary = state.mapehConsolidatedSummary || computeMapehConsolidatedSummary(getMapehBundleId(state.recordHeader));
      const hasLearners = !!(summary && Array.isArray(summary.learners) && summary.learners.length);
      const hasComponent = !!(summary && summary.components && Object.keys(summary.components).some(k => summary.components[k] && summary.components[k].found));
      const hasHeader = !!text(state.recordHeader && [state.recordHeader.schoolYear, state.recordHeader.gradeLevel, state.recordHeader.section, state.recordHeader.subject, state.recordHeader.mapehBundleId].join(' ')).trim();
      return !!(hasHeader && (hasLearners || hasComponent));
    } catch (_) {
      return false;
    }
  }
  function hasExcelExportableData() {
    if (shouldExportMapehConsolidatedWorkbook()) return hasMapehConsolidatedExcelExportableData();
    const rosterCount = Array.isArray(state.roster) ? state.roster.length : 0;
    const hasHeader = !!text(state.recordHeader && [state.recordHeader.schoolYear, state.recordHeader.gradeLevel, state.recordHeader.section, state.recordHeader.subject, state.recordHeader.recordId].join(' ')).trim();
    const hasFinal = !!(state.finalSummary && Array.isArray(state.finalSummary.learners) && state.finalSummary.learners.length);
    const hasTermData = TERMS.some(k => {
      const term = state[k];
      return !!(term && Array.isArray(term.learners) && term.learners.some(row => {
        const c = row && row.computed || {};
        const scores = row && row.scores || {};
        const hasScores = ['ww','pt','ex'].some(g => Object.values(scores[g] || {}).some(v => num(v) != null));
        return hasScores || text(c.descriptorCode || c.descriptorLabel || c.teacherNotes || c.interventionNotes).trim();
      }));
    });
    return !!(rosterCount && (hasHeader || hasTermData || hasFinal));
  }
  function updateExcelButtonState() {
    const btn = $id('crBtnViewExcel');
    if (!btn) return;
    const ok = hasExcelExportableData();
    btn.disabled = !ok;
    btn.title = ok ? 'Generate a saveable Excel copy for viewing, printing, and offline reference.' : 'Nothing to view in Excel yet. Please save or encode Class Record data first.';
  }
  function buildActiveClassRecordExcelSnapshot() {
    try { recompute(); } catch (_) {}
    const header = clone(state.recordHeader || defaultRecordHeader());
    const setup = clone(state.setupProfile || defaultSetupProfile());
    const visibleTerms = getExcelVisibleTerms();
    const termSheetNames = {};
    visibleTerms.forEach(k => { termSheetNames[k] = getExcelSheetNameForTerm(k); });
    return {
      exportVersion: FORM_VERSION + '-view-excel',
      generatedAt: new Date().toLocaleString(),
      note: EXCEL_COPY_NOTE,
      recordHeader: header,
      setupProfile: setup,
      roster: clone(state.roster || []),
      attendance: clone(state.attendance || defaultAttendance()),
      terms: visibleTerms.reduce((acc, k) => { acc[k] = clone(state[k] || defaultTerm(k)); return acc; }, {}),
      visibleTerms,
      termSheetNames,
      finalSummary: clone(state.finalSummary || defaultFinalSummary()),
      activeTab: state.activeTab || 'header',
      mapeh: {
        isSummaryView: !!state.isMapehSummaryView,
        mode: text(header.mapehMode || ''),
        component: text(header.mapehComponent || ''),
        bundleId: text(header.mapehBundleId || ''),
        reportSubject: text(header.mapehReportSubject || '')
      }
    };
  }
  function buildExcelCoverSheetRows(snapshot) {
    const h = snapshot.recordHeader || {};
    const rows = [
      ['Class Record Generated Excel Copy'],
      [EXCEL_COPY_NOTE],
      [],
      ['Field','Value'],
      ['Region', h.region], ['Division', h.division], ['District', h.district], ['School Name', h.schoolName], ['School ID', h.schoolId],
      ['School Year', h.schoolYear], ['Grade Level', h.gradeLevel], ['Section', h.section], ['Semester', h.semester],
      ['Grading Framework', normalizeGradingFramework(h.gradingFramework) === 'customInstitutional' ? 'Custom Institutional' : 'Official DepEd'],
      ['Grade 12 SY 2026-2027 Grading System', currentG12SystemLabel() || h.g12Sy2026System],
      ['Descriptor Source', h.g12DescriptorSource || h.customDescriptorSource || ''], ['Subject Group', h.subjectGroup], ['Subject', h.subject],
      ['Teacher/Class Adviser', h.teacherName], ['Date/Time generated', snapshot.generatedAt],
      ['Export Version', snapshot.exportVersion], ['Class Record Source of Truth', 'Class Record module local state/storage'],
      ['MAPEH Mode', snapshot.mapeh.mode], ['MAPEH Component', snapshot.mapeh.component], ['MAPEH Bundle ID', snapshot.mapeh.bundleId]
    ];
    return rows;
  }
  function buildExcelPolicySheetRows(snapshot) {
    const setup = snapshot.setupProfile || {};
    const w = setup.componentWeights || {};
    const c = setup.assessmentCounts || {};
    const cc = setup.customComponents || {};
    const rows = [
      ['Policy Setup'], [EXCEL_COPY_NOTE], [], ['Field','Value'],
      ['Grading Mode', setup.gradingModeResolved], ['Result Table', setup.resultTableResolved], ['Numeric Mode', setup.transitionRuleResolved && setup.transitionRuleResolved.numericMode || setup.numericMode],
      ['Transition Rule', setup.transitionRuleResolved && setup.transitionRuleResolved.transitionLabel || ''],
      ['WW Weight', excelPercent(w.ww)], ['PT Weight', excelPercent(w.pt)], ['EX/ST/TE/QA/QE Weight', excelPercent(w.ex)],
      ['WW Count', c.wwCount], ['PT Count', c.ptCount], ['ST Count', c.stCount], ['Has TE', c.hasTE ? 'Yes' : 'No'], ['QA Count', c.qaCount || 0], ['TE Count', c.teCount || 0], ['QE Count', c.qeCount || 0],
      ['Transmutation Table Key', setup.transmutationTableKey], ['Custom Academic Structure', setup.customAcademicStructure], ['Selected/Visible Terms', snapshot.visibleTerms.map(getTermLabel).join(', ')],
      ['Final Grade Rule', setup.customFinalRule], ['Descriptor Source', setup.customDescriptorSource || (snapshot.recordHeader && snapshot.recordHeader.g12DescriptorSource) || ''],
      ['Uses Transmutation', setup.usesTransmutation ? 'Yes' : 'No'], ['Uses Zero Based', setup.usesZeroBased ? 'Yes' : 'No'], ['Uses Descriptors', setup.usesDescriptors ? 'Yes' : 'No'],
      ['Custom WW', cc.ww ? `${cc.ww.count} item(s), ${cc.ww.weight}%` : ''], ['Custom PT', cc.pt ? `${cc.pt.count} item(s), ${cc.pt.weight}%` : ''],
      ['Custom ST', cc.st ? `${cc.st.count} item(s), ${cc.st.weight}%` : ''], ['Custom TE', cc.te ? `${cc.te.count} item(s), ${cc.te.weight}%` : ''], ['Custom QE', cc.qe ? `${cc.qe.count} item(s), ${cc.qe.weight}%` : ''],
      ['Validation Notes', Array.isArray(setup.validationNotes) ? setup.validationNotes.join(' ') : text(setup.validationNotes || '')]
    ];
    return rows;
  }
  function excelPercentLabel(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return '0%';
    const pct = Math.round(n * 10000) / 100;
    return `${pct % 1 === 0 ? Math.round(pct) : pct}%`;
  }
  function excelStaticNumber(v, decimals = 2) {
    const n = Number(v);
    if (!Number.isFinite(n)) return '';
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
  }
  function excelScoreValue(container, group, key) {
    return excelValue(container && container[group] && container[group][key]);
  }
  function excelHpsValue(term, group, key) {
    return excelValue(term && term.hps && term.hps[group] && term.hps[group][key]);
  }
  function excelHpsTotal(term, group, keys) {
    const total = (keys || []).reduce((sum, key) => {
      const n = Number(term && term.hps && term.hps[group] && term.hps[group][key]);
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
    return total || '';
  }
  function excelComponentForKey(row, term, key) {
    const breakdown = buildLearnerComputationBreakdown(row, term, state.setupProfile || defaultSetupProfile());
    const comp = breakdown && Array.isArray(breakdown.components) ? breakdown.components.find(c => c && c.key === key) : null;
    if (comp) return comp;
    const group = key === 'ww' ? 'ww' : (key === 'pt' ? 'pt' : 'ex');
    const keys = key === 'ww' ? ['ww1','ww2','ww3','ww4','ww5'] : (key === 'pt' ? ['pt1','pt2','pt3'] : ['st1','st2','te']);
    let scoreTotal = 0;
    let hpsTotal = 0;
    keys.forEach(fieldKey => {
      const hv = Number(term && term.hps && term.hps[group] && term.hps[group][fieldKey]);
      if (!Number.isFinite(hv) || hv <= 0) return;
      const sv = Number(row && row.scores && row.scores[group] && row.scores[group][fieldKey]);
      hpsTotal += hv;
      scoreTotal += Number.isFinite(sv) ? Math.max(0, Math.min(sv, hv)) : 0;
    });
    const weights = state.setupProfile && state.setupProfile.componentWeights || {};
    const weight = Number(weights[key === 'ex' ? 'ex' : group] || 0);
    const percentageScore = hpsTotal > 0 ? (scoreTotal / hpsTotal) * 100 : null;
    const weightedScore = percentageScore == null ? null : percentageScore * weight;
    return { scoreTotal, hpsTotal, percentageScore, weightedScore };
  }
  function excelTermLayoutPayload(snapshot, termKey) {
    const term = snapshot.terms && snapshot.terms[termKey] || defaultTerm(termKey);
    const h = snapshot.recordHeader || {};
    const setup = snapshot.setupProfile || {};
    const weights = setup.componentWeights || {};
    const rows = Array.from({ length: 88 }, () => Array(27).fill(''));
    const put = (r, c, v) => { rows[r - 1][c - 1] = excelValue(v); };
    put(1, 1, 'Class Record ');
    put(2, 3, 'REGION:'); put(2, 5, h.region || ''); put(2, 15, 'DIVISION:'); put(2, 17, h.division || '');
    put(3, 3, 'SCHOOL NAME:'); put(3, 5, h.schoolName || ''); put(3, 15, 'SCHOOL ID:'); put(3, 17, h.schoolId || ''); put(3, 22, 'SCHOOL YEAR:'); put(3, 24, h.schoolYear || '');
    put(5, 1, getTermLabel(termKey).toUpperCase());
    put(5, 4, 'GRADE LEVEL:'); put(5, 6, h.gradeLevel || ''); put(5, 8, 'SECTION:'); put(5, 10, h.section || '');
    put(5, 15, 'TEACHER:'); put(5, 17, h.teacherName || ''); put(5, 21, 'SUBJECT:'); put(5, 23, h.subject || '');
    put(6, 1, '#'); put(6, 2, "LEARNERS' NAMES"); put(6, 3, 'SEX');
    put(6, 4, `WRITTEN / ORAL WORKS (${excelPercentLabel(weights.ww)})`);
    put(6, 12, `PRODUCT / PERFORMANCE TASKS (${excelPercentLabel(weights.pt)})`);
    put(6, 18, `SUMMATIVE TESTS & TERM EXAMINATIONS (${excelPercentLabel(weights.ex)})`);
    put(6, 24, 'Initial Grade'); put(6, 25, 'TERM GRADE'); put(6, 26, 'DESCRIPTOR');
    ['1','2','3','4','5','Total','PS','WS'].forEach((v, i) => put(7, 4 + i, v));
    ['1','2','3','Total','PS','WS'].forEach((v, i) => put(7, 12 + i, v));
    ['ST1','ST2','TE','Total','PS','WS'].forEach((v, i) => put(7, 18 + i, v));
    put(8, 3, 'HPS');
    ['ww1','ww2','ww3','ww4','ww5'].forEach((k, i) => put(8, 4 + i, excelHpsValue(term, 'ww', k)));
    put(8, 9, excelHpsTotal(term, 'ww', ['ww1','ww2','ww3','ww4','ww5'])); put(8, 10, '100%'); put(8, 11, excelPercentLabel(weights.ww));
    ['pt1','pt2','pt3'].forEach((k, i) => put(8, 12 + i, excelHpsValue(term, 'pt', k)));
    put(8, 15, excelHpsTotal(term, 'pt', ['pt1','pt2','pt3'])); put(8, 16, '100%'); put(8, 17, excelPercentLabel(weights.pt));
    ['st1','st2','te'].forEach((k, i) => put(8, 18 + i, excelHpsValue(term, 'ex', k)));
    put(8, 21, excelHpsTotal(term, 'ex', ['st1','st2','te'])); put(8, 22, '100%'); put(8, 23, excelPercentLabel(weights.ex));
    const display = buildLearnerDisplayList(term.learners || []);
    for (let i = 0; i < 80; i += 1) {
      const rr = 9 + i;
      const entry = display[i];
      put(rr, 1, entry ? entry.displayNo : '');
      if (!entry) continue;
      const row = entry.row || {};
      const scores = row.scores || {};
      const computed = row.computed || {};
      put(rr, 2, row.name || ''); put(rr, 3, row.sex || '');
      ['ww1','ww2','ww3','ww4','ww5'].forEach((k, idx) => put(rr, 4 + idx, excelScoreValue(scores, 'ww', k)));
      const ww = excelComponentForKey(row, term, 'ww');
      put(rr, 9, excelStaticNumber(ww.scoreTotal)); put(rr, 10, excelStaticNumber(ww.percentageScore)); put(rr, 11, excelStaticNumber(ww.weightedScore));
      ['pt1','pt2','pt3'].forEach((k, idx) => put(rr, 12 + idx, excelScoreValue(scores, 'pt', k)));
      const pt = excelComponentForKey(row, term, 'pt');
      put(rr, 15, excelStaticNumber(pt.scoreTotal)); put(rr, 16, excelStaticNumber(pt.percentageScore)); put(rr, 17, excelStaticNumber(pt.weightedScore));
      ['st1','st2','te'].forEach((k, idx) => put(rr, 18 + idx, excelScoreValue(scores, 'ex', k)));
      const ex = excelComponentForKey(row, term, 'ex');
      put(rr, 21, excelStaticNumber(ex.scoreTotal)); put(rr, 22, excelStaticNumber(ex.percentageScore)); put(rr, 23, excelStaticNumber(ex.weightedScore));
      put(rr, 24, excelStaticNumber(computed.initialGrade));
      put(rr, 25, excelValue(computed.termGrade || computed.finalDisplayedNumeric || computed.transmutedGrade || ''));
      put(rr, 26, computed.descriptorLabel || computed.descriptorCode || computed.letterGrade || '');
    }
    return { rows, meta: {
      type: 'term',
      formatMapKey: 'term',
      merges: ['A1:Z1','C2:D2','E2:N2','O2:P2','Q2:Y2','C3:D3','E3:N3','O3:P3','Q3:S3','V3:W3','X3:Y3','A5:C5','D5:E5','F5:G5','H5:I5','J5:N5','O5:P5','Q5:T5','U5:V5','W5:Z5','A6:A8','B6:B8','C6:C7','D6:K6','L6:Q6','R6:W6','X6:X8','Y6:Y8','Z6:Z8'],
      cols: [3.89,28.44,8.44,5.89,13,13,13,13,5.33,7.11,4.22,6.22,13,13,13,13,13,7.66,13,13,13,13,13,12.66,14.55,14.11,13],
      rows: { 1:19.2, 3:14.4, 5:16.2, 6:17.4, 8:14.4 },
      freeze: { xSplit: 3, ySplit: 8, topLeftCell: 'D9', activePane: 'bottomRight', state: 'frozen' }
    } };
  }
  function buildExcelTermSheetRows(snapshot, termKey) {
    return excelTermLayoutPayload(snapshot, termKey);
  }
  function buildExcelSummarySheetRows(snapshot) {
    const fs = snapshot.finalSummary || defaultFinalSummary();
    const h = snapshot.recordHeader || {};
    const visibleTerms = snapshot.visibleTerms || [];
    const rows = Array.from({ length: 88 }, () => Array(10).fill(''));
    const put = (r, c, v) => { rows[r - 1][c - 1] = excelValue(v); };
    put(1, 1, 'Summary of Grades');
    put(3, 2, 'REGION'); put(3, 3, h.region || ''); put(3, 6, 'DIVISION:'); put(3, 8, h.division || '');
    put(4, 2, 'SCHOOL NAME'); put(4, 3, h.schoolName || ''); put(4, 6, 'SCHOOL ID:'); put(4, 8, h.schoolId || ''); put(4, 9, 'SCHOOL YEAR:'); put(4, 10, h.schoolYear || '');
    put(6, 1, '#'); put(6, 2, "LEARNERS' NAMES"); put(6, 3, 'SEX'); put(6, 4, 'GRADE: '); put(6, 5, h.gradeLevel || ''); put(6, 8, 'SUBJECT:'); put(6, 9, h.subject || '');
    put(7, 4, 'SECTION:'); put(7, 5, h.section || ''); put(7, 8, 'TEACHER:'); put(7, 9, h.teacherName || '');
    const summaryTermCols = [4,5,6,7];
    summaryTermCols.forEach((col, idx) => {
      const key = TERMS[idx];
      put(8, col, visibleTerms.includes(key) ? getSummaryTermColumnLabel(key).toUpperCase() : (TERM_LABELS[key] || `TERM ${idx + 1}`).toUpperCase());
    });
    put(8, 8, 'FINAL GRADE'); put(8, 9, 'DESCRIPTOR'); put(8, 10, 'REMARK');
    const display = buildLearnerDisplayList(fs.learners || []);
    for (let i = 0; i < 80; i += 1) {
      const rr = 9 + i;
      const entry = display[i];
      put(rr, 1, entry ? entry.displayNo : '');
      if (!entry) continue;
      const row = entry.row || {};
      const fr = row.finalResult || {};
      put(rr, 2, row.name || ''); put(rr, 3, row.sex || '');
      TERMS.forEach((k, idx) => {
        const tr = row.termResults && row.termResults[k] || {};
        put(rr, 4 + idx, tr.termGrade || tr.finalDisplayedNumeric || tr.descriptorLabel || tr.descriptorCode || '');
      });
      put(rr, 8, fr.finalGrade || fr.finalDisplayedNumeric || '');
      put(rr, 9, fr.descriptorLabel || fr.descriptorCode || '');
      put(rr, 10, fr.remarks || '');
    }
    const hideTerm4 = !visibleTerms.includes('term4');
    return { rows, meta: {
      type: 'summary',
      formatMapKey: 'summary',
      merges: ['A1:J1','C3:E3','H3:J3','C4:E4','A6:A8','B6:B8','C6:C8','E6:G6','E7:G7','I6:J6','I7:J7'],
      cols: [3.66,31.78,10.33,18.33,13,13,18.33,15.78,17.33,16.22].map((w, idx) => ({ wch: w, hidden: hideTerm4 && idx === 6 })),
      rows: { 1:19.2, 2:11.4, 5:7.2, 6:15.6, 7:16.2, 8:15 },
      freeze: { xSplit: 3, ySplit: 8, topLeftCell: 'D9', activePane: 'bottomRight', state: 'frozen' },
      hideTerm4
    } };
  }
  function buildExcelAttendanceSheetRows(snapshot) {
    const att = snapshot.attendance || defaultAttendance();
    const rows = [['Attendance Summary'], [EXCEL_COPY_NOTE], [], ['#','Learner Name','Sex','Present','Absent','Tardy','Cutting','Excuse','Pending']];
    buildLearnerDisplayList(att.rows || []).forEach(entry => {
      const r = entry.row || {};
      rows.push([entry.displayNo, r.name, r.sex, r.present || r.Present || 0, r.absent || r.Absent || 0, r.tardy || r.Tardy || 0, r.cutting || r.Cutting || 0, r.excuse || r.Excuse || 0, r.pending || r.Pending || 0]);
    });
    return rows;
  }
  function buildExcelConfigRows(snapshot) {
    return [['Key','Value'], ['Export Version', snapshot.exportVersion], ['Generated At', snapshot.generatedAt], ['Visible Terms', snapshot.visibleTerms.join(',')], ['Active Tab', snapshot.activeTab], ['Record ID', snapshot.recordHeader && snapshot.recordHeader.recordId || ''], ['Note', EXCEL_COPY_NOTE]];
  }
  function buildExcelTransmutationRows() {
    const rows = [['Table','Min','Max','Grade']];
    Object.keys(TRANSMUTATION_TABLE_REGISTRY || {}).forEach(key => {
      const item = TRANSMUTATION_TABLE_REGISTRY[key];
      (item && item.table || []).forEach(r => rows.push([key, r[0], r[1], r[2]]));
    });
    return rows;
  }
  function buildExcelDescriptorRows() {
    const rows = [['Table','Code','Label','Min','Max','Localized Label','Remarks','General Description','Instructional Response']];
    [['table7',TABLE7],['table8',TABLE8],['table10',TABLE10],['table11',TABLE11]].forEach(pair => (pair[1] || []).forEach(r => rows.push([pair[0], r.code || r.descriptorCode || '', r.label || r.descriptorLabel || '', r.min == null ? '' : r.min, r.max == null ? '' : r.max, r.localizedLabel || '', r.remarks || '', r.generalDescription || '', r.instructionalResponse || ''])));
    return rows;
  }

  // v18.55 map-driven Excel formatting: generated from cell_format_map_TermQtr_Summary.xlsx.
  // The runtime export below applies the captured row heights, column widths, merges, styles, borders, fills, alignments, and number formats.
  const EXCEL_FORMAT_MAP = {"term":{"cols":[{"wch":3.8867},{"wch":28.4414},{"wch":8.4414},{"wch":5.8867},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":5.332},{"wch":7.1094},{"wch":4.2188},{"wch":6.2188},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":7.6641},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":8.43},{"wch":12.6641},{"wch":14.5547},{"wch":14.1094},{"wch":0.7773}],"rows":{"1":{"hpt":19.2},"3":{"hpt":14.4},"5":{"hpt":16.2},"6":{"hpt":17.4},"8":{"hpt":14.4}},"merges":["A1:Z1","C2:D2","E2:N2","O2:P2","Q2:Y2","C3:D3","E3:N3","O3:P3","Q3:S3","V3:W3","X3:Y3","A5:C5","D5:E5","F5:G5","H5:I5","J5:N5","O5:P5","Q5:T5","U5:V5","W5:Z5","A6:A8","B6:B8","C6:C7","D6:K6","L6:Q6","R6:W6","X6:X8","Y6:Y8","Z6:Z8"],"styleDefs":{"43":{"font":{"name":"Arial","sz":15.0,"bold":true},"alignment":{"horizontal":"center","vertical":"top","wrapText":true},"numFmt":"General","protection":{"locked":true,"hidden":true}},"24":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","protection":{"locked":true,"hidden":true}},"16":{"font":{"name":"Arial","sz":10.0},"alignment":{"horizontal":"center"},"numFmt":"General","protection":{"locked":true,"hidden":true}},"54":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"General","protection":{"locked":true,"hidden":true}},"56":{"font":{"name":"Arial","sz":10.0},"alignment":{"horizontal":"left","vertical":"center","shrinkToFit":true},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"89":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"90":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"57":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"91":{"font":{"name":"Aptos Narrow","sz":10.0},"alignment":{"horizontal":"left","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"92":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"93":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"13":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"vertical":"center"},"numFmt":"General","protection":{"locked":true,"hidden":true}},"default":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","protection":{"locked":true,"hidden":false}},"63":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"94":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"67":{"font":{"name":"Arial","sz":10.0},"alignment":{"horizontal":"left","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"55":{"font":{"name":"Calibri","sz":10.0},"numFmt":"General","protection":{"locked":true,"hidden":true}},"58":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"0;;","protection":{"locked":true,"hidden":true}},"12":{"font":{"name":"Arial","sz":10.0},"alignment":{"horizontal":"center"},"numFmt":"General","protection":{"locked":false,"hidden":false}},"11":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center"},"numFmt":"0.00","protection":{"locked":false,"hidden":false}},"10":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center"},"numFmt":"General","protection":{"locked":false,"hidden":false}},"9":{"font":{"name":"Arial","sz":10.0},"numFmt":"General","protection":{"locked":false,"hidden":false}},"79":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":false,"hidden":false}},"95":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":false,"hidden":false}},"96":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":false,"hidden":false}},"81":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"82":{"font":{"name":"Calibri","sz":10.0},"alignment":{"horizontal":"left","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"83":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"52":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"33":{"font":{"name":"Arial","sz":10.0},"alignment":{"vertical":"center"},"numFmt":"0;;","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"88":{"font":{"name":"Arial","sz":10.0},"alignment":{"vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"71":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"72":{"font":{"name":"Calibri","sz":10.0},"alignment":{"horizontal":"left"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"97":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center","wrapText":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"76":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"left","vertical":"top","wrapText":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"78":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center","wrapText":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"69":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center","wrapText":true},"numFmt":"0.00","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"98":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"7":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"6":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"2":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0.00","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"17":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0%","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"85":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0%","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"8":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0%","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"99":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"32":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center","shrinkToFit":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":false,"hidden":false}},"4":{"font":{"name":"Arial","sz":10.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center","shrinkToFit":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":false,"hidden":false}},"19":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"@","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"18":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0%","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"86":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0%","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"3":{"font":{"name":"Arial","sz":10.0,"bold":true},"fill":{"patternType":"solid","fgColor":{"rgb":"F2F2F2"}},"alignment":{"horizontal":"center","vertical":"center","shrinkToFit":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"35":{"font":{"name":"Aptos Narrow","sz":10.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"87":{"font":{"name":"Aptos Narrow","sz":10.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}}},"cellStyles":{"A1":"43","B1":"24","C1":"24","D1":"24","E1":"24","F1":"24","G1":"24","H1":"24","I1":"24","J1":"24","K1":"24","L1":"24","M1":"24","N1":"24","O1":"24","P1":"24","Q1":"24","R1":"24","S1":"24","T1":"24","U1":"24","V1":"24","W1":"24","X1":"24","Y1":"24","Z1":"24","AA1":"24","A2":"16","B2":"16","C2":"54","D2":"24","E2":"56","F2":"89","G2":"89","H2":"89","I2":"89","J2":"89","K2":"89","L2":"89","M2":"89","N2":"90","O2":"57","P2":"24","Q2":"91","R2":"92","S2":"92","T2":"92","U2":"92","V2":"92","W2":"92","X2":"92","Y2":"93","Z2":"13","AA2":"default","A3":"16","B3":"13","C3":"63","D3":"94","E3":"56","F3":"89","G3":"89","H3":"89","I3":"89","J3":"89","K3":"89","L3":"89","M3":"89","N3":"90","O3":"57","P3":"24","Q3":"67","R3":"89","S3":"90","T3":"default","U3":"55","V3":"55","W3":"58","X3":"67","Y3":"90","Z3":"13","AA3":"default","A4":"12","B4":"12","C4":"12","D4":"12","E4":"12","F4":"12","G4":"12","H4":"12","I4":"12","J4":"11","K4":"11","L4":"12","M4":"12","N4":"12","O4":"12","P4":"11","Q4":"11","R4":"11","S4":"11","T4":"12","U4":"12","V4":"11","W4":"11","X4":"11","Y4":"10","Z4":"9","AA4":"default","A5":"79","B5":"95","C5":"96","D5":"81","E5":"90","F5":"82","G5":"90","H5":"83","I5":"90","J5":"67","K5":"89","L5":"89","M5":"89","N5":"90","O5":"52","P5":"89","Q5":"33","R5":"88","S5":"88","T5":"88","U5":"71","V5":"90","W5":"72","X5":"89","Y5":"89","Z5":"90","AA5":"default","A6":"97","B6":"97","C6":"76","D6":"78","E6":"89","F6":"89","G6":"89","H6":"89","I6":"89","J6":"89","K6":"90","L6":"78","M6":"89","N6":"89","O6":"89","P6":"89","Q6":"90","R6":"78","S6":"89","T6":"89","U6":"89","V6":"89","W6":"90","X6":"69","Y6":"69","Z6":"69","AA6":"default","A7":"98","B7":"98","C7":"98","D7":"7","E7":"7","F7":"7","G7":"7","H7":"7","I7":"6","J7":"2","K7":"17","L7":"7","M7":"7","N7":"7","O7":"6","P7":"2","Q7":"85","R7":"8","S7":"8","T7":"7","U7":"6","V7":"2","W7":"17","X7":"98","Y7":"98","Z7":"98","AA7":"default","A8":"99","B8":"99","C8":"32","D8":"4","E8":"4","F8":"4","G8":"4","H8":"4","I8":"6","J8":"19","K8":"18","L8":"4","M8":"4","N8":"4","O8":"6","P8":"19","Q8":"86","R8":"79","S8":"79","T8":"4","U8":"3","V8":"19","W8":"18","X8":"99","Y8":"99","Z8":"99","AA8":"default","A9":"35","B9":"35","C9":"35","D9":"35","E9":"35","F9":"35","G9":"35","H9":"35","I9":"35","J9":"35","K9":"35","L9":"35","M9":"35","N9":"35","O9":"35","P9":"35","Q9":"87","R9":"35","S9":"35","T9":"35","U9":"35","V9":"35","W9":"35","X9":"35","Y9":"35","Z9":"35","AA9":"default","A10":"35","B10":"35","C10":"35","D10":"35","E10":"35","F10":"35","G10":"35","H10":"35","I10":"35","J10":"35","K10":"35","L10":"35","M10":"35","N10":"35","O10":"35","P10":"35","Q10":"87","R10":"35","S10":"35","T10":"35","U10":"35","V10":"35","W10":"35","X10":"35","Y10":"35","Z10":"35","AA10":"default","A11":"35","B11":"35","C11":"35","D11":"35","E11":"35","F11":"35","G11":"35","H11":"35","I11":"35","J11":"35","K11":"35","L11":"35","M11":"35","N11":"35","O11":"35","P11":"35","Q11":"87","R11":"35","S11":"35","T11":"35","U11":"35","V11":"35","W11":"35","X11":"35","Y11":"35","Z11":"35","AA11":"default","A12":"35","B12":"35","C12":"35","D12":"35","E12":"35","F12":"35","G12":"35","H12":"35","I12":"35","J12":"35","K12":"35","L12":"35","M12":"35","N12":"35","O12":"35","P12":"35","Q12":"87","R12":"35","S12":"35","T12":"35","U12":"35","V12":"35","W12":"35","X12":"35","Y12":"35","Z12":"35","AA12":"default","A13":"35","B13":"35","C13":"35","D13":"35","E13":"35","F13":"35","G13":"35","H13":"35","I13":"35","J13":"35","K13":"35","L13":"35","M13":"35","N13":"35","O13":"35","P13":"35","Q13":"87","R13":"35","S13":"35","T13":"35","U13":"35","V13":"35","W13":"35","X13":"35","Y13":"35","Z13":"35","AA13":"default","A14":"35","B14":"35","C14":"35","D14":"35","E14":"35","F14":"35","G14":"35","H14":"35","I14":"35","J14":"35","K14":"35","L14":"35","M14":"35","N14":"35","O14":"35","P14":"35","Q14":"87","R14":"35","S14":"35","T14":"35","U14":"35","V14":"35","W14":"35","X14":"35","Y14":"35","Z14":"35","AA14":"default","A15":"35","B15":"35","C15":"35","D15":"35","E15":"35","F15":"35","G15":"35","H15":"35","I15":"35","J15":"35","K15":"35","L15":"35","M15":"35","N15":"35","O15":"35","P15":"35","Q15":"87","R15":"35","S15":"35","T15":"35","U15":"35","V15":"35","W15":"35","X15":"35","Y15":"35","Z15":"35","AA15":"default","A16":"35","B16":"35","C16":"35","D16":"35","E16":"35","F16":"35","G16":"35","H16":"35","I16":"35","J16":"35","K16":"35","L16":"35","M16":"35","N16":"35","O16":"35","P16":"35","Q16":"87","R16":"35","S16":"35","T16":"35","U16":"35","V16":"35","W16":"35","X16":"35","Y16":"35","Z16":"35","AA16":"default","A17":"35","B17":"35","C17":"35","D17":"35","E17":"35","F17":"35","G17":"35","H17":"35","I17":"35","J17":"35","K17":"35","L17":"35","M17":"35","N17":"35","O17":"35","P17":"35","Q17":"87","R17":"35","S17":"35","T17":"35","U17":"35","V17":"35","W17":"35","X17":"35","Y17":"35","Z17":"35","AA17":"default","A18":"35","B18":"35","C18":"35","D18":"35","E18":"35","F18":"35","G18":"35","H18":"35","I18":"35","J18":"35","K18":"35","L18":"35","M18":"35","N18":"35","O18":"35","P18":"35","Q18":"87","R18":"35","S18":"35","T18":"35","U18":"35","V18":"35","W18":"35","X18":"35","Y18":"35","Z18":"35","AA18":"default","A19":"35","B19":"35","C19":"35","D19":"35","E19":"35","F19":"35","G19":"35","H19":"35","I19":"35","J19":"35","K19":"35","L19":"35","M19":"35","N19":"35","O19":"35","P19":"35","Q19":"87","R19":"35","S19":"35","T19":"35","U19":"35","V19":"35","W19":"35","X19":"35","Y19":"35","Z19":"35","AA19":"default","A20":"35","B20":"35","C20":"35","D20":"35","E20":"35","F20":"35","G20":"35","H20":"35","I20":"35","J20":"35","K20":"35","L20":"35","M20":"35","N20":"35","O20":"35","P20":"35","Q20":"87","R20":"35","S20":"35","T20":"35","U20":"35","V20":"35","W20":"35","X20":"35","Y20":"35","Z20":"35","AA20":"default","A21":"35","B21":"35","C21":"35","D21":"35","E21":"35","F21":"35","G21":"35","H21":"35","I21":"35","J21":"35","K21":"35","L21":"35","M21":"35","N21":"35","O21":"35","P21":"35","Q21":"87","R21":"35","S21":"35","T21":"35","U21":"35","V21":"35","W21":"35","X21":"35","Y21":"35","Z21":"35","AA21":"default","A22":"35","B22":"35","C22":"35","D22":"35","E22":"35","F22":"35","G22":"35","H22":"35","I22":"35","J22":"35","K22":"35","L22":"35","M22":"35","N22":"35","O22":"35","P22":"35","Q22":"87","R22":"35","S22":"35","T22":"35","U22":"35","V22":"35","W22":"35","X22":"35","Y22":"35","Z22":"35","AA22":"default","A23":"35","B23":"35","C23":"35","D23":"35","E23":"35","F23":"35","G23":"35","H23":"35","I23":"35","J23":"35","K23":"35","L23":"35","M23":"35","N23":"35","O23":"35","P23":"35","Q23":"87","R23":"35","S23":"35","T23":"35","U23":"35","V23":"35","W23":"35","X23":"35","Y23":"35","Z23":"35","AA23":"default","A24":"35","B24":"35","C24":"35","D24":"35","E24":"35","F24":"35","G24":"35","H24":"35","I24":"35","J24":"35","K24":"35","L24":"35","M24":"35","N24":"35","O24":"35","P24":"35","Q24":"87","R24":"35","S24":"35","T24":"35","U24":"35","V24":"35","W24":"35","X24":"35","Y24":"35","Z24":"35","AA24":"default","A25":"35","B25":"35","C25":"35","D25":"35","E25":"35","F25":"35","G25":"35","H25":"35","I25":"35","J25":"35","K25":"35","L25":"35","M25":"35","N25":"35","O25":"35","P25":"35","Q25":"87","R25":"35","S25":"35","T25":"35","U25":"35","V25":"35","W25":"35","X25":"35","Y25":"35","Z25":"35","AA25":"default","A26":"35","B26":"35","C26":"35","D26":"35","E26":"35","F26":"35","G26":"35","H26":"35","I26":"35","J26":"35","K26":"35","L26":"35","M26":"35","N26":"35","O26":"35","P26":"35","Q26":"87","R26":"35","S26":"35","T26":"35","U26":"35","V26":"35","W26":"35","X26":"35","Y26":"35","Z26":"35","AA26":"default","A27":"35","B27":"35","C27":"35","D27":"35","E27":"35","F27":"35","G27":"35","H27":"35","I27":"35","J27":"35","K27":"35","L27":"35","M27":"35","N27":"35","O27":"35","P27":"35","Q27":"87","R27":"35","S27":"35","T27":"35","U27":"35","V27":"35","W27":"35","X27":"35","Y27":"35","Z27":"35","AA27":"default","A28":"35","B28":"35","C28":"35","D28":"35","E28":"35","F28":"35","G28":"35","H28":"35","I28":"35","J28":"35","K28":"35","L28":"35","M28":"35","N28":"35","O28":"35","P28":"35","Q28":"87","R28":"35","S28":"35","T28":"35","U28":"35","V28":"35","W28":"35","X28":"35","Y28":"35","Z28":"35","AA28":"default","A29":"35","B29":"35","C29":"35","D29":"35","E29":"35","F29":"35","G29":"35","H29":"35","I29":"35","J29":"35","K29":"35","L29":"35","M29":"35","N29":"35","O29":"35","P29":"35","Q29":"87","R29":"35","S29":"35","T29":"35","U29":"35","V29":"35","W29":"35","X29":"35","Y29":"35","Z29":"35","AA29":"default","A30":"35","B30":"35","C30":"35","D30":"35","E30":"35","F30":"35","G30":"35","H30":"35","I30":"35","J30":"35","K30":"35","L30":"35","M30":"35","N30":"35","O30":"35","P30":"35","Q30":"87","R30":"35","S30":"35","T30":"35","U30":"35","V30":"35","W30":"35","X30":"35","Y30":"35","Z30":"35","AA30":"default","A31":"35","B31":"35","C31":"35","D31":"35","E31":"35","F31":"35","G31":"35","H31":"35","I31":"35","J31":"35","K31":"35","L31":"35","M31":"35","N31":"35","O31":"35","P31":"35","Q31":"87","R31":"35","S31":"35","T31":"35","U31":"35","V31":"35","W31":"35","X31":"35","Y31":"35","Z31":"35","AA31":"default","A32":"35","B32":"35","C32":"35","D32":"35","E32":"35","F32":"35","G32":"35","H32":"35","I32":"35","J32":"35","K32":"35","L32":"35","M32":"35","N32":"35","O32":"35","P32":"35","Q32":"87","R32":"35","S32":"35","T32":"35","U32":"35","V32":"35","W32":"35","X32":"35","Y32":"35","Z32":"35","AA32":"default","A33":"35","B33":"35","C33":"35","D33":"35","E33":"35","F33":"35","G33":"35","H33":"35","I33":"35","J33":"35","K33":"35","L33":"35","M33":"35","N33":"35","O33":"35","P33":"35","Q33":"87","R33":"35","S33":"35","T33":"35","U33":"35","V33":"35","W33":"35","X33":"35","Y33":"35","Z33":"35","AA33":"default","A34":"35","B34":"35","C34":"35","D34":"35","E34":"35","F34":"35","G34":"35","H34":"35","I34":"35","J34":"35","K34":"35","L34":"35","M34":"35","N34":"35","O34":"35","P34":"35","Q34":"87","R34":"35","S34":"35","T34":"35","U34":"35","V34":"35","W34":"35","X34":"35","Y34":"35","Z34":"35","AA34":"default","A35":"35","B35":"35","C35":"35","D35":"35","E35":"35","F35":"35","G35":"35","H35":"35","I35":"35","J35":"35","K35":"35","L35":"35","M35":"35","N35":"35","O35":"35","P35":"35","Q35":"87","R35":"35","S35":"35","T35":"35","U35":"35","V35":"35","W35":"35","X35":"35","Y35":"35","Z35":"35","AA35":"default","A36":"35","B36":"35","C36":"35","D36":"35","E36":"35","F36":"35","G36":"35","H36":"35","I36":"35","J36":"35","K36":"35","L36":"35","M36":"35","N36":"35","O36":"35","P36":"35","Q36":"87","R36":"35","S36":"35","T36":"35","U36":"35","V36":"35","W36":"35","X36":"35","Y36":"35","Z36":"35","AA36":"default","A37":"35","B37":"35","C37":"35","D37":"35","E37":"35","F37":"35","G37":"35","H37":"35","I37":"35","J37":"35","K37":"35","L37":"35","M37":"35","N37":"35","O37":"35","P37":"35","Q37":"87","R37":"35","S37":"35","T37":"35","U37":"35","V37":"35","W37":"35","X37":"35","Y37":"35","Z37":"35","AA37":"default","A38":"35","B38":"35","C38":"35","D38":"35","E38":"35","F38":"35","G38":"35","H38":"35","I38":"35","J38":"35","K38":"35","L38":"35","M38":"35","N38":"35","O38":"35","P38":"35","Q38":"87","R38":"35","S38":"35","T38":"35","U38":"35","V38":"35","W38":"35","X38":"35","Y38":"35","Z38":"35","AA38":"default","A39":"35","B39":"35","C39":"35","D39":"35","E39":"35","F39":"35","G39":"35","H39":"35","I39":"35","J39":"35","K39":"35","L39":"35","M39":"35","N39":"35","O39":"35","P39":"35","Q39":"87","R39":"35","S39":"35","T39":"35","U39":"35","V39":"35","W39":"35","X39":"35","Y39":"35","Z39":"35","AA39":"default","A40":"35","B40":"35","C40":"35","D40":"35","E40":"35","F40":"35","G40":"35","H40":"35","I40":"35","J40":"35","K40":"35","L40":"35","M40":"35","N40":"35","O40":"35","P40":"35","Q40":"87","R40":"35","S40":"35","T40":"35","U40":"35","V40":"35","W40":"35","X40":"35","Y40":"35","Z40":"35","AA40":"default","A41":"35","B41":"35","C41":"35","D41":"35","E41":"35","F41":"35","G41":"35","H41":"35","I41":"35","J41":"35","K41":"35","L41":"35","M41":"35","N41":"35","O41":"35","P41":"35","Q41":"87","R41":"35","S41":"35","T41":"35","U41":"35","V41":"35","W41":"35","X41":"35","Y41":"35","Z41":"35","AA41":"default","A42":"35","B42":"35","C42":"35","D42":"35","E42":"35","F42":"35","G42":"35","H42":"35","I42":"35","J42":"35","K42":"35","L42":"35","M42":"35","N42":"35","O42":"35","P42":"35","Q42":"87","R42":"35","S42":"35","T42":"35","U42":"35","V42":"35","W42":"35","X42":"35","Y42":"35","Z42":"35","AA42":"default","A43":"35","B43":"35","C43":"35","D43":"35","E43":"35","F43":"35","G43":"35","H43":"35","I43":"35","J43":"35","K43":"35","L43":"35","M43":"35","N43":"35","O43":"35","P43":"35","Q43":"87","R43":"35","S43":"35","T43":"35","U43":"35","V43":"35","W43":"35","X43":"35","Y43":"35","Z43":"35","AA43":"default","A44":"35","B44":"35","C44":"35","D44":"35","E44":"35","F44":"35","G44":"35","H44":"35","I44":"35","J44":"35","K44":"35","L44":"35","M44":"35","N44":"35","O44":"35","P44":"35","Q44":"87","R44":"35","S44":"35","T44":"35","U44":"35","V44":"35","W44":"35","X44":"35","Y44":"35","Z44":"35","AA44":"default","A45":"35","B45":"35","C45":"35","D45":"35","E45":"35","F45":"35","G45":"35","H45":"35","I45":"35","J45":"35","K45":"35","L45":"35","M45":"35","N45":"35","O45":"35","P45":"35","Q45":"87","R45":"35","S45":"35","T45":"35","U45":"35","V45":"35","W45":"35","X45":"35","Y45":"35","Z45":"35","AA45":"default","A46":"35","B46":"35","C46":"35","D46":"35","E46":"35","F46":"35","G46":"35","H46":"35","I46":"35","J46":"35","K46":"35","L46":"35","M46":"35","N46":"35","O46":"35","P46":"35","Q46":"87","R46":"35","S46":"35","T46":"35","U46":"35","V46":"35","W46":"35","X46":"35","Y46":"35","Z46":"35","AA46":"default","A47":"35","B47":"35","C47":"35","D47":"35","E47":"35","F47":"35","G47":"35","H47":"35","I47":"35","J47":"35","K47":"35","L47":"35","M47":"35","N47":"35","O47":"35","P47":"35","Q47":"87","R47":"35","S47":"35","T47":"35","U47":"35","V47":"35","W47":"35","X47":"35","Y47":"35","Z47":"35","AA47":"default","A48":"35","B48":"35","C48":"35","D48":"35","E48":"35","F48":"35","G48":"35","H48":"35","I48":"35","J48":"35","K48":"35","L48":"35","M48":"35","N48":"35","O48":"35","P48":"35","Q48":"87","R48":"35","S48":"35","T48":"35","U48":"35","V48":"35","W48":"35","X48":"35","Y48":"35","Z48":"35","AA48":"default","A49":"35","B49":"35","C49":"35","D49":"35","E49":"35","F49":"35","G49":"35","H49":"35","I49":"35","J49":"35","K49":"35","L49":"35","M49":"35","N49":"35","O49":"35","P49":"35","Q49":"87","R49":"35","S49":"35","T49":"35","U49":"35","V49":"35","W49":"35","X49":"35","Y49":"35","Z49":"35","AA49":"default","A50":"35","B50":"35","C50":"35","D50":"35","E50":"35","F50":"35","G50":"35","H50":"35","I50":"35","J50":"35","K50":"35","L50":"35","M50":"35","N50":"35","O50":"35","P50":"35","Q50":"87","R50":"35","S50":"35","T50":"35","U50":"35","V50":"35","W50":"35","X50":"35","Y50":"35","Z50":"35","AA50":"default","A51":"35","B51":"35","C51":"35","D51":"35","E51":"35","F51":"35","G51":"35","H51":"35","I51":"35","J51":"35","K51":"35","L51":"35","M51":"35","N51":"35","O51":"35","P51":"35","Q51":"87","R51":"35","S51":"35","T51":"35","U51":"35","V51":"35","W51":"35","X51":"35","Y51":"35","Z51":"35","AA51":"default","A52":"35","B52":"35","C52":"35","D52":"35","E52":"35","F52":"35","G52":"35","H52":"35","I52":"35","J52":"35","K52":"35","L52":"35","M52":"35","N52":"35","O52":"35","P52":"35","Q52":"87","R52":"35","S52":"35","T52":"35","U52":"35","V52":"35","W52":"35","X52":"35","Y52":"35","Z52":"35","AA52":"default","A53":"35","B53":"35","C53":"35","D53":"35","E53":"35","F53":"35","G53":"35","H53":"35","I53":"35","J53":"35","K53":"35","L53":"35","M53":"35","N53":"35","O53":"35","P53":"35","Q53":"87","R53":"35","S53":"35","T53":"35","U53":"35","V53":"35","W53":"35","X53":"35","Y53":"35","Z53":"35","AA53":"default","A54":"35","B54":"35","C54":"35","D54":"35","E54":"35","F54":"35","G54":"35","H54":"35","I54":"35","J54":"35","K54":"35","L54":"35","M54":"35","N54":"35","O54":"35","P54":"35","Q54":"87","R54":"35","S54":"35","T54":"35","U54":"35","V54":"35","W54":"35","X54":"35","Y54":"35","Z54":"35","AA54":"default","A55":"35","B55":"35","C55":"35","D55":"35","E55":"35","F55":"35","G55":"35","H55":"35","I55":"35","J55":"35","K55":"35","L55":"35","M55":"35","N55":"35","O55":"35","P55":"35","Q55":"87","R55":"35","S55":"35","T55":"35","U55":"35","V55":"35","W55":"35","X55":"35","Y55":"35","Z55":"35","AA55":"default","A56":"35","B56":"35","C56":"35","D56":"35","E56":"35","F56":"35","G56":"35","H56":"35","I56":"35","J56":"35","K56":"35","L56":"35","M56":"35","N56":"35","O56":"35","P56":"35","Q56":"87","R56":"35","S56":"35","T56":"35","U56":"35","V56":"35","W56":"35","X56":"35","Y56":"35","Z56":"35","AA56":"default","A57":"35","B57":"35","C57":"35","D57":"35","E57":"35","F57":"35","G57":"35","H57":"35","I57":"35","J57":"35","K57":"35","L57":"35","M57":"35","N57":"35","O57":"35","P57":"35","Q57":"87","R57":"35","S57":"35","T57":"35","U57":"35","V57":"35","W57":"35","X57":"35","Y57":"35","Z57":"35","AA57":"default","A58":"35","B58":"35","C58":"35","D58":"35","E58":"35","F58":"35","G58":"35","H58":"35","I58":"35","J58":"35","K58":"35","L58":"35","M58":"35","N58":"35","O58":"35","P58":"35","Q58":"87","R58":"35","S58":"35","T58":"35","U58":"35","V58":"35","W58":"35","X58":"35","Y58":"35","Z58":"35","AA58":"default","A59":"35","B59":"35","C59":"35","D59":"35","E59":"35","F59":"35","G59":"35","H59":"35","I59":"35","J59":"35","K59":"35","L59":"35","M59":"35","N59":"35","O59":"35","P59":"35","Q59":"87","R59":"35","S59":"35","T59":"35","U59":"35","V59":"35","W59":"35","X59":"35","Y59":"35","Z59":"35","AA59":"default","A60":"35","B60":"35","C60":"35","D60":"35","E60":"35","F60":"35","G60":"35","H60":"35","I60":"35","J60":"35","K60":"35","L60":"35","M60":"35","N60":"35","O60":"35","P60":"35","Q60":"87","R60":"35","S60":"35","T60":"35","U60":"35","V60":"35","W60":"35","X60":"35","Y60":"35","Z60":"35","AA60":"default","A61":"35","B61":"35","C61":"35","D61":"35","E61":"35","F61":"35","G61":"35","H61":"35","I61":"35","J61":"35","K61":"35","L61":"35","M61":"35","N61":"35","O61":"35","P61":"35","Q61":"87","R61":"35","S61":"35","T61":"35","U61":"35","V61":"35","W61":"35","X61":"35","Y61":"35","Z61":"35","AA61":"default","A62":"35","B62":"35","C62":"35","D62":"35","E62":"35","F62":"35","G62":"35","H62":"35","I62":"35","J62":"35","K62":"35","L62":"35","M62":"35","N62":"35","O62":"35","P62":"35","Q62":"87","R62":"35","S62":"35","T62":"35","U62":"35","V62":"35","W62":"35","X62":"35","Y62":"35","Z62":"35","AA62":"default","A63":"35","B63":"35","C63":"35","D63":"35","E63":"35","F63":"35","G63":"35","H63":"35","I63":"35","J63":"35","K63":"35","L63":"35","M63":"35","N63":"35","O63":"35","P63":"35","Q63":"87","R63":"35","S63":"35","T63":"35","U63":"35","V63":"35","W63":"35","X63":"35","Y63":"35","Z63":"35","AA63":"default","A64":"35","B64":"35","C64":"35","D64":"35","E64":"35","F64":"35","G64":"35","H64":"35","I64":"35","J64":"35","K64":"35","L64":"35","M64":"35","N64":"35","O64":"35","P64":"35","Q64":"87","R64":"35","S64":"35","T64":"35","U64":"35","V64":"35","W64":"35","X64":"35","Y64":"35","Z64":"35","AA64":"default","A65":"35","B65":"35","C65":"35","D65":"35","E65":"35","F65":"35","G65":"35","H65":"35","I65":"35","J65":"35","K65":"35","L65":"35","M65":"35","N65":"35","O65":"35","P65":"35","Q65":"87","R65":"35","S65":"35","T65":"35","U65":"35","V65":"35","W65":"35","X65":"35","Y65":"35","Z65":"35","AA65":"default","A66":"35","B66":"35","C66":"35","D66":"35","E66":"35","F66":"35","G66":"35","H66":"35","I66":"35","J66":"35","K66":"35","L66":"35","M66":"35","N66":"35","O66":"35","P66":"35","Q66":"87","R66":"35","S66":"35","T66":"35","U66":"35","V66":"35","W66":"35","X66":"35","Y66":"35","Z66":"35","AA66":"default","A67":"35","B67":"35","C67":"35","D67":"35","E67":"35","F67":"35","G67":"35","H67":"35","I67":"35","J67":"35","K67":"35","L67":"35","M67":"35","N67":"35","O67":"35","P67":"35","Q67":"87","R67":"35","S67":"35","T67":"35","U67":"35","V67":"35","W67":"35","X67":"35","Y67":"35","Z67":"35","AA67":"default","A68":"35","B68":"35","C68":"35","D68":"35","E68":"35","F68":"35","G68":"35","H68":"35","I68":"35","J68":"35","K68":"35","L68":"35","M68":"35","N68":"35","O68":"35","P68":"35","Q68":"87","R68":"35","S68":"35","T68":"35","U68":"35","V68":"35","W68":"35","X68":"35","Y68":"35","Z68":"35","AA68":"default","A69":"35","B69":"35","C69":"35","D69":"35","E69":"35","F69":"35","G69":"35","H69":"35","I69":"35","J69":"35","K69":"35","L69":"35","M69":"35","N69":"35","O69":"35","P69":"35","Q69":"87","R69":"35","S69":"35","T69":"35","U69":"35","V69":"35","W69":"35","X69":"35","Y69":"35","Z69":"35","AA69":"default","A70":"35","B70":"35","C70":"35","D70":"35","E70":"35","F70":"35","G70":"35","H70":"35","I70":"35","J70":"35","K70":"35","L70":"35","M70":"35","N70":"35","O70":"35","P70":"35","Q70":"87","R70":"35","S70":"35","T70":"35","U70":"35","V70":"35","W70":"35","X70":"35","Y70":"35","Z70":"35","AA70":"default","A71":"35","B71":"35","C71":"35","D71":"35","E71":"35","F71":"35","G71":"35","H71":"35","I71":"35","J71":"35","K71":"35","L71":"35","M71":"35","N71":"35","O71":"35","P71":"35","Q71":"87","R71":"35","S71":"35","T71":"35","U71":"35","V71":"35","W71":"35","X71":"35","Y71":"35","Z71":"35","AA71":"default","A72":"35","B72":"35","C72":"35","D72":"35","E72":"35","F72":"35","G72":"35","H72":"35","I72":"35","J72":"35","K72":"35","L72":"35","M72":"35","N72":"35","O72":"35","P72":"35","Q72":"87","R72":"35","S72":"35","T72":"35","U72":"35","V72":"35","W72":"35","X72":"35","Y72":"35","Z72":"35","AA72":"default","A73":"35","B73":"35","C73":"35","D73":"35","E73":"35","F73":"35","G73":"35","H73":"35","I73":"35","J73":"35","K73":"35","L73":"35","M73":"35","N73":"35","O73":"35","P73":"35","Q73":"87","R73":"35","S73":"35","T73":"35","U73":"35","V73":"35","W73":"35","X73":"35","Y73":"35","Z73":"35","AA73":"default","A74":"35","B74":"35","C74":"35","D74":"35","E74":"35","F74":"35","G74":"35","H74":"35","I74":"35","J74":"35","K74":"35","L74":"35","M74":"35","N74":"35","O74":"35","P74":"35","Q74":"87","R74":"35","S74":"35","T74":"35","U74":"35","V74":"35","W74":"35","X74":"35","Y74":"35","Z74":"35","AA74":"default","A75":"35","B75":"35","C75":"35","D75":"35","E75":"35","F75":"35","G75":"35","H75":"35","I75":"35","J75":"35","K75":"35","L75":"35","M75":"35","N75":"35","O75":"35","P75":"35","Q75":"87","R75":"35","S75":"35","T75":"35","U75":"35","V75":"35","W75":"35","X75":"35","Y75":"35","Z75":"35","AA75":"default","A76":"35","B76":"35","C76":"35","D76":"35","E76":"35","F76":"35","G76":"35","H76":"35","I76":"35","J76":"35","K76":"35","L76":"35","M76":"35","N76":"35","O76":"35","P76":"35","Q76":"87","R76":"35","S76":"35","T76":"35","U76":"35","V76":"35","W76":"35","X76":"35","Y76":"35","Z76":"35","AA76":"default","A77":"35","B77":"35","C77":"35","D77":"35","E77":"35","F77":"35","G77":"35","H77":"35","I77":"35","J77":"35","K77":"35","L77":"35","M77":"35","N77":"35","O77":"35","P77":"35","Q77":"87","R77":"35","S77":"35","T77":"35","U77":"35","V77":"35","W77":"35","X77":"35","Y77":"35","Z77":"35","AA77":"default","A78":"35","B78":"35","C78":"35","D78":"35","E78":"35","F78":"35","G78":"35","H78":"35","I78":"35","J78":"35","K78":"35","L78":"35","M78":"35","N78":"35","O78":"35","P78":"35","Q78":"87","R78":"35","S78":"35","T78":"35","U78":"35","V78":"35","W78":"35","X78":"35","Y78":"35","Z78":"35","AA78":"default","A79":"35","B79":"35","C79":"35","D79":"35","E79":"35","F79":"35","G79":"35","H79":"35","I79":"35","J79":"35","K79":"35","L79":"35","M79":"35","N79":"35","O79":"35","P79":"35","Q79":"87","R79":"35","S79":"35","T79":"35","U79":"35","V79":"35","W79":"35","X79":"35","Y79":"35","Z79":"35","AA79":"default","A80":"35","B80":"35","C80":"35","D80":"35","E80":"35","F80":"35","G80":"35","H80":"35","I80":"35","J80":"35","K80":"35","L80":"35","M80":"35","N80":"35","O80":"35","P80":"35","Q80":"87","R80":"35","S80":"35","T80":"35","U80":"35","V80":"35","W80":"35","X80":"35","Y80":"35","Z80":"35","AA80":"default","A81":"35","B81":"35","C81":"35","D81":"35","E81":"35","F81":"35","G81":"35","H81":"35","I81":"35","J81":"35","K81":"35","L81":"35","M81":"35","N81":"35","O81":"35","P81":"35","Q81":"87","R81":"35","S81":"35","T81":"35","U81":"35","V81":"35","W81":"35","X81":"35","Y81":"35","Z81":"35","AA81":"default","A82":"35","B82":"35","C82":"35","D82":"35","E82":"35","F82":"35","G82":"35","H82":"35","I82":"35","J82":"35","K82":"35","L82":"35","M82":"35","N82":"35","O82":"35","P82":"35","Q82":"87","R82":"35","S82":"35","T82":"35","U82":"35","V82":"35","W82":"35","X82":"35","Y82":"35","Z82":"35","AA82":"default","A83":"35","B83":"35","C83":"35","D83":"35","E83":"35","F83":"35","G83":"35","H83":"35","I83":"35","J83":"35","K83":"35","L83":"35","M83":"35","N83":"35","O83":"35","P83":"35","Q83":"87","R83":"35","S83":"35","T83":"35","U83":"35","V83":"35","W83":"35","X83":"35","Y83":"35","Z83":"35","AA83":"default","A84":"35","B84":"35","C84":"35","D84":"35","E84":"35","F84":"35","G84":"35","H84":"35","I84":"35","J84":"35","K84":"35","L84":"35","M84":"35","N84":"35","O84":"35","P84":"35","Q84":"87","R84":"35","S84":"35","T84":"35","U84":"35","V84":"35","W84":"35","X84":"35","Y84":"35","Z84":"35","AA84":"default","A85":"35","B85":"35","C85":"35","D85":"35","E85":"35","F85":"35","G85":"35","H85":"35","I85":"35","J85":"35","K85":"35","L85":"35","M85":"35","N85":"35","O85":"35","P85":"35","Q85":"87","R85":"35","S85":"35","T85":"35","U85":"35","V85":"35","W85":"35","X85":"35","Y85":"35","Z85":"35","AA85":"default","A86":"35","B86":"35","C86":"35","D86":"35","E86":"35","F86":"35","G86":"35","H86":"35","I86":"35","J86":"35","K86":"35","L86":"35","M86":"35","N86":"35","O86":"35","P86":"35","Q86":"87","R86":"35","S86":"35","T86":"35","U86":"35","V86":"35","W86":"35","X86":"35","Y86":"35","Z86":"35","AA86":"default","A87":"35","B87":"35","C87":"35","D87":"35","E87":"35","F87":"35","G87":"35","H87":"35","I87":"35","J87":"35","K87":"35","L87":"35","M87":"35","N87":"35","O87":"35","P87":"35","Q87":"87","R87":"35","S87":"35","T87":"35","U87":"35","V87":"35","W87":"35","X87":"35","Y87":"35","Z87":"35","AA87":"default","A88":"35","B88":"35","C88":"35","D88":"35","E88":"35","F88":"35","G88":"35","H88":"35","I88":"35","J88":"35","K88":"35","L88":"35","M88":"35","N88":"35","O88":"35","P88":"35","Q88":"87","R88":"35","S88":"35","T88":"35","U88":"35","V88":"35","W88":"35","X88":"35","Y88":"35","Z88":"35","AA88":"default"}},"summary":{"cols":[{"wch":3.6641},{"wch":31.7773},{"wch":10.332},{"wch":18.332},{"wch":8.43},{"wch":8.43},{"wch":18.332,"hidden":true},{"wch":15.7773},{"wch":17.332},{"wch":16.2188}],"rows":{"1":{"hpt":19.2},"2":{"hpt":11.4},"5":{"hpt":7.2},"6":{"hpt":15.6},"7":{"hpt":16.2},"8":{"hpt":15.0}},"merges":["A1:J1","C3:E3","H3:J3","C4:E4","A6:A8","B6:B8","C6:C8","H6:J6","E7:G7","I7:J7"],"styleDefs":{"43":{"font":{"name":"Arial","sz":15.0,"bold":true},"alignment":{"horizontal":"center","vertical":"top","wrapText":true},"numFmt":"General","protection":{"locked":true,"hidden":true}},"24":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","protection":{"locked":true,"hidden":true}},"20":{"font":{"name":"Arial Narrow","sz":7.0,"italic":true,"color":{"rgb":"000000"}},"alignment":{"vertical":"top","wrapText":true},"numFmt":"General","protection":{"locked":true,"hidden":true}},"21":{"font":{"name":"Arial","sz":11.0},"alignment":{"horizontal":"center"},"numFmt":"General","protection":{"locked":true,"hidden":true}},"26":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"General","protection":{"locked":true,"hidden":true}},"41":{"font":{"name":"Calibri","sz":11.0},"alignment":{"horizontal":"left"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"89":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"90":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"100":{"font":{"name":"Aptos Narrow","sz":11.0},"alignment":{"horizontal":"left"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"92":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"93":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"25":{"font":{"name":"Aptos Narrow","sz":11.0},"alignment":{"horizontal":"left"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"22":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"center"},"numFmt":"0.00","protection":{"locked":true,"hidden":true}},"44":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"45":{"font":{"name":"Arial","sz":14.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center","shrinkToFit":true},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"27":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"29":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"right"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"42":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"left"},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"98":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"30":{"font":{"name":"Arial","sz":11.0,"bold":true},"alignment":{"horizontal":"right","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"99":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"31":{"font":{"name":"Arial","sz":12.0,"bold":true},"alignment":{"horizontal":"center","vertical":"center"},"numFmt":"0;;","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":true}},"35":{"font":{"name":"Aptos Narrow","sz":10.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}},"23":{"font":{"name":"Aptos Narrow","sz":11.0},"numFmt":"General","border":{"left":{"style":"thin","color":{"rgb":"000000"}},"right":{"style":"thin","color":{"rgb":"000000"}},"top":{"style":"thin","color":{"rgb":"000000"}},"bottom":{"style":"thin","color":{"rgb":"000000"}}},"protection":{"locked":true,"hidden":false}}},"cellStyles":{"A1":"43","B1":"24","C1":"24","D1":"24","E1":"24","F1":"24","G1":"24","H1":"24","I1":"24","J1":"24","A2":"20","B2":"20","C2":"20","D2":"20","E2":"20","F2":"20","G2":"20","H2":"20","I2":"20","J2":"20","A3":"21","B3":"26","C3":"41","D3":"89","E3":"90","F3":"26","G3":"26","H3":"100","I3":"92","J3":"93","A4":"21","B4":"26","C4":"41","D4":"89","E4":"90","F4":"26","G4":"26","H4":"25","I4":"26","J4":"25","A5":"21","B5":"21","C5":"21","D5":"21","E5":"21","F5":"21","G5":"21","H5":"22","I5":"21","J5":"21","A6":"44","B6":"44","C6":"45","D6":"27","E6":"41","F6":"29","G6":"29","H6":"42","I6":"89","J6":"90","A7":"98","B7":"98","C7":"98","D7":"30","E7":"41","F7":"89","G7":"90","H7":"29","I7":"41","J7":"90","A8":"99","B8":"99","C8":"99","D8":"31","E8":"31","F8":"31","G8":"31","H8":"31","I8":"31","J8":"31","A9":"35","B9":"23","C9":"23","D9":"23","E9":"23","F9":"23","G9":"23","H9":"23","I9":"23","J9":"23","A10":"35","B10":"23","C10":"23","D10":"23","E10":"23","F10":"23","G10":"23","H10":"23","I10":"23","J10":"23","A11":"35","B11":"23","C11":"23","D11":"23","E11":"23","F11":"23","G11":"23","H11":"23","I11":"23","J11":"23","A12":"35","B12":"23","C12":"23","D12":"23","E12":"23","F12":"23","G12":"23","H12":"23","I12":"23","J12":"23","A13":"35","B13":"23","C13":"23","D13":"23","E13":"23","F13":"23","G13":"23","H13":"23","I13":"23","J13":"23","A14":"35","B14":"23","C14":"23","D14":"23","E14":"23","F14":"23","G14":"23","H14":"23","I14":"23","J14":"23","A15":"35","B15":"23","C15":"23","D15":"23","E15":"23","F15":"23","G15":"23","H15":"23","I15":"23","J15":"23","A16":"35","B16":"23","C16":"23","D16":"23","E16":"23","F16":"23","G16":"23","H16":"23","I16":"23","J16":"23","A17":"35","B17":"23","C17":"23","D17":"23","E17":"23","F17":"23","G17":"23","H17":"23","I17":"23","J17":"23","A18":"35","B18":"23","C18":"23","D18":"23","E18":"23","F18":"23","G18":"23","H18":"23","I18":"23","J18":"23","A19":"35","B19":"23","C19":"23","D19":"23","E19":"23","F19":"23","G19":"23","H19":"23","I19":"23","J19":"23","A20":"35","B20":"23","C20":"23","D20":"23","E20":"23","F20":"23","G20":"23","H20":"23","I20":"23","J20":"23","A21":"35","B21":"23","C21":"23","D21":"23","E21":"23","F21":"23","G21":"23","H21":"23","I21":"23","J21":"23","A22":"35","B22":"23","C22":"23","D22":"23","E22":"23","F22":"23","G22":"23","H22":"23","I22":"23","J22":"23","A23":"35","B23":"23","C23":"23","D23":"23","E23":"23","F23":"23","G23":"23","H23":"23","I23":"23","J23":"23","A24":"35","B24":"23","C24":"23","D24":"23","E24":"23","F24":"23","G24":"23","H24":"23","I24":"23","J24":"23","A25":"35","B25":"23","C25":"23","D25":"23","E25":"23","F25":"23","G25":"23","H25":"23","I25":"23","J25":"23","A26":"35","B26":"23","C26":"23","D26":"23","E26":"23","F26":"23","G26":"23","H26":"23","I26":"23","J26":"23","A27":"35","B27":"23","C27":"23","D27":"23","E27":"23","F27":"23","G27":"23","H27":"23","I27":"23","J27":"23","A28":"35","B28":"23","C28":"23","D28":"23","E28":"23","F28":"23","G28":"23","H28":"23","I28":"23","J28":"23","A29":"35","B29":"23","C29":"23","D29":"23","E29":"23","F29":"23","G29":"23","H29":"23","I29":"23","J29":"23","A30":"35","B30":"23","C30":"23","D30":"23","E30":"23","F30":"23","G30":"23","H30":"23","I30":"23","J30":"23","A31":"35","B31":"23","C31":"23","D31":"23","E31":"23","F31":"23","G31":"23","H31":"23","I31":"23","J31":"23","A32":"35","B32":"23","C32":"23","D32":"23","E32":"23","F32":"23","G32":"23","H32":"23","I32":"23","J32":"23","A33":"35","B33":"23","C33":"23","D33":"23","E33":"23","F33":"23","G33":"23","H33":"23","I33":"23","J33":"23","A34":"35","B34":"23","C34":"23","D34":"23","E34":"23","F34":"23","G34":"23","H34":"23","I34":"23","J34":"23","A35":"35","B35":"23","C35":"23","D35":"23","E35":"23","F35":"23","G35":"23","H35":"23","I35":"23","J35":"23","A36":"35","B36":"23","C36":"23","D36":"23","E36":"23","F36":"23","G36":"23","H36":"23","I36":"23","J36":"23","A37":"35","B37":"23","C37":"23","D37":"23","E37":"23","F37":"23","G37":"23","H37":"23","I37":"23","J37":"23","A38":"35","B38":"23","C38":"23","D38":"23","E38":"23","F38":"23","G38":"23","H38":"23","I38":"23","J38":"23","A39":"35","B39":"23","C39":"23","D39":"23","E39":"23","F39":"23","G39":"23","H39":"23","I39":"23","J39":"23","A40":"35","B40":"23","C40":"23","D40":"23","E40":"23","F40":"23","G40":"23","H40":"23","I40":"23","J40":"23","A41":"35","B41":"23","C41":"23","D41":"23","E41":"23","F41":"23","G41":"23","H41":"23","I41":"23","J41":"23","A42":"35","B42":"23","C42":"23","D42":"23","E42":"23","F42":"23","G42":"23","H42":"23","I42":"23","J42":"23","A43":"35","B43":"23","C43":"23","D43":"23","E43":"23","F43":"23","G43":"23","H43":"23","I43":"23","J43":"23","A44":"35","B44":"23","C44":"23","D44":"23","E44":"23","F44":"23","G44":"23","H44":"23","I44":"23","J44":"23","A45":"35","B45":"23","C45":"23","D45":"23","E45":"23","F45":"23","G45":"23","H45":"23","I45":"23","J45":"23","A46":"35","B46":"23","C46":"23","D46":"23","E46":"23","F46":"23","G46":"23","H46":"23","I46":"23","J46":"23","A47":"35","B47":"23","C47":"23","D47":"23","E47":"23","F47":"23","G47":"23","H47":"23","I47":"23","J47":"23","A48":"35","B48":"23","C48":"23","D48":"23","E48":"23","F48":"23","G48":"23","H48":"23","I48":"23","J48":"23","A49":"35","B49":"23","C49":"23","D49":"23","E49":"23","F49":"23","G49":"23","H49":"23","I49":"23","J49":"23","A50":"35","B50":"23","C50":"23","D50":"23","E50":"23","F50":"23","G50":"23","H50":"23","I50":"23","J50":"23","A51":"35","B51":"23","C51":"23","D51":"23","E51":"23","F51":"23","G51":"23","H51":"23","I51":"23","J51":"23","A52":"35","B52":"23","C52":"23","D52":"23","E52":"23","F52":"23","G52":"23","H52":"23","I52":"23","J52":"23","A53":"35","B53":"23","C53":"23","D53":"23","E53":"23","F53":"23","G53":"23","H53":"23","I53":"23","J53":"23","A54":"35","B54":"23","C54":"23","D54":"23","E54":"23","F54":"23","G54":"23","H54":"23","I54":"23","J54":"23","A55":"35","B55":"23","C55":"23","D55":"23","E55":"23","F55":"23","G55":"23","H55":"23","I55":"23","J55":"23","A56":"35","B56":"23","C56":"23","D56":"23","E56":"23","F56":"23","G56":"23","H56":"23","I56":"23","J56":"23","A57":"35","B57":"23","C57":"23","D57":"23","E57":"23","F57":"23","G57":"23","H57":"23","I57":"23","J57":"23","A58":"35","B58":"23","C58":"23","D58":"23","E58":"23","F58":"23","G58":"23","H58":"23","I58":"23","J58":"23","A59":"35","B59":"23","C59":"23","D59":"23","E59":"23","F59":"23","G59":"23","H59":"23","I59":"23","J59":"23","A60":"35","B60":"23","C60":"23","D60":"23","E60":"23","F60":"23","G60":"23","H60":"23","I60":"23","J60":"23","A61":"35","B61":"23","C61":"23","D61":"23","E61":"23","F61":"23","G61":"23","H61":"23","I61":"23","J61":"23","A62":"35","B62":"23","C62":"23","D62":"23","E62":"23","F62":"23","G62":"23","H62":"23","I62":"23","J62":"23","A63":"35","B63":"23","C63":"23","D63":"23","E63":"23","F63":"23","G63":"23","H63":"23","I63":"23","J63":"23","A64":"35","B64":"23","C64":"23","D64":"23","E64":"23","F64":"23","G64":"23","H64":"23","I64":"23","J64":"23","A65":"35","B65":"23","C65":"23","D65":"23","E65":"23","F65":"23","G65":"23","H65":"23","I65":"23","J65":"23","A66":"35","B66":"23","C66":"23","D66":"23","E66":"23","F66":"23","G66":"23","H66":"23","I66":"23","J66":"23","A67":"35","B67":"23","C67":"23","D67":"23","E67":"23","F67":"23","G67":"23","H67":"23","I67":"23","J67":"23","A68":"35","B68":"23","C68":"23","D68":"23","E68":"23","F68":"23","G68":"23","H68":"23","I68":"23","J68":"23","A69":"35","B69":"23","C69":"23","D69":"23","E69":"23","F69":"23","G69":"23","H69":"23","I69":"23","J69":"23","A70":"35","B70":"23","C70":"23","D70":"23","E70":"23","F70":"23","G70":"23","H70":"23","I70":"23","J70":"23","A71":"35","B71":"23","C71":"23","D71":"23","E71":"23","F71":"23","G71":"23","H71":"23","I71":"23","J71":"23","A72":"35","B72":"23","C72":"23","D72":"23","E72":"23","F72":"23","G72":"23","H72":"23","I72":"23","J72":"23","A73":"35","B73":"23","C73":"23","D73":"23","E73":"23","F73":"23","G73":"23","H73":"23","I73":"23","J73":"23","A74":"35","B74":"23","C74":"23","D74":"23","E74":"23","F74":"23","G74":"23","H74":"23","I74":"23","J74":"23","A75":"35","B75":"23","C75":"23","D75":"23","E75":"23","F75":"23","G75":"23","H75":"23","I75":"23","J75":"23","A76":"35","B76":"23","C76":"23","D76":"23","E76":"23","F76":"23","G76":"23","H76":"23","I76":"23","J76":"23","A77":"35","B77":"23","C77":"23","D77":"23","E77":"23","F77":"23","G77":"23","H77":"23","I77":"23","J77":"23","A78":"35","B78":"23","C78":"23","D78":"23","E78":"23","F78":"23","G78":"23","H78":"23","I78":"23","J78":"23","A79":"35","B79":"23","C79":"23","D79":"23","E79":"23","F79":"23","G79":"23","H79":"23","I79":"23","J79":"23","A80":"35","B80":"23","C80":"23","D80":"23","E80":"23","F80":"23","G80":"23","H80":"23","I80":"23","J80":"23","A81":"35","B81":"23","C81":"23","D81":"23","E81":"23","F81":"23","G81":"23","H81":"23","I81":"23","J81":"23","A82":"35","B82":"23","C82":"23","D82":"23","E82":"23","F82":"23","G82":"23","H82":"23","I82":"23","J82":"23","A83":"35","B83":"23","C83":"23","D83":"23","E83":"23","F83":"23","G83":"23","H83":"23","I83":"23","J83":"23","A84":"35","B84":"23","C84":"23","D84":"23","E84":"23","F84":"23","G84":"23","H84":"23","I84":"23","J84":"23","A85":"35","B85":"23","C85":"23","D85":"23","E85":"23","F85":"23","G85":"23","H85":"23","I85":"23","J85":"23","A86":"35","B86":"23","C86":"23","D86":"23","E86":"23","F86":"23","G86":"23","H86":"23","I86":"23","J86":"23","A87":"35","B87":"23","C87":"23","D87":"23","E87":"23","F87":"23","G87":"23","H87":"23","I87":"23","J87":"23","A88":"35","B88":"23","C88":"23","D88":"23","E88":"23","F88":"23","G88":"23","H88":"23","I88":"23","J88":"23"}}};

  
  // v18.61: Derived from the MAPEH_Tn format in the captured MAPEH-aware class record.
  // It reuses the captured summary style definitions but applies the 8-column MAPEH term-summary
  // widths, row heights, and merges so values are not formatted with the 10-column final summary map.
  // v18.68: Correct Summary of Grades header merges so H6 remains the SUBJECT label and I6:J6 contains the subject value.
  if (EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP.summary && Array.isArray(EXCEL_FORMAT_MAP.summary.merges)) {
    EXCEL_FORMAT_MAP.summary.merges = EXCEL_FORMAT_MAP.summary.merges.filter(ref => ref !== 'H6:J6');
    if (!EXCEL_FORMAT_MAP.summary.merges.includes('E6:G6')) EXCEL_FORMAT_MAP.summary.merges.push('E6:G6');
    if (!EXCEL_FORMAT_MAP.summary.merges.includes('I6:J6')) EXCEL_FORMAT_MAP.summary.merges.push('I6:J6');
  }
  if (EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP.summary && !EXCEL_FORMAT_MAP.mapehTermSummary) {
    try {
      const baseSummaryMap = EXCEL_FORMAT_MAP.summary;
      const baseCellStyles = baseSummaryMap.cellStyles || {};
      const mapehTermCellStyles = {};
      Object.keys(baseCellStyles).forEach(address => {
        const match = String(address).match(/^([A-H])(\d+)$/);
        if (match) mapehTermCellStyles[address] = baseCellStyles[address];
      });
      EXCEL_FORMAT_MAP.mapehTermSummary = {
        cols: [{ wch: 3.6641 }, { wch: 31.7773 }, { wch: 10.3320 }, { wch: 21.1094 }, { wch: 13 }, { wch: 13 }, { wch: 17.3320 }, { wch: 16.2188 }, { wch: 0.8867 }, { wch: 0, hidden: true }],
        rows: { '1': { hpt: 19.2 }, '2': { hpt: 11.4 }, '5': { hpt: 7.2 }, '6': { hpt: 15.6 }, '7': { hpt: 16.2 }, '8': { hpt: 15.0 } },
        merges: ['A1:H1', 'C3:D3', 'F3:H3', 'C4:D4', 'A6:C6', 'A7:A8', 'B7:B8', 'C7:C8', 'G7:H7'],
        styleDefs: baseSummaryMap.styleDefs || {},
        cellStyles: mapehTermCellStyles
      };
    } catch (_) {}
  }
  // v18.69: Screenshot conformance for exported MAPEH workbook headers.
  // 1) MA_Tn/PEH_Tn component sheets: V3 is the merged SCHOOL YEAR label cell.
  //    Since only the top-left cell controls a merged range style, force V3 to the
  //    existing bold/right/center label style so the caption matches the template.
  // 2) MAPEH_Tn summary sheets: E3/E4 are standalone label cells for DIVISION and
  //    SCHOOL ID. They must be bold and right-aligned without inheriting the final
  //    summary value-cell borders that made the header look shifted/unfilled.
  if (EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP.term && EXCEL_FORMAT_MAP.term.cellStyles) {
    EXCEL_FORMAT_MAP.term.cellStyles.V3 = '54';
    EXCEL_FORMAT_MAP.term.cellStyles.W3 = '54';
  }
  if (EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP.mapehTermSummary) {
    EXCEL_FORMAT_MAP.mapehTermSummary.cols = [
      { wch: 3.6641 }, { wch: 31.7773 }, { wch: 10.3320 }, { wch: 21.1094 },
      { wch: 14.75 }, { wch: 13 }, { wch: 17.3320 }, { wch: 16.2188 }
    ];
    EXCEL_FORMAT_MAP.mapehTermSummary.cellStyles = Object.assign({}, EXCEL_FORMAT_MAP.mapehTermSummary.cellStyles || {}, {
      E3: '26', E4: '26'
    });
  }
  // v18.70: MAPEH consolidated final Summary uses a hidden-G worksheet layout.
  // Put merged Division/School ID values on G3/G4, keep column F wide enough for
  // label text, and preserve the corrected H6 SUBJECT label merge.
  if (EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP.summary && !EXCEL_FORMAT_MAP.mapehFinalSummary) {
    try {
      const baseSummaryMap = EXCEL_FORMAT_MAP.summary;
      EXCEL_FORMAT_MAP.mapehFinalSummary = {
        cols: [
          { wch: 3.6641 }, { wch: 31.7773 }, { wch: 10.3320 }, { wch: 18.3320 },
          { wch: 13 }, { wch: 13.5 }, { wch: 18.3320 }, { wch: 15.7773 },
          { wch: 17.3320 }, { wch: 16.2188 }
        ],
        rows: baseSummaryMap.rows || {},
        merges: ['A1:J1','C3:E3','G3:J3','C4:E4','G4:H4','A6:A8','B6:B8','C6:C8','E6:G6','E7:G7','I6:J6','I7:J7'],
        styleDefs: baseSummaryMap.styleDefs || {},
        cellStyles: Object.assign({}, baseSummaryMap.cellStyles || {}, { H6: '32' })
      };
    } catch (_) {}
  }
  function excelDecodeMerge(ref) {
    try { return XLSX.utils.decode_range(ref); } catch (_) { return null; }
  }
  function excelEnsureCell(ws, address) {
    if (!ws[address]) ws[address] = { t: 's', v: '' };
    return ws[address];
  }
  function excelCellStyle(kind) {
    const base = { font: { name: 'Arial', sz: 9 }, alignment: { vertical: 'center', wrapText: true }, border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } } };
    if (kind === 'title') return Object.assign({}, base, { font: { name: 'Arial', sz: 12, bold: true }, alignment: { horizontal: 'center', vertical: 'center' } });
    if (kind === 'header') return Object.assign({}, base, { font: { name: 'Arial', sz: 8, bold: true }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, fill: { fgColor: { rgb: 'D9EAF7' } } });
    if (kind === 'subheader') return Object.assign({}, base, { font: { name: 'Arial', sz: 8, bold: true }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, fill: { fgColor: { rgb: 'EAF3F8' } } });
    if (kind === 'label') return Object.assign({}, base, { font: { name: 'Arial', sz: 8, bold: true }, alignment: { horizontal: 'left', vertical: 'center', wrapText: true } });
    if (kind === 'center') return Object.assign({}, base, { alignment: { horizontal: 'center', vertical: 'center', wrapText: true } });
    if (kind === 'name') return Object.assign({}, base, { alignment: { horizontal: 'left', vertical: 'center', wrapText: true } });
    return base;
  }
  function excelApplyStyle(ws, rangeRef, kind) {
    const range = excelDecodeMerge(rangeRef);
    if (!range) return;
    for (let R = range.s.r; R <= range.e.r; R += 1) {
      for (let C = range.s.c; C <= range.e.c; C += 1) {
        const address = XLSX.utils.encode_cell({ r: R, c: C });
        excelEnsureCell(ws, address).s = excelCellStyle(kind);
      }
    }
  }
  function excelCloneStyleValue(value) {
    if (!value || typeof value !== 'object') return value;
    try { return JSON.parse(JSON.stringify(value)); } catch (_) { return value; }
  }
  function excelApplyFormatMap(ws, mapKey) {
    const map = EXCEL_FORMAT_MAP && EXCEL_FORMAT_MAP[mapKey];
    if (!map || !ws || typeof XLSX === 'undefined' || !XLSX || !XLSX.utils) return false;
    if (Array.isArray(map.cols)) ws['!cols'] = map.cols.map(col => Object.assign({}, col));
    if (map.rows) {
      const outRows = [];
      Object.keys(map.rows).forEach(k => {
        const idx = Number(k) - 1;
        if (idx >= 0) outRows[idx] = Object.assign({}, map.rows[k]);
      });
      ws['!rows'] = outRows;
    }
    if (Array.isArray(map.merges)) ws['!merges'] = map.merges.map(excelDecodeMerge).filter(Boolean);
    const styleDefs = map.styleDefs || {};
    const cellStyles = map.cellStyles || {};
    Object.keys(cellStyles).forEach(address => {
      const sid = cellStyles[address];
      const style = styleDefs[sid];
      const cell = excelEnsureCell(ws, address);
      if (style) cell.s = excelCloneStyleValue(style);
    });
    return true;
  }
  function excelApplyTemplateStyles(ws, meta, rowCount, colCount) {
    if (!meta) return;
    const mapKey = meta.formatMapKey || meta.type;
    // v18.63: A sheet-specific formatMapKey must be honored first. MAPEH_Tn uses
    // mapKey='mapehTermSummary'; the old guard only allowed 'term' or 'summary',
    // so the fixed XLSX merges/widths/styles were skipped and the exported sheet
    // fell back to the generic 10-column summary styling.
    if (meta.formatMapKey && excelApplyFormatMap(ws, mapKey)) return;
    if ((mapKey === 'term' || mapKey === 'summary') && excelApplyFormatMap(ws, mapKey)) return;
    if (meta.type === 'term') {
      excelApplyStyle(ws, 'A1:Z1', 'title');
      excelApplyStyle(ws, 'C2:Z5', 'label');
      excelApplyStyle(ws, 'A6:Z8', 'header');
      excelApplyStyle(ws, `A9:Z${rowCount}`, 'center');
      excelApplyStyle(ws, `B9:B${rowCount}`, 'name');
    } else if (meta.type === 'summary') {
      excelApplyStyle(ws, 'A1:J1', 'title');
      excelApplyStyle(ws, 'B3:J7', 'label');
      excelApplyStyle(ws, 'A6:J8', 'header');
      excelApplyStyle(ws, `A9:J${rowCount}`, 'center');
      excelApplyStyle(ws, `B9:B${rowCount}`, 'name');
    } else {
      excelApplyStyle(ws, `A1:${XLSX.utils.encode_col(Math.max(0, colCount - 1))}1`, 'title');
      if (rowCount >= 4) excelApplyStyle(ws, `A4:${XLSX.utils.encode_col(Math.max(0, colCount - 1))}4`, 'header');
    }
  }
  function excelThinBorderStyle() {
    return { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } };
  }
  function excelScreenshotCellStyle(options = {}) {
    const align = options.align || 'center';
    return {
      font: { name: 'Arial', sz: 10, bold: !!options.bold },
      alignment: { horizontal: align, vertical: 'center', wrapText: !!options.wrapText, shrinkToFit: options.shrinkToFit !== false },
      border: excelThinBorderStyle(),
      numFmt: options.numFmt || 'General',
      protection: { locked: true, hidden: false }
    };
  }
  function excelApplyCellStyleRange(ws, rangeRef, style) {
    const range = excelDecodeMerge(rangeRef);
    if (!range) return;
    for (let R = range.s.r; R <= range.e.r; R += 1) {
      for (let C = range.s.c; C <= range.e.c; C += 1) {
        const address = XLSX.utils.encode_cell({ r: R, c: C });
        excelEnsureCell(ws, address).s = excelCloneStyleValue(style);
      }
    }
  }
  function excelApplyMapehScreenshotFixes(ws, meta) {
    if (!ws || !meta) return;
    const centeredValue = excelScreenshotCellStyle({ align: 'center', bold: false });
    const leftValue = excelScreenshotCellStyle({ align: 'left', bold: false });
    const rightLabel = excelScreenshotCellStyle({ align: 'right', bold: true });
    if (meta.formatMapKey === 'mapehTermSummary') {
      // MAPEH_Tn: value cells must be bordered, non-bold, and aligned like the screenshot.
      excelApplyCellStyleRange(ws, 'C3:D3', centeredValue);
      excelApplyCellStyleRange(ws, 'C4:D4', leftValue);
      excelApplyCellStyleRange(ws, 'F3:H3', centeredValue);
      excelApplyCellStyleRange(ws, 'F4:F4', centeredValue);
      excelApplyCellStyleRange(ws, 'H4:H4', centeredValue);
      excelApplyCellStyleRange(ws, 'B3:B4', rightLabel);
      excelApplyCellStyleRange(ws, 'E3:E4', rightLabel);
      excelApplyCellStyleRange(ws, 'G4:G4', rightLabel);
    }
    if (meta.formatMapKey === 'mapehFinalSummary') {
      // Summary of Grades: hidden-G layout means values live at G3 and G4.
      excelApplyCellStyleRange(ws, 'C3:E3', centeredValue);
      excelApplyCellStyleRange(ws, 'C4:E4', leftValue);
      excelApplyCellStyleRange(ws, 'G3:J3', centeredValue);
      excelApplyCellStyleRange(ws, 'G4:H4', centeredValue);
      excelApplyCellStyleRange(ws, 'B3:B4', rightLabel);
      excelApplyCellStyleRange(ws, 'F3:F4', rightLabel);
      excelApplyCellStyleRange(ws, 'I4:I4', rightLabel);
      excelApplyCellStyleRange(ws, 'H6:H6', rightLabel);
    }
  }

  function worksheetFromRows(payload) {
    const rows = payload && payload.rows ? payload.rows : payload;
    const meta = payload && payload.rows ? payload.meta : null;
    const ws = XLSX.utils.aoa_to_sheet(rows || []);
    const rowCount = (rows || []).length;
    const colCount = (rows || []).reduce((m, row) => Math.max(m, (row || []).length), 0);
    const defaultCols = Array.from({ length: Math.max(1, colCount) }, (_, idx) => ({ wch: idx === 1 ? 28 : 16 }));
    if (meta && Array.isArray(meta.cols)) {
      ws['!cols'] = meta.cols.map(item => typeof item === 'number' ? { wch: item } : item);
    } else {
      ws['!cols'] = defaultCols;
    }
    if (meta && Array.isArray(meta.merges)) ws['!merges'] = meta.merges.map(excelDecodeMerge).filter(Boolean);
    if (meta && meta.rows) {
      const outRows = [];
      Object.keys(meta.rows).forEach(k => {
        const idx = Number(k) - 1;
        if (idx >= 0) outRows[idx] = { hpt: meta.rows[k] };
      });
      ws['!rows'] = outRows;
    }
    if (meta && meta.freeze) ws['!freeze'] = meta.freeze;
    excelApplyTemplateStyles(ws, meta, rowCount, colCount);
    excelApplyMapehScreenshotFixes(ws, meta);
    if (meta && meta.type === 'summary' && ws['!cols'] && ws['!cols'][6]) ws['!cols'][6].hidden = !!meta.hideTerm4;
    ws['!protect'] = { selectLockedCells: true, selectUnlockedCells: true };
    return ws;
  }
  function appendWorkbookSheet(wb, name, rows, hidden) {
    const safe = getExcelSheetSafeName(name, name);
    XLSX.utils.book_append_sheet(wb, worksheetFromRows(rows), safe);
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Sheets) wb.Workbook.Sheets = [];
    wb.Workbook.Sheets[wb.SheetNames.length - 1] = { name: safe, Hidden: hidden ? 1 : 0 };
    return safe;
  }

  // v18.56 Phase 2 Excel writer hardening.
  // Prefer xlsx-js-style because the normal SheetJS CE browser writer may keep cell values/merges/widths but drop .s style objects.
  // HTML remains unchanged; this module loads the style-capable writer on demand before export.
  const EXCEL_STYLE_ENGINE_URLS = [
    'https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.min.js',
    'https://unpkg.com/xlsx-js-style@1.2.0/dist/xlsx.min.js'
  ];
  const EXCEL_DEBUG_ZIP_URLS = [
    'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
  ];
  function excelGlobalEngine() {
    try { return (typeof window !== 'undefined' && window.XLSX) ? window.XLSX : (typeof XLSX !== 'undefined' ? XLSX : null); } catch (_) { return null; }
  }
  function excelEngineUsable(engine) {
    return !!(engine && engine.utils && typeof engine.write === 'function' && typeof engine.utils.book_new === 'function' && typeof engine.utils.book_append_sheet === 'function');
  }
  function excelLoadScriptOnce(src, markerKey) {
    return new Promise((resolve, reject) => {
      try {
        if (markerKey && window[markerKey]) { resolve(window[markerKey]); return; }
        const existing = document.querySelector(`script[data-ctm-loader="${markerKey || src}"]`);
        if (existing) {
          existing.addEventListener('load', () => resolve(true), { once: true });
          existing.addEventListener('error', () => reject(new Error('script-load-failed')), { once: true });
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.setAttribute('data-ctm-loader', markerKey || src);
        script.onload = () => { if (markerKey) window[markerKey] = true; resolve(true); };
        script.onerror = () => reject(new Error('script-load-failed'));
        (document.head || document.documentElement).appendChild(script);
      } catch (err) { reject(err); }
    });
  }
  async function ensureStyleCapableExcelEngine() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      const engine = excelGlobalEngine();
      if (excelEngineUsable(engine)) return engine;
      throw new Error('missing-xlsx');
    }
    if (window.CTM_CLASSRECORD_EXCEL_STYLE_ENGINE_READY && excelEngineUsable(excelGlobalEngine())) return excelGlobalEngine();
    if (window.CTM_CLASSRECORD_DISABLE_XLSX_STYLE_LOADER) {
      const existing = excelGlobalEngine();
      if (excelEngineUsable(existing)) return existing;
      throw new Error('missing-xlsx');
    }
    let lastErr = null;
    for (const url of EXCEL_STYLE_ENGINE_URLS) {
      try {
        await excelLoadScriptOnce(url, 'CTM_CLASSRECORD_EXCEL_STYLE_ENGINE_READY');
        const engine = excelGlobalEngine();
        if (excelEngineUsable(engine)) return engine;
      } catch (err) { lastErr = err; }
    }
    const fallback = excelGlobalEngine();
    if (excelEngineUsable(fallback)) {
      try { console.warn('[CTM Class Record] xlsx-js-style could not be loaded; falling back to the existing XLSX writer. Cell styles may not be preserved.', lastErr); } catch (_) {}
      return fallback;
    }
    throw new Error('missing-xlsx-style');
  }
  function excelShouldRunXmlVerification() {
    try {
      if (typeof window === 'undefined') return false;
      if (window.CTM_CLASSRECORD_EXCEL_DEBUG === true || window.CTM_CLASSRECORD_EXCEL_VERIFY_XML === true) return true;
      if (window.location && /(?:\?|&)ctmExcelDebug=1(?:&|$)/.test(window.location.search || '')) return true;
      if (window.localStorage && window.localStorage.getItem('ctm-classrecord-excel-debug') === '1') return true;
    } catch (_) {}
    return false;
  }
  async function excelEnsureJSZipForDebug() {
    if (typeof window === 'undefined') throw new Error('missing-jszip');
    if (window.JSZip) return window.JSZip;
    let lastErr = null;
    for (const url of EXCEL_DEBUG_ZIP_URLS) {
      try {
        await excelLoadScriptOnce(url, 'CTM_CLASSRECORD_JSZIP_READY');
        if (window.JSZip) return window.JSZip;
      } catch (err) { lastErr = err; }
    }
    throw lastErr || new Error('missing-jszip');
  }
  async function excelVerifyWorkbookXml(arrayBuffer, workbook) {
    const result = { ok: false, checked: false, hasStylesXml: false, hasCellXfs: false, hasBorders: false, hasFonts: false, hasFills: false, sheets: [] };
    if (!excelShouldRunXmlVerification()) return result;
    try {
      const JSZipCtor = await excelEnsureJSZipForDebug();
      const zip = await JSZipCtor.loadAsync(arrayBuffer);
      const stylesFile = zip.file('xl/styles.xml');
      const stylesXml = stylesFile ? await stylesFile.async('string') : '';
      result.checked = true;
      result.hasStylesXml = !!stylesXml;
      result.hasCellXfs = /<cellXfs[^>]*count="(?:[2-9]|[1-9]\d+)"/i.test(stylesXml);
      result.hasBorders = /<borders[^>]*count="(?:[2-9]|[1-9]\d+)"/i.test(stylesXml) || /<border>/i.test(stylesXml);
      result.hasFonts = /<fonts[^>]*count="(?:[2-9]|[1-9]\d+)"/i.test(stylesXml) || /<font>/i.test(stylesXml);
      result.hasFills = /<fills[^>]*count="(?:[2-9]|[1-9]\d+)"/i.test(stylesXml) || /<fill>/i.test(stylesXml);
      const names = Array.isArray(workbook && workbook.SheetNames) ? workbook.SheetNames : [];
      for (let i = 0; i < names.length; i += 1) {
        const sheetPath = `xl/worksheets/sheet${i + 1}.xml`;
        const sheetFile = zip.file(sheetPath);
        if (!sheetFile) continue;
        const xml = await sheetFile.async('string');
        result.sheets.push({
          name: names[i],
          path: sheetPath,
          hasCols: /<cols[\s>]/i.test(xml) && /<col[\s>]/i.test(xml),
          hasStyledCells: /<c\s+[^>]*\bs="\d+"/i.test(xml),
          hasMerges: /<mergeCells[\s>]/i.test(xml),
          styledCellCount: (xml.match(/<c\s+[^>]*\bs="\d+"/gi) || []).length
        });
      }
      const visibleMapSheets = result.sheets.filter(s => /TERM|QUARTER|SUMMARY OF GRADES/i.test(s.name || ''));
      result.ok = result.hasStylesXml && result.hasCellXfs && visibleMapSheets.length > 0 && visibleMapSheets.every(s => s.hasCols && s.hasStyledCells);
      try { console.info('[CTM Class Record] Excel XML verification', result); } catch (_) {}
    } catch (err) {
      result.error = err && err.message ? err.message : String(err || 'verification failed');
      try { console.warn('[CTM Class Record] Excel XML verification unavailable', err); } catch (_) {}
    }
    return result;
  }
  function excelDownloadArrayBuffer(arrayBuffer, filename) {
    if (typeof Blob === 'undefined' || typeof URL === 'undefined') throw new Error('download-unavailable');
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      try { URL.revokeObjectURL(link.href); } catch (_) {}
      try { link.remove(); } catch (_) {}
    }, 0);
  }

  function mapehTermShortLabel(termKey) {
    const label = getSummaryTermColumnLabel(termKey);
    const m = label.match(/(?:Quarter|Term)\s*(\d+)/i);
    if (/quarter/i.test(label)) return m ? `Q${m[1].trim()}` : label;
    if (/term/i.test(label)) return m ? `T${m[1].trim()}` : label;
    return label;
  }
  function buildMapehConsolidatedExcelSnapshot() {
    const bundleId = getMapehBundleId(state.recordHeader);
    const paired = findMapehPairedRecords(bundleId);
    const summary = computeMapehConsolidatedSummary(paired);
    const baseHeader = clone(state.mapehVirtualBaseHeader || state.recordHeader || defaultRecordHeader());
    // v18.67: The virtual consolidated Summary can be opened from a read-only MAPEH
    // view whose header is thinner than the saved component records. Backfill the
    // official header fields from any paired component before building MAPEH_Tn and
    // Summary of Grades sheets so Region/Division/School Name/School ID do not export blank.
    const headerFillKeys = ['region','division','district','schoolName','schoolId','schoolYear','gradeLevel','section','className','semester','teacherName','subjectGroup'];
    MAPEH_COMPONENTS.forEach(meta => {
      const sourceHeader = paired && paired[meta.key] && paired[meta.key].recordHeader || null;
      if (!sourceHeader) return;
      headerFillKeys.forEach(key => {
        if (!text(baseHeader[key]).trim() && text(sourceHeader[key]).trim()) baseHeader[key] = sourceHeader[key];
      });
    });
    const h = Object.assign(defaultRecordHeader(), baseHeader, { subject: 'MAPEH', subjectKey: 'mapeh', mapehMode: 'consolidated', mapehComponent: '', mapehBundleId: bundleId, mapehReportSubject: 'MAPEH' });
    const componentSnapshots = {};
    MAPEH_COMPONENTS.forEach(meta => {
      const rec = paired[meta.key];
      componentSnapshots[meta.key] = rec ? Object.assign({}, rec, { visibleTerms: summary.visibleTerms, termSheetNames: {} }) : null;
      if (componentSnapshots[meta.key]) summary.visibleTerms.forEach(k => { componentSnapshots[meta.key].termSheetNames[k] = getMapehExcelComponentSheetName(meta.key, k); });
    });
    const baseSnapshot = buildActiveClassRecordExcelSnapshot();
    return Object.assign(baseSnapshot, { recordHeader: h, finalSummary: defaultFinalSummary(), visibleTerms: summary.visibleTerms, termSheetNames: {}, mapeh: { isSummaryView: true, mode: 'consolidated', component: '', bundleId, reportSubject: 'MAPEH', summary, components: paired, componentSnapshots } });
  }
  function getMapehExcelComponentSheetName(componentKey, termKey) {
    const prefix = componentKey === 'peHealth' ? 'PEH' : 'MA';
    return `${prefix}_${mapehTermShortLabel(termKey)}`;
  }
  function getMapehExcelSummaryTermSheetName(termKey) {
    return `MAPEH_${mapehTermShortLabel(termKey)}`;
  }

  function buildExcelMapehTermSummarySheetRows(snapshot, termKey) {
    const summary = snapshot && snapshot.mapeh && snapshot.mapeh.summary || computeMapehConsolidatedSummary(getMapehBundleId(state.recordHeader));
    const h = snapshot.recordHeader || {};
    const label = getSummaryTermColumnLabel(termKey).toUpperCase();
    // v18.61: Keep the MAPEH_Tn sheet on the captured 8-column MAPEH-aware template.
    // The previous build split component labels across rows 8-9 and then applied the 10-column
    // Summary-of-Grades format map, shifting learners one row down and misaligning styles/merges.
    const rows = [
      ['Summary of Grades'],
      [],
      ['', 'REGION:', h.region || '', '', 'DIVISION:', h.division || '', '', ''],
      ['', 'SCHOOL NAME:', h.schoolName || '', '', 'SCHOOL ID:', h.schoolId || '', 'SCHOOL YEAR:', h.schoolYear || ''],
      [],
      [label, '', '', 'GRADE LEVEL: ', h.gradeLevel || '', 'SUBJECT:', 'MAPEH', label],
      ['#', "LEARNERS' NAMES", 'SEX', 'SECTION:', h.section || h.className || '', 'TEACHER:', h.teacherName || '', ''],
      ['', '', '', 'MUSIC & ARTS', 'PE & HEALTH', 'MAPEH', 'DESCRIPTOR', 'REMARK']
    ];
    buildLearnerDisplayList(summary.learners || []).forEach(entry => {
      const r = entry.row || {};
      const t = r.terms && r.terms[termKey] || {};
      const termDescriptor = t.complete && t.mapehGrade != null ? numericDescriptor(Number(t.mapehGrade), 'table11') : null;
      rows.push([
        entry.displayNo,
        r.name || '',
        r.sex || '',
        t.musicArtsGrade == null ? '' : t.musicArtsGrade,
        t.peHealthGrade == null ? '' : t.peHealthGrade,
        t.mapehGrade == null ? '' : t.mapehGrade,
        t.complete ? (termDescriptor && (termDescriptor.descriptorLabel || termDescriptor.descriptorCode) || '') : '',
        t.complete ? (t.mapehGrade >= PASSING_GRADE ? 'Passed' : 'Failed') : 'Incomplete'
      ]);
    });
    while (rows.length < 88) rows.push(['', '', '', '', '', '', '', '']);
    return { rows, meta: { type: 'summary', formatMapKey: 'mapehTermSummary', hideTerm4: false, cols: [{ wch: 3.6641 }, { wch: 31.7773 }, { wch: 10.3320 }, { wch: 21.1094 }, { wch: 13 }, { wch: 13 }, { wch: 17.3320 }, { wch: 16.2188 }], freeze: { xSplit: 3, ySplit: 8, topLeftCell: 'D9', activePane: 'bottomRight', state: 'frozen' } } };
  }
  function buildExcelMapehSummarySheetRows(snapshot) {
    const summary = snapshot && snapshot.mapeh && snapshot.mapeh.summary || computeMapehConsolidatedSummary(getMapehBundleId(state.recordHeader));
    const h = snapshot.recordHeader || {};
    const visibleTerms = summary.visibleTerms || [];
    const termHeaders = [];
    visibleTerms.forEach(k => termHeaders.push(getSummaryTermColumnLabel(k).toUpperCase()));
    const showTerm4 = visibleTerms.includes('term4');
    if (!showTerm4) termHeaders.push('TERM 4');
    termHeaders.push('FINAL GRADE', 'DESCRIPTOR', 'REMARK');
    // v18.61: Match the captured Summary of Grades template exactly:
    // metadata remains in D/H blocks on rows 6-7, term/final headers stay on row 8,
    // and learner data starts at row 9. This prevents the exported view from shifting
    // data into the header area when MAPEH is exported as a consolidated workbook.
    const rows = [
      ['Summary of Grades'],
      [],
      ['', 'REGION', h.region || '', '', '', 'DIVISION:', h.division || '', '', '', ''],
      ['', 'SCHOOL NAME', h.schoolName || '', '', '', 'SCHOOL ID:', h.schoolId || '', 'SCHOOL YEAR:', h.schoolYear || ''],
      [],
      ['#', "LEARNERS' NAMES", 'SEX', 'GRADE: ', h.gradeLevel || '', '', '', 'SUBJECT:', 'MAPEH', ''],
      ['', '', '', 'SECTION:', h.section || h.className || '', '', '', 'TEACHER:', h.teacherName || '', ''],
      ['', '', '', termHeaders[0] || 'TERM 1', termHeaders[1] || 'TERM 2', termHeaders[2] || 'TERM 3', termHeaders[3] || 'TERM 4', termHeaders[4] || 'FINAL GRADE', termHeaders[5] || 'DESCRIPTOR', termHeaders[6] || 'REMARK']
    ];
    buildLearnerDisplayList(summary.learners || []).forEach(entry => {
      const r = entry.row || {};
      const row = [entry.displayNo, r.name || '', r.sex || ''];
      visibleTerms.forEach(k => {
        const t = r.terms && r.terms[k] || {};
        row.push(t.mapehGrade == null ? '' : t.mapehGrade);
      });
      if (!showTerm4) row.push('');
      row.push(r.finalMapehGrade == null ? '' : r.finalMapehGrade, r.descriptorLabel || r.descriptorCode || '', r.remarks || '');
      rows.push(row);
    });
    while (rows.length < 88) rows.push(['', '', '', '', '', '', '', '', '', '']);
    rows.push([], ['Class Average', summary.classSummary.classAverage == null ? '' : summary.classSummary.classAverage, 'Passing Count', summary.classSummary.passingCount, 'Non-Passing Count', summary.classSummary.nonPassingCount, 'Incomplete Count', summary.classSummary.incompleteCount, 'Learner Count', summary.classSummary.learnerCount]);
    (summary.warnings || []).forEach(w => rows.push(['Warning', w]));
    return { rows, meta: { type: 'summary', formatMapKey: 'mapehFinalSummary', hideTerm4: !showTerm4, cols: [{ wch: 3.6641 }, { wch: 31.7773 }, { wch: 10.3320 }, { wch: 18.3320 }, { wch: 13 }, { wch: 13.5 }, { wch: 18.3320 }, { wch: 15.7773 }, { wch: 17.3320 }, { wch: 16.2188 }], freeze: { xSplit: 3, ySplit: 8, topLeftCell: 'D9', activePane: 'bottomRight', state: 'frozen' } } };
  }

  async function exportMapehConsolidatedWorkbook(options = {}) {
    const engine = await ensureStyleCapableExcelEngine();
    if (!excelEngineUsable(engine)) throw new Error('missing-xlsx');
    const snapshot = options.snapshot || buildMapehConsolidatedExcelSnapshot();
    const wb = engine.utils.book_new();
    appendWorkbookSheet(wb, 'COVER', buildExcelCoverSheetRows(snapshot), false);
    appendWorkbookSheet(wb, 'POLICY SETUP', buildExcelPolicySheetRows(snapshot), false);
    (snapshot.visibleTerms || []).forEach(k => {
      MAPEH_COMPONENTS.forEach(meta => {
        const comp = snapshot.mapeh.componentSnapshots && snapshot.mapeh.componentSnapshots[meta.key];
        if (!comp) return;
        const compSnap = Object.assign({}, comp, { recordHeader: comp.recordHeader || {}, setupProfile: comp.setupProfile || snapshot.setupProfile, terms: (snapshot.visibleTerms || []).reduce((a, termKey) => { a[termKey] = comp[termKey] || defaultTerm(termKey); return a; }, {}), visibleTerms: snapshot.visibleTerms, termSheetNames: comp.termSheetNames || {} });
        appendWorkbookSheet(wb, getMapehExcelComponentSheetName(meta.key, k), buildExcelTermSheetRows(compSnap, k), false);
      });
      appendWorkbookSheet(wb, getMapehExcelSummaryTermSheetName(k), buildExcelMapehTermSummarySheetRows(snapshot, k), false);
    });
    appendWorkbookSheet(wb, 'Summary of Grades', buildExcelMapehSummarySheetRows(snapshot), false);
    appendWorkbookSheet(wb, 'ATTENDANCE SUMMARY', buildExcelAttendanceSheetRows(snapshot), false);
    if (!wb.Workbook) wb.Workbook = {};
    const activeIndex = wb.SheetNames.indexOf('Summary of Grades');
    wb.Workbook.Views = [{ activeTab: activeIndex >= 0 ? activeIndex : 0, firstSheet: activeIndex >= 0 ? activeIndex : 0 }];
    const gradeSection = sanitizeExcelFileName(`${snapshot.recordHeader.gradeLevel || ''}-${snapshot.recordHeader.section || snapshot.recordHeader.className || state.className || ''}`).replace(/\s+/g, '');
    const sy = sanitizeExcelFileName(snapshot.recordHeader.schoolYear || 'SchoolYear').replace(/\s+/g, '');
    const filename = `ClassRecord_${gradeSection}_MAPEH_Summary_${sy}.xlsx`;
    const output = engine.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true, compression: true, bookSST: false });
    const verification = await excelVerifyWorkbookXml(output, wb);
    excelDownloadArrayBuffer(output, filename);
    return verification;
  }


  async function exportActiveClassRecordToExcel(options = {}) {
    if (shouldExportMapehConsolidatedWorkbook()) return exportMapehConsolidatedWorkbook(options);
    const engine = await ensureStyleCapableExcelEngine();
    if (!excelEngineUsable(engine)) throw new Error('missing-xlsx');
    const snapshot = options.snapshot || buildActiveClassRecordExcelSnapshot();
    const wb = engine.utils.book_new();
    const sheetOrder = [];
    sheetOrder.push(appendWorkbookSheet(wb, 'COVER', buildExcelCoverSheetRows(snapshot), false));
    sheetOrder.push(appendWorkbookSheet(wb, 'POLICY SETUP', buildExcelPolicySheetRows(snapshot), false));
    (snapshot.visibleTerms || []).forEach(k => sheetOrder.push(appendWorkbookSheet(wb, snapshot.termSheetNames[k], buildExcelTermSheetRows(snapshot, k), false)));
    sheetOrder.push(appendWorkbookSheet(wb, 'SUMMARY OF GRADES', buildExcelSummarySheetRows(snapshot), false));
    sheetOrder.push(appendWorkbookSheet(wb, 'ATTENDANCE SUMMARY', buildExcelAttendanceSheetRows(snapshot), false));
    appendWorkbookSheet(wb, '__CONFIG', buildExcelConfigRows(snapshot), true);
    appendWorkbookSheet(wb, '__TRANSMUTATION', buildExcelTransmutationRows(), true);
    appendWorkbookSheet(wb, '__DESCRIPTORS', buildExcelDescriptorRows(), true);
    const activeSheet = getExcelActiveSheetFromCurrentTab(snapshot);
    const activeIndex = wb.SheetNames.indexOf(activeSheet);
    if (!wb.Workbook) wb.Workbook = {};
    wb.Workbook.Views = [{ activeTab: activeIndex >= 0 ? activeIndex : 0, firstSheet: activeIndex >= 0 ? activeIndex : 0 }];
    const gradeSection = sanitizeExcelFileName(`${snapshot.recordHeader.gradeLevel || ''}-${snapshot.recordHeader.section || snapshot.recordHeader.className || state.className || ''}`).replace(/\s+/g, '');
    const subject = sanitizeExcelFileName(snapshot.recordHeader.subject || 'Subject').replace(/\s+/g, '');
    const sy = sanitizeExcelFileName(snapshot.recordHeader.schoolYear || 'SchoolYear').replace(/\s+/g, '');
    const filename = `ClassRecord_${gradeSection}_${subject}_${sy}.xlsx`;
    const output = engine.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true, compression: true, bookSST: false });
    const verification = await excelVerifyWorkbookXml(output, wb);
    excelDownloadArrayBuffer(output, filename);
    return verification;
  }
  async function handleViewExcelClick() {
    if (!hasExcelExportableData()) {
      flash('Nothing to view in Excel yet. Please save or encode Class Record data first.', 'warning');
      updateExcelButtonState();
      return;
    }
    const btn = $id('crBtnViewExcel');
    if (btn) btn.disabled = true;
    try {
      flash('Preparing styled Excel workbook...', 'info');
      const isMapehSummaryExport = shouldExportMapehConsolidatedWorkbook();
      const verification = isMapehSummaryExport
        ? await exportMapehConsolidatedWorkbook({ snapshot: buildMapehConsolidatedExcelSnapshot() })
        : await exportActiveClassRecordToExcel({ snapshot: buildActiveClassRecordExcelSnapshot() });
      if (verification && verification.checked && !verification.ok) {
        flash('Excel workbook generated, but XML verification found incomplete style/width records. Check the browser console for details.', 'warning');
      } else {
        flash('Excel workbook generated using mapped Class Record formatting.', 'success');
      }
    } catch (err) {
      const msg = err && (err.message === 'missing-xlsx' || err.message === 'missing-xlsx-style')
        ? 'Excel export engine is not available. Please check the XLSX/xlsx-js-style dependency.'
        : 'Unable to generate Excel workbook. Please try again.';
      flash(msg, 'error');
      try { console.error('[CTM Class Record] Excel export failed', err); } catch (_) {}
    } finally {
      updateExcelButtonState();
    }
  }

  function promptImportCsv() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.csv,text/csv'; input.addEventListener('change', () => { const file = input.files && input.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { importCsvText(String(reader.result || '')); } catch (err) { flash(err && err.message ? err.message : 'Unable to import CSV.', 'error'); } }; reader.readAsText(file); }); input.click(); }

  function bindUi() { bindTabsCollapseUi(); if (!dom.tabs) { try { dom.tabs = Array.from(document.querySelectorAll('.ctm-cr-tab')); } catch(_) { dom.tabs = []; } } $id('crBtnClose').addEventListener('click', close); dom.tabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab))); Object.keys(dom.headerInputs).forEach(k => { if (k === 'keyStage' || !dom.headerInputs[k]) return; const el = dom.headerInputs[k]; const handler = () => { if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; markHeaderSettingsDirty(); state.recordHeader[k] = (k === 'semester') ? getSemesterLabel(el.value) : (k === 'g12Sy2026System' ? normalizeG12Sy2026System(el.value) : (k === 'g12DescriptorSource' ? normalizeG12DescriptorSource(el.value) : (k === 'modifiedTerm' ? normalizeModifiedTerm(el.value) : el.value))); if (k === 'subject') state.recordHeader.subjectKey = slugify(el.value); if (k === 'subject' || k === 'subjectGroup' || k === 'gradeLevel' || k === 'schoolYear' || k === 'section') normalizeMapehHeader(state.recordHeader); if (k === 'gradeLevel' || k === 'schoolYear' || k === 'g12Sy2026System' || k === 'g12DescriptorSource' || k === 'modifiedTerm') {
      if (isLegacyGrade12Do8(state.recordHeader.gradeLevel, state.recordHeader.schoolYear)) {
        state.recordHeader.g12Sy2026System = normalizeG12Sy2026System(state.recordHeader.g12Sy2026System);
        state.recordHeader.g12DescriptorSource = normalizeG12DescriptorSource(state.recordHeader.g12DescriptorSource);
        state.recordHeader.modifiedTerm = normalizeModifiedTerm(state.recordHeader.modifiedTerm);
      }
      applySubjectGroupFilter();
      if (isLegacyGrade12SemesterLayout(state.recordHeader.gradeLevel, state.recordHeader.schoolYear) && !getSemesterLabel(state.recordHeader.semester)) state.recordHeader.semester = 'First Semester';
      if (!isLegacyGrade12SemesterLayout(state.recordHeader.gradeLevel, state.recordHeader.schoolYear)) state.recordHeader.semester = '';
    } if (k === 'semester') state.recordHeader.semester = getSemesterLabel(el.value); recompute(); render(); }; el.addEventListener('input', handler); el.addEventListener('change', handler); }); bindCustomPolicyControls(); dom.recordPicker.addEventListener('change', () => {
    if (!dom.recordPicker.value) {
      resetDraft(true);
      return;
    }
    try {
      applySnapshot(JSON.parse(localStorage.getItem(dom.recordPicker.value) || '{}'));
      loadFromHost();
      recompute();
      // Programmatic saved-record selection does not fire input/change events on shared fields.
      // Push the loaded Class Record header explicitly so SF1/SF2/SF3/SF8 modals repaint with the selected record.
      pushRecordHeaderToSharedSchoolForms('saved-record-picker');
      render();
      flash('Saved school-year record loaded and shared fields synced to SF1/SF2/SF3/SF8.', 'success');
    } catch (_) {
      flash('Unable to load selected record.', 'error');
    }
  }); $id('crBtnSave').addEventListener('click', () => { if (hasSavedClassRecordLoaded() && !state.headerEditMode && !state.headerDirty) { enableSavedHeaderEditing(); return; } persist(true, { force: true }); }); const cancelEditBtn = $id('crBtnCancelEdit'); if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => cancelSavedHeaderEditing()); $id('crBtnNew').addEventListener('click', () => triggerNewRecordReset({ showFlash: true })); $id('crBtnDelete').addEventListener('click', () => {
      const currentKey = text(state.recordHeader && state.recordHeader.recordId).trim();
      const bundleId = text(state.recordHeader && state.recordHeader.mapehBundleId).trim();
      const isSummaryBundle = !!(state.isMapehSummaryView || text(state.recordHeader && state.recordHeader.mapehMode).trim() === 'consolidated') && !!bundleId;
      const isComponentBundle = isMapehBundleCandidate(state.recordHeader) && !!bundleId;
      if (isSummaryBundle) {
        if (!window.confirm('Delete the entire MAPEH bundle, including Music and Arts and PE and Health records?')) return;
        const removed = deleteMapehBundleRecords(bundleId);
        triggerNewRecordReset({ showFlash: false });
        flash(removed ? 'Entire MAPEH bundle deleted.' : 'No saved MAPEH component records were found for this bundle.', removed ? 'success' : 'warning');
        return;
      }
      if (!currentKey) {
        triggerNewRecordReset({ showFlash: false });
        return;
      }
      if (isComponentBundle) {
        const choice = window.prompt('MAPEH Bundle Delete: Deleted pair is auto recreated after save is executed from the other paired components.\n1 = Delete paired components.\n2 = Delete entire MAPEH bundle\n0 = Cancel', '1');
        if (choice == null || choice === '0' || choice === '') return;
        if (choice === '1') {
          localStorage.removeItem(currentKey);
          localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(loadIndex(), currentKey)));
          triggerNewRecordReset({ showFlash: false });
          flash('MAPEH paired component deleted.', 'success');
          return;
        }
        if (choice === '2') {
          const removed = deleteMapehBundleRecords(bundleId);
          triggerNewRecordReset({ showFlash: false });
          flash(removed ? 'Entire MAPEH bundle deleted.' : 'No saved MAPEH component records were found for this bundle.', removed ? 'success' : 'warning');
          return;
        }
        return;
      }
      if (!window.confirm('Delete this saved school-year Class Record?')) return;
      localStorage.removeItem(currentKey);
      localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(loadIndex(), currentKey)));
      triggerNewRecordReset({ showFlash: false });
      flash('Saved school-year Class Record deleted. A fresh blank draft is ready.', 'success');
    }); if ($id('crBtnImportCsv')) $id('crBtnImportCsv').addEventListener('click', promptImportCsv); if ($id('crBtnViewExcel')) $id('crBtnViewExcel').addEventListener('click', handleViewExcelClick); if ($id('crBtnExportCsv')) $id('crBtnExportCsv').addEventListener('click', exportCsv); window.addEventListener('ctm:shared-header-sync', e => { const detail = e && e.detail; if (!detail || !detail.field) return; if ((detail.sourceId || '').indexOf('cr') === 0) return; if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; if (applySharedHeaderData(detail.data || { [detail.field]: detail.value }, { forceEmptyOnly: false, rerender: false })) { if (hasSavedClassRecordLoaded()) markHeaderSettingsDirty(); recompute(); render(); } }); window.addEventListener('ctm:shared-header-sync-all', e => { const detail = e && e.detail; if (!detail || (detail.sourceId || '').indexOf('cr') === 0) return; if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; if (applySharedHeaderData(detail.data || {}, { forceEmptyOnly: false, rerender: false })) { if (hasSavedClassRecordLoaded()) markHeaderSettingsDirty(); recompute(); render(); } }); document.addEventListener('click', onComputationDetailsClick); document.addEventListener('keydown', onComputationDetailsKeydown); document.addEventListener('click', e => { const launcher = e.target && e.target.closest && e.target.closest('#btnOpenClassRecord'); if (!launcher) return; e.preventDefault(); open(); }); }

  function hasLoadedHostClass() {
    const loadedId = text(window.currentClassId || '').trim();
    const classContentDisabled = !!($id('classContent') && $id('classContent').classList.contains('disabled'));
    const headerText = text($id('classHeader') && $id('classHeader').textContent).replace(/[\[\]]/g, '').trim().toLowerCase();
    const placeholderHeader = !headerText || headerText === 'class name';
    return !!loadedId && !classContentDisabled && !placeholderHeader;
  }

  async function open() {
    if (!hasLoadedHostClass()) {
      if (typeof window.alert === 'function') window.alert('Please load a class first.');
      return;
    }
    await ensureInjected();
    loadFromHost();
    purgeTransientPlaceholderRecords();
    if (!text(state.classId).trim()) {
      if (typeof window.alert === 'function') window.alert('Please load a class first.');
      return;
    }
    // Safety: opening Class Record now behaves like pressing New, but only inside this module.
    // Shared SF1/SF2/SF3/SF8 header values are preserved by resetDraftForNewRecord().
    triggerNewRecordReset({ showFlash: false });
    markModalShown(dom.modal);
    dom.modal.style.display = 'block';
    dom.modal.setAttribute('aria-hidden', 'false');
  }
  function close() { if (!dom.modal) return; flushAutoPersist(); markModalHidden(dom.modal); dom.modal.style.display = 'none'; dom.modal.setAttribute('aria-hidden', 'true'); }
  async function init() { await ensureInjected(); loadFromHost(); purgeTransientPlaceholderRecords(); recompute(); render(); }

  window.CTMClassRecord = { init, open, close, recomputeAll: () => { loadFromHost(); recompute(); render(); }, refreshContextFromHost: () => { loadFromHost(); recompute(); render(); }, exportCsv, importCsvText, _debugSnapshot: () => snapshot() };
  document.addEventListener('DOMContentLoaded', () => { init().catch(() => {}); });
})();

/*
How to show 'Letter' and 'Final Descriptor' columns again later.

Change the defaults in classrecord-modal.fixed.js:

DEFAULT_SHOW_SUMMARY_LETTER_COLUMN = true
DEFAULT_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN = true

Or, before opening the Class Record modal, set:

window.CTM_CLASSRECORD_SHOW_SUMMARY_LETTER_COLUMN = true;
window.CTM_CLASSRECORD_SHOW_SUMMARY_FINAL_DESCRIPTOR_COLUMN = true;

That brings the columns back without changing the underlying logic
*/

/* === Policy Setup compactness patch bootstrap v2 (UI-only; keeps logic/data untouched) === */
(function(){
  'use strict';
  if (window.__ctmCrPolicyCompactBootstrapInstalledV2) return;
  window.__ctmCrPolicyCompactBootstrapInstalledV2 = true;
  var css = "\n\n/* ===== Policy Setup compactness patch v2 (UI-only; no logic changes) ===== */\n#classRecordModal #crPanelPolicy {\n  padding-top: 0;\n}\n#classRecordModal #crPanelPolicy > .ctm-cr-panel-title {\n  margin-bottom: .48rem;\n}\n#classRecordModal #crPanelPolicy .ctm-cr-compact-cards {\n  display: grid !important;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 8px !important;\n  margin-top: 6px !important;\n  width: 100%;\n  align-items: stretch;\n}\n#classRecordModal #crPanelPolicy .ctm-cr-card {\n  min-width: 0 !important;\n  padding: .52rem .66rem !important;\n  border-radius: 11px !important;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: .18rem;\n}\n/* Top row = 2 cards across 5 columns */\n#classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(1),\n#classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(2) {\n  grid-column: span 2;\n}\n/* Wide items stay full width for readability */\n#classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(3),\n#classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(4) {\n  grid-column: 1 / -1;\n}\n/* Remaining metric cards = dense 5-column layout */\n#classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(n+5) {\n  grid-column: span 1;\n}\n#classRecordModal #crPanelPolicy .ctm-cr-mini-label {\n  font-size: .66rem !important;\n  line-height: 1.05;\n  margin: 0;\n  color: #64748b;\n}\n#classRecordModal #crPanelPolicy .ctm-cr-strong {\n  font-size: clamp(.92rem, 1.35vw, 1rem);\n  line-height: 1.12;\n  font-weight: 800;\n  margin: 0;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n#classRecordModal #crResolvedNumericMode,\n#classRecordModal #crResolvedTransition {\n  font-size: clamp(.88rem, 1.2vw, .97rem) !important;\n  line-height: 1.14;\n}\n#classRecordModal #crPanelPolicy > .ctm-cr-field {\n  margin-top: .52rem !important;\n  display: flex;\n  flex-direction: column;\n}\n#classRecordModal #crPanelPolicy > .ctm-cr-field label {\n  font-size: .72rem !important;\n  margin-bottom: 2px !important;\n}\n#classRecordModal #crPolicyNotes {\n  width: 100%;\n  min-height: 56px;\n  padding: 4px 7px !important;\n  font-size: .8rem !important;\n  line-height: 1.28;\n  resize: vertical;\n}\n/* 4 columns */\n@media (max-width: 1100px) {\n  #classRecordModal #crPanelPolicy .ctm-cr-compact-cards {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(1),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(2) {\n    grid-column: span 2;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(3),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(4) {\n    grid-column: 1 / -1;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(n+5) {\n    grid-column: span 1;\n  }\n}\n/* 3 columns */\n@media (max-width: 820px) {\n  #classRecordModal #crPanelPolicy .ctm-cr-compact-cards {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n    gap: 7px !important;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(1),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(2) {\n    grid-column: span 1;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(3),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(4) {\n    grid-column: 1 / -1;\n  }\n}\n/* 2 columns for narrow phones */\n@media (max-width: 560px) {\n  #classRecordModal #crPanelPolicy .ctm-cr-compact-cards {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 6px !important;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card {\n    padding: .48rem .56rem !important;\n    border-radius: 10px !important;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(1),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(2),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(n+5) {\n    grid-column: span 1;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(3),\n  #classRecordModal #crPanelPolicy .ctm-cr-card:nth-child(4) {\n    grid-column: 1 / -1;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-mini-label {\n    font-size: .62rem !important;\n  }\n  #classRecordModal #crPanelPolicy .ctm-cr-strong,\n  #classRecordModal #crResolvedNumericMode,\n  #classRecordModal #crResolvedTransition {\n    font-size: .89rem !important;\n    line-height: 1.14;\n  }\n  #classRecordModal #crPolicyNotes {\n    min-height: 52px;\n    font-size: .76rem !important;\n  }\n}\n";
  function install(){
    try {
      if (document.getElementById('ctm-cr-policy-compact-patch-v2')) return;
      var style = document.createElement('style');
      style.id = 'ctm-cr-policy-compact-patch-v2';
      style.textContent = css;
      (document.head || document.documentElement || document.body).appendChild(style);
    } catch(_e){}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once:true });
  } else {
    install();
  }
})();

/*
Please fully obfuscate the attached file using a NON‑HUMAN‑READABLE method.
The final output MUST contain ZERO readable English words in CSS or JavaScript.
Return to me then to download the obfuscated version with intact functionalities.

Please keep emojis 📌,🟣,✅,🔒,▴,▾,✏️,🗑️,◀,▶,•,✓,— and other emojis used as labels, buttons, separators in dropdown, temporary values and for page presentation - do not obfuscate these emojis and make them appear as-is on all devices. You may refer to previous chat named OBF classrecord-modal.js 2026-06-22

FILE PROVIDED AS ATTACHED:
 classrecord-modal.js
*/
