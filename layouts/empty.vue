<template>
  <v-app app dark>
    <v-content>
      <v-container fluid>
        <nuxt />
        <v-snackbar v-model="snackbar">
          {{ snackbarText }}
          <v-btn color="blue" text
            @click="snackbar = false">
            Хорошо
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
    export default {
        name: "empty",
        data: () => ({
            snackbar: false,
            snackbarText:'',
            snackbarMessages: new Map([
                ['LeftChat',   'Вы вышли из чата'],
                ['noUser', 'Необходимо для начала войти'],
            ])
        }),
        mounted() {
            const txt = this.$route.query.message;
            if(txt) {
                this.snackbar = true;
                this.snackbarText = this.snackbarMessages.get(txt);
            }
        }
    }
</script>

<style scoped>

</style>
