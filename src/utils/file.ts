import { saveAs } from 'file-saver';

interface Params {
  fileContent: string;
  type: string;
  filename: string;
}
export function saveFile({ fileContent, type, filename }: Params) {
  const blob = new Blob([fileContent], { type });
  saveAs(blob, filename);
}
