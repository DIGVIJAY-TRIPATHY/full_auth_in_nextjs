import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        //check the required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 },
            );
        }

        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 },
            );
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser,
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
}
