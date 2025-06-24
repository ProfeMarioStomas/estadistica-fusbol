import { neon } from "@neondatabase/serverless";
import { ITeam } from "../interfaces/ITeam.interface";
import {
  teamToParameters,
  singleTeamAdapter,
  multipleTeamAdapter,
} from "../adapters/Team.adapter";

export const TeamRepository = {
  async getAll(connectionString: string): Promise<Array<ITeam>> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql`SELECT *  FROM teams`;
      return multipleTeamAdapter(returnedData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getById(connectionString: string, playerId: number): Promise<ITeam> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `SELECT * FROM teams WHERE id = $1`,
        [playerId],
      );
      return singleTeamAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async addTeam(connectionString: string, team: ITeam): Promise<ITeam> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `
          INSERT INTO teams (name, league) 
          VALUES ($1, $2) RETURNING *`,
        teamToParameters(team),
      );
      return singleTeamAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateTeam(
    connectionString: string,
    teamId: number,
    team: ITeam,
  ): Promise<ITeam> {
    try {
      const sql = neon(connectionString);
      const returnedData = await sql.query(
        `
          UPDATE teams
          SET name = $1, league = $2
          WHERE id = $3
          RETURNING *`,
        [...teamToParameters(team), teamId],
      );
      return singleTeamAdapter(returnedData[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async deleteTeam(connectionString: string, teamId: number): Promise<void> {
    try {
      const sql = neon(connectionString);
      await sql.query(
        `
          DELETE FROM teams 
          WHERE id = $1`,
        [teamId],
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
