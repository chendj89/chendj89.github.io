<template>
  <div>
    <n-input v-model:value="msg" v-if="!props.diff" size="small"></n-input>
    <slot></slot>
    <div v-if="!props.diff">
      <teleport to="#footer">
        <n-button type="primary" @click="sc" size="small" style="--n-font-size:12px">OK</n-button>
        <n-button type="info" style="margin-left: 10px;--n-font-size:12px" @click="props.cancelFn"
          size="small">取消</n-button>
      </teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["successFn", "cancelFn", "diff"]);
const msg = ref("");

const sc = () => {
  props.successFn({ msg: msg.value });
};
</script>

<style scoped>

</style>
