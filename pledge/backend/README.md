# Nirvana Pledge Backend

**Google Sheet:** (owned by Felix)
**Apps Script URL:** `https://script.google.com/macros/s/AKfycbwADm1Wn_WO9I33brWeVOu3Lz4qVTNYMbMM8v6gJZ-r2mhHUfM6qMWiFALm_LGafjK10A/exec`

## Sheet setup

- Sheet name: `Nirvana Pledge Signatories`
- Tab name: `Pledges`
- Row 1 headers (exact order):

  ```
  id  timestamp  firstName  lastName  email  company  role  status  reviewedAt  reviewedBy  logoUrl
  ```

  Column K (`logoUrl`) holds an optional public image URL for the
  company's logo. When present on an approved row, the site shows it
  in the logo wall on the right column. If empty, the pledge still
  appears in the text list but not the logo wall.

## Deployment

1. Open the sheet → **Extensions → Apps Script**
2. Paste the contents of `Code.gs` (replacing the default `myFunction`)
3. **Deploy → New deployment**
   - Type: **Web App**
   - Description: `Nirvana Pledge v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Grant permissions
5. Copy the `/exec` URL — this is what `src/lib/api.ts` uses

## Updating

1. Edit `Code.gs` in this repo
2. Paste into Apps Script editor
3. **Deploy → Manage deployments → edit the v1 deployment → New version → Deploy**
4. URL stays the same

## Rep review workflow

1. Open the sheet, tab `Pledges`
2. Filter/sort by `status = pending`
3. To approve: change the `status` cell for that row to `approved`
4. Optionally paste a company logo image URL into column K (`logoUrl`) — that URL is what the site will load into the logo wall. Prefer transparent PNG/SVG; ~160×40 or wider aspect ratios read cleanest.
5. Optionally fill `reviewedAt` and `reviewedBy`
6. To reject: leave as `pending` or set to any non-approved value — the row won't appear in the public list either way

## Endpoints

| Action | Method | Payload | Returns |
|---|---|---|---|
| `list` | GET `?action=list` | — | `[{ company, firstName, lastInitial, role, logoUrl }]` (approved-only; `logoUrl` may be empty) |
| `submit` | POST | `{action:"submit", firstName, lastName, email, company, role}` | fire-and-forget; server dedupes by email |
| `lookup` | GET (JSONP) `?action=lookup&email=…&callback=…` | — | `{id, status, firstName, company} \| null` |
| `rescind` | GET (JSONP) `?action=rescind&id=…&email=…&callback=…` | — | `{ok:true} \| {error}` |
