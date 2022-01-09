<template>
  <div class="home-page container-md">
    <section class="text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50">
          <h2 class="fw-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="fw-bold text-center">发现精彩</h4>
    <column-list :list="list"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.getters.getColumns)
    // const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>
