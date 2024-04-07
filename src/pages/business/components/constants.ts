
export const moduleName = '通知';

export const INITIAL_DATA = {
  sender: '',
  title: '',
  message: '',
  // dry: false,
  platform: '',
  sendType: 'immediately',
  delay: 0,
  delayNumber: 0,
  delayUnit: 'second',
  cron: '',
  loopType: '',
  day: '',
  week: [] as any,
  dayOfMonth: '',
  dayOfYear: '',
  time: '',
};


export const sendTypes = [
  {
    label: '立即发送',
    value: 'immediately'
  },
  {
    label: '延迟发送',
    value: 'delay'
  },
  {
    label: '循环发送',
    value: 'loop'
  },
];

export const delayUnits = [
  {
    label: '秒',
    value: 'second'
  },
  {
    label: '分钟',
    value: 'minute'
  },
  {
    label: '小时',
    value: 'hour'
  },
]

export const loopTypes = [
  {
    label: '每天',
    value: 'everyday'
  },
  {
    label: '工作日',
    value: 'workday'
  },
  {
    label: '周末',
    value: 'weekend'
  },
  {
    label: '单次',
    value: 'once'
  },
  {
    label: '每周',
    value: 'weekly'
  },
  {
    label: '每月',
    value: 'monthly'
  },
  {
    label: '每年',
    value: 'yearly'
  },
];

export const weeks = [
  {
    label: '一',
    value: '1'
  },
  {
    label: '二',
    value: '2'
  },
  {
    label: '三',
    value: '3'
  },
  {
    label: '四',
    value: '4'
  },
  {
    label: '五',
    value: '5'
  },
  {
    label: '六',
    value: '6'
  },
  {
    label: '日',
    value: '7'
  },
];

export const dayOfMonths = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  },
  {
    label: '7',
    value: '7'
  },
  {
    label: '8',
    value: '8'
  },
  {
    label: '9',
    value: '9'
  },
  {
    label: '10',
    value: '10'
  },
  {
    label: '11',
    value: '11'
  },
  {
    label: '12',
    value: '12'
  },
  {
    label: '13',
    value: '13'
  },
  {
    label: '14',
    value: '14'
  },
  {
    label: '15',
    value: '15'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: '17',
    value: '17'
  },
  {
    label: '18',
    value: '18'
  },
  {
    label: '19',
    value: '19'
  },
  {
    label: '20',
    value: '20'
  },
  {
    label: '21',
    value: '21'
  },
  {
    label: '22',
    value: '22'
  },
  {
    label: '23',
    value: '23'
  },
  {
    label: '24',
    value: '24'
  },
  {
    label: '25',
    value: '25'
  },
  {
    label: '26',
    value: '26'
  },
  {
    label: '27',
    value: '27'
  },
  {
    label: '28',
    value: '28'
  },
  {
    label: '29',
    value: '29'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '31',
    value: '31'
  },
]