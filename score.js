const LETTER = { A: "D", B: "I", C: "S", D: "C" }

const ROLES = [
  { id: "n1", name: "N1 – Monitoramento", D: 15, I: 10, S: 40, C: 35 },
  { id: "n2", name: "N2 – Troubleshooting", D: 30, I: 15, S: 20, C: 35 },
  { id: "kpi", name: "Performance / KPI / KQI", D: 15, I: 10, S: 25, C: 50 },
  { id: "incidente", name: "Gestão de Incidentes Críticos", D: 40, I: 25, S: 10, C: 25 },
  { id: "supervisor", name: "Supervisor de Turno", D: 35, I: 20, S: 30, C: 15 },
  { id: "crise", name: "Gestão de Crise / Comunicação", D: 25, I: 40, S: 25, C: 10 },
  { id: "aiops", name: "Automação / AIOps", D: 30, I: 15, S: 15, C: 40 },
  { id: "qualidade", name: "Processos / Qualidade", D: 15, I: 10, S: 35, C: 40 },
]

const PROFILE = {
  "D/I": "Executor / Comunicador",
  "D/S": "Líder Estável",
  "D/C": "Analítico / Executor",
  "I/D": "Comunicador / Executor",
  "I/S": "Comunicador / Cooperativo",
  "I/C": "Influente / Analítico",
  "S/D": "Estável / Decisor",
  "S/I": "Cooperativo / Comunicador",
  "S/C": "Analista Consistente",
  "C/D": "Analítico / Executor",
  "C/I": "Analítico / Influente",
  "C/S": "Analista Consistente",
}

const STRENGTHS = {
  D: ["Tomada de decisão", "Trabalho sob pressão", "Iniciativa"],
  I: ["Comunicação", "Mobilização da equipe", "Relacionamento"],
  S: ["Estabilidade", "Consistência", "Cooperação"],
  C: ["Investigação", "Análise de causa", "Precisão e evidências"],
}

const WATCHOUTS = {
  D: "Paciência com ritmos mais lentos",
  I: "Objetividade e foco em evidências",
  S: "Flexibilidade diante de mudanças",
  C: "Velocidade de decisão sem todos os dados",
}

const LOW = {
  D: "Decisão sob pressão",
  I: "Comunicação com áreas externas",
  S: "Paciência com processos repetitivos",
  C: "Rigor com dados e padrões",
}

function toPct(raw) {
  const total = raw.D + raw.I + raw.S + raw.C
  const exact = { D: (raw.D / total) * 100, I: (raw.I / total) * 100, S: (raw.S / total) * 100, C: (raw.C / total) * 100 }
  const rounded = {
    D: Math.round(exact.D),
    I: Math.round(exact.I),
    S: Math.round(exact.S),
    C: Math.round(exact.C),
  }
  let diff = 100 - (rounded.D + rounded.I + rounded.S + rounded.C)
  const keys = ["D", "I", "S", "C"].sort((a, b) => exact[b] - rounded[b] - (exact[a] - rounded[a]))
  while (diff !== 0) {
    const k = diff > 0 ? keys[0] : keys[keys.length - 1]
    rounded[k] += diff > 0 ? 1 : -1
    diff += diff > 0 ? -1 : 1
  }
  return rounded
}

function computeDisc(answers) {
  const raw = { D: 0, I: 0, S: 0, C: 0 }
  for (const { mais, menos } of answers) {
    for (const letter of ["A", "B", "C", "D"]) {
      raw[LETTER[letter]] += letter === mais ? 2 : letter === menos ? 0 : 1
    }
  }
  return { raw, pct: toPct(raw) }
}

function adherence(pct, role) {
  const dist =
    Math.abs(pct.D - role.D) +
    Math.abs(pct.I - role.I) +
    Math.abs(pct.S - role.S) +
    Math.abs(pct.C - role.C)
  return Math.round(100 - dist / 2)
}

function rankedFactors(pct) {
  return ["D", "I", "S", "C"].sort((a, b) => pct[b] - pct[a] || a.localeCompare(b))
}

function profileLabel(pct) {
  const [a, b] = rankedFactors(pct)
  return PROFILE[a + "/" + b] || a + "/" + b
}

function strengthsOf(pct) {
  return rankedFactors(pct)
    .filter((f) => pct[f] >= 25)
    .flatMap((f) => STRENGTHS[f])
    .slice(0, 5)
}

function watchoutsOf(pct) {
  const ranked = rankedFactors(pct)
  const out = []
  out.push(WATCHOUTS[ranked[0]])
  ranked.filter((f) => pct[f] <= 20).forEach((f) => out.push(LOW[f]))
  return [...new Set(out)].slice(0, 3)
}

function rankRoles(pct) {
  return ROLES.map((role) => ({ ...role, score: adherence(pct, role) })).sort((a, b) => b.score - a.score)
}

function scoreAll(answers) {
  const { raw, pct } = computeDisc(answers)
  const roles = rankRoles(pct)
  return {
    raw,
    pct,
    profile: profileLabel(pct),
    roles,
    recommended: roles[0],
    strengths: strengthsOf(pct),
    watchouts: watchoutsOf(pct),
  }
}

const DiscImoc = { LETTER, ROLES, computeDisc, adherence, rankRoles, scoreAll, profileLabel }
if (typeof window !== "undefined") window.DiscImoc = DiscImoc
if (typeof module !== "undefined" && module.exports) module.exports = DiscImoc
