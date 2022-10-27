<template>
  <div>
    <!-- 标签页 -->
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name" :name="item.key">
      </el-tab-pane>
    </el-tabs>

    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <Search @search="getData" :model="searchForm" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input size="small" v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
        </SearchItem>

        <template #show>
          <SearchItem label="商品分类">
            <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" clearable>
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </SearchItem>
        </template>
      </Search>

      <ListHeader layout="create,delete,refresh" @create="create" @refresh="getData" @delete="handleMultiDelete">
        <el-button size="small" @click="handleMultiStatusChange(1)" v-if="searchForm.tab == 'all' || searchForm.tab == 'off'">上架</el-button>
        <el-button size="small" @click="handleMultiStatusChange(0)" v-if="searchForm.tab == 'all' || searchForm.tab == 'saling'">下架</el-button>

      </ListHeader>

      <div class="mt-4">
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="dataList" stripe style="width: 100%" v-loading="loading">

          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column prop="title" label="商品" width="300">
            <template #default="{ row }">
              <div class="flex">
                <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true" style="width: 50px; height: 50px"></el-image>
                <div class="flex-1">
                  <p>{{ row.title }}</p>
                  <div>
                    <span class="text-rose-500">￥{{ row.min_price }}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
                  </div>
                  <!-- row.category 如果是undefined 则会显示未分类 -->
                  <p class="text-gray-400 text-xs mb-1">
                    分类: {{ row.category?.name ?? "未分类" }}
                  </p>
                  <p class="text-gray-400 text-xs">
                    创建时间: {{ row.create_time }}
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="sale_count" label="实际销量" width="90" align="center">
          </el-table-column>

          <el-table-column label="商品状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.status ? 'success' : 'danger'" size="small">
                {{ row.status ? "上架" : "仓库" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="审核状态" width="120" align="center" v-if="searchForm.tab !== 'delete'">
            <template #default="{ row }">
              <div v-if="row.ischeck == 0">
                <el-button type="success" size="small" plain>审核通过</el-button>
                <el-button class="mt-3 !ml-0" type="danger" size="small" plain>审核拒绝</el-button>
              </div>
              <span v-else>{{ row.ischeck == 1 ? "通过" : "拒绝" }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="stock" label="总库存" width="90" align="center">
          </el-table-column>

          <el-table-column align="center" prop="address" label="操作">
            <template #default="scope">
              <div v-if="searchForm.tab !== 'delete'">
                <el-button class="px-1" type="primary" text size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button class="px-1" type="primary" text size="small" @click="handleSetGoodsSkus(scope.row)" :loading="scope.row.skusLoading">商品规格</el-button>
                <el-button class="px-1" :type="scope.row.goods_banner.length == 0 ? 'danger': 'primary'" text size="small" @click="handleSetGoodsBanners(scope.row)" :loading="scope.row.bannersLoading">设置轮播图</el-button>
                <el-button class="px-1" :type="!scope.row.content ? 'danger': 'primary'" @click="handleSetGoodsContent(scope.row)" :loading="scope.row.contentLoading" text size="small">商品详情</el-button>

                <el-popconfirm width="200" title="是否要删除该商品?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
                  <template #reference>
                    <el-button type="primary" text size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
              <span v-else>暂无操作</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="auto">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称,不能超过60个字符"></el-input>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <ChooseImage v-model="form.cover" />
        </el-form-item>

        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="form.category_id" placeholder="请选择所属分类">
            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="商品描述" prop="desc">
          <el-input v-model="form.desc" placeholder="选填,商品卖点" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" style="width: 50%"></el-input>
        </el-form-item>

        <el-form-item label="总库存" prop="stock">
          <el-input v-model="form.stock" type="number" style="width: 40%"></el-input>
          <template #append> 件 </template>
        </el-form-item>

        <el-form-item label="库存预警" prop="min_stock">
          <el-input v-model="form.min_stock" type="number" style="width: 40%"></el-input>
          <template #append> 件 </template>
        </el-form-item>

        <el-form-item label="最低销售价" prop="min_price">
          <el-input v-model="form.min_price" type="number" style="width: 40%"></el-input>
          <template #append> 元 </template>
        </el-form-item>

        <el-form-item label="最低原价" prop="min_oprice">
          <el-input v-model="form.min_oprice" type="number" style="width: 40%"></el-input>
          <template #append> 元 </template>
        </el-form-item>

        <el-form-item label="库存显示" prop="stock_display">
          <el-radio-group v-model="form.stock_display">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否上架" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">仓库</el-radio>
            <el-radio :label="1">上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <banners ref="bannersRef" @reloadData="getData"></banners>
    <content ref="contentRef" @reload="getData"></content>
    <skus ref="skusRef"></skus>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
} from "~/api/goods.js";
import FormDrawer from "~/components/FormDrawer.vue";
import ChooseImage from "~/components/ChooseImage.vue";
import ListHeader from "~/components/ListHeader.vue";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";
import { getCategoryList } from "~/api/category.js";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import banners from './banners.vue';
import content from './content.vue';
import skus from './skus.vue'

const {
  loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  resetSearchForm,
  handleDelete,
  multipleTableRef,
  handleSelectionChange,
  handleMultiDelete,
  handleMultiStatusChange
} = useInitTable({
  searchForm: { title: "", tab: "all", category_id: null },
  getList: getGoodsList,
  onGetListSuccess: (res) => {
    dataList.value = res.list.map((item) => {
      item.bannersLoading = false;
      item.contentLoading = false;
      item.skusLoading = false;
      return item;
    });
    totalCount.value = res.totalCount;
  },
  updateStatus: updateGoodsStatus,
  delete: deleteGoods,
});

const {
  formDrawerRef,
  formRef,
  form,
  editId,
  rules,
  drawerTitle,
  handleSubmit,
  resetForm,
  handleEdit,
  create,
} = useInitForm({
  rules: {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    role_id: [
      {
        required: true,
        message: "请选择管理员所属角色",
        trigger: "change",
      },
    ],
    status: [],
    avatar: [],
  },
  form: {
    title: null, // 商品名称
    category_id: null, // 商品分类ID
    cover: null, // 商品封面
    desc: null, // 商品描述
    unit: "件", // 商品单位
    stock: 100, // 总库存
    min_stock: 10, // 库存预警
    status: 1, // 是否上架 0仓库 1上架
    stock_display: 1, // 库存显示 0隐藏 1显示
    min_price: 0, // 最低销售价
    min_oprice: 0, // 最低原价
  },
  getData,
  update: updateGoods,
  create: createGoods,
});

const errorHandler = () => true;

const tabbars = [
  {
    key: "all",
    name: "全部",
  },
  {
    key: "checking",
    name: "审核",
  },
  {
    key: "saling",
    name: "出售中",
  },
  {
    key: "off",
    name: "已下架",
  },
  {
    key: "min_stock",
    name: "库存预警",
  },
  {
    key: "delete",
    name: "回收站",
  },
];

// 商品分类
const categoryList = ref([]);
getCategoryList().then((res) => (categoryList.value = res));

// 设置轮播图
const bannersRef = ref(null);
const handleSetGoodsBanners = (row) => {
  bannersRef.value.open(row);
}

// 设置商品详情
const contentRef = ref(null);
const handleSetGoodsContent = (row) => {
  contentRef.value.open(row);
}

// 设置商品规格
const skusRef = ref(null);
const handleSetGoodsSkus = (row) => {
  skusRef.value.open(row);
}

</script>

<style lang="less" scoped></style>
