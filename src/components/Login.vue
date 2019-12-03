<template>
  <div id="login">
    <h1>Bienvenidos </h1>
    <h2>Ingresá tus datos para operar</h2>
    <div id="labels">
      <label>Ingrese su Usuario</label>
      <b-form-input v-model="input.username" placeholder="Ingrese su usuario"></b-form-input>
      <label>Ingrese su Password</label>
      <b-form-input :type="passwordFieldType" v-model="input.password" placeholder="Ingrese su password"></b-form-input>
      <div  id="showPassword">
      <button @click="switchVisibility" class="btn btn-secondary m-t-1">
        Mostrar Clave
      </button>
      </div>
    </div>
      <div id= 'botoncito'>
      <b-button type="submit"  variant="primary" v-on:click="login()">Login</b-button>
      <b-button type="submit" variant="primary" v-on:click="userRegister()">Registrarse</b-button>
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
      },
      passwordFieldType: 'password'
    }
  },
  methods: {
    login () {
      this.axios.post('http://localhost:3060/user/login', this.input)
           .then(res =>  this.$router.push({ name: 'HomeBanking', params: { ...res.data.loggedUser}}))
           .catch(err => this.showAlertError(err));
    },
    userRegister () {
      this.$router.push({ name: 'Register' })
    },
    switchVisibility(){
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    showAlertError (err) {
      {
        this.$swal(err.response.data.message, "Verifique sus datos y vuelva a intentar", "error")
      }
      }
  }
}
</script>
<style>
  body{
    background-color: 	#F0FFF0	;
    margin-right: 400px;
    margin-left: 300px;
    margin-top: 150px;
  }
  #labels{
    margin-right: 50px;
    margin-bottom: 50px;
  }
  #botoncito{
   margin-top : 20px;
   margin-right: 20px;
  }
  #showPassword{
   margin-top: 20px;
  }
</style>


