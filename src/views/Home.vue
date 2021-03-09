<template>
  <div class="container">
    <global-header
      :user="user"
    />
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue' // @ is an alias to /src
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import { getCloumns } from '@/api/index.ts'
import { AxiosResponse } from 'axios'

// const testData: ColumnProps[] = [
//   {
//     _id: '1',
//     title: 'jdsfsd',
//     description: 'sdfsdfsdfs',
//     avatar: {
//       _id: '1',
//       fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'
//     }
//   }
// ]

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    const userData: UserProps = JSON.parse(sessionStorage.getItem('userInfo') as '{}')
    const list = ref<ColumnProps[]>([])
    console.log(list)

    onMounted(() => {
      getCloumns().then((res: AxiosResponse<{data: []}>) => {
        list.value = res.data.data
      })
    })
    return {
      list,
      user: userData
    }
  }
})
</script>
