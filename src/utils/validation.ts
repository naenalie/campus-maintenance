export function validateTitle(title: string | undefined): boolean {
  if (!title) return false;
  const len = title.trim().length;
  return len >= 5 && len <= 100;
}

export function validateDescription(desc: string | undefined): boolean {
  if (!desc) return false;
  const len = desc.trim().length;
  return len >= 20 && len <= 1000;
}

export function validateLocation(loc: string | undefined): boolean {
  if (!loc) return false;
  const len = loc.trim().length;
  return len >= 3 && len <= 100;
}

export function validateCategory(cat: string | undefined): boolean {
  if (!cat) return false;
  const validCategories = [
    "Internet & Jaringan",
    "Pendingin Ruangan (AC)",
    "Peralatan Kelas",
    "Alat Laboratorium",
    "Kebersihan & Sanitasi",
    "Lainnya",
  ];
  return validCategories.includes(cat);
}

export function validateRequestNumber(num: string | undefined): boolean {
  if (!num) return false;
  const regex = /^CSR-\d{8}-\d{4}$/;
  return regex.test(num);
}
