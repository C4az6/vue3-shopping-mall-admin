<template>
  <div>
    <!-- <el-image :src="`http://devsrm.hytera.com/cloud-srm/api-rbac/rbac-anon/getVerifyCode?randomStr${randomStr}`" fit="cover" style="width:200px;height:50px;" :lazy="true"></el-image> -->
    <el-image :src="`http://devsrm.hytera.com/cloud-srm/api-onlineview/onlinePreview?fileuploadId=${fileId}`" fit="cover" style="width:200px;height:50px;" :lazy="true"></el-image>
    <el-button type="primary" size="small" @click="handleClick">更换验证码</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const randomStr = ref("");
const fileId = ref("383927242082432");

const handleClick = () => {
  randomStr.value = Math.ceil(Math.random() * 10000);
}
</script>

<style lang="scss" scoped>
</style>