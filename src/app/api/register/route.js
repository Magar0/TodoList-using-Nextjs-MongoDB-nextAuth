import dbConnect from "@/utils/dbConnect";
import User from "@/utils/models/userSchema";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import Todo from "@/utils/models/todoSchema";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    console.log({ username, email, password });

    await dbConnect();
    const getUser = await User.findOne({ email });

    console.log({ getUser });

    if (getUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 },
      );
    }

    //hashing pswd for security
    const hashedPswd = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPswd,
    });
    await Todo.create({
      userId: newUser._id,
      email,
      title: "",
      description: "",
    });

    //creating token using jsonwebtoken package
    // const token = jwt.sign(
    //   { id: newUser._id, username, email },
    //   process.env.JWT_SECRET,
    //   { expiredIn: "5min" },
    // );

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
