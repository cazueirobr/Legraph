export interface Account {
    puuid: string
    gameName: string
    tagLine: string
  }
  
 export interface Partida {
    id: string;
    personagem: any; 
    mortes: number;
    abates: number;
    assistencias: number;
    cs: number;
    kda: string;
    ranqueada: string;
    vitoria: boolean;
  }
