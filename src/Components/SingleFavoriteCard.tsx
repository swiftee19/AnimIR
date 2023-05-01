import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  Stack,
  Image,
  Icon,
} from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetAnimeById } from "./Queries/GetAnimeDetails";

export const SingleFavoriteCard = (props: any) => {
  const { loading, error, data } = useQuery(GetAnimeById, {
    variables: {
      id: props.id,
    },
  });

  function RemoveThisAnimeFromFavorite(){
    props.removeFavorite(props.id)
  }

  return (
    <div>
      {data && (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          bg={["blue.10"]}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={data.Media.coverImage.large}
            alt="image not found"
          />

          <Stack>
            <CardBody>
              <Heading size="md">{data.Media.title.userPreferred}</Heading>
              <Text py="2">{data.Media.description}</Text>
            </CardBody>

            <CardFooter columnGap={2}>
              <Link to={`/${props.id}`}>
                <Button variant="solid" colorScheme="blue">
                  Details
                </Button>
              </Link>

              <div>
                <Button onClick={RemoveThisAnimeFromFavorite}>
                  <Icon fill={"red.500"} as={MdStars} />
                </Button>
              </div>
            </CardFooter>
          </Stack>
        </Card>
      )}
    </div>
  );
};
