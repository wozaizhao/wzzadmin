<template>
  <t-drawer v-model:visible="drawerVisible" :close-btn="true" size="550px" :header="title">
    <menuForm ref="menuFormRef" mode="add" :data="data" @update="menuFormChange" />
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
  name: 'MenuDrawer',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import menuForm from './form.vue';

const emit = defineEmits(['update']);

defineProps({
  data: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const title = ref('新增菜单');
const drawerVisible = ref(false);
const menuFormRef = ref();

const onReset = () => {
  menuFormRef.value?.onReset();
};
const onSubmit = () => {
  menuFormRef.value?.onSubmit();
};

const menuFormChange = () => {
  drawerVisible.value = false;
  emit('update');
};

const open = () => {
  menuFormRef.value?.onReset();
  drawerVisible.value = true;
};

defineExpose({
  open,
});
</script>
