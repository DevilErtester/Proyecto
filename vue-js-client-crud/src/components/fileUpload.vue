<template>
  <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent class="container"> 
    <form ref="fileform">
      <span class="drop-files">Drop the files here!</span>
      <ul>
        <li v-for="(file,index) in files" :key="index">
          {{ file.name }} ({{ file.size |kb}}) <a class="btn" @click="removeFile(file.name,index)" title="Remove">X</a><a class="btn" @click="downloadFile(file.name)" title="Download">></a>
        </li>
      </ul>
    </form>
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
      files:[]
    };
  },
  filters:{
    kb: function(value){
      if (value>1024000){
        value = Math.floor(value/1024000)+" mb";
      }else if(value>1024){
        value = Math.floor(value/1024)+"kb"
      }else{
        value = value+"b"
      }
      return value
    },
  },
  mounted(){
    FilesDataService.getAllFiles().then(response =>{
      const fileArray = response.data
      fileArray.forEach((file)=>{
        this.files.push(file)
        
      })
    })
    /*
      Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if( this.dragAndDropCapable ){
      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function(e){
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
       let formData = new FormData();
        for( let i = 0; i < e.dataTransfer.files.length; i++ ){
          this.files.push( e.dataTransfer.files[i] );
          formData.append('file', e.dataTransfer.files[i]);
          FilesDataService.fileUpload(formData);
        }
      }.bind(this));
    }
  },
  methods: {
    removeFile(file,key){
      console.log(file)
      this.files.splice( key, 1 );
      FilesDataService.deleteFilebyName(file)
      
    },
    downloadFile(file){
      FilesDataService.downloadFile(file).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        console.log(response.data)
        fileLink.href = fileURL;
        fileLink.setAttribute('download', file);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    determineDragAndDropCapable(){
      /*
        Create a test element to see if certain events
        are present that let us do drag and drop.
      */
      var div = document.createElement('div');

      /*
        Check to see if the `draggable` event is in the element
        or the `ondragstart` and `ondrop` events are in the element. If
        they are, then we have what we need for dragging and dropping files.

        We also check to see if the window has `FormData` and `FileReader` objects
        present so we can do our AJAX uploading
      */
      return ( ( 'draggable' in div )
              || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window
              && 'FileReader' in window;
    },
  },
};
</script>

<style>

div.file-listing{
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img{
  height: 100px;
}
</style>
