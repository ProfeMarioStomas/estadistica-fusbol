import { Context } from "hono";
import { ITeam } from "../../interfaces/ITeam.interface";

interface TeamBinding {
  in: {
    json: ITeam;
  };
  out: {
    json: ITeam;
  };
}

export type TeamContext = Context<{}, any, TeamBinding>;
