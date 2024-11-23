import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import CardList from "../CardList/CardList";
import { usersContext } from "../../Context/usersContext";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";

const BackDashBoard = () => {
  const {
    filteredItems,
    filterItems,
    form,
    formControl,
    addItems,
    deleteItem,
  } = useContext(usersContext);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    // ==== need to add condition for inCorrect data/form =====
    // if(!errorMessage){
    //   // setForm(true)
    //   console.log("error")
    // }else{
    e.preventDefault();
    addItems(details);
    setDetails({ name: "", email: "", gender: "", status: "" });
    formControl(false);
    // }
  };

  const filterData = (e) => {
    const filterInput = e.target.value.toLowerCase();
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
      <div className="text-center  w-full p-8">
        <h1 className="font-extrabold text-5xl">Log Details here :)</h1>
        <div className="flex items-center justify-center mt-9">
          <div className="relative flex items-center">
            <input
              type="text"
              onChange={filterData}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none"
            />
            <FaSearch className="absolute left-3 text-gray-500" />
          </div>
        </div>
      </div>

      {form && (
        <div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-amber-100 p-8 rounded-md w-[400px]">
            <h1 className="ml-3 font-bold text-md mb-4 flex justify-between">
              Fill the Requested Details to Log:
              <span>
                <ImCross
                  className=" cursor-pointer"
                  onClick={() => formControl(false)}
                />
              </span>
            </h1>
            <form onSubmit={submitData} className="flex flex-col z-50">
              <input
                className="m-3 p-3 rounded-md"
                type="text"
                name="name"
                onChange={handleChange}
                value={details.name}
                placeholder="Name"
                required
              />
              <input
                className="m-3 p-3 rounded-md"
                type="email"
                name="email"
                onChange={handleChange}
                value={details.email}
                placeholder="Email"
                required
              />
              {/* <p className=" text-red-600">
                {errorMessage ? "This email already taken" : ""}
              </p> */}
              {/* <input
                className="m-3 p-3 rounded-md"
                type="text"
                name="gender"
                onChange={handleChange}
                value={details.gender}
                placeholder="Gender"
                required
              /> */}
              <select
                className="m-3 p-3 rounded-md"
                onChange={handleChange}
                name="gender"
                required
              >
                <option value="" disabled selected>
                  select
                </option>
                <option value="male" selected={details.gender === "male"}>
                  male
                </option>
                <option value="female" selected={details.gender === "female"}>
                  female
                </option>
              </select>

              <select
                className="m-3 p-3 rounded-md"
                onChange={handleChange}
                name="status"
                required
              >
                <option value="" disabled selected>
                  select
                </option>
                <option value="active" selected={details.status === "active"}>
                  active
                </option>
                <option
                  value="inactive"
                  selected={details.status === "inactive"}
                >
                  inactive
                </option>
              </select>
              {/* <input
                className="m-3 p-3 rounded-md"
                type="text"
                name="status"
                onChange={handleChange}
                value={details.status}
                placeholder="Status"
                required
              /> */}
              <button
                className="bg-yellow-500 rounded-md py-2 text-lg text-white hover:bg-orange-400 duration-300 mt-4"
                type="submit"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
      {filteredItems.length !== 0 ? (
        <CardList
          items={filteredItems}
          onDelete={handleDeleteItem}
          openForm={formControl}
        />
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default BackDashBoard;
