/** Format RUT as XX.XXX.XXX-X */
export function formatRut(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length === 0) return "";
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return body.length > 0 ? formatted + "-" + dv : dv;
}

export function validateRut(rut: string): boolean {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  // Must have at least 7 chars: 6 body digits + 1 DV (minimum realistic Chilean RUT)
  if (clean.length < 7) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const expected = 11 - (sum % 11);
  const expectedDv = expected === 11 ? "0" : expected === 10 ? "K" : String(expected);
  return dv === expectedDv;
}

/** Format Chilean patente as AB·CD·12 or AABB·12 */
export function formatPatente(value: string): string {
  const clean = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
  if (clean.length <= 2) return clean;
  if (clean.length <= 4) return clean.slice(0, 2) + "·" + clean.slice(2);
  return clean.slice(0, 2) + "·" + clean.slice(2, 4) + "·" + clean.slice(4);
}

export function validatePatente(value: string): boolean {
  const clean = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  // Old format: 2 letters + 2 letters + 2 digits (AABB12)
  // New format: 2 letters + 2 digits + 2 digits? (BB1234) - accept 4 letters+2digits OR 2letters+4digits
  return /^[A-Z]{4}\d{2}$/.test(clean) || /^[A-Z]{2}\d{4}$/.test(clean);
}