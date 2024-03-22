<template>
  <t-drawer v-model:visible="drawerVisible" :close-btn="true" size="400px" :header="title">
    <t-form ref="formRef" class="base-form" :data="formData" :rules="FORM_RULES" label-align="left" :label-width="100">
      <t-form-item label="名称" name="name">
        <t-input v-model="formData.name" :disabled="mode === 'edit'" placeholder="请输入角色名称" />
      </t-form-item>
      <t-form-item label="角色权限" name="menus">
        <!-- <t-tree-select v-model="formData.roles" :data="menus" /> -->
        <t-card class="w-full">
          <t-tree
            ref="tree"
            v-model="formData.menus"
            :data="menus"
            :checkable="true"
            value-mode="all"
            hover
            expand-all
            @change="onChange"
            @click="onClick"
          />
        </t-card>
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
  name: 'RoleForm',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { addRole, editRole, getAllMenus, getRoleMenus } from '@/api/system';

import { FORM_RULES, INITIAL_DATA, moduleName } from './constants';

const emit = defineEmits(['update']);

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
        editRole(formData.value).then((res) => {
          MessagePlugin.success('编辑成功');
          drawerVisible.value = false;
          emit('update');
        });
      } else {
        addRole(formData.value).then((res) => {
          MessagePlugin.success('新增成功');
          drawerVisible.value = false;
          emit('update');
        });
      }
    }
  });
};
const menus = ref([]);

const onChange = () => {};

const onClick = () => {};

onMounted(() => {
  getAllMenus().then((res) => {
    menus.value = res;
  });
});

const getMenus = (id: any) => {
  getRoleMenus(id).then((res) => {
    formData.value.menus = res.map((ele: any) => ele.id);
  });
};

const open = (val: any) => {
  if (val) {
    formData.value = val;
    getMenus(val.id);
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
