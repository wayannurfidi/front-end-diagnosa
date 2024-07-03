export const hitungUmur = (tanggalLahir) => {
  const [year, month, day] = tanggalLahir.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  const today = new Date();
  let umur = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    umur--;
  }
  return umur;
};

export const formatTanggal = (tanggalLahir) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(tanggalLahir);
  return date.toLocaleDateString("id-ID", options);
};
