import { ref, reactive, computed, onMounted } from 'vue';
import { toast } from '~/composables/utils.js';
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from '~/api/manager.js';
// 列表、分页、搜索
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

// 新增、修改
export const useInitForm = (opt = {}) => {
  const formDrawerRef = ref(null);
  const formRef = ref(null);
  const form = reactive({})
  const editId = ref(0);
  const rules = opt.rules || {}
  const defaultForm = opt.form

  const drawerTitle = computed(() => editId.value ? '修改管理员' : '新增管理员')

  function handleSubmit() {
    formDrawerRef.value.showLoading();
    let promise = editId.value ? opt.update(editId.value, form) : opt.create(form);
    promise.then(res => {
      toast(drawerTitle.value + '成功');
      formDrawerRef.value.close();
      opt.getData();
    }).finally(() => formDrawerRef.value.hideLoading());
  }

  function resetForm(row = false) {
    if (formRef.value) formRef.value.clearValidate();
    // 编辑管理员的情况
    for (const key in defaultForm) {
      form[key] = row[key];
      console.log("key");
    }
  }

  function handleEdit(row) {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
  }

  function create() {
    console.log("create: ", opt.form);
    editId.value = 0;
    resetForm(defaultForm)
    formDrawerRef.value.open();
  }

  return {
    formDrawerRef,
    formRef,
    form,
    editId,
    rules,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleEdit,
    create
  }
}