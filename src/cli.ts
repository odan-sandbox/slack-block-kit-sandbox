import "dotenv/config";
import { WebClient } from "@slack/web-api";
import {
  callForParticipantBlock,
  Props,
} from "./call-for-participant-block.js";

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL;

const webClient = new WebClient(token);

const props: Props = {
  eventName: "草むしり検定",
};

async function main() {
  await webClient.chat.postMessage({
    ...callForParticipantBlock(props).channel(channel).buildToObject(),
    metadata: { event_type: "props", event_payload: props },
    icon_emoji: ":robot_face:",
    username: "募集bot",
  });
}

main();
