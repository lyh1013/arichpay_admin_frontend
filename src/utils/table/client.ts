import { type DataTableHeader } from '../types'

export const headers: DataTableHeader[] = [
  { title: '操作', key: 'actions', sortable: false, align: 'center' },
  { title: '名稱', key: 'name' },
  { title: '負責人', key: 'representative', sortable: false },
  { title: '統一編號', key: 'id_number', sortable: false },
  { title: '電話', key: 'tel', sortable: false },
  { title: '信箱', key: 'email', sortable: false },
  { title: '地址', key: 'address', sortable: false }
]
