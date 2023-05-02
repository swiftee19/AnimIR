import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const GetAnimesByGenre = gql(`
query getAllAnime($genre:String){
    Page(page: 1, perPage: 200){
      media(type:ANIME, sort:POPULARITY_DESC, genre_in:[$genre]){
        genres
        id
        coverImage {
          large
        }
        title{
          userPreferred
        }
        description
      }
    }
  }
`);

export const GetAnimesByGenreData = (genre:string) =>{
  const { loading, error, data } = useQuery(GetAnimesByGenre, {
    variables: {
      string: genre,
    },
  });



  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  return data
}