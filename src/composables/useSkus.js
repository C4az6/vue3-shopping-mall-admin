/* 
  提供给其他组件使用的响应式公共模块
*/

import { ref } from 'vue';

// 当前商品ID
export const goodsId = ref(0);

// 规格选项列表
export const sku_card_list = ref([]);

// 初始化规格选项列表
export const initSkuCardList = (d) => {
  console.log("initSkuCardList: ", d);
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

// 初始化规格值
/* 
  接收规格选项ID
*/
export function initSkusCardItem(id) {
  console.log("id: ", id);
  const item = sku_card_list.value.find(o => o.id == id)
  return { item };
}