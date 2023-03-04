import "dotenv/config";
import { WebClient } from "@slack/web-api";
import {
  CallForParticipantBlock,
  Props,
} from "./call-for-participant-block.js";

const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL;

const webClient = new WebClient(token);

async function main() {
  const state: Props = {
    eventName: "草むしり検定",
  };
  CallForParticipantBlock(state).printPreviewUrl();
  await webClient.chat.postMessage({
    ...CallForParticipantBlock(state).channel(channel).buildToObject(),
    metadata: { event_type: "state", event_payload: state },
    icon_emoji: ":robot_face:",
    username: "募集bot",
  });
}

main();
