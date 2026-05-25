import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Navbar() {

  return (

    <div className="navbar">

      <Link to="/">
        Home
      </Link>

      <Link to="/register">
        Register
      </Link>

      <Link to="/login">
        Login
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>

    </div>

  );

}

function Home() {

  return (

    <div className="container">

      <h1>
        Unified Learning Progress API
      </h1>

      <br />

      <Link to="/register">

        <button>
          Go To Register
        </button>

      </Link>

      <br />
      <br />

      <Link to="/login">

        <button>
          Go To Login
        </button>

      </Link>

      <br />
      <br />

      <Link to="/dashboard">

        <button>
          Go To Dashboard
        </button>

      </Link>

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

      alert("Login Failed");

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

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

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
        "https://unified-learning-progress-api.onrender.com/api/users",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert("Registration Failed");

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

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>

  );

}

function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const logoutUser = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://unified-learning-progress-api.onrender.com/api/auth/register",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDashboardData(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (

    <div className="container">

      <h2>Dashboard</h2>

      <button onClick={logoutUser}>
        Logout
      </button>

      <br />
      <br />

      {

        loading ? (

          <h3>
            Loading Dashboard...
          </h3>

        ) : (

          dashboardData && (

            <div className="card">

              <h3>
                Name: {dashboardData.name}
              </h3>

              <h3>
                Email: {dashboardData.email}
              </h3>

              <h3>
                Role: {dashboardData.role}
              </h3>

              <h3>
                Completion Percentage:
                {" "}
                {dashboardData.completionPercentage}
              </h3>

              <h2>Skills</h2>

              {

                dashboardData.skills.map((skill, index) => (

                  <div key={index}>

                    <p>
                      {skill.skill}
                    </p>

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${skill.progress}%`
                        }}
                      >

                        {skill.progress}%

                      </div>

                    </div>

                  </div>

                ))

              }

              <h2>
                Skills Analytics
              </h2>

              <BarChart
                width={500}
                height={300}
                data={dashboardData.skills}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="skill" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="progress"
                  fill="#007bff"
                />

              </BarChart>

              <h2>
                Weak Areas
              </h2>

              {

                dashboardData.weakAreas.map((area, index) => (

                  <p key={index}>
                    {area}
                  </p>

                ))

              }

              <h2>
                Assignments
              </h2>

              {

                dashboardData.assignments.map((assignment, index) => (

                  <div key={index}>

                    <p>
                      {assignment.title}
                    </p>

                    <p>
                      {assignment.status}
                    </p>

                  </div>

                ))

              }

            </div>

          )

        )

      }

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
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
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