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
    token
    player{
      id
      firstTime
      gameName
      image
    }
  }
}
`

export const createTeam = gql `
mutation ($teamName:String!,$bio:String!,$uniqueKey:String!,$image:String!){
  createTeam(teamName:$teamName,uniqueKey:$uniqueKey,bio:$bio,image:$image){
    id
    teamName
    image
    bio
    levelsSolved
    invitations{
      player
    }
    curlevel{
      level
      levelNo
    }
    members{
      player{
        id
        gameName
        image
      }
      solvedLevels{
        level
      }
      levelsSolved
    }
  }
}
`