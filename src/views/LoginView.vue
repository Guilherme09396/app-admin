<template>
  <div class="container">
    <div class="columns is-mobile">

      <div class="column is-7" style="margin: 40px auto 10px">
        <div v-for="erro in erros" :key="erro.id">

          <article class="message is-danger" style="margin-bottom: 10px">
            <div class="message-header">
              <p>{{erro.name}}</p>
            </div>
          </article>

        </div>

        <div class="field">
          <label class="label">E-mail</label>
            <div class="control">
              <input v-model="email" class="input" type="text" placeholder="email@dominio.com">
            </div>
        </div>

        <div class="field">
          <label class="label">Senha</label>
          <div class="control">
            <input v-model="password" class="input" type="password" placeholder="***********">
          </div>
        </div>
      </div>
    </div>
    <button class="button is-success" @click="login">Entrar</button>
    <button style="margin-left: 10px" class="button is-danger" @click="recuperar">Esqueci minha senha</button>
  
  </div>
 
</template>

<script>
import axios from "axios"
import {port} from "../components/port"

export default {
  created() {
    console.log(axios)
  },
  data() {
    return {
      email: "",
      password: "",
      erros: []
    }
  }, 
  methods: {
    login: function() {

      if(this.password == undefined || this.password == "") {
        this.erros= [{id: 2, name: "Digite sua senha"}];
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }
      
      if(this.email == undefined || this.email == "") {
        this.erros = [{id: 1, name: "Informe o seu e-mail"}]
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }

      

      if(this.email == undefined && this.password == undefined) {
        this.erros = [{id: 1, name: "Informe o seu e-mail"}, {id: 2, name: "Informe a sua senha"}]
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }


      if(this.erros.length <= 0) {
        axios.post(`http://localhost:${port}/user/login`, {email: this.email, password: this.password}).then(res => {
          localStorage.setItem("token", res.data.token)
          console.log(res)
          this.$router.push({name: "home"})
      }).catch(err => {
        console.log(err)
          this.erros = [{id: 1, name: err.response.data.err}]
          setTimeout(() => {
          this.erros = []
        }, 2000)
      })
      }
       
    },
    recuperar: function() {
      this.$router.push({name: "recovery"})
    }

    
  }, 
  computed: {
  }
}
</script>

<style>

</style>