export function toPretty(copper) {
  const cc = Math.max(0, Number(copper) || 0);
  const gold = Math.floor(cc / 10000);
  const silver = Math.floor((cc % 10000) / 100);
  const copperR = cc % 100;
  return { gold, silver, copper: copperR };
}

export function formatPretty(pretty) {
  if (!pretty) return "0g 0s 0c";
  return `${pretty.gold}g ${pretty.silver}s ${pretty.copper}c`;
}

export function toCopper({ gold = 0, silver = 0, copper = 0 }) {
  const g = Number.isFinite(+gold) ? Math.max(0, parseInt(gold, 10) || 0) : 0;
  const s = Number.isFinite(+silver)
    ? Math.max(0, Math.min(99, parseInt(silver, 10) || 0))
    : 0;
  const c = Number.isFinite(+copper)
    ? Math.max(0, Math.min(99, parseInt(copper, 10) || 0))
    : 0;
  return g * 10000 + s * 100 + c;
}

