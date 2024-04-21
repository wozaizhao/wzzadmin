import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData, Image } from 'tdesign-vue-next';

import { STATUS_TXT } from '@/constants';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: 'Logo',
    // align: 'center',
    width: 100,
    colKey: 'logo',
    // fixed: 'left',
    cell: (h, { col, row }) => h('div', h(Image, { loading: 'loading...', src: `https://cos.wozaizhao.com/${row.logo}` })),
  },
  {
    title: '名称',
    // align: 'center',
    // width: 320,
    colKey: 'title',
    // fixed: 'left',
  },
  {
    title: '评论',
    width: 300,
    ellipsis: true,
    colKey: 'comment',
  },
  {
    title: '标签',
    // align: 'center',
    // width: 320,
    colKey: 'tags',
    // fixed: 'left',
  },
  {
    title: '可见',
    // width: 100,
    // ellipsis: true,
    colKey: 'visible',
  },
  {
    title: '创建时间',
    width: 220,
    // ellipsis: true,
    colKey: 'createdAt',
    cell: (h, { col, row }) => dayjs(row[col.colKey]).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
  },
];
