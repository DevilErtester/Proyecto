<template>
  <div id="app">
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="user">user</label>
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
          <label for="pass">pass</label>
          <input
            type="password"
            class="form-control"
            id="pass"
            required
            v-model="login.pass"
            name="pass"
          />
        </div>
        {{ login.message }}
        <button @click="clickMe" class="btn btn-success">Sign In</button>
        <a></a>
        <router-link to="/Signup" class="btn btn-success">Signup</router-link>
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
        pass: "",
        user: "",
      },
      submitted: false,
    };
  },
  methods: {
    clickMe() {
      var data = {
        user: this.login.user,
        pass: md5(this.login.pass),
      };
      LoginDataService.clickMe(data).then((response) => {
        if(response.data.success===true) {
          router.push("/");
        }
        else this.login.message="wrong password or username";
      });
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
