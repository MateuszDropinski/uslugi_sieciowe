export type Message = {
    key: string;
    value: string;
    mine: boolean;
}

export type Messages = {
    [key: string]: Message[]
}
