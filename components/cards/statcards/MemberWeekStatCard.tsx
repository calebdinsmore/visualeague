"use client";
import {
  Box, Button,
  Modal, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import Matchup from "../../../classes/custom/Matchup";
import { MatchupSide } from "../../../classes/custom/MatchupSide";
import MatchupModalBody from "../../MatchupModalBody";

type MyProps = {
  matchupSide: MatchupSide | undefined;
  memberId: number | undefined
  mainStat: String | undefined;
  subStat?: String | undefined
  matchup?: Matchup | undefined
  title: String | undefined;
  isLoaded: boolean;
};

const MemberWeekStatCard = (props: MyProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      py={2}
      px={5}
      dropShadow="2xl"
      textAlign={"center"}
      border={"1px"}
      borderRadius={4}
      boxShadow={"2xl"}
      minWidth={"150px"}
      minHeight={"125px"}

    >
      <Box fontWeight="bold" fontSize={"1.2em"} color={"textTheme.highEmphasis"}>
        {props.title}
      </Box>
      <Text
        fontSize={".8em"}
        fontWeight="light"
        color={"textTheme.mediumEmphasis"}
      >
        {props.subStat}
      </Text>
      <Text
        fontSize={".9em"}
        fontWeight={"medium"}
        color={"textTheme.highEmphasis"}
      >
        {props.mainStat}
      </Text>
      <Button visibility={props.matchup != undefined ? "visible" : "hidden"} my={2} variant={"outline"} colorScheme={"secondary"} onClick={onOpen} size={"xs"}>View</Button>
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <MatchupModalBody matchup={props.matchup} onClose={onClose}/>
      </Modal>
    </Box>
  );
};

export default MemberWeekStatCard;
