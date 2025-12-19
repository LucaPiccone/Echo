import { work_sans } from "../ui/fonts";
import UserForms from "../ui/user_forms";
import { verifySession } from "../lib/dal";


export default async function Echo() {
  const session = await verifySession() 

    return (
        <div >
            <UserForms >
                {/* The h-1000 will be a problem if you decide to make the page scrollable */}
                <div className={`${work_sans.className} font-[400] top-19 border-t absolute h-1000 left-0 w-full bg-gray-300 flex-1`}>
                    hello 
                </div>
            </UserForms>
        </div>
    )
}