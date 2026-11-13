export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export type PublicQuestion = Omit<Question, "correctIndex">;

export interface Player {
  id: number;
  name: string;
  score: number;
  answered: number[];
}

export interface Store {
  questions: Question[];
  players: Player[];
  nextQuestionId: number;
  nextPlayerId: number;
}
