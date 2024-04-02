import type { FormRule } from 'tdesign-vue-next';

export const moduleName = '通知';

export const FORM_RULES: Record<string, FormRule[]> = {
  name: [{ required: true, message: '请选择平台', type: 'error' }],
  platform: [{ required: true, message: '请选择平台', type: 'error' }],
  webHookURL: [{ required: true, message: '请输入发送地址', type: 'error' }],
};

export const INITIAL_DATA = {
  id: '',
  name: '',
  webHookURL: '',
  signSecret: '',
  platform: '',
  remark: '',
  dry: false,
};
