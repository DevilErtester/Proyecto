<template>
  <froala :config="config"></froala>
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
          // "froalaEditor.initialized": function() {
          //   console.log("initialized");
          // },
        },
      },
      model: "",
    };
  },
};
</script>
