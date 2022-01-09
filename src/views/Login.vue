<template>
  <validate-form @form-submit="submitForm">
    <validate-input placeholder="请输入邮箱" :rules="emailRules" v-model="email"/>
    <validate-input placeholder="请输入密码" type="password" :rules="passwordRules" v-model="password"/>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RuleProp } from '../components/ValidateInput.vue'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const emailRules: RuleProp[] = [
      { type: 'required', message: '请输入邮箱' },
      { type: 'email', message: '请输入正确邮箱' }
    ]
    const passwordRules: RuleProp[] = [
      { type: 'required', message: '请输入密码' }
    ]
    const submitForm = (result:boolean) => {
      if (result) {
        // alert('success')
        store.commit('login')
        router.push({ name: 'home' })
      }
    }
    return {
      email,
      password,
      emailRules,
      passwordRules,
      submitForm
    }
  }
})
</script>
