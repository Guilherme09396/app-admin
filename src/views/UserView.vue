<template>
  <div class="container">

    <div class="columns is-mobile">
      <div class="column is-9" style="margin: 40px auto 10px">
        <article v-if="msg != false" class="message is-danger" style="margin-bottom: 10px">
          <div class="message-header">
            <p>{{msg}}</p>
          </div>
        </article>

        <table class="table">
          <thead>
            <tr >
              <th class="table">Id</th>
              <th class="table">Nome</th>
              <th class="table" style="text-align: center">Email</th>
              <th class="table">Cargo</th>
              <th style="padding-left: 80px">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in role" :key="user.id_user">
              <th class="table">{{user.id_user}}</th>
              <td class="table">{{user.name}}</td>
              <th class="table">{{user.email}}</th>
              <td class="table">{{user.role}}</td>
              <td class="table"><router-link :to="{name: 'edit', params: {id: user.id_user} }" class="button is-success">Editar</router-link></td>
              <td><button :data-id="user.id_user" class="button is-danger" @click="deletar(user.id_user)">Remover</button></td>
            </tr>

          </tbody>
        </table>

        <div :class="{'modal is-active': modalDelete.status, 'modal': !modalDelete.status}">
          <div class="modal-background"></div>
          <div class="modal-content">

          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Component
              </p>
              <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </header>
            <div class="card-content">
              <div class="content">
                Você realmente quer cancelar?
              </div>
            </div>
            <footer class="card-footer">
              <a @click="cancelar" href="#" class="card-footer-item">Cancelar</a>
              <a @click="deletarUser(modalDelete.userId)" class="card-footer-item">Sim, quero deletar!</a>
            </footer>
            </div>

          </div>
          <button @click="cancelar" class="modal-close is-large" aria-label="close"></button>
        </div>

      </div>
    </div>


    
  </div>
</template>

<script>
import axios from "axios"
import {auth} from "../Auth"
import {port} from "../components/port"

export default {
  name: "users-",
  created() {
    axios.get(`http://localhost:${port}/user`, auth()).then(res => {
     this.users = res.data
    }).catch(err => {
      console.log(err)
    })
  }, 
  data(){
    return {
      users: [],
      modalDelete: {status: false},
      msg: false
    }
  },
  methods: {
    deletar: function(id) {
      this.modalDelete = {status: true, userId: id}
    }, 
    cancelar: function() {
      this.modalDelete = false
    },
    deletarUser: function(id) {
      axios.delete(`http://localhost:${port}/user/${id}`, auth()).then((res) => {
        this.modalDelete = false
        this.msg = res.data.msg
        this.users = this.users.filter(user => user.id != id)
        setTimeout(() => {
          this.msg = false
        }, 3000);
      }).catch(err => {
        this.modalDelete = false
        this.msg = err.response.data.err
        setTimeout(() => {
          this.msg = false
        }, 3000);
      })
    }
  },
  computed: {
    role: function() {
      const arr = this.users.map((e) => {
        if(e.role == "0"){
          return {id_user: e.id_user, name: e.name, email: e.email, password: e.password, role: "Usuário comum"}
        } else {
          return {id_user: e.id_user, name: e.name, email: e.email, password: e.password, role: "Admin"}
        }
      })
      return arr
    }
  }
}
</script>

<style scoped>
.table{
  padding-left: 40px;
}
</style>