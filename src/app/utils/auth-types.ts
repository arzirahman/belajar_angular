export type LoginType = {
    email: string;
    password: string;
}

export type LoginErrorType = {
    message?: string;
    email?: string;
    password?: string;
}

export type LoginDataType = {
    accessToken?: string;
}