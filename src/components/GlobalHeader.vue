<template>
  <nav class="navbar navbar-dark bg-primary mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">知乎专栏</router-link>
      <ul v-if="user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <!-- <a href="#" class="btn btn-outline-light my-2">你好，{{user.name}}</a> -->
          <dropdown :title="`你好 ${user.nickName}`">
            <dropdown-item>
              <router-link to="/create" class="dropdown-item" href="#">新建文章</router-link>
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
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
        <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
      </ul>
    </div>
</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import UserProp from '../interfaces/UserProps'

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
