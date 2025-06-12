import { PlayerRepository } from "../repositories/player.repository";
import { IPlayer } from "../interfaces/IPlayer.interface";

export const PlayerService = {
  async getAll(databaseURL: string): Promise<Array<IPlayer>> {
    try {
      return await PlayerRepository.getAll(databaseURL);
    } catch (error: any) {
      const messageError = `PlayerService.getAll: ${error.message}`;
      console.error(messageError);
      throw new Error(`Error al obtener jugadores: ${error.message}`);
    }
  },

  async getById(databaseURL: string, playerId: number): Promise<IPlayer> {
    try {
      return await PlayerRepository.getById(databaseURL, playerId);
    } catch (error: any) {
      const messageError = `PlayerService.getById (${playerId}): ${error.message}`;
      console.error(messageError);
      throw new Error(`Error al obtener jugador: ${error.message}`);
    }
  },

  async addPlayer(databaseURL: string, player: IPlayer): Promise<IPlayer> {
    try {
      return await PlayerRepository.addPlayer(databaseURL, player);
    } catch (error: any) {
      const messageError = `PlayerService.addPlayer: ${error.message}`;
      console.error(messageError, player);
      throw new Error(`Error al guardar jugador: ${error.message}`);
    }
  },

  async updatePlayer(
    databaseURL: string,
    playerId: number,
    player: IPlayer,
  ): Promise<IPlayer> {
    try {
      return await PlayerRepository.updatePlayer(databaseURL, playerId, player);
    } catch (error: any) {
      const messageError = `PlayerService.updatePlayer: ${error.message}`;
      console.error(messageError, player);
      throw new Error(`Error al editar jugador: ${error.message}`);
    }
  },

  async deletePlayer(databaseURL: string, playerId: number): Promise<void> {
    try {
      await PlayerRepository.deletePlayer(databaseURL, playerId);
    } catch (error: any) {
      const messageError = `PlayerService.delete: ${error.message}`;
      console.error(messageError, playerId);
      throw new Error(`Error al eliminar jugador: ${error.message}`);
    }
  },
};
