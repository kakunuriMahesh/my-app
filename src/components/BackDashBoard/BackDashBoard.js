import React, { useContext, useState } from "react";
import CardList from "../CardList/CardList";
import { FaPlusSquare } from "react-icons/fa";
import { usersContext } from "../../Context/usersContext";

const BackDashBoard = () => {
  const { filteredItems, filterItems, addItems, deleteItem } =
    useContext(usersContext);
  const [form, setForm] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const addDetails = () => {
    setForm(!form);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();
    // const newDetails = { ...details, id: Date.now() };
    // const updatedItems = [...items, newDetails];
    addItems(details);
    // setFilteredItems(updatedItems);
    setDetails({ name: "", email: "", gender: "", status: "" });
    setForm(false);
  };

  const filterData = (e) => {
    const filterInput = e.target.value.toLowerCase();
    // const filtered = items.filter((eachItem) =>
    //   eachItem.name.toLowerCase().includes(filterInput)
    // );
    filterItems(filterInput);
  };

  const handleDeleteItem = (id) => {
    console.log(id);
    deleteItem(id);
    // fetch(`/deleteuser/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("User deleted:", data);
    //     const updatedItems = items.filter((eachItem) => eachItem.id !== id);
    //     setItems(updatedItems);
    //     setFilteredItems(updatedItems);
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting item:", error);
    //   });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="text-center">
        <h1>Api in backend</h1>
        <div className="flex items-center justify-center">
          <input
            onChange={filterData}
            type="search"
            className="outline rounded-md px-4 py-2"
            placeholder="Search"
          />
          <FaPlusSquare
            className=" text-2xl cursor-pointer"
            onClick={addDetails}
          />
        </div>
      </div>

      {form && (
        <div className="p-5">
          <form onSubmit={submitData}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={details.name}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={details.email}
              placeholder="Email"
            />
            <input
              type="text"
              name="gender"
              onChange={handleChange}
              value={details.gender}
              placeholder="Gender"
            />
            <input
              type="text"
              name="status"
              onChange={handleChange}
              value={details.status}
              placeholder="Status"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      {/* {console.log(filteredItems.length)} */}
      {filteredItems.length !== 0 ? (
        <CardList items={filteredItems} onDelete={handleDeleteItem} />
      ) : (
        <div className="h-[80vh] flex items-center">
          <p>Loading...</p>
        </div>
      )}
      {/* <CardList items={filteredItems} onDelete={handleDeleteItem} /> */}
    </div>
  );
};

export default BackDashBoard;
