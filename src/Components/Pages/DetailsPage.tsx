import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetAnimeById } from "../Queries/GetAnimeDetails";

interface DetailsPageProps {
  key?: string;
  imageSource?: string;
  title?: string;
  description?: string;
  episodes?: number;
  isAdult?: boolean;
  genres?: string;
  popularity?: number;
}

export const DetailsPage = (props: DetailsPageProps) => {
  let { id } = useParams();

  console.log(id);

  const { loading, error, data } = useQuery(GetAnimeById, {
    variables: {
      id: id,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;

  console.log(data.Media.isAdult);

  function GoBack() {
    window.history.back();
  }

  return (
    <div>
      <Box h="7vh" p={0} m={0}></Box>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={data.Media.coverImage.large}
          alt="Image not found"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{data.Media.title.userPreferred}</Heading>

            <Text py="2">{data.Media.description}</Text>
            <Text>Popularity: {data.Media.popularity}</Text>
            <Text>Genres: {data.Media.genres}</Text>
            <Text>Episodes: {data.Media.episodes}</Text>

            {data.Media.isAdult && <Text>18+: True </Text>}
            {!data.Media.isAdult && <Text>18+: False </Text>}
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue" onClick={GoBack}>
              Go Back
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};
