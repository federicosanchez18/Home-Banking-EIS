.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h2 id = "app">Limite de Extraccion</h2>
        <ul>
          <li><label for="amount">Amount</label><input class="links" value="amount" v-model="amount" type="text" placeholder="Amount"></li>
        </ul>
        <button type="button" v-on:click="changeLimit()" >Confirm</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExtractionLimit',
  data () {
    return {
      input: {
        amount: ''
      }
    }
  },
  methods:{
    changeLimit(){
      this.axios.put('http://localhost:3060/user/limit/:' + this.$route.params.id, this.input.amount)
           .then(res =>  this.$router.push({ name: 'HomeBanking', params: { ...res.userUp}}))
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