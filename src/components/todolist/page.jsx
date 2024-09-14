"use client";

import TodoCard from "../card/page";
import TodoBtn from "../ui/todoBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTodoSelected, setTodoList } from "@/store/slices/todo";
import Search from "../search/search";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Todolist = ({ handlePage }) => {
  const [searchInput, setSearchInput] = useState("");
  const { todoList } = useSelector((state) => state.todo);
  const filteredTodos = useSelector((state) => state?.filteredTodos);
  const dispatch = useDispatch();
  const { data, error, loading } = useSWR("/api/todos", fetcher);

  const handleSearch = (e) => setSearchInput(e);

  useEffect(() => {
    if (data) {
      dispatch(setTodoList(data));
      dispatch(setCurrentTodoSelected(data[0]));
    }
  }, [data]);

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
        {error && <div className="text-2xl text-red-500">Error Laoding </div>}
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
