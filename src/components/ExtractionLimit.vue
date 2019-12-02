<template>

  <div id="container">
    <div class="menu-container" id="transfer">
      <h1 id = "app">Limite de Extraccion</h1>

      <label>¿Cual va a ser su limite de extraccion?</label>
      <ul>
        <label for="amount">Limite</label><input v-model='limit' placeholder="Amount">
      </ul>
      <div id="boton">
        <button type="button" v-on:click="changeLimit()" class="btn btn-success">Cambiar limite de extraccion</button>
        <button type="button" v-on:click="goBack" class="btn btn-success">Volver al Menu</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExtractionLimit',
  data () {
    return {
      limit: 0
    }
  },
  methods:{
    changeLimit(){
      this.axios.put('http://localhost:3060/user/limit/' + this.$route.params.id, {limit: this.limit})
           .then(res =>  {this.$route.params.limit= res.data.limit;
             this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => this.showAlertError(err));
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
    },
    showAlertError(err){
      this.$swal(err.response.data.message, "", "error")
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
    margin-left: 75px;
  }
  #container{
    margin-top: 200px;
    margin-left: 300px;
    border-style : groove;
    width: 500px;
    background-color: #fbffea;
  }
  label{
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight : bold;
    margin-left: 85px;
    width: 350px;
  }
  .btn{
    margin-top: 15px;
    margin-bottom: 5px;
    width: 200px;
    margin-left: 60px;
  }
</style>
