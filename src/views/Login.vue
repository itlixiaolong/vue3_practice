<template>
  <div class="Login mx-auto p-3 w-330">
    <!--html code-->
    <h5 class="my-4 text-center">
      登录到者也
    </h5>
    <validate-form @submit="handleSumit">
      <label>邮箱:</label>
      <validate-input
        v-model="email"
        :rules="rules1"
        type="text"
        placeholder="请输入邮箱地址"
      />
      <label>密码:</label>
      <validate-input
        v-model="password"
        :rules="rules2"
        type="password"
        placeholder="请输入邮箱地址"
      />
      <template #submit>
        <button class="btn btn-primary btn-block btn-large submit-btn">
          submit
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RuleProps } from '@/components/VaildateInput.vue'
import { useRouter } from 'vue-router'

const rules1: RuleProps = [
  { type: 'required', message: '邮箱地址不能为空' },
  { type: 'email', message: '邮箱地址不正确' }
]
const rules2: RuleProps = [
  { type: 'required', message: '密码不能为空' },
  { type: 'password', message: '密码格式不正确' }

]
export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const router = useRouter()
    const email = ref<string>('')
    const password = ref<string>('')
    const handleSumit = (vilidateFlag: boolean) => {
      console.log(vilidateFlag)
      if (vilidateFlag) {
        const userInfo = {
          name: email.value,
          password: password.value
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        sessionStorage.setItem('isLogin', 'true')
        router.push('/')
      }
    }
    return {
      rules1,
      rules2,
      email,
      password,
      handleSumit
    }
  }
})
</script>

<style scoped lang="scss">
.Login {
/* less */
width: 40%;
margin: 100px auto 0;

}

</style>
