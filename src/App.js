import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./App.module.css";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function Hello() {
  function destroyedFn() {
    console.log("I'm Destroyed :(");
  }
  function effectFn() {
    console.log("I'm create :)");
    return destroyedFn;
  }
  useEffect(effectFn, []);

  return <h1>Hello</h1>;
}

function Step1() {
  const [counter, setCounter] = useState(0);
  const onClick = () => {
    setCounter((current) => current + 1);
  };

  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);

  console.log("I run all the time.");

  // 한번만 실행
  useEffect(() => {
    console.log("I run only once.");
  }, []);

  // keyword 변경 시에만 실행
  useEffect(() => {
    if (keyword !== "" && keyword.length > 0) {
      console.log("I run when 'keyword");
    }
  }, [keyword]);

  useEffect(() => {
    console.log("I run when 'counter");
  }, [counter]);

  useEffect(() => {
    console.log("I run when 'keyword', 'counter'");
  }, [counter, keyword]);

  const [showing, setShowing] = useState(false);
  const onShowClick = () => setShowing((prev) => !prev);

  return (
    <div>
      <h1 className={styles.title}>Welcome back React!!</h1>
      <Button text={"continue"} />
      <hr />
      <input
        type="text"
        placeholder="Search here..."
        value={keyword}
        onChange={onChange}
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
      <hr />
      {showing ? <Hello /> : null}
      <button onClick={onShowClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }

    setToDos((prevArr) => [toDo, ...prevArr]);
    setToDo("");
  };

  useEffect(() => {
    console.log(toDos);
  }, [toDos]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>My To Dos({toDos.length})</h1>
        {/* <Step1/> */}
        <input
          type="text"
          placeholder="Write your to do..."
          value={toDo}
          onChange={onChange}
        />
        <button>Add To do</button>
        <hr />
        <ul>
          {toDos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((item) => {
        setCoins(item);
        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div>
      <h1>The Conis! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading</strong> : null}
      {loading ? null : (
        <div>
          <select>
            {coins.map((coin, index) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <ul>
            {coins.map((coin, index) => (
              <li key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


function App() {
  return (
    <div>
      {/* <Step1/>
      <ToDoList/> */}
      {/* <CoinTracker /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:id" element={<Detail/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
