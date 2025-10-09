const ip = require('ip');
const AllowIp = require('../models/AllowIp.js');

const REFRESH_MS = Number(process.env.ALLOWLIST_REFRESH_MS || 15000);
const DEBUG = !!process.env.ALLOWLIST_DEBUG;

function normalize(a = '') {
  a = a.replace(/^::ffff:/, '');
  return a === '::1' ? '127.0.0.1' : a;
}

function getClientIp(req) {
  if (req.ip) return normalize(req.ip);
  const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return normalize(fwd || req.socket?.remoteAddress || '');
}

let cache = { singles: new Set(), cidrs: [], raw: [] };

async function reload() {
  const rows = await AllowIp.find({ enabled: true }).lean();
  const singles = new Set();
  const cidrs = [];
  const raw = [];

  for (const r of rows) {
    raw.push(r.value);
    if (r.value.includes('/')) cidrs.push(r.value);
    else singles.add(r.value);
  }

  cache = { singles, cidrs, raw };
  if (DEBUG) console.log('[allowlist-db] loaded:', raw.join(', ') || '(empty)');
}

function isAllowed(addr) {
  if (!addr) return false;
  const a = normalize(addr);
  if (cache.singles.has(a)) return true;
  for (const c of cache.cidrs) {
    try { if (ip.cidrSubnet(c).contains(a)) return true; } catch {}
  }
  return false;
}

function ipAllowlistDb() {
  // initial load + periodic refresh
  reload().catch(() => {});
  setInterval(reload, REFRESH_MS).unref();

  return (req, res, next) => {
    const clientIp = getClientIp(req);
    const ok = isAllowed(clientIp);
    if (DEBUG) console.log(`[allowlist-db] ${ok ? 'ALLOW' : 'DENY '} ${clientIp}`);
    if (!ok) return res.status(403).send('Forbidden (IP not allowlisted)');
    next();
  };
}

module.exports = { ipAllowlistDb, reload };
