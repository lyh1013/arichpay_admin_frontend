import type { StoreGeneric } from 'pinia'

import { format } from 'date-fns'

import type {
  VxeTableInstance,
  VxeColumnPropTypes,
  VxePagerInstance,
  VxeTablePropTypes
} from 'vxe-table'

interface Params {
  sort: any[] | null
  searches: any
  filters: Record<string, string[]>
}

export default class Base {
  protected store: StoreGeneric
  protected table = {} as VxeTableInstance
  private vxePager = {} as VxePagerInstance

  public loading = shallowRef<boolean>(false)

  public data = shallowRef<VxeTablePropTypes.Data | undefined>()
  public dataSource = ref<VxeTablePropTypes.Data>([])

  public filters = ref<VxeColumnPropTypes.Filters>([])

  public pager = reactive<Record<string, number | undefined>>({
    p: 1,
    length: 35,
    totals: 0
  })

  public select = reactive<{
    count: number
    visible: boolean
  }>({
    count: 0,
    visible: false
  })

  public isSelected = computed<boolean>(() => this.select.count > 0)
  public isSelectBatch = shallowRef<boolean>(false)

  protected _params = reactive<Params>({
    sort: null,
    searches: {},
    filters: {}
  })

  public params = computed(() => {
    const ignore = ['searches', 'filters']

    return Object.keys(this._params).reduce((acc, key) => {
      const value = this._params[key as keyof Params]

      if (ignore.includes(key)) {
        if (value && Object.keys(value).length > 0) acc[key as keyof Params] = value

        return acc
      }

      acc[key as keyof Params] = value

      return acc
    }, {} as Partial<Params>)
  })

  private defaultSort: [string, 'asc' | 'desc'] | null = null

  constructor(store: StoreGeneric) {
    this.store = store

    onBeforeUnmount(() => this.reset())
  }

  public reset = () => {
    this.setData(undefined)
    this.resetSort()
    this.resetSearch()
    this.resetFilter()
    this.setPager(1, 0, 35)
  }

  public resetDt = () => {
    this.setData(undefined)

    this.resetSearch()
    this.resetFilter()

    this.setPager(1)

    this.store.getTable()
  }

  protected resetSearch = () => {
    this._params.searches = {}
  }

  protected resetFilter = () => {
    this.table.clearFilter()

    this._params.filters = {}
  }

  private readonly resetSort = () => {
    this._params.sort = this.defaultSort
  }

  protected resetSelect = () => {
    this.select.count = 0

    this.table.clearCheckboxRow()
  }

  public setTableRef = (ref?: VxeTableInstance | null) => {
    if (!ref) return

    this.table = ref
  }

  public setPagerRef = (ref: VxePagerInstance | null) => {
    if (!ref) return

    this.vxePager = ref
  }

  protected setLoading = (state: boolean) => {
    this.loading.value = state
  }

  protected setData = (data: VxeTablePropTypes.Data | undefined) => {
    this.dataSource.value = data ?? []

    this.handlePageData()
  }

  public updateDtRowData = (res: VxeTablePropTypes.Row) => {
    if (!this.data.value) return

    const row = this.data.value.find(item => item.UUID === res.UUID)

    if (!row) return

    const rows = toReactive(row)

    const dateValue = res.UpdatedDate || res.updatedDate

    const formattedDate = dateValue ? format(new Date(dateValue), 'yyyy-MM-dd HH:mm:ss') : ''

    const newRes = { ...res, UpdatedDate: formattedDate, updatedDate: formattedDate }

    this.table.setRow(rows, newRes)
  }

  public setSort = (field: string, order: 'asc' | 'desc') => {
    this._params.sort = [field, order]

    if (!this.defaultSort) this.defaultSort = [field, order]
  }

  protected setDtSort = () => {
    if (this.table.getSortColumns().length > 0) {
      const { field, order } = this.table.getSortColumns()[0]

      this.table.sort(field, order)

      return
    }

    const [field, order] = this._params.sort ?? [null, null]

    if (!field || !order) return

    this.table.sort(field, order)
  }

  protected setPager = (p: number, total?: number | null, length?: number) => {
    this.pager.p = p
    this.pager.totals = total ?? this.pager.totals
    this.pager.length = length ?? this.vxePager?.pageSize ?? this.pager.length
  }

  public handlePageData = () => {
    const page = this.pager.p ?? 1
    const pageSize = this.pager.length ?? 35

    const start = (page - 1) * pageSize
    const end = start + pageSize

    this.data.value = this.dataSource.value.slice(start, end)
  }

  public setColumnFixed = (field: VxeColumnPropTypes.Field, fixed: VxeColumnPropTypes.Fixed) => {
    this.table.setColumnFixed(field, fixed)
  }
}
