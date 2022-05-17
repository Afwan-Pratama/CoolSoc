import { gql } from "@apollo/client";

export const postSubcription = gql`
subscription getPosts($limit: Int) {
  posts(limit: $limit) {
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
    likes {
      post_id
      uid
    }
  }
}
`