<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650px">
      <v-list>
        <v-subheader>Список людей в комнате</v-subheader>
        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent=""
        >
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon :color="u.id == user.id ? '#1976d2' : 'grey'">
              mdi-message-text
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="exit">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
export default {
    data: () => ({
        drawer: true
    }),
    computed: mapState(["user", "users"]),
    methods: {
        ...mapMutations(['clearData']),
        exit() {
            this.$socket.emit('userLeft', this.user.id, () => {
                this.$router.push('/?message=LeftChat');
                this.clearData();
            });
        }
    }
};
</script>
