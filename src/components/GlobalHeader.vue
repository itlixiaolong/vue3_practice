<template>
<div class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
  <div class="navbar-brand">者也专栏</div>
  <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
  </ul>
  <div v-else class="dropdown" ref="domEle">
  <button class="btn btn-primary dropdown-toggle right-button" @click="handleShowDropdownList">
    {{'Hello，'+user.name}}
  </button>

  <ul class="dropdown-menu" v-show="isOpen">
    <li><router-link class="dropdown-item" to="/test">新建文章</router-link></li>
    <li><router-link class="dropdown-item" to="/test">编辑资料</router-link></li>
    <li><router-link class="dropdown-item" to="/test">退出登录</router-link></li>
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
    const isOpen = ref(false)
    const domEle = ref<null|HTMLElement>(null)
    const isClickOutside = useClickOutside(domEle)
    const handleShowDropdownList = () => {
      isOpen.value = !isOpen.value
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
      handleShowDropdownList
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
