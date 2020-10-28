export interface User {
    id: string;
    username: string;
}

export interface Winners {
    [key: string]: User;
}

export interface Storage {
    users: User[];
    winners: Winners;
}

export interface Top {
    [key: string]: number
}
