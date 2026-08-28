const fs = require("fs")
const file = "data/submissions.json"
let payload = JSON.parse(process.env.PAYLOAD || "{}")
if (payload.cipher) payload = typeof payload.cipher === "string" ? JSON.parse(payload.cipher) : payload.cipher
if (!payload.id || !payload.k) process.exit(0)
const rows = JSON.parse(fs.readFileSync(file, "utf8"))
const next = rows.filter((x) => x.id !== payload.id).concat(payload)
fs.writeFileSync(file, JSON.stringify(next))
