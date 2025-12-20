import { ConflictError, ValidationError } from "@/src/errors/create_account/createAccountErrors";
import { CreateAccountInput } from "./createAccountinputData";
import { DBUserDataAccessObject } from "@/src/db/users/DBUserDataAccessObject";
import bcrypt from "bcryptjs";
import { UserFactory } from "@/src/entities/users/userFactory";
import { createSession } from "@/src/app/lib/session";

export async function CreateAccountInteractor(input: CreateAccountInput) {
    // check if fields are empty && check if passwords match
    if (!input.firstName || !input.lastName || !input.email || 
        !input.password || !input.confirmPassword) {
        throw new ValidationError("All fields are required.");
    } else if (input.password !== input.confirmPassword) {
        throw new ValidationError("Passwords do no match.");
    }
    // check if email already exists in the database
    const existing = await DBUserDataAccessObject.findByEmail(input.email);
    if (existing && existing.id) {
        throw new ConflictError("This email already exists.");
    }

    // Encrpyt Password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new UserFactory().create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        hashedPassword: hashedPassword
    });

    const dbUser = await DBUserDataAccessObject.create(user);
    await createSession(dbUser.id);
}