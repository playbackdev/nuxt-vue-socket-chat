<template>
    <div class="c-wrap">
      <div class="c-chat" ref="chatBlock">
      <ul>
        <Message v-for="m in messages" :key="m.text"
                 :name="m.name"
                 :text="m.text"
                 :owner="m.id === user.id"
        />
      </ul>
      </div>
      <div class="c-form">
        <ChatForm />
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Message from '@/components/message';
  import ChatForm from "@/components/chatForm";

    export default {
        name: "chat",
        head() {
            return {
                title: `Чат | Комната ${this.user.room}`
            }
        },
        components: {
            Message, ChatForm
        },
        middleware: ["chat"],
        computed: mapState(["user","messages"]),
        watch: {
            messages() {
                setTimeout(() => {
                    this.$refs.chatBlock.scrollTop = this.$refs.chatBlock.scrollHeight;
                },0);
            }
        }
    };
</script>

<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 0.35rem 0.5rem 0 0.5rem;
    border-top: 1px solid #666666;
  }

  .c-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 60px;
    padding: 0.5em;
    overflow-y: auto;
  }
</style>
