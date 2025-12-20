import { ConflictError, InternalServerError, ValidationError } from "@/src/errors/errors";
import { CreateAccountInput } from "./createAccountinputData";
import { DBUserDataAccessObject } from "@/src/db/users/DBUserDataAccessObject";
import bcrypt from "bcryptjs";
import { UserFactory } from "@/src/entities/users/userFactory";
import { createSession } from "@/src/app/lib/session";

export async function CreateAccountInteractor(input: CreateAccountInput) {
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const email = input.email.trim().toLowerCase();
    const password = input.password;
    const confirmPassword = input.confirmPassword;
    // check if fields are empty && check if passwords match
    if (!firstName || !lastName || !email || 
        !password || !confirmPassword) {
        throw new ValidationError("All fields are required.");
    } else if (password !== confirmPassword) {
        throw new ValidationError("Passwords do no match.");
    }
    // check if email already exists in the database
    let existing;
    try {
        existing = await DBUserDataAccessObject.findByEmail(email);
    } catch (err: any) {
        throw new InternalServerError('Unable to check email uniqueness at this time.');
    }
    if (existing && existing.id) {
        throw new ConflictError("This email already exists.");
    }

    // Encrpyt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserFactory().create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        hashedPassword: hashedPassword
    });

    const dbUser = await DBUserDataAccessObject.create(user);
    await createSession(dbUser.id);
}