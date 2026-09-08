import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).
        select("-password");

        return NextResponse.json({
            message: "User fetched successfully",
            data: user,
            status: 200 
        });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}