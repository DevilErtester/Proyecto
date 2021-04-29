<template>
  <div id="app">
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";
import router from "../router";
import md5 from "js-md5";
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
      LoginDataService.clickMe(data).then(async (response) => {
        if (response.data.success) {
          // Send a default GET request with credentials
          await LoginDataService.getHello();

          router.push("/");
        } else this.login.message = "wrong password or username";
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages > li {
  padding: 0.5rem 1rem;
}
#messages > li:nth-child(odd) {
  background: #efefef;
}
</style>
