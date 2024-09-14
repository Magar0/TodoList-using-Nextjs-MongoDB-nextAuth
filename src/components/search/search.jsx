import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTodos } from "@/store/slices/filtered";

const Search = ({ input, handleInput }) => {
  const [search, setSearch] = useState(false);
  // const [input, setInput] = useState("");
  const { todoList } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleOnBlur = (e) => {
    if (e.target.value.trim() === "") {
      setSearch(false);
      dispatch(setFilteredTodos(todoList));
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (input.trim()) {
        const newArr = todoList.filter((todo) =>
          todo.title.match(new RegExp(input, "i")),
        );
        dispatch(setFilteredTodos(newArr));
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <i className="flex items-center">
      {search ? (
        <div className="relative">
          {/* overlay */}
          {/* <div
            className="fixed left-0 top-0 z-10 h-full w-full bg-gray-500 opacity-0"
            onClick={() => setSearch(false)}
          ></div> */}
          <Input
            className="z-20 bg-white"
            placeholder="search"
            value={input}
            autoFocus
            onChange={(e) => handleInput(e.target.value)}
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <SearchOutlined
          className="text-xl text-white"
          onClick={() => setSearch(true)}
        />
      )}
    </i>
  );
};

export default Search;
