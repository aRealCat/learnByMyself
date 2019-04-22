export let routes: any[] = [
      {
        path: '/',
        name: '产品分配',
        iconCls: 'fa fa-hand-stop-o magrin-right-10',
        children: [
            { path: '/allot',  name: '高级分配'}
        ]
    },
    {
        path: '/',
        name: '配额管理',
        iconCls: 'fa fa-sort-numeric-asc magrin-right-10',
        children: [
            { path: '/quotaByClassify',  name: '按分类管理' },
            { path: '/quotaByProduct',  name: '按产品管理' }
        ]
    },
    {
        path: '/',
        name: '定价管理',
        iconCls: 'fa fa-money magrin-right-10',
        children: [
            { path: '/price',  name: '按分类定价' },
            { path: '/rules',  name: '按产品定价' }
        ]
    },
    {
        path: '/',
        name: '',
        iconCls: 'fa fa-file-photo-o  magrin-right-10',
        leaf: true, // 只有一个节点
        children: [
            { path: '/gallery',  name: '产品图库' }
        ]
    },
     {
        path: '/',
        name: '',
        iconCls: 'fa fa-file magrin-right-10',
        leaf: true,
        children: [
            { path: '/productList',  name: '产品档案' }
        ]
    }
  ]
