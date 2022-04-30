<template>
  <div>
    <el-button type="primary" disabled="true">输入待查日志模板命名空间<i class="el-icon-search"></i></el-button>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    <el-table
      :data="this.templates"
      stripe
      style="width: 100%">
      <el-table-column
        prop="logTemplate"
        label="日志模板"
        align="center"
        >
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :page-count="totalPages"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowLogs",
  data() {
    return {
      namespaces: [],
      state: '',
      timeout: null,
      currentPage: 1,
      pageSize: 20,
      totalPages: 0,
      templates: []
    };
  },
  methods: {
    loadAll() {
      axios.get('/loadNamespaces').then(response =>{
        let status = response.data.status;
        if(status == 200){
          this.namespaces = response.data.namespaces;
        }else{
          this.$message.error("服务器出现错误！");
        }
      })
    },
    querySearchAsync(queryString, cb) {
      let namespaces = this.namespaces;
      for(let i = 0;i < namespaces.length;i++){
        namespaces[i].value = namespaces[i].namespace;
      }
      let results = queryString ? namespaces.filter(this.createStateFilter(queryString)) : namespaces;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        let flag = (state.namespace.indexOf(queryString) === 0);
        return flag;
      };
    },
    handleSelect(item) {
      //当搜索框选择一个字符串时，会触发该函数。当该函数被触发时，可以发送请求至后台搜索
      if(item == null){
        this.$message.error("请提供一个命名空间进行查询");
        return;
      }
      this.getTemplates(item.value);
    },
    getTemplates(param){
      let curPage = this.currentPage;
      let pageSize = this.pageSize;
      axios.get('/getTemplatesByNamespace', {
        params: {
          namespace: param,
          currentPage: curPage,
          pageSize: pageSize
        }
      }).then(response => {
        let status = response.data.status;
        if(status == 200){
          this.templates = response.data.templates;
          this.totalPages = response.data.totalPage;
        }else{
          this.$message.error("无法获取日志模板信息！");
        }
      })
    },
    handleCurrentChange(val){
      console.log("当前页发生改变" + val)
      let namespace = this.state;
      this.currentPage = val;
      this.getTemplates(namespace);
    },
    handlePrevClick(){
      console.log("进入上一页")
      if(this.currentPage - 1 < 0){
        this.$message.error("当前已是初始页！");
        return;
      }
      this.currentPage -= 1;
      this.getTemplates(this.state);
    },
    handleNextClick(){
      console.log("进入下一页")
      if(this.currentPage + 1 > this.totalPages){
        this.$message.error("当前已是末尾页！");
        return;
      }
      this.currentPage += 1;
      this.getTemplates(this.state);
    }
  },
  mounted() {
    //在页面加载之前调用mounted钩子函数，从服务器获取所有的命名空间
    this.loadAll();
  }
}
</script>

<style scoped>

</style>
