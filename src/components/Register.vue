<template>
    <div id="register">
        <h1 id = "app">Register</h1>
        <ul>
          <li><input v-model="dni" placeholder="DNI"></li>
          <li><input v-model="username" type="text" placeholder="Name"></li>
          <li><input v-model="email" placeholder="Email"></li>
          <li><input v-model="password" placeholder="Password"></li>
        </ul>
        <button type="button" v-on:click="register()" >Create Account</button>
        <button type="button" v-on:click="goBack()">Go Back</button>
    </div>
</template>

<script>


class User {
    constructor(dni, email, username, password) {
        this.dni = dni;
        this.email = email;
        this.username = username;
        this.password = password;
    }


}

export default {
  name: 'Register',
  data () {
    return {
      user : new User(),
    }
  },
  methods: {
      register() {
          fetch('/api/user/register', {
              method: 'POST',
              body: JSON.stringify(this.user),
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              }
          })
              .then(res => res.json())
              .then(data => {
                  this.getUsers();
              })
              .catch(err => console.log(err));
          this.user = new User();
      },

      goBack () {
      this.$router.replace({ name: 'Login' })
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
</style>
