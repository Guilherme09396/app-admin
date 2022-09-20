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
        <article  v-if="msg != false" class="message is-success" style="margin-bottom: 10px">
            <div class="message-header">
              <p>{{msg}}</p>
            </div>
          </article>

        <div class="field">
          <label class="label">Nome</label>
            <div class="control">
              <input v-model="name" class="input" type="text" placeholder="">
            </div>
        </div>

        <div class="field">
          <label class="label">E-mail</label>
          <div class="control">
            <input v-model="email" class="input" type="email" placeholder="">
          </div>
        </div>

        <div class="field">
          <label class="label">Cargo</label>
          <div class="control">
            <input v-model="role" class="input" type="text" placeholder="">
          </div>
        </div>
      </div>
    </div>
    <button class="button is-success" @click="editar">Editar</button>
    <button class="button is-danger" style="margin-left: 10px" @click="voltar">Voltar</button>
  
  </div>
</template>

<script>
import {auth} from "../Auth"
import axios from "axios"
import {port} from "../components/port"

export default {
  data() {
    return {
      name: "",
      email: "",
      roleNum: "",
      role: "",
      erros: [],
      msg: false
    }
  }, 
  created() {
    axios.get(`http://localhost:${port}/user/`+this.$route.params.id, auth()).then(res => {
      this.name = res.data.user.user.name
      this.email = res.data.user.user.email
      this.roleNum = res.data.user.user.role
      this.roles()
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
  },
  methods: {
    roles: function() {
      if(this.roleNum == "0"){
        this.role = "Usuário comum"
      } else {
        this.role = "Admin"
      }
    },
    voltar: function() {
      this.$router.push({name: "user"})
    },
    editar: function() {
      if(this.role == "Usuário comum" || this.role == "usuário comum") {
        this.roleNum = "0"
      }
      if(this.role == "Admin" || this.role == "admin") {
        this.roleNum = "1"
      }
      if(this.name == "" || this.name == " " || this.name == undefined) {
        this.erros = [{name: "Insira o nome do usuário"}]
        setInterval(() => {
          this.erros = []
        }, 3000)
      } else if(this.email == "" || this.email == " " || this.email == undefined) {
        this.erros = [{name: "Insira o e-mail do usuário"}]
        setInterval(() => {
          this.erros = []
        }, 3000)
      } else if(this.role == "" || this.role == " " || this.role == undefined) {
        this.erros = [{name: "Insira o cargo do usuário"}]
        setInterval(() => {
          this.erros = []
        }, 3000)
      } else if(this.role != "Usuário comum" && this.role != "Admin" && this.role != "usuário comum" && this.role != "admin") {
        this.erros = [{name: "Informe se o usuário é Admin ou Usuário comum"}]
        setInterval(() => {
          this.erros = []
        }, 5000)
      }
      if(this.erros.length <=0) {
        axios.put(`http://localhost:${port}/user/${this.$route.params.id}`, {name: this.name, email: this.email, role: this.roleNum}, auth()).then(res => {
          this.msg = res.data.msg;
          setInterval(() => {
          this.msg = false
        }, 3000)
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