<template>
  <h3>
    <div>
      <VMenu style="width:280px;margin:20px;margin-right:0;display: inline-block;" v-for="item in values.menu"
        :info="item" :list="item.list"></VMenu>
    </div>
  </h3>
</template>

<script setup lang="ts">
import VMenu from "./components/vmenu";
import issueApp from "@/tools/issue";
import getIssueContent from "@/tools/getIssueContent";
const values = reactive({
  menu: [] as any[]
})
let app = new issueApp();

onMounted(() => {
  app.request("GET /repos/{owner}/{repo}/issues?sort=created&direction=asc&labels=menu", {
    owner: "chendj89",
    repo: "store",
  }).then(res => res.json()).then(data => {
    values.menu = [];
    data.map((item: any) => {
      const content = getIssueContent(item.body);
      let solo = {
        name: content.code.user,
        desc: content.code.desc,
        url: content.code.url,
        icon: content.code.avatar,
        comments_url: item.comments_url
      };
      let issue = {
        ...solo,
        number: item.number,
        list: [solo]
      }
      values.menu.push(issue);
    });

  })
})

</script>

<style scoped>

</style>