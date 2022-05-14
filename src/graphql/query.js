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

export const fetchUserData = gql`
query fetchUserData($uid: String = "") {
  user(where: {uid: {_eq: $uid}}) {
    uid
    username
    user_detail {
      first_name
      last_name
    }
    user_avatar {
      avatar_url
    }
  }
}
`

export const fetchUserAndPosts = gql`
query fetchUserAndPosts($uid: String) {
  user(where: {uid: {_eq: $uid}}) {
    uid
    username
    user_avatar {
      avatar_url
    }
    user_detail {
      first_name
      last_name
    }
  }
  posts {
    post_id
    uid
    content
    user {
      username
      user_avatar {
        avatar_url
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}
`

export const fetchComments = gql`
query fetchComments($post_id: uuid) {
    comments(where: {post_id: {_eq: $post_id}}) {
      content
      uid
      user {
        username
        user_avatar {
          avatar_url
        }
      }
  }
} 
`