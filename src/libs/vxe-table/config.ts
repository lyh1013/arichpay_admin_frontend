import type { VxeGlobalConfig } from 'vxe-table'

export const tableConfig: VxeGlobalConfig = {
  table: {
    border: true,
    round: true,
    sortConfig: {
      trigger: 'cell',
      orders: ['asc', 'desc'],
      iconAsc: 'fa fa-sort-up',
      iconDesc: 'fa fa-sort-down'
    },
    rowConfig: { isHover: true },
    columnConfig: { resizable: true },
    checkboxConfig: { highlight: true, range: true, isShiftKey: true }
  },
  pager: {
    // autoHidden: true,
    pageSize: 35,
    pageSizes: [35, 50, 100, 150],
    layouts: [
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump',
      'Total'
    ]
  }
}

export const iconConfig = {
  TABLE_EXPAND_OPEN: 'fa fa-circle-minus',
  TABLE_EXPAND_CLOSE: 'fa fa-circle-plus',
  PAGER_JUMP_PREV: 'fa fa-angles-left',
  PAGER_JUMP_NEXT: 'fa fa-angles-right',
  PAGER_PREV_PAGE: 'fa fa-angle-left',
  PAGER_NEXT_PAGE: 'fa fa-angle-right',
  PAGER_JUMP_MORE: 'fa fa-ellipsis'
}

export const getLocalePackage = (value?: string): Promise<any> => {
  //   const { getLocale } = await import('@/utils/utils')

  const locale: string = value ?? 'zh-TW'

  const packageConfigurations: { [key: string]: () => Promise<any> } = {
    en: () => import('vxe-pc-ui/lib/language/en-US'),
    'zh-TW': () => import('vxe-pc-ui/lib/language/zh-TW')
  }

  const isPackageExist: boolean = Object.prototype.hasOwnProperty.call(
    packageConfigurations,
    locale
  )

  if (isPackageExist) return packageConfigurations[locale]()

  return packageConfigurations['zh-TW']()
}
