<template>
  <div id="login">
    <h1>Login</h1>
    <label>
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
    </label>
    <label>
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
    </label>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // eslint-disable-next-line eqeqeq
      if (this.input.username !== '' && this.input.password !== '') {
        // eslint-disable-next-line eqeqeq
        if (this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
          this.$emit('authenticated', true)
          this.$router.replace({ name: 'HomeBanking' })
        } else {
          console.log('The username and / or password is incorrect')
        }
      } else {
        console.log('A username and password must be present')
      }
    }
  }
}
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #2cc197;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
