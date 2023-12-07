<template>
  <div class="login-form">
    <div class="form-header">User Name</div>
    <div>
      <input type="text" class="form-control" v-model="username">
    </div>
    <div class="form-header">Password</div>
    <div>
      <input type="password" class="form-control" v-model="password">
    </div>

    <div class="btn-row">
      <button class="btn" @click="login">
        OK
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { STORAGE_KEY } from './helper'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
          const FormData = require('form-data');
          let data = new FormData();

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:3333/api/auth/login?password=${this.password}&user_code=${this.username}`,
            data : data
          };

          axios.request(config)
          .then((response) => {
            window.localStorage.setItem(STORAGE_KEY, response.data)
            this.$emit('close', true)
          })
          .catch((error) => {
            this.$emit('close', false)
          });

    }
  }
}
</script>

<style lang="stylus">
.login-form
  padding: 1rem
  display flex
  flex-direction column
  box-sizing border-box
  .btn-row
    margin-top 1rem
  .btn
    padding 0.6rem 2rem
    outline none
    background-color #60C084
    color white
    border 0
  .form-header
    color #666
    margin-bottom 0.5rem
  .form-control
    padding 0.6rem
    border 2px solid #ddd
    width 100%
    margin-bottom 0.5rem
    box-sizing border-box
    outline none
    transition border 0.2s ease
    &:focus
      border 2px solid #aaa
</style>