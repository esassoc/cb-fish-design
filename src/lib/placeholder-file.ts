/**
 * The placeholder a filename deserves for a prototype download with no real
 * file behind it — a real workbook for .xls/.xlsx, a one-page PDF otherwise
 * (a PDF named .xlsx is worse than useless: Excel refuses to open it). Shared
 * by the CRS commitment documents grid and the CRS document library.
 */
import { makePlaceholderPdf } from './placeholder-pdf';
import { makePlaceholderXlsx } from './placeholder-xlsx';

export function placeholderFor(filename: string, subtitle: string): Blob {
  return /\.xlsx?$/i.test(filename)
    ? makePlaceholderXlsx(filename.replace(/\.[^.]+$/, '').slice(0, 31), [[filename], [subtitle]])
    : makePlaceholderPdf(filename, subtitle);
}
