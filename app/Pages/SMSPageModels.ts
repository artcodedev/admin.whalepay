

export interface DataNumber {
    phone: string
    date: string
    message: string
}

export interface FetchDataSms {
    status: number
    data: DataNumber[]
}

export interface NumberPhoneData {
    phone: string
}

export interface NumberPhone {
    status: number
    data: NumberPhoneData[]
}