import * as e from "./event";

export interface BSPlusEventHandlerSet {
  roomJoined?: (body: e.RoomJoinedEvent) => void;
  roomState?: (body: e.RoomStateEvent) => void;
  score?: (body: e.ScoreEvent) => void;
  playerJoined?: (body: e.PlayerJoinedEvent) => void;
  playerUpdated?: (body: e.PlayerUpdatedEvent) => void;
}
