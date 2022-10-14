// ====== import ======
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

export const useTabList = () => {
  // ====== composition api init ======
  const router = useRouter();
  const route = useRoute();
  const cookie = useCookies();

  // ====== state ======
  // 激活的标签卡
  const activeTab = ref(route.path);
  // 标签卡列表
  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);


  // ====== method ======
  // 添加标签导航
  const addTab = (t) => {
    let noTab = tabList.value.findIndex((e) => e.title === t.title) === -1;
    if (noTab) {
      // 没有找到tab标签,可以添加到tablist并且存入cookie
      tabList.value.push(t);
    }
    // 把已有的标签数量存起来方便下次初始化使用
    cookie.set("tabList", tabList.value);
  };

  // 标签切换事件
  const handleTabChange = (e) => {
    activeTab.value = e;
    router.push(e);
  };

  // 标签删除事件
  const handleTabRemove = (e) => {
    let tabs = tabList.value;
    let a = activeTab.value;
    if (a === e) {
      // 关闭当前激活中的标签
      tabs.forEach((item, index) => {
        if (item.path === e) {
          // 关闭当前标签后把当前激活标签换成下一个或上一个标签
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            a = nextTab.path;
          }
        }
      });
    }
    activeTab.value = a;
    // 从标签列表中移出当前关闭标签
    tabList.value = tabList.value.filter((item) => item.path != e);
    // 更新cookie
    cookie.set("tabList", tabList.value);
  };

  // 初始化标签导航列表
  const initTabList = () => {
    let tbs = cookie.get("tabList");
    if (tbs) {
      tabList.value = tbs;
    }
  };
  initTabList();

  // 下拉菜单关闭按钮事件
  const handleClose = (e) => {
    console.log("e: ", e);
    if (e === "clearAll") {
      // 切换回首页
      activeTab.value = "/";
      // 过滤只剩下首页
      tabList.value = [{ title: "后台首页", path: "/" }];
    } else if (e === "clearOther") {
      // 过滤当前激活标签和首页，其他都关掉
      tabList.value = tabList.value.filter(
        (item) => item.path === activeTab.value || item.path === "/"
      );
    }
    cookie.set("tabList", tabList.value);
  };

  // ====== computed ======

  // ====== other ======
  // 监听路由更新
  onBeforeRouteUpdate((to, from) => {
    console.log("__________onBeforeRouteUpdate");
    activeTab.value = to.path;
    addTab({ title: to.meta.title, path: to.path });
  });

  return {
    handleClose,
    handleTabRemove,
    handleTabChange,
    activeTab,
    tabList
  }
}