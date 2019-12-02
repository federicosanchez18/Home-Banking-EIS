.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Depositar</h1>
        <ul>
          <li>
            <label for="amount">Amount</label><input type="number" v-model="amount" placeholder="Amount">
          </li>
        </ul>
        <button type="button" v-on:click="deposit()" >Confirm</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
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
           .catch(err => alert(err.response.data.message));
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
  }
}
}
</script>

<style>

</style>
