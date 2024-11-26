import React, { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export const usersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [manualFilter, setManualFilter] = useState([]);
  const [form, setForm] = useState(false);

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
        setManualFilter(data);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
  }, []);

  const formControl = () => {
    setForm(!form);
  };

  // add
  const addItems = (newItem) => {
    console.log(newItem);

    fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer b6c0e957c5b2abcbde45bc63d0437652420486b559c6a5abdec17006cd9e7f84",
      },

      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          console.log("response ok");
          toast.success("Your Loged In ✅");
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        console.log([data]);
        const updatedItems = [{ ...data }, ...items];
        console.log(updatedItems);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
        setManualFilter(updatedItems);
      })
      .catch((error) => {
        console.log(error);
      });

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
        setManualFilter(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // view

  // filter
  const filterItems = (searchInput) => {
    const lowerCaseInput = searchInput.toLowerCase();
    const filtered = items.filter((eachItem) =>
      eachItem.name.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredItems(filtered);
  };

  const appliedFilter = (initialFilters) => {
    console.log(initialFilters);
    const appliedFilterData = items.filter((each) =>
      Object.keys(initialFilters).every(
        (key) => each[key] === initialFilters[key]
      )
    );
    console.log(appliedFilterData);
    setManualFilter(appliedFilterData);
    setFilteredItems(appliedFilterData);
  };

  return (
    <usersContext.Provider
      value={{
        items,
        filteredItems,
        manualFilter,
        form,
        formControl,
        filterItems,
        appliedFilter,
        addItems,
        deleteItem,
      }}
    >
      {children}
    </usersContext.Provider>
  );
};
