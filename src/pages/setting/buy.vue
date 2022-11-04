<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-form :model="form" label-width="160px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="支付设置" name="first">
          <el-table :data="tableData" border stripe>
            <el-table-column label="支付方式" align="left">
              <template #default="{row}">
                <div class="flex items-center">
                  <el-image :src="row.src" fit="cover" style="width:40px;height:40px;" class="rounded mr-3" :lazy="true"></el-image>
                  <div class="">
                    <p>{{row.name}}</p>
                    <p class="mt-1 text-xs text-rose-500">{{row.desc}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="100">
              <template #default="{row}">
                <el-button type="primary" size="small" text>配置</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>

        <el-tab-pane label="购物设置" name="second">
          <!-- <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.upload_method">
              <el-radio label="oss" border>
                对象存储
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Bucket">
            <el-input v-model="form.upload_config.Bucket" placeholder="Bucket" style="width: 30%">
            </el-input>
          </el-form-item>

          <el-form-item label="ACCESS_KEY">
            <el-input v-model="form.upload_config.ACCESS_KEY" placeholder="ACCESS_KEY" style="width: 30%">
            </el-input>
          </el-form-item>

          <el-form-item label="SECRET_KEY">
            <el-input v-model="form.upload_config.SECRET_KEY" placeholder="SECRET_KEY" style="width: 30%">
            </el-input>
          </el-form-item>

          <el-form-item label="空间域名">
            <el-input v-model="form.upload_config.http" placeholder="http" style="width: 30%">
            </el-input>
            <small class="ml-3 text-gray-500">请补全http://或https://</small>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="default" @click="submit">保存</el-button>
          </el-form-item> -->
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
import { toast } from '~/composables/utils'


const tableData = ref([
  {
    name: '支付宝支付',
    desc: '该系统支持即时到账',
    src: "/alipay.png",
    key: "alipay"
  },
  {
    name: '微信支付',
    desc: '该系统支持即时到账',
    src: "/wepay.png",
    key: "wxpay"
  }
]);
const loading = ref(false);
const form = reactive({
  close_order_minute: 30,
  auto_received_day: 7,
  after_sale_day: 23,
  alipay: {
    app_id: "****已配置****",
    ali_publice_key: "****已配置****",
    private_key: "****已配置****"
  },
  wxpay: {

  }

});

const activeName = ref("first");

function getData() {
  loading.value = true;
  getSysConfig().then(res => {
    for (const key in form) {
      form[key] = res[key];
    }
    form.password_encrypt = form.password_encrypt.split(',');
  }).finally(() => {
    loading.value = false;
  })
}

function submit() {
  loading.value = true;
  setSysConfig({ ...form, password_encrypt: form.password_encrypt.join(',') }).then(res => {
    toast('保存成功')
    getData();
  }).finally(() => {
    loading.value = false;
  })
}

onMounted(() => {
  // getData();
});

</script>

<style>
</style>