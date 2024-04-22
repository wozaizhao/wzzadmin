import type { FormRule } from 'tdesign-vue-next';

export const moduleName = '资源';

export const FORM_RULES: Record<string, FormRule[]> = {
  title: [{ required: true, message: '请选择名称', type: 'error' }],
  url: [
    { required: true, message: '请输入地址', type: 'error' },
    {
      url: {
        protocols: ['http', 'https'],
        require_protocol: true,
      },
      message: '请输入正确的网址',
    },
  ],
  logoURL: [
    {
      url: {
        protocols: ['http', 'https'],
        require_protocol: true,
      },
      message: '请输入正确的网址',
    },
  ],
};

export const INITIAL_DATA = {
  id: 0,
  title: '',
  url: '',
  logo: '',
  logoURL: '',
  tags: '',
  tagsRaw: [] as string[],
  comment: '',
};
