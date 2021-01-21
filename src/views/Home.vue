<template>
  <div class="container">
    <global-header :user="user"/>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue' // @ is an alias to /src
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

const testData: ColumnProps[] = [
  {
    _id: '1',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }

  },
  {
    _id: '2',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }
  },
  {
    _id: '3',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }
  },
  {
    _id: '4',
    title: 'jdsfsd',
    description: 'sdfsdfsdfs',
    avatar: {
      _id: '1',
      fitUrl: 'https://www.cssnano.cn/img/logo-alt.png'

    }
  }
]
const userData: UserProps = {
  isLogin: true,
  name: 'lxl',
  id: 1
}
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      user: userData
    }
  }
})
</script>
