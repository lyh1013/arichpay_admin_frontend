type Navigation = {
  [key: string | symbol]: {
    title: string
    icon?: {
      icon?: string
      size?: number
    }
    breadcrumb?: {
      prevHref?: string
      items: {
        title: string
        href?: string
        disabled?: boolean
      }[]
    }
  }
}

export const navigation = reactive<Navigation>({
  error: {
    title: 'Oops! 找不到頁面'
  },
  notauthorized: {
    title: '權限無法操作'
  },
  signin: {
    title: '登入'
  },
  forget: {
    title: '忘記密碼'
  },
  resetpwd: {
    title: '重設密碼'
  },
  home: {
    title: '首頁'
  },
  clients: {
    title: '客戶清單'
  },
  news: {
    title: '公告管理'
  },
  confirm: {
    title: '折讓單確認'
  },
  usergroups: {
    title: '帳戶群組'
  },
  users: {
    title: '帳戶資料'
  },
  profile: {
    title: '個人資料',
    breadcrumb: {
      items: [
        {
          title: '帳戶管理',
          disabled: false
        },
        {
          title: '個人資料',
          disabled: true
        }
      ]
    }
  }
})
