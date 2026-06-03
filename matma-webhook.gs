// Google Apps Script — Matma Stats Webhook v3
// Obsługuje zapis sesji (GET?data=...) i odczyt danych dla panelu admina (GET?action=stats)

function doGet(e) {
  const action = e.parameter.action || '';

  // ── ODCZYT DANYCH DLA PANELU ADMINA ──
  if (action === 'stats') {
    return getStats(e.parameter.days || '30');
  }
  if (action === 'raw') {
    return getRaw(e.parameter.limit || '100');
  }

  // ── ZAPIS SESJI ──
  if (e.parameter.data) {
    return saveSession(e.parameter.data);
  }

  // ── HEALTH CHECK ──
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return jsonResponse({ status: 'alive', rows: Math.max(0, sheet.getLastRow() - 1) });
}

function doPost(e) {
  try {
    return saveSession(e.postData.contents);
  } catch(err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

// ── SAVE SESSION ──
function saveSession(rawData) {
  try {
    const data = JSON.parse(decodeURIComponent(rawData));
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp','UserID','Kategoria','Poziom','Klasa','Tryb',
        'Wynik%','Poprawne','Karty','XP','Timer','Boss','Wersja'
      ]);
      sheet.getRange(1,1,1,13).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('pl'),
      data.userId     || '',
      data.category   || '',
      data.difficulty || '',
      data.grade      || '',
      data.mode       || '',
      data.pct        || 0,
      data.score      || 0,
      data.total      || 0,
      data.xpEarned   || 0,
      data.timer      ? 'tak' : 'nie',
      data.bossMode   ? 'tak' : 'nie',
      data.appVersion || 'v6'
    ]);

    return jsonResponse({ status: 'ok' });
  } catch(err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

// ── GET STATS (aggregated) ──
function getStats(days) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return jsonResponse({ status: 'ok', sessions: 0, data: {} });

    const rows = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    const since = days == 0 ? null : new Date(Date.now() - parseInt(days) * 86400000);
    const today = new Date().toLocaleDateString('pl');

    // Filter by date
    const filtered = rows.filter(r => {
      if (!since) return true;
      try {
        const d = new Date(r[0].toString().split(',')[0].split('.').reverse().join('-'));
        return d >= since;
      } catch(e) { return true; }
    });

    // Aggregations — cols: [0]ts [1]userId [2]cat [3]diff [4]grade [5]mode [6]pct [7]score [8]total [9]xp [10]timer [11]boss
    const byCat = {}, byDiff = {}, byGrade = {}, byMode = {}, byDay = {};
    let totalPct = 0, perfectCount = 0, bossCount = 0, todayCount = 0, totalXP = 0;

    filtered.forEach(r => {
      const [ts, userId, cat, diff, grade, mode, pct, score, total, xp, timer, boss] = r;
      const pctN = parseFloat(pct) || 0;
      const xpN  = parseFloat(xp)  || 0;

      byCat[cat]    = (byCat[cat]    || 0) + 1;
      byDiff[diff]  = (byDiff[diff]  || 0) + 1;
      byGrade[grade]= (byGrade[grade]|| 0) + 1;
      byMode[mode]  = (byMode[mode]  || 0) + 1;

      // Daily
      try {
        const dayKey = ts.toString().split(',')[0];
        byDay[dayKey] = (byDay[dayKey] || 0) + 1;
        if (dayKey === today) todayCount++;
      } catch(e) {}

      totalPct += pctN;
      totalXP  += xpN;
      if (pctN === 100) perfectCount++;
      if (boss === 'tak') bossCount++;
    });

    // Avg score per category
    const catScores = {}, catCounts = {};
    filtered.forEach(r => {
      const cat = r[2], pct = parseFloat(r[6]) || 0;
      catScores[cat] = (catScores[cat] || 0) + pct;
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });
    const avgByCat = {};
    Object.keys(catScores).forEach(k => avgByCat[k] = Math.round(catScores[k] / catCounts[k]));

    return jsonResponse({
      status:       'ok',
      sessions:     filtered.length,
      avgPct:       filtered.length ? Math.round(totalPct / filtered.length) : 0,
      perfect:      perfectCount,
      boss:         bossCount,
      today:        todayCount,
      totalXP:      totalXP,
      byCat:        byCat,
      byDiff:       byDiff,
      byGrade:      byGrade,
      byMode:       byMode,
      byDay:        byDay,
      avgByCat:     avgByCat,
    });
  } catch(err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

// ── GET RAW ROWS ──
function getRaw(limitN) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return jsonResponse({ status: 'ok', rows: [] });

    const limit = Math.min(parseInt(limitN) || 50, 200);
    const startRow = Math.max(2, lastRow - limit + 1);
    const count = lastRow - startRow + 1;
    const data = sheet.getRange(startRow, 1, count, 13).getValues().reverse();

    const rows = data.map(r => ({
      ts: r[0], userId: r[1], cat: r[2], diff: r[3], grade: r[4], mode: r[5],
      pct: r[6], score: r[7], total: r[8], xp: r[9],
      timer: r[10], boss: r[11], ver: r[12]
    }));

    return jsonResponse({ status: 'ok', rows });
  } catch(err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

// ── HELPER ──
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
