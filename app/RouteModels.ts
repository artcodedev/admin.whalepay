
export interface AuthData {
    login: string
    password: string
}

export interface AuthVerifyToken {
    token: string
}

export interface UpdateBank {
    uid: string
    status: boolean
    token: string
}


export interface UpdateCard {

    token: string
    login: string
    status: boolean
    busy: boolean
    
}
