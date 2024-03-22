import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

import { STATUS_TXT } from '@/constants';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '帐号',
    // align: 'center',
    // width: 320,
    colKey: 'account',
    // fixed: 'left',
  },
  { title: '手机号', colKey: 'phoneNumber' },
  {
    title: '角色',
    // width: 200,
    // ellipsis: true,
    colKey: 'roles',
    // cell: (h, { col, row }) => row.roles.map((ele: any) => ele.name).join(','),
  },
  {
    title: '状态',
    // width: 100,
    // ellipsis: true,
    colKey: 'status',
    cell: (h, { row }) => STATUS_TXT[row.status],
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
