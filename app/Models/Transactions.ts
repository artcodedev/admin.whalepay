
export enum Status {
    PROCESS,
    PENDING_PAY,
    PENDING_CARD,
    PENDING_TRX,
    SUCCESS,
    ERROR,
    EXITED,
    REQVER,
}

export interface RequestDataTransactions {
    status: string
    sum: number
    domein: string
    uid_session: string
    time: number
    number_card: string
    login: string
    password: string
}

export interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth: number
}

export interface ResponseTransactions {

    status: number
    data: RequestDataTransactions[]

}
