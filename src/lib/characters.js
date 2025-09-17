export function normalizeCharacters(list = []) {
  return list.map((c, idx) => {
    const realmId = c.realmId ?? c.realm_id ?? c.realm?.id ?? c.realm ?? null;
    const guid = c.guid ?? c.characterGuid ?? c.character_guid ?? c.id ?? null;
    const realmName = c.realmName ?? c.realm_name ?? c.realm?.name ?? String(c.realm ?? "");
    const name = c.name ?? c.charName ?? c.characterName ?? "";
    const balanceCopper = Number(c.balanceCopper ?? c.balance_copper ?? c.balance ?? 0);
    const _key = `${realmId ?? "r"}:${guid ?? "g"}:${name || idx}`;
    return {
      ...c,
      realmId,
      guid,
      realmName,
      name,
      balanceCopper,
      _key,
    };
  });
}

