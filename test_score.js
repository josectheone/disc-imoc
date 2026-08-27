const { computeDisc, adherence, scoreAll } = require("./score.js")

const allD = Array.from({ length: 28 }, () => ({ mais: "A", menos: "B" }))
const d = computeDisc(allD)
console.assert(d.pct.D > d.pct.I && d.pct.D > d.pct.S && d.pct.D > d.pct.C, "A=D should dominate")
console.assert(d.pct.D + d.pct.I + d.pct.S + d.pct.C === 100, "pct must sum 100")

const allC = Array.from({ length: 28 }, () => ({ mais: "D", menos: "B" }))
const c = computeDisc(allC)
console.assert(c.pct.C > 40, "D=C should dominate")

const joao = Array.from({ length: 28 }, (_, i) =>
  i % 3 === 0 ? { mais: "D", menos: "B" } : i % 3 === 1 ? { mais: "A", menos: "B" } : { mais: "C", menos: "B" }
)
const r = scoreAll(joao)
console.assert(r.roles[0].score >= r.roles[r.roles.length - 1].score, "roles ranked desc")
console.assert(r.recommended.id, "has recommended role")
console.assert(adherence({ D: 30, I: 15, S: 20, C: 35 }, { D: 30, I: 15, S: 20, C: 35 }) === 100, "perfect match = 100")

console.log("ok", r.pct, r.profile, r.recommended.name, r.recommended.score)
