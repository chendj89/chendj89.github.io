<script setup lang="ts">
import hljs from "./tools/hljs";
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-dialog-provider>
      <RouterView></RouterView>
    </n-dialog-provider>
  </n-config-provider>
</template>
