export type ResponseType<Data, Error> = {
    code?: number;
    status?: string;
    message?: {
        data?: Data;
        message?: string
    };
    errors?: Error;
}