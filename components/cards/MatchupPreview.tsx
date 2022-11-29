import {
  Avatar,
  background,
  Box,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import LeagueMember from "../../classes/custom/LeagueMember";
import Matchup from "../../classes/custom/Matchup";
import { Context } from "../../contexts/Context";
import { project_colors } from "../../utility/project_colors";

interface MyProps {
  matchup?: Matchup;
  member: LeagueMember | undefined;
}

export default function MatchupPreview(props: MyProps) {
  const [context, setContext] = useContext(Context);

  let opponentId;

  if (props.matchup?.homeTeam.roster_id == props.member?.roster.roster_id) {
    opponentId = props.matchup?.awayTeam?.roster_id;
  } else {
    opponentId = props.matchup?.homeTeam?.roster_id;
  }

  let shadowColor = project_colors.statColor.neutral;
  let winningText = "";
  if (props.member != undefined && props.matchup && !props.matchup?.isTie) {
    if (props.matchup?.winnerRosterId == props?.member.roster.roster_id) {
      winningText = "win";
      shadowColor = project_colors.statColor.good;
    } else {
      winningText = "loss";
      shadowColor = project_colors.statColor.bad;
    }
  }


  return (
    <Box fontSize={"xs"} p={0} textAlign={"center"}>
      <Text color={"textTheme.mediumEmphasis"}>Week {props.matchup?.weekNumber}</Text>
      <VStack
      w={"100px"} h={"70px"}
        spacing={0}
        m={1}
        p={2}
        gap={0}
        borderRadius={"md"}
        boxShadow={`inset 0px 0px 0px 1px ${shadowColor}`}
        transition={"all .2s ease-in-out"}
        _hover={{
          transform: "scale(1.1)",
          backgroundColor: "surface.0",
          cursor: "pointer"
        }}
      >
        <SkeletonCircle isLoaded={props.member != undefined}>
          <Avatar
            size={"sm"}
            ring={1}
            ringColor={"surface.0"}
            ringInset={"inset"}
            src={`https://sleepercdn.com/avatars/${context?.members.get(opponentId).avatar}`}
          />
        </SkeletonCircle>
        <SkeletonText
          pt={2}
          height={"20px"}
          isLoaded={props.member != undefined}
          noOfLines={1}
        >
          <Text fontSize={"xx-small"} color={"textTheme.highEmphasis"}>
            {context?.members.get(opponentId).name}
          </Text>
        </SkeletonText>
      </VStack>
      <Text color={"textTheme.mediumEmphasis"}>
      {winningText}
      </Text>
    </Box>
  );
}
