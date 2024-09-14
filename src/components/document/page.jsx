"use client";

import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import TextCustomize from "../ui/textCustomize";
import TextArea from "antd/es/input/TextArea";
import Input from "antd/es/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodoList, updateTitleDesc } from "@/store/slices/todo";
import axios from "axios";

const Document = ({ handlePage }) => {
  const [input, setInput] = useState();
  const [description, setDescription] = useState();
  const { todoList, currentTodoSelected } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: currentTodoSelected._id }),
    });
    if (response.ok) {
      dispatch(deleteTodo(currentTodoSelected._id));
      handlePage(1);
    }
  };

  const handleUpdate = async () => {
    if (!input && !description) {
      return alert("Fields can't be empty");
    }
    const newdata = {
      _id: currentTodoSelected._id,
      title: input,
      description,
      createdAt: currentTodoSelected.createdAt,
    };
    try {
      const res = await axios.put("/api/todos", newdata);
      const index = todoList.findIndex(
        (ele) => ele._id === currentTodoSelected._id,
      );
      dispatch(updateTitleDesc({ index, data: newdata }));
    } catch (err) {
      alert("Error editing");
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (
        input !== currentTodoSelected?.title ||
        description !== currentTodoSelected?.description
      ) {
        handleUpdate();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input, description]);

  useEffect(() => {
    if (currentTodoSelected) {
      setInput(currentTodoSelected?.title);
      setDescription(currentTodoSelected?.description);
    }
  }, [currentTodoSelected]);

  return (
    <>
      <div
        className="mb-2 flex cursor-pointer gap-1 px-2 font-semibold md:px-1 lg:hidden"
        onClick={() => handlePage(1)}
      >
        <ArrowLeftOutlined style={{ color: "#fff" }} />
        <p className="text-2xl text-slate-200">Back</p>
      </div>
      <div className="mx-4 flex h-full flex-grow flex-col items-start gap-5 rounded-md border-[1px] border-[#e5e3e3] bg-white px-6 py-8 lg:mx-0 lg:px-10">
        <div className="flex w-full justify-between">
          <Input
            className="border-none text-4xl font-semibold text-[#1B1B1B] sm:w-fit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="New Addition"
          />
          <DeleteOutlined
            className="cursor-pointer text-xl hover:text-red-700"
            onClick={handleDelete}
          />
        </div>
        <TextCustomize />
        <div className="h-[1px] w-full bg-black"></div>
        <textarea
          // autoSize={true}
          onChange={(e) => setDescription(e.target.value)}
          // style={{ height: "100%", resize: "none" }}
          placeholder="Type your description here"
          className="h-full w-full resize-none border-none text-base font-light focus-visible:outline-none"
          value={description}
        />
      </div>
    </>
  );
};

export default Document;
