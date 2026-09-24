export type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type StudyResult = {
  title: string;
  summary: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
};