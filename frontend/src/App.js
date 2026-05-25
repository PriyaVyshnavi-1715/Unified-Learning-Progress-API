import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom";

import {
  useState
} from "react";

import axios from "axios";

function Navbar() {

  return (

    <div className="navbar">

      <Link to="/">Home</Link>

      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>

      <Link to="/dashboard">Dashboard</Link>

    </div>

  );

}

function Home() {

  return (

    <div className="container">

      <h1>
        Unified Learning Progress API
      </h1>

      <h3>
        Features
      </h3>

      <ul>

        <li>
          LMS Progress Tracking
        </li>

        <li>
          Coding Skill Analytics
        </li>

        <li>
          Weak Area Detection
        </li>

        <li>
          Assignment Monitoring
        </li>

        <li>
          Personalized Recommendations
        </li>

      </ul>

      <h3>
        Technologies Used
      </h3>

      <ul>

        <li>
          React JS
        </li>

        <li>
          Node JS
        </li>

        <li>
          Express JS
        </li>

        <li>
          MongoDB
        </li>

        <li>
          JWT Authentication
        </li>

      </ul>

    </div>

  );

}

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {

    try {

      await axios.post(
        "https://unified-learning-progress-api.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error.response.data);

      alert(error.response.data.message);

    }

  };

  return (

    <div className="container">

      <h2>Register Page</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>

  );

}

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "https://unified-learning-progress-api.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error.response.data);

      alert(error.response.data.message);

    }

  };

  return (

    <div className="container">

      <h2>Login Page</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>
        Login
      </button>

    </div>

  );

}

function Dashboard() {

  const token = localStorage.getItem("token");

  return (

    <div className="container">

      <h1>Dashboard</h1>

      <p>
        Login Successful
      </p>

      <p>
        JWT Token Stored
      </p>

      <textarea
        rows="10"
        cols="50"
        value={token}
        readOnly
      />

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;