import fetch from 'isomorphic-fetch'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { provide, onGlobalSetup, defineNuxtPlugin } from '@nuxt/bridge'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => provideApollo())
})

function provideApollo() {
  const httpLink = createHttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
    fetch: (uri, options) => {
      return fetch(uri, options)
    },
  })

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

  provide(DefaultApolloClient, apolloClient)
}
