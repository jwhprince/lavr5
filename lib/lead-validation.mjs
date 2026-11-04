export function validateLead(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { name, phone, direction, consent, website } = body;
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 80 ||
    /[\r\n<>]/.test(name)
  )
    return null;
  if (
    typeof phone !== "string" ||
    phone.length > 24 ||
    !/^[+\d() .-]+$/.test(phone)
  )
    return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  if (
    !["Помогите выбрать", "Бальные танцы", "Baby-dance", "Латина"].includes(
      direction,
    ) ||
    consent !== "yes" ||
    (website !== undefined && website !== "")
  )
    return null;
  return {
    name: name.trim(),
    phone,
    direction,
    consent: true,
    consentVersion: "2026-11-03",
  };
}
