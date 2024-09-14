Transfer App
A simple React app for user authentication, searching people, and transferring funds. Built with a Node.js/Express backend and MongoDB.

**Features**
**Sign Up / Sign In:** JWT-based authentication

**Search Users:** Search by first/last name

**Transfer Money:** Input amount and transfer to selected user

**Error Handling:** Displays appropriate error messages

add this is .env
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

**Start the app:**
cd frontend && npm run start    # For React frontend
cd backend && npm run dev   # For backend
**Usage**
Sign Up / Sign In to authenticate
Search for users
Transfer funds to other users
**API Endpoints**
/api/v1/auth/signup - Register new user
/api/v1/auth/signin - Log in user
/api/v1/user/bulk - Search users
/api/v1/account/transfer - Transfer funds
