import {
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader, DrawerOverlay, useDisclosure
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import MemberList from "../groups/MemberList";

export default function TeamSidebar() {
  const [context, setContext] = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customSettings, setCustomSettings] = React.useState(
    context.modifiedSettings
  );

  return (
    <>
      {context.settings && (
        <Button size={"sm"} colorScheme={"secondary"} textColor="black" variant='ghost' onClick={onOpen}
        aria-label={"teams"}>
          Teams
        </Button>
      )}
      <Drawer isOpen={isOpen} placement="left"  onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"surface.1"} textColor="white">
          <DrawerCloseButton />
          <DrawerHeader>
            Teams
            <br />
          </DrawerHeader>
          <DrawerBody p={0}>
          { context != undefined && context.settings && (<MemberList members={context.members} leagueId={context.settings.league_id}/>)}
            
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function formatScoreKey(key: string) {
  return key.replaceAll("_", " ");
}