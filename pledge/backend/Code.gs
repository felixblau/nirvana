// Nirvana Pledge — Apps Script backend
// Deployed as: Web App, execute as "Me", access "Anyone"

const SHEET_NAME = "Pledges";

function doGet(e) {
  const action = e.parameter.action;
  const cb = e.parameter.callback;
  if (action === "list") return respond(handleList(), cb);
  if (action === "lookup") return respond(handleLookup(e.parameter), cb);
  if (action === "rescind") return respond(handleRescind(e.parameter), cb);
  return respond({ error: "unknown action" }, cb);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "submit") return respond(handleSubmit(body));
    return respond({ error: "unknown action" });
  } catch (err) {
    return respond({ error: String(err) });
  }
}

function respond(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + json + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function rows() {
  const s = sheet();
  const data = s.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map((r, i) => {
    const o = { rowNum: i + 2 };
    headers.forEach((h, j) => (o[h] = r[j]));
    return o;
  });
}

function findByEmail(email) {
  const target = String(email || "").toLowerCase().trim();
  return rows().find((r) => String(r.email || "").toLowerCase().trim() === target);
}

function handleList() {
  return rows()
    .filter((r) => r.status === "approved")
    .map((r) => ({
      company: r.company,
      firstName: r.firstName,
      lastInitial: String(r.lastName || "").charAt(0),
      role: r.role,
    }));
}

function handleSubmit(body) {
  const email = String(body.email || "").toLowerCase().trim();
  if (!email) return { error: "email required" };
  const existing = findByEmail(email);
  const s = sheet();
  if (existing) {
    s.getRange(existing.rowNum, 3).setValue(body.firstName || existing.firstName);
    s.getRange(existing.rowNum, 4).setValue(body.lastName || existing.lastName);
    s.getRange(existing.rowNum, 6).setValue(body.company || existing.company);
    s.getRange(existing.rowNum, 7).setValue(body.role || existing.role);
    return { id: existing.id, status: existing.status };
  }
  const id = Utilities.getUuid();
  s.appendRow([
    id,
    new Date().toISOString(),
    body.firstName || "",
    body.lastName || "",
    email,
    body.company || "",
    body.role || "",
    "pending",
    "",
    "",
  ]);
  return { id, status: "pending" };
}

function handleLookup(p) {
  const row = findByEmail(p.email);
  if (!row) return null;
  return { id: row.id, status: row.status, firstName: row.firstName, company: row.company };
}

function handleRescind(p) {
  const id = String(p.id || "");
  const email = String(p.email || "").toLowerCase().trim();
  if (!id || !email) return { error: "id and email required" };
  const row = rows().find((r) => r.id === id);
  if (!row) return { error: "not found" };
  if (String(row.email || "").toLowerCase().trim() !== email) return { error: "email mismatch" };
  sheet().getRange(row.rowNum, 8).setValue("rescinded");
  return { ok: true };
}
