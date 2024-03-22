<template>
  <t-drawer v-model:visible="drawerVisible" :close-btn="true" size="400px" :header="title">
    <t-form ref="formRef" class="base-form" :data="formData" :rules="FORM_RULES" label-align="left" :label-width="100">
      <t-form-item label="帐号" name="accpimt">
        <t-input v-model="formData.account" :disabled="mode === 'edit'" placeholder="请输入帐号" />
      </t-form-item>
      <t-form-item label="Email" name="email">
        <t-input v-model="formData.email" placeholder="请输入Email" />
      </t-form-item>
      <t-form-item label="手机号" name="phoneNumber">
        <t-textarea v-model="formData.phoneNumber" placeholder="请输入手机号" />
      </t-form-item>
      <t-form-item label="角色" name="roles">
        <t-select v-model="formData.roles" :options="roleOptions" placeholder="请选择角色" multiple />
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
  name: 'AdminForm',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { addAdmin, editAdmin, getAllRoles } from '@/api/system';

import { FORM_RULES, INITIAL_DATA, moduleName } from './constants';

interface Emits {
  (e: 'done'): void;
}

const emit = defineEmits<Emits>();

const formData = ref({ ...INITIAL_DATA });

const title = ref(`新增${moduleName}`);
const mode = ref('add'); // 新增 add 编辑 edit
const drawerVisible = ref(false);
const formRef = ref();
const roleOptions = ref([]);
const onReset = () => {
  formRef.value.reset();
};
const onSubmit = () => {
  formRef.value.validate().then((valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      if (formData.value.id) {
        editAdmin(formData.value).then((res) => {
          console.log(res);
          MessagePlugin.success('编辑成功');
          drawerVisible.value = false;
          emit('done');
        });
      } else {
        addAdmin(formData.value).then((res) => {
          console.log(res);
          MessagePlugin.success('新增成功');
          drawerVisible.value = false;
          emit('done');
        });
      }
    }
  });
};

const open = (val: any) => {
  if (val) {
    formData.value = { ...val };
    const roles = JSON.parse(JSON.stringify(val.roles));
    formData.value.roles = roles.map((role: any) => role.id);
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

onMounted(() => {
  getAllRoles().then((res) => {
    roleOptions.value = res.map((ele: any) => {
      return {
        label: ele.name,
        value: ele.id,
      };
    });
  });
});

defineExpose({
  open,
});
</script>
