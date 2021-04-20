import http from "../http-common";

class EjemploDataService {
    clickMe(msg) {
        return http.post(`/ejemplo`,msg);
    }

}

export default new EjemploDataService();
