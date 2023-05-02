import { Box, Stack, Button, Text } from "@chakra-ui/react";
import { SingleCard } from "../SingleCard";
import { useQuery } from "@apollo/client";
import * as React from "react";
import { GetAllAnimes } from "../Queries/GetAllAnimes";
import { DataContext } from "../DataContext";

export const ListPage = (props: any) => {
  const [favorites, setFavorites] = React.useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [refresh, setRefresh] = React.useState<boolean>(true);

  const { data: favoriteContext, setData: setFavoriteContext } =
    React.useContext(DataContext);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  setFavoriteContext(JSON.stringify(favorites));

  const toggleFavoriteFunction = (id: number, isFavorite: boolean) => {
    if (isFavorite) addFavoriteFunction(id);
    else removeFavoriteFunction(id);
  };

  const addFavoriteFunction = (newFavId: number) => {
    const temp = favorites;
    temp.push(newFavId);
    setFavorites(temp);

    setRefresh(!refresh);
  };

  const removeFavoriteFunction = (newFavId: number) => {
    console.log("removing: " + newFavId);
    let temp = favorites.filter((it: number) => {
      return it !== newFavId;
    });
    setFavorites(temp);

    setRefresh(!refresh);
  };

  const [page, setPage] = React.useState(1);

  function NextPage() {
    setPage((page) => {
      if (page > 9) {
        setRefresh(!refresh);
        return 1;
      } else {
        setRefresh(!refresh);
        return page + 1;
      }
    });
  }

  function PrevPage() {
    setPage((page) => {
      if (page < 2) {
        setRefresh(!refresh);
        return 10;
      } else {
        setRefresh(!refresh);
        return page - 1;
      }
    });
  }

  const { loading, error, data } = useQuery(GetAllAnimes, {
    variables: {
      page: page,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <Box>
      {props.data && (
        <div>
          <Box h="7vh" p={0} m={0}></Box>
          {props.data.map((searchResult: any) => {
            return (
              <SingleCard
                id={searchResult.id}
                key={searchResult.id}
                imageSource={searchResult.coverImage.large}
                title={searchResult.title.userPreferred}
                description={searchResult.description}
                toggleFavorite={toggleFavoriteFunction}
                favorites={favorites}
              />
            );
          })}
          
        </div>
      )}

      {!props.data && (
        <div>
          <Box h="7vh" p={0} m={0}></Box>
          {data.Page.media.map((anime: any) => {
            return (
              <SingleCard
                id={anime.id}
                key={anime.id}
                imageSource={anime.coverImage.large}
                title={anime.title.userPreferred}
                description={anime.description}
                toggleFavorite={toggleFavoriteFunction}
                favorites={favorites}
              />
            );
          })}
          <Stack
            pos="relative"
            py="1rem"
            mb="2rem"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            bg={["blue.50"]}
          >
            <Button colorScheme="teal" variant="solid" onClick={PrevPage}>
              Prev
            </Button>
            <Text px="1rem">Page: {page}</Text>
            <Button colorScheme="teal" variant="solid" onClick={NextPage}>
              Next
            </Button>
          </Stack>
          <Box paddingBottom="3vh"></Box>
        </div>
      )}
    </Box>
  );
};
