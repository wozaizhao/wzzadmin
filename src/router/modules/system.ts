import { AdjustmentIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'system',
    meta: {
      title: {
        zh_CN: '系统管理',
        en_US: 'System',
      },
      icon: shallowRef(AdjustmentIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'menu',
        name: 'systemMenu',
        component: () => import('@/pages/system/menu/index.vue'),
        meta: {
          title: {
            zh_CN: '菜单管理',
            en_US: 'SystemMenu',
          },
        },
      },
      {
        path: 'role',
        name: 'systemRole',
        component: () => import('@/pages/system/role/index.vue'),
        meta: {
          title: {
            zh_CN: '角色管理',
            en_US: 'SystemRole',
          },
        },
      },
      {
        path: 'admin',
        name: 'systemAdmin',
        component: () => import('@/pages/system/admin/index.vue'),
        meta: {
          title: {
            zh_CN: '管理员管理',
            en_US: 'SystemAdmin',
          },
        },
      },
    ],
  },
];
