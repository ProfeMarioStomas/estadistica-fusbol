import { Context } from "hono";
import { IPlayer } from "../../interfaces/IPlayer.interface";

interface PlayerBinding {
  in: {
    json: IPlayer;
  };
  out: {
    json: IPlayer;
  };
}

export type PlayerContext = Context<{}, any, PlayerBinding>;
