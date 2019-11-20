.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Depositar</h1>
        <ul>
          <li><label for="amount">Amount</label><input class="links" value="amount" v-model="input.amount" type="text" placeholder="Amount"></li>
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
      input: {
        amount: ''
      }
    }
  },
  methods:{
    deposit(){
      this.axios.put('http://localhost:3060/user/deposit/' + this.$route.params.id, this.input)
           .then(res =>  {this.$route.params.amount= this.$route.params.amount + this.input.amount;
             this.$router.push({ name: 'HomeBanking', params: { ...this.$route.params}});})
           .catch(err => console.log(err.message));
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
  }
}
}
</script>

<style>

</style>