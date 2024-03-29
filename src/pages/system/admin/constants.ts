import type { FormRule } from 'tdesign-vue-next';

export const moduleName = '管理员';

export const FORM_RULES: Record<string, FormRule[]> = {
  roles: [{ required: true, message: '请选择角色', type: 'error' }],
};

export const INITIAL_DATA = {
  id: '',
  account: '',
  email: '',
  phoneNumber: '',
  roles: [] as number[],
};
