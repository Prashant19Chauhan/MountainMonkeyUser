/**
 * Environment-safe, zero-dependency JWT decoder utility.
 * Safe to execute inside Next.js edge Middleware or browser clients.
 */

export function parseJwt(token: string): any {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Polyfill atob if running in pure edge or node configurations where it might be missing
    const decoded = typeof atob !== 'undefined'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');

    const jsonPayload = decoded
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('');

    return JSON.parse(decodeURIComponent(jsonPayload));
  } catch (error) {
    console.error("JWT decoding failed:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  if (!token) return true;
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTimestamp;
}
