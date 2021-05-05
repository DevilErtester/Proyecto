import http from "../http-common";

class FileDataService {
    fileUpload(formData) {
        return http.post(`/uploadFile`,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
    }
    getAllFiles(){
        return http.get(`/getAllFiles`)
    }
    deleteFilebyName(filename){
        return http.delete(`/deleteFilebyName/${filename}`)
    }

}

export default new FileDataService();