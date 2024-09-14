"use client";

import React, { useState } from "react";
import Image from "next/image";
import { setCurrentTodoSelected, setTodoList } from "@/store/slices/todo";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const TodoBtn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { todoList } = useSelector((state) => state.todo);
  const handleAddTodo = async () => {
    setLoading(true);
    const response = await fetch("api/todos", {
      method: "POST",
    });
    if (response.ok) {
      const newDataTodo = await response.json();
      await dispatch(setTodoList([newDataTodo, ...todoList]));
      await dispatch(setCurrentTodoSelected(newDataTodo));
    } else {
      alert("First Edit existing new Addition");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddTodo}
      disabled={loading}
      className="flex w-32 justify-center gap-2 rounded-lg bg-slate-400 px-4 py-3 text-white hover:bg-slate-700"
    >
      <Image src={"/img/Vector.png"} height={10} width={22} /> ToDo
      {loading && <LoadingOutlined style={{ color: "blue" }} />}
    </button>
  );
};

export default TodoBtn;
