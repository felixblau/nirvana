# Nirvana Pledge Backend

**Google Sheet:** _paste sheet URL here_
**Apps Script URL:** _paste `/exec` URL here after deploy_

## Sheet setup

- Sheet name: `Nirvana Pledge Signatories`
- Tab name: `Pledges`
- Row 1 headers (exact order):

  ```
  id  timestamp  firstName  lastName  email  company  role  status  reviewedAt  reviewedBy
  ```

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
4. Optionally fill `reviewedAt` and `reviewedBy`
5. To reject: leave as `pending` or set to any non-approved value — the row won't appear in the public list either way

## Endpoints

| Action | Method | Payload | Returns |
|---|---|---|---|
| `list` | GET `?action=list` | — | `[{ company, firstName, lastInitial, role }]` (approved-only) |
| `submit` | POST | `{action:"submit", firstName, lastName, email, company, role}` | fire-and-forget; server dedupes by email |
| `lookup` | GET (JSONP) `?action=lookup&email=…&callback=…` | — | `{id, status, firstName, company} \| null` |
| `rescind` | GET (JSONP) `?action=rescind&id=…&email=…&callback=…` | — | `{ok:true} \| {error}` |
