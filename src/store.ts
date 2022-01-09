import { createStore, Commit } from 'vuex'
import ColumnProps from './interfaces/ColumnProps'
import PostProps from './interfaces/PostProps'
import UserProps from './interfaces/UserProps'
import { objToArr, arrToObj } from './helper'
import axios, { AxiosRequestConfig } from 'axios'
export interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
}
const asyncAndCommit = async (url: string, mutationName: string,
  commit: Commit, config: AxiosRequestConfig = { method: 'get' }, extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false, column: '1' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, nickName: 'horizon' }
    },
    createPost (state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns (state, rawData) {
      // state.columns = rawData.data.lsit
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn (state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts (state, { data: rawData, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData.list) }
      // state.posts.loadedColumns.push(columnId)
    },
    fetchPost (state, { data: rawData }) {
      state.posts.data[rawData.data._id] = rawData.data
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns (context) {
      asyncAndCommit('/api/columns', 'fetchColumns', context.commit)
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/api/columns/${cid}`).then(response => {
        commit('fetchColumn', response.data)
      })
    },
    fetchPosts ({ commit }, cid) {
      axios.get(`/api/columns/${cid}/posts`).then(response => {
        commit('fetchPosts', response.data)
      })
    },
    fetchPost ({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    }
  },
  getters: {
    getColumnByCid: (state) => (cid: string) => {
      return state.columns.data[cid]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  }
})
export default store
