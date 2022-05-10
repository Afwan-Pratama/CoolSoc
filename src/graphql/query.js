import {gql} from '@apollo/client'

export const fetchUsername = gql`
query fetchUsername($input: String!) {
    user(where: {username: {_eq: $input}}) {
      username
    }
  }  
`

export const fetchEmail = gql`
query fetchUsername($input: String!) {
    user(where: {email: {_eq: $input}}) {
      email
    }
  }  
`

export const fetchUID = gql`
query fetchUID($uid : String) {
  user(where: { uid: {_eq: $uid} }){
    uid
  }
}
`