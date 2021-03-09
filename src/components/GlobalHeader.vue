<template>
  <div class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="navbar-brand">
      者也专栏
    </div>
    <ul
      v-if="!isLogin"
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <router-link
          to="/login"
          class="btn btn-outline-light my-2"
        >
          登陆
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link
          to="/register"
          class="btn btn-outline-light my-2"
        >
          注册
        </router-link>
      </li>
    </ul>
    <div
      v-else
      ref="domEle"
      class="dropdown"
    >
      <button
        class="btn btn-primary dropdown-toggle right-button"
        @click="handleShowDropdownList"
      >
        {{ 'Hello，'+user.name }}
      </button>

      <ul
        v-show="isOpen"
        class="dropdown-menu"
      >
        <li>
          <router-link
            class="dropdown-item"
            to="/create"
          >
            新建文章
          </router-link>
        </li>
        <li>
          <router-link
            class="dropdown-item"
            to="/edit"
          >
            编辑资料
          </router-link>
        </li>
        <li>
          <div
            class="dropdown-item"
            @click="handleLoginOut"
          >
            退出登录
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export interface UserProps{
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'Globalheader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const isLogin = ref(false)
    const isOpen = ref(false)
    const domEle = ref<null|HTMLElement>(null)
    const isClickOutside = useClickOutside(domEle)
    isLogin.value = sessionStorage.getItem('isLogin') === 'true'
    const handleShowDropdownList = () => {
      isOpen.value = !isOpen.value
    }
    const handleLoginOut = () => {
      sessionStorage.setItem('isLogin', 'false')
      isOpen.value = false
      isLogin.value = false
    }
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    }
    )
    return {
      domEle,
      isOpen,
      isLogin,
      handleShowDropdownList,
      handleLoginOut
    }
  }
})
</script>

<style scoped>
.right-button{
  color: #fff;
}
.dropdown-menu{
  display: block;
}

</style>
