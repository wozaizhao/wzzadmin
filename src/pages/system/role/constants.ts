import type { FormRule } from 'tdesign-vue-next';

export const FORM_RULES: Record<string, FormRule[]> = {
  name: [{ required: true, message: '请输入角色名称', type: 'error' }],
};

export const INITIAL_DATA = {
  id: '',
  name: '',
  menus: [] as any,
  remark: '',
};
