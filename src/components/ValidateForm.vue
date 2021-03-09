<template>
  <div class="ValidateForm">
    <!--html code-->
    <slot />
    <div
      class="submit-area"
      @click.prevent="handleSubmit"
    >
      <slot name="submit">
        <button
          type="submit"
          class="btn btn-primary"
        >
          提交
        </button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import emitter from '@/utils/emitter'

type ValidateFun = () => boolean

let funArr: ValidateFun[] = []

export default defineComponent({
  name: 'ValidateForm',
  emits: ['submit'],
  setup(props, context) {
    const handleSubmit = () => {
      const validateFlag = funArr.map(fn => fn()).every(result => result)
      context.emit('submit', validateFlag)
    }
    const callback = (fn?: ValidateFun) => {
      fn && funArr.push(fn)
    }
    emitter.on('form-item-mounted', callback)

    onUnmounted(() => {
      emitter.off('form-item-mounted', callback)
      funArr = []
    })
    return {
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.ValidateForm {
/* less */
margin-bottom: 20px;
}

</style>
