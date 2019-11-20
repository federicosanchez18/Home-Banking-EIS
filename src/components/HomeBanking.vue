<template>
  <div class="HomeBanking">
    <div class="header">
      <img class="logo" src="../../img/logo.png">
      <div class="align-left">
        <span id="nombre">Bienvenido/a</span>
        <img class="avatar" src="../../img/avatar.svg"/>
      </div>
    </div>
    <div class="white-container">
      <div class="menu-container">
        <h1 class="tu-cuenta">Tu cuenta</h1>
        <button class="links" v-on:click="cashOut()" >Extraer dinero</button>
        <button class="links" v-on:click="deposit()">Depositar dinero</button>
        <button class="links" >Pagar servicios</button>
        <button class="links" v-on:click="transfer()">Transferir dinero</button>
        <button class="links" v-on:click="limit()">Cambiar límite de extracción</button>
      </div>
      <div class="green-container">
        <div class="cuenta-info">
          <p>Saldo en tu cuenta</p>
          <h3 id="saldo-cuenta">$ {{(this.$route.params).amount}}</h3>
          <p id="limite-extraccion">Tu límite de extracción es: {{(this.$route.params).limit}} </p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
    name: 'HomeBanking',
    data() {
        return {
            input: {
                dineroDisponible: 10000,
                limiteExtraccion: 10,
            }
        }
    },
    methods: {
      transfer () {
        this.$router.push({ name: 'Transfer', params: {...this.$route.params} })
      },
      cashOut () {
        this.$router.push({ name: 'CashOut', params: {...this.$route.params} })
      },
      limit () {
        this.$router.push({ name: 'Limit', params: {...this.$route.params} })
      },
      deposit() {
        this.$router.push({ name: 'Deposit', params: {...this.$route.params}})
      }
    }
  }



</script>
<style >
  body {
    margin: 0;

    font-family: "Source Sans Pro", sans-serif;

    background-color: #2a333d;
  }

  .avatar {
    display: inline-block;
    vertical-align: text-bottom;
  }

  .logo {
    display: inline-block;
    width: 200px;
    height: 50px;
    text-align: left;
    vertical-align: text-bottom;
  }

  .align-left {
    display: flex;
    padding: 8px;

    align-items: center;
  }

  .tu-cuenta {
    padding-left: 24px;
    margin: 0;
    margin-left: -30px;

    font-family: "Source Sans Pro";
    font-size: 32px;
    font-weight: normal;

    color: #2a333d;
    border-left: 6px solid #2cc197;
  }

  .header {
    display: flex;
    width: 65%;
    margin: 7% auto 0;
    margin-bottom: 15px;

    justify-content: space-between;
  }

  .cuenta-info {
    display: block;
    width: 100%;
  }

  #nombre {
    display: inline-block;
    margin-right: 10px;
    overflow: hidden;

    font-size: 14px;

    text-overflow: ellipsis;

    color: #fff;
  }

  .links {
    position: relative;

    display: block;
    padding: 0;
    margin: 20px 0;
    margin-bottom: 30px;

    font-family: "Source Sans Pro";
    font-size: 16px;

    cursor: pointer;
    -webkit-transition: all .6s ease-in-out;
    -moz-transition: all .6s ease-in-out;
    -o-transition: all .6s ease-in-out;
    transition: all .6s ease-in-out;
    text-align: left;
    vertical-align: text-bottom;

    color: #666;
    border: 0;
    background-color: transparent;
  }

  .links:hover {
    margin-left: 10px;

    color: #2cc197;
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

  .green-container {
    display: flex;
    width: 65%;
    box-sizing: border-box;

    text-align: center;

    color: white;
    border-radius: 8px;
    background-color: #2cc197;

    align-items: center;
  }

  .menu-container {
    display: block;
    width: 35%;
    padding-right: 20px;
  }

  .cuenta-container {
    width: 35%;
  }

  #saldo-cuenta {
    margin-top: 5%;
    margin-bottom: 5%;
    overflow: hidden;

    font-size: 6.5vw;

    text-align: center;
    text-overflow: ellipsis;
  }

  #limite-extraccion {
    overflow: hidden;

    font-size: 15px;

    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 800px) {
    .white-container {
      flex-direction: column-reverse;
    }

    .green-container {
      width: 100%;
      margin-bottom: 20px;
    }

    #saldo-cuenta {
      font-size: 8.5vw;
    }

    .menu-container {
      width: 100%;
    }

    .header {
      margin-bottom: 10px;
      flex-direction: column;

      align-items: center;
    }

    .logo {
      margin-bottom: 10px;
    }
  }
</style>
