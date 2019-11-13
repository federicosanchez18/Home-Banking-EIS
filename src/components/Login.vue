<template>
  <div id="login">
    <h1>Bienvenidos a Home Banking EIS</h1>
    <h2>Ingresá tus datos para operar</h2>
    <label>
      <input type="text" name="username" v-model="input.username" placeholder="Username" />
    </label>
    <label>
      <input type="password" name="password" v-model="input.password" placeholder="Password" />
    </label>
    <button type="button" v-on:click="login()">Login</button>
    <button type="button" v-on:click="userRegister()">Register</button>
    <button type="button" v-on:click="changePassword()">Cambiar Clave</button>
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
    },
    userRegister () {
      this.$router.replace({ name: 'Register' })
    },
    changePassword() {
     this.$router.replace({name : 'changePassword'})
    }
  }
}
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #111111;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    color : #ffffff;
  }

  button{

    border: 2px;
    margin: auto;
    height: 25px;
    margin-left: 10px;
    margin-bottom: 15px;}

</style>
