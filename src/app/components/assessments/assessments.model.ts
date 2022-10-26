export interface AssessmentsCardModel {
    AssessmentID: number,
    Title: string,
    Score: number,
    Topic: AssessmentsTopicModel
    Quiz: AssessmentsQuizModel,
}

export interface AssessmentsTopicModel {
    Id: number,
    Name: string,
    Content: string,
}

export interface AssessmentsQuizModel {
    Id: number,
    Name: string,
    QuestionCount: number
}