<template>
  <el-form ref="uploadForm" :label-position="labelPosition" label-width="50px" label-height="30px" v-model="formData">
    <el-form-item label="命名空间">
      <el-input v-model="formData.namespace" ></el-input>
    </el-form-item>
    <el-form-item label="预处理正则表达式">
      <el-input v-model="formData.reg" placeholder="非必需"></el-input>
    </el-form-item>
    <el-form-item label="选择解析算法">
      <el-select v-model="selectorValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
<!--      <span>{{selectorValue}}</span>-->
    </el-form-item>
    <el-form-item label="选择文件">
      <el-upload drag
                 ref="upload"
                 action
                 :auto-upload="false"
                 :http-request="uploadLogFile"
                 :limit="1"
                 :before-upload="beforeLogUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
        <div class="el-upload__tip" slot="tip">仅支持以txt/log/out后缀的文本文件，大小不超过500Kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button v-on:click="submitUpload" type="primary">点击上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
      <el-button v-on:click="startupParse" type="success">开始解析<i class="el-icon-caret-right el-icon--right"></i></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios"
export default {
  name: "UploadByFile",
  data(){
    return{
      labelPosition: 'top',
      formData: {
        namespace: '',
        reg: '',
        status: ''
      },
      options: [
        {
          value: 'LenMa',
          label: 'LenMa(默认)'
        },
        {
          value: 'MoLFI',
          label: 'MoLFI'
        }
      ],
      selectorValue: 'LenMa'
    }
  },
  methods:{
    uploadLogFile(param){
      let file = param.file;
      console.log(file);
      let namespace = this.formData.namespace;
      if(namespace == null){
        this.$message.error("命名空间不能为空！");
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      let formData = new FormData();
      formData.append('file', file);
      formData.append('namespace', namespace);
      formData.append('reg', this.formData.reg);
      this.axios.post("/upload", formData, config).then(response => {
        console.log(response);
        let responseStatus = response.data.status;
        let responseMessage = response.data.message;
        if(responseStatus == 200){
          this.$notify({
            title: '提交成功',
            message: ('i', {style: 'color: teal'}, responseMessage),
            duration: 3000
          });
        }else if(responseStatus == 400){
          this.$notify({
            title: '提交失败',
            message: ('i', {style: 'color: teal'}, responseMessage),
            duration: 3000
          });
        }
        this.$refs.uploadForm.resetFields()
        this.$refs.upload.clearFiles()
      })
    }
    ,
    submitUpload(){
      this.$refs.upload.submit();
    },
    beforeLogUpload(file){
      let isLt500Kb = (file.size / 100 / 1024) < 5;
      if(!isLt500Kb){
        this.$message.error("上传的日志文件大小不能超过500Kb！");
        return false;
      }
      return true;
    },
    startupParse(){
      const method = this.selectorValue;
      axios.get("/read",{
        params: {
          method: method
        }
      }).then(response =>{
        console.log(response)
      })
    }
  }

}

</script>

<style scoped>

</style>
