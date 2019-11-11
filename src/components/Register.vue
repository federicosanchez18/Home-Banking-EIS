<template>
    <div id="register">
        <h1 id = "app">Register</h1>
        <ul>
          <li><input v-model="dni" placeholder="DNI"></li>
          <li><input v-model="name" type="text" placeholder="Name"></li>
          <li><input v-model="email" placeholder="Email"></li>
          <li><input v-model="password" placeholder="Password"></li>
          <li><input v-model="confirmpw" placeholder="Confirm Password"></li>
        </ul>
        <button type="button">Create Account</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
    </div>
</template>

<script>
// import RegisterService from '../ApiService'

export default {
  name: 'Register',
  data () {
    return {
      input: {
        dni: '',
        name: '',
        email: '',
        password: '',
        confirmpw: ''
      }
    }
  },
  methods: {
    /* async userRegistration  () {
      // eslint-disable-next-line eqeqeq
      if (this.input.password == this.input.confirmpw) {
        await RegisterService.createUser({
          userDni: this.input.dni,
          userName: this.input.name,
          userPassword: this.input.password,
          userEmail: this.input.email
        })
      }
    }, */
    goBack () {
      this.$router.replace({ name: 'Login' })
    }
  }

}
</script>

<style scoped>
  #register {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #2cc197;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
