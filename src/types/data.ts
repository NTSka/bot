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
    morningWinners: Winners
    eveningWinners: Winners
    specialWinners: User[]
}

export interface Top {
    [key: string]: number
}
