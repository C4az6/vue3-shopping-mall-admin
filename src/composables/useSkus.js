/* 
  提供给其他组件使用的响应式公共模块
*/


import { ref } from 'vue';
import { createGoodsSkusCard, updateGoodsSkuCard, deleteGoodsSkuCard, sortGoodsSkuCard } from '~/api/goods.js'
import { toast, useArrayMoveUp, useArrayMoveDown } from '~/composables/utils.js'

// 当前商品ID
export const goodsId = ref(0);
export const loading = ref(false);

export const bodyLoading = ref(false);


// 规格选项列表
export const sku_card_list = ref([]);

// 初始化规格选项列表
export const initSkuCardList = (d) => {
  sku_card_list.value = d.goodsSkusCard.map(item => {
    // 方便提交失败的时候能自动改回原来的值,这里新增一个text属性
    item.text = item.name;
    item.loading = false;
    item.goodsSkusCardValue.map(v => {
      v.text = v.value || "属性值"
      return v;
    })
    return item;
  })
}

// 添加规格选项
export function addSkuCardEvent() {
  loading.value = true;
  createGoodsSkusCard({
    goods_id: goodsId.value,
    name: "规格选项",
    order: 50,
    type: 0
  }).then(res => {
    // 注意这里需要添加额外属性
    sku_card_list.value.push({
      ...res,
      text: res.name,
      loading: false,
      goodsSkusCardValue: []
    })
  }).finally(() => {
    loading.value = false;
  })
}


// 修改规格选项
export function handleUpdate(item) {
  item.loading = true;
  updateGoodsSkuCard(item.id,
    {
      goods_id: item.goods_id,
      name: item.text,
      order: item.order,
      type: item.type
    }
  ).then(res => {
    item.name = item.text
    toast('修改成功', 'success');
  }).catch(err => {
    // 修改失败
    item.text = item.name;
    toast('修改失败', 'error');
  }).finally(() => {
    item.loading = false;
  })
}


// 删除规格选项
export function handleDelete(item) {
  item.loading = true;
  deleteGoodsSkuCard(item.id).then(res => {
    sku_card_list.value.splice(sku_card_list.value.findIndex(v => v.id == item.id), 1);
    toast('删除成功');
  }).finally(() => {
    item.loading = false;
  })
}

// 排序规格选项
export function sortCard(action, index) {
  // 深拷贝一份规格选项数据
  let oList = JSON.parse(JSON.stringify(sku_card_list.value));
  let func = action == 'up' ? useArrayMoveUp : useArrayMoveDown;
  func(oList, index);

  let sortData = oList.map((item, index) => {
    return { id: item.id, order: index + 1 }
  })
  bodyLoading.value = true;
  sortGoodsSkuCard({ sortdata: sortData }).then(res => {
    func(sku_card_list.value, index);
  }).finally(() => {
    bodyLoading.value = false;
  })
}


// 初始化规格值
/* 
  接收规格选项ID
*/
export function initSkusCardItem(id) {
  const item = sku_card_list.value.find(o => o.id == id)
  return { item };
}