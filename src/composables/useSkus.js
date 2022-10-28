/* 
  提供给其他组件使用的响应式公共模块
*/


import { ref } from 'vue';
import { createGoodsSkusCard, updateGoodsSkuCard } from '~/api/goods.js'
import { toast } from '~/composables/utils.js'

// 当前商品ID
export const goodsId = ref(0);
export const loading = ref(false);

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

// 初始化规格值
/* 
  接收规格选项ID
*/
export function initSkusCardItem(id) {
  const item = sku_card_list.value.find(o => o.id == id)
  return { item };
}