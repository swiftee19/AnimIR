import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const GetAllAnimes = gql(`
  query getAllAnime($page:Int){
    Page(page: $page, perPage: 100){
      media(type:ANIME, sort:POPULARITY_DESC){
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

export const GetAnimeDatas = (page:number) =>{
  const { loading, error, data } = useQuery(GetAllAnimes, {
    variables: {
      page: page,
    },
  });



  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  return data
}
