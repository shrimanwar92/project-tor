export type UserType = {
    [key: string]: string
} | string;

export class CurrentUser {

    static getUser(): {user: UserType, token: string} {
        const user = JSON.parse(localStorage.getItem('user') as string);
        const token = JSON.parse(localStorage.getItem('token') as string);

        return {user, token};
    }

    static save(user: UserType, token: string) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
    }

    static deleteUser() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}