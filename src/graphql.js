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

export const Onboard = gql `
mutation ($gameName: String!,$uniqueKey:String!,$image:String!){
  onBoard(gameName: $gameName, uniqueKey:$uniqueKey, image:$image){
    id
    name
    gameName
    group
    firstTime
    image
    uniqueKey
  }
}


`