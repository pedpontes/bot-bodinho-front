import { MusicModel } from "./music";

export type SessionModel = {
  id: string;
  hasPlayer: boolean;
  hasConnection: boolean;
  queueLength: number;
  playerStatus: string;
};

export type LoadQueueByUserResponse = {
  explaned: "connected" | "disconnected";
  queue: MusicModel[];
};
