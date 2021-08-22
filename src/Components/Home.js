import { useState } from "react";
import { Flip, toast } from "react-toastify";
import { useFetch } from "./useFetch";

export const Home = (props) => {
  const { firstName, email, age } = props.location.state;

  const [count, setCount] = useState(age);
  const { data, loading } = useFetch(`http://numbersapi.com/${count}/trivia`);
  const [hideDiv, setHideDiv] = useState(true);

  return (
    <div>
      <h1>Home Page</h1>
      <div>Welcome {firstName}</div>
      <div>Email: {email}</div>
      <div>Fetch a fact</div>
      <div hidden={hideDiv}>{loading ? "loading..." : data}</div>
      <button
        hidden={!hideDiv}
        onClick={() => {
          setHideDiv(false);
        }}
      >
        GET
      </button>
      <button
        hidden={hideDiv}
        onClick={() => {
          setCount(Number(count) + Number(1));
        }}
      >
        Next age fact
      </button>
      <button
        hidden={hideDiv}
        onClick={() => {
          setHideDiv(true);
        }}
      >
        Hide Fact
      </button>
      <div>
        <button
          onClick={() => {
            toast.info("User logged out", {
              transition: Flip,
              closeOnClick: true,
            });
            localStorage.removeItem(firstName);
            props.history.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
