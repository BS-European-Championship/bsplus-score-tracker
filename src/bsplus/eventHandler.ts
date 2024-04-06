import * as e from "./event";

export interface BSPlusEventHandlerSet {
  roomJoined?: (body: e.RoomJoinedMessage) => void;
  roomState?: (body: e.RoomStateMessage) => void;
  score?: (body: e.ScoreMessage) => void;
  playerJoined?: (body: e.PlayerJoinedMessage) => void;
  playerUpdated?: (body: e.PlayerUpdatedMessage) => void;
}
