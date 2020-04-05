<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>MySQL</v-toolbar-title>

      <v-spacer />

      <v-btn-toggle
        v-model="selected_db"
        mandatory
        dense
        group
      >
        <v-btn value="public">
          {{ $t('public_db_name') }}
        </v-btn>
        <v-btn value="private">
          {{ $t('private_db_name') }}
        </v-btn>
      </v-btn-toggle>

      <v-spacer />

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            style="margin-right: 0;"
            v-on="on"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="link in external_links" :key="link.title" :href="link.url">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content style="">
      <QueryBox
        :selected_db="selected_db"
        @input="selected_db = $event"
      />
      <component :is=" 'Instructions_' + $i18n.locale " />
    </v-content>
  </v-app>
</template>

<script>
import QueryBox from './components/QueryBox';
import Instructions_hr from "./components/Instructions_hr";

export default {
  name: 'App',

  components: {
    Instructions_hr,
    QueryBox,
  },

  data: () => ({
    selected_db: 'public'
  }),
};
</script>
