import * as XLSX from 'xlsx-js-style';

interface RowData {
  [key: string]: string | number;
}

export function useExport() {
  const { aoa_to_sheet, book_new, book_append_sheet } = XLSX.utils;

  const { notify } = useNotify();

  function exportExcel(exportHeaders: string[], exportData: any[], exportName: string) {
    if (!exportData.length) {
      notify('無資料可匯出', 'error');

      return;
    }

    const worksheet = aoa_to_sheet([exportHeaders, ...exportData]);

    worksheet['!cols'] = exportHeaders.map(() => ({ wch: 20 }));

    const workbook = book_new();

    book_append_sheet(workbook, worksheet);

    XLSX.writeFile(workbook, `${exportName}.xlsx`);
  }

  function exportErrorExcel(rawData: Record<string, any>[]) {
    if (!rawData.length || !Array.isArray(rawData)) return;

    const flatData: RowData[] = rawData.map(row => Object.values(row)[0] || {});

    const headers = Object.keys(flatData[0] ?? {});

    const aoa = [headers, ...flatData.map(row => headers.map(key => row[key] ?? ''))]; // [[欄位列], [值列], ...]

    const worksheet = aoa_to_sheet(aoa);

    flatData.forEach((row, rowIdx) => {
      headers.forEach((key, colIdx) => {
        const value = row[key];

        if (typeof value === 'string' && /(重複|不存在|未定義|錯誤)/.test(value)) {
          const excelRow = rowIdx + 2; // Excel index 從1開始
          const excelCol = XLSX.utils.encode_col(colIdx);
          const cellRef = `${excelCol}${excelRow}`;

          if (!worksheet[cellRef]) return;

          worksheet[cellRef].s = {
            font: {
              color: { rgb: 'FF0000' },
            },
          };
        }
      });
    });

    worksheet['!cols'] = headers.map(() => ({ wch: 20 }));

    const workbook = book_new();

    book_append_sheet(workbook, worksheet, '錯誤資料');

    XLSX.writeFile(workbook, '匯入錯誤檔.xlsx');
  }

  return {
    exportExcel,
    exportErrorExcel,
  };
}
