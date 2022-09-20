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
          <label class="label">Nome</label>
            <div class="control">
              <input v-model="name" class="input" type="text" placeholder="email@dominio.com">
            </div>
        </div>

        <div class="field">
          <label class="label">E-mail</label>
            <div class="control">
              <input v-model="email" class="input" type="email" placeholder="email@dominio.com">
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
    <button class="button is-success" @click="cadastrar">Cadastrar usuário</button>
  
  </div>
</template>

<script>
import {auth} from "../Auth"
import {port} from "../components/port"
import axios from "axios"
export default {
  data() {
    return {
      name: "", 
      email: "", 
      password: "",
      erros: []
    }
  },
  methods: {
    cadastrar: function() {
      if(this.password == undefined || this.password == "") {
        this.erros= [{id: 2, name: "Digite a senha do usuário"}];
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }
      
      if(this.email == undefined || this.email == "") {
        this.erros = [{id: 1, name: "Informe o e-mail do usuário"}]
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }

      if(this.name == undefined || this.name == "") {
        this.erros = [{id: 1, name: "Informe o nome do usuário"}]
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }

      if(this.email == undefined && this.password == undefined && this.name == undefined) {
        this.erros = [{id: 1, name: "Informe o e-mail do usuário"}, {id: 2, name: "Informe a senha do usuário"}, {id: 3, name: "Informe o nome do usuário"}]
        setTimeout(() => {
          this.erros = []
        }, 2000)
      }


        if(this.erros.length <= 0) {
          axios.post(`http://localhost:${port}/user`, {name: this.name, email: this.email, password: this.password}, auth()).then(res => {
            console.log(res)
            this.$router.push({name: "user"})
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }

}
</script>

<style>

</style>