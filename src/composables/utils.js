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