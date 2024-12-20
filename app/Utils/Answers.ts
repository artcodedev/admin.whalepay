
import { Answer } from "../Models/Answers/AnswerModels";

export class Answers {

    public static ok(msg: string): Answer {
        return {status: 200, message: msg}
    }

    public static wrong(msg: string): Answer {
        return {status: 505, message: msg}
    }

    public static errorDB(msg: string): Answer {
        return {status: 402, message: msg}
    }

    public static notFound(msg: string): Answer  {
        return {status: 400, message: msg}
    }

    public static serverError(msg: string): Answer  {
        return {status: 500, message: msg}
    }

}