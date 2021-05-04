<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Tristes Chat</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p>
            <span class="font-weight-bold">{{ msg.user }}: </span
            >{{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatDataService from "../services/ChatDataService";

export default {
  data() {
    return {
      username:"",
      message: "",
      messages: [],
      socket: io("http://localhost:8080"),
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
        this.socket.emit("SEND_MESSAGE", {
          user: this.username,
          message: this.message,
        });
        this.message=""
    },
  },
  mounted() {
    ChatDataService.getThisUser().then((response) => {
        this.username = response.data.username;
        this.socket.emit("USER_CONNECTED", {
          user: this.username,
        });
    });
    this.socket.on("MESSAGE", (data) => {
      this.messages.push(data)
    });
  },
};
</script>

<style></style>