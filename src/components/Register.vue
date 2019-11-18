<template>
  <div id="Register">
    <h1>Crear una nueva cuenta </h1>

    <div id="labels">
      <label>Ingrese su DNI</label>
      <b-form-input v-model="user.dni" placeholder="Ingrese su DNI"></b-form-input>
      <label>Ingrese su Nombre de Usuario</label>
      <b-form-input v-model="user.username" placeholder="Ingrese su  Nombre de Usuario"></b-form-input>
      <label>Ingrese su Email</label>
      <b-form-input v-model="user.email" placeholder="Ingrese su Email"></b-form-input>
      <label>Ingrese su Password</label>
      <b-form-input v-model="user.password" placeholder="Ingrese su password"></b-form-input>
    </div>
    <div id= 'botoncito'>

      <b-button type="submit" variant="primary" v-on:click="register()">Registrarse</b-button>
      <b-button type="submit" variant="primary">Cambiar Clave</b-button>
      <b-button type="submit" variant="secondary" v-on:click="goBack()">Atras</b-button>
    </div>
  </div>
</template>

<script>


class User {
    constructor(dni, email, username, password) {
        this.dni = dni;
        this.email = email;
        this.username = username;
        this.password = password;
    }


}

export default {
  name: 'Register',
  data () {
    return {
      user : new User(),
    }
  },
  methods: {
      register() {
          this.axios.post('http://localhost:3060/user/register', JSON.stringify(this.user))
           .then(res =>  console.log(res))
           .catch(err => console.log(err.message));
      },
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
