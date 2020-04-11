<template>
  <v-form @submit.prevent="send">
    <v-text-field solo v-model="text"
      label="Введите сообщение" required />

    <v-btn type="submit" color="#1976d2" class="mr-4">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
    export default {
        name: "chatForm",
        data: () => ({
            text:''
        }),
        methods: {
            send() {
                if(this.text) {
                    this.$socket.emit('createMessage', {
                        text: this.text,
                        id: this.$store.state.user.id,
                    }, data => {
                        if (typeof data === 'string') {
                            console.error(data);
                        } else {
                            this.text = "";
                        }

                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  button {
    margin-left: 10px;
    min-height: 45px;
  }
  .v-text-field {
    max-height: 48px;
  }
}
</style>
