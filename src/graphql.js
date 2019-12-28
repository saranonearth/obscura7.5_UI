import gql from 'graphql-tag'


export const Auth = gql `
mutation ($token:String!){
        auth(token: $token){
            token
        }
    }
`

export const getUser = gql `
query{
  getGamePlayer {
    id
    name
    gameName
    group
    firstTime
    image
  }
}
`