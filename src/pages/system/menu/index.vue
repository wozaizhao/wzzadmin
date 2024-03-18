<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-card :bordered="false" header-bordered>
          <template #header> <t-button @click="handleAdd"> 添加菜单 </t-button> </template>
          <!-- <t-divider /> -->
          <t-input v-model="filterText" placeholder="输入关健字过滤" @change="onInput">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
          <t-tree :data="menus" hover expand-on-click-node :filter="filterByText" @click="onMenuSelect" />
        </t-card>
      </div>
      <div class="list-tree-content">
        <t-card :bordered="false" header-bordered>
          <template #header>
            <p class="font-bold">
              编辑{{ getTypeLabel }} {{ currentMenu.title ? `：${currentMenu.title}` : '' }}
              <span class="ml-4 text-sm text-gray-500 font-normal">从左侧列表选择一项后，进行编辑</span>
            </p>
            <t-button theme="primary" :disabled="currentMenu.id === -1" variant="text" @click="handleDelete">
              删除{{ getTypeLabel }}
            </t-button>
          </template>
          <menuForm ref="menuFormRef" :data="menus" mode="edit" @update="onMenuUpdate" />
        </t-card>
      </div>
    </div>
    <menuDrawer ref="menuDrawerRef" :data="menus" @update="onMenuUpdate" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SysMenu',
};
</script>

<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import type { TreeNodeModel } from 'tdesign-vue-next';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { deleteMenu, getAllMenus, getMenu } from '@/api/system';

import menuDrawer from './drawer.vue';
import menuForm from './form.vue';

const filterByText = ref();
const filterText = ref();

const onInput = () => {
  filterByText.value = (node: TreeNodeModel) => {
    return node.label.indexOf(filterText.value) >= 0;
  };
};

const menus = ref([]);

const menuFormRef = ref();
const menuDrawerRef = ref();

const handleAdd = () => {
  menuDrawerRef.value.open();
};

const currentMenu = ref({ id: -1, type: 0, title: '' });

const getTypeLabel = computed(() => {
  const typeStr = ['目录', '菜单', '按钮'];
  return typeStr[currentMenu.value.type as any];
});

const onMenuSelect = ({ node }: any) => {
  const { value } = node.data;
  getMenu(value).then((res) => {
    const data = {
      ...res,
      parentID: res.parentID === 0 ? '' : res.parentID,
    };
    currentMenu.value = data;
    menuFormRef.value.setData(data);
  });
};

const handleDelete = () => {
  const confirmDia = DialogPlugin({
    header: '删除确认',
    body: `确定要删除${getTypeLabel.value} ${currentMenu.value.title} 吗`,
    confirmBtn: '确定',
    cancelBtn: '取消',
    onConfirm: ({ e }) => {
      deleteMenu(currentMenu.value.id).then((res) => {
        confirmDia.hide();
        MessagePlugin.success('删除成功');
        onMenuUpdate();
      });
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
      MessagePlugin.error('删除失败');
    },
  });
};

const onMenuUpdate = () => {
  getAllMenus().then((res) => {
    menus.value = res;
  });
};

onMounted(() => {
  onMenuUpdate();
});
</script>
