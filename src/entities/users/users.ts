import { UserContructorArgs } from "./userInputData";

export class User {
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor({ firstName, lastName, email, hashedPassword }: UserContructorArgs) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = hashedPassword
    }

    getFirstName() {
        return this.firstName;
    }


    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }


    getPassword() {
        return this.password;
    }
}