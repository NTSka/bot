export type User = {
    id: string;
    username: string;
}

export type List = Array<User>

export type Winners = {
    [key: string]: User;
}

export type Storage = {
    users: User[];
    winners: Winners;
}

export type Top = {
    [key: string]: number
}
