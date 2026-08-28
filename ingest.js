const fs = require("fs")
const file = process.env.FILE || "data/submissions.json"
let payload = JSON.parse(process.env.PAYLOAD || "{}")
if (payload.cipher) payload = typeof payload.cipher === "string" ? JSON.parse(payload.cipher) : payload.cipher
if (!payload.k || !payload.d) process.exit(0)
const rows = JSON.parse(fs.readFileSync(file, "utf8"))
const next = rows.filter((x) => x.k !== payload.k).concat(payload)
fs.writeFileSync(file, JSON.stringify(next))
