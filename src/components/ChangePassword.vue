<template>
    <div id="changePassword">
        <h1>¿Forget your password?</h1>
        <input type="text" name="userName" v-model="input.username" placeholder="UserName"/>
        <input type="text" name="password" v-model="input.password" placeholder="Password"/>
        <input type="text" name="newPassword" v-model="input.newPassword" placeholder="NewPassword"/>
        <button type="button" v-on:click="changePassword()">Change Password</button>
    </div>
</template>

<script>
export default {
  name: 'changePassword',
  data () {
    return {
      input: {
        username: '',
        password: '',
        newPassword: ''
        }
      }
    },
    methods: {
        changePassword() {
            if(this.input.username !="" && this.input.password !="" && this.input.newPassword !=""){
                if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password){
                    this.$parent.password =  this.input.newPassword,
                    this.alert("Password change successfully"),
                    this.$router.replace({name: "Login"})
                }else{
                    console.log('The username and / or password is incorrect')
                }
            }else{
                console.log("Complete the fields")
            }
        }
    }
}
</script>

<style scoped>
    #changePassword{
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #2cc197;
    margin: auto;
    margin-top: 200px;
    padding: 20px;        
    }
</style>