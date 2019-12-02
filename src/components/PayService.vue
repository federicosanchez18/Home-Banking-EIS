<template>

    <div id="container">
      <div class="white-container">
        <div class="menu-container" id="transfer">
          <h1 id = "app">Pagar Servicio</h1>
            <button :disabled="disable" @click="isDisable" class="btn btn-success" type="button" v-on:click="showService()"> Ver Servicios </button>
            <b-table responsive striped hover :service="service" :fields="fields"></b-table>
          
            <div class="row" v-for="s in service" v-bind:key="s.name"> <div class="col-md-2">{{ s.name }}</div> <div class="col-md-2">{{ s.description }}</div> <div class="col-md-2">${{ s.amount }}</div> <div class="col-md-2">{{ s.paymentCode }}</div>
            <div class="col-md-2"><input v-show="s.payServices" disabled  checked type="checkbox" class="form-check-input"></div>
            
            </div>
        
        <label for="paymentCode"></label><input v-model="paymentCode" placeholder="Codigo de pago">
        
        <div id="boton2">
        <button type="button" v-on:click="payServices()" class="btn btn-success">Pagar Servicio</button>
        <button type="button" v-on:click="createService()" class="btn btn-success">Cargar Nuevo Servicio</button>
        <button type="button" v-on:click="goBack()" class="btn btn-success">Volver al Menu</button>
        </div>
      </div>
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
      service: [],
      disable: false,
      fields: ['Nombre', 'Descripción', 'Monto', 'Código de Pago', 'Está Pago']
      }
  },
  methods:{
    createService() {
        this.$router.push({ name: 'CreateServices', params: {...this.$route.params} })
    },
    payServices() {
      this.axios.put('http://localhost:3060/user/payservices/' + this.$route.params.id, {paymentCode: this.paymentCode})
           .then(res => {
                        this.$route.params.amount = res.data.userPaidServices.amount;                    
                        this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => alert(err.response.data.message));
    },
    getService(paymentCode){
      this.axios.get('http://localhost:3060/services/paymentcode/' + paymentCode)
           .then(res => {  
             this.service.push(res.data.services)     })           
           .catch(err => alert(err.response.data.message));
    },
    showService(){
        this.$route.params.services.forEach(service => {
          if(service.paymentCode){
            this.getService(service.paymentCode);
          } else {
            this.getServiceOI(service);
          }
        });
    },
    getServiceOI(objectId){
      this.axios.get('http://localhost:3060/services/' + objectId)
           .then(res => {  
             this.service.push(res.data.services)     })           
           .catch(err => alert(err.response.data.message));
    },
    isDisable(){
      this.disable = !(this.disable === true);
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
    width: 75%;
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
    width: 350%;
    padding-right: 10px;
  }
  .header {
    display: flex;
    width: 65%;
    margin: 7% auto 0;
    margin-bottom: 15px;

    justify-content: space-between;
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
  #container{
      margin-top: 250px;
      margin-left: 250px;
      border-style : groove;
      width: 750px;
      background-color: #fbffea;
  }

  #boton2{
    margin: 15px;
    height: 150px;
    margin-left: 40px;
  }

  .btn{
    margin-top: 15px;
    margin-bottom: 5px;
    width: 200px;
    margin-left: 60px;
  }

  .form-check-input{
    margin-left: 70px;
  }
</style>
