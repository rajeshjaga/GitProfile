import { useEffect, useState } from "react";
import "./App.css";
// import Navbar from "./components/Navbar";

function App() {
  const [userName, SetUsername] = useState("");
  const [data, setData] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const baseUri = "https://api.github.com/users/";
    const apiHit = baseUri + userName.toString();
    const rawdata = await fetch(apiHit);

    if (rawdata.status >= 200 || rawdata.status <= 299) {
      const data = await rawdata.json();
      setData(data);
      console.log("Data Successfully fetched");
    } else {
      console.log("failed to fetch data");
    }
  }
  useEffect(() => {
    console.log("refreshed");
  }, [data]);
  return (
    <div className="w-full flex min-h-max h-5/6 flex-col justify-around">
      <h1 className="text-6xl font-bold pt-64 pb-12 w-full text-center">
        GitProfile
      </h1>
      <form action="submit" onSubmit={submit} className="max-w-full mx-auto">
        <input
          type="search"
          id="searchprofile"
          name="search-profile"
          placeholder="Search Profile"
          className="bg-slate-300 min-w-96 rounded-full py-3.5 pl-8 placeholder-gray-600"
          value={userName}
          onChange={(e) => SetUsername(e.target.value)}
        />
      </form>
      <h1>{userName}</h1>
      {data && (
        <>
          <img
            src={data.avatar_url}
            alt={data.login}
            className="rounded-full h-12 w-12"
          />
        </>
      )}
    </div>
  );
}

export default App;
