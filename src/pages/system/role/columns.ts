import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '角色名称',
    // align: 'center',
    // width: 320,
    colKey: 'name',
    // fixed: 'left',
  },
  { title: '备注', colKey: 'remark' },
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
