import { ProfileInteractor } from "@/src/use_cases/profile/profileInteractor";
import { NextResponse } from "next/server";

export async function GET() {

    const profileData = await ProfileInteractor.loadProfile();
    
    return NextResponse.json({ message: 'success' }, { status: 201 });
}