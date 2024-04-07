<template>
  <t-form ref="formRef" class="base-form" :data="formData" :rules="FORM_RULES" label-align="left" :label-width="100">
    <t-form-item label="平台" name="platform">
      <t-select v-model="formData.platform" :options="platformOptions" placeholder="请选择平台" />
    </t-form-item>
    <t-form-item label="发送机器人" name="sender">
      <t-select v-model="formData.sender" :options="senderOptions" placeholder="请选择发送机器人" />
    </t-form-item>
    <t-form-item v-if="formData.platform === 'dingtalk'" label="标题" name="title">
      <t-input v-model="formData.title" placeholder="请输入标题" />
    </t-form-item>
    <t-form-item label="消息" name="message">
      <t-input v-model="formData.message" placeholder="请输入消息" />
    </t-form-item>
    <!-- <t-form-item label="干运行" name="dry">
      <t-switch v-model="formData.dry" class="mr-2" />
      <t-tooltip content="干运行不会发送消息" theme="light">
        <error-circle-icon class="cursor-pointer" size="16" color="#666" />
      </t-tooltip>
    </t-form-item> -->
    <t-form-item label="发送方式" name="sendType">
      <t-select v-model="formData.sendType" :options="sendTypes" placeholder="请选择发送方式" @change="onSendTypeChange" />
    </t-form-item>
    <t-form-item v-if="formData.sendType === 'delay'" label="延迟时间" name="delayNumber">
      <t-input type=number class="w-6/12" v-model="formData.delayNumber" placeholder="请输入" />
      <t-select class="w-6/12" v-model="formData.delayUnit" :options="delayUnits" placeholder="请选择" />
    </t-form-item>
    <t-form-item v-if="formData.sendType === 'loop'" label="循环类型" name="loopType">
      <t-select v-model="formData.loopType" :options="loopTypes" placeholder="请选择" @change="onLoopTypeChange" />
    </t-form-item>
    <t-form-item v-if="formData.loopType === 'once'" label="日期" name="day">
      <t-date-picker class="w-full" v-model="formData.day" />
    </t-form-item>
    <t-form-item v-if="formData.loopType === 'weekly'" label="星期" name="week">
      <t-select v-model="formData.week" multiple :options="weeks" placeholder="请选择" />
    </t-form-item>
    <t-form-item v-if="formData.loopType === 'monthly'" label="日期" name="dayOfMonth">
      <t-select v-model="formData.dayOfMonth" :options="dayOfMonths" placeholder="请选择" />
    </t-form-item>
    <t-form-item v-if="formData.loopType === 'yearly'" label="日期" name="dayOfYear">
      <t-date-picker :popupProps="{ overlayInnerClassName: 'hidden-year' }" class="w-full" v-model="formData.dayOfYear"
        format="MM-DD" />
    </t-form-item>
    <t-form-item v-if="formData.sendType === 'loop'" label="时间" name="time">
      <t-timePicker class="w-full" v-model="formData.time" format="HH:mm" />
    </t-form-item>
    <div class="text-center mt-4">
      <t-button variant="outline" type="reset" @click="reset">重置</t-button>
      <t-button type="submit" @click="onSubmit">提交</t-button>
    </div>
  </t-form>
</template>

<script lang="ts">
export default {
  name: 'SendForm',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormRule } from 'tdesign-vue-next';
import { onMounted, ref, computed } from 'vue';
import { sendNotificaiton } from '@/api/notify';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { INITIAL_DATA, sendTypes, delayUnits, loopTypes, weeks, dayOfMonths } from './constants';

const emit = defineEmits(['update']);

const props = defineProps({
  platformOptions: {
    type: Array,
    default: () => {
      return [];
    },
  },
  senders: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const senderOptions = computed(() => {
  if (formData.value.platform) {
    if (props.senders[`${formData.value.platform}s`]) {
      return props.senders[`${formData.value.platform}s`].map((ele: any) => {
        return {
          label: ele.name,
          value: ele.id,
        };
      });
    }
    return [];
  }
  return [];
});

const formData = ref({ ...INITIAL_DATA });

const formRef = ref();

const FORM_RULES = computed(() => {
  return {
    sender: [{ required: true, message: '请选择发送通道', type: 'error' }],
    platform: [{ required: true, message: '请选择平台', type: 'error' }],
    message: [{ required: true, message: '请输入消息', type: 'error' }],
    sendType: [{ required: true, message: '请选择发送方式', type: 'error' }],
    delayNumber: [{ required: formData.value.sendType === 'delay', message: '请选择延迟时间', type: 'error' }],
    loopType: [{ required: formData.value.sendType === 'loop', message: '请选择日期', type: 'error' }],
    day: [{ required: formData.value.loopType === 'once', message: '请选择日期', type: 'error' }],
    week: [{ required: formData.value.loopType === 'weekly', message: '请选择星期', type: 'error' }],
    dayOfMonth: [{ required: formData.value.loopType === 'monthly', message: '请选择日期', type: 'error' }],
    dayOfYear: [{ required: formData.value.loopType === 'yearly', message: '请选择日期', type: 'error' }],
    time: [{ required: formData.value.sendType !== 'immediately', message: '请选择时间', type: 'error' }],
  };
});

const resetLoopParams = () => {
  formData.value.cron = '';
  formData.value.day = '';
  formData.value.week = [];
  formData.value.dayOfMonth = '';
  formData.value.dayOfYear = '';
  formData.value.time = '';
}

const onSendTypeChange = (e: any) => {
  console.log(e);
  // 清空延迟和循环参数
  formData.value.delay = 0;
  formData.value.delayNumber = 0;
  formData.value.delayUnit = 'second';
  resetLoopParams();
};

const onLoopTypeChange = (e: any) => {
  console.log(e);
  // 清空循环参数
  resetLoopParams();
};

const reset = () => {
  formRef.value.reset();
};
const onSubmit = () => {
  formRef.value.validate().then((valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      if (formData.value.sendType === 'delay') {
        let delay = 0;
        if (formData.value.delayUnit == "second") {
          delay = formData.value.delayNumber;
        } else {
          if (formData.value.delayUnit == "minute") {
            //crontab = "*/"+count+" * * * "+days;
            delay = formData.value.delayNumber * 60;
          } else if (formData.value.delayUnit == "hour") {
            //crontab = "0 */"+count+" * * "+days;
            delay = formData.value.delayNumber * 60 * 60;
          }
        }
        formData.value.delay = delay;
      } else if (formData.value.sendType === 'loop') {
        let cron = '';
        const [ hour, minute ] = formData.value.time.split(':');
        if (formData.value.loopType === 'everyday') {
        // 每天 5 点 20 分：`20 5 * * *`
          cron = `${minute} ${hour} * * *`;
        } else if (formData.value.loopType === 'workday') {
        // 工作日 5 点 20 分：`20 5 * * 1-5`
          cron = `${minute} ${hour} * * 1-5`;
        } else if (formData.value.loopType === 'weekend') {
        // 周末 5 点 20 分：`20 5 * * 6,7`
          cron = `${minute} ${hour} * * 6,7`;
        } else if (formData.value.loopType === 'once') {
        // 
        } else if (formData.value.loopType === 'weekly') {
        // 周一周三 5 点 20 分：`20 5 * * 1,3`
          let week = formData.value.week.join(',');
          cron = `${minute} ${hour} * * ${week}`;
        } else if (formData.value.loopType === 'monthly') {
        // 每月 5 号 5 点 20 分：`20 5 5 * *`
          cron = `${minute} ${hour} ${formData.value.dayOfMonth} * *`;
        } else if (formData.value.loopType === 'yearly') {
          const [month, day] = formData.value.dayOfYear.split('-');
        // 每年 4 月 5 日 5 点 20 分：`20 5 5 4 *`
          cron = `${minute} ${hour} ${day} ${month} *`;
        }
        formData.value.cron = cron;
      }
      console.log('formData.value', formData.value);

      // cron
      
      // sendNotificaiton(formData.value).then((res) => {
      //   MessagePlugin.success('发送成功');
      //   emit('update');
      // });
    }
  });
};

onMounted(() => { });

// const open = (val: any) => {
//   if (val) {
//     formData.value = val;
//     title.value = `编辑${moduleName}`;
//     mode.value = 'edit';
//   } else {
//     formData.value = INITIAL_DATA;
//     title.value = `新增${moduleName}`;
//     mode.value = 'add';
//     formRef.value.reset();
//   }
//   drawerVisible.value = true;
// };

defineExpose({
  reset,
});
</script>

<style lang="less">
.hidden-year {
  .t-date-picker__header-controller-year {
    display: none;
  }
}
</style>