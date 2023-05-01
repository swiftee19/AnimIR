import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useQuery } from "@apollo/client";
import * as React from "react";
import { GetAnimesByGenre } from "../Queries/GetAnimesByGenre";
import { ListPage } from "./ListPage";

export const SearchPage = () => {
  const [genre, setGenre] = React.useState("");

  const { loading, error, data } = useQuery(GetAnimesByGenre, {
    variables: {
      genre: genre,
    },
  });
  console.log(data);

  React.useEffect(() => {
    console.log(genre);
    console.log(data);
  }, [genre]);

  function HandleSearch(e: any) {
    e.preventDefault();
    setGenre(e.target.value);
  }

  return (
    <div>
      <Box h="7vh" p={0} m={0}></Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={MdSearch} />}
        />
        <Input type="text" placeholder="Anime genre" onChange={HandleSearch} />
      </InputGroup>
      {data && (<ListPage data={data.Page.media} />)}
    </div>
  );
};
