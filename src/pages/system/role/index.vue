<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="handleAdd"> 添加{{ moduleName }} </t-button>
        </div>
        <div class="flex">
          <t-input
            v-model="keyword"
            class="search-input"
            placeholder="请输入内容搜索"
            clearable
            @change="handleKeywordInput"
          >
            <template #suffix-icon>
              <search-icon size="16px" />
            </template>
          </t-input>
          <div class="ml-4 t-radio-group t-size-m t-radio-group__outline">
            <div class="t-radio-button" @click="fetchData">
              <refresh-icon class="mr-1" />
              <span class="hidden lg:inline">刷新</span>
            </div>
            <!-- <div class="t-radio-button">
              <cloud-upload-icon class="mr-1" />
              <span class="hidden lg:inline">导入</span>
            </div> -->
            <div class="t-radio-button">
              <download-icon class="mr-1" />
              <span class="hidden lg:inline">导出</span>
            </div>
          </div>
        </div>
      </t-row>
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="top"
        :hover="true"
        :pagination="pagination"
        :loading="dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
      >
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="handleEdit(slotProps.row)">编辑</t-link>
            <t-link theme="danger" @click="handleDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选角色？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
    <roleForm ref="roleFormRef" @update="onUpdated" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Role',
};
</script>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
import debounce from 'lodash/debounce';
import { DownloadIcon, RefreshIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref, toRaw } from 'vue';

import { deleteRole, getRoles } from '@/api/system';
import { prefix } from '@/config/global';
import { useSettingStore } from '@/store';

import { COLUMNS } from './columns';
import { moduleName } from './constants';
import roleForm from './form.vue';

const store = useSettingStore();

const keyword = ref('');
const handleKeywordInput = debounce(() => {
  fetchData();
}, 500);

const data = ref([]);

const rowKey = 'index';
const pagination = ref({
  defaultPageSize: 10,
  pageSize: 10,
  total: 0,
  current: 1,
  defaultCurrent: 1,
});

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { list, total } = await getRoles({
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
      keyword: keyword.value,
    });
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const rehandlePageChange = (curr: any, pageInfo: unknown) => {
  pagination.value.current = curr.current;
  pagination.value.pageSize = curr.pageSize;
  fetchData();
};

const onUpdated = () => {
  fetchData();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    }) as any,
);

const deleteIdx = ref(-1);
const confirmVisible = ref(false);

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  deleteRole(data.value[deleteIdx.value].id).then((res) => {
    data.value.splice(deleteIdx.value, 1);
    confirmVisible.value = false;
    MessagePlugin.success('删除成功');
    pagination.value.total--;
    resetIdx();
  });
};

const onCancel = () => {
  resetIdx();
};
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `${moduleName}[${name}]将被删除，且无法恢复`;
  }
  return '';
});

onMounted(() => {
  fetchData();
});

const roleFormRef = ref();

const handleAdd = () => {
  roleFormRef.value.open();
};

const handleEdit = (row: any) => {
  roleFormRef.value.open(toRaw(row));
};

const handleDelete = (row: { rowIndex: any }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};
</script>
