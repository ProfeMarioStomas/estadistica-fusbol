import { ITeam } from "../interfaces/ITeam.interface";

export class TeamAdapter implements ITeam {
  id: number;
  league: string;
  name: string;

  constructor(adaptee: Record<string, any>) {
    this.id = Number(adaptee.id);
    this.name = adaptee.name;
    this.league = adaptee.league;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      league: this.league,
    };
  }
}

export const singleTeamAdapter: (adaptee: Record<string, any>) => ITeam = (
  adaptee: Record<string, any>,
): ITeam => new TeamAdapter(adaptee);

export const multipleTeamAdapter: (
  adaptees: Array<Record<string, any>>,
) => Array<ITeam> = (adaptees: Array<Record<string, any>>) =>
  adaptees.map((adaptee: Record<string, any>) => new TeamAdapter(adaptee));

export const teamToParameters = (team: ITeam) => [team.name, team.league];
