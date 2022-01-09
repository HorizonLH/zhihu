<template>
  <!-- <div class="d-flex flex-column h-100"> -->
    <div class="container-fluid px-0">
      <global-header :user="userInfo"/>
      <router-view></router-view>
      <loader v-if="isLoading" text="加载中" background="rgba(0,0,0,0.8)"/>
    </div>
    <footer class="text-center py-4 text-secondary bg-light mt-auto navbar-fixed-bottom">
      <div class="container">
        <small>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">©️ 2022 知乎专栏</li>
          </ul>
        </small>
      </div>
    </footer>
  <!-- </div> -->
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import UserProp from './interfaces/UserProps'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const onFormSubmit = (result:boolean) => {
      console.log(result)
    }
    return {
      userInfo,
      onFormSubmit,
      isLoading
    }
  }
})
</script>

<style>
  .navbar-fixed-bottom {
    /* position: fixed; */
    bottom: 0;
    width: 100%;
  }
</style>
