// table data (fake data)
export const groupData = [
  {
    id: 1,
    number: '001',
    name: '開發工程師',
    updated_at: '2025/03/20'
  },
  {
    id: 2,
    name: '開發工程師2',
    updated_at: '2025/03/22'
  }
]

// permission data
export const permissions = [
  {
    id: 1,
    label: '據點管理',
    children: [
      { label: '瀏覽', id: 2 },
      { label: '新增', id: 3 },
      { label: '編輯', id: 4 },
      { label: '刪除', id: 5 }
    ]
  },
  {
    label: '部門管理',
    id: 6,
    children: [
      { label: '瀏覽', id: 7 },
      { label: '新增', id: 8 },
      { label: '編輯', id: 9 },
      { label: '刪除', id: 10 }
    ]
  },
  {
    label: '料材管理',
    id: 11,
    children: [
      { label: '瀏覽', id: 12 },
      { label: '新增', id: 13 },
      { label: '編輯', id: 14 },
      { label: '刪除', id: 15 }
    ]
  },
  {
    label: '製程管理',
    id: 16,
    children: [
      { label: '瀏覽', id: 17 },
      { label: '新增', id: 18 },
      { label: '編輯', id: 19 },
      { label: '刪除', id: 20 }
    ]
  },
  {
    label: '檢驗管理',
    id: 21,
    children: [
      {
        label: '標準設定',
        id: 22,
        children: [
          { label: '瀏覽', id: 23 },
          { label: '新增', id: 24 },
          { label: '編輯', id: 25 },
          { label: '刪除', id: 26 }
        ]
      },
      {
        label: '異常覆核',
        id: 27
      },
      {
        label: '檢驗單維護',
        id: 28
      }
    ]
  },
  {
    label: '特殊時間管理',
    id: 29
  },
  {
    label: '角色管理',
    id: 30,
    children: [
      {
        label: '權限設置',
        id: 31,
        children: [
          { label: '瀏覽', id: 32 },
          { label: '新增', id: 33 },
          { label: '編輯', id: 34 },
          { label: '刪除', id: 35 }
        ]
      },
      {
        label: '人員資料',
        id: 36,
        children: [
          { label: '瀏覽', id: 37 },
          { label: '新增', id: 38 },
          { label: '編輯', id: 39 },
          { label: '刪除', id: 40 },
          { label: '匯入', id: 41 },
          { label: '匯出', id: 42 }
        ]
      }
    ]
  }
]
