<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">
      修改资料
    </h5>
    <validate-form @submit="handleFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="formData.email"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          v-model="formData.nickName"
          :rules="nameRules"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          v-model="formData.repeatPassword"
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
        />
      </div>
      <template #submit>
        <button
          type="submit"
          class="btn btn-primary btn-block btn-large"
        >
          提交变更
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput, { RuleProps } from '@/components/VaildateInput.vue'
import { useRouter } from 'vue-router'
import ValidateForm from '@/components/ValidateForm.vue'
interface FormProps {
	email: string;
	nickName: string;
  password: string;
  repeatPassword: string;
}
export default defineComponent({
  name: 'Register',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const formData = reactive<FormProps>({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RuleProps = [
      {
        type: 'required',
        message: '电子邮箱地址不能为空'
      },
      {
        type: 'email',
        message: '请输入正确的邮箱地址'
      }
    ]
    const passwordRules: RuleProps = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const nameRules: RuleProps = [
      {
        type: 'required',
        message: '用户昵称不能为空'
      }
    ]
    const repeatPasswordRules: RuleProps = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const handleFormSubmit = (validateFlag: boolean) => {
      validateFlag && router.push('/login')
    }
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      handleFormSubmit
    }
  }
})
</script>
