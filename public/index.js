/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      places: [
        {
          name: "Home",
          address: "somewhere"
        }
      ],
      newPlace: {
        place: "",
        address: ""
      },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/places').then(function(response) {
      this.places = response.data;
      console.log("new places acquired");
    }.bind(this));
  },
  methods: {
    addPlace: function() {
      axios.post('/api/places', this.newPlace).then(function(response) {
        this.places.push(response.data);
      }.bind(this)).catch(function(error) {
        this.errors = error.response.data.errors;
        console.log("failed");
      }.bind(this));
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});