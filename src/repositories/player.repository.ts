import { neon } from "@neondatabase/serverless";
import { IPlayer } from "../interfaces/IPlayer.interface";
import {
  multiplePlayerAdapter,
  playerToParameters,
  singlePlayerAdapter,
} from "../adapters/Player.adapter";

export const PlayerRepository = {
  async getAll(connectionString: string): Promise<Array<IPlayer>> {
    try {
      const sql = neon(connectionString);
      const returnedData =
        await sql`SELECT id, name, country, to_char(birth_at, 'DD-MM-YYYY') AS birth_at, team FROM players`;
      return multiplePlayerAdapter(returnedData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getById(connectionString: string, playerId: number): Promise<IPlayer> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `SELECT id, name, country, to_char(birth_at, 'DD-MM-YYYY') AS birth_at, team FROM players WHERE id = $1`,
        [playerId],
      );
      return singlePlayerAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async addPlayer(connectionString: string, player: IPlayer): Promise<IPlayer> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `
          INSERT INTO players (name, country, birth_at, team) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
        playerToParameters(player),
      );
      return singlePlayerAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updatePlayer(
    connectionString: string,
    playerId: number,
    player: IPlayer,
  ): Promise<IPlayer> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `
          UPDATE players 
          SET name = $1, country = $2, birth_at = $3, team = $4
          WHERE id = $5
          RETURNING *`,
        [...playerToParameters(player), playerId],
      );
      return singlePlayerAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async deletePlayer(
    connectionString: string,
    playerId: number,
  ): Promise<void> {
    try {
      const sql = neon(connectionString);
      await sql.query(
        `
          DELETE FROM players 
          WHERE id = $1`,
        [playerId],
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
