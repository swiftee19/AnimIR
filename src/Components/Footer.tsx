import {
  Text,
  Box
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <div>
      <Box
        pos="fixed"
        h="10vh"
        w="100vw"
        zIndex={2}
        p={0}
        mt="4rem"
        bg={["blue.50"]}
        bottom="0"
      >
        <Text py="1rem" textAlign="center">&#169; 2023 Copyright: IR23-1</Text>
      </Box>
    </div>
  );
}
