<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
      <a class="navbar-brand" href="#">知乎专栏</a>
    <ul v-if="user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <!-- <a href="#" class="btn btn-outline-light my-2">你好，{{user.name}}</a> -->
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item disabled>
            <a class="dropdown-item" href="#">新建文章</a>
          </dropdown-item>
          <dropdown-item>
            <a class="dropdown-item" href="#">编辑资料</a>
          </dropdown-item>
          <dropdown-item>
            <a class="dropdown-item" href="#">退出登录</a>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProp {
  isLogin: boolean;
  name?: string;
  id?: string;
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProp>,
      required: true
    }
  }
})
</script>
