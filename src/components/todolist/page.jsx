"use client";

import TodoCard from "../card/page";
import TodoBtn from "../ui/todoBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTodoSelected, setTodoList } from "@/store/slices/todo";
import Search from "../search/search";

const Todolist = ({ handlePage }) => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { todoList } = useSelector((state) => state.todo);
  const filteredTodos = useSelector((state) => state?.filteredTodos);
  const dispatch = useDispatch();

  const handleSearch = (e) => setSearchInput(e);
  const fetchData = async () => {
    setLoading(true);
    const result = await fetch("/api/todos");
    const data = await result.json();
    dispatch(setTodoList(data));
    dispatch(setCurrentTodoSelected(data[0]));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <TodoBtn />
        <Search input={searchInput} handleInput={handleSearch} />
      </div>
      <div className="card-list flex h-full flex-col gap-[15px] overflow-auto pe-2 sm:w-[400px]">
        {loading && (
          <div className="flex w-full justify-center">
            <div className="loader mt-5"></div>
          </div>
        )}
        {!searchInput &&
          todoList.length > 0 &&
          todoList.map((data, ind) => (
            <TodoCard data={data} key={ind} handlePage={handlePage} />
          ))}
        {searchInput &&
          filteredTodos.length > 0 &&
          filteredTodos.map((data, ind) => (
            <TodoCard data={data} key={ind} handlePage={handlePage} />
          ))}
      </div>
    </>
  );
};

export default Todolist;
