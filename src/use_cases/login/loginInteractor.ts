import { InternalServerError, ValidationError } from "@/src/errors/errors";
import { LoginInputData } from "./loginInputData";
import bcrypt from "bcryptjs";
import { DBUserDataAccessObject } from "@/src/db/users/DBUserDataAccessObject";
import { createSession } from "@/src/app/lib/session";
import { NextResponse } from 'next/server';

export async function LoginInteractor(input: LoginInputData, res: NextResponse) {
    const email = input.email.trim().toLowerCase();
    const password = input.password;
    if (!email || !password) {
        throw new ValidationError("All fields are required.");
    }

    let dbUser;
    try {
        dbUser = await DBUserDataAccessObject.findByEmail(email);
    } catch (e) {
        throw new InternalServerError("Unable to find email at this time.")
    }

    const isValid = await bcrypt.compare(password, dbUser.password_hash);   
    if (!isValid) {
        throw new ValidationError("Incorrect password");
    } 

    await createSession(dbUser.id, res);
}
