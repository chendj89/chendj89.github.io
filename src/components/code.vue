<template>
  <div class="mt-4">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-input v-model:value="values.code" type="textarea" placeholder="代码" />
      </n-gi>
      <n-gi>
        <div>
          <n-code :code="values.code" language="js"></n-code>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
const values = reactive({
  code: '',
})
</script>

<style lang="scss" scoped>

</style>