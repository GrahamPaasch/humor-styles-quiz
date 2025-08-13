import { create } from 'zustand'

export interface QuestionnaireState {
  responses: Record<number, number>
  currentQuestion: number
  setResponse: (questionId: number, response: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  setCurrentQuestion: (question: number) => void
  resetQuestionnaire: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  responses: {},
  currentQuestion: 1,
  setResponse: (questionId: number, response: number) =>
    set((state) => ({
      responses: { ...state.responses, [questionId]: response },
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, 32),
    })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 1),
    })),
  setCurrentQuestion: (question: number) =>
    set({ currentQuestion: question }),
  resetQuestionnaire: () =>
    set({ responses: {}, currentQuestion: 1 }),
}))