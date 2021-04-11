import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GSignInButton from "vue-google-signin-button";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat, split } from "apollo-link";
import VueApollo from "vue-apollo";
import { WebSocketLink } from "apollo-link-ws";
import "./app.css";
import LoadScript from "vue-plugin-load-script";
import { getMainDefinition } from "apollo-utilities";

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_API_URL
});
const wslink = new WebSocketLink({
  uri: process.env.VUE_APP_WS_URL,

  options: {
    reconnect: true,

    timeout: 50000
  }
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = store.state.token;
  console.log("TOKEN", token);
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(
    authMiddleware,
    split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wslink,
      httpLink
    )
  ),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading"
  }
});
Vue.use(LoadScript);
Vue.use(VueApollo);
Vue.use(GSignInButton);
new Vue({
  router,
  store,
  apolloProvider,
  created() {
    this.$store.dispatch("GET_USER");
  },
  render: h => h(App)
}).$mount("#app");
