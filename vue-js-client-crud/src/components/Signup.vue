<template>
  <div id="app">
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="user">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            required
            v-model="login.user"
            name="username"
          />
        </div>

        <div class="form-group">
          <label for="pass1">Password</label>
          <input
            type="password"
            class="form-control"
            id="pass"
            required
            v-model="login.pass1"
            name="pass1"
          />
          <div class="form-group">
          <label for="pass2">Repeat password</label>
          <input
            type="password"
            class="form-control"
            id="pass"
            required
            v-model="login.pass2"
            name="pass2"
          />
        </div>
        {{ login.message }}
        <button @click="clickMe" class="btn btn-success">Create new user</button>
        
        
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";
import router from '../router'
import md5 from 'js-md5'

export default {
  name: "Login",
  data() {
    return {
      login: {
        message: "",
        pass1: "",
        pass2: "",
        user: "",
      },
      submitted: false,
    };
  },
  methods: {
    clickMe() {
      if(this.login.pass1 === this.login.pass2){
        var data = {
                user: this.login.user,
                pass: md5(this.login.pass1),
              };
        LoginDataService.newUser(data).then((response) => {
          if(response.data.success===true) {
            router.push("/");
          }else{
            this.login.message=response.data.message;
          }

        });
      }else {
        this.login.message="Passwords dont match";
      }
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
