import http from "../http-common";

class ChatDataService {
    getThisUser() {
        return http.post(`/chat`);
    }
}

export default new ChatDataService();
