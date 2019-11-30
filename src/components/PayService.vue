<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Pagar Servicio</h1>
          <button class= "btn btn-primary btn-block" type="button" v-on:click="showService()">Ver Servicios</button>
          <tr class="description"> Nombre Descripcion Monto Código de pago</tr>
          <li v-for="s in service" v-bind:key="s" >{{ s.name }} {{ s.description }} {{ s.amount }} {{ s.paymentCode }}</li>
        
        <li><label for="paymentCode">PaymentCode</label><input v-model="paymentCode" placeholder="Codigo de pago"></li>
        
        <button type="button" v-on:click="payServices()">Pagar Servicio</button>
        <button type="button" v-on:click="createService()">Cargar Nuevo Servicio</button>
        <button type="button" v-on:click="goBack()">Volver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayService',
  data () {
    return {
      paymentCode: 0,
      amount: 0,
      service : []
      }
  },
  methods:{
    createService() {
        this.$router.push({ name: 'CreateServices', params: {...this.$route.params} })
    },
    payServices() {
      this.axios.put('http://localhost:3060/user/payservices/' + this.$route.params.id, {paymentCode: this.paymentCode})
           .then(res => {
                        console.log(res.data.userPaidServices)
                        this.$route.params.amount = res.data.userPaidServices.amount;                    
                        this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => alert(err.response.data.message));
    },
    getService(objectId){
      this.axios.get('http://localhost:3060/services/' + objectId)
           .then(res => {  this.service.push(res.data.services)     })           
           .catch(err => alert(err.response.data.message));
    },
    showService(){
        this.$route.params.services.forEach(service => {
        console.log(service);
        this.getService(service)
      
        });
    },
    goBack () {
    this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
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

    .description {
    position: relative;

    width: 160%;
    display: block;
    padding: 0;
    margin: 20px 0;

    font-family: "Source Sans Pro";
    font-size: 18px;

    color: #666;
    border: 0;
    background-color: transparent;
  }
</style>
