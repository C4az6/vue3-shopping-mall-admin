import { ref, reactive, computed, onMounted } from 'vue';
import { toast } from '~/composables/utils.js';
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from '~/api/manager.js';
// 列表、分页、搜索、删除、修改状态
export const useInitTable = (opt = {}) => {
  const loading = ref(false);
  const dataList = ref([]);

  const currentPage = ref(1);
  const totalCount = ref(0);
  const limit = ref(10);


  let searchForm = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
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
        dataList.value = res.list;
        totalCount.value = res.totalCount;
      }
    }).finally(() => {
      loading.value = false;
    });
  }

  getData();

  function statusChange(status, row) {
    row.statusLoading = true;
    opt.updateStatus(row.id, status).then(res => {
      toast('修改状态成功');
      row.status = status;
    }).finally(() => {
      row.statusLoading = false;
    })
  }


  function handleDelete(id) {

    loading.value = true;
    opt.delete(id).then(res => {
      toast('删除成功');
      getData();
    }).finally(() => loading.value = false)
  }


  const multipleTableRef = ref(null);
  // 多选选中的ID列表
  const multiSelectionIds = ref([]);
  const handleSelectionChange = (e) => {
    multiSelectionIds.value = e.map(item => item.id);
  }

  // 批量删除
  const handleMultiDelete = () => {
    loading.value = true;
    opt.delete(multiSelectionIds.value).then(res => {
      toast('删除成功');
      // 清空选中
      if (multipleTableRef.value) {
        multipleTableRef.value.clearSelection();
      }
      getData();
    }).finally(() => {
      loading.value = false;
    })
  }
  return {
    loading,
    dataList,
    searchForm,
    resetSearchForm,
    currentPage,
    totalCount,
    limit,
    getData,
    statusChange,
    handleDelete,
    multipleTableRef,
    multiSelectionIds,
    handleSelectionChange,
    handleMultiDelete
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

  const drawerTitle = computed(() => editId.value ? '修改' : '新增')

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
    }
  }

  function handleEdit(row) {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open();
  }

  function create() {
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