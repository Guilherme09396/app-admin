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
          <label class="label">Informe o seu e-mail</label>
            <div class="control">
              <input v-model="email" class="input" type="text" placeholder="email@dominio.com">
            </div>
      </div>
    </div>
  </div>
    <button class="button is-success" @click="login">Recuperar senha</button>  
  </div>
 
</template>

<script>
import axios from "axios"
/* import {port} from "../components/port"
 */
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
    recuperar: function() {
      this.$router.push({name: "home"})
    }

    
  }, 
  computed: {
  }
}
</script>

<style>

</style>