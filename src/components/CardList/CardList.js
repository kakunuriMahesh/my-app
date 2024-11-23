import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  MdOutlineViewModule,
  MdOutlineViewStream,
  MdOutlinePerson,
  MdOutlinePerson2,
  MdOutlineMailOutline,
} from "react-icons/md";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { TbGenderDemigirl, TbGenderDemiboy } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";


const CardList = ({ items, onDelete, openForm }) => {
  const [view, setView] = useState(true);
  let itemsData = [...items].reverse();

  console.log(itemsData);
  
  // console.log(itemsData);
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="flex w-[100%] px-[45px]">
        <h1 className=" font-bold">{items.length} Log items</h1>

        {view ? (
          <p className="font-bold flex items-center ml-auto">
            View:
            <MdOutlineViewModule
              onClick={() => setView(false)}
              className=" to-black text-3xl  cursor-pointer"
            />
          </p>
        ) : (
          <p className="font-bold flex items-center ml-auto">
            View:
            <MdOutlineViewStream
              onClick={() => setView(true)}
              className=" to-black text-3xl  cursor-pointer"
            />
          </p>
        )}
      </div>
      <div
        className={`px-8 w-[100vw] ${
          view ? "flex flex-wrap" : "grid grid-cols"
        }`}
      >
        <IoIosAdd
          className={`${view?"":" fixed bottom-3 right-3 h-[50px] w-[50px] text-slate-800 text-3xl p-2 shadow-lg"} text-[300px] text-slate-300 border-slate-500 h-[190px] w-[300px] mx-3 mt-3 cursor-pointer bg-slate-200  p-4 rounded-lg hover:shadow-lg duration-200`}
          onClick={openForm}
        />
        {itemsData.map((eachItem) => (
          
          <div
            key={eachItem.id}
            className={` bg-[#e6e1d3] m-3 p-5 ${
              view ? "h-[fit] w-[300px]" : ""
            }  overflow-auto rounded-md`}
          >
            {/* {view ? ( */}
            
            <div
              className={`relative group p-4 rounded-lg${
                view ? "" : "flex items-center"
              }`}
            >
              <div className={`${view ? "" : "flex items-center"}`}>
                <h1 className={`flex items-center${view ? "" : " w-fit mr-2"}`}>
                  {eachItem.status === "male" ? (
                    <MdOutlinePerson className="mr-1" />
                  ) : (
                    <MdOutlinePerson2 className="mr-1" />
                  )}{" "}
                  {eachItem.name}
                </h1>
                <p
                  className={`flex items-center w-[100px] overflow-hidden${
                    view ? "" : " w-fit mr-2"
                  }`}
                >
                  <MdOutlineMailOutline className="mr-1" /> {eachItem.email}
                </p>
                <p className={`flex items-center${view ? "" : " w-fit mr-2"}`}>
                  <span>
                    {eachItem.gender === "male" ? (
                      <TbGenderDemiboy className="mr-1" />
                    ) : (
                      <TbGenderDemigirl className="mr-1" />
                    )}{" "}
                  </span>
                  {eachItem.gender}
                </p>
                <p className={`flex items-center${view ? "" : " w-fit mr-2"}`}>
                  {eachItem.name === "inactive" ? (
                    <HiOutlineExclamationCircle className="mr-1" />
                  ) : (
                    <HiOutlineCheckCircle className="mr-1" />
                  )}{" "}
                  {eachItem.status}
                </p>
              </div>
              <div className="flex justify-end ">
                <RiDeleteBinLine
                  className="cursor-pointer absolute right-2 bottom-2 w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => onDelete(eachItem.id)}
                />
              </div>
            </div>
            {/* ) : ( */}
            {/* <div className="relative group p-1 rounded-lg flex items-center w-[100%] justify-between">
                <h1>
                  {eachItem.name}, {eachItem.gender}, {eachItem.status}
                </h1>
                <RiDeleteBinLine
                  className="cursor-pointer absolute right-2 bottom-2 w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => onDelete(eachItem.id)}
                />
              </div> */}
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
