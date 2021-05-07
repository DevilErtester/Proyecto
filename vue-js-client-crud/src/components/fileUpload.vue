<template>
  <div
    id="app"
    v-cloak
    @drop.prevent="addFile"
    @dragover.prevent
    class="container"
  >
    <div class="container-fluid">
      <div class="col-md-10">
        <form ref="fileform">
          <span class="drop-files">Drop the files here!</span>
          <div class="grid-container">
            <div
              class="list-group-item"
              v-for="(file, index) in files"
              :key="index"
              :class="{ active: index == currentIndex }"
              @click="setActiveFile(file, index)"
            >
              <div class="file">{{ file.name }} ({{ file.size | kb }})</div>
              <a
                class="btn"
                @click="removeFile(file.name, index)"
                title="Remove"
              >
                <i class="fas fa-trash-alt"></i>
              </a>
              <a class="btn" @click="downloadFile(file.name)" title="Download">
                <i class="fas fa-download"></i>
              </a>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <div v-if="currentFile">
          <h4>File</h4>
          <div>
            <label><strong>File Name:</strong></label> {{ currentFile.name }}
          </div>
          <a class="badge bg-danger" :href="'' + currentFile.name">
            Edit
          </a>
          <froala :tag="'textarea'" :config="config" v-model="model"></froala>
        </div>
        <div v-else></div>
      </div>
    </div>
    <!-- <button :disabled="uploadDisabled" @click="upload">Upload</button> -->
  </div>
</template>

<script>
import FilesDataService from "../services/FilesDataService";
export default {
  name: "FileUpload",
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      currentIndex: -1,
      currentFile: null,
      model: "",
      config: {
        fullPage: true,
        charCounterCount: true,
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          },
        },
      },
    };
  },
  methods: {
    setActiveFile(file, key) {
      this.currentFile = file;
      this.currentIndex = key;
      console.log(file, key);
      this.editFile(file.name);
    },
    removeFile(file, key) {
      console.log(file);
      this.files.splice(key, 1);
      FilesDataService.deleteFilebyName(file);
    },
    downloadFile(file) {
      FilesDataService.downloadFile(file).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        console.log(response.data);
        fileLink.href = fileURL;
        fileLink.setAttribute("download", file);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    editFile(file) {
      FilesDataService.downloadFile(file).then((response) => {
        this.model = response.data;
      });
    },
    determineDragAndDropCapable() {
      /*
        Create a test element to see if certain events
        are present that let us do drag and drop.
      */
      var div = document.createElement("div");

      /*
        Check to see if the `draggable` event is in the element
        or the `ondragstart` and `ondrop` events are in the element. If
        they are, then we have what we need for dragging and dropping files.

        We also check to see if the window has `FormData` and `FileReader` objects
        present so we can do our AJAX uploading
      */
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
  },
  filters: {
    kb: function(value) {
      if (value > 1024000) {
        value = Math.floor(value / 1024000) + " mb";
      } else if (value > 1024) {
        value = Math.floor(value / 1024) + "kb";
      } else {
        value = value + "b";
      }
      return value;
    },
  },
  mounted() {
    FilesDataService.getAllFiles().then((response) => {
      const fileArray = response.data;
      fileArray.forEach((file) => {
        this.files.push(file);
      });
    });
    /*
      Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if (this.dragAndDropCapable) {
      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function(evt) {
          /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
          this.$refs.fileform.addEventListener(
            evt,
            function(e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener(
        "drop",
        function(e) {
          /*
          Capture the files from the drop event and add them to our local files
          array.
        */
          let formData = new FormData();
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
            formData.append("file", e.dataTransfer.files[i]);
            FilesDataService.fileUpload(formData);
          }
        }.bind(this)
      );
    }
  },
};
</script>

<style>
.file {
  font-size: 0.8em;
  width: 150px;
  height: 150px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
}
</style>
