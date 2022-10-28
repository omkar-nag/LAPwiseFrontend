import { Quizzes } from "./Quizzes"

export class Questions {
    "id": number
    "question": string
    "answer": string
    "options": string
    "questionType": string
    "quizId": number
    "quizzes": Array<Quizzes>
    "toggle": number = 0
}