import { ref, reactive } from "vue";
import { showModal, toast } from "~/composables/utils.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { logout, updatePassword } from "~/api/manager.js";

export const useRepassword = () => {
  const router = useRouter();
  const store = useStore();
  // 修改密码表单
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const rules = {
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    repassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
    ],
  };

  const formRef = ref(null);
  const formDrawerRef = ref(null);


  const onSubmit = () => {
    // 监听表单验证结果回调事件,false为不通过,true为通过
    formRef.value.validate(async (valid) => {
      if (!valid) {
        return false;
      }
      // 开启loading
      formDrawerRef.value.showLoading();
      updatePassword(form)
        .then((response) => {
          toast("提交密码成功,请重新登录", "success");
          store
            .dispatch("logout")
            .then((res) => {
              router.push("/login");
            })
            .catch((err) => {
              console.log("error: ", err);
            });
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  const openRepasswordForm = () => {
    formDrawerRef.value.open();
  };

  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRepasswordForm,
  };
};


export const useLogout = () => {
  const router = useRouter();
  const store = useStore();
  function handleLogout() {
    showModal("是否要退出登录?").then((res) => {
      logout().then(() => {
        store.dispatch("logout");
        // 跳转登录页面
        router.push("/login");
        // 提示退出登录成功
        toast("退出登录成功", "success");
      });
    });
  }

  return {
    handleLogout
  }
}