const PUB = {"kty":"RSA","n":"x456V5ycQ3dmRHb1paTfmx2tyVPZ-EqGkumnil0DHRJSdL2G2xhv1jmwRRtpr9cJ_FfBUrHZCU5PEgBB27j6jwgmDe-DXSs0dn7huVOxNA9b4Or0bVWG6rxrER7Ng_TPjzUXDR6hWBwUKbh64043j4NupwkpGlsahmTei8MJ0A6IqJnlc27uCZBnX2TsJqqzpInFDjf70gmxoTV3vsn_4LjysLJzU8cmCNTxCckfnFmTdcI6juei0LgaEdYHVLbRcib66-BOTnJ9GnLDpXHWvSCiA_Fko2_z5u-vYnGCFZaaKyRVe9LCo-45SL3jw1aZmK9_pph-sfHCaWUFuvcUIw","e":"AQAB"}

const WRAP = {"salt":"W7sBjONDN2UxtlHWBDl8ZQ==","iv":"JdnsPVRWFvkeLtSx","tag":"HQxwYTOpJZvx/G3G0lnD7A==","data":"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"}

function b64e(buf) {
  const u = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf
  let s = ""
  for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i])
  return btoa(s)
}
function b64d(s) {
  const bin = atob(s)
  const u = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i)
  return u
}

async function encryptRow(obj) {
  const pub = await crypto.subtle.importKey("jwk", PUB, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"])
  const aes = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"])
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const d = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aes, new TextEncoder().encode(JSON.stringify(obj)))
  const raw = await crypto.subtle.exportKey("raw", aes)
  const k = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, pub, raw)
  return { at: obj.at, k: b64e(k), iv: b64e(iv), d: b64e(d) }
}

async function unlockPrivate(password) {
  const enc = new TextEncoder()
  const material = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"])
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b64d(WRAP.salt), iterations: 120000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  )
  const data = b64d(WRAP.data)
  const tag = b64d(WRAP.tag)
  const combined = new Uint8Array(data.length + tag.length)
  combined.set(data)
  combined.set(tag, data.length)
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(WRAP.iv) }, key, combined)
  return JSON.parse(new TextDecoder().decode(pt))
}

async function decryptRow(privJwk, row) {
  const priv = await crypto.subtle.importKey("jwk", privJwk, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"])
  const raw = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, priv, b64d(row.k))
  const aes = await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["decrypt"])
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(row.iv) }, aes, b64d(row.d))
  return JSON.parse(new TextDecoder().decode(pt))
}

const WRITE_TOKEN = ""

const ImocCrypto = { PUB, WRITE_TOKEN, encryptRow, unlockPrivate, decryptRow }
if (typeof window !== "undefined") window.ImocCrypto = ImocCrypto
if (typeof module !== "undefined") module.exports = ImocCrypto
