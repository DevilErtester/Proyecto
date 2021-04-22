import http from "../http-common";

class LoginDataService {
    clickMe(data) {
        return http.post(`/login`, data);
    }
    newUser(data) {
        return http.post(`/newUser`, data);
    }
    verifyLogin(){
        return http.post(`/verifyLogin`);
    }

    async getHello(){
        return http.get('/info');
    }

}

export default new LoginDataService();
