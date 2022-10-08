import React, { useContext, useEffect } from "react";
import { Box, Center, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import { DraftPick } from "../../../interfaces/sleeper_api/DraftPick";
import { render } from "react-dom";
import { Context } from "../../../contexts/Context";
import League from "../../../interfaces/sleeper_api/custom/League";

type MyProps = { statName: String; statValue: String, league: League };

const GenericStatCard = (props: MyProps) => {
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    if (context.settings) {
      props.league.changeName("testName")
      console.log(context.settings.name)
    }
  }, [context, context.settings, props.league, setContext]);


  return (
    <Box
      my={1}
      p={4}
      bg={"surface.1"}
      maxW="xs"
      fontSize={"lg"}
      borderRadius={10}
      boxShadow={"2xl"}
      color="white"
    >
      <Text>{context.settings.name}</Text>
      <Text>{props.statValue}</Text>
    </Box>
  );
};

export default GenericStatCard;

export const OrdinalStatCard = (props: MyProps) => {
  return (
    <Flex
      my={1}
      py={3}
      px={0}
      bg={"surface.1"}
      maxW="xs"
      borderRadius={10}
      boxShadow={"2xl"}
      color="white"
      alignItems={"left"}
    >
      <Center>
        <Box mx={2} bg={"surface.2"} alignItems={"start"} fontWeight={"bold"} fontSize={"lg"} p={2}>1st</Box>
        <Box >
          <Text fontSize={"md"}>{props.statName}</Text>
          <Text fontSize={"sm"}>{props.statValue}</Text>
        </Box>
      </Center>
      <Spacer></Spacer>
    </Flex>
  )
}
