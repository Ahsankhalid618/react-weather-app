import "./App.css";
import Maindata from "./Components/Maindata";
import Search from "./Components/Search";
import Time from "./Components/Time";


function App() {
  return (
    <div className="mainpage">
      <div className="searchComp">
        <Search />
      </div>
      <div className="details">
        <Maindata />
      </div>
      <Time />
    </div>
  );
}

export default App;
