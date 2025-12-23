import { getUser } from "@/src/app/lib/dal";
import { DBUserDataAccessObject } from "@/src/db/users/DBUserDataAccessObject";

export const ProfileInteractor = {
    async loadProfile() {
        const user = getUser();
        return user;
    },

    //   async function updateProfile(input: UpdateProfileInput) {
    //     // validate + persist
    //   }

    //   async function deleteProfile(userId: string) {
    //     // cleanup
    //   }
}