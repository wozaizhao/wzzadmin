import type { FormRule } from 'tdesign-vue-next';

export const moduleName = '通知';

export const FORM_RULES: Record<string, FormRule[]> = {
  sender: [{ required: true, message: '请选择发送通道', type: 'error' }],
  platform: [{ required: true, message: '请选择平台', type: 'error' }],
  message: [{ required: true, message: '请输入消息', type: 'error' }],
};

export const INITIAL_DATA = {
  sender: '',
  title: '',
  message: '',
  dry: false,
  platform: '',
  sendType: '', // 1.select [立即发送 延迟发送 周期发送 loop] immediately
  delay: '',
  delayNumber: '', // 2.延迟 select[多少] select[秒/分/时] - 选择延迟发送时显示 delay ? seconds
  delayUnit: '',
  cron: '',
  loopType: '',
  // 3.4.5.每天 everyday 工作日 workday 周末 weekend - 选择周期发送时显示 cron
  // 6.单次 radio once
  // 具体日期 - 选择单次时 day
  day: '', // 2024-04-04
  // 7.每周 radio cron weekly
  // select[周一二三四五六日] - 选择每周时
  week: '', // 1,2,3,4
  // 8.每月 radio cron monthly
  // select[1-31] - 选择每月时
  dayOfMonth: '', // 5
  // 9.每年 radio cron yearly
  // 几月几日 - 选择每年时
  dayOfYear: '', // 05-04
  // 几点几分 - 选周期发送时显示
  time: '',
};
