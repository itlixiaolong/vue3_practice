<template>
  <div class="validate-input-container pb-3">
    <input
      :value="val"
      class="form-control"
      :class="{'is-invalid': error}"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    >
    <span
      v-if="error"
      class="invalid-feedback"
    >{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, toRefs } from 'vue'
import emitter from '@/utils/emitter'
interface RuleProp{
	type: 'required'|'email'|'password'|'custom';
	message: string;
  validator?: () => boolean;
}
interface ComponentPropsType{
	rules: RuleProps;
  modelValue: string;
}
export type RuleProps=RuleProp[]
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordReg = /[a-zA-Z0-9_@!^&*]{6,8}/

export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RuleProps>,
      default() {
        return []
      }
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:modelValue': (targetValue) => {
      if (!targetValue) {
        console.warn('非法的参数传递')
        return false
      }
      return true
    }
  },
  // 1.额外定义props对象的结构类型,在setup(props:类型定义)使用
  // setup (props: ComponentPropsType) {
  setup (props, context) {
    const inputRef = reactive({
      // val: props.modelValue || '', //[1]配合第一条使用
      val: (props as {modelValue: ''}).modelValue || '', // 2.通过使用as做强制类型断言
      // val: (props as any).modelValue || '', //使用any会产生警告
      message: '',
      error: false
    })
    const validateInput = () => {
      // 1.使用 in 做类型断言
      if ('rules' in props) {
      // 2.使用 as 做类型断言
      // const allPass = (props as ComponentPropsType).rules.every...
        const allPass = props.rules.every((rule: RuleProp) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
          case 'required':
            if (!inputRef.val.trim()) {
              passed = false
            }
            break
          case 'email':
            if (!emailReg.test(inputRef.val)) {
              passed = false
            }
            break
          case 'password':
            if (!passwordReg.test(inputRef.val)) {
              passed = false
            }
            break
          case 'custom':
            passed = rule.validator ? rule.validator() : true
            break
          default:
            break
          }
          return passed
        })
        inputRef.error = !allPass
        return allPass
      }
      return true
    }
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-mounted', validateInput)
    })
    return {
      ...toRefs(inputRef),
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>
