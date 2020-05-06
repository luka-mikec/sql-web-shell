<template>
  <v-container style="max-width: 1200px; padding-top: 5ex;">
    <v-snackbar
            v-model="snackbar"
            :color="snackbar_color"
            :timeout="1300"
            bottom
    >
      {{ snackbar_text }}
      <v-btn
              dark
              icon
              @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>


    <v-layout column>
      <v-layout
              align-center
              justify-center
      >
        <VTextArea
                ref="query_box_ref"
                v-model="query"
                style="max-width: 40em; font-family: monospace; font-size: 14pt; "
                auto-grow
                :placeholder=" $t('sql-command') "
                :rows="1"
                :disabled="history_dialog || history_dialog_just_closed"
                spellcheck="false"
                @keydown="query_box_keydown"
                @keyup="query_box_keyup"
        />
        <div style="width: 1em;" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
                    icon
                    x-large
                    v-on="on"
                    @click="process_query"
            >
              <v-icon>mdi-play-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('execute-current-command') }} Shortcut: <code>Ctrl + Enter</code></span>
        </v-tooltip>




        <v-dialog
                v-model="history_dialog"
                width="unset"
                @keydown.esc="history_dialog = false"
        >
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                        v-show="history.length > 0"
                        icon
                        x-large
                        v-on="{...dialog, ...tooltip}"
                >
                  <v-icon>mdi-history</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('your-previously-enter-commands') }} Shortcut: <code>Ctrl + H</code></span>
            </v-tooltip>
          </template>
          <v-card>
            <v-card style="min-width: 300px;">
              <v-card-title>
                <span>{{ $t('history') }}</span>
                <v-spacer />
                <v-btn
                        icon
                        @click="history_dialog=false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-list three-line>
                  <v-list-item
                          v-for="(h, index) in history.slice().reverse()"
                          :key="index"
                          @click="history_click(history.length - index - 1)"
                  >
                    <v-list-item-subtitle style="white-space: normal !important; font-family: monospace;">
                      {{ h }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-card>
        </v-dialog>


        <v-dialog
                v-model="files_dialog"
                width="unset"
                @keydown.esc="files_dialog = false"
        >
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                        v-show="true || selected_db == 'private'"
                        icon
                        x-large
                        v-on="{...dialog, ...tooltip}"
                >
                  <v-icon>mdi-attachment</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('your-files') }}</span>
            </v-tooltip>
          </template>
          <v-card>
            <v-card style="min-width: 300px;">
              <v-card-title>
                <span>{{ $t('your-files') }}</span>
                <v-spacer />
                <v-btn
                        icon
                        @click="files_dialog=false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-file-input
                        v-model="files_to_upload"
                        :loading="files_server_busy"
                        :disabled="files_server_busy"
                        multiple
                        :label="$t('upload-files')"
                />
                <v-list three-line>
                  <v-subheader
                          v-show="files_dialog_files && files_dialog_files.length > 0"
                          key="header"
                  >
                    {{ $t('adresses-of-uploaded-files') }}
                  </v-subheader>
                  <v-list-item
                          v-for="(file, index) in files_dialog_files"
                          :key="index"
                  >
                    <v-list-item-subtitle style="white-space: normal !important; font-family: monospace;">
                      {{ mysql_data_dir }}{{ file }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-card>
        </v-dialog>
      </v-layout>
      <div style="height: 2ex" />
      <v-layout
              justify-center
              style="text-align: center;"
      >
        <v-data-table
                v-if="visible_state == 2"
                id="sql_output_table"
                :key="query_states.output"
                :no-data-text=" $t('empty-sql-output') "
                :items="output.items ? output.items : []"
                :headers="output.headers ? output.headers : []"
                :sortable="false"
                class="-elevation-1 nowrap"
                disable-pagination
                :hide-default-footer="true"
                style=""
                :mobile-breakpoint="0"
        >
          <template v-slot:top>
            <div>
              <pre
                      style="font-size: 12pt; color: gray; font-family: monospace; white-space: pre !important; text-align: left !important; margin-left: 1.5em !important;"
                      v-html="last_succ_query_info"
              />
            </div>
          </template>
        </v-data-table>

        <v-progress-linear
                v-else-if="visible_state == query_states.loading"
                :key="query_states.loading"
                indeterminate
                style="max-width: 20vw"
        />

        <v-alert
                v-else-if="visible_state == query_states.generic_error"
                :key="query_states.generic_error"
                type="error"
        >
          <span>
            {{ err_msg }}
          </span>
        </v-alert>

        <v-alert
                v-else-if="visible_state == query_states.auth_error"
                :key="query_states.auth_error"
                type="error"
        >
          <span>
            {{ $t('not-logged-in') }} <v-btn
                  target="_blank"
                  style="margin-left: 0.5em;"
                  small
                  :href="authenticate_url"
          >{{ $t('log-in') }}</v-btn>{{ $t('and-try-again') }}
          </span>
        </v-alert>

      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  import VTextArea from "vuetify/lib/components/VTextarea";
  const query_states = Object.freeze({
    empty: 0,
    loading: 1,
    output: 2,
    generic_error: 3,
    auth_error: 4,
  });

  export default {
    name: 'QueryBox',
    components: {VTextArea},

    props: {
      selected_db: {
        type: String,
        default: 'private'
      }
    },
    data: () => ({
      query_states,
      query_state: query_states.empty,
      query_state_prev: query_states.empty,
      query: '',
      last_succ_query_info: '',
      history_browsing_index: -1, // -1 if not browsing
      history: [],
      history_dialog: false,
      history_dialog_just_closed: false,
      files_dialog: false,
      files_to_upload: [],
      files_dialog_files: null,
      files_server_busy: false,
      loading_grace_period: false,
      snackbar: false,
      snackbar_color: '',
      snackbar_text: '',
      err_msg: '',
      output: { },
    }),
    computed: {
      visible_state() {
        if (!this.loading_grace_period || this.query_state != query_states.loading)
          return this.query_state;
        else
          return this.query_state_prev;
      },
    },
    watch: {
      files_dialog(newValue) {
        if (this.files_dialog_files === null && newValue)
          this.fetch_files([]); // initial fetch, before uploading
      },
      async files_to_upload(newValue) {
        if (newValue.length == 0)
          return;

        var reader = new FileReader();
        let fs = await Promise.all(newValue.map(async file => {
          const data = await new Response(file).text();
          return {filename: file.name, content: data};
        }));

        console.log("Trying to upload:", fs);
        await this.fetch_files(fs);
      }
    },
    created() {
      window.sconsole = this;
    },
    methods: {
      query_box_keyup(event) {
      },
      query_box_keydown(event) {
        if (event.key == 'Enter' && event.ctrlKey) {
          this.process_query();
          event.preventDefault();
        }
        if (['h', 'H'].includes(event.key) && event.ctrlKey) {
          this.history_dialog = true;
          event.preventDefault();
        }
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
          let delta = event.key == 'ArrowUp'  ?  -1  : 1;
          let input_ref = this.$refs.query_box_ref.$refs.input;
          if (input_ref.selectionStart == input_ref.selectionEnd &&
                  /*(delta == -1 && input_ref.selectionStart == 0
                   ||  delta == 1  && input_ref.selectionStart == this.query.length*/
                  event.ctrlKey
          )
          {
            this.go_history(delta);
            event.preventDefault();
          }
        }
      },
      async start_loading_grace_period() {
        this.loading_grace_period = true;
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(400);
        this.loading_grace_period = false;
      },
      async fetch_query(cmd) {
        try {
          let user_query = this.query;
          let actual_query = user_query.replace(/\t/g, ' ');
          let res = await window.fetch(this.api_url, {
            mode: 'cors',
            body: JSON.stringify({
              query: actual_query,
              db: this.selected_db,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          let json = await res.json();
          if (json.status !== 'ok')
            throw json && json.error_msg;
          this.output = {
            "status": "ok",
            "headers": (json.rows.length > 0) ? json.rows[0].map(({key, value}, ind) => ({
              text: key,
              value: "val" + ind,
              sortable: false,
            })): [],
            "items": json.rows.map(row => {
              let dict = {};
              for (const [i, {key, value}] of row.entries())
                dict["val" + i] = value;
              return dict;
            }),
          };
          this.query_state = query_states.output;
          this.query = '';
          this.last_succ_query_info = user_query + (json.time !== undefined ? ` (${json.time}ms)` : '');
          this.snackbar_color = 'info';
          this.snackbar_text = this.$t('command-success');
        }
        catch (e) {
          console.log(e);
          if (e == 'mm_auth') {
            this.query_state = query_states.auth_error;
            this.err_msg = e; /* contains Vue code */
            this.snackbar_text = this.$t('not-logged-in');
          }
          else
          {
            this.query_state = query_states.generic_error;
            this.snackbar_text = this.$t('command-fail');
            if (e.replace && e != '')
            {
              e = e.replace('You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use', '');
              this.err_msg = (e ? this.$t('mysql-error') + ' ' + e : '');
            }
            else if (e == '') {
              this.err_msg = this.$t('error-empty-command');
            }
            else
            {
              this.err_msg = this.$t('unknown-error');
            }
          }
          this.snackbar_color = 'error';
          console.log(e);
        }
        finally {
          this.snackbar = true;
        }
      },
      async fetch_files(fs) {
        try {
          this.files_server_busy = true;

          let res = await window.fetch(this.files_url, {
            mode: 'cors',
            body: JSON.stringify({
              fs
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          let json = await res.json();
          if (json.status !== 'ok')
            throw json && json.error_msg;
          this.files_dialog_files = json.rows  ||  [];
          this.snackbar_color = 'info';
          this.snackbar_text = this.$t('files-up-success');
          this.files_to_upload = [];
        }
        catch (e) {
          console.log(e);
          this.files_dialog_files = [];
          if (e == 'mm_auth') {
            this.snackbar_color = 'error';
            this.snackbar_text = this.$t('not-logged-in');
          }
          else
          {
            this.snackbar_color = 'error';
            this.snackbar_text = fs.length > 0 ?  this.$t('files-up-fail') :  this.$t('files-down-fail');
          }
          this.snackbar = true;
        }
        finally {
          if (fs.length > 0)
            this.snackbar = true;
          this.files_server_busy = false;
        }

      },
      async process_query() {
        let cmd = this.query.toLocaleLowerCase().replace(/^\s*/, '');
        if (cmd.startsWith('use '))
        {
          this.$emit('input', cmd.includes( this.$t('public_db_name') ) ? 'public' : 'private' );
          this.query_state = query_states.empty;
          this.query = '';
          return;
        }

        this.history_browsing_index = -1;
        this.query_state_prev = this.query_state;
        this.query_state = query_states.loading;
        this.start_loading_grace_period();
        if (!this.history.includes(this.query))
          this.history.push(this.query);
        await this.fetch_query()
      },
      history_click(h_ind) {
        //--h_ind;
        this.query = this.history[h_ind];
        this.history_browsing_index = h_ind;
        this.history_dialog = false;
        this.$nextTick(() => {
            this.$refs.query_box_ref.focus();
        });
      },
      go_history(delta) {
        if (this.history_browsing_index == -1) /* not already in browsing mode */
        {
          if (delta == -1 && this.history.length > 0)
          {
            delta = this.history[this.history.length - 1] == this.query ? -2 : -1;
            this.history_browsing_index = this.history.length + delta;
            this.query = this.history[this.history_browsing_index];
          }
        }
        else
        {
          let requested = this.history_browsing_index + delta;
          if (requested >= 0 && requested < this.history.length)
          {
            this.history_browsing_index = requested;
            this.query = this.history[requested];
          }
        }
      },
    }
  }
</script>

<style>
  .nowrap * {
    white-space: nowrap !important;
  }

  #sql_output_table {
    max-width: 100vw; min-width: 50vw;
  }

  #sql_output_table td {
    white-space: pre !important;
  }

  @media screen and (min-width: 900px) {
    #sql_output_table {
      max-width: 85vw; min-width: 50vw;
    }
  }
</style>
