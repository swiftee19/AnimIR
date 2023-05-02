import {
  Tabs,
  TabList,
  Tab,
  Box
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <Box pos="fixed" h="10vh" w="100vw" zIndex={2} p={0} m={0}>
      <Tabs bg={["blue.50"]}>
        <TabList>
          <Link to="/">
            <Logo />
          </Link>

          <Tab>
            <Link to="/">List</Link>
          </Tab>
          <Tab>
            <Link to="/Favorites">Favorites</Link>
          </Tab>
          <Tab>
            <Link to="/Search">Search</Link>
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
