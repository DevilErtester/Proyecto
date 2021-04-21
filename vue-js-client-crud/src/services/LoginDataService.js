import http from "../http-common";

class LoginDataService {
    clickMe(data) {
        return http.post(`/login`, data);
    }
    newUser(data) {
        return http.post(`/newUser`, data);
    }

}

export default new LoginDataService();
