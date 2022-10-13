import { ElNotification, ElMessageBox } from "element-plus";

// 消息提示方法
export const toast = (message, type = "success", dangerouslyUseHTMLString = false) => {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 2500,
  });
}

export const showModal = (content = "提示内容", type = "warning", title = "") => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type
  })
}