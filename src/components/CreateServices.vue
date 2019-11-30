<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Cargar Servicio</h1>
        <ul>
            <label>Nombre del servicio a pagar</label>
            <b-form-input v-model="name" placeholder="Ingrese el nombre del servicio"></b-form-input>
            <label>Descripcion del servicio</label>
            <b-form-input v-model="description" placeholder="Ingrese descripcion del servicio"></b-form-input>
            
            <label>Monto a abonar</label>
            <b-form-input v-model="amount" placeholder="Ingrese monto a abonar"></b-form-input>
        </ul>
        <button type="button" v-on:click="createServices()">Confirmar</button>
        <button type="button" v-on:click="goBack()">Volver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateServices',
  data () {
    return {
      paymentCode: 0,
      name: '', 
      amount: 0,
      description: '',
      payServices: false
    }
  },
  methods:{
    createServices() {
      this.axios.post('http://localhost:3060/services/create/' + this.$route.params.id, {paymentCode: this.paymentCode, name: this.name, amount: this.amount, description: this.description, payServices: this.payServices})
           .then(res => {
                        this.$route.params.paymentCode= res.data.paymentCode;
                        this.$route.params.name= res.data.name;
                        this.$route.params.amount= res.data.amount;
                        this.$route.params.description= res.data.description;
                        this.$route.params.payServices= res.data.payServices;
                        this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => alert(err.response.data.message));
    },
    goBack () {
    this.$router.push({ name: 'PayService', params: {...this.$route.params} })
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

  .white-container {
    display: flex;
    width: 65%;
    padding: 30px;
    margin: 0 auto;
    box-sizing: border-box;

    border: 1px solid #979797;
    border-radius: 8px;
    background-color: #fff;

    justify-content: center;
  }

  .menu-container {
    display: block;
    width: 35%;
    padding-right: 10px;
  }

  .links {
    position: relative;

    display: block;
    padding: 0;
    margin: 20px 0;
    margin-bottom: 30px;

    font-family: "Source Sans Pro";
    font-size: 16px;

    color: #666;
    border: 0;
    background-color: transparent;
  }
</style>
