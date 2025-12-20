import { UserContructorArgs } from "./userInputData"
import { User } from "./users"

export class UserFactory {
    public create({ firstName, lastName, email, hashedPassword }: UserContructorArgs) {
        return new User({firstName, lastName, email, hashedPassword})
    }
}