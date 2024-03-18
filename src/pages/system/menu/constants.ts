import type { FormRule } from 'tdesign-vue-next';

export const FORM_RULES: Record<string, FormRule[]> = {
  title: [{ required: true, message: '请输入名称', type: 'error' }],
  name: [{ required: true, message: '请输入名称', type: 'error' }],
  path: [{ required: true, message: '请输入路由地址', type: 'error' }],
  component: [{ required: true, message: '请输入组件路径', type: 'error' }],
};

export const INITIAL_DATA = () => ({
  id: '',
  name: '',
  path: '',
  redirect: '',
  type: 0,
  authCode: '',
  parentID: '',
  component: '',
  sort: 0,
  icon: '',
  title: '', // meta
  hidden: false, // meta
  isFrame: false, // meta
  keepAlive: false, // meta
  frameSrc: '',
  frameBlank: false,
  // meta: '',
});
