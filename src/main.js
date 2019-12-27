import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GSignInButton from "vue-google-signin-button";
import {
  ApolloClient
} from "apollo-client";
import {
  HttpLink
} from "apollo-link-http";
import {
  InMemoryCache
} from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import "./app.css";

Vue.config.productionTip = false;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/"
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading"
  }
});

Vue.use(VueApollo);
Vue.use(GSignInButton);
new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");