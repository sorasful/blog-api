export class UserPostInDTO {
    email: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
    password: string;
}

export class UserUpdateInDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
    password: string;
    avatar: Buffer;
}

