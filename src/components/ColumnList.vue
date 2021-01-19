<template>
  <div class="ColumnList row">
    <div v-for="column in columonList" :key="column._id">
       <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar&& column.avatar.fitUrl" :alt="column.title" class="rounded-circle border border-light my-3" >
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs, ComputedRef, readonly, watchEffect } from 'vue'
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
interface ImageProps{
  _id: string;
  url?: string;
  createAt?: string;
  fitUrl?: string;
}
interface DataProps{
  name: number;
  age: number;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const data: DataProps = reactive<DataProps>({
      name: 123,
      age: 12
    })
    const columonList = computed<ColumnProps[]>(() => {
      return props.list
    })

    return {
      columonList,
      ...toRefs(data)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
