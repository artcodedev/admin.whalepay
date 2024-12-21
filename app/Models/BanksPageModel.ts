
export enum Currency {
    RUB,
    USD
}

export interface Column {
    label: string;
    minWidth?: number;
}

export interface BanksM {
    id: number
    title: string
    status: boolean
    uid: string
    currency: Currency
    currencySymbol: string
}

export interface ResponseBanks {
    status: number
    data?: BanksM[]
    message?: string
}