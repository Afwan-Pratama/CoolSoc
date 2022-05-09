import { gql } from "@apollo/client";

export const insertUserMutation = gql`
mutation Insert_User($email: String, $first_name: String, $last_name: String, $uid: String, $username: String) {
    insert_user_one(object: {email: $email, first_name: $first_name, last_name: $last_name, uid: $uid, username: $username}) {
      email
      first_name
      last_name
      uid
      username
    }
  }
`