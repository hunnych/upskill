<template>
  <div id="conversation" class="chat">
    <div class="chat-header" v-on:click="chatToggle">Chat</div>
    <transition>
    <div class="conversation-container" ref="scroll" v-chat-scroll v-show="chatToggleDisplay">
      <div class="chat-body">
      <div
        v-for="message in messages"
        :key="message.id"
        class="bubble-container"
        :class="{ myMessage: message.sent_from === name }"
      v-bind:title="'Sent on '+message.sent_date" >
        <div class="bubble">
          <div class="name">{{ message.sent_from }}:</div>
          <div class="message">{{ message.message_text }}</div>
        </div>
      </div>
       <div class="input-container">
      <input
        v-model="messageText.messageBody"
        placeholder="Enter your message"
      />
      <button v-on:click="sendMessage">Send message</button>
    </div>
    </div>
    </div>
   </transition>
  </div>
</template>

<script>
import Vue from 'vue';

import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);

export default {
  name: "Chat",
  props: ["name"],
  data() {
    return {
      messageText: {
        messageBody: null,
        sentFrom: null,
        sentDate: new Date(),
      },
      chatToggleDisplay:false
    };
  },
  created() {
    this.$store.dispatch("getMessages");
    console.log("created_message", this.$store.state.messages);
  },
  methods: {
    // this.messages = this.$store.state.messages;
    // console.log("messages",this.messages);
    sendMessage() {
      if (this.messageText.messageBody != null) {
        this.messageText.sentFrom = this.name;
        this.$store.dispatch("sendMessage", this.messageText);
        this.messageText.messageBody = null;
      }
    },
    chatToggle(){
      this.$refs['scroll'].scrollTop = this.$refs['scroll'].scrollHeight; 
      this.chatToggleDisplay = !this.chatToggleDisplay;
    }
  },
  mounted() {
    console.log("messgaes", this.$store.state.messages);
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
};
</script>

<style scoped>
.conversation-container {
  margin: 0 auto;
  margin-bottom:10px;
  max-width: 300px;
  height: 600px;
  padding: 0 20px;
  border: 3px solid #f1f1f1;
  overflow: scroll;
}

.bubble-container {
  text-align: left;
  margin-bottom: 10px;
}
.input-container{
  float:right;
}
.bubble {
  border: 2px solid #f1f1f1;
  background-color: #fdfbfa;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  width: 230px;
  float: right;
  margin-bottom: 10px;
}

.myMessage .bubble {
  background-color: #abf1ea;
  border: 2px solid #87e0d7;
  float: left;
}

.name {
  padding-right: 8px;
  font-size: 11px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.chat-header{
  background-color: grey;
  padding: 10px 10px;
  width:300px;
  cursor: pointer;
}
.chat{
position: fixed;
bottom: 50px;
right: 15px;
border: 3px solid #f1f1f1;
z-index: 9;
}
</style>
