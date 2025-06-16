import type { InjectionKey } from 'vue';
import type { VxePagerEvents } from 'vxe-pc-ui';
import type { StoreGeneric } from 'pinia';

import { format } from 'date-fns';

import Base from './base';

export class DtUtils extends Base {
  public static readonly key = Symbol('DtUtils') as InjectionKey<DtUtils & Base>;

  constructor(store: StoreGeneric) {
    super(store);

    this.getTableSubscribe();
  }

  private readonly getTableSubscribe = () => {
    this.store.$onAction(({ name, args, after }) => {
      const isDtAction = name === 'getTable';
      const isFilterAction = name === 'getFilters';

      if (isFilterAction) after(res => this.setFilter(args[0], res));

      if (isDtAction) {
        this.resetSelect();

        this.setLoading(true);

        after(res => {
          this.setTable(res);

          res.forEach((item: any) => {
            ['UpdatedDate'].forEach(key => {
              if (item[key]) item[key] = format(new Date(item[key]), 'yyyy-MM-dd HH:mm:ss');
            });
          });
        });
      }
    });
  };

  public setFilter = (filterColumns: string[], results: Record<string, any[]>) => {
    if (!results) return;

    nextTick(() => {
      Object.entries(results).forEach(([key, value]) => {
        if (!filterColumns.includes(key)) return;

        this.table.setFilter(key, value, true);
      });
    });
  };

  public setTable = (results: any) => {
    if (!results) return;

    this.setData(results);
    this.setPager(1, results.length);
    this.setDtSort();

    this.setLoading(false);
  };

  public pageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
    this.setPager(currentPage, null, pageSize);

    this.handlePageData();
  };

  public selectVisible = () => {
    const column = this.table.getColumnByField('select');

    if (!column) return;

    this.isSelectBatch.value = !this.isSelectBatch.value;

    if (!this.isSelectBatch.value) {
      this.table.hideColumn(column);

      this.resetSelect();

      return;
    }

    this.table.showColumn(column);
  };

  public searchEvent = (search: string, searchProps: string[]) => {
    if (!search) {
      this.data.value = [...this.dataSource.value];

      this.setPager(1, this.dataSource.value.length);

      return;
    }

    const filterVal = search.trim().toLowerCase();

    if (filterVal) {
      const filterRE = new RegExp(filterVal, 'i');

      const filteredData = this.dataSource.value.filter(item =>
        searchProps.some(key => {
          const fieldValue = String(item[key] ?? '').toLowerCase();

          return filterRE.test(fieldValue);
        }),
      );

      this.data.value = filteredData;

      this.setPager(1, filteredData.length);
    }
  };

  public sortChange = ({ column }: any) => {
    if (!column.sortable) return;

    const { field, order } = column;

    if (!field || !order) return;

    this._params.sort = [field, order];

    this.store.getTable();
  };

  public filterChange = ({ field, values }: any) => {
    this._params.filters[field] = values;

    let filteredData = [...this.dataSource.value];

    Object.entries(this._params.filters).forEach(([field, values]) => {
      if (values && values.length > 0) {
        filteredData = filteredData.filter(item => values.includes(item[field]));
      }
    });

    this.data.value = filteredData;

    this.setPager(1, filteredData.length);
  };

  public selectChange = (row: any) => {
    this.select.count = row.records.length;
  };

  public selectRangeChange = (row: any) => {
    this.select.count = row.records.length;
  };

  public remove = async (id?: number | string | null) => {
    if (!id) return;

    await this.store.remove([id]).finally(() => this.store.getTable());
  };

  public removeBatch = async () => {
    if (this.select.count <= 0) return;

    const records = this.table.getCheckboxRecords();

    const rows = records.map(item => item.UUID);

    await this.store.remove(rows).finally(() => {
      this.store.getTable();

      this.resetSelect();
    });
  };

  public actionBatch = async (value: string | boolean) => {
    if (this.select.count <= 0) return;

    const records = this.table.getCheckboxRecords();

    const uuids = records.map(item => item.UUID);

    await this.store.actions(uuids, value);

    await this.store.getTable();

    this.resetSelect();
  };

  public setExportData = (excludeFields: string[], data: any) => {
    const result = data.map((item: any) => {
      return Object.entries(item)
        .filter(([key]) => !excludeFields.includes(key))
        .map(([key, value]: any) => {
          if (key === 'UpdatedDate' || key === 'CreatedDate') {
            return format(value, 'yyyy-MM-dd HH:mm:ss');
          }

          return value;
        });
    });

    return result;
  };
}
