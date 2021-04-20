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

        <button @click="clickMe" class="btn btn-success">login</button>
      </div>
      {{ login.message }}
    </div>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";

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
        pass: this.login.pass,
      };
      LoginDataService.clickMe(data).then((response) => {
        this.login.message = response;
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
