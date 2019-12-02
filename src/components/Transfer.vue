<template>
  <div id="container">
    <div class="menu-container" id="transfer">
      <h1 id = "app">Trasferir Dinero</h1>

      <label>¿Cuanto dinero quiere trasferir?</label>
      <p>C.B.U.</p><input type="Number" v-model="cbu" placeholder="CBU">
      <label for="amount">Dinero</label><input type="number" v-model="amount" placeholder="Amount">

      <div id="boton2">
        <button type="button" v-on:click="transfer()" class="btn btn-success">Extraer Dinero</button>
        <button type="button" v-on:click="goBack" class="btn btn-success">Volver al Menu</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  data () {
    return {
      cbu: 0,
      amount: 0
      }
  },
  methods:{
    transfer() {
      this.axios.put('http://localhost:3060/user/transfer/' + this.$route.params.id, {amount: this.amount, cbu: this.cbu})
           .then(res => {this.$route.params.amount= res.data.amount;
             this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => this.showErrorAlert(err));
    },
    goBack () {
    this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
    },
    showErrorAlert(err){
      this.$swal((err.response.data.message),"","error")
    }
  }
}
</script>

<style scoped>

  #boton2{
    height: 150px;
    margin: 15px 15px 15px 20px;
  }

  h1{
    width: 300px;
    margin-left: 100px;
  }
  input{
    margin-left: 90px;
  }
  #container{
    margin-top: 200px;
    margin-left: 250px;
    border-style : groove;
    width: 500px;
    background-color: #fbffea;
  }
  p{
    margin-left: 100px;
    font-weight: bold;
  }
  label{
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight : bold;
    margin-left: 80px;
    width: 250px;
  }
  .btn{
    margin-top: 15px;
    margin-bottom: 5px;
    width: 200px;
    margin-left: 60px;
  }
</style>
