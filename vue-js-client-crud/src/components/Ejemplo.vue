<template>
  <div id="app">
    {{ message }}
    <a class="btn btn-primary btn-sm " role="button" @click="clickMe()">
      Click Me
    </a>
  </div>
</template>

<script>
import EjemploDataService from "../services/EjemploDataService";

export default {
  name: "Ejemplo",
  methods: {
    clickMe() {
      EjemploDataService.clickMe();
    },
  },
  data() {
    return {
      message: "klk",
    };
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
