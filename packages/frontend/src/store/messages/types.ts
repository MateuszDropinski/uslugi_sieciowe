export type Message = {
    key: number;
    value: string;
    mine: boolean;
    toxicity: boolean;
}

export type Messages = {
    [key: string]: Message[]
}
