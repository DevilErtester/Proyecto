import http from "../http-common";

class EjemploDataService {
    clickMe() {
        return http.post(`/ejemplo`);
    }

}

export default new EjemploDataService();
