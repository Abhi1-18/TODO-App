import { useEffect, useRef, useState } from "react";
import TaskCard from "./TaskCard";
import Logo from "../assets/Logo.png";

function Bar() {
  const inputRef = useRef(null);
  const inputRefdes = useRef(null);


  let [singleTask, setSingleTask] = useState({ task: "", desc: "",time:"" });
  let [oneTodo, setOneTodo] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    if(inputRef.current.value ==''){
      alert("Add Task name ");
      return;
    }
    if(inputRefdes.current.value == ''){
      alert("Add a description");
      return;
    }
    singleTask.time = new Date().toLocaleDateString();
    console.log(singleTask);
    setOneTodo((prevTodo) => [...prevTodo, singleTask]);
    saveToLocalStorage([...oneTodo, singleTask]);
    inputRef.current.value ='';
    inputRefdes.current.value = '';
  }

  function saveToLocalStorage(todos) {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }
  function getTodosFromLocalStroage() {
    let data = JSON.parse(localStorage.getItem("Todos")) || [];
    setOneTodo(data);
  }
  useEffect(() => {
    getTodosFromLocalStroage();
  }, []);

  function deleteTodo(i) {
    let newArr = [...oneTodo];
    newArr.splice(i,1);
    saveToLocalStorage(newArr);
    setOneTodo(newArr)
  }

  return (
    <>
      <div className="w-screen mt-2 flex flex-col gap-3 ml-4 items-center">
        <input
          type="text"
          placeholder="Enter Task"
          ref={inputRef}
          onChange={(e) =>
            setSingleTask((prevTask) => ({ ...prevTask, task: e.target.value }))
          }
          className="border-solid border-black border-[1px] lg:w-[30%] h-[40px] p-2 rounded-md w-[60%]"
        />
        <input
          type="text"
          placeholder="Add description for task"
          ref={inputRefdes}
          onChange={(e) =>
            setSingleTask((prevTask) => ({ ...prevTask, desc: e.target.value }))
          }
          className="border-solid border-black border-[1px] lg:w-[30%] h-[40px] p-2 rounded-md w-[60%]"
        />
        <button
          onClick={handleSubmit}
          className="w-[20%] border-solid border-black border-[1px] h-12 rounded-md lg:ml-6 bg-slate-400 hover:bg-slate-600"
        >
          Add Task
        </button>
      </div>

      <div className="w-screen h-[400px]  mt-5 flex flex-wrap items-center gap-4 justify-center">
        {oneTodo.map((data, i) => (
          <div className="w-[20rem]  h-[20rem] ml-3 rounded  shadow-xl" key={i}>
            <div className="flex flex-col gap-2 ">
              <div className="w-[100%] h-[60px] bg-slate-700 flex justify-between items-center">
                <img src={Logo} alt="Logo" className="h-[60px] w-[30%]" />
                <p className="text-slate-300 mr-3">Todo No : {i + 1}</p>
              </div>
              <h2 className="w-[100%] h-[70px] p-1 border-solid border-b border-black">
                <span className="text-gray-400">Task Title : </span>
                {data.task}
              </h2>
              <p className="w-[100%] h-[105px] p-1">
                {" "}
                <span className="text-gray-400">Task Description : </span>
                {data.desc}
              </p>

              <div className="w-[100%] h-[60px] bg-slate-700 flex items-end justify-between ">
                <p className="text-white p-2">Date : {data.time}</p>
                <button
                  className="w-14 h-6 rounded bg-white mr-1 mb-2"
                  onClick={() => deleteTodo(i)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bar;
