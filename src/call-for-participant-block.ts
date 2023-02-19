import { Message, Blocks, Elements } from "slack-block-builder";
import { conditionals } from "slack-block-builder";

export type Props = {
  eventName: string;
  participant?: string;
};

export const callForParticipantBlock = ({ eventName, participant }: Props) =>
  Message()
    .text("参加者募集中")
    .blocks(
      Blocks.Section().text(`*${eventName}* への参加者募集中です！`),
      Blocks.Divider(),
      conditionals.setIfTruthy(participant, [
        Blocks.Section().text(`${participant} さんが参加者です`),
      ]),
      conditionals.setIfFalsy(participant, [
        Blocks.Actions().elements(
          Elements.Button().text("参加する").actionId("participate")
        ),
      ])
    );