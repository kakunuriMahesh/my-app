import React, { createContext, useEffect, useState } from "react";

export const usersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  }, []);

  // add
  const addItems = (newItem) => {
    console.log(newItem);
    
    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer b6c0e957c5b2abcbde45bc63d0437652420486b559c6a5abdec17006cd9e7f84",
      },

      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if(response.ok){
            console.log("response ok")
            return response.json()
        }else{
            console.log(response);
            
        }
    })
      .then((data) => {
        console.log(data)
        const updatedItems = [...items, {...data}];
        setItems(updatedItems);
        setFilteredItems(updatedItems);
      })
      .catch((error)=>{
        console.log(error)
      })

    // .then((response)=>response.json())
    // .then((data))
  };

  

  // delete
  const deleteItem = (id) => {
    fetch(`http://localhost:5000/deleteuser/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        return response.json();
      })
      .then(() => {
        const updatedItems = items.filter((eachItem) => eachItem.id !== id);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // filter
  const filterItems = (searchInput) => {
    const lowerCaseInput = searchInput.toLowerCase();
    const filtered = items.filter((eachItem) =>
      eachItem.name.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredItems(filtered);
  };

  return (
    <usersContext.Provider
      value={{
        items,
        filteredItems,
        filterItems,
        addItems,
        deleteItem,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};
