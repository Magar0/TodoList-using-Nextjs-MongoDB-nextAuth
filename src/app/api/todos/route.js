import dbConnect from "@/utils/dbConnect";
import Todo from "@/utils/models/todoSchema";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//get all todos of specific user
export async function GET(req) {
  try {
    const { _id: userId } = await getToken({ req });
    await dbConnect();
    // const result = await Todo.find({ userId });
    const result = await Todo.find({ userId })
      .sort({ createdAt: -1 })
      .allowDiskUse(true); //to get in reverse order
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error occured" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { _id: userId, email } = await getToken({ req });
    const result = await Todo.findOne({ userId, title: "" });
    if (result) {
      return NextResponse.json(
        { message: "First edit existing new task" },
        { status: 404 },
      );
    }
    const response = await Todo.create({
      userId,
      email,
      title: "",
      description: "",
    });
    return NextResponse.json(response, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error occured" }, { status: 500 });
  }
}

export async function PUT(req, res) {
  try {
    const { _id, title, description } = await req.json();
    console.log({ _id, title, description });

    const result = await Todo.findById(_id);
    if (!result) {
      return NextResponse.json({ message: "Doesn't exist" }, { status: 404 });
    }
    await Todo.findByIdAndUpdate(_id, { title, description });
    return NextResponse.json(
      { message: "Updated Successful" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error occured" }, { status: 500 });
  }
}

export async function DELETE(req, res) {
  try {
    const { id } = await req.json();
    const result = await Todo.findById(id);
    if (!result) {
      return NextResponse.json({ message: "Doesn't exist" }, { status: 404 });
    }
    await Todo.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted Successful" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error occured" }, { status: 500 });
  }
}
