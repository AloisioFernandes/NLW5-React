import { createContext } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: string;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
}

export const PlayerContext = createContext({} as PlayerContextData) // createContext é mais utilizado para definir o tipo de dado que será salvo no contexto
