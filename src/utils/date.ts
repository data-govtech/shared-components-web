function addZero(no: string) {
  return `0${no}`.substring(no.length + 1, no.length - 1);
}

export function formatDate(dateStr: Date | string = '', format: string = 'DD/MM/YYYY HH:mm') {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const YYYY = d.getFullYear();
  const MM = d.getMonth();
  const DD = d.getDate();
  const HH = d.getHours();
  const mm = d.getMinutes();
  const ss = d.getSeconds();

  const formatted = format
    .replace('YYYY', `${YYYY}`)
    .replace('MM', addZero(`${MM + 1}`))
    .replace('DD', addZero(`${DD}`))
    .replace('HH', addZero(`${HH}`))
    .replace('mm', addZero(`${mm}`))
    .replace('ss', addZero(`${ss}`));

  return isNaN(d as any) ? dateStr : formatted;
}
