<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Transfer</h1>
        <ul>
          <li><p>C.B.U.</p><input type="Number" v-model="cbu" placeholder="CBU"></li>
          <li><label for="amount">Amount</label><input v-model="amount" type="Number" placeholder="Amount"></li>
        </ul>
        <button type="button" v-on:click="transfer()" >Confirm</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
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
           .catch(err => alert(err.response.data.message));
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
</style>
