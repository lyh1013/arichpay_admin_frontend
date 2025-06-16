import { format } from 'date-fns';

export function useFormat() {
  function dateFormat(dateValue: string) {
    return format(new Date(dateValue), 'yyyy-MM-dd HH:mm:ss');
  }

  function formatFilters(data: any[], key: string) {
    const existed = new Set<any>();

    return data
      .filter(item => item[key] != null && !existed.has(item[key]) && existed.add(item[key]))
      .map(item => ({
        label: item[key],
        value: item[key],
      }));
  }

  function formatSort(data: any[], sortKey: string, isDate = false) {
    return data?.sort((a, b) => {
      if (isDate) {
        return new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime();
      }

      return a[sortKey] - b[sortKey];
    });
  }

  return {
    dateFormat,
    formatFilters,
    formatSort,
  };
}
