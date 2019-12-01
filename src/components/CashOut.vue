<template>
  <div id="container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Extraer Dinero</h1>

         <label>¿Cuanto dinero quiere extraer?</label>
        <input v-model="amount" placeholder="Amount">

      <div id="boton">
        <button type="button" v-on:click="cashOut()" class="btn btn-success">Extraer Dinero</button>
        <button type="button" v-on:click="goBack" class="btn btn-success">Volver al Menu</button>
      </div>
    </div>
  </div>
  </template>

<script>

export default {
  name: 'CashOut',
  data () {
    return {
      amount: 0
    }
  },
  methods:{
    cashOut(){
      this.axios.put('http://localhost:3060/user/extraction/' + this.$route.params.id, {amount: this.amount})
           .then(res =>  {this.$route.params.amount= res.data.amount;
             this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => this.showErrorAlert(err));
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
    },

    showErrorAlert(err){
          this.$swal("El monto que desea extraer es superior a sus fondos", "Ingrese un valor valido", "error")
    }
}
}
</script>

<style>
  #boton{
    margin: 15px;
    height: 150px;
    margin-left: 40px;
  }

  h1{
    width: 300px;
    margin-left: 100px;
  }
  input{
    margin-left: 100px;
  }
  #container{
    margin-top: 200px;
    margin-left: 250px;
    border-style : groove;
    width: 500px;
    background-color: #fbffea;
  }
  label{
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight : bold;
    margin-left: 90px;
    width: 250px;
  }
  .btn{
    margin-top: 15px;
    margin-bottom: 5px;
    width: 200px;
    margin-left: 60px;
  }
</style>
