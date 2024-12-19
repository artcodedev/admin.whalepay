export interface RequestDataTransactions {
    status: string
    sum: number
    domein: string
    id_client: string
    time: string
    number_card: number
    login: string
    password: string
    uid: string
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
}
