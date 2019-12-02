<template>
  <div class="container" id="container">


    <h1 id = "app">Numero de CBU</h1>
    <h3 id="cbu-cuenta"> Numero:  {{this.$route.params.cbu}}</h3>
    <div id="boton">
      <button type="button" v-on:click="goBack" class="btn btn-success">Volver al Menu</button>
    </div>
  </div>
 </template>

<script>
export default {
  name: 'Transfer',
  methods:{
    goBack () {
    this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
    }
  }
}
</script>

<style scoped>

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
    margin-left: 350px;
    border-style : groove;
    width: 500px;
    background-color: #fbffea;
  }
  #cbu-cuenta{
      margin-left: 115px;
      margin-top: 50px;
    font-weight: bold;

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
    margin-left: 70px;
    margin-left: 70px;
  }
</style>
