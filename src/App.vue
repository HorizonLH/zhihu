<template>
  <div id="app" class="container">
    <global-header :user="userInfo"/>
    <validate-form action="" @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailValue"
          placeholder="请输入邮箱"
          type="text"
          />
        {{emailValue}}
      </div>
      <div class="mb-3">
        <label for="form-label">密码</label>
        <validate-input
          :rules="passRules"
          placeholder="请输入密码"
          type="password"
          />
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
    <column-list :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProp } from './components/GlobalHeader.vue'
import ValidateInput, { RuleProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

const userInfo: UserProp = {
  isLogin: true,
  name: 'horizon'
}

const emailRules: RuleProp[] = [
  { type: 'required', message: '请输入内容' },
  { type: 'email', message: '请输入正确的邮箱格式' }
]
const passRules: RuleProp[] = [
  { type: 'required', message: '请输入内容' }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailValue = ref('111')
    const onFormSubmit = (result:boolean) => {
      console.log(result)
    }
    return {
      list: testData,
      userInfo,
      emailRules,
      passRules,
      emailValue,
      onFormSubmit
    }
  }
})
</script>

<style>
  #app {
    /* margin:0 auto */
    /* margin: 10px; */
  }
</style>
