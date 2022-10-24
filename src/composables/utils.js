import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from 'nprogress'
// 消息提示方法
export const toast = (message, type = "success", dangerouslyUseHTMLString = false) => {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 2500,
  });
}
// 确认提示框
export const showModal = (content = "提示内容", type = "warning", title = "") => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type
  })
}

// 显示全屏loading
export const showFullLoading = () => {
  // 开启进度条
  nprogress.start();
}

// 隐藏全屏loading
export const hideFullLoading = () => {
  // 隐藏进度条
  nprogress.done();
}


// 弹出输入框
export const showPrompt = (tip, value = "") => {
  return ElMessageBox.prompt(tip, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}

// 将query对象转成url参数
export const queryParams = query => {
  console.log("query params: ", query);
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
    console.log('q: ', q);
  }
  let r = q.join("&");
  r = r ? ("?" + r) : "";
  return r;
}