import { useEffect, useState } from "react";
import "./App.css";
// import Navbar from "./components/Navbar";

interface user {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}
async function make_api_call(userName: string) {
  const baseUri = "https://api.github.com/users/";
  const apiHit = baseUri + userName.toString();
  const rawdata = await fetch(apiHit);

  if (rawdata.status >= 200 || rawdata.status <= 299) {
    const data = await rawdata.json();
    console.log("Data Successfully fetched");
    return data as user;
  } else {
    console.log("failed to fetch data");
  }
}
function App() {
  const [userName, SetUsername] = useState("");
  const [data, setData] = useState<user | null>(null);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = await make_api_call(userName);
    setData(result);
  }
  useEffect(() => {
    console.log("refreshed");
  }, [data]);
  return (
    <div className="w-full flex min-h-max h-3/6 flex-col justify-around">
      <h1 className="text-6xl font-bold pt-24 pb-12 w-full text-center">
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
      {data && (
        <>
          <div className="flex justify-between mx-auto py-20 items-start">
            <img
              src={data.avatar_url}
              alt={data.login}
              className="rounded-xl h-auto w-auto"
            />
            <div className="text-left ml-10 min-w-96">
              <h1 className="text-4xl font-bold mb-2">
                {data.login.toUpperCase()}
              </h1>
              <p>Profile_Name : {data.name}</p>
              <a href={data.blog} target="_blank" className="block underline">
                Profile_Blog
              </a>
              <a href={data.html_url} target="_blank" className="block underline">
                Profile_URL
              </a>
              <p>Location : {data.location}</p>
              <p>Follower : {data.followers}</p>
              <p>Following : {data.following}</p>
              <p>Number_Repos : {data.public_repos}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
