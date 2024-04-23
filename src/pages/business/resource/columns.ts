import dayjs from 'dayjs';
import { Image, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: 'Logo',
    // align: 'center',
    // width: 150,
    colKey: 'logo',
    // fixed: 'left',
    cell: (h, { col, row }) =>
      h(Image, {
        class: 'h-5',
        fit: 'scale-down',
        alt: 'logo',
        loading: 'loading...',
        error: '',
        src: `https://cos.wozaizhao.com/${row.logo}`,
      }),
  },
  {
    title: '名称',
    // align: 'center',
    width: 140,
    colKey: 'title',
    // fixed: 'left',
    cell: (h, { col, row }) => h('a', { class: 'text-sky-500', href: row.url, target: '_blank' }, row.title),
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
    width: 180,
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
