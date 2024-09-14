import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { balanceSelector } from '../Recoil/Atom';
// import { useRecoilValue } from "recoil";

const Home = () => {
  // Get the balance from Recoil
  // const balance = useRecoilValue(balanceSelector);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(""); // For manual balance fetching
  
  const handleLogOut = ()=>{
    localStorage.removeItem("token");
    navigate('/signin')
  }

  const handleTransfer = ()=>{
    navigate('/transfer');
  }

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/account/balance",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );
        setBalance(Math.round(res.data.balance * 100) / 100); // Set manually fetched balance
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]); // Dependency on token, in case token changes

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header Section */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Side - Balance Info */}
          <h1 className="text-xl font-bold text-gray-800">
            Account Balance: 
            <span className="text-blue-500 ml-2">${balance}</span>
          </h1>

          {/* Right Side - Profile Section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">John Doe</span>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-gray-700">
            Here’s a quick overview of your account. You can see your balance above.
          </p>
          <div className="mt-6 space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Transactions
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleTransfer}>
              Transfer Funds
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 MyWebsite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
