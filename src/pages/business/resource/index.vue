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
        <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
        <template #tags="{ row }">
          <t-tag
            v-for="item in row.tags.split(',')"
            :key="item"
            class="mr-3"
            shape="round"
            size="small"
            theme="primary"
            variant="light-outline"
          >
            {{ item }}
          </t-tag>
        </template>
        <template #visible="{ row }">
          <t-switch :value="row.visible" @change="handleVisibleChange(row)" />
        </template>
        <template #op="slotProps">
          <t-space>
            <!-- <t-link
              v-if="slotProps.row.status === STATUS.ENABLED"
              theme="danger"
              @click="toggleStatus(slotProps.row, STATUS.DISABLED)"
              >禁用</t-link
            >
            <t-link v-else theme="primary" @click="toggleStatus(slotProps.row, STATUS.ENABLED)">启用</t-link> -->
            <t-link theme="primary" @click="handleEdit(slotProps.row)">编辑</t-link>
            <t-link theme="danger" @click="handleDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选资源？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
    <resourceForm ref="resourceFormRef" @done="onDone" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Admin',
};
</script>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
import debounce from 'lodash/debounce';
import { DownloadIcon, RefreshIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref, toRaw } from 'vue';

import { deleteResource, getResources, toggleResourceVisible } from '@/api/resource';
import { prefix } from '@/config/global';
import { STATUS, VISIBLE } from '@/constants';
import { useSettingStore } from '@/store';

// import { saveAsExcel } from '@/utils/util';
import { COLUMNS } from './columns';
import { moduleName } from './constants';
import resourceForm from './form.vue';

const store = useSettingStore();

const keyword = ref('');
const handleKeywordInput = debounce(() => {
  fetchData();
}, 500);

const data = ref([]);

const handleVisibleChange = (row: any) => {
  console.log('row', row.visible);
  const confirmDia = DialogPlugin({
    header: '确认',
    body: `确定要设置${moduleName}${row.title}${VISIBLE[`${!row.visible}`]}吗`,
    confirmBtn: '确定',
    cancelBtn: '取消',
    onConfirm: ({ e }) => {
      toggleResourceVisible({ id: row.id, visible: !row.visible }).then((res) => {
        confirmDia.hide();
        fetchData();
      });
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
    },
  });
};

// const exportExcel = () => {
// exportAdmins({ keyword: keyword.value }).then((res) => {
//   saveAsExcel(res.data, '管理员列表');
// });
// };

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
    const { list, total } = await getResources({
      pageNum: pagination.value.current,
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
  deleteResource(data.value[deleteIdx.value].id).then((res) => {
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
    console.log(data.value, deleteIdx.value);
    const { account } = data.value[deleteIdx.value];
    return `${moduleName}[${account}]将被删除，且无法恢复`;
  }
  return '';
});

onMounted(() => {
  fetchData();
});

const resourceFormRef = ref();

const handleAdd = () => {
  resourceFormRef.value.open();
};

const handleEdit = (row: any) => {
  resourceFormRef.value.open(toRaw(row));
};

const handleDelete = (row: { rowIndex: any }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};

const onDone = () => {
  fetchData();
};
</script>
