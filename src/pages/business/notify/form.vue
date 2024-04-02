<template>
  <t-drawer v-model:visible="drawerVisible" :close-btn="true" size="400px" :header="title">
    <t-form ref="formRef" class="base-form" :data="formData" :rules="FORM_RULES" label-align="left" :label-width="100">
      <t-form-item label="名称" name="name">
        <t-input v-model="formData.name" placeholder="请输入名称" />
      </t-form-item>
      <t-form-item label="平台" name="platform">
        <t-select
          v-model="formData.platform"
          :disabled="mode === 'edit'"
          :options="platformOptions"
          placeholder="请选择平台"
        />
      </t-form-item>
      <t-form-item label="发送地址" name="webHookURL">
        <t-input v-model="formData.webHookURL" placeholder="请输入发送地址" />
      </t-form-item>
      <t-form-item v-if="formData.platform === 'dingtalk'" label="签名" name="signSecret">
        <t-input v-model="formData.signSecret" placeholder="请输入签名" />
      </t-form-item>
      <t-form-item label="干运行" name="dry">
        <t-switch v-model="formData.dry" class="mr-2" />
        <t-tooltip content="干运行不会发送消息" theme="light">
          <error-circle-icon class="cursor-pointer" size="16" color="#666" />
        </t-tooltip>
      </t-form-item>
      <t-form-item label="备注" name="remark">
        <t-textarea v-model="formData.remark" placeholder="请输入备注" />
      </t-form-item>
    </t-form>
    <template #footer>
      <div class="text-right">
        <t-button variant="outline" type="reset" @click="onReset">重置</t-button>
        <t-button type="submit" @click="onSubmit">提交</t-button>
      </div>
    </template>
  </t-drawer>
</template>

<script lang="ts">
export default {
  name: 'NotifyForm',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { addNotify, editNotify } from '@/api/notify';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';

import { FORM_RULES, INITIAL_DATA, moduleName } from './constants';

const emit = defineEmits(['update']);

defineProps({
  platformOptions: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const formData = ref({ ...INITIAL_DATA });
const mode = ref('add'); // 新增 add 编辑 edit

const title = ref(`新增${moduleName}`);
const drawerVisible = ref(false);
const formRef = ref();

const onReset = () => {
  formRef.value.reset();
};
const onSubmit = () => {
  formRef.value.validate().then((valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      if (formData.value.id) {
        editNotify(formData.value).then((res) => {
          MessagePlugin.success('编辑成功');
          drawerVisible.value = false;
          emit('update');
        });
      } else {
        addNotify(formData.value).then((res) => {
          MessagePlugin.success('新增成功');
          drawerVisible.value = false;
          emit('update');
        });
      }
    }
  });
};

onMounted(() => {});

const open = (val: any) => {
  if (val) {
    formData.value = val;
    title.value = `编辑${moduleName}`;
    mode.value = 'edit';
  } else {
    formData.value = INITIAL_DATA;
    title.value = `新增${moduleName}`;
    mode.value = 'add';
    formRef.value.reset();
  }
  drawerVisible.value = true;
};

defineExpose({
  open,
});
</script>
