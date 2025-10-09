const ip = require('ip');

// Normalize IPv6-mapped IPv4 and loopback
function normalize(addr = '') {
  addr = addr.replace(/^::ffff:/, '');
  return addr === '::1' ? '127.0.0.1' : addr;
}

function parseAllowlist(str = '') {
  const raw = (str || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const singles = [];
  const cidrs = [];
  for (const e of raw) (e.includes('/') ? cidrs : singles).push(e);
  return { singles, cidrs, raw };
}

function getClientIp(req) {
  // works when app.set('trust proxy', 1) is enabled
  if (req.ip) return normalize(req.ip);
  const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return normalize(fwd || req.socket?.remoteAddress || '');
}

function isAllowed(addr, allow) {
  if (!addr) return false;
  const a = normalize(addr);
  if (allow.singles.includes(a)) return true;
  for (const block of allow.cidrs) {
    try { if (ip.cidrSubnet(block).contains(a)) return true; } catch {}
  }
  return false;
}

function ipAllowlist() {
  let allow = parseAllowlist(process.env.ALLOWED_IPS || '');
  const debug = !!process.env.ALLOWLIST_DEBUG;

  return (req, res, next) => {
    // hot-reload if env changed (handy on re-deploys)
    if ((process.env.ALLOWED_IPS || '') !== allow.raw) {
      allow = parseAllowlist(process.env.ALLOWED_IPS || '');
      if (debug) console.log(`[allowlist] reloaded: ${allow.raw || '(empty)'}`);
    }

    const clientIp = getClientIp(req);
    const ok = isAllowed(clientIp, allow);
    if (debug) console.log(`[allowlist] ${ok ? 'ALLOW' : 'DENY '} ${clientIp}  ALLOWED_IPS=${allow.raw || '(empty)'}`);

    if (!ok) return res.status(403).send('Forbidden (IP not allowlisted)');
    next();
  };
}

module.exports = { ipAllowlist };
