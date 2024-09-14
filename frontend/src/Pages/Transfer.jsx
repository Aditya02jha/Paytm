import axios from "axios";
import React, { useState } from "react";

const Transfer = () => {
  // State for search input, filtered persons, selected person, amount, and error
  const [searchTerm, setSearchTerm] = useState("");
  const [people, setPeople] = useState([]);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [amount, setAmount] = useState("");
  const [resError, setResError] = useState(null);

  // Function to handle search
  const handleSearch = async () => {
    const searchQuery = searchTerm
      ? `filter=${encodeURIComponent(searchTerm)}`
      : "";
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPeople(res.data.users);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  // Function to handle amount submission (Send Button)
  const handleSend = async (personId) => {
    try {
      console.log(`Send amount ${amount} to person with ID: ${personId}`);
  
      // Parse amount to number and validate
      const parseAmount = Number(amount); 
      if (isNaN(parseAmount) || parseAmount <= 0) {
        setError("Please enter a valid amount.");
        return;
      }
  
      // Make the transaction request
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          _id: personId,
          amount: parseAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log("Transaction successful:", res.data);
  
      // Clear the amount and reset selected person
      setAmount("");
      resError(null);  // Clear any previous error
      setSelectedPersonId(null);
    } catch (error) {
      setAmount(""); // Clear amount even on error
      setResError(error.response.data.error || "Transaction failed.");
      console.log({resError});
      console.error("Error during transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Search Bar */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Persons
        </h1>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* List of Persons */}
        <ul className="space-y-4">
          {people.length > 0 ? (
            people.map((person) => (
              <li
                key={person._id}
                onClick={() => setSelectedPersonId(person._id)} // Show input on click
                className="hover:bg-green-300 p-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span>
                    {person.firstname} {person.lastname}
                  </span>

                  {/* Show the input box and send button if this person is selected */}
                  {selectedPersonId === person._id && (
                    <div className="flex items-center ml-4">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-2 border border-gray-400 rounded-md mr-2"
                      />
                              {resError && <p className="text-red-600 m-4 ">{resError}</p>}
                      <button
                        onClick={() => handleSend(person._id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No persons found</p>
          )}
        </ul>

        {/* Display error message */}
      </div>
    </div>
  );
};

export default Transfer;
