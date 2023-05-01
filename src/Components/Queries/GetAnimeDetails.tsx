import { gql } from "@apollo/client";

export const GetAnimeById = gql(`
  query getAnimeById($id:Int){
    Media(type:ANIME, sort:POPULARITY_DESC, id: $id){
      coverImage {
        large
      }
      title{
        userPreferred
      }
    episodes
    isAdult
    genres
    popularity
    description
    }
  }
`);
