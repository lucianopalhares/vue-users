<template>

  <v-container fluid>

    <template>
    <v-card>
        <v-toolbar
        color="cyan"
        dark
        flat
        >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>PESSOAS DO GITHUB</v-toolbar-title>

        <v-spacer></v-spacer>

        </v-toolbar>

    </v-card>
    </template>

    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-desc="sortDesc"
      hide-default-footer
    >
    
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Buscar"
          ></v-text-field>
         
        </v-toolbar>
      </template>

        <template v-slot:no-results>
            <span>Nada encontrado</span>
        </template>

      <template v-slot:default="props">
        <v-row style="margin-top:40px;">
          <v-col
            v-for="item in props.items"
            :key="item.login"
            cols="12"
            sm="6"
            md="6"
            lg="1"
          >
        <v-card
            class="mx-auto"
        >
            <v-img
            class="white--text align-end"
            height="200px"
            :src="item.avatar_url"
            >
            <v-card-title></v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0" v-text="item.login">
                </v-card-subtitle>
                <v-card-actions>         
                
              <v-btn
                color="red lighten-2"
                dark
                @click="openProfile(item)"
              >
                PERFIL
              </v-btn>

                </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </template>
      
    </v-data-iterator>

      <v-row>
        
        <v-col cols="12" sm="12">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>

    <div data-app>
      <v-dialog
      v-model="dialog"
      width="500"
    >     

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ this.item.name }}
        </v-card-title>

        <v-img
          :src="this.item.avatar_url"
          aspect-ratio="1"
          class="grey lighten-2"
        ></v-img>

        <v-card-text style="margin-top:10px;">
          Username: {{ this.item.login }} <br>
          Bio: {{ this.item.bio }} <br>
          Empresa: {{ this.item.company }} <br>
          Blog: {{ this.item.blog }} <br>
          Email: {{ this.item.email }} <br>
          Seguidores: {{ this.item.followers }} <br>
          Localidade: {{ this.item.location }} <br>          
          Twitter: {{ this.item.twitter_username }} <br> <br>

          <v-btn :href="this.item.html_url" target="_blank">
            VER GITHUB
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="dialog = false"
          >
            fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
    </div>

  </v-container>
  
</template>

<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [100,24],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        totalPages: 10,
        pageSize: 100,
        itemsPerPage: 24,
        sortBy: 'name',
        items: [],
        dialog: false,
        item: {}
      }
    },
    created() {
       this.handlePageChange(1);       
    },
    computed: { },
    methods: {
      getRequestParams(page, pageSize) {
        let params = {};
        if (page) {
          params["page"] = page - 1;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
      },
      handlePageChange(value) {
        this.page = value;
        this.loadUsers();
      },
      handlePageSizeChange(size) {
        this.pageSize = size;
        this.page = 1;
        this.loadUsers();
      },
      async loadUsers () {
        const params = this.getRequestParams(
          this.page,
          this.pageSize
        );
        this.items = await this.$axios.$get(`https://api.github.com/users?page=${params.page}&per_page=${params.size}`)
        console.log(this.items)
      },
      async openProfile (item) {
        this.item = await this.$axios.$get(`${item.url}`)
        console.log(this.item)

        this.dialog ? this.dialog = false : this.dialog = true
      }
    },
  }
</script>







