import "./App.css";
import { Login } from "./Components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { SignUp } from "./Components/SignUp";
import { Error } from "./Components/Error";
import { Forgotpassword } from "./Components/ForgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/myApp" exact component={SignUp} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgotPassword" exact component={Forgotpassword} />
          <Route path="/" component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
