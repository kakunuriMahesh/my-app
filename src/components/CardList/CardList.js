import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CardList = ({ items, onDelete }) => {
  return (
    <div className="p-10">
      <h1>List of Items</h1>
      <div className="flex flex-wrap h-[70vh] overflow-y-scroll">
        {items.map((eachItem) => (
          <div key={eachItem.id} className="bg-[#e6e1d3] m-1 p-5 h-fit">
            <h1>{eachItem.name}</h1>
            <p>{eachItem.email}</p>
            <p>{eachItem.gender}</p>
            <p>{eachItem.status}</p>
            <RiDeleteBinLine
              className="cursor-pointer"
              onClick={() => onDelete(eachItem.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
