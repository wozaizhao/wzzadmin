<template>
  <t-form
    ref="formRef"
    style="max-width: 500px"
    class="base-form"
    :data="formData"
    :rules="FORM_RULES"
    label-align="right"
    :label-width="100"
  >
    <t-form-item label="类型" name="type">
      <t-radio-group v-model="formData.type">
        <t-radio-button :value="0">目录</t-radio-button>
        <t-radio-button :value="1">菜单</t-radio-button>
        <t-radio-button :value="2">按钮</t-radio-button>
      </t-radio-group>
    </t-form-item>
    <t-divider align="left"><span class="text-base font-bold">基本设置</span></t-divider>
    <t-row :gutter="[16, 24]">
      <t-col :span="12">
        <t-form-item :label="`上级${getTypeLabel}`" name="parentID">
          <t-tree-select v-model="formData.parentID" :data="data" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="`${getTypeLabel}名称`" name="title">
          <t-input v-model="formData.title" :placeholder="`${getTypeLabel}名称`" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="`${getTypeLabel}图标`" name="icon">
          <t-input v-model="formData.icon" :placeholder="`${getTypeLabel}图标映射名称`" />
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type !== 2" :span="6">
        <t-form-item label="路由地址" name="path">
          <t-input v-model="formData.path" placeholder="路由地址" />
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type !== 2" :span="6">
        <t-form-item label="路由名称" name="name">
          <t-input v-model="formData.name" placeholder="路由名称" />
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type !== 2" :span="6">
        <t-form-item label="默认路由" name="redirect">
          <t-input v-model="formData.redirect" placeholder="默认跳转路由地址" />
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type > 0" :span="6">
        <t-form-item label="权限标识" name="authCode">
          <t-input v-model="formData.authCode" placeholder="权限标识" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="显示排序" name="sort">
          <t-input-number v-model="formData.sort" placeholder="显示排序" />
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type !== 2" :span="12">
        <t-form-item label="组件路径" name="component">
          <t-input v-model="formData.component" placeholder="组件路径" />
        </t-form-item>
      </t-col>
    </t-row>
    <t-divider v-if="formData.type !== 2" align="left"><span class="text-base font-bold">功能设置</span></t-divider>
    <t-row v-if="formData.type !== 2" class="mb-4" :gutter="[16, 24]">
      <t-col :span="6">
        <t-form-item label="显示状态" name="hidden">
          <t-radio-group v-model="formData.hidden">
            <t-radio-button :value="false">显示</t-radio-button>
            <t-radio-button :value="true">隐藏</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="是否缓存" name="keepAlive">
          <t-radio-group v-model="formData.keepAlive">
            <t-radio-button :value="true">缓存</t-radio-button>
            <t-radio-button :value="false">不缓存</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col v-if="formData.type !== 2" :span="6">
        <t-form-item label="是否外链" name="isFrame">
          <t-radio-group v-model="formData.isFrame">
            <t-radio-button :value="true">是</t-radio-button>
            <t-radio-button :value="false">否</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col v-if="formData.isFrame" :span="6">
        <t-form-item label="新窗口打开" name="frameBlank">
          <t-radio-group v-model="formData.frameBlank">
            <t-radio-button :value="true">是</t-radio-button>
            <t-radio-button :value="false">否</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col v-if="formData.isFrame" :span="12">
        <t-form-item label="外部地址" name="frameSrc">
          <t-input v-model="formData.frameSrc" placeholder="外部地址" />
        </t-form-item>
      </t-col>
      <t-col v-if="mode === 'edit'" :span="12" class="text-center">
        <t-button theme="primary" @click="onSubmit">保存修改</t-button>
      </t-col>
    </t-row>
  </t-form>
</template>

<script lang="ts">
export default {
  name: 'MenuForm',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { addMenu, editMenu } from '@/api/system';

import { FORM_RULES, INITIAL_DATA } from './constants';

const emit = defineEmits(['update']);

const props = defineProps({
  mode: {
    type: String,
    default: 'add',
  },
  data: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const formData = ref(INITIAL_DATA());

const formRef = ref();

const getTypeLabel = computed(() => {
  const typeStr = ['目录', '菜单', '按钮'];
  return typeStr[formData.value.type as any];
});

const setData = (val: any) => {
  formData.value = val;
};

const onReset = () => {
  formRef.value.reset();
  formData.value = Object.assign(formData.value, INITIAL_DATA());
};
const onSubmit = () => {
  formRef.value.validate().then((valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      const data = {
        ...formData.value,
        parentID: formData.value.parentID === '' ? 0 : formData.value.parentID,
      };
      if (props.mode === 'edit') {
        editMenu(data).then((res) => {
          console.log(res);
          MessagePlugin.success('编辑成功');
          emit('update');
        });
      } else {
        addMenu(data).then((res) => {
          MessagePlugin.success('新增成功');
          emit('update');
        });
      }
    }
  });
};

defineExpose({
  setData,
  onReset,
  onSubmit,
});
</script>
