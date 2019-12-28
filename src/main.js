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
import {
  ApolloLink,
  concat
} from 'apollo-link';
import VueApollo from "vue-apollo";
import "./app.css";

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: "http://localhost:4000/"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('nara$obscura')

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  });
  return forward(operation);
})

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
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