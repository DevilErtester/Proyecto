<template>
  <div id="app">
    {{ message }}
    <a class="btn btn-primary btn-sm " role="button" @click="clickMe()">
      Click Me
    </a>
  </div>
</template>

<script>
export default {
  name: "Ejemplo",
  methods: {
    clickMe() {
      if (this.message == "ajaj") this.message = "klk";
      else this.message = "ajaj";
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
