.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h1 id = "app">Extraer</h1>
        <ul>
          <li><label for="amount">Amount</label><input class="links" value="amount" v-model="amount" type="text" placeholder="Amount"></li>
        </ul>
        <button type="button" v-on:click="cashOut()" >Confirm</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CashOut',
  methods:{
    cashOut(){
      
    },
    goBack () {
      this.$router.push({ name: 'HomeBanking', params: {...this.$route.params} })
  }
}
}
</script>

<style>

</style>