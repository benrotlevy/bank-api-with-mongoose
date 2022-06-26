import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Users } from "./components/users/Users";
import { Home } from "./components/home/Home";
import { Manage } from "./components/manage/Manage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/all-users" component={Users} />
      <Route exact path="/manage-users" component={Manage} />
    </BrowserRouter>
  );
}

export default App;
