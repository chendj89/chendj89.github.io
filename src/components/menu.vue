<template>
  <n-form ref="formRef" :model="values" :rules="rules" label-placement="left" :style="{ width: '100%' }">
    <n-form-item label="名称" path="name">
      <n-input v-model:value="values.name" placeholder="请输入"></n-input>
    </n-form-item>
    <n-form-item label="描述" path="desc">
      <n-input v-model:value="values.desc" placeholder="请输入"></n-input>
    </n-form-item>
    <n-form-item label="链接" path="url">
      <n-input v-model:value="values.url" placeholder="请输入"></n-input>
    </n-form-item>
    <n-form-item label="头像" path="icon">
      <n-input v-model:value="values.icon" placeholder="请输入"></n-input>
    </n-form-item>
  </n-form>
  <div>
    <n-button @click="valid">提交</n-button>
    <n-button @click="reset">重置</n-button>
  </div>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui';
const formRef = ref<FormInst | null>(null);
/**
 * 表单数据
 */
const values = reactive({
  name: '',
  desc: '',
  url: '',
  icon: '',
});
/**
 * 表单规则
 */
const rules = reactive({
  name: {
    required: true,
    message: '请输入名称',
    trigger: ['input', 'blur'],
  },
  desc: {
    required: true,
    message: '请输入描述',
    trigger: ['input', 'blur'],
  },
  url: {
    required: true,
    message: '请输入链接',
    trigger: ['input', 'blur'],
  },
  icon: {
    required: true,
    message: '请输入图标',
    trigger: ['input', 'blur'],
  },
});

const valid = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {

    } else { }
  })
};
const reset = () => {
  formRef.value?.restoreValidation()
}
</script>

<style lang="scss" scoped>

</style>
