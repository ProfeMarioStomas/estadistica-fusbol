import { TeamRepository } from "../repositories/team.repository";
import { ITeam } from "../interfaces/ITeam.interface";

export const TeamService = {
  async getAll(databaseURL: string): Promise<Array<ITeam>> {
    try {
      return await TeamRepository.getAll(databaseURL);
    } catch (error: any) {
      const messageError = `TeamService.getAll: ${error.message}`;
      console.error(messageError);
      throw new Error(`Error al obtener equipos: ${error.message}`);
    }
  },

  async getById(databaseURL: string, teamId: number): Promise<ITeam> {
    try {
      return await TeamRepository.getById(databaseURL, teamId);
    } catch (error: any) {
      const messageError = `TeamService.getById (${teamId}): ${error.message}`;
      console.error(messageError);
      throw new Error(`Error al obtener equipo: ${error.message}`);
    }
  },

  async addTeam(databaseURL: string, team: ITeam): Promise<ITeam> {
    try {
      return await TeamRepository.addTeam(databaseURL, team);
    } catch (error: any) {
      const messageError = `TeamService.addTeam: ${error.message}`;
      console.error(messageError, team);
      throw new Error(`Error al guardar equipo: ${error.message}`);
    }
  },

  async updateTeam(
    databaseURL: string,
    playerId: number,
    team: ITeam,
  ): Promise<ITeam> {
    try {
      return await TeamRepository.updateTeam(databaseURL, playerId, team);
    } catch (error: any) {
      const messageError = `TeamService.updateTeam: ${error.message}`;
      console.error(messageError, team);
      throw new Error(`Error al editar equipo: ${error.message}`);
    }
  },

  async deleteTeam(databaseURL: string, teamId: number): Promise<void> {
    try {
      await TeamRepository.deleteTeam(databaseURL, teamId);
    } catch (error: any) {
      const messageError = `TeamService.delete: ${error.message}`;
      console.error(messageError, teamId);
      throw new Error(`Error al eliminar equipo: ${error.message}`);
    }
  },
};
