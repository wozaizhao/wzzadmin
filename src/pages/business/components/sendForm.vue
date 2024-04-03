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
    <t-form-item label="干运行" name="dry">
      <t-switch v-model="formData.dry" class="mr-2" />
      <t-tooltip content="干运行不会发送消息" theme="light">
        <error-circle-icon class="cursor-pointer" size="16" color="#666" />
      </t-tooltip>
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
import { onMounted, ref, computed } from 'vue';
import { sendNotificaiton } from '@/api/notify';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { FORM_RULES, INITIAL_DATA } from './constants';

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
      return props.senders[`${formData.value.platform}s`].map((ele) => {
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

const reset = () => {
  formRef.value.reset();
};
const onSubmit = () => {
  formRef.value.validate().then((valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      sendNotificaiton(formData.value).then((res) => {
        MessagePlugin.success('发送成功');
        emit('update');
      });
    }
  });
};

onMounted(() => {});

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
