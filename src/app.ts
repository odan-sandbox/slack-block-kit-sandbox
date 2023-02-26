import "dotenv/config";
import bolt, { BlockAction, ButtonAction } from "@slack/bolt";
import {
  CallForParticipantBlock,
  Props,
} from "./call-for-participant-block.js";

const { App } = bolt;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

async function main() {
  await app.start(process.env.PORT || 3000);
}

main();

app.action<BlockAction<ButtonAction>>(
  "participate",
  async ({ body, payload, ack, client }) => {
    await ack();
    console.log("body", body);
    console.log("payload", payload);

    if (!body.message) {
      throw new Error("No message");
    }
    if (!body.channel) {
      throw new Error("No channel");
    }

    console.log(body.message.metadata);
    console.log(body.message.blocks);

    // mutate state
    const props: Props = {
      ...body.message.metadata.event_payload,
      participant: body.user.name,
    };

    const ts = body.message.ts;

    await client.chat.update({
      ...CallForParticipantBlock(props).buildToObject(),
      channel: body.channel.id,
      ts,
      metadata: { event_type: "props", event_payload: props },
    });
  }
);
