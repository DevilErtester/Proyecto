import http from "../http-common";

class ChatDataService {
    Chat() {
        return http.post(`/chat`);
    }
}

export default new ChatDataService();
