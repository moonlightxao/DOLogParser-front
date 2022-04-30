<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-upload"></i>
        <span>日志上传</span>
      </template>
      <el-menu-item-group>
        <template slot="title">上传方式</template>
        <el-menu-item index="1-1">
          <i class="el-icon-folder"></i>
          <router-link to="/uploadByFile">
            <span>文件上传</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <i class="el-icon-link"></i>
          <router-link to="/uploadByLink">
            <span>指定固定URL</span>
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <router-link to="/showLogs">
          <span>日志模板</span>
        </router-link>
      </template>
    </el-menu-item>
    <el-menu-item index="3" >
      <i class="el-icon-document"></i>
      <span slot="title">解析状态</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navpage",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: white;
}
</style>
