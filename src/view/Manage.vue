<template>
    <el-container style="background: #101111;width: 100%;min-height: 100%;height: auto;">
      <el-aside  width="250px"  style="background: rgb(84,92,100);">
        <navpage></navpage>
      </el-aside>
      <el-container style="border: 5px solid">
        <el-header style="background: #8dff21">子界面名称</el-header>
        <el-main style="background: #f8e4e4"><router-view></router-view></el-main>
        <el-footer style="background: #c90f35">帮助</el-footer>
      </el-container>
    </el-container>
</template>

<script>
import Navpage from "./Navpage";
export default {
  name: "Manage",
  components: {Navpage}
}
</script>

<style scoped>
</style>
