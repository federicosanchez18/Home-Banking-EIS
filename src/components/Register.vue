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
      <b-form-input :type="passwordFieldType" v-model="user.password" placeholder="Ingrese su password"></b-form-input>
      <div id="showPassword">
      <button @click="switchVisibility" class="btn btn-secondary m-t-1">
          Mostrar Clave
      </button>
      </div>
    </div>
    <div id= 'botoncito'>

      <b-button type="submit" variant="primary" v-on:click="register()">Registrarse</b-button>
      <b-button type="submit" variant="primary" v-on:click="goBack()">Volver al inicio</b-button>
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
      passwordFieldType: 'password'
    }
  },
  methods: {
      register() {
          this.axios.post('http://localhost:3060/user/register', this.user)
           .then(res =>  this.goBack())
           .catch(err => this.showAlertError())
      },
      goBack () {
      this.$router.replace({ name: 'Login' })
      },
      switchVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      },
    showAlertError () {
      {
        this.$swal("Todos los campos son necesarios para el registro", "", "error")
      }
    }
  }
}
</script>
<style scoped>
  #showPassword{
    margin-top: 20px;
  }
</style>
