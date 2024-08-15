import { connect } from "../../../../dbconfig/dbconfig"
import User from "../../../../models/user"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            name: user.username
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = decoded.id;

            const user = await User.find({ _id: userId });
            console.log("User found with : ", user);

            return NextResponse.json({
                message: 'User fetched successfully',
                success: true,
                user
            });
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during fetching User:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}