<template>
  <froala :tag="'textarea'" :config="config" v-model="model"></froala>
</template>

<script>
// import VueFroala from "vue-froala-wysiwyg";

export default {
  name: "app",
  data() {
    return {
      config: {
        fullPage: true,
        charCounterCount: true,
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          },
        },
      },

      model: "",
    };
  },
};
</script>
