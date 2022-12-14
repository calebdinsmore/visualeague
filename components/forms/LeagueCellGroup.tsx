import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { LeagueSettings } from "../../classes/sleeper/LeagueSettings";
import UserLeagueCell from "../UserLeagueCell";

type MyProps = {
  username: String;
  usernameSubmitted: Boolean;
};

const LeagueCellGroup = (props: MyProps) => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: userData, error: userError } = useSWR(
    props.usernameSubmitted
      ? "https://api.sleeper.app/v1/user/" + props.username
      : null,
    fetcher
  );

  const { data: leaguesData, error: leaguesError } = useSWR(
    () =>
      userData.user_id
        ? "https://api.sleeper.app/v1/user/" +
          userData.user_id +
          "/leagues/nfl/2022"
        : null,
    fetcher
  );
  if (userError) return <div>Failed to load</div>;
  if (!userData || !leaguesData) return <Spinner size={"md"} />

  return (
    <Wrap overflowY={"scroll"} maxH={"400px"}>
      {leaguesData.map((league: LeagueSettings) => {
        return (
          <WrapItem key={league.league_id}>
            <UserLeagueCell
              league={league}
            />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default LeagueCellGroup;
