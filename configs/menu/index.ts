export const menus: Menu[] = [
  {
    to: '/',
    label: '首頁',
    icon: 'home',
  },
  {
    to: '/clients',
    label: '客戶清單',
    icon: 'group',
  },
  {
    to: '/confirm',
    label: '折讓單確認',
    icon: 'receipt_long',
  },
  {
    to: '/news',
    label: '公告管理',
    icon: 'campaign',
  },
  {
    label: '帳戶管理',
    icon: 'manage_accounts',
    children: [
      {
        to: '/accounts/usergroups',
        label: '帳戶群組',
      },
      {
        to: '/accounts/users',
        label: '帳戶資訊',
      },
    ],
  },
];
