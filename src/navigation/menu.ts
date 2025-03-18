export type Menu = {
  to?: string
  title: string
  icon?: string
  children?: Menu[]
}

export const menus: Menu[] = [
  {
    to: '/',
    title: '首頁',
    icon: 'mdi-home'
  },
  {
    to: '/clients',
    title: '客戶清單',
    icon: 'mdi-account-multiple'
  },
  {
    to: '/confirm',
    title: '折讓單確認',
    icon: 'mdi-list-box'
  },
  {
    to: '/news',
    title: '公告管理',
    icon: 'mdi-list-box'
  },
  {
    title: '帳戶管理',
    icon: 'mdi-account-settings',
    children: [
      {
        to: '/accounts/usergroups',
        title: '帳戶群組'
      },
      {
        to: '/accounts/users',
        title: '帳戶資訊'
      }
    ]
  }
]
