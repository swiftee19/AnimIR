import {
  Text,
  Box,
} from "@chakra-ui/react";
import { DataContext } from "../DataContext";
import * as React from "react";
import { SingleFavoriteCard } from "../SingleFavoriteCard";

export const Favorites = () => {
  const [favorites, setFavorites] = React.useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const { data: favoriteContext, setData: setFavoriteContext } =
    React.useContext(DataContext);
  const [refresh, setRefresh] = React.useState<boolean>(true);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  setFavoriteContext(JSON.stringify(favorites));

  const removeFavoriteFunction = (animeId: number) => {
    console.log("removing: " + animeId);
    let temp = favorites.filter((it: number) => {
      return it !== animeId;
    });

    setFavorites(temp);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavoriteContext(JSON.stringify(favorites));
    setRefresh(!refresh);
  };

  const { data } = React.useContext(DataContext);
  const favoritesString = data;
  const JSONParse = favoritesString ? JSON.parse(favoritesString) : [];

  return (
    <div>
      if(data)
      {JSONParse.map((animeId: any) => {
        return (
          <SingleFavoriteCard
            id={animeId}
            removeFavorite={removeFavoriteFunction}
          />
        );
      })}
      
      {JSONParse.length === 0 &&
        (<div>
          <Box h="7vh" p={0} m={0}></Box>
          <Text>You have no favorites yet :(</Text>
          <Text>Go discover new animes :D</Text>
        </div>)
      }
    </div>
  );
};
