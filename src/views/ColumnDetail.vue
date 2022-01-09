<template>
  <div class="column-detail-page w-50 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="posts"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import { GlobalDataProps } from '../store'
import { addColumnAvatar } from '../helper'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    // TODO 根据id查询信息
    const column = computed(() => {
      const currentColumn = store.getters.getColumnByCid(currentId)
      if (currentColumn) {
        addColumnAvatar(currentColumn, 100, 100)
      }
      return currentColumn
    })
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })

    const posts = computed(() => {
      return store.getters.getPostsByCid(currentId)
    })
    return {
      column,
      posts
    }
  }
})
</script>
