<template>
  <div class="container">
    <column-list :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue' // @ is an alias to /src
const testData: ColumnProps[] = [
  {
    _id: '1',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }

  }, {
    _id: '2',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }

  }]
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testData
    }
  }
})
</script>
