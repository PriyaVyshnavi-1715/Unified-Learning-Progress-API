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