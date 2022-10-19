import { ref, reactive, computed, onMounted } from 'vue';
import { toast } from '~/composables/utils.js';
export const useInitTable = (opt = {}) => {
  const loading = ref(false);
  const dataList = ref([]);
  /*  const searchForm = reactive({
     keyword: ""
   }); */
  const currentPage = ref(1);
  const totalCount = ref(0);
  const limit = ref(10);

  /* function resetSearchForm() {
    searchForm.keyword = "";
    getData();
  } */

  let searchForm = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
    // searchForm = reactive({ ...opt.searchForm });
    searchForm = reactive(opt.searchForm);
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData();
    }
  }

  function getData(p = null) {
    if (typeof p == 'number') {
      currentPage.value = p;
    }
    loading.value = true;
    opt.getList(currentPage.value, searchForm).then(res => {
      if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
        opt.onGetListSuccess(res)
      } else {
        /* dataList.value = res.list.map(item => {
          item.statusLoading = false;
          return item;
        }) */
        dataList.value = res.list;
        totalCount.value = res.totalCount;
        // roles.value = res.roles;
      }
    }).finally(() => {
      loading.value = false;
    });
  }
  return {
    loading,
    dataList,
    searchForm,
    resetSearchForm,
    currentPage,
    totalCount,
    limit,
    getData
  }
}