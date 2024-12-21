
export interface Column {
    label: string;
    minWidth?: number;
}

export interface Cards {
    id: number
    card_number: string
    card_holder: string
    card_receiver: string
    card_cvv: string
    card_valid_thru: string
    card_phone: string
    card_login: string
    card_password: string
    card_pin: string
    card_secret: string
    active: boolean
    busy: boolean
    balance: number
    withdraw_avaliable: boolean
    bank_uid: string
}

export interface ResponseCards {
    status: number
    data?: Cards[]
    message?: string
}
