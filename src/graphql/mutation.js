import { gql } from "@apollo/client";

export const insertUserMutation = gql`
mutation InsertUser($email: String, $first_name: String, $last_name: String, $uid: String, $username: String , $avatar_url : String) {
  insert_user_one(object: {email: $email, uid: $uid, username: $username}) {
    email
    uid
    username
    created_at
  }
  insert_user_details_one(object: {first_name: $first_name, last_name: $last_name, uid: $uid}) {
    first_name
    last_name
  }
  insert_user_avatars_one(object: {uid : $uid, avatar_url: $avatar_url}){
    avatar_url
  }
}
`

export const insertPost = gql`
mutation InsertPost($uid: String, $content: String) {
  insert_posts_one(object: {uid: $uid, content: $content}) {
    uid
  }
}
`

export const insertComment = gql`
mutation InsertComment($content: String, $post_id: uuid, $uid: String) {
  insert_comments_one(object: {content: $content, post_id: $post_id, uid: $uid}) {
    content
    post_id
    uid
  }
}
`

export const insertLike = gql`
mutation MyMutation($post_id: uuid, $uid: String) {
  insert_likes_one(object: {post_id: $post_id, uid: $uid}) {
    uid
    post_id
  }
}
`

export const deleteLike = gql`
mutation MyMutation($uid: String, $post_id: uuid) {
  delete_likes(where: {uid: {_eq: $uid}, post_id: {_eq: $post_id}}) {
    affected_rows
  }
}
`

export const updateUser = gql`
mutation updateUser($uid: String, $avatar_url: String, $background_url: String, $username: String, $first_name: String, $last_name: String) {
  update_user(where: {uid: {_eq: $uid}}, _set: {username: $username}) {
    affected_rows
  }
  update_user_details(where: {uid: {_eq: $uid}}, _set: {first_name: $first_name, last_name: $last_name}) {
    affected_rows
  }
  update_user_avatars(where: {uid: {_eq: $uid}}, _set: {avatar_url: $avatar_url, background_url: $background_url}) {
    affected_rows
  }
}
`