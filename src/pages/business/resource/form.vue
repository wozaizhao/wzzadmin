<template>
  <t-dialog v-model:visible="dialogVisible" :close-btn="true" size="400px" :header="title">
    <t-form ref="formRef" class="base-form" :data="formData" :rules="FORM_RULES" label-align="left" :label-width="100">
      <t-form-item label="名称" name="title">
        <t-input v-model="formData.title" :disabled="mode === 'edit'" placeholder="请输入名称" />
      </t-form-item>
      <t-form-item label="URL" name="url">
        <t-input v-model="formData.url" placeholder="请输入URL" />
      </t-form-item>
      <div v-if="logoEditable" class="text-right mb-2">
        <swap-icon class="cursor-pointer text-gray-400 hover:text-gray-600" size="16px" @click="toggleUploadType" />
        <close-circle-icon
          class="cursor-pointer ml-2 text-gray-400 hover:text-gray-600"
          size="16px"
          @click="handleEditLogo(false)"
        />
      </div>
      <t-form-item v-if="uploadType === 'by-file' && logoEditable" label="Logo" name="logo">
        <t-upload
          theme="image"
          :headers="{ Authorization: `Bearer ${token}` }"
          :data="{ dir: 'logo' }"
          accept="image/*"
          :max="1"
          action="/api/admin/upload"
          @fail="handleFail"
          @success="handleSuccess"
        />
      </t-form-item>
      <t-form-item v-if="uploadType === 'by-url' && formData.logo && !logoEditable" label="Logo" name="logoURL">
        <t-image class="h-6" :src="`https://cos.wozaizhao.com/${formData.logo}`" />
        <close-circle-icon
          class="cursor-pointer ml-2 text-gray-400 hover:text-gray-600"
          size="16px"
          @click="handleEditLogo(true)"
        />
      </t-form-item>
      <t-form-item v-if="uploadType === 'by-url' && logoEditable" label="Logo" name="logoURL">
        <t-input v-model="formData.logoURL" placeholder="请输入Logo URL" />
      </t-form-item>
      <t-form-item label="评论" name="comment">
        <t-textarea v-model="formData.comment" placeholder="请输入评论" />
      </t-form-item>
      <t-form-item label="标签" name="tags">
        <t-tagInput v-model="formData.tagsRaw" placeholder="请输入标签" />
      </t-form-item>
    </t-form>
    <template #footer>
      <div class="text-right">
        <t-button variant="outline" type="reset" @click="onReset">重置</t-button>
        <t-button type="submit" @click="onSubmit">提交</t-button>
      </div>
    </template>
  </t-dialog>
</template>

<script lang="ts">
export default {
  name: 'AdminForm',
};
</script>

<script setup lang="ts">
import { CloseCircleIcon, SwapIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { uploadByUrl } from '@/api/admin';
import { addResource, editResource } from '@/api/resource';
import { useUserStore } from '@/store';

import { FORM_RULES, INITIAL_DATA, moduleName } from './constants';

const userStore = useUserStore();
const { token } = userStore;
interface Emits {
  (e: 'done'): void;
}

const emit = defineEmits<Emits>();

const formData = ref({ ...INITIAL_DATA });

const title = ref(`新增${moduleName}`);
const mode = ref('add'); // 新增 add 编辑 edit
const dialogVisible = ref(false);
const formRef = ref();
const uploadType = ref('by-url'); // by-file by-url
const logoEditable = ref(false); // 编辑模式下默认logo不可编辑

const toggleUploadType = () => {
  if (uploadType.value === 'by-file') {
    uploadType.value = 'by-url';
  } else {
    uploadType.value = 'by-file';
  }
};

const handleEditLogo = (val) => {
  logoEditable.value = val;
};

const handleSuccess = (e) => {
  console.log('e', e);
  formData.value.logo = e.response.data;
};

const handleFail = (e) => {
  console.log('e', e);
};

const onReset = () => {
  formRef.value.reset();
};
const onSubmit = () => {
  formRef.value.validate().then(async (valid: any) => {
    if (typeof valid === 'boolean' && valid) {
      console.log(formData.value);
      try {
        if (uploadType.value === 'by-url') {
          const uploadRes = await uploadByUrl({ dir: 'logo', url: formData.value.logoURL });
          console.log(uploadRes);
          formData.value.logo = uploadRes;
        }
      } catch (e) {
        console.log('上传失败', e);
      }

      formData.value.tags = formData.value.tagsRaw.join(',');

      if (formData.value.id > 0) {
        editResource(formData.value).then((res) => {
          console.log(res);
          MessagePlugin.success('编辑成功');
          dialogVisible.value = false;
          emit('done');
        });
      } else {
        addResource(formData.value).then((res) => {
          console.log(res);
          MessagePlugin.success('新增成功');
          dialogVisible.value = false;
          emit('done');
        });
      }
    }
  });
};

const open = (val: any) => {
  console.log('open', val);
  if (val) {
    logoEditable.value = false;
    formData.value = {
      id: val.id,
      title: val.title,
      url: val.url,
      comment: val.comment,
      logo: val.logo,
      tags: val.tags,
      tagsRaw: val.tags.split(','),
    };
    title.value = `编辑${moduleName}`;
    mode.value = 'edit';
  } else {
    logoEditable.value = true;
    formData.value = INITIAL_DATA;
    title.value = `新增${moduleName}`;
    mode.value = 'add';
    formRef.value.reset();
  }
  dialogVisible.value = true;
};

onMounted(() => {});

defineExpose({
  open,
});
</script>
