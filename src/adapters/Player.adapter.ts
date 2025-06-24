import { IPlayer } from "../interfaces/IPlayer.interface";

export class PlayerAdapter implements IPlayer {
  id: number;
  name: string;
  country: string;
  birth_at: string;
  team: string;

  constructor(adaptee: Record<string, any>) {
    this.id = Number(adaptee.id);
    this.name = adaptee.name;
    this.country = adaptee.country;
    this.birth_at = adaptee.birth_at;
    this.team = adaptee.team;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      country: this.country,
      birth_at: this.birth_at,
      team: this.team,
    };
  }
}

export const singlePlayerAdapter: (adaptee: Record<string, any>) => IPlayer = (
  adaptee: Record<string, any>,
): IPlayer => new PlayerAdapter(adaptee);

export const multiplePlayerAdapter: (
  adaptees: Array<Record<string, any>>,
) => Array<IPlayer> = (adaptees: Array<Record<string, any>>) =>
  adaptees.map((adaptee: Record<string, any>) => new PlayerAdapter(adaptee));

export const playerToParameters = (player: IPlayer) => [
  player.name,
  player.country,
  player.birth_at,
  player.team,
];
