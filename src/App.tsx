import * as React from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  List,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Favorites } from "./Components/Pages/Favorites";
import { ListPage } from "./Components/Pages/ListPage";
import { GetAllAnimes, GetAnimeDatas } from "./Components/Queries/GetAllAnimes";
import { SearchPage } from "./Components/Pages/SearchPage";
import Navbar from "./Components/Navbar";
import { DetailsPage } from "./Components/Pages/DetailsPage";
import { DataContext } from "./Components/DataContext";

export const App = () => {
  const [data, setData] = React.useState<any>(null)
  return (
    <DataContext.Provider value={{data, setData}}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/:id" element={<DetailsPage />} />
            <Route path="/Favorites" element={<Favorites />}></Route>
            <Route path="/Search" element={<SearchPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </DataContext.Provider>
  );
};
