export const navigation = reactive<Navigation>({
  index: {
    title: '首頁',
  },
  clients: {
    title: '客戶清單',
  },
  confirm: {
    title: '折讓單確認',
  },
  news: {
    title: '公告管理',
  },
  accounts: {
    title: '角色管理',
  },
  'accounts-roles': {
    title: '角色權限',
    breadcrumb: {
      items: [
        {
          icon: 'manage_accounts',
          title: '角色管理',
          disabled: false,
        },
        {
          title: '角色權限',
          disabled: true,
        },
      ],
    },
  },
  'accounts-users': {
    title: '人員資料',
    breadcrumb: {
      items: [
        {
          icon: 'manage_accounts',
          title: '角色管理',
          disabled: false,
        },
        {
          title: '人員資料',
          disabled: true,
        },
      ],
    },
  },
});
