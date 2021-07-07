import './App.css';
import Input from "./components/Input/input"
import Map from "./components/Map/map"
import Chart from "./components/Chart/chart";

import { useSelector } from 'react-redux';

function App() {
  const country = useSelector(state=>state.country.country);
  const candidates = useSelector(state=>state.country.candidates);

  console.log("candidates>>>>", candidates);
  
  return (
    <div className="App container d-flex flex-column justify-content-around mt-5">
        <Input />
        <div className="my-3">
        <Map data={country}  />
        <Chart 
          data={candidates}
          title="Population Analytics"
          value="population"
          category='name'
        />
        </div>
    </div>
  );
}

export default App;
