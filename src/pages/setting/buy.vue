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
                <el-button type="primary" size="small" text @click="open(row.key)">配置</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>

        <el-tab-pane label="购物设置" name="second">
          <el-form-item label="未支付订单">
            <div>
              <el-input type="number" v-model="form.close_order_minute">
                <template #append>
                  分钟后自动关闭
                </template>
              </el-input>
              <p class="mt-2 text-xs text-rose-500">订单下单未付款，n分钟后自动关闭，设置0不自动关闭</p>
            </div>
          </el-form-item>

          <el-form-item label="已发货订单">
            <div>
              <el-input type="number" v-model="form.auto_received_day">
                <template #append>
                  天后自动确认收货
                </template>
              </el-input>
              <p class="mt-2 text-xs text-rose-500">如果在期间未确认收货，系统自动完成收货，设置0不自动收货</p>
            </div>
          </el-form-item>

          <el-form-item label="已完成订单">
            <div>
              <el-input type="number" v-model="form.after_sale_day">
                <template #append>
                  天内允许申请售后
                </template>
              </el-input>
              <p class="mt-2 text-xs text-rose-500">订单完成后 ，用户在n天内可以发起售后申请，设置0不允许申请售后</p>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="default" @click="submit">保存</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

    </el-form>

    <FormDrawer ref="formDrawerRef" title="配置" @submit="submit">
      <el-form v-if="drawerType == 'alipay'" :model="form" label-width="auto">
        <el-form-item label="app_id">
          <el-input v-model="form.alipay.app_id" placeholder="app_id" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="ali_publice_key">
          <el-input type="textarea" rows="4" v-model="form.alipay.ali_publice_key" placeholder="ali_publice_key" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="private_key">
          <el-input type="textarea" rows="4" v-model="form.alipay.private_key" placeholder="private_key" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>

      <el-form v-else :model="form" label-width="auto">
        <el-form-item label="公众号 APPID">
          <el-input v-model="form.wxpay.app_id" placeholder="app_id" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="小程序 APPID">
          <el-input rows="4" v-model="form.wxpay.miniapp_id" placeholder="miniapp_id" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="小程序 secret">
          <el-input rows="4" v-model="form.wxpay.secret" placeholder="secret" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="appid">
          <el-input rows="4" v-model="form.wxpay.appid" placeholder="appid" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="商户号">
          <el-input rows="4" v-model="form.wxpay.mch_id" placeholder="mch_id" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="API 密钥">
          <el-input rows="4" v-model="form.wxpay.key" placeholder="key" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="cert_client">
          <el-upload :action="uploadAction" :limit="1" :headers="{token}" accept=".pem" :on-success="uploadClientSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <p class="text-rose-500">{{form.wxpay.cert_client || '还未配置'}}</p>
              <div class="el-upload__tip">例如：apiclient_cert.pem</div>
            </template>
          </el-upload>

        </el-form-item>

        <el-form-item label="cert_key">
          <el-upload :action="uploadAction" :limit="1" :headers="{token}" accept=".pem" :on-success="uploadKeySuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <p class="text-rose-500">{{form.wxpay.cert_key || '还未配置'}}</p>
              <div class="el-upload__tip">apiclient_key.pem</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>

    </FormDrawer>

  </div>
</template>

<script setup>
import {
  getSysConfig,
  setSysConfig,
  uploadAction
} from '~/api/sysconfig'
import { ref, reactive, onMounted } from 'vue';
import { toast } from '~/composables/utils.js'
import { getToken } from '~/composables/auth.js'
import FormDrawer from '~/components/FormDrawer.vue'

const token = getToken();

const formDrawerRef = ref(null);

const drawerType = ref("alipay")

const open = (key) => {
  drawerType.value = key
  formDrawerRef.value.open();
}

const tableData = ref([
  {
    name: '支付宝支付',
    desc: '该系统支持即时到账',
    src: "/alipay.png",
    key: "alipay"
  },
  {
    name: '微信支付',
    desc: '该系统支持微信网页支付和扫码支付',
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
    app_id: "",
    miniapp_id: "",
    secret: "",
    appid: "",
    mch_id: "",
    key: "",
    cert_client: "",
    cert_key: ""
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
  setSysConfig(form).then(res => {
    toast('保存成功')
    getData();
  }).finally(() => {
    loading.value = false;
  })
}

function uploadClientSuccess(response, uploadFile, uploadFiles) {
  form.wxpay.cert_client = response.data;
}

function uploadKeySuccess(response, uploadFile, uploadFiles) {
  form.wxpay.cert_key = response.data;
}

onMounted(() => {
  // getData();
});

</script>

<style>
</style>