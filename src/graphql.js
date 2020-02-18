import gql from "graphql-tag";

export const Auth = gql `
  mutation($token: String!) {
    auth(token: $token) {
      token
    }
  }
`;

export const getUser = gql `
  query {
    getGamePlayer {
      id
      name
      gameName
      group
      firstTime
      image
    }
  }
`;

export const Onboard = gql `
  mutation($gameName: String!, $uniqueKey: String!, $image: String!) {
    onBoard(gameName: $gameName, uniqueKey: $uniqueKey, image: $image) {
      token
      player {
        id
        firstTime
        gameName
        image
      }
    }
  }
`;

export const createTeam = gql `
  mutation(
    $teamName: String!
    $bio: String!
    $uniqueKey: String!
    $image: String!
  ) {
    createTeam(
      teamName: $teamName
      uniqueKey: $uniqueKey
      bio: $bio
      image: $image
    ) {
      id
      teamName
      image
      bio
      levelsSolved
      invitations {
        player
      }
      curlevel {
        level
        levelNo
      }
      members {
        player {
          id
          gameName
          image
        }
        solvedLevels {
          levelNo
        }
        levelsSolved
      }
    }
  }
`;

export const getGameTeam = gql `
  query($teamId: String!) {
    getGameTeam(teamId: $teamId) {
      id
      teamName
      image
      levelsSolved
      curlevel {
        level
        levelNo
      }
      members {
        player {
          gameName
          image
          id
        }
        solvedLevels {
          levelNo
        }
        levelsSolved
      }
      invitations {
        player
      }
      bio
      teamAdmin
    }
  }
`;

export const getinvitations = gql `
  query {
    getTeamInvitations {
      id
      player {
        id
        gameName
        image
        uniqueKey
      }
    }
  }
`;

export const getLevels = gql `
  query {
    getTeamLevels {
      level
      levelNo
    }
  }
`;

export const getLevel = gql `
  query($levelId: String!) {
    getLevel(levelId: $levelId) {
      data
      rlevelNo
      id
    }
  }
`;

export const getAllTeams = gql `
  query($skip: Int) {
    getAllTeams(skip: $skip) {
      teamCount
      teams {
        id
        teamName
        levelsSolved
        image
      }
    }
  }
`;

export const sendInvite = gql `
  mutation($teamId: String!) {
    sendInvite(teamId: $teamId)
  }
`;

export const acceptInvite = gql `
  mutation($playerId: String!, $inviteId: String!) {
    acceptInvite(playerId: $playerId, inviteId: $inviteId) {
      members {
        player {
          id
          gameName
          image
        }
        solvedLevels {
          levelNo
        }
        levelsSolved
      }
    }
  }
`;
export const checkAnswer = gql `
  mutation($answer: String!, $levelNo: Int!) {
    checkAnswer(answer: $answer, levelNo: $levelNo) {
      message
      newCurlevel {
        level
        levelNo
      }
    }
  }
`;


export const pushInvite = gql `
subscription($teamId:String!){
  pushInvite(teamId:$teamId){
    teamId
    invite{
      id
      player{
        gameName
        uniqueKey
        image
      }
    }
  }
}
`

export const pushTeam = gql `
subscription($playerId:String!){
  pushTeam(playerId:$playerId){
  
    team{
        id
        teamName
        image
        levelsSolved
        curlevel {
          level
          levelNo
        }
        members {
          player {
            gameName
            image
            id
          }
          solvedLevels {
            levelNo
          }
          levelsSolved
        }
        invitations {
          player
        }
        bio
        teamAdmin
    }
  }
}
`