import { gql } from "@apollo/client";

export const insertUserMutation = gql`
mutation Insert_User($email: String, $first_name: String, $last_name: String, $uid: String, $username: String , $avatar_url : String) {
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