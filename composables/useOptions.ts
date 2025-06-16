const cachedOption = reactive<Record<string, any[]>>({});

export function useOptions() {
  async function getCachedOption(key: string, fetcher: () => Promise<any>) {
    if (!cachedOption[key]?.length) {
      const res = await fetcher();

      cachedOption[key] = res.Data ?? res;
    }

    return cachedOption[key];
  }

  function formatOptions(list: any[], includeNone = false, hasCompany = false) {
    const options = list.map(item => {
      const base = {
        label: item.Name ?? item.Value,
        value: item.UUID,
        ...(hasCompany ? { company: item?.CompanyInfo?.Name } : {}),
      };

      return base;
    });

    return includeNone ? [{ label: '無', value: null }, ...options] : options;
  }

  return {
    getCachedOption,
    formatOptions,
  };
}
