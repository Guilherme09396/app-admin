<template>
  <div class="container">
    <div class="columns is-mobile">
      <div class="column is-7" style="margin: 40px auto 10px">
        <div v-for="err in error" :key="err.id">
          <div class="notification is-danger">
            <p class="danger">{{err.name}}</p>
          </div>
        </div>
        <h1>Logado</h1>
        <button class="button is-success" @click="click(this.rota)">Users</button><br><br>
        <button class="button is-success" @click="click(this.rotaCreate)">Criar usuários</button>
        <!-- <h1 v-if="hours>=0 && hours<=11" class="h1">Bom dia</h1>
        <h1 v-else-if="hours>=12 && hours<=17" class="h1">Boa tarde</h1>
        <h1 v-else-if="hours>=18" class="h1">Boa noite</h1> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import {port} from "../components/port"
import {auth} from "../Auth"
export default {
  data() {
    return {
      error: "",
      rota: "user",
      rotaCreate: "create"
    }
  },
  created() {
  },
  computed: {
    /* hours: function() {
      const date = Date.now()
      const hour = new Date(date)
      return hour.getHours()
    } */
  },
  methods: {
    click: function(rota) {
      axios.get(`http://localhost:${port}/auth`, auth()).then(() => {
        this.$router.push({name: rota})
      }).catch(err => {
        this.error = [{id: 1, name: err.response.data.err}]
        setTimeout(() => {
          this.error = ""
        }, 3000);
      })
    }
  }
}
</script>

<style>

</style>