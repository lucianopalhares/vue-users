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

        <v-toolbar-title>Pessoas do GitHub</v-toolbar-title>

        <v-spacer></v-spacer>



        </v-toolbar>

    </v-card>
    </template>

    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
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
            :key="item.name"
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
<!--
                <v-card-text class="text--primary">
                <div>text</div>

                <div>text</div>
                </v-card-text>
-->
                <v-card-actions>              

                <v-btn src="https://api.github.com/users/mojombo">
                    GITHUB
                </v-btn>
                </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          style="margin-top:50px;"
          align="center"
          justify="center"
        >
          <span class="red">Items por pagina</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Pagina {{ page }} de {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 24,
        sortBy: 'name',
        keys: [
          'Name',
          'Calories',
          'Fat',
          'Carbs',
          'Protein',
          'Sodium',
          'Calcium',
          'Iron',
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%',
             src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          },
        ],
      }
    },
    created() {
       this.loadUsers();       
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      async loadUsers () {
        this.items = await this.$axios.$get('https://api.github.com/users?per_page=100')
        console.log(this.items)
      }
    },
  }
</script>







