 <template>
    <div id="container">
      <div class="menu-container" id="transfer">
        <h1 id = "app">Depositar Dinero</h1>

        <label>¿Cuanto dinero quiere depositar?</label>
        <label for="amount">Amount</label><input type="number" v-model="amount" placeholder="Amount">

        <div id="boton2">
          <button type="button" v-on:click="deposit()" class="btn btn-success">Depositar Dinero</button>
          <button type="button" v-on:click="goBack" class="btn btn-success">Volver al Menu</button>
        </div>
      </div>
    </div>
  </template>
<script>

export default {
  name: 'Deposit',
  data () {
    return {
      amount: 0
    }
  },
  methods:{
    deposit(){
      this.axios.put('http://localhost:3060/user/deposit/' + this.$route.params.id, {amount: this.amount})
           .then(res =>  {this.$route.params.amount= res.data.amount;
             this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err =>this.showerrorAlerte(err));
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
    },
    showerrorAlerte(err){
      this.$swal(err.response.data.message, "Ingrese un valor valido", "error")
    }

}
}
</script>

<style>
  #boton2{
    height: 150px;
    margin: 15px 15px 15px 40px;
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
  label{
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight : bold;
    margin-left: 100px;
    width: 250px;
  }
  .btn{
    margin-top: 15px;
    margin-bottom: 5px;
    width: 200px;
    margin-left: 60px;
  }
</style>
