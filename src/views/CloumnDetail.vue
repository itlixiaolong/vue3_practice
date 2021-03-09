<template>
  <!--html code-->
  <div class="column-detail-page w-75 mx-auto">
    <div
      v-if="cloumn"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center">
        <img
          :src="cloumn.avatar && cloumn.avatar.fitUrl"
          :alt="cloumn.title"
          class="rounded-circle border w-100"
        >
      </div>
      <div class="col-9">
        <h4>{{ cloumn.title }}</h4>
        <p class="text-muted">
          {{ cloumn.description }}
        </p>
      </div>
    </div>
    <post-list :list="list" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AxiosResponse } from 'axios'
import { ColumnProps } from '@/components/ColumnList.vue'
import { getCloumn } from '@/api/index.ts'
import PostList, { PostProps } from '@/components/PostList.vue'

interface ColumnPropsWidthList extends ColumnProps{
	list?: PostProps;
}
export default defineComponent({
  name: 'CloumnDetail',
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    // const router = useRouter()
    const cloumn = ref<ColumnPropsWidthList>({
      _id: '',
      title: '',
      description: ''
    })
    const clomunId = route.params.id

    getCloumn({}, (clomunId as string)).then((res: AxiosResponse) => {
      cloumn.value = res.data.data
    })
    const list = computed(() => {
      return cloumn.value.list
    })
    return {
      cloumn,
      list
    }
  }
})
</script>

<style scoped lang="scss">
.CloumnDetail {
/* less */

}

</style>
