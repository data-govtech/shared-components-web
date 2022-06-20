export function convertNameToText(str: string) {
  return str.replace(/[A-Z]/g, (p: string) => ` ${p.toUpperCase()}`).trim();
}

export function genStatusColorMapping(
  mapping: Record<string, string>,
  defaultValue: string = 'default'
) {
  return function (status: string | string) {
    return mapping[status] ?? defaultValue;
  };
}
