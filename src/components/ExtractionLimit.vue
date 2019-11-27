.<template>
  <div class="white-container">
    <div class="menu-container" id="transfer">
        <h2 id = "app">Limite de Extraccion</h2>
        <ul>
          <li><label for="amount">Limite</label><input v-model='limit' placeholder="Amount"></li>
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
      limit: 0
    }
  },
  methods:{
    changeLimit(){
      this.axios.put('http://localhost:3060/user/limit/' + this.$route.params.id, {limit: this.limit})
           .then(res =>  {this.$route.params.limit= res.data.limit;
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