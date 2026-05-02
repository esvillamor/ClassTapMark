/* =======================================================================
   SF2 Export PDF — ClassTapMark (OFFLINE, pdf-lib)
   - FIX 1: Uses global lexical `currentClassId` (index.html declares `let currentClassId`)
   - FIX 2: WinAnsi-safe text conversion to avoid encoding errors (e.g., ←  →)
   - Geometry strictly from CellRef_Template.xlsx (ColWidth + RowHeigth + cellAddress)
   - No overlap: per-cell clipping + deterministic wrap/truncate rules
   - Fillable PDF: header/meta + remarks + summary (minimal), optional fullCells
   - Pagination: ALWAYS >= 3 pages (A + B + C), C always last
   ======================================================================= */

// ------------------------- Template payload (SOURCE OF TRUTH) -------------------------
// Shape: { cols:[wA..wAK], rows:[h1..h129], cells:[[range,text,notes,border,align,style,fontSize,wrapFlag], ...] }
const SF2_TEMPLATE = {"cols":[2.56,33.0,13.33,3.22,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,3.89,7.67,6.78,8.22,8.22,8.22,8.22,8.22,8.22],"rows":[14.4,28.2,15.6,31.2,3.0,31.2,3.6,15.6,15.6,16.2,0.0,22.2,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,21.9,6.8,20.3,15.0,15.6,15.8,15.8,15.8,18.0,14.3,15.8,19.5,15.6,16.5,15.8,15.8,16.5,14.3,15.8,15.8,14.3,15.0,15.8,14.3,13.8,13.8,16.5,14.4,13.8,14.3,14.3,14.3,14.4],"cells":[

["A2:AK2","School Form 2 (SF2) Daily Attendance Report of Learners","","No border","Center","Bold",14.0,0],
["B4","School ID","","No border","Right","Normal",12.0,0],
["C4:F4","","\"from modal school id\"","Outside borders","Center","Normal",14.0,0],
["H4:N4","School Year","","No border","Right","Normal",12.0,0],
["L4:P4","","\"from modal school year\"","Outside borders","Center","Normal",14.0,0],
["V4:AE4","Report for the Month of","","No border","Right","Normal",12.0,0],
["AF4:AK4","","\"entered by the user at monthly SF2\"","Outside borders","Center","Normal",14.0,0],
["B6","Name of School","","No border","Right","Normal",12.0,0],
["C6:P6","","\"from modal name of school\"","Outside borders","Center","Normal",14.0,0],
["U6:X6","Grade Level","","No border","Right","Normal",12.0,0],
["Y6:Z6","","\"from modal grade level\"","Outside borders","Center","Normal",14.0,0],
["AB6:AE6","Section","","No border","Right","Normal",12.0,0],
["AD6:AI6","","\"from modal section\"","Outside borders","Center","Normal",14.0,0],

["A8:A10","#","","Outside borders","Center","Normal",8.0,0],
["D8:D10","S","","Outside borders","Center","Normal",8.0,0],
["E8:AC8","(Date header)","","Outside borders","Center","Normal",8.0,0],
["AD8:AE9","Total","","Outside borders","Center","Normal",8.0,0],

["E9","","","Outside borders","Center","Normal",6.0,0],
["F9","","","Outside borders","Center","Normal",6.0,0],
["G9","","","Outside borders","Center","Normal",6.0,0],
["H9","","","Outside borders","Center","Normal",6.0,0],
["I9","","","Outside borders","Center","Normal",6.0,0],
["J9","","","Outside borders","Center","Normal",6.0,0],
["K9","","","Outside borders","Center","Normal",6.0,0],
["L9","","","Outside borders","Center","Normal",6.0,0],
["M9","","","Outside borders","Center","Normal",6.0,0],
["N9","","","Outside borders","Center","Normal",6.0,0],
["O9","","","Outside borders","Center","Normal",6.0,0],
["P9","","","Outside borders","Center","Normal",6.0,0],
["Q9","","","Outside borders","Center","Normal",6.0,0],
["R9","","","Outside borders","Center","Normal",6.0,0],
["S9","","","Outside borders","Center","Normal",6.0,0],
["T9","","","Outside borders","Center","Normal",6.0,0],
["U9","","","Outside borders","Center","Normal",6.0,0],
["V9","","","Outside borders","Center","Normal",6.0,0],
["W9","","","Outside borders","Center","Normal",6.0,0],
["X9","","","Outside borders","Center","Normal",6.0,0],
["Y9","","","Outside borders","Center","Normal",6.0,0],
["Z9","","","Outside borders","Center","Normal",6.0,0],
["AA9","","","Outside borders","Center","Normal",6.0,0],
["AB9","","","Outside borders","Center","Normal",6.0,0],
["AC9","","","Outside borders","Center","Normal",6.0,0],

["E10","","","Outside borders","Center","Normal",6.0,0],
["F10","","","Outside borders","Center","Normal",6.0,0],
["G10","","","Outside borders","Center","Normal",6.0,0],
["H10","","","Outside borders","Center","Normal",6.0,0],
["I10","","","Outside borders","Center","Normal",6.0,0],
["J10","","","Outside borders","Center","Normal",6.0,0],
["K10","","","Outside borders","Center","Normal",6.0,0],
["L10","","","Outside borders","Center","Normal",6.0,0],
["M10","","","Outside borders","Center","Normal",6.0,0],
["N10","","","Outside borders","Center","Normal",6.0,0],
["O10","","","Outside borders","Center","Normal",6.0,0],
["P10","","","Outside borders","Center","Normal",6.0,0],
["Q10","","","Outside borders","Center","Normal",6.0,0],
["R10","","","Outside borders","Center","Normal",6.0,0],
["S10","","","Outside borders","Center","Normal",6.0,0],
["T10","","","Outside borders","Center","Normal",6.0,0],
["U10","","","Outside borders","Center","Normal",6.0,0],
["V10","","","Outside borders","Center","Normal",6.0,0],
["W10","","","Outside borders","Center","Normal",6.0,0],
["X10","","","Outside borders","Center","Normal",6.0,0],
["Y10","","","Outside borders","Center","Normal",6.0,0],
["Z10","","","Outside borders","Center","Normal",6.0,0],
["AA10","","","Outside borders","Center","Normal",6.0,0],
["AB10","","","Outside borders","Center","Normal",6.0,0],
["AC10","","","Outside borders","Center","Normal",6.0,0],

["AD10","X","","Outside borders","Center","Normal",8.0,0],["AE10","T","","Outside borders","Center","Normal",8.0,0],["A12","","","Outside borders","General","Normal",11.0,0],["B12","","","Partial border","General","Normal",12.0,0],["C12","","","Partial border","General","Normal",12.0,0],["D12","","","Outside borders","Center","Normal",11.0,0],["E12","","","Outside borders","Center","Normal",12.0,0],["F12","","","Outside borders","Center","Normal",12.0,0],["G12","","","Outside borders","Center","Normal",12.0,0],["H12","","","Outside borders","Center","Normal",12.0,0],["I12","","","Outside borders","Center","Normal",12.0,0],["J12","","","Outside borders","Center","Normal",12.0,0],["K12","","","Outside borders","Center","Normal",12.0,0],["L12","","","Outside borders","Center","Normal",12.0,0],["M12","","","Outside borders","Center","Normal",12.0,0],["N12","","","Outside borders","Center","Normal",12.0,0],["O12","","","Outside borders","Center","Normal",12.0,0],["P12","","","Outside borders","Center","Normal",12.0,0],["Q12","","","Outside borders","Center","Normal",12.0,0],["R12","","","Outside borders","Center","Normal",12.0,0],["S12","","","Outside borders","Left","Normal",12.0,0],["T12","","","Outside borders","Center","Normal",12.0,0],["U12","","","Outside borders","Center","Normal",12.0,0],["V12","","","Outside borders","Center","Normal",12.0,0],["W12","","","Outside borders","Center","Normal",12.0,0],["X12","","","Outside borders","Center","Normal",12.0,0],["Y12","","","Outside borders","Center","Normal",12.0,0],["Z12","","","Outside borders","Center","Normal",12.0,0],["AA12","","","Outside borders","Center","Normal",12.0,0],["AB12","","","Outside borders","Center","Normal",12.0,0],["AC12","","","Outside borders","Center","Normal",12.0,0],["AD12","","","Outside borders","Center","Normal",12.0,0],["AE12","","","Outside borders","Center","Normal",12.0,0],["AF12:AK12","","","Partial border","General","Normal",11.0,0],["A13","","","Outside borders","General","Normal",11.0,0],["B13","","","Partial border","Left","Normal",12.0,0],["C13","","","Partial border","General","Normal",12.0,0],["D13","","","Outside borders","Center","Normal",11.0,0],["E13","","","Outside borders","Center","Normal",12.0,0],["F13","","","Outside borders","Center","Normal",12.0,0],["G13","","","Outside borders","Center","Normal",12.0,0],["H13","","","Outside borders","Center","Normal",12.0,0],["I13","","","Outside borders","Center","Normal",12.0,0],["J13","","","Outside borders","Center","Normal",12.0,0],["K13","","","Outside borders","Center","Normal",12.0,0],["L13","","","Outside borders","Center","Normal",12.0,0],["M13","","","Outside borders","Center","Normal",12.0,0],["N13","","","Outside borders","Center","Normal",12.0,0],["O13","","","Outside borders","Right","Normal",12.0,0],["P13","","","Outside borders","Center","Normal",12.0,0],["Q13","","","Outside borders","Center","Normal",12.0,0],["R13","","","Outside borders","Left","Normal",12.0,0],["S13","","","Outside borders","Center","Normal",12.0,0],["T13","","","Outside borders","Center","Normal",12.0,0],["U13","","","Outside borders","Center","Normal",12.0,0],["V13","","","Outside borders","Center","Normal",12.0,0],["W13","","","Outside borders","Center","Normal",12.0,0],["X13","","","Outside borders","Center","Normal",12.0,0],["Y13","","","Outside borders","Center","Normal",12.0,0],["Z13","","","Outside borders","Center","Normal",12.0,0],["AA13","","","Outside borders","Center","Normal",12.0,0],["AB13","","","Outside borders","Center","Normal",12.0,0],["AC13","","","Outside borders","Center","Normal",12.0,0],["AD13","","","Outside borders","Center","Normal",12.0,0],["AE13","","","Outside borders","Center","Normal",12.0,0],["AF13:AK13","","","Partial border","General","Normal",11.0,0],["A14","","","Outside borders","General","Normal",11.0,0],["B14","","","Partial border","Left","Normal",12.0,0],["C14","","","Partial border","General","Normal",12.0,0],["D14","","","Outside borders","Center","Normal",11.0,0],["E14","","","Outside borders","Center","Normal",12.0,0],["F14","","","Outside borders","Center","Normal",12.0,0],["G14","","","Outside borders","Center","Normal",12.0,0],["H14","","","Outside borders","Center","Normal",12.0,0],["I14","","","Outside borders","Center","Normal",12.0,0],["J14","","","Outside borders","Center","Normal",12.0,0],["K14","","","Outside borders","Center","Normal",12.0,0],["L14","","","Outside borders","Center","Normal",12.0,0],["M14","","","Outside borders","Center","Normal",12.0,0],["N14","","","Outside borders","Center","Normal",12.0,0],["O14","","","Outside borders","Center","Normal",12.0,0],["P14","","","Outside borders","Center","Normal",12.0,0],["Q14","","","Outside borders","Center","Normal",12.0,0],["R14","","","Outside borders","Center","Normal",12.0,0],["S14","","","Outside borders","Center","Normal",12.0,0],["T14","","","Outside borders","Center","Normal",12.0,0],["U14","","","Outside borders","Center","Normal",12.0,0],["V14","","","Outside borders","Center","Normal",12.0,0],["W14","","","Outside borders","Center","Normal",12.0,0],["X14","","","Outside borders","Center","Normal",12.0,0],["Y14","","","Outside borders","Center","Normal",12.0,0],["Z14","","","Outside borders","Center","Normal",12.0,0],["AA14","","","Outside borders","Center","Normal",12.0,0],["AB14","","","Outside borders","Center","Normal",12.0,0],["AC14","","","Outside borders","Center","Normal",12.0,0],["AD14","","","Outside borders","Center","Normal",12.0,0],["AE14","","","Outside borders","Center","Normal",12.0,0],["AF14:AK14","","","Partial border","General","Normal",11.0,0],["A15","","","Outside borders","General","Normal",11.0,0],["B15","","","Partial border","Left","Normal",12.0,0],["C15","","","Partial border","General","Normal",12.0,0],["D15","","","Outside borders","Center","Normal",11.0,0],["E15","","","Outside borders","Center","Normal",12.0,0],["F15","","","Outside borders","Center","Normal",12.0,0],["G15","","","Outside borders","Center","Normal",12.0,0],["H15","","","Outside borders","Center","Normal",12.0,0],["I15","","","Outside borders","Center","Normal",12.0,0],["J15","","","Outside borders","Center","Normal",12.0,0],["K15","","","Outside borders","Center","Normal",12.0,0],["L15","","","Outside borders","Center","Normal",12.0,0],["M15","","","Outside borders","Center","Normal",12.0,0],["N15","","","Outside borders","Center","Normal",12.0,0],["O15","","","Outside borders","Center","Normal",12.0,0],["P15","","","Outside borders","Center","Normal",12.0,0],["Q15","","","Outside borders","Center","Normal",12.0,0],["R15","","","Outside borders","Center","Normal",12.0,0],["S15","","","Outside borders","Center","Normal",12.0,0],["T15","","","Outside borders","Center","Normal",12.0,0],["U15","","","Outside borders","Center","Normal",12.0,0],["V15","","","Outside borders","Center","Normal",12.0,0],["W15","","","Outside borders","Center","Normal",12.0,0],["X15","","","Outside borders","Center","Normal",12.0,0],["Y15","","","Outside borders","Center","Normal",12.0,0],["Z15","","","Outside borders","Center","Normal",12.0,0],["AA15","","","Outside borders","Center","Normal",12.0,0],["AB15","","","Outside borders","Center","Normal",12.0,0],["AC15","","","Outside borders","Center","Normal",12.0,0],["AD15","","","Outside borders","Center","Normal",12.0,0],["AE15","","","Outside borders","Center","Normal",12.0,0],["AF15:AK15","","","Partial border","General","Normal",11.0,0],["A16","","","Outside borders","General","Normal",11.0,0],["B16","","","Partial border","Left","Normal",12.0,0],["C16","","","Partial border","General","Normal",12.0,0],["D16","","","Outside borders","Center","Normal",11.0,0],["E16","","","Outside borders","Center","Normal",12.0,0],["F16","","","Outside borders","Center","Normal",12.0,0],["G16","","","Outside borders","Center","Normal",12.0,0],["H16","","","Outside borders","Center","Normal",12.0,0],["I16","","","Outside borders","Center","Normal",12.0,0],["J16","","","Outside borders","Center","Normal",12.0,0],["K16","","","Outside borders","Center","Normal",12.0,0],["L16","","","Outside borders","Center","Normal",12.0,0],["M16","","","Outside borders","Center","Normal",12.0,0],["N16","","","Outside borders","Center","Normal",12.0,0],["O16","","","Outside borders","Center","Normal",12.0,0],["P16","","","Outside borders","Center","Normal",12.0,0],["Q16","","","Outside borders","Center","Normal",12.0,0],["R16","","","Outside borders","Center","Normal",12.0,0],["S16","","","Outside borders","Center","Normal",12.0,0],["T16","","","Outside borders","Center","Normal",12.0,0],["U16","","","Outside borders","Center","Normal",12.0,0],["V16","","","Outside borders","Center","Normal",12.0,0],["W16","","","Outside borders","Center","Normal",12.0,0],["X16","","","Outside borders","Center","Normal",12.0,0],["Y16","","","Outside borders","Center","Normal",12.0,0],["Z16","","","Outside borders","Center","Normal",12.0,0],["AA16","","","Outside borders","Center","Normal",12.0,0],["AB16","","","Outside borders","Center","Normal",12.0,0],["AC16","","","Outside borders","Center","Normal",12.0,0],["AD16","","","Outside borders","Center","Normal",12.0,0],["AE16","","","Outside borders","Center","Normal",12.0,0],["AF16:AK16","","","Partial border","General","Normal",11.0,0],["A17","","","Outside borders","General","Normal",11.0,0],["B17","","","Partial border","Left","Normal",12.0,0],["C17","","","Partial border","General","Normal",12.0,0],["D17","","","Outside borders","Center","Normal",11.0,0],["E17","","","Outside borders","Center","Normal",12.0,0],["F17","","","Outside borders","Center","Normal",12.0,0],["G17","","","Outside borders","Center","Normal",12.0,0],["H17","","","Outside borders","Center","Normal",12.0,0],["I17","","","Outside borders","Center","Normal",12.0,0],["J17","","","Outside borders","Center","Normal",12.0,0],["K17","","","Outside borders","Center","Normal",12.0,0],["L17","","","Outside borders","Center","Normal",12.0,0],["M17","","","Outside borders","Center","Normal",12.0,0],["N17","","","Outside borders","Center","Normal",12.0,0],["O17","","","Outside borders","Center","Normal",12.0,0],["P17","","","Outside borders","Center","Normal",12.0,0],["Q17","","","Outside borders","Center","Normal",12.0,0],["R17","","","Outside borders","Center","Normal",12.0,0],["S17","","","Outside borders","Center","Normal",12.0,0],["T17","","","Outside borders","Center","Normal",12.0,0],["U17","","","Outside borders","Center","Normal",12.0,0],["V17","","","Outside borders","Center","Normal",12.0,0],["W17","","","Outside borders","Center","Normal",12.0,0],["X17","","","Outside borders","Center","Normal",12.0,0],["Y17","","","Outside borders","Center","Normal",12.0,0],["Z17","","","Outside borders","Center","Normal",12.0,0],["AA17","","","Outside borders","Center","Normal",12.0,0],["AB17","","","Outside borders","Center","Normal",12.0,0],["AC17","","","Outside borders","Center","Normal",12.0,0],["AD17","","","Outside borders","Center","Normal",12.0,0],["AE17","","","Outside borders","Center","Normal",12.0,0],["AF17:AK17","","","Partial border","General","Normal",11.0,0],["A18","","","Outside borders","General","Normal",11.0,0],["B18","","","Partial border","Left","Normal",12.0,0],["C18","","","Partial border","General","Normal",12.0,0],["D18","","","Outside borders","Center","Normal",11.0,0],["E18","","","Outside borders","Center","Normal",12.0,0],["F18","","","Outside borders","Center","Normal",12.0,0],["G18","","","Outside borders","Center","Normal",12.0,0],["H18","","","Outside borders","Center","Normal",12.0,0],["I18","","","Outside borders","Center","Normal",12.0,0],["J18","","","Outside borders","Center","Normal",12.0,0],["K18","","","Outside borders","Center","Normal",12.0,0],["L18","","","Outside borders","Center","Normal",12.0,0],["M18","","","Outside borders","Center","Normal",12.0,0],["N18","","","Outside borders","Center","Normal",12.0,0],["O18","","","Outside borders","Center","Normal",12.0,0],["P18","","","Outside borders","Center","Normal",12.0,0],["Q18","","","Outside borders","Center","Normal",12.0,0],["R18","","","Outside borders","Center","Normal",12.0,0],["S18","","","Outside borders","Center","Normal",12.0,0],["T18","","","Outside borders","Center","Normal",12.0,0],["U18","","","Outside borders","Center","Normal",12.0,0],["V18","","","Outside borders","Center","Normal",12.0,0],["W18","","","Outside borders","Center","Normal",12.0,0],["X18","","","Outside borders","Center","Normal",12.0,0],["Y18","","","Outside borders","Center","Normal",12.0,0],["Z18","","","Outside borders","Center","Normal",12.0,0],["AA18","","","Outside borders","Center","Normal",12.0,0],["AB18","","","Outside borders","Center","Normal",12.0,0],["AC18","","","Outside borders","Center","Normal",12.0,0],["AD18","","","Outside borders","Center","Normal",12.0,0],["AE18","","","Outside borders","Center","Normal",12.0,0],["AF18:AK18","","","Partial border","General","Normal",11.0,0],["A19","","","Outside borders","General","Normal",11.0,0],["B19","","","Partial border","Left","Normal",12.0,0],["C19","","","Partial border","General","Normal",12.0,0],["D19","","","Outside borders","Center","Normal",11.0,0],["E19","","","Outside borders","Center","Normal",12.0,0],["F19","","","Outside borders","Center","Normal",12.0,0],["G19","","","Outside borders","Right","Normal",12.0,0],["H19","","","Outside borders","Right","Normal",12.0,0],["I19","","","Outside borders","Right","Normal",12.0,0],["J19","","","Outside borders","Right","Normal",12.0,0],["K19","","","Outside borders","Right","Normal",12.0,0],["L19","","","Outside borders","Right","Normal",12.0,0],["M19","","","Outside borders","Right","Normal",12.0,0],["N19","","","Outside borders","Right","Normal",12.0,0],["O19","","","Outside borders","Center","Normal",12.0,0],["P19","","","Outside borders","Center","Normal",12.0,0],["Q19","","","Outside borders","Center","Normal",12.0,0],["R19","","","Outside borders","Center","Normal",12.0,0],["S19","","","Outside borders","Center","Normal",12.0,0],["T19","","","Outside borders","Center","Normal",12.0,0],["U19","","","Outside borders","Center","Normal",12.0,0],["V19","","","Outside borders","Center","Normal",12.0,0],["W19","","","Outside borders","Center","Normal",12.0,0],["X19","","","Outside borders","Center","Normal",12.0,0],["Y19","","","Outside borders","Center","Normal",12.0,0],["Z19","","","Outside borders","Center","Normal",12.0,0],["AA19","","","Outside borders","Center","Normal",12.0,0],["AB19","","","Outside borders","Center","Normal",12.0,0],["AC19","","","Outside borders","Center","Normal",12.0,0],["AD19","","","Outside borders","Center","Normal",12.0,0],["AE19","","","Outside borders","Center","Normal",12.0,0],["AF19:AK19","","","Partial border","General","Normal",11.0,0],["A20","","","Outside borders","General","Normal",11.0,0],["B20","","","Partial border","General","Normal",12.0,0],["C20","","","Partial border","General","Normal",12.0,0],["D20","","","Outside borders","Center","Normal",11.0,0],["E20","","","Outside borders","Center","Normal",12.0,0],["F20","","","Outside borders","Center","Normal",12.0,0],["G20","","","Outside borders","Center","Normal",12.0,0],["H20","","","Outside borders","Center","Normal",12.0,0],["I20","","","Outside borders","Center","Normal",12.0,0],["J20","","","Outside borders","Center","Normal",12.0,0],["K20","","","Outside borders","Center","Normal",12.0,0],["L20","","","Outside borders","Center","Normal",12.0,0],["M20","","","Outside borders","Center","Normal",12.0,0],["N20","","","Outside borders","Center","Normal",12.0,0],["O20","","","Outside borders","Center","Normal",12.0,0],["P20","","","Outside borders","Center","Normal",12.0,0],["Q20","","","Outside borders","Center","Normal",12.0,0],["R20","","","Outside borders","Center","Normal",12.0,0],["S20","","","Outside borders","Center","Normal",12.0,0],["T20","","","Outside borders","Center","Normal",12.0,0],["U20","","","Outside borders","Center","Normal",12.0,0],["V20","","","Outside borders","Center","Normal",12.0,0],["W20","","","Outside borders","Center","Normal",12.0,0],["X20","","","Outside borders","Center","Normal",12.0,0],["Y20","","","Outside borders","Center","Normal",12.0,0],["Z20","","","Outside borders","Center","Normal",12.0,0],["AA20","","","Outside borders","Center","Normal",12.0,0],["AB20","","","Outside borders","Center","Normal",12.0,0],["AC20","","","Outside borders","Center","Normal",12.0,0],["AD20","","","Outside borders","Center","Normal",12.0,0],["AE20","","","Outside borders","Center","Normal",12.0,0],["AF20:AK20","","","Partial border","General","Normal",11.0,0],["A21","","","Outside borders","General","Normal",11.0,0],["B21","","","Partial border","Left","Normal",12.0,0],["C21","","","Partial border","General","Normal",12.0,0],["D21","","","Outside borders","Center","Normal",11.0,0],["E21","","","Outside borders","Center","Normal",12.0,0],["F21","","","Outside borders","Center","Normal",12.0,0],["G21","","","Outside borders","Center","Normal",12.0,0],["H21","","","Outside borders","Center","Normal",12.0,0],["I21","","","Outside borders","Center","Normal",12.0,0],["J21","","","Outside borders","Center","Normal",12.0,0],["K21","","","Outside borders","Center","Normal",12.0,0],["L21","","","Outside borders","Center","Normal",12.0,0],["M21","","","Outside borders","Center","Normal",12.0,0],["N21","","","Outside borders","Center","Normal",12.0,0],["O21","","","Outside borders","Center","Normal",12.0,0],["P21","","","Outside borders","Center","Normal",12.0,0],["Q21","","","Outside borders","Center","Normal",12.0,0],["R21","","","Outside borders","Center","Normal",12.0,0],["S21","","","Outside borders","Center","Normal",12.0,0],["T21","","","Outside borders","Center","Normal",12.0,0],["U21","","","Outside borders","Center","Normal",12.0,0],["V21","","","Outside borders","Center","Normal",12.0,0],["W21","","","Outside borders","Center","Normal",12.0,0],["X21","","","Outside borders","Center","Normal",12.0,0],["Y21","","","Outside borders","Center","Normal",12.0,0],["Z21","","","Outside borders","Center","Normal",12.0,0],["AA21","","","Outside borders","Center","Normal",12.0,0],["AB21","","","Outside borders","Center","Normal",12.0,0],["AC21","","","Outside borders","Center","Normal",12.0,0],["AD21","","","Outside borders","Center","Normal",12.0,0],["AE21","","","Outside borders","Center","Normal",12.0,0],["AF21:AK21","","","Partial border","General","Normal",11.0,0],["A22","","","Outside borders","General","Normal",11.0,0],["B22","","","Partial border","Left","Normal",12.0,0],["C22","","","Partial border","General","Normal",12.0,0],["D22","","","Outside borders","Center","Normal",11.0,0],["E22","","","Outside borders","Center","Normal",12.0,0],["F22","","","Outside borders","Center","Normal",12.0,0],["G22","","","Outside borders","Center","Normal",12.0,0],["H22","","","Outside borders","Center","Normal",12.0,0],["I22","","","Outside borders","Center","Normal",12.0,0],["J22","","","Outside borders","Center","Normal",12.0,0],["K22","","","Outside borders","Center","Normal",12.0,0],["L22","","","Outside borders","Center","Normal",12.0,0],["M22","","","Outside borders","Center","Normal",12.0,0],["N22","","","Outside borders","Center","Normal",12.0,0],["O22","","","Outside borders","Center","Normal",12.0,0],["P22","","","Outside borders","Center","Normal",12.0,0],["Q22","","","Outside borders","Center","Normal",12.0,0],["R22","","","Outside borders","Center","Normal",12.0,0],["S22","","","Outside borders","Center","Normal",12.0,0],["T22","","","Outside borders","Center","Normal",12.0,0],["U22","","","Outside borders","Center","Normal",12.0,0],["V22","","","Outside borders","Center","Normal",12.0,0],["W22","","","Outside borders","Center","Normal",12.0,0],["X22","","","Outside borders","Center","Normal",12.0,0],["Y22","","","Outside borders","Center","Normal",12.0,0],["Z22","","","Outside borders","Center","Normal",12.0,0],["AA22","","","Outside borders","Center","Normal",12.0,0],["AB22","","","Outside borders","Center","Normal",12.0,0],["AC22","","","Outside borders","Center","Normal",12.0,0],["AD22","","","Outside borders","Center","Normal",12.0,0],["AE22","","","Outside borders","Center","Normal",12.0,0],["AF22:AK22","","","Partial border","General","Normal",11.0,0],["A23","","","Outside borders","General","Normal",11.0,0],["B23","","","Partial border","General","Normal",12.0,0],["C23","","","Partial border","General","Normal",12.0,0],["D23","","","Outside borders","Center","Normal",11.0,0],["E23","","","Outside borders","Center","Normal",12.0,0],["F23","","","Outside borders","Center","Normal",12.0,0],["G23","","","Outside borders","Left","Normal",12.0,0],["H23","","","Outside borders","Left","Normal",12.0,0],["I23","","","Outside borders","Left","Normal",12.0,0],["J23","","","Outside borders","Left","Normal",12.0,0],["K23","","","Outside borders","Left","Normal",12.0,0],["L23","","","Outside borders","Left","Normal",12.0,0],["M23","","","Outside borders","Left","Normal",12.0,0],["N23","","","Outside borders","Left","Normal",12.0,0],["O23","","","Outside borders","Center","Normal",12.0,0],["P23","","","Outside borders","Center","Normal",12.0,0],["Q23","","","Outside borders","Center","Normal",12.0,0],["R23","","","Outside borders","Center","Normal",12.0,0],["S23","","","Outside borders","Center","Normal",12.0,0],["T23","","","Outside borders","Center","Normal",12.0,0],["U23","","","Outside borders","Center","Normal",12.0,0],["V23","","","Outside borders","Center","Normal",12.0,0],["W23","","","Outside borders","Center","Normal",12.0,0],["X23","","","Outside borders","Center","Normal",12.0,0],["Y23","","","Outside borders","Center","Normal",12.0,0],["Z23","","","Outside borders","Center","Normal",12.0,0],["AA23","","","Outside borders","Center","Normal",12.0,0],["AB23","","","Outside borders","Center","Normal",12.0,0],["AC23","","","Outside borders","Center","Normal",12.0,0],["AD23","","","Outside borders","Center","Normal",12.0,0],["AE23","","","Outside borders","Center","Normal",12.0,0],["AF23:AK23","","","Partial border","General","Normal",11.0,0],["A24","","","Outside borders","General","Normal",11.0,0],["B24","","","Partial border","Left","Normal",12.0,0],["C24","","","Partial border","General","Normal",12.0,0],["D24","","","Outside borders","Center","Normal",11.0,0],["E24","","","Outside borders","Center","Normal",12.0,0],["F24","","","Outside borders","Center","Normal",12.0,0],["G24","","","Outside borders","Center","Normal",12.0,0],["H24","","","Outside borders","Center","Normal",12.0,0],["I24","","","Outside borders","Center","Normal",12.0,0],["J24","","","Outside borders","Center","Normal",12.0,0],["K24","","","Outside borders","Center","Normal",12.0,0],["L24","","","Outside borders","Center","Normal",12.0,0],["M24","","","Outside borders","Center","Normal",12.0,0],["N24","","","Outside borders","Center","Normal",12.0,0],["O24","","","Outside borders","Center","Normal",12.0,0],["P24","","","Outside borders","Center","Normal",12.0,0],["Q24","","","Outside borders","Center","Normal",12.0,0],["R24","","","Outside borders","Center","Normal",12.0,0],["S24","","","Outside borders","Center","Normal",12.0,0],["T24","","","Outside borders","Center","Normal",12.0,0],["U24","","","Outside borders","Center","Normal",12.0,0],["V24","","","Outside borders","Center","Normal",12.0,0],["W24","","","Outside borders","Center","Normal",12.0,0],["X24","","","Outside borders","Center","Normal",12.0,0],["Y24","","","Outside borders","Center","Normal",12.0,0],["Z24","","","Outside borders","Center","Normal",12.0,0],["AA24","","","Outside borders","Center","Normal",12.0,0],["AB24","","","Outside borders","Center","Normal",12.0,0],["AC24","","","Outside borders","Center","Normal",12.0,0],["AD24","","","Outside borders","Center","Normal",12.0,0],["AE24","","","Outside borders","Center","Normal",12.0,0],["AF24:AK24","","","Partial border","General","Normal",11.0,0],["A25","","","Outside borders","General","Normal",11.0,0],["B25","","","Partial border","Left","Normal",12.0,0],["C25","","","Partial border","General","Normal",12.0,0],["D25","","","Outside borders","Center","Normal",11.0,0],["E25","","","Outside borders","Center","Normal",12.0,0],["F25","","","Outside borders","Center","Normal",12.0,0],["G25","","","Outside borders","Center","Normal",12.0,0],["H25","","","Outside borders","Center","Normal",12.0,0],["I25","","","Outside borders","Center","Normal",12.0,0],["J25","","","Outside borders","Center","Normal",12.0,0],["K25","","","Outside borders","Center","Normal",12.0,0],["L25","","","Outside borders","Center","Normal",12.0,0],["M25","","","Outside borders","Center","Normal",12.0,0],["N25","","","Outside borders","Center","Normal",12.0,0],["O25","","","Outside borders","Center","Normal",12.0,0],["P25","","","Outside borders","Center","Normal",12.0,0],["Q25","","","Outside borders","Center","Normal",12.0,0],["R25","","","Outside borders","Center","Normal",12.0,0],["S25","","","Outside borders","Center","Normal",12.0,0],["T25","","","Outside borders","Center","Normal",12.0,0],["U25","","","Outside borders","Center","Normal",12.0,0],["V25","","","Outside borders","Center","Normal",12.0,0],["W25","","","Outside borders","Center","Normal",12.0,0],["X25","","","Outside borders","Center","Normal",12.0,0],["Y25","","","Outside borders","Center","Normal",12.0,0],["Z25","","","Outside borders","Center","Normal",12.0,0],["AA25","","","Outside borders","Center","Normal",12.0,0],["AB25","","","Outside borders","Center","Normal",12.0,0],["AC25","","","Outside borders","Center","Normal",12.0,0],["AD25","","","Outside borders","Center","Normal",12.0,0],["AE25","","","Outside borders","Center","Normal",12.0,0],["AF25:AK25","","","Partial border","General","Normal",11.0,0],["A26","","","Outside borders","General","Normal",11.0,0],["B26","","","Partial border","General","Normal",12.0,0],["C26","","","Partial border","General","Normal",12.0,0],["D26","","","Outside borders","Center","Normal",11.0,0],["E26","","","Outside borders","Center","Normal",12.0,0],["F26","","","Outside borders","Center","Normal",12.0,0],["G26","","","Outside borders","Center","Normal",12.0,0],["H26","","","Outside borders","Center","Normal",12.0,0],["I26","","","Outside borders","Center","Normal",12.0,0],["J26","","","Outside borders","Center","Normal",12.0,0],["K26","","","Outside borders","Center","Normal",12.0,0],["L26","","","Outside borders","Center","Normal",12.0,0],["M26","","","Outside borders","Center","Normal",12.0,0],["N26","","","Outside borders","Center","Normal",12.0,0],["O26","","","Outside borders","Center","Normal",12.0,0],["P26","","","Outside borders","Center","Normal",12.0,0],["Q26","","","Outside borders","Center","Normal",12.0,0],["R26","","","Outside borders","Center","Normal",12.0,0],["S26","","","Outside borders","Center","Normal",12.0,0],["T26","","","Outside borders","Center","Normal",12.0,0],["U26","","","Outside borders","Center","Normal",12.0,0],["V26","","","Outside borders","Center","Normal",12.0,0],["W26","","","Outside borders","Center","Normal",12.0,0],["X26","","","Outside borders","Center","Normal",12.0,0],["Y26","","","Outside borders","Center","Normal",12.0,0],["Z26","","","Outside borders","Center","Normal",12.0,0],["AA26","","","Outside borders","Center","Normal",12.0,0],["AB26","","","Outside borders","Center","Normal",12.0,0],["AC26","","","Outside borders","Center","Normal",12.0,0],["AD26","","","Outside borders","Center","Normal",12.0,0],["AE26","","","Outside borders","Center","Normal",12.0,0],["AF26:AK26","","","Partial border","General","Normal",11.0,0],["A27","","","Outside borders","General","Normal",11.0,0],["B27","","","Partial border","General","Normal",12.0,0],["C27","","","Partial border","General","Normal",12.0,0],["D27","","","Outside borders","Center","Normal",11.0,0],["E27","","","Outside borders","Center","Normal",12.0,0],["F27","","","Outside borders","Center","Normal",12.0,0],["G27","","","Outside borders","Center","Normal",12.0,0],["H27","","","Outside borders","Center","Normal",12.0,0],["I27","","","Outside borders","Center","Normal",12.0,0],["J27","","","Outside borders","Center","Normal",12.0,0],["K27","","","Outside borders","Center","Normal",12.0,0],["L27","","","Outside borders","Center","Normal",12.0,0],["M27","","","Outside borders","Center","Normal",12.0,0],["N27","","","Outside borders","Center","Normal",12.0,0],["O27","","","Outside borders","Center","Normal",12.0,0],["P27","","","Outside borders","Center","Normal",12.0,0],["Q27","","","Outside borders","Center","Normal",12.0,0],["R27","","","Outside borders","Center","Normal",12.0,0],["S27","","","Outside borders","Center","Normal",12.0,0],["T27","","","Outside borders","Center","Normal",12.0,0],["U27","","","Outside borders","Center","Normal",12.0,0],["V27","","","Outside borders","Center","Normal",12.0,0],["W27","","","Outside borders","Center","Normal",12.0,0],["X27","","","Outside borders","Center","Normal",12.0,0],["Y27","","","Outside borders","Center","Normal",12.0,0],["Z27","","","Outside borders","Center","Normal",12.0,0],["AA27","","","Outside borders","Center","Normal",12.0,0],["AB27","","","Outside borders","Center","Normal",12.0,0],["AC27","","","Outside borders","Center","Normal",12.0,0],["AD27","","","Outside borders","Center","Normal",12.0,0],["AE27","","","Outside borders","Center","Normal",12.0,0],["AF27:AK27","","","Partial border","General","Normal",11.0,0],["A28","","","Outside borders","General","Normal",11.0,0],["B28","","","Partial border","General","Normal",12.0,0],["C28","","","Partial border","General","Normal",12.0,0],["D28","","","Outside borders","Center","Normal",11.0,0],["E28","","","Outside borders","Center","Normal",12.0,0],["F28","","","Outside borders","Center","Normal",12.0,0],["G28","","","Outside borders","Center","Normal",12.0,0],["H28","","","Outside borders","Center","Normal",12.0,0],["I28","","","Outside borders","Center","Normal",12.0,0],["J28","","","Outside borders","Center","Normal",12.0,0],["K28","","","Outside borders","Center","Normal",12.0,0],["L28","","","Outside borders","Center","Normal",12.0,0],["M28","","","Outside borders","Center","Normal",12.0,0],["N28","","","Outside borders","Center","Normal",12.0,0],["O28","","","Outside borders","Center","Normal",12.0,0],["P28","","","Outside borders","Center","Normal",12.0,0],["Q28","","","Outside borders","Center","Normal",12.0,0],["R28","","","Outside borders","Center","Normal",12.0,0],["S28","","","Outside borders","Center","Normal",12.0,0],["T28","","","Outside borders","Center","Normal",12.0,0],["U28","","","Outside borders","Center","Normal",12.0,0],["V28","","","Outside borders","Center","Normal",12.0,0],["W28","","","Outside borders","Center","Normal",12.0,0],["X28","","","Outside borders","Center","Normal",12.0,0],["Y28","","","Outside borders","Center","Normal",12.0,0],["Z28","","","Outside borders","Center","Normal",12.0,0],["AA28","","","Outside borders","Center","Normal",12.0,0],["AB28","","","Outside borders","Center","Normal",12.0,0],["AC28","","","Outside borders","Center","Normal",12.0,0],["AD28","","","Outside borders","Center","Normal",12.0,0],["AE28","","","Outside borders","Center","Normal",12.0,0],["AF28:AK28","","","Partial border","General","Normal",11.0,0],["A29","","","Outside borders","General","Normal",11.0,0],["B29","","","Partial border","General","Normal",12.0,0],["C29","","","Partial border","General","Normal",12.0,0],["D29","","","Outside borders","Center","Normal",11.0,0],["E29","","","Outside borders","Center","Normal",12.0,0],["F29","","","Outside borders","Center","Normal",12.0,0],["G29","","","Outside borders","Center","Normal",12.0,0],["H29","","","Outside borders","Center","Normal",12.0,0],["I29","","","Outside borders","Center","Normal",12.0,0],["J29","","","Outside borders","Center","Normal",12.0,0],["K29","","","Outside borders","Center","Normal",12.0,0],["L29","","","Outside borders","Center","Normal",12.0,0],["M29","","","Outside borders","Center","Normal",12.0,0],["N29","","","Outside borders","Center","Normal",12.0,0],["O29","","","Outside borders","Center","Normal",12.0,0],["P29","","","Outside borders","Center","Normal",12.0,0],["Q29","","","Outside borders","Center","Normal",12.0,0],["R29","","","Outside borders","Center","Normal",12.0,0],["S29","","","Outside borders","Center","Normal",12.0,0],["T29","","","Outside borders","Center","Normal",12.0,0],["U29","","","Outside borders","Center","Normal",12.0,0],["V29","","","Outside borders","Center","Normal",12.0,0],["W29","","","Outside borders","Center","Normal",12.0,0],["X29","","","Outside borders","Center","Normal",12.0,0],["Y29","","","Outside borders","Center","Normal",12.0,0],["Z29","","","Outside borders","Center","Normal",12.0,0],["AA29","","","Outside borders","Center","Normal",12.0,0],["AB29","","","Outside borders","Center","Normal",12.0,0],["AC29","","","Outside borders","Center","Normal",12.0,0],["AD29","","","Outside borders","Center","Normal",12.0,0],["AE29","","","Outside borders","Center","Normal",12.0,0],["AF29:AK29","","","Partial border","General","Normal",11.0,0],["A30","","","Outside borders","General","Normal",11.0,0],["B30","","","Partial border","Left","Normal",12.0,0],["C30","","","Partial border","General","Normal",12.0,0],["D30","","","Outside borders","Center","Normal",11.0,0],["E30","","","Outside borders","Center","Normal",12.0,0],["F30","","","Outside borders","Center","Normal",12.0,0],["G30","","","Outside borders","Center","Normal",12.0,0],["H30","","","Outside borders","Center","Normal",12.0,0],["I30","","","Outside borders","Center","Normal",12.0,0],["J30","","","Outside borders","Center","Normal",12.0,0],["K30","","","Outside borders","Center","Normal",12.0,0],["L30","","","Outside borders","Center","Normal",12.0,0],["M30","","","Outside borders","Center","Normal",12.0,0],["N30","","","Outside borders","Center","Normal",12.0,0],["O30","","","Outside borders","Center","Normal",12.0,0],["P30","","","Outside borders","Center","Normal",12.0,0],["Q30","","","Outside borders","Center","Normal",12.0,0],["R30","","","Outside borders","Center","Normal",12.0,0],["S30","","","Outside borders","Center","Normal",12.0,0],["T30","","","Outside borders","Center","Normal",12.0,0],["U30","","","Outside borders","Center","Normal",12.0,0],["V30","","","Outside borders","Center","Normal",12.0,0],["W30","","","Outside borders","Center","Normal",12.0,0],["X30","","","Outside borders","Center","Normal",12.0,0],["Y30","","","Outside borders","Center","Normal",12.0,0],["Z30","","","Outside borders","Center","Normal",12.0,0],["AA30","","","Outside borders","Center","Normal",12.0,0],["AB30","","","Outside borders","Center","Normal",12.0,0],["AC30","","","Outside borders","Center","Normal",12.0,0],["AD30","","","Outside borders","Center","Normal",12.0,0],["AE30","","","Outside borders","Center","Normal",12.0,0],["AF30:AK30","","","Partial border","General","Normal",11.0,0],["A31","","","Outside borders","General","Normal",11.0,0],["B31","","","Partial border","General","Normal",12.0,0],["C31","","","Partial border","General","Normal",12.0,0],["D31","","","Outside borders","Center","Normal",11.0,0],["E31","","","Outside borders","Center","Normal",12.0,0],["F31","","","Outside borders","Center","Normal",12.0,0],["G31","","","Outside borders","Center","Normal",12.0,0],["H31","","","Outside borders","Center","Normal",12.0,0],["I31","","","Outside borders","Center","Normal",12.0,0],["J31","","","Outside borders","Center","Normal",12.0,0],["K31","","","Outside borders","Center","Normal",12.0,0],["L31","","","Outside borders","Center","Normal",12.0,0],["M31","","","Outside borders","Center","Normal",12.0,0],["N31","","","Outside borders","Center","Normal",12.0,0],["O31","","","Outside borders","Center","Normal",12.0,0],["P31","","","Outside borders","Center","Normal",12.0,0],["Q31","","","Outside borders","Center","Normal",12.0,0],["R31","","","Outside borders","Center","Normal",12.0,0],["S31","","","Outside borders","Center","Normal",12.0,0],["T31","","","Outside borders","Center","Normal",12.0,0],["U31","","","Outside borders","Center","Normal",12.0,0],["V31","","","Outside borders","Center","Normal",12.0,0],["W31","","","Outside borders","Center","Normal",12.0,0],["X31","","","Outside borders","Center","Normal",12.0,0],["Y31","","","Outside borders","Center","Normal",12.0,0],["Z31","","","Outside borders","Center","Normal",12.0,0],["AA31","","","Outside borders","Center","Normal",12.0,0],["AB31","","","Outside borders","Center","Normal",12.0,0],["AC31","","","Outside borders","Center","Normal",12.0,0],["AD31","","","Outside borders","Center","Normal",12.0,0],["AE31","","","Outside borders","Center","Normal",12.0,0],["AF31:AK31","","","Partial border","General","Normal",11.0,0],["A32","","","Outside borders","General","Normal",11.0,0],["B32","","","Partial border","Left","Normal",12.0,0],["C32","","","Partial border","General","Normal",12.0,0],["D32","","","Outside borders","Center","Normal",11.0,0],["E32","","","Outside borders","Center","Normal",12.0,0],["F32","","","Outside borders","Center","Normal",12.0,0],["G32","","","Outside borders","Center","Normal",12.0,0],["H32","","","Outside borders","Center","Normal",12.0,0],["I32","","","Outside borders","Center","Normal",12.0,0],["J32","","","Outside borders","Center","Normal",12.0,0],["K32","","","Outside borders","Center","Normal",12.0,0],["L32","","","Outside borders","Center","Normal",12.0,0],["M32","","","Outside borders","Center","Normal",12.0,0],["N32","","","Outside borders","Center","Normal",12.0,0],["O32","","","Outside borders","Center","Normal",12.0,0],["P32","","","Outside borders","Center","Normal",12.0,0],["Q32","","","Outside borders","Center","Normal",12.0,0],["R32","","","Outside borders","Center","Normal",12.0,0],["S32","","","Outside borders","Center","Normal",12.0,0],["T32","","","Outside borders","Center","Normal",12.0,0],["U32","","","Outside borders","Center","Normal",12.0,0],["V32","","","Outside borders","Center","Normal",12.0,0],["W32","","","Outside borders","Center","Normal",12.0,0],["X32","","","Outside borders","Center","Normal",12.0,0],["Y32","","","Outside borders","Center","Normal",12.0,0],["Z32","","","Outside borders","Center","Normal",12.0,0],["AA32","","","Outside borders","Center","Normal",12.0,0],["AB32","","","Outside borders","Center","Normal",12.0,0],["AC32","","","Outside borders","Center","Normal",12.0,0],["AD32","","","Outside borders","Center","Normal",12.0,0],["AE32","","","Outside borders","Center","Normal",12.0,0],["AF32:AK32","","","Partial border","General","Normal",11.0,0],["A33","","","Outside borders","General","Normal",11.0,0],["B33","","","Partial border","General","Normal",12.0,0],["C33","","","Partial border","General","Normal",12.0,0],["D33","","","Outside borders","Center","Normal",11.0,0],["E33","","","Outside borders","Center","Normal",12.0,0],["F33","","","Outside borders","Center","Normal",12.0,0],["G33","","","Outside borders","Center","Normal",12.0,0],["H33","","","Outside borders","Center","Normal",12.0,0],["I33","","","Outside borders","Center","Normal",12.0,0],["J33","","","Outside borders","Center","Normal",12.0,0],["K33","","","Outside borders","Center","Normal",12.0,0],["L33","","","Outside borders","Center","Normal",12.0,0],["M33","","","Outside borders","Center","Normal",12.0,0],["N33","","","Outside borders","Center","Normal",12.0,0],["O33","","","Outside borders","Center","Normal",12.0,0],["P33","","","Outside borders","Center","Normal",12.0,0],["Q33","","","Outside borders","Center","Normal",12.0,0],["R33","","","Outside borders","Center","Normal",12.0,0],["S33","","","Outside borders","Center","Normal",12.0,0],["T33","","","Outside borders","Center","Normal",12.0,0],["U33","","","Outside borders","Center","Normal",12.0,0],["V33","","","Outside borders","Center","Normal",12.0,0],["W33","","","Outside borders","Center","Normal",12.0,0],["X33","","","Outside borders","Center","Normal",12.0,0],["Y33","","","Outside borders","Center","Normal",12.0,0],["Z33","","","Outside borders","Center","Normal",12.0,0],["AA33","","","Outside borders","Center","Normal",12.0,0],["AB33","","","Outside borders","Center","Normal",12.0,0],["AC33","","","Outside borders","Center","Normal",12.0,0],["AD33","","","Outside borders","Center","Normal",12.0,0],["AE33","","","Outside borders","Center","Normal",12.0,0],["AF33:AK33","","","Partial border","General","Normal",11.0,0],["A34","","","Outside borders","General","Normal",11.0,0],["B34","","","Partial border","Left","Normal",12.0,0],["C34","","","Partial border","General","Normal",12.0,0],["D34","","","Outside borders","Center","Normal",11.0,0],["E34","","","Outside borders","Center","Normal",12.0,0],["F34","","","Outside borders","Center","Normal",12.0,0],["G34","","","Outside borders","Center","Normal",12.0,0],["H34","","","Outside borders","Center","Normal",12.0,0],["I34","","","Outside borders","Center","Normal",12.0,0],["J34","","","Outside borders","Center","Normal",12.0,0],["K34","","","Outside borders","Center","Normal",12.0,0],["L34","","","Outside borders","Center","Normal",12.0,0],["M34","","","Outside borders","Center","Normal",12.0,0],["N34","","","Outside borders","Center","Normal",12.0,0],["O34","","","Outside borders","Center","Normal",12.0,0],["P34","","","Outside borders","Center","Normal",12.0,0],["Q34","","","Outside borders","Center","Normal",12.0,0],["R34","","","Outside borders","Center","Normal",12.0,0],["S34","","","Outside borders","Center","Normal",12.0,0],["T34","","","Outside borders","Center","Normal",12.0,0],["U34","","","Outside borders","Center","Normal",12.0,0],["V34","","","Outside borders","Center","Normal",12.0,0],["W34","","","Outside borders","Center","Normal",12.0,0],["X34","","","Outside borders","Center","Normal",12.0,0],["Y34","","","Outside borders","Center","Normal",12.0,0],["Z34","","","Outside borders","Center","Normal",12.0,0],["AA34","","","Outside borders","Center","Normal",12.0,0],["AB34","","","Outside borders","Center","Normal",12.0,0],["AC34","","","Outside borders","Center","Normal",12.0,0],["AD34","","","Outside borders","Center","Normal",12.0,0],["AE34","","","Outside borders","Center","Normal",12.0,0],["AF34:AK34","","","Partial border","General","Normal",11.0,0],["A35","","","Outside borders","General","Normal",11.0,0],["B35","","","Partial border","General","Normal",12.0,0],["C35","","","Partial border","General","Normal",12.0,0],["D35","","","Outside borders","Center","Normal",11.0,0],["E35","","","Outside borders","Center","Normal",12.0,0],["F35","","","Outside borders","Center","Normal",12.0,0],["G35","","","Outside borders","Center","Normal",12.0,0],["H35","","","Outside borders","Center","Normal",12.0,0],["I35","","","Outside borders","Center","Normal",12.0,0],["J35","","","Outside borders","Center","Normal",12.0,0],["K35","","","Outside borders","Center","Normal",12.0,0],["L35","","","Outside borders","Center","Normal",12.0,0],["M35","","","Outside borders","Center","Normal",12.0,0],["N35","","","Outside borders","Center","Normal",12.0,0],["O35","","","Outside borders","Center","Normal",12.0,0],["P35","","","Outside borders","Center","Normal",12.0,0],["Q35","","","Outside borders","Center","Normal",12.0,0],["R35","","","Outside borders","Center","Normal",12.0,0],["S35","","","Outside borders","Center","Normal",12.0,0],["T35","","","Outside borders","Center","Normal",12.0,0],["U35","","","Outside borders","Center","Normal",12.0,0],["V35","","","Outside borders","Center","Normal",12.0,0],["W35","","","Outside borders","Center","Normal",12.0,0],["X35","","","Outside borders","Center","Normal",12.0,0],["Y35","","","Outside borders","Center","Normal",12.0,0],["Z35","","","Outside borders","Center","Normal",12.0,0],["AA35","","","Outside borders","Center","Normal",12.0,0],["AB35","","","Outside borders","Center","Normal",12.0,0],["AC35","","","Outside borders","Center","Normal",12.0,0],["AD35","","","Outside borders","Center","Normal",12.0,0],["AE35","","","Outside borders","Center","Normal",12.0,0],["AF35:AK35","","","Partial border","General","Normal",11.0,0],["A36","","","Outside borders","General","Normal",11.0,0],["B36","","","Partial border","Left","Normal",12.0,0],["C36","","","Partial border","General","Normal",12.0,0],["D36","","","Outside borders","Center","Normal",11.0,0],["E36","","","Outside borders","Center","Normal",12.0,0],["F36","","","Outside borders","Center","Normal",12.0,0],["G36","","","Outside borders","Center","Normal",12.0,0],["H36","","","Outside borders","Center","Normal",12.0,0],["I36","","","Outside borders","Center","Normal",12.0,0],["J36","","","Outside borders","Center","Normal",12.0,0],["K36","","","Outside borders","Center","Normal",12.0,0],["L36","","","Outside borders","Center","Normal",12.0,0],["M36","","","Outside borders","Center","Normal",12.0,0],["N36","","","Outside borders","Center","Normal",12.0,0],["O36","","","Outside borders","Center","Normal",12.0,0],["P36","","","Outside borders","Center","Normal",12.0,0],["Q36","","","Outside borders","Center","Normal",12.0,0],["R36","","","Outside borders","Center","Normal",12.0,0],["S36","","","Outside borders","Center","Normal",12.0,0],["T36","","","Outside borders","Center","Normal",12.0,0],["U36","","","Outside borders","Center","Normal",12.0,0],["V36","","","Outside borders","Center","Normal",12.0,0],["W36","","","Outside borders","Center","Normal",12.0,0],["X36","","","Outside borders","Center","Normal",12.0,0],["Y36","","","Outside borders","Center","Normal",12.0,0],["Z36","","","Outside borders","Center","Normal",12.0,0],["AA36","","","Outside borders","Center","Normal",12.0,0],["AB36","","","Outside borders","Center","Normal",12.0,0],["AC36","","","Outside borders","Center","Normal",12.0,0],["AD36","","","Outside borders","Center","Normal",12.0,0],["AE36","","","Outside borders","Center","Normal",12.0,0],["AF36:AK36","","","Partial border","General","Normal",11.0,0],["A37","","","Outside borders","General","Normal",11.0,0],["B37","","","Partial border","General","Normal",12.0,0],["C37","","","Partial border","General","Normal",12.0,0],["D37","","","Outside borders","Center","Normal",11.0,0],["E37","","","Outside borders","Center","Normal",12.0,0],["F37","","","Outside borders","Center","Normal",12.0,0],["G37","","","Outside borders","Center","Normal",12.0,0],["H37","","","Outside borders","Center","Normal",12.0,0],["I37","","","Outside borders","Center","Normal",12.0,0],["J37","","","Outside borders","Center","Normal",12.0,0],["K37","","","Outside borders","Center","Normal",12.0,0],["L37","","","Outside borders","Center","Normal",12.0,0],["M37","","","Outside borders","Center","Normal",12.0,0],["N37","","","Outside borders","Center","Normal",12.0,0],["O37","","","Outside borders","Center","Normal",12.0,0],["P37","","","Outside borders","Center","Normal",12.0,0],["Q37","","","Outside borders","Center","Normal",12.0,0],["R37","","","Outside borders","Center","Normal",12.0,0],["S37","","","Outside borders","Center","Normal",12.0,0],["T37","","","Outside borders","Center","Normal",12.0,0],["U37","","","Outside borders","Center","Normal",12.0,0],["V37","","","Outside borders","Center","Normal",12.0,0],["W37","","","Outside borders","Center","Normal",12.0,0],["X37","","","Outside borders","Center","Normal",12.0,0],["Y37","","","Outside borders","Center","Normal",12.0,0],["Z37","","","Outside borders","Center","Normal",12.0,0],["AA37","","","Outside borders","Center","Normal",12.0,0],["AB37","","","Outside borders","Center","Normal",12.0,0],["AC37","","","Outside borders","Center","Normal",12.0,0],["AD37","","","Outside borders","Center","Normal",12.0,0],["AE37","","","Outside borders","Center","Normal",12.0,0],["AF37:AK37","","","Partial border","General","Normal",11.0,0],["A38","","","Outside borders","General","Normal",11.0,0],["B38","","","Partial border","General","Normal",12.0,0],["C38","","","Partial border","General","Normal",12.0,0],["D38","","","Outside borders","Center","Normal",11.0,0],["E38","","","Outside borders","Center","Normal",12.0,0],["F38","","","Outside borders","Center","Normal",12.0,0],["G38","","","Outside borders","Center","Normal",12.0,0],["H38","","","Outside borders","Center","Normal",12.0,0],["I38","","","Outside borders","Center","Normal",12.0,0],["J38","","","Outside borders","Center","Normal",12.0,0],["K38","","","Outside borders","Center","Normal",12.0,0],["L38","","","Outside borders","Center","Normal",12.0,0],["M38","","","Outside borders","Center","Normal",12.0,0],["N38","","","Outside borders","Center","Normal",12.0,0],["O38","","","Outside borders","Center","Normal",12.0,0],["P38","","","Outside borders","Center","Normal",12.0,0],["Q38","","","Outside borders","Center","Normal",12.0,0],["R38","","","Outside borders","Center","Normal",12.0,0],["S38","","","Outside borders","Center","Normal",12.0,0],["T38","","","Outside borders","Center","Normal",12.0,0],["U38","","","Outside borders","Center","Normal",12.0,0],["V38","","","Outside borders","Center","Normal",12.0,0],["W38","","","Outside borders","Center","Normal",12.0,0],["X38","","","Outside borders","Center","Normal",12.0,0],["Y38","","","Outside borders","Center","Normal",12.0,0],["Z38","","","Outside borders","Center","Normal",12.0,0],["AA38","","","Outside borders","Center","Normal",12.0,0],["AB38","","","Outside borders","Center","Normal",12.0,0],["AC38","","","Outside borders","Center","Normal",12.0,0],["AD38","","","Outside borders","Center","Normal",12.0,0],["AE38","","","Outside borders","Center","Normal",12.0,0],["AF38:AK38","","","Partial border","General","Normal",11.0,0],["A39","","","Outside borders","General","Normal",11.0,0],["B39","","","Partial border","Left","Normal",12.0,0],["C39","","","Partial border","General","Normal",12.0,0],["D39","","","Outside borders","Center","Normal",11.0,0],["E39","","","Outside borders","Center","Normal",12.0,0],["F39","","","Outside borders","Center","Normal",12.0,0],["G39","","","Outside borders","Center","Normal",12.0,0],["H39","","","Outside borders","Center","Normal",12.0,0],["I39","","","Outside borders","Center","Normal",12.0,0],["J39","","","Outside borders","Center","Normal",12.0,0],["K39","","","Outside borders","Center","Normal",12.0,0],["L39","","","Outside borders","Center","Normal",12.0,0],["M39","","","Outside borders","Center","Normal",12.0,0],["N39","","","Outside borders","Center","Normal",12.0,0],["O39","","","Outside borders","Center","Normal",12.0,0],["P39","","","Outside borders","Center","Normal",12.0,0],["Q39","","","Outside borders","Center","Normal",12.0,0],["R39","","","Outside borders","Center","Normal",12.0,0],["S39","","","Outside borders","Center","Normal",12.0,0],["T39","","","Outside borders","Center","Normal",12.0,0],["U39","","","Outside borders","Center","Normal",12.0,0],["V39","","","Outside borders","Center","Normal",12.0,0],["W39","","","Outside borders","Center","Normal",12.0,0],["X39","","","Outside borders","Center","Normal",12.0,0],["Y39","","","Outside borders","Center","Normal",12.0,0],["Z39","","","Outside borders","Center","Normal",12.0,0],["AA39","","","Outside borders","Center","Normal",12.0,0],["AB39","","","Outside borders","Center","Normal",12.0,0],["AC39","","","Outside borders","Center","Normal",12.0,0],["AD39","","","Outside borders","Center","Normal",12.0,0],["AE39","","","Outside borders","Center","Normal",12.0,0],["AF39:AK39","","","Partial border","General","Normal",11.0,0],["A40","","","Outside borders","General","Normal",11.0,0],["B40","","","Partial border","General","Normal",12.0,0],["C40","","","Partial border","General","Normal",12.0,0],["D40","","","Outside borders","Center","Normal",11.0,0],["E40","","","Outside borders","Center","Normal",12.0,0],["F40","","","Outside borders","Center","Normal",12.0,0],["G40","","","Outside borders","Center","Normal",12.0,0],["H40","","","Outside borders","Center","Normal",12.0,0],["I40","","","Outside borders","Center","Normal",12.0,0],["J40","","","Outside borders","Center","Normal",12.0,0],["K40","","","Outside borders","Center","Normal",12.0,0],["L40","","","Outside borders","Center","Normal",12.0,0],["M40","","","Outside borders","Center","Normal",12.0,0],["N40","","","Outside borders","Center","Normal",12.0,0],["O40","","","Outside borders","Center","Normal",12.0,0],["P40","","","Outside borders","Center","Normal",12.0,0],["Q40","","","Outside borders","Center","Normal",12.0,0],["R40","","","Outside borders","Center","Normal",12.0,0],["S40","","","Outside borders","Center","Normal",12.0,0],["T40","","","Outside borders","Center","Normal",12.0,0],["U40","","","Outside borders","Center","Normal",12.0,0],["V40","","","Outside borders","Center","Normal",12.0,0],["W40","","","Outside borders","Center","Normal",12.0,0],["X40","","","Outside borders","Center","Normal",12.0,0],["Y40","","","Outside borders","Center","Normal",12.0,0],["Z40","","","Outside borders","Center","Normal",12.0,0],["AA40","","","Outside borders","Center","Normal",12.0,0],["AB40","","","Outside borders","Center","Normal",12.0,0],["AC40","","","Outside borders","Center","Normal",12.0,0],["AD40","","","Outside borders","Center","Normal",12.0,0],["AE40","","","Outside borders","Center","Normal",12.0,0],["AF40:AK40","","","Partial border","General","Normal",11.0,0],["A41","","","Outside borders","General","Normal",11.0,0],["B41","","","Partial border","General","Normal",12.0,0],["C41","","","Partial border","General","Normal",12.0,0],["D41","","","Outside borders","Center","Normal",11.0,0],["E41","","","Outside borders","Center","Normal",12.0,0],["F41","","","Outside borders","Center","Normal",12.0,0],["G41","","","Outside borders","Center","Normal",12.0,0],["H41","","","Outside borders","Center","Normal",12.0,0],["I41","","","Outside borders","Center","Normal",12.0,0],["J41","","","Outside borders","Center","Normal",12.0,0],["K41","","","Outside borders","Center","Normal",12.0,0],["L41","","","Outside borders","Center","Normal",12.0,0],["M41","","","Outside borders","Center","Normal",12.0,0],["N41","","","Outside borders","Center","Normal",12.0,0],["O41","","","Outside borders","Center","Normal",12.0,0],["P41","","","Outside borders","Center","Normal",12.0,0],["Q41","","","Outside borders","Center","Normal",12.0,0],["R41","","","Outside borders","Center","Normal",12.0,0],["S41","","","Outside borders","Center","Normal",12.0,0],["T41","","","Outside borders","Center","Normal",12.0,0],["U41","","","Outside borders","Center","Normal",12.0,0],["V41","","","Outside borders","Center","Normal",12.0,0],["W41","","","Outside borders","Center","Normal",12.0,0],["X41","","","Outside borders","Center","Normal",12.0,0],["Y41","","","Outside borders","Center","Normal",12.0,0],["Z41","","","Outside borders","Center","Normal",12.0,0],["AA41","","","Outside borders","Center","Normal",12.0,0],["AB41","","","Outside borders","Center","Normal",12.0,0],["AC41","","","Outside borders","Center","Normal",12.0,0],["AD41","","","Outside borders","Center","Normal",12.0,0],["AE41","","","Outside borders","Center","Normal",12.0,0],["AF41:AK41","","","Partial border","General","Normal",11.0,0],["A42","","","Outside borders","General","Normal",11.0,0],["B42","","","Partial border","General","Normal",12.0,0],["C42","","","Partial border","General","Normal",12.0,0],["D42","","","Outside borders","Center","Normal",11.0,0],["E42","","","Outside borders","Center","Normal",12.0,0],["F42","","","Outside borders","Center","Normal",12.0,0],["G42","","","Outside borders","Center","Normal",12.0,0],["H42","","","Outside borders","Center","Normal",12.0,0],["I42","","","Outside borders","Center","Normal",12.0,0],["J42","","","Outside borders","Center","Normal",12.0,0],["K42","","","Outside borders","Center","Normal",12.0,0],["L42","","","Outside borders","Center","Normal",12.0,0],["M42","","","Outside borders","Center","Normal",12.0,0],["N42","","","Outside borders","Center","Normal",12.0,0],["O42","","","Outside borders","Center","Normal",12.0,0],["P42","","","Outside borders","Center","Normal",12.0,0],["Q42","","","Outside borders","Center","Normal",12.0,0],["R42","","","Outside borders","Center","Normal",12.0,0],["S42","","","Outside borders","Center","Normal",12.0,0],["T42","","","Outside borders","Center","Normal",12.0,0],["U42","","","Outside borders","Center","Normal",12.0,0],["V42","","","Outside borders","Center","Normal",12.0,0],["W42","","","Outside borders","Center","Normal",12.0,0],["X42","","","Outside borders","Center","Normal",12.0,0],["Y42","","","Outside borders","Center","Normal",12.0,0],["Z42","","","Outside borders","Center","Normal",12.0,0],["AA42","","","Outside borders","Center","Normal",12.0,0],["AB42","","","Outside borders","Center","Normal",12.0,0],["AC42","","","Outside borders","Center","Normal",12.0,0],["AD42","","","Outside borders","Center","Normal",12.0,0],["AE42","","","Outside borders","Center","Normal",12.0,0],["AF42","","","Partial border","General","Normal",11.0,0],["AG42","","","Partial border","General","Normal",11.0,0],["AH42","","","Partial border","General","Normal",11.0,0],["AI42","","","Partial border","General","Normal",11.0,0],["AJ42","","","Partial border","General","Normal",11.0,0],["AK42","","","Partial border","General","Normal",11.0,0],["A43","","","Outside borders","General","Normal",11.0,0],["B43","","","Partial border","Left","Normal",12.0,0],["C43","","","Partial border","General","Normal",12.0,0],["D43","","","Outside borders","Center","Normal",11.0,0],["E43","","","Outside borders","Center","Normal",12.0,0],["F43","","","Outside borders","Center","Normal",12.0,0],["G43","","","Outside borders","Center","Normal",12.0,0],["H43","","","Outside borders","Center","Normal",12.0,0],["I43","","","Outside borders","Center","Normal",12.0,0],["J43","","","Outside borders","Center","Normal",12.0,0],["K43","","","Outside borders","Center","Normal",12.0,0],["L43","","","Outside borders","Center","Normal",12.0,0],["M43","","","Outside borders","Center","Normal",12.0,0],["N43","","","Outside borders","Center","Normal",12.0,0],["O43","","","Outside borders","Center","Normal",12.0,0],["P43","","","Outside borders","Center","Normal",12.0,0],["Q43","","","Outside borders","Center","Normal",12.0,0],["R43","","","Outside borders","Center","Normal",12.0,0],["S43","","","Outside borders","Center","Normal",12.0,0],["T43","","","Outside borders","Center","Normal",12.0,0],["U43","","","Outside borders","Center","Normal",12.0,0],["V43","","","Outside borders","Center","Normal",12.0,0],["W43","","","Outside borders","Center","Normal",12.0,0],["X43","","","Outside borders","Center","Normal",12.0,0],["Y43","","","Outside borders","Center","Normal",12.0,0],["Z43","","","Outside borders","Center","Normal",12.0,0],["AA43","","","Outside borders","Center","Normal",12.0,0],["AB43","","","Outside borders","Center","Normal",12.0,0],["AC43","","","Outside borders","Center","Normal",12.0,0],["AD43","","","Outside borders","Center","Normal",12.0,0],["AE43","","","Outside borders","Center","Normal",12.0,0],["AF43:AK43","","","Partial border","General","Normal",11.0,0],["A44","","","Outside borders","General","Normal",11.0,0],["B44","","","Partial border","General","Normal",12.0,0],["C44","","","Partial border","General","Normal",12.0,0],["D44","","","Outside borders","Center","Normal",11.0,0],["E44","","","Outside borders","Center","Normal",12.0,0],["F44","","","Outside borders","Center","Normal",12.0,0],["G44","","","Outside borders","Center","Normal",12.0,0],["H44","","","Outside borders","Center","Normal",12.0,0],["I44","","","Outside borders","Center","Normal",12.0,0],["J44","","","Outside borders","Center","Normal",12.0,0],["K44","","","Outside borders","Center","Normal",12.0,0],["L44","","","Outside borders","Center","Normal",12.0,0],["M44","","","Outside borders","Center","Normal",12.0,0],["N44","","","Outside borders","Center","Normal",12.0,0],["O44","","","Outside borders","Center","Normal",12.0,0],["P44","","","Outside borders","Center","Normal",12.0,0],["Q44","","","Outside borders","Center","Normal",12.0,0],["R44","","","Outside borders","Center","Normal",12.0,0],["S44","","","Outside borders","Center","Normal",12.0,0],["T44","","","Outside borders","Center","Normal",12.0,0],["U44","","","Outside borders","Center","Normal",12.0,0],["V44","","","Outside borders","Center","Normal",12.0,0],["W44","","","Outside borders","Center","Normal",12.0,0],["X44","","","Outside borders","Center","Normal",12.0,0],["Y44","","","Outside borders","Center","Normal",12.0,0],["Z44","","","Outside borders","Center","Normal",12.0,0],["AA44","","","Outside borders","Center","Normal",12.0,0],["AB44","","","Outside borders","Center","Normal",12.0,0],["AC44","","","Outside borders","Center","Normal",12.0,0],["AD44","","","Outside borders","Center","Normal",12.0,0],["AE44","","","Outside borders","Center","Normal",12.0,0],["AF44:AK44","","","Partial border","General","Normal",11.0,0],["A45","","","Outside borders","General","Normal",11.0,0],["B45","","","Partial border","General","Normal",12.0,0],["C45","","","Partial border","General","Normal",12.0,0],["D45","","","Outside borders","Center","Normal",11.0,0],["E45","","","Outside borders","Center","Normal",12.0,0],["F45","","","Outside borders","Center","Normal",12.0,0],["G45","","","Outside borders","Center","Normal",12.0,0],["H45","","","Outside borders","Center","Normal",12.0,0],["I45","","","Outside borders","Center","Normal",12.0,0],["J45","","","Outside borders","Center","Normal",12.0,0],["K45","","","Outside borders","Center","Normal",12.0,0],["L45","","","Outside borders","Center","Normal",12.0,0],["M45","","","Outside borders","Center","Normal",12.0,0],["N45","","","Outside borders","Center","Normal",12.0,0],["O45","","","Outside borders","Center","Normal",12.0,0],["P45","","","Outside borders","Center","Normal",12.0,0],["Q45","","","Outside borders","Center","Normal",12.0,0],["R45","","","Outside borders","Center","Normal",12.0,0],["S45","","","Outside borders","Center","Normal",12.0,0],["T45","","","Outside borders","Center","Normal",12.0,0],["U45","","","Outside borders","Center","Normal",12.0,0],["V45","","","Outside borders","Center","Normal",12.0,0],["W45","","","Outside borders","Center","Normal",12.0,0],["X45","","","Outside borders","Center","Normal",12.0,0],["Y45","","","Outside borders","Center","Normal",12.0,0],["Z45","","","Outside borders","Center","Normal",12.0,0],["AA45","","","Outside borders","Center","Normal",12.0,0],["AB45","","","Outside borders","Center","Normal",12.0,0],["AC45","","","Outside borders","Center","Normal",12.0,0],["AD45","","","Outside borders","Center","Normal",12.0,0],["AE45","","","Outside borders","Center","Normal",12.0,0],["AF45:AK45","","","Partial border","General","Normal",11.0,0],["A46","","","Outside borders","General","Normal",11.0,0],["B46","","","Partial border","General","Normal",12.0,0],["C46","","","Partial border","General","Normal",12.0,0],["D46","","","Outside borders","Center","Normal",11.0,0],["E46","","","Outside borders","Center","Normal",12.0,0],["F46","","","Outside borders","Center","Normal",12.0,0],["G46","","","Outside borders","Center","Normal",12.0,0],["H46","","","Outside borders","Center","Normal",12.0,0],["I46","","","Outside borders","Center","Normal",12.0,0],["J46","","","Outside borders","Center","Normal",12.0,0],["K46","","","Outside borders","Center","Normal",12.0,0],["L46","","","Outside borders","Center","Normal",12.0,0],["M46","","","Outside borders","Center","Normal",12.0,0],["N46","","","Outside borders","Center","Normal",12.0,0],["O46","","","Outside borders","Center","Normal",12.0,0],["P46","","","Outside borders","Center","Normal",12.0,0],["Q46","","","Outside borders","Center","Normal",12.0,0],["R46","","","Outside borders","Center","Normal",12.0,0],["S46","","","Outside borders","Center","Normal",12.0,0],["T46","","","Outside borders","Center","Normal",12.0,0],["U46","","","Outside borders","Center","Normal",12.0,0],["V46","","","Outside borders","Center","Normal",12.0,0],["W46","","","Outside borders","Center","Normal",12.0,0],["X46","","","Outside borders","Center","Normal",12.0,0],["Y46","","","Outside borders","Center","Normal",12.0,0],["Z46","","","Outside borders","Center","Normal",12.0,0],["AA46","","","Outside borders","Center","Normal",12.0,0],["AB46","","","Outside borders","Center","Normal",12.0,0],["AC46","","","Outside borders","Center","Normal",12.0,0],["AD46","","","Outside borders","Center","Normal",12.0,0],["AE46","","","Outside borders","Center","Normal",12.0,0],["AF46:AK46","","","Partial border","General","Normal",11.0,0],["A47","","","Outside borders","General","Normal",11.0,0],["B47","","","Partial border","General","Normal",12.0,0],["C47","","","Partial border","General","Normal",12.0,0],["D47","","","Outside borders","Center","Normal",11.0,0],["E47","","","Outside borders","Center","Normal",12.0,0],["F47","","","Outside borders","Center","Normal",12.0,0],["G47","","","Outside borders","Center","Normal",12.0,0],["H47","","","Outside borders","Center","Normal",12.0,0],["I47","","","Outside borders","Center","Normal",12.0,0],["J47","","","Outside borders","Center","Normal",12.0,0],["K47","","","Outside borders","Center","Normal",12.0,0],["L47","","","Outside borders","Center","Normal",12.0,0],["M47","","","Outside borders","Center","Normal",12.0,0],["N47","","","Outside borders","Center","Normal",12.0,0],["O47","","","Outside borders","Center","Normal",12.0,0],["P47","","","Outside borders","Center","Normal",12.0,0],["Q47","","","Outside borders","Center","Normal",12.0,0],["R47","","","Outside borders","Center","Normal",12.0,0],["S47","","","Outside borders","Center","Normal",12.0,0],["T47","","","Outside borders","Center","Normal",12.0,0],["U47","","","Outside borders","Center","Normal",12.0,0],["V47","","","Outside borders","Center","Normal",12.0,0],["W47","","","Outside borders","Center","Normal",12.0,0],["X47","","","Outside borders","Center","Normal",12.0,0],["Y47","","","Outside borders","Center","Normal",12.0,0],["Z47","","","Outside borders","Center","Normal",12.0,0],["AA47","","","Outside borders","Center","Normal",12.0,0],["AB47","","","Outside borders","Center","Normal",12.0,0],["AC47","","","Outside borders","Center","Normal",12.0,0],["AD47","","","Outside borders","Center","Normal",12.0,0],["AE47","","","Outside borders","Center","Normal",12.0,0],["AF47:AK47","","","Partial border","General","Normal",11.0,0],["A48","","","Outside borders","General","Normal",11.0,0],["B48","","","Partial border","General","Normal",12.0,0],["C48","","","Partial border","General","Normal",12.0,0],["D48","","","Outside borders","Center","Normal",11.0,0],["E48","","","Outside borders","Center","Normal",12.0,0],["F48","","","Outside borders","Center","Normal",12.0,0],["G48","","","Outside borders","Center","Normal",12.0,0],["H48","","","Outside borders","Center","Normal",12.0,0],["I48","","","Outside borders","Center","Normal",12.0,0],["J48","","","Outside borders","Center","Normal",12.0,0],["K48","","","Outside borders","Center","Normal",12.0,0],["L48","","","Outside borders","Center","Normal",12.0,0],["M48","","","Outside borders","Center","Normal",12.0,0],["N48","","","Outside borders","Center","Normal",12.0,0],["O48","","","Outside borders","Center","Normal",12.0,0],["P48","","","Outside borders","Center","Normal",12.0,0],["Q48","","","Outside borders","Center","Normal",12.0,0],["R48","","","Outside borders","Center","Normal",12.0,0],["S48","","","Outside borders","Center","Normal",12.0,0],["T48","","","Outside borders","Center","Normal",12.0,0],["U48","","","Outside borders","Center","Normal",12.0,0],["V48","","","Outside borders","Center","Normal",12.0,0],["W48","","","Outside borders","Center","Normal",12.0,0],["X48","","","Outside borders","Center","Normal",12.0,0],["Y48","","","Outside borders","Center","Normal",12.0,0],["Z48","","","Outside borders","Center","Normal",12.0,0],["AA48","","","Outside borders","Center","Normal",12.0,0],["AB48","","","Outside borders","Center","Normal",12.0,0],["AC48","","","Outside borders","Center","Normal",12.0,0],["AD48","","","Outside borders","Center","Normal",12.0,0],["AE48","","","Outside borders","Center","Normal",12.0,0],["AF48:AK48","","","Partial border","General","Normal",11.0,0],["A49","","","Outside borders","General","Normal",11.0,0],["B49","","","Partial border","General","Normal",12.0,0],["C49","","","Partial border","General","Normal",12.0,0],["D49","","","Outside borders","Center","Normal",11.0,0],["E49","","","Outside borders","Center","Normal",12.0,0],["F49","","","Outside borders","Center","Normal",12.0,0],["G49","","","Outside borders","Center","Normal",12.0,0],["H49","","","Outside borders","Center","Normal",12.0,0],["I49","","","Outside borders","Center","Normal",12.0,0],["J49","","","Outside borders","Center","Normal",12.0,0],["K49","","","Outside borders","Center","Normal",12.0,0],["L49","","","Outside borders","Center","Normal",12.0,0],["M49","","","Outside borders","Center","Normal",12.0,0],["N49","","","Outside borders","Center","Normal",12.0,0],["O49","","","Outside borders","Center","Normal",12.0,0],["P49","","","Outside borders","Center","Normal",12.0,0],["Q49","","","Outside borders","Center","Normal",12.0,0],["R49","","","Outside borders","Center","Normal",12.0,0],["S49","","","Outside borders","Center","Normal",12.0,0],["T49","","","Outside borders","Center","Normal",12.0,0],["U49","","","Outside borders","Center","Normal",12.0,0],["V49","","","Outside borders","Center","Normal",12.0,0],["W49","","","Outside borders","Center","Normal",12.0,0],["X49","","","Outside borders","Center","Normal",12.0,0],["Y49","","","Outside borders","Center","Normal",12.0,0],["Z49","","","Outside borders","Center","Normal",12.0,0],["AA49","","","Outside borders","Center","Normal",12.0,0],["AB49","","","Outside borders","Center","Normal",12.0,0],["AC49","","","Outside borders","Center","Normal",12.0,0],["AD49","","","Outside borders","Center","Normal",12.0,0],["AE49","","","Outside borders","Center","Normal",12.0,0],["AF49:AK49","","","Partial border","General","Normal",11.0,0],["A50","","","Outside borders","General","Normal",11.0,0],["B50","","","Partial border","General","Normal",12.0,0],["C50","","","Partial border","General","Normal",12.0,0],["D50","","","Outside borders","Center","Normal",11.0,0],["E50","","","Outside borders","Center","Normal",12.0,0],["F50","","","Outside borders","Center","Normal",12.0,0],["G50","","","Outside borders","Center","Normal",12.0,0],["H50","","","Outside borders","Center","Normal",12.0,0],["I50","","","Outside borders","Center","Normal",12.0,0],["J50","","","Outside borders","Center","Normal",12.0,0],["K50","","","Outside borders","Center","Normal",12.0,0],["L50","","","Outside borders","Center","Normal",12.0,0],["M50","","","Outside borders","Center","Normal",12.0,0],["N50","","","Outside borders","Center","Normal",12.0,0],["O50","","","Outside borders","Center","Normal",12.0,0],["P50","","","Outside borders","Center","Normal",12.0,0],["Q50","","","Outside borders","Center","Normal",12.0,0],["R50","","","Outside borders","Center","Normal",12.0,0],["S50","","","Outside borders","Center","Normal",12.0,0],["T50","","","Outside borders","Center","Normal",12.0,0],["U50","","","Outside borders","Center","Normal",12.0,0],["V50","","","Outside borders","Center","Normal",12.0,0],["W50","","","Outside borders","Center","Normal",12.0,0],["X50","","","Outside borders","Center","Normal",12.0,0],["Y50","","","Outside borders","Center","Normal",12.0,0],["Z50","","","Outside borders","Center","Normal",12.0,0],["AA50","","","Outside borders","Center","Normal",12.0,0],["AB50","","","Outside borders","Center","Normal",12.0,0],["AC50","","","Outside borders","Center","Normal",12.0,0],["AD50","","","Outside borders","Center","Normal",12.0,0],["AE50","","","Outside borders","Center","Normal",12.0,0],["AF50:AK50","","","Partial border","General","Normal",11.0,0],["A51","","","Outside borders","General","Normal",11.0,0],["B51","","","Partial border","General","Normal",12.0,0],["C51","","","Partial border","General","Normal",12.0,0],["D51","","","Outside borders","Center","Normal",11.0,0],["E51","","","Outside borders","Center","Normal",12.0,0],["F51","","","Outside borders","Center","Normal",12.0,0],["G51","","","Outside borders","Center","Normal",12.0,0],["H51","","","Outside borders","Center","Normal",12.0,0],["I51","","","Outside borders","Center","Normal",12.0,0],["J51","","","Outside borders","Center","Normal",12.0,0],["K51","","","Outside borders","Center","Normal",12.0,0],["L51","","","Outside borders","Center","Normal",12.0,0],["M51","","","Outside borders","Center","Normal",12.0,0],["N51","","","Outside borders","Center","Normal",12.0,0],["O51","","","Outside borders","Center","Normal",12.0,0],["P51","","","Outside borders","Center","Normal",12.0,0],["Q51","","","Outside borders","Center","Normal",12.0,0],["R51","","","Outside borders","Center","Normal",12.0,0],["S51","","","Outside borders","Center","Normal",12.0,0],["T51","","","Outside borders","Center","Normal",12.0,0],["U51","","","Outside borders","Center","Normal",12.0,0],["V51","","","Outside borders","Center","Normal",12.0,0],["W51","","","Outside borders","Center","Normal",12.0,0],["X51","","","Outside borders","Center","Normal",12.0,0],["Y51","","","Outside borders","Center","Normal",12.0,0],["Z51","","","Outside borders","Center","Normal",12.0,0],["AA51","","","Outside borders","Center","Normal",12.0,0],["AB51","","","Outside borders","Center","Normal",12.0,0],["AC51","","","Outside borders","Center","Normal",12.0,0],["AD51","","","Outside borders","Center","Normal",12.0,0],["AE51","","","Outside borders","Center","Normal",12.0,0],["AF51:AK51","","","Partial border","General","Normal",11.0,0],["A52","","","Outside borders","General","Normal",11.0,0],["B52","","","Partial border","General","Normal",12.0,0],["C52","","","Partial border","General","Normal",12.0,0],["D52","","","Outside borders","Center","Normal",11.0,0],["E52","","","Outside borders","Center","Normal",12.0,0],["F52","","","Outside borders","Center","Normal",12.0,0],["G52","","","Outside borders","Center","Normal",12.0,0],["H52","","","Outside borders","Center","Normal",12.0,0],["I52","","","Outside borders","Center","Normal",12.0,0],["J52","","","Outside borders","Center","Normal",12.0,0],["K52","","","Outside borders","Center","Normal",12.0,0],["L52","","","Outside borders","Center","Normal",12.0,0],["M52","","","Outside borders","Center","Normal",12.0,0],["N52","","","Outside borders","Center","Normal",12.0,0],["O52","","","Outside borders","Center","Normal",12.0,0],["P52","","","Outside borders","Center","Normal",12.0,0],["Q52","","","Outside borders","Center","Normal",12.0,0],["R52","","","Outside borders","Center","Normal",12.0,0],["S52","","","Outside borders","Center","Normal",12.0,0],["T52","","","Outside borders","Center","Normal",12.0,0],["U52","","","Outside borders","Center","Normal",12.0,0],["V52","","","Outside borders","Center","Normal",12.0,0],["W52","","","Outside borders","Center","Normal",12.0,0],["X52","","","Outside borders","Center","Normal",12.0,0],["Y52","","","Outside borders","Center","Normal",12.0,0],["Z52","","","Outside borders","Center","Normal",12.0,0],["AA52","","","Outside borders","Center","Normal",12.0,0],["AB52","","","Outside borders","Center","Normal",12.0,0],["AC52","","","Outside borders","Center","Normal",12.0,0],["AD52","","","Outside borders","Center","Normal",12.0,0],["AE52","","","Outside borders","Center","Normal",12.0,0],["AF52:AK52","","","Partial border","General","Normal",11.0,0],["A53","","","Outside borders","General","Normal",11.0,0],["B53","","","Partial border","General","Normal",12.0,0],["C53","","","Partial border","General","Normal",12.0,0],["D53","","","Outside borders","Center","Normal",11.0,0],["E53","","","Outside borders","Center","Normal",12.0,0],["F53","","","Outside borders","Center","Normal",12.0,0],["G53","","","Outside borders","Center","Normal",12.0,0],["H53","","","Outside borders","Center","Normal",12.0,0],["I53","","","Outside borders","Center","Normal",12.0,0],["J53","","","Outside borders","Center","Normal",12.0,0],["K53","","","Outside borders","Center","Normal",12.0,0],["L53","","","Outside borders","Center","Normal",12.0,0],["M53","","","Outside borders","Center","Normal",12.0,0],["N53","","","Outside borders","Center","Normal",12.0,0],["O53","","","Outside borders","Center","Normal",12.0,0],["P53","","","Outside borders","Center","Normal",12.0,0],["Q53","","","Outside borders","Center","Normal",12.0,0],["R53","","","Outside borders","Center","Normal",12.0,0],["S53","","","Outside borders","Center","Normal",12.0,0],["T53","","","Outside borders","Center","Normal",12.0,0],["U53","","","Outside borders","Center","Normal",12.0,0],["V53","","","Outside borders","Center","Normal",12.0,0],["W53","","","Outside borders","Center","Normal",12.0,0],["X53","","","Outside borders","Center","Normal",12.0,0],["Y53","","","Outside borders","Center","Normal",12.0,0],["Z53","","","Outside borders","Center","Normal",12.0,0],["AA53","","","Outside borders","Center","Normal",12.0,0],["AB53","","","Outside borders","Center","Normal",12.0,0],["AC53","","","Outside borders","Center","Normal",12.0,0],["AD53","","","Outside borders","Center","Normal",12.0,0],["AE53","","","Outside borders","Center","Normal",12.0,0],["AF53:AK53","","","Partial border","General","Normal",11.0,0],["A54","","","Outside borders","General","Normal",11.0,0],["B54","","","Partial border","General","Normal",12.0,0],["C54","","","Partial border","General","Normal",12.0,0],["D54","","","Outside borders","Center","Normal",11.0,0],["E54","","","Outside borders","Center","Normal",12.0,0],["F54","","","Outside borders","Center","Normal",12.0,0],["G54","","","Outside borders","Center","Normal",12.0,0],["H54","","","Outside borders","Center","Normal",12.0,0],["I54","","","Outside borders","Center","Normal",12.0,0],["J54","","","Outside borders","Center","Normal",12.0,0],["K54","","","Outside borders","Center","Normal",12.0,0],["L54","","","Outside borders","Center","Normal",12.0,0],["M54","","","Outside borders","Center","Normal",12.0,0],["N54","","","Outside borders","Center","Normal",12.0,0],["O54","","","Outside borders","Center","Normal",12.0,0],["P54","","","Outside borders","Center","Normal",12.0,0],["Q54","","","Outside borders","Center","Normal",12.0,0],["R54","","","Outside borders","Center","Normal",12.0,0],["S54","","","Outside borders","Center","Normal",12.0,0],["T54","","","Outside borders","Center","Normal",12.0,0],["U54","","","Outside borders","Center","Normal",12.0,0],["V54","","","Outside borders","Center","Normal",12.0,0],["W54","","","Outside borders","Center","Normal",12.0,0],["X54","","","Outside borders","Center","Normal",12.0,0],["Y54","","","Outside borders","Center","Normal",12.0,0],["Z54","","","Outside borders","Center","Normal",12.0,0],["AA54","","","Outside borders","Center","Normal",12.0,0],["AB54","","","Outside borders","Center","Normal",12.0,0],["AC54","","","Outside borders","Center","Normal",12.0,0],["AD54","","","Outside borders","Center","Normal",12.0,0],["AE54","","","Outside borders","Center","Normal",12.0,0],["AF54:AK54","","","Partial border","General","Normal",11.0,0],["A55","","","Outside borders","General","Normal",11.0,0],["B55","","","Partial border","General","Normal",12.0,0],["C55","","","Partial border","General","Normal",12.0,0],["D55","","","Outside borders","Center","Normal",11.0,0],["E55","","","Outside borders","Center","Normal",12.0,0],["F55","","","Outside borders","Center","Normal",12.0,0],["G55","","","Outside borders","Center","Normal",12.0,0],["H55","","","Outside borders","Center","Normal",12.0,0],["I55","","","Outside borders","Center","Normal",12.0,0],["J55","","","Outside borders","Center","Normal",12.0,0],["K55","","","Outside borders","Center","Normal",12.0,0],["L55","","","Outside borders","Center","Normal",12.0,0],["M55","","","Outside borders","Center","Normal",12.0,0],["N55","","","Outside borders","Center","Normal",12.0,0],["O55","","","Outside borders","Center","Normal",12.0,0],["P55","","","Outside borders","Center","Normal",12.0,0],["Q55","","","Outside borders","Center","Normal",12.0,0],["R55","","","Outside borders","Center","Normal",12.0,0],["S55","","","Outside borders","Center","Normal",12.0,0],["T55","","","Outside borders","Center","Normal",12.0,0],["U55","","","Outside borders","Center","Normal",12.0,0],["V55","","","Outside borders","Center","Normal",12.0,0],["W55","","","Outside borders","Center","Normal",12.0,0],["X55","","","Outside borders","Center","Normal",12.0,0],["Y55","","","Outside borders","Center","Normal",12.0,0],["Z55","","","Outside borders","Center","Normal",12.0,0],["AA55","","","Outside borders","Center","Normal",12.0,0],["AB55","","","Outside borders","Center","Normal",12.0,0],["AC55","","","Outside borders","Center","Normal",12.0,0],["AD55","","","Outside borders","Center","Normal",12.0,0],["AE55","","","Outside borders","Center","Normal",12.0,0],["AF55:AK55","","","Partial border","General","Normal",11.0,0],["A56","","","Outside borders","General","Normal",11.0,0],["B56","","","Partial border","General","Normal",12.0,0],["C56","","","Partial border","General","Normal",12.0,0],["D56","","","Outside borders","Center","Normal",11.0,0],["E56","","","Outside borders","Center","Normal",12.0,0],["F56","","","Outside borders","Center","Normal",12.0,0],["G56","","","Outside borders","Center","Normal",12.0,0],["H56","","","Outside borders","Center","Normal",12.0,0],["I56","","","Outside borders","Center","Normal",12.0,0],["J56","","","Outside borders","Center","Normal",12.0,0],["K56","","","Outside borders","Center","Normal",12.0,0],["L56","","","Outside borders","Center","Normal",12.0,0],["M56","","","Outside borders","Center","Normal",12.0,0],["N56","","","Outside borders","Center","Normal",12.0,0],["O56","","","Outside borders","Center","Normal",12.0,0],["P56","","","Outside borders","Center","Normal",12.0,0],["Q56","","","Outside borders","Center","Normal",12.0,0],["R56","","","Outside borders","Center","Normal",12.0,0],["S56","","","Outside borders","Center","Normal",12.0,0],["T56","","","Outside borders","Center","Normal",12.0,0],["U56","","","Outside borders","Center","Normal",12.0,0],["V56","","","Outside borders","Center","Normal",12.0,0],["W56","","","Outside borders","Center","Normal",12.0,0],["X56","","","Outside borders","Center","Normal",12.0,0],["Y56","","","Outside borders","Center","Normal",12.0,0],["Z56","","","Outside borders","Center","Normal",12.0,0],["AA56","","","Outside borders","Center","Normal",12.0,0],["AB56","","","Outside borders","Center","Normal",12.0,0],["AC56","","","Outside borders","Center","Normal",12.0,0],["AD56","","","Outside borders","Center","Normal",12.0,0],["AE56","","","Outside borders","Center","Normal",12.0,0],["AF56:AK56","","","Partial border","General","Normal",11.0,0],["A57","","","Outside borders","General","Normal",11.0,0],["B57","","","Partial border","General","Normal",12.0,0],["C57","","","Partial border","General","Normal",12.0,0],["D57","","","Outside borders","Center","Normal",11.0,0],["E57","","","Outside borders","Center","Normal",12.0,0],["F57","","","Outside borders","Center","Normal",12.0,0],["G57","","","Outside borders","Center","Normal",12.0,0],["H57","","","Outside borders","Center","Normal",12.0,0],["I57","","","Outside borders","Center","Normal",12.0,0],["J57","","","Outside borders","Center","Normal",12.0,0],["K57","","","Outside borders","Center","Normal",12.0,0],["L57","","","Outside borders","Center","Normal",12.0,0],["M57","","","Outside borders","Center","Normal",12.0,0],["N57","","","Outside borders","Center","Normal",12.0,0],["O57","","","Outside borders","Center","Normal",12.0,0],["P57","","","Outside borders","Center","Normal",12.0,0],["Q57","","","Outside borders","Center","Normal",12.0,0],["R57","","","Outside borders","Center","Normal",12.0,0],["S57","","","Outside borders","Center","Normal",12.0,0],["T57","","","Outside borders","Center","Normal",12.0,0],["U57","","","Outside borders","Center","Normal",12.0,0],["V57","","","Outside borders","Center","Normal",12.0,0],["W57","","","Outside borders","Center","Normal",12.0,0],["X57","","","Outside borders","Center","Normal",12.0,0],["Y57","","","Outside borders","Center","Normal",12.0,0],["Z57","","","Outside borders","Center","Normal",12.0,0],["AA57","","","Outside borders","Center","Normal",12.0,0],["AB57","","","Outside borders","Center","Normal",12.0,0],["AC57","","","Outside borders","Center","Normal",12.0,0],["AD57","","","Outside borders","Center","Normal",12.0,0],["AE57","","","Outside borders","Center","Normal",12.0,0],["AF57:AK57","","","Partial border","General","Normal",11.0,0],["A58","","","Outside borders","General","Normal",11.0,0],["B58","","","Partial border","General","Normal",12.0,0],["C58","","","Partial border","General","Normal",12.0,0],["D58","","","Outside borders","Center","Normal",11.0,0],["E58","","","Outside borders","Center","Normal",12.0,0],["F58","","","Outside borders","Center","Normal",12.0,0],["G58","","","Outside borders","Center","Normal",12.0,0],["H58","","","Outside borders","Center","Normal",12.0,0],["I58","","","Outside borders","Center","Normal",12.0,0],["J58","","","Outside borders","Center","Normal",12.0,0],["K58","","","Outside borders","Center","Normal",12.0,0],["L58","","","Outside borders","Center","Normal",12.0,0],["M58","","","Outside borders","Center","Normal",12.0,0],["N58","","","Outside borders","Center","Normal",12.0,0],["O58","","","Outside borders","Center","Normal",12.0,0],["P58","","","Outside borders","Center","Normal",12.0,0],["Q58","","","Outside borders","Center","Normal",12.0,0],["R58","","","Outside borders","Center","Normal",12.0,0],["S58","","","Outside borders","Center","Normal",12.0,0],["T58","","","Outside borders","Center","Normal",12.0,0],["U58","","","Outside borders","Center","Normal",12.0,0],["V58","","","Outside borders","Center","Normal",12.0,0],["W58","","","Outside borders","Center","Normal",12.0,0],["X58","","","Outside borders","Center","Normal",12.0,0],["Y58","","","Outside borders","Center","Normal",12.0,0],["Z58","","","Outside borders","Center","Normal",12.0,0],["AA58","","","Outside borders","Center","Normal",12.0,0],["AB58","","","Outside borders","Center","Normal",12.0,0],["AC58","","","Outside borders","Center","Normal",12.0,0],["AD58","","","Outside borders","Center","Normal",12.0,0],["AE58","","","Outside borders","Center","Normal",12.0,0],["AF58:AK58","","","Partial border","General","Normal",11.0,0],["A59","","","Outside borders","General","Normal",11.0,0],["B59","","","Partial border","General","Normal",12.0,0],["C59","","","Partial border","General","Normal",12.0,0],["D59","","","Outside borders","Center","Normal",11.0,0],["E59","","","Outside borders","Center","Normal",12.0,0],["F59","","","Outside borders","Center","Normal",12.0,0],["G59","","","Outside borders","Center","Normal",12.0,0],["H59","","","Outside borders","Center","Normal",12.0,0],["I59","","","Outside borders","Center","Normal",12.0,0],["J59","","","Outside borders","Center","Normal",12.0,0],["K59","","","Outside borders","Center","Normal",12.0,0],["L59","","","Outside borders","Center","Normal",12.0,0],["M59","","","Outside borders","Center","Normal",12.0,0],["N59","","","Outside borders","Center","Normal",12.0,0],["O59","","","Outside borders","Center","Normal",12.0,0],["P59","","","Outside borders","Center","Normal",12.0,0],["Q59","","","Outside borders","Center","Normal",12.0,0],["R59","","","Outside borders","Center","Normal",12.0,0],["S59","","","Outside borders","Center","Normal",12.0,0],["T59","","","Outside borders","Center","Normal",12.0,0],["U59","","","Outside borders","Center","Normal",12.0,0],["V59","","","Outside borders","Center","Normal",12.0,0],["W59","","","Outside borders","Center","Normal",12.0,0],["X59","","","Outside borders","Center","Normal",12.0,0],["Y59","","","Outside borders","Center","Normal",12.0,0],["Z59","","","Outside borders","Center","Normal",12.0,0],["AA59","","","Outside borders","Center","Normal",12.0,0],["AB59","","","Outside borders","Center","Normal",12.0,0],["AC59","","","Outside borders","Center","Normal",12.0,0],["AD59","","","Outside borders","Center","Normal",12.0,0],["AE59","","","Outside borders","Center","Normal",12.0,0],["AF59:AK59","","","Partial border","General","Normal",11.0,0],["A60","","","Outside borders","General","Normal",11.0,0],["B60","","","Partial border","General","Normal",12.0,0],["C60","","","Partial border","General","Normal",12.0,0],["D60","","","Outside borders","Center","Normal",11.0,0],["E60","","","Outside borders","Center","Normal",12.0,0],["F60","","","Outside borders","Center","Normal",12.0,0],["G60","","","Outside borders","Center","Normal",12.0,0],["H60","","","Outside borders","Center","Normal",12.0,0],["I60","","","Outside borders","Center","Normal",12.0,0],["J60","","","Outside borders","Center","Normal",12.0,0],["K60","","","Outside borders","Center","Normal",12.0,0],["L60","","","Outside borders","Center","Normal",12.0,0],["M60","","","Outside borders","Center","Normal",12.0,0],["N60","","","Outside borders","Center","Normal",12.0,0],["O60","","","Outside borders","Center","Normal",12.0,0],["P60","","","Outside borders","Center","Normal",12.0,0],["Q60","","","Outside borders","Center","Normal",12.0,0],["R60","","","Outside borders","Center","Normal",12.0,0],["S60","","","Outside borders","Center","Normal",12.0,0],["T60","","","Outside borders","Center","Normal",12.0,0],["U60","","","Outside borders","Center","Normal",12.0,0],["V60","","","Outside borders","Center","Normal",12.0,0],["W60","","","Outside borders","Center","Normal",12.0,0],["X60","","","Outside borders","Center","Normal",12.0,0],["Y60","","","Outside borders","Center","Normal",12.0,0],["Z60","","","Outside borders","Center","Normal",12.0,0],["AA60","","","Outside borders","Center","Normal",12.0,0],["AB60","","","Outside borders","Center","Normal",12.0,0],["AC60","","","Outside borders","Center","Normal",12.0,0],["AD60","","","Outside borders","Center","Normal",12.0,0],["AE60","","","Outside borders","Center","Normal",12.0,0],["AF60:AK60","","","Partial border","General","Normal",11.0,0],["A61","","","Outside borders","General","Normal",11.0,0],["B61","","","Partial border","General","Normal",12.0,0],["C61","","","Partial border","General","Normal",12.0,0],["D61","","","Outside borders","Center","Normal",11.0,0],["E61","","","Outside borders","Center","Normal",12.0,0],["F61","","","Outside borders","Center","Normal",12.0,0],["G61","","","Outside borders","Center","Normal",12.0,0],["H61","","","Outside borders","Center","Normal",12.0,0],["I61","","","Outside borders","Center","Normal",12.0,0],["J61","","","Outside borders","Center","Normal",12.0,0],["K61","","","Outside borders","Center","Normal",12.0,0],["L61","","","Outside borders","Center","Normal",12.0,0],["M61","","","Outside borders","Center","Normal",12.0,0],["N61","","","Outside borders","Center","Normal",12.0,0],["O61","","","Outside borders","Center","Normal",12.0,0],["P61","","","Outside borders","Center","Normal",12.0,0],["Q61","","","Outside borders","Center","Normal",12.0,0],["R61","","","Outside borders","Center","Normal",12.0,0],["S61","","","Outside borders","Center","Normal",12.0,0],["T61","","","Outside borders","Center","Normal",12.0,0],["U61","","","Outside borders","Center","Normal",12.0,0],["V61","","","Outside borders","Center","Normal",12.0,0],["W61","","","Outside borders","Center","Normal",12.0,0],["X61","","","Outside borders","Center","Normal",12.0,0],["Y61","","","Outside borders","Center","Normal",12.0,0],["Z61","","","Outside borders","Center","Normal",12.0,0],["AA61","","","Outside borders","Center","Normal",12.0,0],["AB61","","","Outside borders","Center","Normal",12.0,0],["AC61","","","Outside borders","Center","Normal",12.0,0],["AD61","","","Outside borders","Center","Normal",12.0,0],["AE61","","","Outside borders","Center","Normal",12.0,0],["AF61:AK61","","","Partial border","General","Normal",11.0,0],["A62","","","Outside borders","General","Normal",11.0,0],["B62","","","Partial border","General","Normal",12.0,0],["C62","","","Partial border","General","Normal",12.0,0],["D62","","","Outside borders","Center","Normal",11.0,0],["E62","","","Outside borders","Center","Normal",12.0,0],["F62","","","Outside borders","Center","Normal",12.0,0],["G62","","","Outside borders","Center","Normal",12.0,0],["H62","","","Outside borders","Center","Normal",12.0,0],["I62","","","Outside borders","Center","Normal",12.0,0],["J62","","","Outside borders","Center","Normal",12.0,0],["K62","","","Outside borders","Center","Normal",12.0,0],["L62","","","Outside borders","Center","Normal",12.0,0],["M62","","","Outside borders","Center","Normal",12.0,0],["N62","","","Outside borders","Center","Normal",12.0,0],["O62","","","Outside borders","Center","Normal",12.0,0],["P62","","","Outside borders","Center","Normal",12.0,0],["Q62","","","Outside borders","Center","Normal",12.0,0],["R62","","","Outside borders","Center","Normal",12.0,0],["S62","","","Outside borders","Center","Normal",12.0,0],["T62","","","Outside borders","Center","Normal",12.0,0],["U62","","","Outside borders","Center","Normal",12.0,0],["V62","","","Outside borders","Center","Normal",12.0,0],["W62","","","Outside borders","Center","Normal",12.0,0],["X62","","","Outside borders","Center","Normal",12.0,0],["Y62","","","Outside borders","Center","Normal",12.0,0],["Z62","","","Outside borders","Center","Normal",12.0,0],["AA62","","","Outside borders","Center","Normal",12.0,0],["AB62","","","Outside borders","Center","Normal",12.0,0],["AC62","","","Outside borders","Center","Normal",12.0,0],["AD62","","","Outside borders","Center","Normal",12.0,0],["AE62","","","Outside borders","Center","Normal",12.0,0],["AF62:AK62","","","Partial border","General","Normal",11.0,0],["A63","","","Outside borders","General","Normal",11.0,0],["B63","","","Partial border","General","Normal",12.0,0],["C63","","","Partial border","General","Normal",12.0,0],["D63","","","Outside borders","Center","Normal",11.0,0],["E63","","","Outside borders","Center","Normal",12.0,0],["F63","","","Outside borders","Center","Normal",12.0,0],["G63","","","Outside borders","Center","Normal",12.0,0],["H63","","","Outside borders","Center","Normal",12.0,0],["I63","","","Outside borders","Center","Normal",12.0,0],["J63","","","Outside borders","Center","Normal",12.0,0],["K63","","","Outside borders","Center","Normal",12.0,0],["L63","","","Outside borders","Center","Normal",12.0,0],["M63","","","Outside borders","Center","Normal",12.0,0],["N63","","","Outside borders","Center","Normal",12.0,0],["O63","","","Outside borders","Center","Normal",12.0,0],["P63","","","Outside borders","Center","Normal",12.0,0],["Q63","","","Outside borders","Center","Normal",12.0,0],["R63","","","Outside borders","Center","Normal",12.0,0],["S63","","","Outside borders","Center","Normal",12.0,0],["T63","","","Outside borders","Center","Normal",12.0,0],["U63","","","Outside borders","Center","Normal",12.0,0],["V63","","","Outside borders","Center","Normal",12.0,0],["W63","","","Outside borders","Center","Normal",12.0,0],["X63","","","Outside borders","Center","Normal",12.0,0],["Y63","","","Outside borders","Center","Normal",12.0,0],["Z63","","","Outside borders","Center","Normal",12.0,0],["AA63","","","Outside borders","Center","Normal",12.0,0],["AB63","","","Outside borders","Center","Normal",12.0,0],["AC63","","","Outside borders","Center","Normal",12.0,0],["AD63","","","Outside borders","Center","Normal",12.0,0],["AE63","","","Outside borders","Center","Normal",12.0,0],["AF63:AK63","","","Partial border","General","Normal",11.0,0],["A64","","","Outside borders","General","Normal",11.0,0],["B64","","","Partial border","General","Normal",12.0,0],["C64","","","Partial border","General","Normal",12.0,0],["D64","","","Outside borders","Center","Normal",11.0,0],["E64","","","Outside borders","Center","Normal",12.0,0],["F64","","","Outside borders","Center","Normal",12.0,0],["G64","","","Outside borders","Center","Normal",12.0,0],["H64","","","Outside borders","Center","Normal",12.0,0],["I64","","","Outside borders","Center","Normal",12.0,0],["J64","","","Outside borders","Center","Normal",12.0,0],["K64","","","Outside borders","Center","Normal",12.0,0],["L64","","","Outside borders","Center","Normal",12.0,0],["M64","","","Outside borders","Center","Normal",12.0,0],["N64","","","Outside borders","Center","Normal",12.0,0],["O64","","","Outside borders","Center","Normal",12.0,0],["P64","","","Outside borders","Center","Normal",12.0,0],["Q64","","","Outside borders","Center","Normal",12.0,0],["R64","","","Outside borders","Center","Normal",12.0,0],["S64","","","Outside borders","Center","Normal",12.0,0],["T64","","","Outside borders","Center","Normal",12.0,0],["U64","","","Outside borders","Center","Normal",12.0,0],["V64","","","Outside borders","Center","Normal",12.0,0],["W64","","","Outside borders","Center","Normal",12.0,0],["X64","","","Outside borders","Center","Normal",12.0,0],["Y64","","","Outside borders","Center","Normal",12.0,0],["Z64","","","Outside borders","Center","Normal",12.0,0],["AA64","","","Outside borders","Center","Normal",12.0,0],["AB64","","","Outside borders","Center","Normal",12.0,0],["AC64","","","Outside borders","Center","Normal",12.0,0],["AD64","","","Outside borders","Center","Normal",12.0,0],["AE64","","","Outside borders","Center","Normal",12.0,0],["AF64:AK64","","","Partial border","General","Normal",11.0,0],["A65","","","Outside borders","General","Normal",11.0,0],["B65","","","Partial border","General","Normal",12.0,0],["C65","","","Partial border","General","Normal",12.0,0],["D65","","","Outside borders","Center","Normal",11.0,0],["E65","","","Outside borders","Center","Normal",12.0,0],["F65","","","Outside borders","Center","Normal",12.0,0],["G65","","","Outside borders","Center","Normal",12.0,0],["H65","","","Outside borders","Center","Normal",12.0,0],["I65","","","Outside borders","Center","Normal",12.0,0],["J65","","","Outside borders","Center","Normal",12.0,0],["K65","","","Outside borders","Center","Normal",12.0,0],["L65","","","Outside borders","Center","Normal",12.0,0],["M65","","","Outside borders","Center","Normal",12.0,0],["N65","","","Outside borders","Center","Normal",12.0,0],["O65","","","Outside borders","Center","Normal",12.0,0],["P65","","","Outside borders","Center","Normal",12.0,0],["Q65","","","Outside borders","Center","Normal",12.0,0],["R65","","","Outside borders","Center","Normal",12.0,0],["S65","","","Outside borders","Center","Normal",12.0,0],["T65","","","Outside borders","Center","Normal",12.0,0],["U65","","","Outside borders","Center","Normal",12.0,0],["V65","","","Outside borders","Center","Normal",12.0,0],["W65","","","Outside borders","Center","Normal",12.0,0],["X65","","","Outside borders","Center","Normal",12.0,0],["Y65","","","Outside borders","Center","Normal",12.0,0],["Z65","","","Outside borders","Center","Normal",12.0,0],["AA65","","","Outside borders","Center","Normal",12.0,0],["AB65","","","Outside borders","Center","Normal",12.0,0],["AC65","","","Outside borders","Center","Normal",12.0,0],["AD65","","","Outside borders","Center","Normal",12.0,0],["AE65","","","Outside borders","Center","Normal",12.0,0],["AF65:AK65","","","Partial border","General","Normal",11.0,0],["A66","","","Outside borders","General","Normal",11.0,0],["B66","","","Partial border","Left","Normal",12.0,0],["C66","","","Partial border","General","Normal",12.0,0],["D66","","","Outside borders","Center","Normal",11.0,0],["E66","","","Outside borders","Center","Normal",12.0,0],["F66","","","Outside borders","Center","Normal",12.0,0],["G66","","","Outside borders","Center","Normal",12.0,0],["H66","","","Outside borders","Center","Normal",12.0,0],["I66","","","Outside borders","Center","Normal",12.0,0],["J66","","","Outside borders","Center","Normal",12.0,0],["K66","","","Outside borders","Center","Normal",12.0,0],["L66","","","Outside borders","Center","Normal",12.0,0],["M66","","","Outside borders","Center","Normal",12.0,0],["N66","","","Outside borders","Center","Normal",12.0,0],["O66","","","Outside borders","Center","Normal",12.0,0],["P66","","","Outside borders","Center","Normal",12.0,0],["Q66","","","Outside borders","Center","Normal",12.0,0],["R66","","","Outside borders","Center","Normal",12.0,0],["S66","","","Outside borders","Center","Normal",12.0,0],["T66","","","Outside borders","Center","Normal",12.0,0],["U66","","","Outside borders","Center","Normal",12.0,0],["V66","","","Outside borders","Center","Normal",12.0,0],["W66","","","Outside borders","Center","Normal",12.0,0],["X66","","","Outside borders","Center","Normal",12.0,0],["Y66","","","Outside borders","Center","Normal",12.0,0],["Z66","","","Outside borders","Center","Normal",12.0,0],["AA66","","","Outside borders","Center","Normal",12.0,0],["AB66","","","Outside borders","Center","Normal",12.0,0],["AC66","","","Outside borders","Center","Normal",12.0,0],["AD66","","","Outside borders","Center","Normal",12.0,0],["AE66","","","Outside borders","Center","Normal",12.0,0],["AF66:AK66","","","Partial border","General","Normal",11.0,0],["A67","","","Outside borders","General","Normal",11.0,0],["B67","","","Partial border","General","Normal",12.0,0],["C67","","","Partial border","General","Normal",12.0,0],["D67","","","Outside borders","Center","Normal",11.0,0],["E67","","","Outside borders","Center","Normal",12.0,0],["F67","","","Outside borders","Center","Normal",12.0,0],["G67","","","Outside borders","Center","Normal",12.0,0],["H67","","","Outside borders","Center","Normal",12.0,0],["I67","","","Outside borders","Center","Normal",12.0,0],["J67","","","Outside borders","Center","Normal",12.0,0],["K67","","","Outside borders","Center","Normal",12.0,0],["L67","","","Outside borders","Center","Normal",12.0,0],["M67","","","Outside borders","Center","Normal",12.0,0],["N67","","","Outside borders","Center","Normal",12.0,0],["O67","","","Outside borders","Center","Normal",12.0,0],["P67","","","Outside borders","Center","Normal",12.0,0],["Q67","","","Outside borders","Center","Normal",12.0,0],["R67","","","Outside borders","Center","Normal",12.0,0],["S67","","","Outside borders","Center","Normal",12.0,0],["T67","","","Outside borders","Center","Normal",12.0,0],["U67","","","Outside borders","Center","Normal",12.0,0],["V67","","","Outside borders","Center","Normal",12.0,0],["W67","","","Outside borders","Center","Normal",12.0,0],["X67","","","Outside borders","Center","Normal",12.0,0],["Y67","","","Outside borders","Center","Normal",12.0,0],["Z67","","","Outside borders","Center","Normal",12.0,0],["AA67","","","Outside borders","Center","Normal",12.0,0],["AB67","","","Outside borders","Center","Normal",12.0,0],["AC67","","","Outside borders","Center","Normal",12.0,0],["AD67","","","Outside borders","Center","Normal",12.0,0],["AE67","","","Outside borders","Center","Normal",12.0,0],["AF67:AK67","","","Partial border","General","Normal",11.0,0],["A68","","","Outside borders","General","Normal",11.0,0],["B68","","","Partial border","General","Normal",12.0,0],["C68","","","Partial border","General","Normal",12.0,0],["D68","","","Outside borders","Center","Normal",11.0,0],["E68","","","Outside borders","Center","Normal",12.0,0],["F68","","","Outside borders","Center","Normal",12.0,0],["G68","","","Outside borders","Center","Normal",12.0,0],["H68","","","Outside borders","Center","Normal",12.0,0],["I68","","","Outside borders","Center","Normal",12.0,0],["J68","","","Outside borders","Center","Normal",12.0,0],["K68","","","Outside borders","Center","Normal",12.0,0],["L68","","","Outside borders","Center","Normal",12.0,0],["M68","","","Outside borders","Center","Normal",12.0,0],["N68","","","Outside borders","Center","Normal",12.0,0],["O68","","","Outside borders","Center","Normal",12.0,0],["P68","","","Outside borders","Center","Normal",12.0,0],["Q68","","","Outside borders","Center","Normal",12.0,0],["R68","","","Outside borders","Center","Normal",12.0,0],["S68","","","Outside borders","Center","Normal",12.0,0],["T68","","","Outside borders","Center","Normal",12.0,0],["U68","","","Outside borders","Center","Normal",12.0,0],["V68","","","Outside borders","Center","Normal",12.0,0],["W68","","","Outside borders","Center","Normal",12.0,0],["X68","","","Outside borders","Center","Normal",12.0,0],["Y68","","","Outside borders","Center","Normal",12.0,0],["Z68","","","Outside borders","Center","Normal",12.0,0],["AA68","","","Outside borders","Center","Normal",12.0,0],["AB68","","","Outside borders","Center","Normal",12.0,0],["AC68","","","Outside borders","Center","Normal",12.0,0],["AD68","","","Outside borders","Center","Normal",12.0,0],["AE68","","","Outside borders","Center","Normal",12.0,0],["AF68:AK68","","","Partial border","General","Normal",11.0,0],["A69","","","Outside borders","General","Normal",11.0,0],["B69","","","Partial border","General","Normal",12.0,0],["C69","","","Partial border","General","Normal",12.0,0],["D69","","","Outside borders","Center","Normal",11.0,0],["E69","","","Outside borders","Center","Normal",12.0,0],["F69","","","Outside borders","Center","Normal",12.0,0],["G69","","","Outside borders","Center","Normal",12.0,0],["H69","","","Outside borders","Center","Normal",12.0,0],["I69","","","Outside borders","Center","Normal",12.0,0],["J69","","","Outside borders","Center","Normal",12.0,0],["K69","","","Outside borders","Center","Normal",12.0,0],["L69","","","Outside borders","Center","Normal",12.0,0],["M69","","","Outside borders","Center","Normal",12.0,0],["N69","","","Outside borders","Center","Normal",12.0,0],["O69","","","Outside borders","Center","Normal",12.0,0],["P69","","","Outside borders","Center","Normal",12.0,0],["Q69","","","Outside borders","Center","Normal",12.0,0],["R69","","","Outside borders","Center","Normal",12.0,0],["S69","","","Outside borders","Center","Normal",12.0,0],["T69","","","Outside borders","Center","Normal",12.0,0],["U69","","","Outside borders","Center","Normal",12.0,0],["V69","","","Outside borders","Center","Normal",12.0,0],["W69","","","Outside borders","Center","Normal",12.0,0],["X69","","","Outside borders","Center","Normal",12.0,0],["Y69","","","Outside borders","Center","Normal",12.0,0],["Z69","","","Outside borders","Center","Normal",12.0,0],["AA69","","","Outside borders","Center","Normal",12.0,0],["AB69","","","Outside borders","Center","Normal",12.0,0],["AC69","","","Outside borders","Center","Normal",12.0,0],["AD69","","","Outside borders","Center","Normal",12.0,0],["AE69","","","Outside borders","Center","Normal",12.0,0],["AF69:AK69","","","Partial border","General","Normal",11.0,0],["A70","","","Outside borders","General","Normal",11.0,0],["B70","","","Partial border","General","Normal",12.0,0],["C70","","","Partial border","General","Normal",12.0,0],["D70","","","Outside borders","Center","Normal",11.0,0],["E70","","","Outside borders","Center","Normal",12.0,0],["F70","","","Outside borders","Center","Normal",12.0,0],["G70","","","Outside borders","Center","Normal",12.0,0],["H70","","","Outside borders","Center","Normal",12.0,0],["I70","","","Outside borders","Center","Normal",12.0,0],["J70","","","Outside borders","Center","Normal",12.0,0],["K70","","","Outside borders","Center","Normal",12.0,0],["L70","","","Outside borders","Center","Normal",12.0,0],["M70","","","Outside borders","Center","Normal",12.0,0],["N70","","","Outside borders","Center","Normal",12.0,0],["O70","","","Outside borders","Center","Normal",12.0,0],["P70","","","Outside borders","Center","Normal",12.0,0],["Q70","","","Outside borders","Center","Normal",12.0,0],["R70","","","Outside borders","Center","Normal",12.0,0],["S70","","","Outside borders","Center","Normal",12.0,0],["T70","","","Outside borders","Center","Normal",12.0,0],["U70","","","Outside borders","Center","Normal",12.0,0],["V70","","","Outside borders","Center","Normal",12.0,0],["W70","","","Outside borders","Center","Normal",12.0,0],["X70","","","Outside borders","Center","Normal",12.0,0],["Y70","","","Outside borders","Center","Normal",12.0,0],["Z70","","","Outside borders","Center","Normal",12.0,0],["AA70","","","Outside borders","Center","Normal",12.0,0],["AB70","","","Outside borders","Center","Normal",12.0,0],["AC70","","","Outside borders","Center","Normal",12.0,0],["AD70","","","Outside borders","Center","Normal",12.0,0],["AE70","","","Outside borders","Center","Normal",12.0,0],["AF70:AK70","","","Partial border","General","Normal",11.0,0],["A71","","","Outside borders","General","Normal",11.0,0],["B71","","","Partial border","Left","Normal",12.0,0],["C71","","","Partial border","General","Normal",12.0,0],["D71","","","Outside borders","Center","Normal",11.0,0],["E71","","","Outside borders","Center","Normal",12.0,0],["F71","","","Outside borders","Center","Normal",12.0,0],["G71","","","Outside borders","Center","Normal",12.0,0],["H71","","","Outside borders","Center","Normal",12.0,0],["I71","","","Outside borders","Center","Normal",12.0,0],["J71","","","Outside borders","Center","Normal",12.0,0],["K71","","","Outside borders","Center","Normal",12.0,0],["L71","","","Outside borders","Center","Normal",12.0,0],["M71","","","Outside borders","Center","Normal",12.0,0],["N71","","","Outside borders","Center","Normal",12.0,0],["O71","","","Outside borders","Center","Normal",12.0,0],["P71","","","Outside borders","Center","Normal",12.0,0],["Q71","","","Outside borders","Center","Normal",12.0,0],["R71","","","Outside borders","Center","Normal",12.0,0],["S71","","","Outside borders","Center","Normal",12.0,0],["T71","","","Outside borders","Center","Normal",12.0,0],["U71","","","Outside borders","Center","Normal",12.0,0],["V71","","","Outside borders","Center","Normal",12.0,0],["W71","","","Outside borders","Center","Normal",12.0,0],["X71","","","Outside borders","Center","Normal",12.0,0],["Y71","","","Outside borders","Center","Normal",12.0,0],["Z71","","","Outside borders","Center","Normal",12.0,0],["AA71","","","Outside borders","Center","Normal",12.0,0],["AB71","","","Outside borders","Center","Normal",12.0,0],["AC71","","","Outside borders","Center","Normal",12.0,0],["AD71","","","Outside borders","Center","Normal",12.0,0],["AE71","","","Outside borders","Center","Normal",12.0,0],["AF71:AK71","","","Partial border","General","Normal",11.0,0],["A72","","","Outside borders","General","Normal",11.0,0],["B72","","","Partial border","General","Normal",12.0,0],["C72","","","Partial border","General","Normal",12.0,0],["D72","","","Outside borders","Center","Normal",11.0,0],["E72","","","Outside borders","Center","Normal",12.0,0],["F72","","","Outside borders","Center","Normal",12.0,0],["G72","","","Outside borders","Center","Normal",12.0,0],["H72","","","Outside borders","Center","Normal",12.0,0],["I72","","","Outside borders","Center","Normal",12.0,0],["J72","","","Outside borders","Center","Normal",12.0,0],["K72","","","Outside borders","Center","Normal",12.0,0],["L72","","","Outside borders","Center","Normal",12.0,0],["M72","","","Outside borders","Center","Normal",12.0,0],["N72","","","Outside borders","Center","Normal",12.0,0],["O72","","","Outside borders","Center","Normal",12.0,0],["P72","","","Outside borders","Center","Normal",12.0,0],["Q72","","","Outside borders","Center","Normal",12.0,0],["R72","","","Outside borders","Center","Normal",12.0,0],["S72","","","Outside borders","Center","Normal",12.0,0],["T72","","","Outside borders","Center","Normal",12.0,0],["U72","","","Outside borders","Center","Normal",12.0,0],["V72","","","Outside borders","Center","Normal",12.0,0],["W72","","","Outside borders","Center","Normal",12.0,0],["X72","","","Outside borders","Center","Normal",12.0,0],["Y72","","","Outside borders","Center","Normal",12.0,0],["Z72","","","Outside borders","Center","Normal",12.0,0],["AA72","","","Outside borders","Center","Normal",12.0,0],["AB72","","","Outside borders","Center","Normal",12.0,0],["AC72","","","Outside borders","Center","Normal",12.0,0],["AD72","","","Outside borders","Center","Normal",12.0,0],["AE72","","","Outside borders","Center","Normal",12.0,0],["AF72:AK72","","","Partial border","General","Normal",11.0,0],["A73","","","Outside borders","General","Normal",11.0,0],["B73","","","Partial border","General","Normal",12.0,0],["C73","","","Partial border","General","Normal",12.0,0],["D73","","","Outside borders","Center","Normal",11.0,0],["E73","","","Outside borders","Center","Normal",12.0,0],["F73","","","Outside borders","Center","Normal",12.0,0],["G73","","","Outside borders","Center","Normal",12.0,0],["H73","","","Outside borders","Center","Normal",12.0,0],["I73","","","Outside borders","Center","Normal",12.0,0],["J73","","","Outside borders","Center","Normal",12.0,0],["K73","","","Outside borders","Center","Normal",12.0,0],["L73","","","Outside borders","Center","Normal",12.0,0],["M73","","","Outside borders","Center","Normal",12.0,0],["N73","","","Outside borders","Center","Normal",12.0,0],["O73","","","Outside borders","Center","Normal",12.0,0],["P73","","","Outside borders","Center","Normal",12.0,0],["Q73","","","Outside borders","Center","Normal",12.0,0],["R73","","","Outside borders","Center","Normal",12.0,0],["S73","","","Outside borders","Center","Normal",12.0,0],["T73","","","Outside borders","Center","Normal",12.0,0],["U73","","","Outside borders","Center","Normal",12.0,0],["V73","","","Outside borders","Center","Normal",12.0,0],["W73","","","Outside borders","Center","Normal",12.0,0],["X73","","","Outside borders","Center","Normal",12.0,0],["Y73","","","Outside borders","Center","Normal",12.0,0],["Z73","","","Outside borders","Center","Normal",12.0,0],["AA73","","","Outside borders","Center","Normal",12.0,0],["AB73","","","Outside borders","Center","Normal",12.0,0],["AC73","","","Outside borders","Center","Normal",12.0,0],["AD73","","","Outside borders","Center","Normal",12.0,0],["AE73","","","Outside borders","Center","Normal",12.0,0],["AF73:AK73","","","Partial border","General","Normal",11.0,0],["A74","","","Outside borders","General","Normal",11.0,0],["B74","","","Partial border","General","Normal",12.0,0],["C74","","","Partial border","General","Normal",12.0,0],["D74","","","Outside borders","Center","Normal",11.0,0],["E74","","","Outside borders","Center","Normal",12.0,0],["F74","","","Outside borders","Center","Normal",12.0,0],["G74","","","Outside borders","Center","Normal",12.0,0],["H74","","","Outside borders","Center","Normal",12.0,0],["I74","","","Outside borders","Center","Normal",12.0,0],["J74","","","Outside borders","Center","Normal",12.0,0],["K74","","","Outside borders","Center","Normal",12.0,0],["L74","","","Outside borders","Center","Normal",12.0,0],["M74","","","Outside borders","Center","Normal",12.0,0],["N74","","","Outside borders","Center","Normal",12.0,0],["O74","","","Outside borders","Center","Normal",12.0,0],["P74","","","Outside borders","Center","Normal",12.0,0],["Q74","","","Outside borders","Center","Normal",12.0,0],["R74","","","Outside borders","Center","Normal",12.0,0],["S74","","","Outside borders","Center","Normal",12.0,0],["T74","","","Outside borders","Center","Normal",12.0,0],["U74","","","Outside borders","Center","Normal",12.0,0],["V74","","","Outside borders","Center","Normal",12.0,0],["W74","","","Outside borders","Center","Normal",12.0,0],["X74","","","Outside borders","Center","Normal",12.0,0],["Y74","","","Outside borders","Center","Normal",12.0,0],["Z74","","","Outside borders","Center","Normal",12.0,0],["AA74","","","Outside borders","Center","Normal",12.0,0],["AB74","","","Outside borders","Center","Normal",12.0,0],["AC74","","","Outside borders","Center","Normal",12.0,0],["AD74","","","Outside borders","Center","Normal",12.0,0],["AE74","","","Outside borders","Center","Normal",12.0,0],["AF74:AK74","","","Partial border","General","Normal",11.0,0],["A75","","","Outside borders","General","Normal",11.0,0],["B75","","","Partial border","General","Normal",12.0,0],["C75","","","Partial border","General","Normal",12.0,0],["D75","","","Outside borders","Center","Normal",11.0,0],["E75","","","Outside borders","Center","Normal",12.0,0],["F75","","","Outside borders","Center","Normal",12.0,0],["G75","","","Outside borders","Center","Normal",12.0,0],["H75","","","Outside borders","Center","Normal",12.0,0],["I75","","","Outside borders","Center","Normal",12.0,0],["J75","","","Outside borders","Center","Normal",12.0,0],["K75","","","Outside borders","Center","Normal",12.0,0],["L75","","","Outside borders","Center","Normal",12.0,0],["M75","","","Outside borders","Center","Normal",12.0,0],["N75","","","Outside borders","Center","Normal",12.0,0],["O75","","","Outside borders","Center","Normal",12.0,0],["P75","","","Outside borders","Center","Normal",12.0,0],["Q75","","","Outside borders","Center","Normal",12.0,0],["R75","","","Outside borders","Center","Normal",12.0,0],["S75","","","Outside borders","Center","Normal",12.0,0],["T75","","","Outside borders","Center","Normal",12.0,0],["U75","","","Outside borders","Center","Normal",12.0,0],["V75","","","Outside borders","Center","Normal",12.0,0],["W75","","","Outside borders","Center","Normal",12.0,0],["X75","","","Outside borders","Center","Normal",12.0,0],["Y75","","","Outside borders","Center","Normal",12.0,0],["Z75","","","Outside borders","Center","Normal",12.0,0],["AA75","","","Outside borders","Center","Normal",12.0,0],["AB75","","","Outside borders","Center","Normal",12.0,0],["AC75","","","Outside borders","Center","Normal",12.0,0],["AD75","","","Outside borders","Center","Normal",12.0,0],["AE75","","","Outside borders","Center","Normal",12.0,0],["AF75:AK75","","","Partial border","General","Normal",11.0,0],["A76","","","Outside borders","General","Normal",11.0,0],["B76","","","Partial border","General","Normal",12.0,0],["C76","","","Partial border","General","Normal",12.0,0],["D76","","","Outside borders","Center","Normal",11.0,0],["E76","","","Outside borders","Center","Normal",12.0,0],["F76","","","Outside borders","Center","Normal",12.0,0],["G76","","","Outside borders","Center","Normal",12.0,0],["H76","","","Outside borders","Center","Normal",12.0,0],["I76","","","Outside borders","Center","Normal",12.0,0],["J76","","","Outside borders","Center","Normal",12.0,0],["K76","","","Outside borders","Center","Normal",12.0,0],["L76","","","Outside borders","Center","Normal",12.0,0],["M76","","","Outside borders","Center","Normal",12.0,0],["N76","","","Outside borders","Center","Normal",12.0,0],["O76","","","Outside borders","Center","Normal",12.0,0],["P76","","","Outside borders","Center","Normal",12.0,0],["Q76","","","Outside borders","Center","Normal",12.0,0],["R76","","","Outside borders","Center","Normal",12.0,0],["S76","","","Outside borders","Center","Normal",12.0,0],["T76","","","Outside borders","Center","Normal",12.0,0],["U76","","","Outside borders","Center","Normal",12.0,0],["V76","","","Outside borders","Center","Normal",12.0,0],["W76","","","Outside borders","Center","Normal",12.0,0],["X76","","","Outside borders","Center","Normal",12.0,0],["Y76","","","Outside borders","Center","Normal",12.0,0],["Z76","","","Outside borders","Center","Normal",12.0,0],["AA76","","","Outside borders","Center","Normal",12.0,0],["AB76","","","Outside borders","Center","Normal",12.0,0],["AC76","","","Outside borders","Center","Normal",12.0,0],["AD76","","","Outside borders","Center","Normal",12.0,0],["AE76","","","Outside borders","Center","Normal",12.0,0],["AF76:AK76","","","Partial border","General","Normal",11.0,0],["A77","","","Outside borders","General","Normal",11.0,0],["B77","","","Partial border","General","Normal",12.0,0],["C77","","","Partial border","General","Normal",12.0,0],["D77","","","Outside borders","Center","Normal",11.0,0],["E77","","","Outside borders","Center","Normal",12.0,0],["F77","","","Outside borders","Center","Normal",12.0,0],["G77","","","Outside borders","Center","Normal",12.0,0],["H77","","","Outside borders","Center","Normal",12.0,0],["I77","","","Outside borders","Center","Normal",12.0,0],["J77","","","Outside borders","Center","Normal",12.0,0],["K77","","","Outside borders","Center","Normal",12.0,0],["L77","","","Outside borders","Center","Normal",12.0,0],["M77","","","Outside borders","Center","Normal",12.0,0],["N77","","","Outside borders","Center","Normal",12.0,0],["O77","","","Outside borders","Center","Normal",12.0,0],["P77","","","Outside borders","Center","Normal",12.0,0],["Q77","","","Outside borders","Center","Normal",12.0,0],["R77","","","Outside borders","Center","Normal",12.0,0],["S77","","","Outside borders","Center","Normal",12.0,0],["T77","","","Outside borders","Center","Normal",12.0,0],["U77","","","Outside borders","Center","Normal",12.0,0],["V77","","","Outside borders","Center","Normal",12.0,0],["W77","","","Outside borders","Center","Normal",12.0,0],["X77","","","Outside borders","Center","Normal",12.0,0],["Y77","","","Outside borders","Center","Normal",12.0,0],["Z77","","","Outside borders","Center","Normal",12.0,0],["AA77","","","Outside borders","Center","Normal",12.0,0],["AB77","","","Outside borders","Center","Normal",12.0,0],["AC77","","","Outside borders","Center","Normal",12.0,0],["AD77","","","Outside borders","Center","Normal",12.0,0],["AE77","","","Outside borders","Center","Normal",12.0,0],["AF77:AK77","","","Partial border","General","Normal",11.0,0],["A78","","","Outside borders","General","Normal",11.0,0],["B78","","","Partial border","General","Normal",12.0,0],["C78","","","Partial border","General","Normal",12.0,0],["D78","","","Outside borders","Center","Normal",11.0,0],["E78","","","Outside borders","Center","Normal",12.0,0],["F78","","","Outside borders","Center","Normal",12.0,0],["G78","","","Outside borders","Center","Normal",12.0,0],["H78","","","Outside borders","Center","Normal",12.0,0],["I78","","","Outside borders","Center","Normal",12.0,0],["J78","","","Outside borders","Center","Normal",12.0,0],["K78","","","Outside borders","Center","Normal",12.0,0],["L78","","","Outside borders","Center","Normal",12.0,0],["M78","","","Outside borders","Center","Normal",12.0,0],["N78","","","Outside borders","Center","Normal",12.0,0],["O78","","","Outside borders","Center","Normal",12.0,0],["P78","","","Outside borders","Center","Normal",12.0,0],["Q78","","","Outside borders","Center","Normal",12.0,0],["R78","","","Outside borders","Center","Normal",12.0,0],["S78","","","Outside borders","Center","Normal",12.0,0],["T78","","","Outside borders","Center","Normal",12.0,0],["U78","","","Outside borders","Center","Normal",12.0,0],["V78","","","Outside borders","Center","Normal",12.0,0],["W78","","","Outside borders","Center","Normal",12.0,0],["X78","","","Outside borders","Center","Normal",12.0,0],["Y78","","","Outside borders","Center","Normal",12.0,0],["Z78","","","Outside borders","Center","Normal",12.0,0],["AA78","","","Outside borders","Center","Normal",12.0,0],["AB78","","","Outside borders","Center","Normal",12.0,0],["AC78","","","Outside borders","Center","Normal",12.0,0],["AD78","","","Outside borders","Center","Normal",12.0,0],["AE78","","","Outside borders","Center","Normal",12.0,0],["AF78:AK78","","","Partial border","General","Normal",11.0,0],["A79","","","Outside borders","General","Normal",11.0,0],["B79","","","Partial border","General","Normal",12.0,0],["C79","","","Partial border","General","Normal",12.0,0],["D79","","","Outside borders","Center","Normal",11.0,0],["E79","","","Outside borders","Center","Normal",12.0,0],["F79","","","Outside borders","Center","Normal",12.0,0],["G79","","","Outside borders","Center","Normal",12.0,0],["H79","","","Outside borders","Center","Normal",12.0,0],["I79","","","Outside borders","Center","Normal",12.0,0],["J79","","","Outside borders","Center","Normal",12.0,0],["K79","","","Outside borders","Center","Normal",12.0,0],["L79","","","Outside borders","Center","Normal",12.0,0],["M79","","","Outside borders","Center","Normal",12.0,0],["N79","","","Outside borders","Center","Normal",12.0,0],["O79","","","Outside borders","Center","Normal",12.0,0],["P79","","","Outside borders","Center","Normal",12.0,0],["Q79","","","Outside borders","Center","Normal",12.0,0],["R79","","","Outside borders","Center","Normal",12.0,0],["S79","","","Outside borders","Center","Normal",12.0,0],["T79","","","Outside borders","Center","Normal",12.0,0],["U79","","","Outside borders","Center","Normal",12.0,0],["V79","","","Outside borders","Center","Normal",12.0,0],["W79","","","Outside borders","Center","Normal",12.0,0],["X79","","","Outside borders","Center","Normal",12.0,0],["Y79","","","Outside borders","Center","Normal",12.0,0],["Z79","","","Outside borders","Center","Normal",12.0,0],["AA79","","","Outside borders","Center","Normal",12.0,0],["AB79","","","Outside borders","Center","Normal",12.0,0],["AC79","","","Outside borders","Center","Normal",12.0,0],["AD79","","","Outside borders","Center","Normal",12.0,0],["AE79","","","Outside borders","Center","Normal",12.0,0],["AF79:AK79","","","Partial border","General","Normal",11.0,0],["A80","","","Outside borders","General","Normal",11.0,0],["B80","","","Partial border","General","Normal",12.0,0],["C80","","","Partial border","General","Normal",12.0,0],["D80","","","Outside borders","Center","Normal",11.0,0],["E80","","","Outside borders","Center","Normal",12.0,0],["F80","","","Outside borders","Center","Normal",12.0,0],["G80","","","Outside borders","Center","Normal",12.0,0],["H80","","","Outside borders","Center","Normal",12.0,0],["I80","","","Outside borders","Center","Normal",12.0,0],["J80","","","Outside borders","Center","Normal",12.0,0],["K80","","","Outside borders","Center","Normal",12.0,0],["L80","","","Outside borders","Center","Normal",12.0,0],["M80","","","Outside borders","Center","Normal",12.0,0],["N80","","","Outside borders","Center","Normal",12.0,0],["O80","","","Outside borders","Center","Normal",12.0,0],["P80","","","Outside borders","Center","Normal",12.0,0],["Q80","","","Outside borders","Center","Normal",12.0,0],["R80","","","Outside borders","Center","Normal",12.0,0],["S80","","","Outside borders","Center","Normal",12.0,0],["T80","","","Outside borders","Center","Normal",12.0,0],["U80","","","Outside borders","Center","Normal",12.0,0],["V80","","","Outside borders","Center","Normal",12.0,0],["W80","","","Outside borders","Center","Normal",12.0,0],["X80","","","Outside borders","Center","Normal",12.0,0],["Y80","","","Outside borders","Center","Normal",12.0,0],["Z80","","","Outside borders","Center","Normal",12.0,0],["AA80","","","Outside borders","Center","Normal",12.0,0],["AB80","","","Outside borders","Center","Normal",12.0,0],["AC80","","","Outside borders","Center","Normal",12.0,0],["AD80","","","Outside borders","Center","Normal",12.0,0],["AE80","","","Outside borders","Center","Normal",12.0,0],["AF80:AK80","","","Partial border","General","Normal",11.0,0],["A81","","","Outside borders","General","Normal",11.0,0],["B81","","","Partial border","General","Normal",12.0,0],["C81","","","Partial border","General","Normal",12.0,0],["D81","","","Outside borders","Center","Normal",11.0,0],["E81","","","Outside borders","Center","Normal",12.0,0],["F81","","","Outside borders","Center","Normal",12.0,0],["G81","","","Outside borders","Center","Normal",12.0,0],["H81","","","Outside borders","Center","Normal",12.0,0],["I81","","","Outside borders","Center","Normal",12.0,0],["J81","","","Outside borders","Center","Normal",12.0,0],["K81","","","Outside borders","Center","Normal",12.0,0],["L81","","","Outside borders","Center","Normal",12.0,0],["M81","","","Outside borders","Center","Normal",12.0,0],["N81","","","Outside borders","Center","Normal",12.0,0],["O81","","","Outside borders","Center","Normal",12.0,0],["P81","","","Outside borders","Center","Normal",12.0,0],["Q81","","","Outside borders","Center","Normal",12.0,0],["R81","","","Outside borders","Center","Normal",12.0,0],["S81","","","Outside borders","Center","Normal",12.0,0],["T81","","","Outside borders","Center","Normal",12.0,0],["U81","","","Outside borders","Center","Normal",12.0,0],["V81","","","Outside borders","Center","Normal",12.0,0],["W81","","","Outside borders","Center","Normal",12.0,0],["X81","","","Outside borders","Center","Normal",12.0,0],["Y81","","","Outside borders","Center","Normal",12.0,0],["Z81","","","Outside borders","Center","Normal",12.0,0],["AA81","","","Outside borders","Center","Normal",12.0,0],["AB81","","","Outside borders","Center","Normal",12.0,0],["AC81","","","Outside borders","Center","Normal",12.0,0],["AD81","","","Outside borders","Center","Normal",12.0,0],["AE81","","","Outside borders","Center","Normal",12.0,0],["AF81:AK81","","","Partial border","General","Normal",11.0,0],["A82","","","Outside borders","General","Normal",11.0,0],["B82","","","Partial border","Left","Normal",12.0,0],["C82","","","Partial border","General","Normal",12.0,0],["D82","","","Outside borders","Center","Normal",11.0,0],["E82","","","Outside borders","Center","Normal",12.0,0],["F82","","","Outside borders","Center","Normal",12.0,0],["G82","","","Outside borders","Center","Normal",12.0,0],["H82","","","Outside borders","Center","Normal",12.0,0],["I82","","","Outside borders","Center","Normal",12.0,0],["J82","","","Outside borders","Center","Normal",12.0,0],["K82","","","Outside borders","Center","Normal",12.0,0],["L82","","","Outside borders","Center","Normal",12.0,0],["M82","","","Outside borders","Center","Normal",12.0,0],["N82","","","Outside borders","Center","Normal",12.0,0],["O82","","","Outside borders","Center","Normal",12.0,0],["P82","","","Outside borders","Center","Normal",12.0,0],["Q82","","","Outside borders","Center","Normal",12.0,0],["R82","","","Outside borders","Center","Normal",12.0,0],["S82","","","Outside borders","Center","Normal",12.0,0],["T82","","","Outside borders","Center","Normal",12.0,0],["U82","","","Outside borders","Center","Normal",12.0,0],["V82","","","Outside borders","Center","Normal",12.0,0],["W82","","","Outside borders","Center","Normal",12.0,0],["X82","","","Outside borders","Center","Normal",12.0,0],["Y82","","","Outside borders","Center","Normal",12.0,0],["Z82","","","Outside borders","Center","Normal",12.0,0],["AA82","","","Outside borders","Center","Normal",12.0,0],["AB82","","","Outside borders","Center","Normal",12.0,0],["AC82","","","Outside borders","Center","Normal",12.0,0],["AD82","","","Outside borders","Center","Normal",12.0,0],["AE82","","","Outside borders","Center","Normal",12.0,0],["AF82:AK82","","","Partial border","General","Normal",11.0,0],["A83","","","Outside borders","General","Normal",11.0,0],["B83","","","Partial border","Left","Normal",12.0,0],["C83","","","Partial border","General","Normal",12.0,0],["D83","","","Outside borders","Center","Normal",11.0,0],["E83","","","Outside borders","Center","Normal",12.0,0],["F83","","","Outside borders","Center","Normal",12.0,0],["G83","","","Outside borders","Center","Normal",12.0,0],["H83","","","Outside borders","Center","Normal",12.0,0],["I83","","","Outside borders","Center","Normal",12.0,0],["J83","","","Outside borders","Center","Normal",12.0,0],["K83","","","Outside borders","Center","Normal",12.0,0],["L83","","","Outside borders","Center","Normal",12.0,0],["M83","","","Outside borders","Center","Normal",12.0,0],["N83","","","Outside borders","Center","Normal",12.0,0],["O83","","","Outside borders","Center","Normal",12.0,0],["P83","","","Outside borders","Center","Normal",12.0,0],["Q83","","","Outside borders","Center","Normal",12.0,0],["R83","","","Outside borders","Center","Normal",12.0,0],["S83","","","Outside borders","Center","Normal",12.0,0],["T83","","","Outside borders","Center","Normal",12.0,0],["U83","","","Outside borders","Center","Normal",12.0,0],["V83","","","Outside borders","Center","Normal",12.0,0],["W83","","","Outside borders","Center","Normal",12.0,0],["X83","","","Outside borders","Center","Normal",12.0,0],["Y83","","","Outside borders","Center","Normal",12.0,0],["Z83","","","Outside borders","Center","Normal",12.0,0],["AA83","","","Outside borders","Center","Normal",12.0,0],["AB83","","","Outside borders","Center","Normal",12.0,0],["AC83","","","Outside borders","Center","Normal",12.0,0],["AD83","","","Outside borders","Center","Normal",12.0,0],["AE83","","","Outside borders","Center","Normal",12.0,0],["AF83:AK83","","","Partial border","General","Normal",11.0,0],["A84","","","Outside borders","General","Normal",11.0,0],["B84","","","Partial border","Left","Normal",12.0,0],["C84","","","Partial border","General","Normal",12.0,0],["D84","","","Outside borders","Center","Normal",11.0,0],["E84","","","Outside borders","Center","Normal",12.0,0],["F84","","","Outside borders","Center","Normal",12.0,0],["G84","","","Outside borders","Center","Normal",12.0,0],["H84","","","Outside borders","Center","Normal",12.0,0],["I84","","","Outside borders","Center","Normal",12.0,0],["J84","","","Outside borders","Center","Normal",12.0,0],["K84","","","Outside borders","Center","Normal",12.0,0],["L84","","","Outside borders","Center","Normal",12.0,0],["M84","","","Outside borders","Center","Normal",12.0,0],["N84","","","Outside borders","Center","Normal",12.0,0],["O84","","","Outside borders","Center","Normal",12.0,0],["P84","","","Outside borders","Center","Normal",12.0,0],["Q84","","","Outside borders","Center","Normal",12.0,0],["R84","","","Outside borders","Center","Normal",12.0,0],["S84","","","Outside borders","Center","Normal",12.0,0],["T84","","","Outside borders","Center","Normal",12.0,0],["U84","","","Outside borders","Center","Normal",12.0,0],["V84","","","Outside borders","Center","Normal",12.0,0],["W84","","","Outside borders","Center","Normal",12.0,0],["X84","","","Outside borders","Center","Normal",12.0,0],["Y84","","","Outside borders","Center","Normal",12.0,0],["Z84","","","Outside borders","Center","Normal",12.0,0],["AA84","","","Outside borders","Center","Normal",12.0,0],["AB84","","","Outside borders","Center","Normal",12.0,0],["AC84","","","Outside borders","Center","Normal",12.0,0],["AD84","","","Outside borders","Center","Normal",12.0,0],["AE84","","","Outside borders","Center","Normal",12.0,0],["AF84:AK84","","","Partial border","General","Normal",11.0,0],["A85","","","Outside borders","General","Normal",11.0,0],["B85","","","Partial border","Left","Normal",12.0,0],["C85","","","Partial border","General","Normal",12.0,0],["D85","","","Outside borders","Center","Normal",11.0,0],["E85","","","Outside borders","Center","Normal",12.0,0],["F85","","","Outside borders","Center","Normal",12.0,0],["G85","","","Outside borders","Center","Normal",12.0,0],["H85","","","Outside borders","Center","Normal",12.0,0],["I85","","","Outside borders","Center","Normal",12.0,0],["J85","","","Outside borders","Center","Normal",12.0,0],["K85","","","Outside borders","Center","Normal",12.0,0],["L85","","","Outside borders","Center","Normal",12.0,0],["M85","","","Outside borders","Center","Normal",12.0,0],["N85","","","Outside borders","Center","Normal",12.0,0],["O85","","","Outside borders","Center","Normal",12.0,0],["P85","","","Outside borders","Center","Normal",12.0,0],["Q85","","","Outside borders","Center","Normal",12.0,0],["R85","","","Outside borders","Center","Normal",12.0,0],["S85","","","Outside borders","Center","Normal",12.0,0],["T85","","","Outside borders","Center","Normal",12.0,0],["U85","","","Outside borders","Center","Normal",12.0,0],["V85","","","Outside borders","Center","Normal",12.0,0],["W85","","","Outside borders","Center","Normal",12.0,0],["X85","","","Outside borders","Center","Normal",12.0,0],["Y85","","","Outside borders","Center","Normal",12.0,0],["Z85","","","Outside borders","Center","Normal",12.0,0],["AA85","","","Outside borders","Center","Normal",12.0,0],["AB85","","","Outside borders","Center","Normal",12.0,0],["AC85","","","Outside borders","Center","Normal",12.0,0],["AD85","","","Outside borders","Center","Normal",12.0,0],["AE85","","","Outside borders","Center","Normal",12.0,0],["AF85:AK85","","","Partial border","General","Normal",11.0,0],["A86","","","Outside borders","General","Normal",11.0,0],["B86","","","Partial border","Left","Normal",12.0,0],["C86","","","Partial border","General","Normal",12.0,0],["D86","","","Outside borders","Center","Normal",11.0,0],["E86","","","Outside borders","Center","Normal",12.0,0],["F86","","","Outside borders","Center","Normal",12.0,0],["G86","","","Outside borders","Center","Normal",12.0,0],["H86","","","Outside borders","Center","Normal",12.0,0],["I86","","","Outside borders","Center","Normal",12.0,0],["J86","","","Outside borders","Center","Normal",12.0,0],["K86","","","Outside borders","Center","Normal",12.0,0],["L86","","","Outside borders","Center","Normal",12.0,0],["M86","","","Outside borders","Center","Normal",12.0,0],["N86","","","Outside borders","Center","Normal",12.0,0],["O86","","","Outside borders","Center","Normal",12.0,0],["P86","","","Outside borders","Center","Normal",12.0,0],["Q86","","","Outside borders","Center","Normal",12.0,0],["R86","","","Outside borders","Center","Normal",12.0,0],["S86","","","Outside borders","Center","Normal",12.0,0],["T86","","","Outside borders","Center","Normal",12.0,0],["U86","","","Outside borders","Center","Normal",12.0,0],["V86","","","Outside borders","Center","Normal",12.0,0],["W86","","","Outside borders","Center","Normal",12.0,0],["X86","","","Outside borders","Center","Normal",12.0,0],["Y86","","","Outside borders","Center","Normal",12.0,0],["Z86","","","Outside borders","Center","Normal",12.0,0],["AA86","","","Outside borders","Center","Normal",12.0,0],["AB86","","","Outside borders","Center","Normal",12.0,0],["AC86","","","Outside borders","Center","Normal",12.0,0],["AD86","","","Outside borders","Center","Normal",12.0,0],["AE86","","","Outside borders","Center","Normal",12.0,0],["AF86:AK86","","","Partial border","General","Normal",11.0,0],["A87","","","Outside borders","General","Normal",11.0,0],["B87","","","Partial border","Left","Normal",12.0,0],["C87","","","Partial border","General","Normal",12.0,0],["D87","","","Outside borders","Center","Normal",11.0,0],["E87","","","Outside borders","Center","Normal",12.0,0],["F87","","","Outside borders","Center","Normal",12.0,0],["G87","","","Outside borders","Center","Normal",12.0,0],["H87","","","Outside borders","Center","Normal",12.0,0],["I87","","","Outside borders","Center","Normal",12.0,0],["J87","","","Outside borders","Center","Normal",12.0,0],["K87","","","Outside borders","Center","Normal",12.0,0],["L87","","","Outside borders","Center","Normal",12.0,0],["M87","","","Outside borders","Center","Normal",12.0,0],["N87","","","Outside borders","Center","Normal",12.0,0],["O87","","","Outside borders","Center","Normal",12.0,0],["P87","","","Outside borders","Center","Normal",12.0,0],["Q87","","","Outside borders","Center","Normal",12.0,0],["R87","","","Outside borders","Center","Normal",12.0,0],["S87","","","Outside borders","Center","Normal",12.0,0],["T87","","","Outside borders","Center","Normal",12.0,0],["U87","","","Outside borders","Center","Normal",12.0,0],["V87","","","Outside borders","Center","Normal",12.0,0],["W87","","","Outside borders","Center","Normal",12.0,0],["X87","","","Outside borders","Center","Normal",12.0,0],["Y87","","","Outside borders","Center","Normal",12.0,0],["Z87","","","Outside borders","Center","Normal",12.0,0],["AA87","","","Outside borders","Center","Normal",12.0,0],["AB87","","","Outside borders","Center","Normal",12.0,0],["AC87","","","Outside borders","Center","Normal",12.0,0],["AD87","","","Outside borders","Center","Normal",12.0,0],["AE87","","","Outside borders","Center","Normal",12.0,0],["AF87:AK87","","","Partial border","General","Normal",11.0,0],["A88","","","Outside borders","General","Normal",11.0,0],["B88","","","Partial border","Left","Normal",12.0,0],["C88","","","Partial border","General","Normal",12.0,0],["D88","","","Outside borders","Center","Normal",11.0,0],["E88","","","Outside borders","Center","Normal",12.0,0],["F88","","","Outside borders","Center","Normal",12.0,0],["G88","","","Outside borders","Center","Normal",12.0,0],["H88","","","Outside borders","Center","Normal",12.0,0],["I88","","","Outside borders","Center","Normal",12.0,0],["J88","","","Outside borders","Center","Normal",12.0,0],["K88","","","Outside borders","Center","Normal",12.0,0],["L88","","","Outside borders","Center","Normal",12.0,0],["M88","","","Outside borders","Center","Normal",12.0,0],["N88","","","Outside borders","Center","Normal",12.0,0],["O88","","","Outside borders","Center","Normal",12.0,0],["P88","","","Outside borders","Center","Normal",12.0,0],["Q88","","","Outside borders","Center","Normal",12.0,0],["R88","","","Outside borders","Center","Normal",12.0,0],["S88","","","Outside borders","Center","Normal",12.0,0],["T88","","","Outside borders","Center","Normal",12.0,0],["U88","","","Outside borders","Center","Normal",12.0,0],["V88","","","Outside borders","Center","Normal",12.0,0],["W88","","","Outside borders","Center","Normal",12.0,0],["X88","","","Outside borders","Center","Normal",12.0,0],["Y88","","","Outside borders","Center","Normal",12.0,0],["Z88","","","Outside borders","Center","Normal",12.0,0],["AA88","","","Outside borders","Center","Normal",12.0,0],["AB88","","","Outside borders","Center","Normal",12.0,0],["AC88","","","Outside borders","Center","Normal",12.0,0],["AD88","","","Outside borders","Center","Normal",12.0,0],["AE88","","","Outside borders","Center","Normal",12.0,0],["AF88:AK88","","","Partial border","General","Normal",11.0,0],["A89","","","Outside borders","General","Normal",11.0,0],["B89","","","Partial border","Left","Normal",12.0,0],["C89","","","Partial border","General","Normal",12.0,0],["D89","","","Outside borders","Center","Normal",11.0,0],["E89","","","Outside borders","Center","Normal",12.0,0],["F89","","","Outside borders","Center","Normal",12.0,0],["G89","","","Outside borders","Center","Normal",12.0,0],["H89","","","Outside borders","Center","Normal",12.0,0],["I89","","","Outside borders","Center","Normal",12.0,0],["J89","","","Outside borders","Center","Normal",12.0,0],["K89","","","Outside borders","Center","Normal",12.0,0],["L89","","","Outside borders","Center","Normal",12.0,0],["M89","","","Outside borders","Center","Normal",12.0,0],["N89","","","Outside borders","Center","Normal",12.0,0],["O89","","","Outside borders","Center","Normal",12.0,0],["P89","","","Outside borders","Center","Normal",12.0,0],["Q89","","","Outside borders","Center","Normal",12.0,0],["R89","","","Outside borders","Center","Normal",12.0,0],["S89","","","Outside borders","Center","Normal",12.0,0],["T89","","","Outside borders","Center","Normal",12.0,0],["U89","","","Outside borders","Center","Normal",12.0,0],["V89","","","Outside borders","Center","Normal",12.0,0],["W89","","","Outside borders","Center","Normal",12.0,0],["X89","","","Outside borders","Center","Normal",12.0,0],["Y89","","","Outside borders","Center","Normal",12.0,0],["Z89","","","Outside borders","Center","Normal",12.0,0],["AA89","","","Outside borders","Center","Normal",12.0,0],["AB89","","","Outside borders","Center","Normal",12.0,0],["AC89","","","Outside borders","Center","Normal",12.0,0],["AD89","","","Outside borders","Center","Normal",12.0,0],["AE89","","","Outside borders","Center","Normal",12.0,0],["AF89:AK89","","","Partial border","General","Normal",11.0,0],["A90","","","Outside borders","General","Normal",11.0,0],["B90","","","Partial border","Left","Normal",12.0,0],["C90","","","Partial border","General","Normal",12.0,0],["D90","","","Outside borders","Center","Normal",11.0,0],["E90","","","Outside borders","Center","Normal",12.0,0],["F90","","","Outside borders","Center","Normal",12.0,0],["G90","","","Outside borders","Center","Normal",12.0,0],["H90","","","Outside borders","Center","Normal",12.0,0],["I90","","","Outside borders","Center","Normal",12.0,0],["J90","","","Outside borders","Center","Normal",12.0,0],["K90","","","Outside borders","Center","Normal",12.0,0],["L90","","","Outside borders","Center","Normal",12.0,0],["M90","","","Outside borders","Center","Normal",12.0,0],["N90","","","Outside borders","Center","Normal",12.0,0],["O90","","","Outside borders","Center","Normal",12.0,0],["P90","","","Outside borders","Center","Normal",12.0,0],["Q90","","","Outside borders","Center","Normal",12.0,0],["R90","","","Outside borders","Center","Normal",12.0,0],["S90","","","Outside borders","Center","Normal",12.0,0],["T90","","","Outside borders","Center","Normal",12.0,0],["U90","","","Outside borders","Center","Normal",12.0,0],["V90","","","Outside borders","Center","Normal",12.0,0],["W90","","","Outside borders","Center","Normal",12.0,0],["X90","","","Outside borders","Center","Normal",12.0,0],["Y90","","","Outside borders","Center","Normal",12.0,0],["Z90","","","Outside borders","Center","Normal",12.0,0],["AA90","","","Outside borders","Center","Normal",12.0,0],["AB90","","","Outside borders","Center","Normal",12.0,0],["AC90","","","Outside borders","Center","Normal",12.0,0],["AD90","","","Outside borders","Center","Normal",12.0,0],["AE90","","","Outside borders","Center","Normal",12.0,0],["AF90:AK90","","","Partial border","General","Normal",11.0,0],["A91","","","Outside borders","General","Normal",11.0,0],["B91","","","Partial border","Left","Normal",12.0,0],["C91","","","Partial border","General","Normal",12.0,0],["D91","","","Outside borders","Center","Normal",11.0,0],["E91","","","Outside borders","Center","Normal",12.0,0],["F91","","","Outside borders","Center","Normal",12.0,0],["G91","","","Outside borders","Center","Normal",12.0,0],["H91","","","Outside borders","Center","Normal",12.0,0],["I91","","","Outside borders","Center","Normal",12.0,0],["J91","","","Outside borders","Center","Normal",12.0,0],["K91","","","Outside borders","Center","Normal",12.0,0],["L91","","","Outside borders","Center","Normal",12.0,0],["M91","","","Outside borders","Center","Normal",12.0,0],["N91","","","Outside borders","Center","Normal",12.0,0],["O91","","","Outside borders","Center","Normal",12.0,0],["P91","","","Outside borders","Center","Normal",12.0,0],["Q91","","","Outside borders","Center","Normal",12.0,0],["R91","","","Outside borders","Center","Normal",12.0,0],["S91","","","Outside borders","Center","Normal",12.0,0],["T91","","","Outside borders","Center","Normal",12.0,0],["U91","","","Outside borders","Center","Normal",12.0,0],["V91","","","Outside borders","Center","Normal",12.0,0],["W91","","","Outside borders","Center","Normal",12.0,0],["X91","","","Outside borders","Center","Normal",12.0,0],["Y91","","","Outside borders","Center","Normal",12.0,0],["Z91","","","Outside borders","Center","Normal",12.0,0],["AA91","","","Outside borders","Center","Normal",12.0,0],["AB91","","","Outside borders","Center","Normal",12.0,0],["AC91","","","Outside borders","Center","Normal",12.0,0],["AD91","","","Outside borders","Center","Normal",12.0,0],["AE91","","","Outside borders","Center","Normal",12.0,0],["AF91:AK91","","","Partial border","General","Normal",11.0,0],["A92:C92","MALE | TOTAL Per Day","","All borders","Center","Normal",8.0,0],

["D92","","","All borders","Center","Normal",8.0,0],

["E92","","","All borders","Center","Normal",8.0,0],["F92","","","All borders","Center","Normal",8.0,0],["G92","","","All borders","Center","Normal",8.0,0],["H92","","","All borders","Center","Normal",8.0,0],["I92","","","All borders","Center","Normal",8.0,0],["J92","","","All borders","Center","Normal",8.0,0],["K92","","","All borders","Center","Normal",8.0,0],["L92","","","All borders","Center","Normal",8.0,0],["M92","","","All borders","Center","Normal",8.0,0],["N92","","","All borders","Center","Normal",8.0,0],["O92","","","All borders","Center","Normal",8.0,0],["P92","","","All borders","Center","Normal",8.0,0],["Q92","","","All borders","Center","Normal",8.0,0],["R92","","","All borders","Center","Normal",8.0,0],["S92","","","All borders","Center","Normal",8.0,0],["T92","","","All borders","Center","Normal",8.0,0],["U92","","","All borders","Center","Normal",8.0,0],["V92","","","All borders","Center","Normal",8.0,0],["W92","","","All borders","Center","Normal",8.0,0],["X92","","","All borders","Center","Normal",8.0,0],["Y92","","","All borders","Center","Normal",8.0,0],["Z92","","","All borders","Center","Normal",8.0,0],["AA92","","","All borders","Center","Normal",8.0,0],["AB92","","","All borders","Center","Normal",8.0,0],["AC92","","","All borders","Center","Normal",8.0,0],

["AD92:AE92","","","All borders","Center","Normal",8.0,0],
["AF92:AK92","","","All borders","Left","Normal",8.0,0],["A93:C93","FEMALE | TOTAL Per Day","","All borders","Center","Normal",8.0,0],
["D93","","","All borders","Center","Normal",8.0,0],

["E93","","","All borders","Center","Normal",8.0,0],["F93","","","All borders","Center","Normal",8.0,0],["G93","","","All borders","Center","Normal",8.0,0],["H93","","","All borders","Center","Normal",8.0,0],["I93","","","All borders","Center","Normal",8.0,0],["J93","","","All borders","Center","Normal",8.0,0],["K93","","","All borders","Center","Normal",8.0,0],["L93","","","All borders","Center","Normal",8.0,0],["M93","","","All borders","Center","Normal",8.0,0],["N93","","","All borders","Center","Normal",8.0,0],["O93","","","All borders","Center","Normal",8.0,0],["P93","","","All borders","Center","Normal",8.0,0],["Q93","","","All borders","Center","Normal",8.0,0],["R93","","","All borders","Center","Normal",8.0,0],["S93","","","All borders","Center","Normal",8.0,0],["T93","","","All borders","Center","Normal",8.0,0],["U93","","","All borders","Center","Normal",8.0,0],["V93","","","All borders","Center","Normal",8.0,0],["W93","","","All borders","Center","Normal",8.0,0],["X93","","","All borders","Center","Normal",8.0,0],["Y93","","","All borders","Center","Normal",8.0,0],["Z93","","","All borders","Center","Normal",8.0,0],["AA93","","","All borders","Center","Normal",8.0,0],["AB93","","","All borders","Center","Normal",8.0,0],["AC93","","","All borders","Center","Normal",8.0,0],

["AD93:AE93","","","All borders","Center","Normal",8.0,0],
["AF93:AK93","","","All borders","Left","Normal",8.0,0],["A94:C94","Combined | TOTAL PER DAY","","All borders","Center","Normal",8.0,0],
["D94","","","All borders","Center","Normal",8.0,0],

["E94","","","All borders","Center","Normal",8.0,0],["F94","","","All borders","Center","Normal",8.0,0],["G94","","","All borders","Center","Normal",8.0,0],["H94","","","All borders","Center","Normal",8.0,0],["I94","","","All borders","Center","Normal",8.0,0],["J94","","","All borders","Center","Normal",8.0,0],["K94","","","All borders","Center","Normal",8.0,0],["L94","","","All borders","Center","Normal",8.0,0],["M94","","","All borders","Center","Normal",8.0,0],["N94","","","All borders","Center","Normal",8.0,0],["O94","","","All borders","Center","Normal",8.0,0],["P94","","","All borders","Center","Normal",8.0,0],["Q94","","","All borders","Center","Normal",8.0,0],["R94","","","All borders","Center","Normal",8.0,0],["S94","","","All borders","Center","Normal",8.0,0],["T94","","","All borders","Center","Normal",8.0,0],["U94","","","All borders","Center","Normal",8.0,0],["V94","","","All borders","Center","Normal",8.0,0],["W94","","","All borders","Center","Normal",8.0,0],["X94","","","All borders","Center","Normal",8.0,0],["Y94","","","All borders","Center","Normal",8.0,0],["Z94","","","All borders","Center","Normal",8.0,0],["AA94","","","All borders","Center","Normal",8.0,0],["AB94","","","All borders","Center","Normal",8.0,0],["AC94","","","All borders","Center","Normal",8.0,0],["AD94:AE94","","","All borders","Center","Normal",8.0,0],["AF94:AK94","","","All borders","Left","Normal",8.0,0],["AF99:AG100","No. of Days of Classes: \"wrap text\"","","Top, Left, Bottom border","Right","Normal",8.0,0],["AH99:AH100","","","Top, Right, Bottom border","Center","Normal",8.0,0],["AI99:AK99","Summary","","Left, Top, Right border","Center","Normal",8.0,0],["AC100:AE100","","\"from Y4\"","Left, Bottom, Right border","Center","Normal",8.0,0],["AI100","M","","All borderss","Center","Normal",8.0,0],["AJ100","F","","All borderss","Center","Normal",8.0,0],["AK100","TOTAL","","All borderss","Center","Normal",8.0,0],["AC101:AH102","* Enrolment  as of  (1st Friday of June)","","All borderss","Center","Normal",8.0,0],["AI101:AI102","","","All borderss","Center","Normal",8.0,0],["AJ101:AJ102","","","All borderss","Center","Normal",8.0,0],["AK101:AK102","","","All borderss","Center","Normal",8.0,0],["AC103:AH104","Late Enrollment during the month (beyond cut-off)","","All borderss","Center","Normal",8.0,0],["AI103:AI104","","","All borderss","Center","Normal",8.0,0],["AJ103:AJ104","","","All borderss","Center","Normal",8.0,0],["AK103:AK104","","","All borderss","Center","Normal",8.0,0],["AC105:AH106","Registered Learners as of end of the month","","All borderss","Center","Normal",8.0,0],["AI105:AI106","","","All borderss","Center","Normal",8.0,0],["AJ105:AJ106","","","All borderss","Center","Normal",8.0,0],["AK105:AK106","","","All borderss","Center","Normal",8.0,0],["AC107:AH108","Percentage of Enrolment as of end of the month","","All borderss","Center","Normal",8.0,0],["AI107:AI108","","","All borderss","Center","Normal",8.0,0],["AJ107:AJ108","","","All borderss","Center","Normal",8.0,0],["AK107:AK108","","","All borderss","Center","Normal",8.0,0],["AC109:AH110","Average Daily Attendance","","All borderss","Center","Normal",8.0,0],["AI109:AI110","","","All borderss","Center","Normal",8.0,0],["AJ109:AJ110","","","All borderss","Center","Normal",8.0,0],["AK109:AK110","","","All borderss","Center","Normal",8.0,0],["AC111:AH112","Percentage of Attendance for the month ","","All borderss","Center","Normal",8.0,0],["AI111:AI112","","","All borderss","Center","Normal",8.0,0],["AJ111:AJ112","","","All borderss","Center","Normal",8.0,0],["AK111:AK112","","","All borderss","Center","Normal",8.0,0],["AC113:AH114","Number of students absent for 5 consecutive days:","","All borderss","Center","Normal",8.0,0],["AI113:AI114","","","All borderss","Center","Normal",8.0,0],["AJ113:AJ114","","","All borderss","Center","Normal",8.0,0],["AK113:AK114","","","All borderss","Center","Normal",8.0,0],["AC115:AH116","Drop out","","All borderss","Center","Normal",8.0,0],["AI115:AI116","","","All borderss","Center","Normal",8.0,0],["AJ115:AJ116","","","All borderss","Center","Normal",8.0,0],["AK115:AK116","","","All borderss","Center","Normal",8.0,0],["AC117:AH118","Transferred out","","All borderss","Center","Normal",8.0,0],["AI117:AI118","","","All borderss","Center","Normal",8.0,0],["AJ117:AJ118","","","All borderss","Center","Normal",8.0,0],["AK117:AK118","","","All borderss","Center","Normal",8.0,0],["AC119:AH120","Transferred in","","All borderss","Center","Normal",8.0,0],["AI119:AI120","","","All borderss","Center","Normal",8.0,0],["AJ119:AJ120","","","All borderss","Center","Normal",8.0,0],["AK119:AK120","","","All borderss","Center","Normal",8.0,0],

["AC122:AK122","I certify that this is a true and correct report.","","No border","General","Normal",8.0,0],
["AD124:AJ124","","","Bottom border","Center","Normal",8.0,0],
["AD125:AJ125","(Signature of Teacher over Printed Name)","","Partial border","Center","Normal",8.0,0],
["AC127:AK127","Attested by:","","No border","General","Normal",8.0,0],
["AD128:AJ128","","","Bottom border","Center","Normal",8.0,0],
["AD129:AJ129"," (Signature of School Head over Printed Name)","","Partial border","Center","Normal",8.0,0],

["B8:C10","LEARNER'S NAME",null,"Outside borders","Center","Normal",8.0,0],
["AF8:AK10","REMARKS",null,"Outside borders","Center","Normal",8.0,0],
["AC99:AE99","Month:",null,"Top, Left, Right border","Left","Normal",8.0,0],
["A129:P129","School Form 2 : Page ___ of ___",null,"No border","Left","Normal",14.0,0]]};

/* === SF2 Layout/Style Fixes (2026-04) === */
const SF2_FONT_SIZE_DELTA = -1;
const SF2_THIN_BORDER = 0.35;
function sf2FS(n){ const v = Number(n)||0; return Math.max(4, v + SF2_FONT_SIZE_DELTA); }
function applyTemplateFixes(tpl){
  if(!tpl || !Array.isArray(tpl.cells)) return;
  const moves = new Map([
    ['B4','B4'],
    ['C4','C4'],	
    ['H4:N4','H4:N4'],
    ['O4:T4','O4:T4'],
	['V4:AE4','V4:AE4'],
    ['AF4:AK4','AF4:AK4'],
    ['B6','B6'],
	['C6:T6','C6:T6'],
    ['U6:X6','U6:X6'],
	['Y6:AA6','Y6:AA6'],
    ['AB6:AE6','AB6:AE6'],
    ['AF6:AK6','AF6:AK6'],
  ]);
  for(const c of tpl.cells){
    if(!c || !c[0]) continue;
    if(moves.has(c[0])) c[0] = moves.get(c[0]);
    // Text edits
    if(c[0]==='U6:X6' && typeof c[1]==='string' && c[1].toLowerCase().includes('grade')) c[1]='Grade';
    if(c[0]==='AD8:AE9' && typeof c[1]==='string') c[1]='Total';
    if(typeof c[1]==='string' && c[1].toLowerCase().includes('total for the month')) c[1]='Total';
    // Remove bold everywhere
    c[5] = 'Normal';
  }
}
applyTemplateFixes(SF2_TEMPLATE);

// Range helpers
function sf2ColToNum(col){
  let n=0; for(let i=0;i<col.length;i++){ n=n*26 + (col.charCodeAt(i)-64); } return n;
}
function sf2NumToCol(n){
  let s=''; let x=n; while(x>0){ const r=(x-1)%26; s=String.fromCharCode(65+r)+s; x=Math.floor((x-1)/26); } return s;
}
function sf2CellAddr(col,row){ return `${col}${row}`; }

// Draw thin diagonals in attendance grid (E12:AC91)
function drawAttendanceDiagonals(page, ctx, env){
  if(!page || !ctx) return;
  const { rgb } = env;
  const colStart = sf2ColToNum('E');
  const colEnd = sf2ColToNum('AC');
  const color = rgb(0,0,0);
  for(let r=12;r<=91;r++){
    for(let c=colStart;c<=colEnd;c++){
      const addr = sf2CellAddr(sf2NumToCol(c), r);
      const rr = ctx.rect(addr);
      if(!rr) continue;
      // diagonal: top-left -> bottom-right
      page.drawLine({ start:{x:rr.x, y:rr.y+rr.h}, end:{x:rr.x+rr.w, y:rr.y}, thickness: SF2_THIN_BORDER, color });
    }
  }
}

// Draw outside border for B12:C91
function drawNameOutsideBorder(page, ctx, env){
  if(!page || !ctx) return;
  const r = ctx.rect('B12:C91');
  if(!r) return;
  const { rgb } = env;
  page.drawRectangle({x:r.x, y:r.y, width:r.w, height:r.h, borderColor: rgb(0,0,0), borderWidth: SF2_THIN_BORDER});
}


// ------------------------- WinAnsi sanitizer (StandardFonts limitation) -------------------------
// pdf-lib StandardFonts.Helvetica uses WinAnsi encoding and cannot encode some Unicode (e.g., arrows).
function sf2WinAnsiSafeText(input){
  const s = String(input ?? '');
  return s
    .replace(/\u2190/g, '<-')      // ←
    .replace(/\u2192/g, '->')      // →
    .replace(/[\u2013\u2014]/g, '-') // – —
    .replace(/[\u2018\u2019]/g, "'") // ‘ ’
    .replace(/[\u201C\u201D]/g, '"') // “ ”
    .replace(/\u00A0/g, ' ');      // nbsp
}


// Mark placement: T top-left, C bottom-right
function sf2DrawMark(page, rect, mark, env, font){
  if(!page || !rect || !mark) return;
  const { rgb } = env;
  const s = String(mark||'');
  const size = sf2FS(10);
  const color = rgb(0,0,0);
  const pad = 1.2;
  const tw = font.widthOfTextAtSize(s, size);
  let x = rect.x + (rect.w - tw)/2;
  let y = rect.y + (rect.h - size)/2;
  if (s === 'T') {
    x = rect.x + pad;
    y = rect.y + rect.h - size - pad;
  }
  if (s === 'C') {
    x = rect.x + rect.w - tw - pad;
    y = rect.y + pad;
  }
  page.drawText(sf2WinAnsiSafeText(s), { x, y, size, font, color });
}

// ------------------------- Meta persistence -------------------------
function sf2MetaKey(classId){ return `sf2meta-${classId}`; }
function loadSf2Meta(classId){ try{ return JSON.parse(localStorage.getItem(sf2MetaKey(classId))||'{}'); }catch(_){ return {}; } }
function saveSf2Meta(classId, meta){ try{ localStorage.setItem(sf2MetaKey(classId), JSON.stringify(meta||{})); }catch(_){ } }

// ------------------------- Modal open/close -------------------------
function openSF2PdfExportModal(){
  if(typeof currentClassId==='undefined' || !currentClassId){ alert('Select a class first!'); return; }
  const meta = loadSf2Meta(currentClassId) || {};
  const byId = (id)=>document.getElementById(id);
  byId('sf2SchoolId').value = meta.schoolId||'';
  byId('sf2SchoolYear').value = meta.schoolYear||'';
  byId('sf2SchoolName').value = meta.schoolName||'';
  byId('sf2GradeLevel').value = meta.gradeLevel||'';
  byId('sf2Section').value = meta.section||'';
  byId('sf2Teacher').value = meta.teacher||'';
  byId('sf2SchoolHead').value = meta.schoolHead||'';

  const modal = document.getElementById('sf2ExportModal');
  if(modal){ modal.style.display='block'; modal.setAttribute('aria-hidden','false'); }

  const genBtn = document.getElementById('sf2GenerateBtn');
  if(genBtn){
    genBtn.onclick = async ()=>{
      const metaNow = {
        schoolId: byId('sf2SchoolId').value.trim(),
        schoolYear: byId('sf2SchoolYear').value.trim(),
        schoolName: byId('sf2SchoolName').value.trim(),
        gradeLevel: byId('sf2GradeLevel').value.trim(),
        section: byId('sf2Section').value.trim(),
        teacher: byId('sf2Teacher').value.trim(),
        schoolHead: byId('sf2SchoolHead').value.trim(),
      };
      saveSf2Meta(currentClassId, metaNow);
      await exportSF2Pdf(metaNow, {
        debugLayout: !!window.SF2_DEBUG_LAYOUT,
        fillableMode: window.SF2_FILLABLE_MODE || 'minimal'
      });
    };
  }
}
function closeSF2PdfExportModal(){
  const modal = document.getElementById('sf2ExportModal');
  if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
}

// ------------------------- Main export -------------------------

async function exportSF2Pdf(meta, options={}){
  if(typeof PDFLib==='undefined' || !PDFLib?.PDFDocument){ alert('PDF engine not loaded (pdf-lib).'); return; }
  if(typeof currentClassId==='undefined' || !currentClassId){ alert('Select a class first!'); return; }
  const dateStr = document.getElementById('datePicker')?.value;
  if(!dateStr){ alert('Select a date first!'); return; }

  const {Y,M} = parseYM(dateStr);
  const monthText = (monthNameUpper(Y,M) + ' ' + Y);
  const slots = padTo25(weekdayDatesOfMonth(Y,M));

  // roster
  let students=[];
  try{ students = JSON.parse(localStorage.getItem(`students-${currentClassId}`)||'[]'); if(!Array.isArray(students)) students=[]; }catch(_){ students=[]; }
  if(typeof sortStudentsBySex==='function') students = sortStudentsBySex(students);

  // grid + NSD
  const nsdDates = new Set();
  const grid = buildGrid(slots, students, currentClassId, nsdDates);
  const calc = computeCalculations(slots, students, grid, nsdDates);

  // pagination
  const plan = paginateSf2Fixed(students.length);

  const { PDFDocument, StandardFonts, rgb, grayscale } = PDFLib;
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const form = pdfDoc.getForm();

  const PAGE_W=841.89, PAGE_H=595.28, margin=24;
  //const PAGE_W=330.20, PAGE_H=215.90, margin=24;
  const innerW=PAGE_W-2*margin, innerH=PAGE_H-2*margin;
  const engine = new TemplateEngine(SF2_TEMPLATE, {PAGE_W,PAGE_H,margin,innerW,innerH});

  const pages=[];
  let lastLearner=null;

  for(let pi=0; pi<plan.length; pi++){
    const p = plan[pi];
    const page = pdfDoc.addPage([PAGE_W,PAGE_H]);
    pages.push(page);

    const pageSpec = getPageSpec(p.type);
    const ctx = engine.buildPageContext(pageSpec);

    drawTemplateStatics(page, ctx, {font, fontB});
    addHeaderFields(form, page, ctx, {...meta, reportMonthText: monthText}, { font, fontB });
    drawDayHeaders(page, ctx, slots, {fontB});
    shadeNsd(page, ctx, pageSpec, slots, nsdDates, {grayscale});
    drawLearnerGrid(page, ctx, pageSpec, {rgb});

    const slice = students.slice(p.start, p.start + p.count);
    const placement = fillLearners(page, ctx, pageSpec, slice, slots, grid, calc, form, options.fillableMode||'minimal', {font, fontB}, p.start);
    if(p.count>0) lastLearner = {pageIndex:pi, hasSpace:placement.hasSpace, rect:placement.nextEmptyRowRect};

    if(p.type==='C'){
      drawTotalsPerDay(page, ctx, slots, nsdDates, calc, {fontB});
}

    drawPageNumber(page, ctx, pi+1, plan.length, {font});
    if(options.debugLayout) drawDebug(page, ctx, {font, rgb});
  }

  // ===================== Summary + Signatories (LAST PAGE ONLY) =====================
  // Pagination rule: Summary block B99:P120 and Signatories AC122:AK129 must appear ONLY on the LAST PDF page.
  const lastPage = pages[pages.length - 1];
  const lastCtx  = engine.buildPageContext(getPageSpec('C'));
    // Draw merged-cell-aware summary grid/borders (B99:P120) on LAST PAGE ONLY
  drawSummaryGrid_B99_P120(lastPage, lastCtx);
  // Draw summary labels/headings (B99:P120) on LAST PAGE ONLY
  drawSummaryLabels_B99_P120(lastPage, lastCtx, {font, fontB});
addSummaryFields(form, lastPage, lastCtx, monthText, calc, {font, fontB});
  addSignatoryFields(form, lastPage, lastCtx, meta, {font, fontB});

  if(lastLearner && lastLearner.hasSpace && lastLearner.rect){
    const page = pages[lastLearner.pageIndex];
    const r = lastLearner.rect;
    const txt = 'NOTHING FOLLOWS';
    const size = 9;
    const w = fontB.widthOfTextAtSize(txt,size);
    page.drawText(txt,{x:r.x+r.w/2-w/2,y:r.y+r.h/2-4,size,font:fontB,color:rgb(0,0,0)});
  }

  try{ form.updateFieldAppearances(font); }catch(_){ }

  const cls = (typeof getAllClasses==='function'? getAllClasses(): []).find(c=>c.id===currentClassId);
  const className = sanitizeFilename(cls?cls.name:'Class');
  const filename = `ClassTapSF2_${className}_${monthNameUpper(Y,M)}_${Y}.pdf`;
  const bytes = await pdfDoc.save();
  downloadBytes(bytes, filename, 'application/pdf');
  closeSF2PdfExportModal();
  try{ if(typeof updateDebug==='function') updateDebug('SF2 PDF exported: '+filename); }catch(_){ }
}

// ------------------------- Helpers -------------------------
function parseYM(dateStr){ const [Y,M]=String(dateStr).split('-').map(n=>parseInt(n,10)); return {Y,M}; }

function weekdayDatesOfMonth(Y, M) {
  // Returns exactly 25 weekday slots laid out as 5 weeks × 5 weekdays (Mon–Fri),
  // aligned the same way as the Excel formula in E9:AC9.
  //
  // Output: Array(25) of date strings "YYYY-MM-DD" or null (for out-of-month cells)

  // First day of target month
  const first = new Date(Y, M - 1, 1);

  // Excel WEEKDAY(date,2): Monday=1 ... Sunday=7
  const wd2 = ((first.getDay() + 6) % 7) + 1;

  // Start = Monday of the week containing the 1st,
  // unless 1st is Sat/Sun -> start at next Monday
  const start = new Date(first);
  if (wd2 >= 6) {
    // Sat(6) => +2, Sun(7) => +1
    start.setDate(first.getDate() + (8 - wd2));
  } else {
    start.setDate(first.getDate() - (wd2 - 1));
  }

  // Build 25 slots: Mon–Fri across 5 weeks
  const out = [];
  for (let i = 0; i < 25; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + 7 * Math.floor(i / 5) + (i % 5));

    // Only keep dates inside the target month; otherwise blank the cell
    if (d.getMonth() === (M - 1)) {
      out.push(
        `${Y}-${String(M).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      );
    } else {
      out.push(null);
    }
  }

  return out;
}
	
function padTo25(arr){ const out=arr.slice(0,25); while(out.length<25) out.push(null); return out; }
function monthNameUpper(Y,M){ try{ return new Date(Y,M-1,1).toLocaleString('en-US',{month:'long'}).toUpperCase(); }catch(_){ return String(M).padStart(2,'0'); } }
function sanitizeFilename(s){ return String(s||'').replace(/[^a-zA-Z0-9_\-]+/g,'_').replace(/_+$/g,''); }
function downloadBytes(bytes, filename, mime){ const blob=new Blob([bytes],{type:mime||'application/octet-stream'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); setTimeout(()=>{ try{document.body.removeChild(a);}catch(_){} try{URL.revokeObjectURL(url);}catch(_){} },250); }

// ------------------------- Pagination (SPEC) -------------------------
function paginateSf2Fixed(n){ if(n<=80) return [{type:'A',start:0,count:Math.min(30,n)},{type:'B',start:30,count:Math.max(0,Math.min(40,n-30))},{type:'C',start:70,count:Math.max(0,Math.min(10,n-70))}]; const plan=[{type:'A',start:0,count:30}]; let idx=30, remaining=n-30; const cCount=Math.min(10,remaining); remaining-=cCount; while(remaining>0){ const take=Math.min(40,remaining); plan.push({type:'B',start:idx,count:take}); idx+=take; remaining-=take; } plan.push({type:'C',start:idx,count:cCount}); return plan; }

// ------------------------- Attendance mapping -------------------------
function statusToCode(status){ const s=String(status||'').toLowerCase(); if(s==='present') return ''; if(s==='excuse') return 'E'; if(s==='tardy') return 'T'; if(s==='absent') return 'X'; if(s==='cutting') return 'C'; if(s==='pending') return 'P'; return 'P'; }
function isPresentCode(c){ return c===''||c==='E'||c==='T'; }
function isAbsentCode(c){ return c==='X'||c==='C'||c==='P'; }

function buildGrid(slots, students, classId, nsdOut){ const grid={}; students.forEach(st=>grid[st.id]={}); for(const d of slots){ if(!d) continue; if(typeof isNsdActive==='function' && isNsdActive(d,classId)){ nsdOut.add(d); students.forEach(st=>grid[st.id][d]=''); continue; } const key=`attendance-${d}-${classId}`; let dayData={}; try{ dayData=JSON.parse(localStorage.getItem(key)||'{}'); }catch(_){ dayData={}; } students.forEach(st=>{ const rec=dayData[st.id]; const status=rec&&rec.status?rec.status:'pending'; grid[st.id][d]=statusToCode(status); }); } return grid; }

function computeCalculations(slots, students, grid, nsdDates){ const classDays=slots.filter(d=>d && !nsdDates.has(d)); const males=students.filter(s=>s.sex==='Male'); const females=students.filter(s=>s.sex==='Female'); const perLearner={}; students.forEach(st=>{ let absent=0,tardy=0; classDays.forEach(d=>{ const code=(grid[st.id]&&grid[st.id][d]!=null)?grid[st.id][d]:'P'; if(isAbsentCode(code)) absent++; if(code==='T') tardy++; }); perLearner[st.id]={absent,tardy}; }); const perDay={}; classDays.forEach(d=>{ let m=0,f=0,t=0; students.forEach(st=>{ const code=(grid[st.id]&&grid[st.id][d]!=null)?grid[st.id][d]:'P'; if(isPresentCode(code)){ t++; if(st.sex==='Male') m++; else if(st.sex==='Female') f++; } }); perDay[d]={m,f,t}; }); const daysOfClasses=classDays.length; const registered=students.length; const sumM=classDays.reduce((a,d)=>a+(perDay[d]?.m||0),0); const sumF=classDays.reduce((a,d)=>a+(perDay[d]?.f||0),0); const sumT=classDays.reduce((a,d)=>a+(perDay[d]?.t||0),0); const adaM=daysOfClasses?sumM/daysOfClasses:0; const adaF=daysOfClasses?sumF/daysOfClasses:0; const adaT=daysOfClasses?sumT/daysOfClasses:0; const pctM=(males.length&&daysOfClasses)?(adaM*100/males.length):0; const pctF=(females.length&&daysOfClasses)?(adaF*100/females.length):0; const pctT=(registered&&daysOfClasses)?(adaT*100/registered):0; function longestAbsentStreak(st){ let cur=0,best=0; classDays.forEach(d=>{ const code=(grid[st.id]&&grid[st.id][d]!=null)?grid[st.id][d]:'P'; if(isAbsentCode(code)){ cur++; if(cur>best) best=cur; } else cur=0; }); return best; } let s5M=0,s5F=0,s5T=0; students.forEach(st=>{ if(longestAbsentStreak(st)>=5){ s5T++; if(st.sex==='Male') s5M++; if(st.sex==='Female') s5F++; } }); return {counts:{m:males.length,f:females.length,total:registered}, daysOfClasses, perLearner, perDay, ada:{m:adaM,f:adaF,t:adaT}, pct:{m:pctM,f:pctF,t:pctT}, streak5:{m:s5M,f:s5F,t:s5T} }; }

// ------------------------- Page spec -------------------------
function getPageSpec(type){ const headerRows=range(1,10); if(type==='A') return {type,rowSequence:headerRows.concat(range(12,41)),grid:{excelRowStart:12,rowCount:30}}; if(type==='B') return {type,rowSequence:headerRows.concat(range(42,81)),grid:{excelRowStart:42,rowCount:40}}; return {type,rowSequence:headerRows.concat(range(82,129)),grid:{excelRowStart:82,rowCount:10}}; }
function range(a,b){ const out=[]; for(let i=a;i<=b;i++) out.push(i); return out; }

// ------------------------- Template engine -------------------------
class TemplateEngine{ constructor(tpl, env){ this.tpl=tpl; this.env=env; this.cols=tpl.cols; this.rows=tpl.rows; this.colLetters=buildColLetters(); } buildPageContext(pageSpec){ const {PAGE_W,PAGE_H,margin,innerW,innerH}=this.env; const totalW=this.cols.reduce((a,w)=>a+(+w||0),0); const scaleX=innerW/totalW; const pageH=pageSpec.rowSequence.reduce((a,r)=>a+(+this.rows[r-1]||0),0); const scaleY=innerH/pageH; const xB=new Map(); let x=margin; xB.set('A',x); for(let i=0;i<this.colLetters.length;i++){ x += (+this.cols[i]||0)*scaleX; xB.set(nextCol(this.colLetters[i]), x); } const yTop=new Map(); let y=PAGE_H-margin; for(const r of pageSpec.rowSequence){ yTop.set(r,y); y -= (+this.rows[r-1]||0)*scaleY; } return new PageContext(this,pageSpec,{scaleX,scaleY,xB,yTop}); } }
class PageContext{ constructor(engine, pageSpec, g){ this.engine=engine; this.pageSpec=pageSpec; this.scaleX=g.scaleX; this.scaleY=g.scaleY; this.xB=g.xB; this.yTop=g.yTop; this.rowSet=new Set(pageSpec.rowSequence); } rect(rangeStr){ const r=parseRange(rangeStr); if(!this.rowSet.has(r.r1)||!this.rowSet.has(r.r2)) return null; const x1=this.xB.get(r.c1); const x2=this.xB.get(nextCol(r.c2)); const top=this.yTop.get(r.r1); const h=sumRows(this.engine.rows,r.r1,r.r2)*this.scaleY; return {x:x1,y:top-h,w:x2-x1,h}; } colLetterForDaySlot(i){ return numToCol(colToNum('E')+i); } }
function buildColLetters(){ const out=[]; for(let n=colToNum('A'); n<=colToNum('AK'); n++) out.push(numToCol(n)); return out; }
function parseRange(s){ const parts=String(s).split(':'); const a=parseCell(parts[0]); const b=parts[1]?parseCell(parts[1]):a; return {c1:a.col,r1:a.row,c2:b.col,r2:b.row}; }
function rangesIntersect(a,b){
  const aC1=colToNum(a.c1), aC2=colToNum(a.c2);
  const bC1=colToNum(b.c1), bC2=colToNum(b.c2);
  const colOverlap = !(aC2 < bC1 || bC2 < aC1);
  const rowOverlap = !(a.r2 < b.r1 || b.r2 < a.r1);
  return colOverlap && rowOverlap;
}

function parseCell(s){ const m=String(s).trim().match(/^([A-Z]+)(\d+)$/); if(!m) throw new Error('Bad cell: '+s); return {col:m[1],row:parseInt(m[2],10)}; }
function colToNum(col){ let n=0; for(const ch of String(col)) n=n*26+(ch.charCodeAt(0)-64); return n; }
function numToCol(n){ let s=''; while(n>0){ const r=(n-1)%26; s=String.fromCharCode(65+r)+s; n=Math.floor((n-1)/26);} return s; }
function nextCol(col){ return numToCol(colToNum(col)+1); }
function sumRows(rows,r1,r2){ let s=0; for(let r=r1;r<=r2;r++) s += (+rows[r-1]||0); return s; }

// ------------------------- Static template drawing + clipping text -------------------------
function drawTemplateStatics(page, ctx, fonts){
  const {font, fontB} = fonts;
  const cells = SF2_TEMPLATE.cells;
  const gs = ctx.pageSpec.grid.excelRowStart;
  const ge = gs + ctx.pageSpec.grid.rowCount - 1;
  const OLD_SUMMARY = parseRange('AC99:AK120'); // MUST NOT be drawn anymore

  for(const c of cells){
    let [range,text,note,border,align,style,fontSize,wrapFlag]=c;
    if(!range) continue;
    let rr;
    try{ rr = parseRange(range); }catch(_e){ continue; }
    if(!ctx.rowSet.has(rr.r1) || !ctx.rowSet.has(rr.r2)) continue;
    // skip learner grid rows to avoid double borders (we draw the full grid separately)
    if(rr.r1<=ge && rr.r2>=gs) continue;
    // skip legacy summary block (old location)
    if(rangesIntersect(rr, OLD_SUMMARY)) continue;
    const noteL = String(note||'').toLowerCase();
    if(noteL.includes('from modal')||noteL.includes('entered by')||noteL.includes('from y4')) continue;
    if(String(text||'').includes('School Form 2 : Page')) continue;
    const rect = ctx.rect(range);
    if(!rect) continue;
    drawBorders(page, rect, border);
    if(text){
      const bold = String(style||'').toLowerCase().includes('bold');
      const f = bold ? fontB : font;
      drawCellText(page, rect, text, f, clampFontSize(fontSize||8), normalizeHAlign(align), 'middle', !!wrapFlag);
    }
  }
}


function drawBorders(page,rect,borderSpec){
  const spec=String(borderSpec||'').toLowerCase();
  if(!spec||spec.includes('no border')) return;
  const thick=0.35;
  const col=PDFLib.rgb(0.2,0.2,0.2);
  if(spec.includes('outside')||spec.includes('all borders')){ page.drawRectangle({x:rect.x,y:rect.y,width:rect.w,height:rect.h,borderWidth:thick,borderColor:col}); return; }
  const left=spec.includes('left'), right=spec.includes('right'), top=spec.includes('top'), bottom=spec.includes('bottom');
  const x1=rect.x,x2=rect.x+rect.w,y1=rect.y,y2=rect.y+rect.h;
  if(left) page.drawLine({start:{x:x1,y:y1},end:{x:x1,y:y2},thickness:thick,color:col});
  if(right) page.drawLine({start:{x:x2,y:y1},end:{x:x2,y:y2},thickness:thick,color:col});
  if(top) page.drawLine({start:{x:x1,y:y2},end:{x:x2,y:y2},thickness:thick,color:col});
  if(bottom) page.drawLine({start:{x:x1,y:y1},end:{x:x2,y:y1},thickness:thick,color:col});
}

function normalizeHAlign(a){ const s=String(a||'').toLowerCase(); if(s.includes('center')) return 'center'; if(s.includes('right')) return 'right'; return 'left'; }
function clampFontSize(n){ const v=+n||11; return Math.max(6,Math.min(22,v)); }

function drawCellText(page,rect,text,font,fontSize,hAlign,vAlign,wrap){
  text = sf2WinAnsiSafeText(text);
  const padL=2,padR=2,padT=1,padB=1;
  const inner={x:rect.x+padL,y:rect.y+padB,w:rect.w-(padL+padR),h:rect.h-(padT+padB)};
  if(inner.w<=0||inner.h<=0) return;
  const measure=(s,size)=>font.widthOfTextAtSize(String(s),size);
  const base=fontSize;
  const minFont=Math.max(8,base-2);
  const lh=(size)=>size*1.15;
  let size=base;
  let lines=wrap?wrapLines(text,inner.w,size):[String(text).replace(/\s+/g,' ').trim()];
  if(!wrap){ lines[0]=truncateEllipsis(lines[0],inner.w,size); }
  else {
    while(size>minFont){ if(lines.length*lh(size)<=inner.h) break; size-=0.5; lines=wrapLines(text,inner.w,size); }
    const maxLines=Math.max(1,Math.floor(inner.h/lh(size)));
    if(lines.length>maxLines){ lines=lines.slice(0,maxLines); lines[maxLines-1]=truncateEllipsis(lines[maxLines-1],inner.w,size); }
  }
  const lineH=lh(size);
  const blockH=lines.length*lineH;
  let yStart;
  if(vAlign==='top') yStart=inner.y+inner.h-lineH;
  else if(vAlign==='bottom') yStart=inner.y+(lines.length-1)*lineH;
  else yStart=inner.y+(inner.h-blockH)/2+(lines.length-1)*lineH;
  withClip(page,rect,()=>{
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      const w=measure(line,size);
      let x;
      if(hAlign==='center') x=inner.x+(inner.w-w)/2;
      else if(hAlign==='right') x=inner.x+(inner.w-w);
      else x=inner.x;
      const y=yStart-i*lineH;
      page.drawText(line,{x,y,size,font});
    }
  });
  function wrapLines(s,maxW,size){
    const cleaned=String(s).replace(/\s+/g,' ').trim();
    if(!cleaned) return [''];
    const words=cleaned.split(' ');
    const out=[];
    let cur='';
    for(const w of words){
      const test=cur?(cur+' '+w):w;
      if(measure(test,size)<=maxW){ cur=test; }
      else {
        if(cur) out.push(cur);
        if(measure(w,size)>maxW){ out.push(hardBreak(w,maxW,size)); cur=''; }
        else cur=w;
      }
    }
    if(cur) out.push(cur);
    return out.length?out:[''];
  }
  function hardBreak(word,maxW,size){
    let acc='';
    for(const ch of String(word)){
      if(measure(acc+ch,size)>maxW) break;
      acc+=ch;
    }
    return acc||String(word).slice(0,1);
  }
  function truncateEllipsis(s,maxW,size){
    if(measure(s,size)<=maxW) return s;
    const ell='...';
    let t=String(s);
    while(t.length>0 && measure(t+ell,size)>maxW) t=t.slice(0,-1);
    return (t||'')+ell;
  }
  function withClip(page,rect,fn){
    const ops=PDFLib;
    page.pushOperators(ops.pushGraphicsState());
    page.pushOperators(ops.moveTo(rect.x,rect.y),ops.lineTo(rect.x+rect.w,rect.y),ops.lineTo(rect.x+rect.w,rect.y+rect.h),ops.lineTo(rect.x,rect.y+rect.h),ops.closePath(),ops.clip(),ops.endPath());
    fn();
    page.pushOperators(ops.popGraphicsState());
  }
}

// ------------------------- Dynamic blocks -------------------------
function addHeaderFields(form, page, ctx, meta, fonts){
  const { font, fontB } = fonts;

  const fields = [
    ['meta.schoolId',     'C4:F4',   meta.schoolId || ''],
    ['meta.schoolYear',   'O4:T4',   meta.schoolYear || ''],
    ['meta.reportMonth',  'AF4:AK4', meta.reportMonthText || ''],
    ['meta.schoolName',   'C6:T6',   meta.schoolName || ''],
    ['meta.gradeLevel',   'Y6:AA6',  meta.gradeLevel || ''],
    ['meta.section',      'AF6:AK6', meta.section || ''],
  ];

  for(const [name, range, val] of fields){
    const r = ctx.rect(range);
    if(!r) continue;

    // draw as normal text (NOT a form field)
    drawCellText(
      page,
      r,
      val,
      fontB || font,   // header is usually bold
      12,			   // headers from modal value
      'center',
      'middle',
      false
    );
  }
}

function ensureTextField(form,name){ try{ return form.getTextField(name);}catch(_){ } return form.createTextField(name); }

function drawDayHeaders(page,ctx,slots,fonts){
  const {fontB}=fonts;
  for(let i=0;i<25;i++){
    const d=slots[i];
    const col=ctx.colLetterForDaySlot(i);
    const rDay=ctx.rect(`${col}9`);
    if(rDay){ const dayNum=d?String(parseInt(d.split('-')[2],10)):''; if(dayNum) drawCellText(page,rDay,dayNum,fontB,7,'center','middle',false); }
    const rWd=ctx.rect(`${col}10`);
    if(rWd){ const wd=d?weekdayShort(d):''; if(wd) drawCellText(page,rWd,wd,fontB,7,'center','middle',false); }
  }
  
  function weekdayShort(dateStr){	  
	  // dateStr = "YYYY-MM-DD"
	  const d = new Date(dateStr + "T00:00:00");
	  const day = d.getDay(); // 0=Sun..6=Sat
	  // Map Mon..Fri to Excel-style single letters (Tue and Thu both "T")
	  if (day === 1) return "M";
	  if (day === 2) return "T";
	  if (day === 3) return "W";
	  if (day === 4) return "T";
	  if (day === 5) return "F";
	  return ""; // weekends shouldn't be used
	}
}

function shadeNsd(page,ctx,pageSpec,slots,nsdDates,colors){
  if(!nsdDates||!nsdDates.size) return;
  const shade=colors.grayscale(0.92);
  const gs=pageSpec.grid.excelRowStart;
  const ge=gs+pageSpec.grid.rowCount-1;
  for(let i=0;i<25;i++){
    const d=slots[i];
    if(!d||!nsdDates.has(d)) continue;
    const col=ctx.colLetterForDaySlot(i);
    const rHeader=ctx.rect(`${col}8:${col}10`);
    const rGrid=ctx.rect(`${col}${gs}:${col}${ge}`);
    const rTotals=ctx.rect(`${col}92:${col}94`);
    [rGrid].forEach(r=>{ if(!r) return; page.drawRectangle({x:r.x,y:r.y,width:r.w,height:r.h,color:shade}); });
  }
}

function drawLearnerGrid(page,ctx,pageSpec,colors){
  const thick=0.35;
  const C=colors.rgb(0.2,0.2,0.2);
  const gs=pageSpec.grid.excelRowStart;
  const ge=gs+pageSpec.grid.rowCount-1;
  const rectAll=ctx.rect(`A${gs}:AK${ge}`);
  if(!rectAll) return;
  for(let i=0;i<=pageSpec.grid.rowCount;i++){
    const rr=gs+i;
    const y=(rr<=ge)?ctx.yTop.get(rr):rectAll.y;
    page.drawLine({start:{x:rectAll.x,y},end:{x:rectAll.x+rectAll.w,y},thickness:thick,color:C});
  }
  const startX=rectAll.x,endX=rectAll.x+rectAll.w;
  for(const x of ctx.xB.values()){
    if(x<startX-0.01||x>endX+0.01) continue;
    page.drawLine({start:{x,y:rectAll.y},end:{x,y:rectAll.y+rectAll.h},thickness:thick,color:C});
  }
}


function drawAttendanceDiagonals(page, ctx, pageSpec, slots, nsdDates, colors){
  // Draw diagonal lines in each attendance cell (E..AC) like the old SF2.
  const C = colors.rgb(0.78,0.78,0.78);
  const thick = 0.35;
  const gs = pageSpec.grid.excelRowStart;
  const ge = gs + pageSpec.grid.rowCount - 1;
  for(let s=0; s<25; s++){
    const d = slots && slots[s] ? slots[s] : null;
    // Keep diagonals even for padded slots; for NSD we also keep diagonals (template-like).
    const col = ctx.colLetterForDaySlot(s);
    for(let r=gs; r<=ge; r++){
      const rc = ctx.rect(`${col}${r}`);
      if(!rc) continue;
      // bottom-left to top-right
      page.drawLine({
        start:{x:rc.x, y:rc.y},
        end:{x:rc.x+rc.w, y:rc.y+rc.h},
        thickness:thick,
        color:C
      });
    }
  }
}
function fillLearners(page,ctx,pageSpec,learners,slots,grid,calc,form,fillableMode,fonts,globalStartIndex){
  const {font,fontB}=fonts;
  const gs=pageSpec.grid.excelRowStart;
  for(let i=0;i<pageSpec.grid.rowCount;i++){
    const row=gs+i;
    const st=learners[i];
    const rNo=ctx.rect(`A${row}`);
    if(rNo&&st) drawCellText(page,rNo,String(globalStartIndex+i+1),font,9,'center','middle',false);
    const rName=ctx.rect(`B${row}:C${row}`);
    if(rName&&st) drawCellText(page,rName,st.name||'',fontB,9,'left','middle',false);
    const rSex=ctx.rect(`D${row}`);
    if(rSex&&st){ const sx=(st.sex==='Male')?'M':(st.sex==='Female'?'F':String(st.sex||'')); drawCellText(page,rSex,sx,font,9,'center','middle',false); }
    for(let s=0;s<25;s++){
      const dateStr=slots[s];
      const col=ctx.colLetterForDaySlot(s);
      const rCell=ctx.rect(`${col}${row}`);
      if(!rCell) continue;
      let code='';
      if(st&&dateStr) code=(grid[st.id]&&grid[st.id][dateStr]!=null)?grid[st.id][dateStr]:'P';
      if(fillableMode==='fullCells'){
        const tf=ensureTextField(form,`att.${st?st.id:'blank'}.${dateStr||('slot'+s)}.${row}`);
        tf.setText(sf2WinAnsiSafeText(code||''));
        tf.addToPage(page,{x:rCell.x+0.5,y:rCell.y+0.5,width:rCell.w-1,height:rCell.h-1});
        tf.setFontSize(sf2FS(9));
      } else {
        if(code) drawCellText(page,rCell,code,fontB,9,'center','middle',false);
      }
    }
    if(st){
      const t=calc.perLearner[st.id]||{absent:0,tardy:0};
      const rAD=ctx.rect(`AD${row}`);
      const rAE=ctx.rect(`AE${row}`);
      if(rAD) drawCellText(page,rAD,String(t.absent),fontB,9,'center','middle',false);
      if(rAE) drawCellText(page,rAE,String(t.tardy),fontB,9,'center','middle',false);
    }
    const rRem=ctx.rect(`AF${row}:AK${row}`);
    if(rRem){
      const tf=ensureTextField(form,`remarks.${row}.${st?st.id:'blank'}`);
      try{ tf.enableMultiline(); }catch(_){ }
      tf.setText('');
      tf.addToPage(page,{x:rRem.x+1,y:rRem.y+1,width:rRem.w-2,height:rRem.h-2});
      tf.setFontSize(sf2FS(8));
    }
  }
  const hasSpace=learners.length<pageSpec.grid.rowCount;
  const nextEmptyRow=gs+learners.length;
  const nextEmptyRowRect=hasSpace?ctx.rect(`A${nextEmptyRow}:AK${nextEmptyRow}`):null;
  return {hasSpace:!!(hasSpace&&nextEmptyRowRect), nextEmptyRowRect};
}

function drawTotalsPerDay(page,ctx,slots,nsdDates,calc,fonts){
  const {fontB}=fonts;
  const mr=92,fr=93,tr=94;

  // Per-day totals (E–AC) + horizontal totals (AD:AE) + sex counts (D92:D94)
  let sumM=0,sumF=0,sumT=0;
  for(let i=0;i<25;i++){
    const d=slots[i];
    if(!d||nsdDates.has(d)) continue;
    const per=calc.perDay[d];
    if(!per) continue;

    sumM += (per.m||0);
    sumF += (per.f||0);
    sumT += (per.t||0);

    const col=ctx.colLetterForDaySlot(i);
    const rM=ctx.rect(`${col}${mr}`);
    const rF=ctx.rect(`${col}${fr}`);
    const rT=ctx.rect(`${col}${tr}`);
    if(rM) drawCellText(page,rM,String(per.m||0),fontB,9,'center','middle',false);
    if(rF) drawCellText(page,rF,String(per.f||0),fontB,9,'center','middle',false);
    if(rT) drawCellText(page,rT,String(per.t||0),fontB,9,'center','middle',false);
  }

  // D92/D93/D94: number of learners by sex (from roster)
  const cntM = (calc && calc.counts && typeof calc.counts.m==='number') ? calc.counts.m : 0;
  const cntF = (calc && calc.counts && typeof calc.counts.f==='number') ? calc.counts.f : 0;
  const cntT = (calc && calc.counts && typeof calc.counts.total==='number') ? calc.counts.total : (cntM+cntF);

  const rCntM = ctx.rect(`D${mr}`);
  const rCntF = ctx.rect(`D${fr}`);
  const rCntT = ctx.rect(`D${tr}`);
  if(rCntM) drawCellText(page,rCntM,String(cntM),fontB,9,'center','middle',false);
  if(rCntF) drawCellText(page,rCntF,String(cntF),fontB,9,'center','middle',false);
  if(rCntT) drawCellText(page,rCntT,String(cntT),fontB,9,'center','middle',false);

  // AD92:AE92 / AD93:AE93 / AD94:AE94: SUM(E:AC) per row
  // (These are merged in the template, so render once over the merged rect.)
  const rSumM = ctx.rect(`AD${mr}:AE${mr}`);
  const rSumF = ctx.rect(`AD${fr}:AE${fr}`);
  const rSumT = ctx.rect(`AD${tr}:AE${tr}`);
  if(rSumM) drawCellText(page,rSumM,String(sumM),fontB,9,'center','middle',false);
  if(rSumF) drawCellText(page,rSumF,String(sumF),fontB,9,'center','middle',false);
  if(rSumT) drawCellText(page,rSumT,String(sumT),fontB,9,'center','middle',false);
}





// ===== SF2_SUMMARY_GRID_PATCH_2026_04_29 =====
// Summary table/grid renderer for NEW SUMMARY BLOCK (B99:P120)
// - LAST PAGE ONLY: Call this ONLY on final page (page C).
// - Geometry source of truth: ctx.xB / ctx.yTop via ctx.rect(). No hard-coded x/y.
// - Merged-cell aware: does NOT draw internal lines that would split merged ranges.
function drawSummaryGrid_B99_P120(page, ctx){
  if(!page || !ctx) return;

  const OUTER = 'B99:P120';
  const outerRect = ctx.rect(OUTER);
  if(!outerRect) return;

  const color = PDFLib.rgb(0,0,0);
  const thick = (typeof SF2_THIN_BORDER !== 'undefined') ? SF2_THIN_BORDER : 0.35;

  // Merged ranges inside B99:P120 (from template workbook). Anchor = top-left cell.
  const merges = [
    // Header merges
    'C99:H100',
    'I99:J100',
    'K99:P99',
    'K100:L100', 'M100:N100', 'O100:P100',

    // Left label merges
    'B101:J102','B103:J104','B105:J106','B107:J108','B109:J110',
    'B111:J112','B113:J114','B115:J116','B117:J118','B119:J120',

    // Value merges (2-row blocks)
    'K101:L102','M101:N102','O101:P102',
    'K103:L104','M103:N104','O103:P104',
    'K105:L106','M105:N106','O105:P106',
    'K107:L108','M107:N108','O107:P108',
    'K109:L110','M109:N110','O109:P110',
    'K111:L112','M111:N112','O111:P112',
    'K113:L114','M113:N114','O113:P114',
    'K115:L116','M115:N116','O115:P116',
    'K117:L118','M117:N118','O117:P118',
    'K119:L120','M119:N120','O119:P120'
  ].map(parseRange);

  // Compute internal boundaries to skip (Excel-like merged behavior)
  const skipV = new Set(); // column letters for internal vertical boundaries to skip
  const skipH = new Set(); // row numbers for internal horizontal boundaries to skip

  for(const m of merges){
    const c1 = colToNum(m.c1);
    const c2 = colToNum(m.c2);
    for(let c = c1 + 1; c <= c2; c++) skipV.add(numToCol(c));

    const r1 = m.r1;
    const r2 = m.r2;
    for(let r = r1 + 1; r <= r2; r++) skipH.add(r);
  }

  // 1) Outer border rectangle around B99:P120
  page.drawRectangle({
    x: outerRect.x,
    y: outerRect.y,
    width: outerRect.w,
    height: outerRect.h,
    borderColor: color,
    borderWidth: thick
  });

  // 2) Internal vertical grid lines at template column boundaries BETWEEN B..P
  // Internal boundaries: left edges of columns C..P
  const colStart = colToNum('B');
  const colEnd = colToNum('P');
  for(let c = colStart + 1; c <= colEnd; c++){
    const boundaryCol = numToCol(c);
    if(skipV.has(boundaryCol)) continue;
    const x = ctx.xB.get(boundaryCol);
    if(x == null) continue;
    page.drawLine({
      start: { x, y: outerRect.y },
      end:   { x, y: outerRect.y + outerRect.h },
      thickness: thick,
      color
    });
  }

  // 3) Internal horizontal grid lines at template row boundaries BETWEEN 99..120
  // Internal boundaries: top edges of rows 100..120
  for(let r = 100; r <= 120; r++){
    if(skipH.has(r)) continue;
    const y = ctx.yTop.get(r);
    if(y == null) continue;
    page.drawLine({
      start: { x: outerRect.x, y },
      end:   { x: outerRect.x + outerRect.w, y },
      thickness: thick,
      color
    });
  }
}
// ===== END SF2_SUMMARY_GRID_PATCH_2026_04_29 =====


// ===== SF2_SUMMARY_LABELS_PATCH_2026_04_29 =====
// Draws the SUMMARY LABELS/HEADINGS for the NEW summary block (B99:P120).
// This is required because the embedded template payload currently contains the OLD summary labels (AC99:AK120).
// IMPORTANT: Do NOT overwrite value targets; this function draws ONLY static labels/headings.
function drawSummaryLabels_B99_P120(page, ctx, fonts){
  if(!page || !ctx) return;
  const {font, fontB} = fonts || {};
  if(!font || !fontB) return;

  const fs = clampFontSize(8);

  // Top area
  drawLabel('B99', 'Month:', fontB, fs, 'left', false);
  drawLabel('C99:H100', 'No. of Days of Classes:', fontB, fs, 'center', true);

  // Summary headings
  drawLabel('K99:P99', 'Summary', fontB, fs, 'center', false);
  drawLabel('K100:L100', 'M', fontB, fs, 'center', false);
  drawLabel('M100:N100', 'F', fontB, fs, 'center', false);
  drawLabel('O100:P100', 'Total', fontB, fs, 'center', false);

  // Left labels (each spans 2 rows)
  drawLabel('B101:J102', '* Enrolment  as of  (1st Friday of June)', font, fs, 'center', true);
  drawLabel('B103:J104', 'Late Enrollment during the month (beyond cut-off)', font, fs, 'center', true);
  drawLabel('B105:J106', 'Registered Learners as of end of the month', font, fs, 'center', true);
  drawLabel('B107:J108', 'Percentage of Enrolment as of end of the month', font, fs, 'center', true);
  drawLabel('B109:J110', 'Average Daily Attendance', font, fs, 'center', false);
  drawLabel('B111:J112', 'Percentage of Attendance for the month', font, fs, 'center', true);
  drawLabel('B113:J114', 'Number of students absent for 5 consecutive days:', font, fs, 'center', true);
  drawLabel('B115:J116', 'Drop out', font, fs, 'center', false);
  drawLabel('B117:J118', 'Transferred out', font, fs, 'center', false);
  drawLabel('B119:J120', 'Transferred in', font, fs, 'center', false);

  function drawLabel(range, text, fnt, size, hAlign, wrap){
    const r = ctx.rect(range);
    if(!r) return;
    drawCellText(page, r, sf2WinAnsiSafeText(text), fnt, size, hAlign, 'middle', !!wrap);
  }
}
// ===== END SF2_SUMMARY_LABELS_PATCH_2026_04_29 =====
function addSummaryFields(form, page, ctx, monthText, calc, fonts){
  const {font, fontB} = fonts;
  // IMPORTANT: only place VALUES. The SUMMARY GRID is already in the correct location.
  // NEW SUMMARY BLOCK (B99:P120) — values MUST render INSIDE this block on the LAST page.

  const fs = clampFontSize(8);

  // Month value (B100)
  drawVal('B100', monthText || '', fontB, fs, 'center');
  // No. of Days of Classes value (I99:J100)
  drawVal('I99:J100', String(calc?.daysOfClasses ?? 0), font, fs, 'center');

  function fmt(x){
    const n = Number(x);
    if(!isFinite(n)) return '0';
    return (Math.round(n*100)/100).toString();
  }

  function drawVal(range, value, fnt, size, hAlign){
    const r = ctx.rect(range);
    if(!r) return;
    drawCellText(page, r, String(value ?? ''), fnt, size, hAlign, 'middle', false);
  }

  function drawMFT(rM,rF,rT,vM,vF,vT){
    // Center text within the merged rectangle (Excel-like)
    drawVal(rM, vM, fontB, fs, 'center');
    drawVal(rF, vF, fontB, fs, 'center');
    drawVal(rT, vT, fontB, fs, 'center');
  }

  const c = calc || {};
  const counts = c.counts || {m:0,f:0,total:0};
  const ada = c.ada || {m:0,f:0,t:0};
  const pct = c.pct || {m:0,f:0,t:0};
  const streak5 = c.streak5 || {m:0,f:0,t:0};

  // Summary rows (each uses 2-row merged value ranges)
  drawMFT('K101:L102','M101:N102','O101:P102', counts.m, counts.f, counts.total);
  drawMFT('K103:L104','M103:N104','O103:P104', 0, 0, 0);
  drawMFT('K105:L106','M105:N106','O105:P106', counts.m, counts.f, counts.total);
  drawMFT('K107:L108','M107:N108','O107:P108', fmt(100), fmt(100), fmt(100));
  drawMFT('K109:L110','M109:N110','O109:P110', fmt(ada.m), fmt(ada.f), fmt(ada.t));
  drawMFT('K111:L112','M111:N112','O111:P112', fmt(pct.m), fmt(pct.f), fmt(pct.t));
  drawMFT('K113:L114','M113:N114','O113:P114', streak5.m, streak5.f, streak5.t);
  drawMFT('K115:L116','M115:N116','O115:P116', 0, 0, 0);
  drawMFT('K117:L118','M117:N118','O117:P118', 0, 0, 0);
  drawMFT('K119:L120','M119:N120','O119:P120', 0, 0, 0);
}


function addSignatoryFields(form, page, ctx, meta, fonts){
  const {font, fontB} = fonts;
  // Signatories block AC122:AK129 stays in place. Teacher & School Head values must NOT be fillable.
  const fs = clampFontSize(9);
  const rT = ctx.rect('AC124:AK124');
  if(rT){ drawCellText(page, rT, String(meta?.teacher ?? ''), fontB, fs, 'center', 'middle', false); }
  const rH = ctx.rect('AC128:AK128');
  if(rH){ drawCellText(page, rH, String(meta?.schoolHead ?? ''), fontB, fs, 'center', 'middle', false); }
}


function drawPageNumber(page,ctx,pageNum,pageTotal,fonts){ return; /* disabled */
  const r=ctx.rect('A129:P129');
  const txt=sf2WinAnsiSafeText(`School Form 2 : Page ${pageNum} of ${pageTotal}`);
  const size=7;
  if(r) page.drawText(txt,{x:r.x+2,y:r.y+r.h/2-4,size,font:fonts.font});
  else page.drawText(txt,{x:600,y:32,size,font:fonts.font});
}

function drawDebug(page,ctx,env){
  const {font,rgb}=env;
  const red=rgb(1,0.2,0.2);
  for(const c of SF2_TEMPLATE.cells){
    const range=c[0];
    if(!range||range.indexOf(':')<0) continue;
    const rr=parseRange(range);
    if(!ctx.rowSet.has(rr.r1)||!ctx.rowSet.has(rr.r2)) continue;
    const r=ctx.rect(range);
    if(!r) continue;
    page.drawRectangle({x:r.x,y:r.y,width:r.w,height:r.h,borderWidth:0.3,borderColor:red,opacity: 0.15});
    page.drawText(sf2WinAnsiSafeText(range),{x:r.x+1,y:r.y+r.h-7,size: sf2FS(5),font,color:red});
  }
}

// ------------------------- Wire button + expose -------------------------
document.addEventListener('DOMContentLoaded', ()=>{
  const btn=document.getElementById('btnExportSF2Pdf');
  if(btn && !btn._sf2Bound){ btn.addEventListener('click', openSF2PdfExportModal); btn._sf2Bound=true; }
});
window.openSF2PdfExportModal=openSF2PdfExportModal;
window.closeSF2PdfExportModal=closeSF2PdfExportModal;
window.exportSF2Pdf=exportSF2Pdf;
