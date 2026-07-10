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
  const FORM_VERSION = 'CTM-CLASSRECORD-SY-2026.18.42-empty-roster-authority'; // New Record shared-header isolation fix: New clears only Class Record school year, grade level, subject group, and subject; SF1/SF2/SF3/SF8 shared header values remain untouched; New reset now also runs on every module open and after saved-record deletion // Descriptive learner pill fix: for KS1 descriptive modes, hide Complete/Needs support + IG/TG pills and keep only a full Descriptor pill; compat/data/CSV logic unchanged // Descriptive mode patch: hide entire Shared HPS / Term Setup block while keeping autosave, CSV, computation, legacy, and numeric workflows compatible // Policy Setup compact grid v2.1: first row = Resolved Mode / Table / Numeric Mode; second row = full-width Transition Rule; logic/compat unchanged // UI fix: hide Summary tab Letter / Final Descriptor columns by default for DO No. 015, s. 2026 compliance while retaining underlying data/computation // Term / Quarter compactness patch v5 restores General Description + Instructional Response to 1-column notes layout; no logic changes // Draft/New status locks Shared HPS editing; Duplicate button removed from UI/bindings; compat/data/CSV unchanged
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
  const HIDE_SUMMARY_DESC_RESPONSE_FOR_G12_THREE_TERM = true;
  const PASSING_GRADE = 75;
  const TERMS = ['term1', 'term2', 'term3', 'term4'];
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
  const fallbackHtml = "<div id=\"classRecordModal\" class=\"modal\" aria-hidden=\"true\" role=\"dialog\" aria-modal=\"true\" style=\"display:none\">\n  <div class=\"modal-content ctm-cr-modal-content\" style=\"max-width:1200px;\">\n    <div class=\"ctm-cr-topbar\">\n      <div>\n        <h3 style=\"margin:0\">Class Record</h3>\n        <div class=\"ctm-cr-subtitle\"><span id=\"crTopClassName\">No class loaded</span><span>\u2022</span><span id=\"crTopSubject\">No subject</span><span>\u2022</span><span id=\"crTopSchoolYear\">No school year</span></div>\n      </div>\n      <div class=\"ctm-cr-topbar-actions\">\n<button class=\"edit\" id=\"crBtnNew\">New Record</button>\n        <button class=\"danger\" id=\"crBtnDelete\">Delete</button>\n        <button class=\"primary\" id=\"crBtnSave\">Save</button>\n        <button class=\"edit\" id=\"crBtnCancelEdit\" hidden>Cancel Edit</button>\n        <button class=\"primary\" id=\"crBtnImportCsv\">Import CSV</button>\n        <button class=\"primary\" id=\"crBtnExportCsv\">Export CSV</button>\n        <button class=\"danger\" id=\"crBtnClose\" style=\"padding:.25rem .6rem\">\u2715</button>\n      </div>\n    </div>\n    <div class=\"ctm-cr-disclaimer\"><b>Testing Build:</b> Mobile-first Class Record with shared HPS per term, individual learner cards, full CSV import/export, and validation.</div>\n    <div class=\"ctm-cr-manager section-lite\">\n      <div class=\"ctm-cr-manager-grid\">\n        <div><label class=\"ctm-cr-label\">Saved Record</label><select id=\"crRecordPicker\"></select></div>\n        <div><label class=\"ctm-cr-label\">Record Status</label><div id=\"crRecordStatus\" class=\"ctm-cr-status-pill\">Draft / unsaved school-year record</div></div>\n        <div><label class=\"ctm-cr-label\">Policy Source</label><div class=\"ctm-cr-status-pill\">DO No. 015, s. 2026 / DO No. 8, s. 2015 (G12 SY 2026-2027)</div></div>\n      </div>\n    </div>\n    <div class=\"ctm-cr-tabs\" aria-label=\"Class Record Tabs\">\n      <div id=\"crTabsShell\" class=\"ctm-cr-tabs-shell\" role=\"tablist\" aria-label=\"Class Record Tabs\" aria-hidden=\"false\">\n      <button class=\"primary ctm-cr-tab active\" data-tab=\"header\" type=\"button\">Header Fields</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"policy\" type=\"button\">Policy Setup</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term1\" type=\"button\">Term 1</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term2\" type=\"button\">Term 2</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term3\" type=\"button\">Term 3</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"term4\" type=\"button\" style=\"display:none\">Term 4</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"final\" type=\"button\">Summary</button>\n      <button class=\"edit ctm-cr-tab\" data-tab=\"attendance\" type=\"button\">Attendance</button>\n      </div>\n      <div class=\"ctm-cr-tabs-footer\"><p class=\"ctm-cr-tabs-source\"><a href=\"https://drive.google.com/drive/folders/13APGK-OoX_g2bWqVZ9h-iGd16DCDNa5_?usp=sharing\" target=\"_blank\" rel=\"noopener noreferrer\">Source: DO No. 015, s. 2026 / DO No. 8, s. 2015</a></p></div>\n    </div>\n    <div id=\"crFlash\" class=\"ctm-cr-flash\" style=\"display:none\" aria-live=\"polite\" aria-atomic=\"true\" aria-hidden=\"true\"></div>\n    <section id=\"crPanelHeader\" class=\"ctm-cr-panel active\">\n      <div class=\"ctm-cr-panel-title\">Record Header</div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\">\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crSchoolName\">School Name</label><input id=\"crSchoolName\" placeholder=\"School Name\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSchoolYear\">School Year</label><input id=\"crSchoolYear\" placeholder=\"2026-2027\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crGradeLevel\">Grade Level</label>\n          <select id=\"crGradeLevel\"><option value=\"\">Select Grade Level</option><option>Kindergarten</option><option>Grade 1</option><option>Grade 2</option><option>Grade 3</option><option>Grade 4</option><option>Grade 5</option><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option></select>\n        </div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSection\">Class / Section</label><input id=\"crSection\" placeholder=\"Section\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSemester\">Semester</label><select id=\"crSemester\"><option value=\"\">Select Semester</option><option value=\"First Semester\">First Semester</option><option value=\"Second Semester\">Second Semester</option></select></div>\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crTeacher\">Teacher / Class Adviser</label><input id=\"crTeacher\" placeholder=\"Teacher / Class Adviser\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSchoolId\">School ID</label><input id=\"crSchoolId\" placeholder=\"School ID\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crDistrict\">District</label><input id=\"crDistrict\" placeholder=\"District\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crDivision\">Division</label><input id=\"crDivision\" placeholder=\"Division\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crRegion\">Region</label><input id=\"crRegion\" placeholder=\"Region\"></div>\n        <div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crSubjectGroup\">Subject Group</label>\n          <select id=\"crSubjectGroup\"><option value=\"\">Select Subject Group</option><option>Sensory Perceptual and Motor Development / Socio-emotional Development / Cognitive Development / Language, Literacy and Communication Development</option><option>Language / Reading and Literacy / Mathematics / GMRC / Makabansa</option><option>Filipino / English / Mathematics / GMRC / Makabansa</option><option>Filipino / English / Mathematics / Science / GMRC / Makabansa</option><option>AP / English / Filipino / Mathematics / Science / GMRC / Values</option><option>EPP / TLE / MAPEH</option><option>SHS Core / Other SHS Academic Electives</option><option>SHS Field Exposure / Arts Apprenticeship / Creative Production</option><option>SHS Arts / Sports / Health / Wellness</option><option>SHS Research Electives / Design & Innovation</option><option>SHS TechPro Electives</option><option>SHS Work Immersion</option><option>SHS Grade 12 (DO 8, s. 2015) Core Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) Academic Track Other Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) Academic Track Work Immersion / Research / Business Enterprise Simulation / Exhibit / Performance</option><option>SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Other Subjects</option><option>SHS Grade 12 (DO 8, s. 2015) TVL / Sports / Arts & Design Work Immersion / Research / Exhibit / Performance</option></select>\n        </div>\n        <div class=\"ctm-cr-field span-2\"><label class=\"ctm-cr-label\" for=\"crSubject\">Subject</label><input id=\"crSubject\" placeholder=\"Subject\"></div>\n<div class=\"ctm-cr-field\"><label class=\"ctm-cr-label\" for=\"crKeyStage\">Key Stage</label><input id=\"crKeyStage\" placeholder=\"Auto\" readonly></div>\n      </div>\n    </section>\n    <!-- Policy Setup fallback remains structurally compatible; primary layout is governed by external HTML/CSS module. -->\n    <section id=\"crPanelPolicy\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Policy Setup (Resolved)</div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Resolved Grading Mode</div><div id=\"crResolvedMode\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Resolved Table</div><div id=\"crResolvedTable\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Numeric Mode</div><div id=\"crResolvedNumericMode\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Transition Rule</div><div id=\"crResolvedTransition\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">WW Weight</div><div id=\"crWeightWW\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">PT Weight</div><div id=\"crWeightPT\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">EX Weight</div><div id=\"crWeightEX\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Has TE</div><div id=\"crHasTE\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">WW Count</div><div id=\"crCountWW\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">PT Count</div><div id=\"crCountPT\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">ST Count</div><div id=\"crCountST\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Uses Descriptors</div><div id=\"crUseDescriptors\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n      <div class=\"ctm-cr-field\" style=\"margin-top:1rem;\"><label class=\"ctm-cr-label\" for=\"crPolicyNotes\">Validation / Notes</label><textarea id=\"crPolicyNotes\" rows=\"3\" readonly></textarea></div>\n    </section>\n    <section id=\"crPanelTerm1\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm2\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm3\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelTerm4\" class=\"ctm-cr-panel\"></section>\n    <section id=\"crPanelFinal\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Summary</div>\n      <div class=\"ctm-cr-disclaimer\" style=\"margin-bottom:.75rem;\">Final Grade Summary based on the selected Grade 12 SY 2026-2027 grading system.</div>\n      <div class=\"table-scroll ctm-cr-table-scroll ctm-cr-final-scroll\" id=\"crFinalTableScroll\" aria-label=\"Scrollable class record summary table\"><table id=\"crFinalTable\" class=\"ctm-cr-table\"><thead><tr><th>#</th><th>Learner</th><th>Sex</th><th>T1</th><th>T2</th><th>T3</th><th>Remarks</th><th>Teacher Remarks</th><th>Intervention Notes</th><th>General Description</th><th>Instructional Response</th></tr></thead><tbody></tbody></table></div>\n      <div class=\"ctm-cr-grid ctm-cr-grid-4\" style=\"margin-top:.75rem;\">\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Class Average</div><div id=\"crFinalClassAverage\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Passing Count</div><div id=\"crFinalPassingCount\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Non-Passing Count</div><div id=\"crFinalNonPassingCount\" class=\"ctm-cr-strong\">\u2014</div></div>\n        <div class=\"ctm-cr-card\"><div class=\"ctm-cr-mini-label\">Table Used</div><div id=\"crFinalTableUsed\" class=\"ctm-cr-strong\">\u2014</div></div>\n      </div>\n    </section>\n    <section id=\"crPanelAttendance\" class=\"ctm-cr-panel\">\n      <div class=\"ctm-cr-panel-title\">Attendance (Read-only)</div>\n      <div class=\"ctm-cr-disclaimer\">Source: attendance / SF2 data already tracked by the app. Read-only inside Class Record.</div>\n      <div class=\"table-scroll\"><table id=\"crAttendanceTable\" class=\"ctm-cr-table\"><thead><tr><th>#</th><th>Learner</th><th>Sex</th><th>Present</th><th>Absent</th><th>Tardy</th><th>Cutting</th><th>Excuse</th><th>Pending</th></tr></thead><tbody></tbody></table></div>\n    </section>\n    <div class=\"meta\" style=\"color:#667;font-size:.85rem;margin-top:1rem;text-align:justify;\"><b>Disclaimer:</b> Generated document is not an official DepEd School Form.</div>\n  </div>\n</div>\n";

  const state = {
    classId: '', className: '', roster: [], savedRoster: [], activeLearnerId: '', activeTab: 'header', htmlInjected: false, suppressHostRosterOnce: false, connectedHostClassKey: '', hostSyncBound: false, hostSyncTimer: 0, autoSaveTimer: 0, finalSelectedLearnerId: '', isTransientDraft: true, headerEditMode: false, headerDirty: false,
    recordHeader: null, setupProfile: null, attendance: null, finalSummary: null, term1: null, term2: null, term3: null, term4: null
  };
  const dom = {};
  const TABS_COLLAPSE_STORAGE_KEY = 'ctm-classrecord-tabs-collapsed-v1';
  const TABS_COLLAPSE_DEFAULT = false;

  function defaultRecordHeader() { return { recordId: '', classId: '', className: '', schoolYear: '', schoolId: '', schoolName: '', district: '', division: '', region: '', gradeLevel: '', keyStage: '', section: '', semester: '', g12Sy2026System: 'quarterSemester', g12DescriptorSource: 'do8-2015', modifiedTerm: 'term1', teacherName: '', subject: '', subjectKey: '', subjectGroup: '', recordLabel: '', sourcePolicy: 'DO No. 015, s. 2026 / DO No. 8, s. 2015 (G12 SY 2026-2027)', customPolicyEnabled: false, gradingFramework: 'officialDepEd', customAcademicStructure: 'trimesterContinuous', customActiveTerm: 'term1', customSelectedTerms: ['term1', 'term2', 'term3'], customFinalRule: 'averageVisibleTerms', customDescriptorSource: 'do8-2015', gradeConversionMethod: 'zeroBased', transmutationTableKey: 'none' }; }
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
function examPercent(scores, hps) { const qaHps = num(hps && hps.qa1); if (qaHps != null && qaHps > 0) return (scoreAsZeroWhenBlank(scores, 'qa1') / qaHps) * 100; const shares = { st1: 0.3, st2: 0.3, te: 0.4 }; let total = 0, seen = 0; Object.keys(shares).forEach(k => { const hv = num(hps && hps[k]); if (hv != null && hv > 0) { total += (scoreAsZeroWhenBlank(scores, k) / hv) * 100 * shares[k]; seen += 1; } }); return seen ? total : null; }

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
    row.computed.letterGrade = desc.descriptorCode || '';
    row.computed.descriptorCode = desc.descriptorCode || '';
    row.computed.descriptorLabel = `${desc.descriptorLabel}`;
    if (!legacyMode || table === 'table11') {
      row.computed.generalDescription = desc.generalDescription || '';
      row.computed.instructionalResponse = desc.instructionalResponse || '';
    }
    row.computed.remarks = legacyMode ? text(desc.remarks || (displayed >= PASSING_GRADE ? 'Passed' : 'Failed')) : text(row.computed.remarks || '');
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
      out.finalResult.finalDisplayedNumeric = fg;
      out.finalResult.termGrade = fg;
      const isLegacyFinal = final.applicableTable === 'table10';
      out.finalResult.teacherNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.teacherNotes);
      out.finalResult.remarks = '';
      out.finalResult.interventionNotes = concatNotesForVisibleTerms(rowsByKey, row => row && row.computed && row.computed.interventionNotes);
      if (desc) {
        out.finalResult.letterGrade = desc.descriptorCode || '';
        out.finalResult.descriptorCode = desc.descriptorCode || '';
        out.finalResult.descriptorLabel = `${desc.descriptorLabel}`;
        if (final.applicableTable === 'table11') {
          out.finalResult.generalDescription = desc.generalDescription;
          out.finalResult.instructionalResponse = desc.instructionalResponse;
        }
      }
      if (fg != null) {
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
  function applySnapshot(payload) { initDefaults(); if (!payload || typeof payload !== 'object') return; state.headerEditMode = false; state.headerDirty = false; state.savedRoster = normalizeRoster(payload.roster || []); state.roster = clone(state.savedRoster); state.recordHeader = Object.assign(defaultRecordHeader(), clone(payload.recordHeader || {})); state.setupProfile = Object.assign(defaultSetupProfile(), clone(payload.setupProfile || {})); state.term1 = Object.assign(defaultTerm('term1'), clone(payload.term1 || {})); state.term2 = Object.assign(defaultTerm('term2'), clone(payload.term2 || {})); state.term3 = Object.assign(defaultTerm('term3'), clone(payload.term3 || {})); state.term4 = Object.assign(defaultTerm('term4'), clone(payload.term4 || {})); state.finalSummary = Object.assign(defaultFinalSummary(), clone(payload.finalSummary || {})); state.attendance = Object.assign(defaultAttendance(), clone(payload.attendance || {})); state.recordHeader.gradingFramework = normalizeGradingFramework(state.recordHeader.gradingFramework); state.recordHeader.g12DescriptorSource = normalizeG12DescriptorSource(state.recordHeader.g12DescriptorSource); state.recordHeader.customAcademicStructure = normalizeCustomAcademicStructure(state.recordHeader.customAcademicStructure); state.recordHeader.customActiveTerm = normalizeModifiedTerm(state.recordHeader.customActiveTerm); state.recordHeader.customSelectedTerms = normalizeCustomSelectedTerms(state.recordHeader.customSelectedTerms, state.recordHeader.customAcademicStructure, state.recordHeader.customActiveTerm); if (!state.recordHeader.customSelectedTerms.includes(state.recordHeader.customActiveTerm)) state.recordHeader.customActiveTerm = state.recordHeader.customSelectedTerms[0] || 'term1'; state.recordHeader.gradeConversionMethod = normalizeGradeConversionMethod(state.recordHeader.gradeConversionMethod); state.recordHeader.transmutationTableKey = normalizeTransmutationTableKey(state.recordHeader.transmutationTableKey, state.recordHeader.gradeConversionMethod); state.recordHeader.customFinalRule = normalizeCustomFinalRule(state.recordHeader.customFinalRule, state.recordHeader.customAcademicStructure); state.recordHeader.customPolicyEnabled = isCustomInstitutionalMode(state.recordHeader); state.setupProfile.customComponents = normalizeCustomComponents(state.setupProfile.customComponents); state.isTransientDraft = !text(state.recordHeader && state.recordHeader.recordId).trim(); }

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
    dom.modal = $id('classRecordModal'); dom.recordPicker = $id('crRecordPicker'); dom.cancelEditButton = $id('crBtnCancelEdit'); dom.recordStatus = $id('crRecordStatus'); dom.flash = $id('crFlash'); dom.topClassName = $id('crTopClassName'); dom.topSubject = $id('crTopSubject'); dom.topSchoolYear = $id('crTopSchoolYear'); dom.tabs = Array.from(document.querySelectorAll('.ctm-cr-tab')); dom.panels = { header:$id('crPanelHeader'), policy:$id('crPanelPolicy'), term1:$id('crPanelTerm1'), term2:$id('crPanelTerm2'), term3:$id('crPanelTerm3'), term4:$id('crPanelTerm4'), final:$id('crPanelFinal'), attendance:$id('crPanelAttendance') }; dom.headerInputs = { schoolName:$id('crSchoolName'), schoolYear:$id('crSchoolYear'), gradeLevel:$id('crGradeLevel'), section:$id('crSection'), semester:$id('crSemester'), teacherName:$id('crTeacher'), schoolId:$id('crSchoolId'), district:$id('crDistrict'), division:$id('crDivision'), region:$id('crRegion'), subjectGroup:$id('crSubjectGroup'), subject:$id('crSubject'), recordLabel:$id('crRecordLabel'), g12Sy2026System:$id('crG12Sy2026System'), g12DescriptorSource:$id('crG12DescriptorSource'), modifiedTerm:$id('crModifiedTerm'), gradingFramework:$id('crGradingFramework'), customAcademicStructure:$id('crCustomAcademicStructure'), customActiveTerm:$id('crCustomActiveTerm'), customFinalRule:$id('crCustomFinalRule'), gradeConversionMethod:$id('crGradeConversionMethod'), transmutationTableKey:$id('crTransmutationTableKey'), keyStage:$id('crKeyStage') }; dom.policy = { mode:$id('crResolvedMode'), table:$id('crResolvedTable'), numericMode:$id('crResolvedNumericMode'), transition:$id('crResolvedTransition'), ww:$id('crWeightWW'), pt:$id('crWeightPT'), ex:$id('crWeightEX'), hasTE:$id('crHasTE'), countWW:$id('crCountWW'), countPT:$id('crCountPT'), countST:$id('crCountST'), useDescriptors:$id('crUseDescriptors'), notes:$id('crPolicyNotes') }; dom.finalTable = $id('crFinalTable'); dom.finalBody = document.querySelector('#crFinalTable tbody'); dom.attBody = document.querySelector('#crAttendanceTable tbody'); dom.finalClassAverage = $id('crFinalClassAverage'); dom.finalPassingCount = $id('crFinalPassingCount'); dom.finalNonPassingCount = $id('crFinalNonPassingCount'); dom.finalTableUsed = $id('crFinalTableUsed'); dom.tabsFooter = dom.modal ? dom.modal.querySelector('.ctm-cr-tabs-footer') : null; } ensureActiveTabHighlightStyle(); (dom.tabs || []).forEach(btn => { if (!btn.hasAttribute('role')) btn.setAttribute('role', 'tab'); if (!btn.hasAttribute('aria-selected')) btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false'); if (!btn.hasAttribute('data-active')) btn.setAttribute('data-active', btn.classList.contains('active') ? 'true' : 'false'); });

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
  return !!(target && target.closest && target.closest('button, a, input, select, textarea, label, option, [role="button"], [data-nav], [data-term-picker], [data-pick-learner]'));
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
    return `<div class="ctm-cr-field ctm-cr-term-mini-field${hpsLocked ? ' ctm-cr-hps-draft-locked' : ''}"><label class="ctm-cr-label" for="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" title="${esc(field.label)} Highest Possible Score">${field.label} HPS</label><input id="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" name="cr-${esc(termKey)}-hps-${esc(field.group)}-${esc(field.key)}" data-term="${termKey}" data-hps-group="${field.group}" data-hps-key="${field.key}" inputmode="decimal" aria-label="${esc(field.label)} highest possible score" value="${esc(value)}" placeholder="HPS"${lockedAttrs}></div>`;
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
    return `<div class="ctm-cr-field ctm-cr-term-mini-field${disabledClass}"><label class="ctm-cr-label" for="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" title="${esc(titleText)}">${esc(labelText)}</label><input id="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" name="cr-${esc(termKey)}-score-${esc(field.group)}-${esc(field.key)}-${esc(slugify(learner.learnerId))}" class="${bad ? 'ctm-cr-cell-bad' : ''}" data-term="${termKey}" data-score-group="${field.group}" data-score-key="${field.key}" data-learner-id="${esc(learner.learnerId)}" inputmode="decimal" aria-label="${esc(hpsEnabled ? `${field.label} learner score` : `${field.label} learner score disabled because HPS is blank`)}" value="${esc(sv == null ? '' : sv)}" placeholder="${placeholder}"${disabledAttrs}></div>`;
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

  function summaryDescriptorText(result) {
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
    const gradeText = compact ? '' : resultGradeDisplayText(result, { fallbackValue: '' });
    const remarksText = compact ? '' : achievementMeterRemarksText(result, tableKey, activeCode);
    const showGradeChip = !!gradeText && gradeText !== '—' && gradeText !== displayName;
    const chipBits = [];
    if (showGradeChip) chipBits.push(`<span class="ctm-cr-achievement-chip"><span class="ctm-cr-achievement-chip-label">Grade</span><span class="ctm-cr-achievement-chip-value">${esc(gradeText)}</span></span>`);
    if (remarksText) chipBits.push(`<span class="ctm-cr-achievement-chip"><span class="ctm-cr-achievement-chip-label">Remarks</span><span class="ctm-cr-achievement-chip-value">${esc(remarksText)}</span></span>`);
    const chipsHtml = chipBits.length ? `<div class="ctm-cr-achievement-chip-row">${chipBits.join('')}</div>` : '';
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
  const learnerInfoHtml = learner
    ? `${hasNumeric ? `<div class="ctm-cr-pill-list" style="margin-bottom:.65rem;">${learnerStatusBadge(learner, term)}</div>` : ''}${learnerAchievementHtml}`
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
        
        ${learner ? `<div class="ctm-cr-nav" style="margin-top:.65rem;"><button class="edit" type="button" data-nav="prev" data-term="${termKey}" ${navIdx <= 1 ? 'disabled' : ''}>◀</button><div class="ctm-cr-nav-center"><div class="ctm-cr-field ctm-cr-term-mini-field ctm-cr-learner-picker-inline" style="margin:0 0 .35rem 0;"><select id="cr-${esc(termKey)}-learner-picker" name="cr-${esc(termKey)}-learner-picker" class="ctm-cr-picker-emphasis" style="width:100%;text-align:center;text-align-last:center;font-size:1.02rem;font-weight:700;" data-term-picker="${termKey}" aria-label="${esc(term.termLabel)} learner picker">${learnerEntries.map(entry => { const r = entry.row; return `<option value="${esc(r.learnerId)}" ${learner && r.learnerId === learner.learnerId ? 'selected' : ''}>${entry.displayNo}. ${esc(r.name)} (${esc(r.sex)})</option>`; }).join('')}</select></div><div class="ctm-cr-small">Learner ${idx} of ${learnerCount} • ${esc(learner.sex)}${learner.lrn ? ` • ${esc(learner.lrn)}` : ''}</div></div><button class="edit" type="button" data-nav="next" data-term="${termKey}" ${navIdx >= learnerCount ? 'disabled' : ''}>▶</button></div>${learnerInfoHtml}${learnerAttendanceSummaryHtml(learner, termKey)}<div class="ctm-cr-form-grid ctm-cr-term-entry-grid" style="margin-top:.75rem;">${hasNumeric ? scoreHtml : descriptorHtml}</div>${notesHtml}<div class="ctm-cr-actions" style="margin-top:.85rem;"><button class="edit" type="button" data-term-action="clear-active" data-term-key="${termKey}" data-active-learner="${esc(learner.learnerId)}">Clear Active Learner</button><button class="danger" type="button" data-term-action="clear-all-scores" data-term-key="${termKey}">Clear All ${hasNumeric ? 'Scores' : 'Descriptors'}</button></div>` : '<div class="ctm-cr-disclaimer" style="margin-top:.75rem;">No learners available.</div>'}
      </div>
    </div>`;
  bindTermPanel(termKey);
}
  function sanitizeScoreInput(term, row, group, key, rawValue) { const hv = num(term.hps[group][key]); if (!(hv != null && hv > 0)) { row.scores[group][key] = null; return; } let sv = num(rawValue); if (sv == null) { row.scores[group][key] = null; return; } if (sv < 0) sv = 0; if (sv > hv) { flash(`${key.toUpperCase()} score exceeds HPS for ${row.name}.`, 'error'); sv = hv; } row.scores[group][key] = sv; }

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
  panel.querySelectorAll('[data-hps-key]').forEach(el => el.addEventListener('change', () => { if (isDraftNewSchoolYearRecord()) { flash('HPS fields are disabled while this is a Draft / New school-year record. Save or select a saved school-year record first.', 'warning'); render(); switchTab(termKey); return; } const term = state[termKey]; const value = num(el.value); term.hps[el.dataset.hpsGroup][el.dataset.hpsKey] = value != null && value < 0 ? 0 : value; recompute(); render(); switchTab(termKey); persist(false); }));
  panel.querySelectorAll('[data-score-key]').forEach(el => el.addEventListener('change', () => { const row = learnerRow(termKey, el.dataset.learnerId), term = state[termKey]; if (!row || !term) return; sanitizeScoreInput(term, row, el.dataset.scoreGroup, el.dataset.scoreKey, el.value); computeLearnerTerm(row, term); recomputeFinal(); render(); switchTab(termKey); persist(false); }));
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
    const detailFields = [
      `<div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-final-teacher-notes-readonly">Teacher Remarks</label><textarea id="cr-final-teacher-notes-readonly" name="cr-final-teacher-notes-readonly" rows="2" readonly>${esc(selected.finalResult.teacherNotes || '')}</textarea></div>`,
      `<div class="ctm-cr-field"><label class="ctm-cr-label" for="cr-final-intervention-notes-readonly">Intervention Notes</label><textarea id="cr-final-intervention-notes-readonly" name="cr-final-intervention-notes-readonly" rows="2" readonly>${esc(selected.finalResult.interventionNotes || '')}</textarea></div>`
    ];

    selectedSummaryHtml = `<div class="ctm-cr-summary-selected-row row-count-${row1Cards.length}">${row1Cards.join('')}</div>${selectedAchievementHtml}${attendanceSummaryCard ? `<div class="ctm-cr-summary-detail-grid" style="margin-top:.85rem;">${attendanceSummaryCard}</div>` : ''}<div class="ctm-cr-summary-detail-grid" style="margin-top:.85rem;">${detailFields.join('')}</div>`;
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
  function render() { cacheDom(); updateHeaderFields(); renderPolicy(); applyTermVisibility(); TERMS.forEach(termKey => { if (dom.panels[termKey]) buildTermPanel(termKey); }); renderFinal(); renderAttendance(); renderRecordPicker(); updateSaveEditButton(); setStatus(); }
  function recompute() { state.recordHeader.keyStage = getKeyStage(state.recordHeader.gradeLevel); state.recordHeader.subjectGroup = coerceSubjectGroupForContext(state.recordHeader.subjectGroup, state.recordHeader.gradeLevel, state.recordHeader.schoolYear); if (dom.headerInputs && dom.headerInputs.subjectGroup && text(dom.headerInputs.subjectGroup.value).trim() !== text(state.recordHeader.subjectGroup).trim()) dom.headerInputs.subjectGroup.value = state.recordHeader.subjectGroup || ''; state.setupProfile = resolvePolicy(); hydrateTerms(); recomputeFinal(); buildAttendanceRows(); }
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
  function promptImportCsv() { const input = document.createElement('input'); input.type = 'file'; input.accept = '.csv,text/csv'; input.addEventListener('change', () => { const file = input.files && input.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { importCsvText(String(reader.result || '')); } catch (err) { flash(err && err.message ? err.message : 'Unable to import CSV.', 'error'); } }; reader.readAsText(file); }); input.click(); }

  function bindUi() { bindTabsCollapseUi(); if (!dom.tabs) { try { dom.tabs = Array.from(document.querySelectorAll('.ctm-cr-tab')); } catch(_) { dom.tabs = []; } } $id('crBtnClose').addEventListener('click', close); dom.tabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab))); Object.keys(dom.headerInputs).forEach(k => { if (k === 'keyStage' || !dom.headerInputs[k]) return; const el = dom.headerInputs[k]; const handler = () => { if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; markHeaderSettingsDirty(); state.recordHeader[k] = (k === 'semester') ? getSemesterLabel(el.value) : (k === 'g12Sy2026System' ? normalizeG12Sy2026System(el.value) : (k === 'g12DescriptorSource' ? normalizeG12DescriptorSource(el.value) : (k === 'modifiedTerm' ? normalizeModifiedTerm(el.value) : el.value))); if (k === 'subject') state.recordHeader.subjectKey = slugify(el.value); if (k === 'gradeLevel' || k === 'schoolYear' || k === 'g12Sy2026System' || k === 'g12DescriptorSource' || k === 'modifiedTerm') {
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
  }); $id('crBtnSave').addEventListener('click', () => { if (hasSavedClassRecordLoaded() && !state.headerEditMode && !state.headerDirty) { enableSavedHeaderEditing(); return; } persist(true, { force: true }); }); const cancelEditBtn = $id('crBtnCancelEdit'); if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => cancelSavedHeaderEditing()); $id('crBtnNew').addEventListener('click', () => triggerNewRecordReset({ showFlash: true })); $id('crBtnDelete').addEventListener('click', () => { const key = state.recordHeader.recordId; if (!key) { triggerNewRecordReset({ showFlash: false }); return; } if (!window.confirm('Delete this saved school-year Class Record?')) return; localStorage.removeItem(key); localStorage.setItem(indexKey(), JSON.stringify(cleanIndexList(loadIndex(), key))); triggerNewRecordReset({ showFlash: false }); flash('Saved school-year Class Record deleted. A fresh blank draft is ready.', 'success'); }); $id('crBtnImportCsv').addEventListener('click', promptImportCsv); $id('crBtnExportCsv').addEventListener('click', exportCsv); window.addEventListener('ctm:shared-header-sync', e => { const detail = e && e.detail; if (!detail || !detail.field) return; if ((detail.sourceId || '').indexOf('cr') === 0) return; if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; if (applySharedHeaderData(detail.data || { [detail.field]: detail.value }, { forceEmptyOnly: false, rerender: false })) { if (hasSavedClassRecordLoaded()) markHeaderSettingsDirty(); recompute(); render(); } }); window.addEventListener('ctm:shared-header-sync-all', e => { const detail = e && e.detail; if (!detail || (detail.sourceId || '').indexOf('cr') === 0) return; if (hasSavedClassRecordLoaded() && !canEditHeaderSettings()) return; if (applySharedHeaderData(detail.data || {}, { forceEmptyOnly: false, rerender: false })) { if (hasSavedClassRecordLoaded()) markHeaderSettingsDirty(); recompute(); render(); } }); document.addEventListener('click', e => { const launcher = e.target && e.target.closest && e.target.closest('#btnOpenClassRecord'); if (!launcher) return; e.preventDefault(); open(); }); }

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
