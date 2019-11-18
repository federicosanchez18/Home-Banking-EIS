<template>
  <div id="login">
    <h1>Bienvenidos </h1>
    <h2>Ingresá tus datos para operar</h2>
    <div id="labels">
      <label>Ingrese su Usuario</label>
      <b-form-input v-model="input.username" placeholder="Ingrese su usuario"></b-form-input>
      <label>Ingrese su Password</label>
      <b-form-input v-model="input.password" placeholder="Ingrese su password"></b-form-input>
    </div>
      <div id= 'botoncito'>
      <b-button type="submit"  variant="primary" v-on:click="login()">Login</b-button>
      <b-button type="submit" variant="primary" v-on:click="userRegister()">Registrarse</b-button>
      <b-button type="submit" variant="primary">Cambiar Clave</b-button>
      </div>
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
      this.axios.post('http://localhost:3060/user/login', this.input)
           .then(res =>  this.$router.push({ name: 'HomeBanking', params: { ...res.data.loggedUser}}))
           .catch(err => console.log(err.message));
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

<style>

  body{

      margin-right: 400px;
      margin-left: 300px;
      margin-top: 150px;


  }
  #labels{

    margin-right: 50px;
    margin-bottom: 50px;
  }

#botoncito{
  margin-top : 20 px;
  margin-right: 20px;
}
</style>
