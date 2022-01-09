<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <!-- <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2> -->
      <!-- <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template> -->
      <!-- <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
      </template> -->
    <!-- </uploader> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          placeholder="请输入文章标题"
          type="text"
          v-model="titleVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          v-model="contentVal"
        />
      </div>
      <!-- <template #submit>
        <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}} -->
<!-- </button> -->
      <!-- </template> -->
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
import { GlobalDataProps } from '../store'
import PostProps from '../interfaces/PostProps'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const onFormSubmit = (result:boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }
    return {
      onFormSubmit,
      titleVal,
      contentVal
    }
  }
})
</script>
