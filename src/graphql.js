import gql from 'graphql-tag'


export const Auth = gql `
mutation ($token:String!){
        auth(token: $token){
            token
        }
    }
`