import http from "../http-common";

class LoginDataService {
    clickMe(data) {
        return http.post(`/login`, data);
    }

}

export default new LoginDataService();
