<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-form :model="form" label-width="160px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="注册与访问" name="first">
          <el-form-item label="是否允许注册会员">
            <el-radio-group v-model="form.open_reg">
              <el-radio :label="0" border>
                关闭
              </el-radio>
              <el-radio :label="1" border>
                开启
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="注册类型">
            <el-radio-group v-model="form.reg_method">
              <el-radio label="username" border>
                普通注册
              </el-radio>
              <el-radio label="form" border>
                手机注册
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="密码最小长度">
            <el-input type="number" v-model="form.password_min" placeolder="密码最小长度" style="width: 30%">
            </el-input>
          </el-form-item>

          <el-form-item label="强制密码复杂度">
            <el-checkbox-group v-model="form.password_encrypt">
              <el-checkbox :label="0" border>
                数字
              </el-checkbox>

              <el-checkbox :label="1" border>
                小写字母
              </el-checkbox>

              <el-checkbox :label="2" border>
                大写字母
              </el-checkbox>

              <el-checkbox :label="3" border>
                符号
              </el-checkbox>
            </el-checkbox-group>

          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="上传设置" name="second">
        </el-tab-pane>

        <el-tab-pane label="API安全" name="third">
        </el-tab-pane>
      </el-tabs>

    </el-form>

  </div>
</template>

<script setup>
import {
  getSysConfig,
  setSysConfig
} from '~/api/sysconfig'
import { ref, reactive, onMounted } from 'vue';

const loading = ref(false);
const form = reactive({
  open_reg: 1,    // 开启注册, 0关闭 1开启
  reg_method: "username",     // 注册方式
  password_min: 5,    // 密码最小长度
  password_encrypt: [],   // 密码复杂度 0数字 1小写字母 2大写字母 3符号 例如:0,1,2
  upload_method: "oss",     //上传方式,local本地,oss对象存储
  upload_config: {    //  上传配置
    Bucket: "",
    ACCESS_KEY: "",
    SECRET_KEY: "",
    http: ""
  },
  api_safe: 1,   // api安全 0关闭 1开启
  api_secret: ""    // 秘钥
});

const activeName = ref("first");

function getData() {
  loading.value = true;
  getSysConfig().then(res => {
    console.log("res: ", res);
  }).finally(() => {
    loading.value = false;
  })
}

onMounted(() => {
  getData();
});

</script>

<style>
</style>