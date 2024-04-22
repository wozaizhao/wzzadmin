<template>
  <div>
    <t-row class="mb-4" justify="space-between">
      <div>
        <t-button @click="handleAdd"> 添加{{ moduleName }}通道 </t-button>
        <t-button class="ml-3" @click="handleSend"> 发送{{ moduleName }} </t-button>
      </div>
      <!-- <div>
        <t-select
          :options="platformOptions"
          default-value="dingtalk"
          placeholder="请选择平台"
          @change="onPlatformChange"
        />
      </div> -->
      <div class="flex">
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
    <t-card class="mb-4" :bordered="false">
      <t-descriptions
        v-for="dingtalk in all.dingtalks"
        :key="dingtalk.id"
        layout="vertical"
        item-layout="horizontal"
        title="钉钉"
      >
        <t-descriptions-item label="名称">{{ dingtalk.name }}</t-descriptions-item>
        <t-descriptions-item label="发送地址">{{ dingtalk.webhook }}</t-descriptions-item>
      </t-descriptions>
    </t-card>
    <t-card class="mb-4" :bordered="false">
      <t-descriptions
        v-for="wecom in all.wecoms"
        :key="wecom.id"
        layout="vertical"
        item-layout="horizontal"
        title="企业微信"
      >
        <t-descriptions-item label="名称">{{ wecom.name }}</t-descriptions-item>
        <t-descriptions-item label="发送地址">{{ wecom.webhook }}</t-descriptions-item>
      </t-descriptions>
    </t-card>
    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前所选角色？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
    <notifyForm ref="notifyFormRef" :platform-options="platformOptions" @update="onUpdated" />
    <t-dialog v-model:visible="sendVisible" :cancel-btn="null" :confirm-btn="null" header="发送消息">
      <sendForm ref="sendFormRef" :platform-options="platformOptions" :senders="all" />
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Notify',
};
</script>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
// import debounce from 'lodash/debounce';
import { DownloadIcon, RefreshIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref, toRaw } from 'vue';

import { deleteNotify, getNotifies } from '@/api/notify';
import { getDicts } from '@/api/system';

import sendForm from '../components/sendForm.vue';
// import { prefix } from '@/config/global';
// import { useSettingStore } from '@/store';
// import { COLUMNS } from './columns';
import { moduleName } from './constants';
import notifyForm from './form.vue';

// const store = useSettingStore();

// const keyword = ref('');
// const handleKeywordInput = debounce(() => {
//   fetchData();
// }, 500);

const all = ref({});

// const data = computed(() => {
//   if (platform.value && all.value[`${platform.value}s`]) {
//     return all.value[`${platform.value}s`];
//   }
//   return [];
// });

// const rowKey = 'index';
// const pagination = ref({
//   defaultPageSize: 10,
//   pageSize: 10,
//   total: 0,
//   current: 1,
//   defaultCurrent: 1,
// });

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    all.value = await getNotifies();
    // data.value = list;
    // pagination.value = {
    //   ...pagination.value,
    //   total,
    // };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

// const rehandlePageChange = (curr: any, pageInfo: unknown) => {
//   pagination.value.current = curr.current;
//   pagination.value.pageSize = curr.pageSize;
//   fetchData();
// };

const onUpdated = () => {
  fetchData();
};

// const headerAffixedTop = computed(
//   () =>
//     ({
//       offsetTop: store.isUseTabsRouter ? 48 : 0,
//       container: `.${prefix}-layout`,
//     }) as any,
// );

const deleteIdx = ref(-1);
const confirmVisible = ref(false);

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  //   deleteNotify(data.value[deleteIdx.value].id).then((res) => {
  //     data.value.splice(deleteIdx.value, 1);
  //     confirmVisible.value = false;
  //     MessagePlugin.success('删除成功');
  //     // pagination.value.total--;
  //     resetIdx();
  //   });
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

const platformOptions = ref([]);

// const platform = ref('dingtalk');

// const onPlatformChange = (val) => {
//   platform.value = val;
// };

onMounted(() => {
  getDicts({
    dictType: 'platform',
  }).then((res) => {
    platformOptions.value = res;
  });
  fetchData();
});

const notifyFormRef = ref();
const sendFormRef = ref();

const handleAdd = () => {
  notifyFormRef.value.open();
};
const handleSend = () => {
  sendVisible.value = true;
  sendFormRef.value.reset();
};

const sendVisible = ref(false);

// const handleEdit = (row: any) => {
//   notifyFormRef.value.open(toRaw(row));
// };

// const handleDelete = (row: { rowIndex: any }) => {
//   deleteIdx.value = row.rowIndex;
//   confirmVisible.value = true;
// };
</script>
