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

interface SingleCardProps {
  id: number;
  key: number;
  imageSource?: string;
  title?: string;
  description?: string;
}

//Bikin local storage di sini, dia bakal nampung id dari anime yang favorite

export const SingleCard = (props:any) => {
  
  // console.log(props)

  function AddFavoriteaAnime() {
    props.toggleFavorite(props.id, true)
  }

  function RemoveFavoriteAnime() {
    props.toggleFavorite(props.id, false)
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg={["blue.10"]}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={props.imageSource}
        alt="image not found"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.title}</Heading>
          <Text py="2">{props.description}</Text>
        </CardBody>

        <CardFooter columnGap={2}>
          <Link to={`/${props.id}`}>
            <Button variant="solid" colorScheme="blue">
              Details
            </Button>
          </Link>

          {props.favorites && props.favorites.includes(props.id) ? (
            <div>
              <Button onClick={RemoveFavoriteAnime}>
                <Icon fill={"red.500"} as={MdStars} />
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={AddFavoriteaAnime}>
                <Icon fill={"red.0"} as={MdStars} />
              </Button>
            </div>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
