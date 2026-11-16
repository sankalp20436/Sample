import express from 'express';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

type AttendanceChoice = 'Yes' | 'Maybe' | 'No';

export interface RsvpEntry {
  name: string;
  phone: string;
  guests: number;
  mehendi: AttendanceChoice;
  sangeet: AttendanceChoice;
  wedding: AttendanceChoice;
  wish: string;
  updatedAt: string;
}

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const XLSX_PATH = path.resolve(DATA_DIR, 'rsvp_entries.xlsx');
const SHEET_NAME = 'Guest RSVPs';

const COLUMNS = [
  { header: 'Guest Name', key: 'name', width: 26 },
  { header: 'Mobile Number', key: 'phone', width: 18 },
  { header: 'Guests', key: 'guests', width: 10 },
  { header: 'Mehendi', key: 'mehendi', width: 12 },
  { header: 'Sangeet', key: 'sangeet', width: 12 },
  { header: 'Wedding', key: 'wedding', width: 12 },
  { header: 'Couple Wish', key: 'wish', width: 42 },
  { header: 'Updated At', key: 'updatedAt', width: 24 },
];

let fileLock: Promise<void> = Promise.resolve();

function withFileLock<T>(task: () => Promise<T>): Promise<T> {
  const next = fileLock.then(task, task);
  fileLock = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function createStyledWorkbook(entries: RsvpEntry[]): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Ankita & Kaushik Wedding Invitation';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet(SHEET_NAME);
  sheet.columns = COLUMNS;

  const headerRow = sheet.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFF9EAD6' }, size: 11 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4D0821' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
  });

  for (const entry of entries) {
    const row = sheet.addRow(entry);
    row.height = 22;
    row.alignment = { vertical: 'middle', wrapText: true };
  }

  return workbook;
}

async function ensureWorkbookExists(): Promise<void> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(XLSX_PATH)) {
    const wb = createStyledWorkbook([]);
    await wb.xlsx.writeFile(XLSX_PATH);
  }
}

function normalizeChoice(val: unknown): AttendanceChoice {
  if (val === 'Yes' || val === 'Maybe' || val === 'No') return val;
  return 'Yes';
}

async function readEntriesFromExcel(): Promise<RsvpEntry[]> {
  await ensureWorkbookExists();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(XLSX_PATH);
  const sheet = workbook.getWorksheet(SHEET_NAME) || workbook.worksheets[0];
  if (!sheet) return [];

  const entries: RsvpEntry[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const name = String(row.getCell(1).value ?? '').trim();
    const phone = String(row.getCell(2).value ?? '').trim();
    if (!name && !phone) return;

    const guestsRaw = Number(row.getCell(3).value ?? 1);
    const guests = Number.isFinite(guestsRaw) ? Math.min(10, Math.max(1, guestsRaw)) : 1;

    entries.push({
      name,
      phone,
      guests,
      mehendi: normalizeChoice(String(row.getCell(4).value ?? 'Yes')),
      sangeet: normalizeChoice(String(row.getCell(5).value ?? 'Yes')),
      wedding: normalizeChoice(String(row.getCell(6).value ?? 'Yes')),
      wish: String(row.getCell(7).value ?? '').trim(),
      updatedAt: String(row.getCell(8).value ?? new Date().toISOString()),
    });
  });

  return entries;
}

async function writeEntriesToExcel(entries: RsvpEntry[]): Promise<void> {
  await ensureWorkbookExists();
  const wb = createStyledWorkbook(entries);
  await wb.xlsx.writeFile(XLSX_PATH);
}

function computeStats(entries: RsvpEntry[]) {
  let totalGuests = 0;
  let mehendiGuests = 0;
  let sangeetGuests = 0;
  let weddingGuests = 0;

  for (const e of entries) {
    totalGuests += e.guests;
    if (e.mehendi === 'Yes' || e.mehendi === 'Maybe') mehendiGuests += e.guests;
    if (e.sangeet === 'Yes' || e.sangeet === 'Maybe') sangeetGuests += e.guests;
    if (e.wedding === 'Yes' || e.wedding === 'Maybe') weddingGuests += e.guests;
  }

  return {
    totalResponses: entries.length,
    totalGuests,
    mehendiGuests,
    sangeetGuests,
    weddingGuests,
  };
}

async function startServer() {
  await ensureWorkbookExists();

  const app = express();
  app.use(express.json());

  app.get('/api/rsvp', async (req, res) => {
    try {
      const entries = await withFileLock(() => readEntriesFromExcel());
      const phoneQuery = typeof req.query.phone === 'string' ? req.query.phone.replace(/\D/g, '') : '';
      const match = phoneQuery ? entries.find((e) => e.phone === phoneQuery) || null : null;
      res.json({
        entries,
        stats: computeStats(entries),
        match,
        fileName: 'rsvp_entries.xlsx',
      });
    } catch (err) {
      console.error('Failed to read RSVP Excel file:', err);
      res.status(500).json({ error: 'Unable to read RSVP Excel records.' });
    }
  });

  app.post('/api/rsvp', async (req, res) => {
    try {
      const body = req.body as Partial<RsvpEntry>;
      const name = String(body.name ?? '').trim();
      const phone = String(body.phone ?? '').replace(/\D/g, '');
      const guestsNum = Number(body.guests ?? 1);
      const guests = Number.isFinite(guestsNum) ? Math.min(10, Math.max(1, Math.round(guestsNum))) : 1;

      if (!name) {
        res.status(400).json({ error: 'Please enter your name.' });
        return;
      }
      if (phone.length !== 10) {
        res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
        return;
      }

      const entry: RsvpEntry = {
        name,
        phone,
        guests,
        mehendi: normalizeChoice(body.mehendi),
        sangeet: normalizeChoice(body.sangeet),
        wedding: normalizeChoice(body.wedding),
        wish: String(body.wish ?? '').trim(),
        updatedAt: new Date().toISOString(),
      };

      const entries = await withFileLock(async () => {
        const current = await readEntriesFromExcel();
        const existingIndex = current.findIndex((item) => item.phone === phone);
        if (existingIndex >= 0) {
          current[existingIndex] = entry;
        } else {
          current.unshift(entry);
        }
        await writeEntriesToExcel(current);
        return current;
      });

      res.json({
        entry,
        entries,
        stats: computeStats(entries),
      });
    } catch (err) {
      console.error('Failed to save RSVP to Excel file:', err);
      res.status(500).json({ error: 'Unable to save RSVP to Excel file.' });
    }
  });

  app.delete('/api/rsvp/:phone', async (req, res) => {
    try {
      const phone = req.params.phone.replace(/\D/g, '');
      const entries = await withFileLock(async () => {
        const current = await readEntriesFromExcel();
        const filtered = current.filter((item) => item.phone !== phone);
        await writeEntriesToExcel(filtered);
        return filtered;
      });
      res.json({
        entries,
        stats: computeStats(entries),
      });
    } catch (err) {
      console.error('Failed to delete RSVP entry:', err);
      res.status(500).json({ error: 'Unable to remove RSVP entry.' });
    }
  });

  app.get('/api/rsvp/export', async (_req, res) => {
    try {
      await withFileLock(() => ensureWorkbookExists());
      res.download(XLSX_PATH, 'Ankita-Kaushik-Guest-RSVP.xlsx');
    } catch (err) {
      console.error('Failed to export RSVP Excel file:', err);
      res.status(500).json({ error: 'Unable to export Excel workbook.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding invitation server running on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
