import { ElNotification } from "element-plus";

// 消息提示方法
export const toast = (message, type = "success", dangerouslyUseHTMLString = false) => {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 2500,
  });
}