<template>
    <div id="changePassword">
        <h1>Cambie su clave</h1>
        <div id="labels">
            <label>Ingrese su Usuario</label>
          <b-form-input v-model="input.username" placeholder="Ingrese su usuario"/>
            <label>Ingrese su Clave</label>
          <b-form-input :type="passwordFieldType" v-model="oldPassword" placeholder="Ingrese su password"/>
          <label>Ingrese su nueva Clave</label>
          <b-form-input :type="passwordFieldType" v-model="input.password" placeholder="Ingrese su nueva password"/>
        </div>
        <div  id="showPassword">
            <button @click="switchVisibility" class="btn btn-secondary m-t-1">
              Mostrar Clave
            </button>
        </div>
      <b-button type="submit"  variant="primary" v-on:click="changePassword()">Cambiar Clave</b-button>
      <b-button type="submit"  variant="primary" v-on:click="goBack()">Volver al Menu</b-button>

    </div>
</template>

<script>
export default {
  name: 'changePassword',
  data () {
    return {
      input: {
        username: '',
        password: ''
        },
      oldPassword: '',  
      passwordFieldType: 'password'
      }
    },
    methods: {
      changePassword() {
        if(this.input.username !="" && this.input.password !="" && this.oldPassword !="" ) {
            this.axios.put('http://localhost:3060/user/updateuser/' + this.$route.params.id, this.input)
              .then(res =>  this.$router.push({ name: 'HomeBanking', params: { ...res.data.userupdated}}))
              .catch(err => alert(err.response.data.message))
        }
        else{
              this.showErrorValidation()
        }
      },
      goBack (){
        this.$router.replace({ name: 'HomeBanking', params: {...this.$route.params} })
      },
      switchVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        this.passwordFieldType = this.passwordFieldType === 'newPassword' ? 'text' : 'newPassword';
      },
      showAlertError () {
        {
          this.$swal("No se pudo modificar su clave", "Verifique sus datos y vuelva a intentar", "error")
        }
      },
      showErrorValidation(){
        {
          this.$swal("Complete todo los campos","", "error")
        }

      }
    }
}
</script>
<style scoped>
    #changePassword{
      width: 500px;
      margin: auto;
      margin-top: 200px;
      padding: 20px;
    }
    #showPassword{
      margin-bottom: 15px;
    }
</style>
