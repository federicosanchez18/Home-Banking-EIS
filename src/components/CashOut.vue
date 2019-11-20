.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Extraer</h1>
        <ul>
          <li><label for="amount">Amount</label><input class="links" value="amount" v-model="input.amount" type="text" placeholder="Amount"></li>
        </ul>
        <button type="button" v-on:click="cashOut()" >Confirm</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CashOut',
  data () {
    return {
      input: {
        amount: ''
      }
    }
  },
  methods:{
    cashOut(){
      this.axios.put('http://localhost:3060/user/extraction/' + this.$route.params.id, this.input.amount)
           .then(res =>  {this.$route.params.amount= this.$route.params.amount - this.input.amount;
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