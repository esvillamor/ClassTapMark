# ClassTapMark
# https://esvillamor.github.io/ClassTapMark/

Version: v1.1 · Storage: Browser localStorage · Works offline

Overview

ClassTapMark helps you manage classes, add students, and record daily attendance with quick status buttons. Data is stored in your browser via localStorage, so it’s device & browser‑specific.

Quick Start

*Create a Class with 📚 Create Class. Then use Load Class.

*Add Students using the format: Last Name, First Name Middle Name (your preferred convention). Set Sex: Male / Female.

*Mark Attendance — pick a date, navigate students (⏪ ◀ ▶ ⏩), and choose a status: Present, Absent, Tardy, Cutting, Excuse, Pending.

*Import .csv with columns: "Class","Student","Sex","Status","Date".

Export CSV:

*Class export (📥 Export CSV): choose one or multiple dates → downloads one CSV (CRLF line breaks, Excel‑friendly).

*Student export (while editing): downloads that student’s full history excluding PENDING.

📅 Date Import Issues

*Recommended: Use CSV for imports. Keep the Date column as text in YYYY‑MM‑DD. This prevents time‑zone conversion.

*In Excel, force YYYY‑MM‑DD before saving CSV: add a helper column with =TEXT(E2,"yyyy-mm-dd"), then Copy → Paste Special → Values back into your Date column.

*Don’t reopen CSV in Excel just to check it—Excel may re‑interpret dates based on regional settings. If you need to verify, open the file in Notepad.

*If using .xlsx: ensure your Date cells are dates (no time). If a shift still appears after import, resave the sheet as CSV using the steps above and re‑import.

*Note: The classic Excel 1900/1904 setting causes ~4‑year differences, not a 1‑day shift.

FAQ

*Date picker format not YYYY-MM-DD. In Windows 11 open Settings > Date & time > Format > Short date and select YYYY-MM-DD. ClassTapMark conforms with ISO 8601

*Export is disabled. Click ✏️ Edit on a student to enable the student export. For class export, use the main 📥 Export CSV button.

*Where is data stored? In browser localStorage on this device only. Clearing site data or switching browsers/devices will remove it.

*Can I combine multiple dates in one CSV? Yes—select multiple dates in the Export modal; the app generates one combined CSV.

*Why is the Date a number in my sheet? That’s an Excel serial date; the importer understands it and converts it to YYYY‑MM‑DD.

*My imported dates shifted one day back. This is caused by time‑zone conversion when spreadsheets export or interpret date‑only values as full datetimes. Fix: Import CSV with the Date column as YYYY‑MM‑DD text (see Date Import Tips). Best: stick to CSV when importing.

*How do I delete a student & their attendance? Click 🗑️. The app removes the student and purges their attendance records (and cleans up empty date keys).

*Soft vs. Hard Refresh? Use 🔄 (upper‑left). Click = Soft refresh UI; Shift+Click = Hard reload page.

*Reset everything? Delete classes or clear site data (this wipes localStorage). Export first if you need a backup.

Troubleshooting

*After importing, if you don’t see updates: pick the date you imported, or 🔄 refresh.

*If a control looks stuck, use 🔄 soft refresh; if still stuck, Shift+Click 🔄 for hard reload.

*CSV import checklist: (1) Date is YYYY‑MM‑DD text; (2) File saved as CSV (UTF‑8); (3) Verified in Notepad; (4) Re‑import.

End‑User License Agreement (EULA)

Last updated: January 2026

1. License. You are granted a non‑exclusive, non‑transferable license to use this ClassTapMark application for personal, classroom, or internal school purposes.
2. Ownership. The application and its components remain the property of the author. This EULA does not transfer any intellectual property rights.
3. Data & Storage. All records are stored locally in your browser’s localStorage. You are solely responsible for backups and exports.
4. Acceptable Use. Do not use this software for unlawful purposes or to process sensitive personal data without consent or lawful basis.
5. No Warranty. The application is provided “AS IS”, without warranties of any kind. Use at your own risk.
6. Limitation of Liability. To the maximum extent permitted by law, the author will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, even if advised of the possibility.
7. Support. Support is provided on a best‑effort basis and may be discontinued at any time.
8. Termination. This license terminates if you breach this EULA. Upon termination, stop using the app and delete any related data as required.
9. Changes. The EULA may be updated. Continued use after changes constitutes acceptance of the revised terms.
10. Governing Law. This EULA is governed by the laws applicable in your jurisdiction unless otherwise agreed in writing.

For further queries contact: esv.tnt010@gmail.com
