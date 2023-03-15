import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestion] = useState(false);
  useEffect(() => {
    if (query !== "") {
      setTimeout(() => {
        getData(query);
      }, 300);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const getData = async (query) => {
    const url = `https://api.github.com/search/repositories?q={${query}}{&page,per_page,sort,order}`;
    const result = await fetch(url);
    const response = await result.json();
    const data = response?.items?.slice(0, 5);
    const arr = [];
    const sugg = [];
    data.forEach((element) => {
      arr.push({
        name: element.name,
        description: element.description,
        owner: element.owner.login,
      });
      sugg.push(element.name);
    });
    setData(arr);
    setSuggestions(sugg);
  };

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestion(true);
        }}
        onKeyPress={(e) => {
          if (e.which === 13) {
            setQuery(e.target.value);
            setShowSuggestion(false);
          }
        }}
        value={query}
      />

      {/* show autocomplete suggestions */}

      {suggestions.length > 0 &&
        showSuggestions &&
        suggestions.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setQuery(item);
              setShowSuggestion(false);
            }}
            style={{
              backgroundColor: "gray",
            }}
          >
            {" "}
            {item}{" "}
          </div>
        ))}

      {/* show search results */}

      {!showSuggestions &&
        data.length > 0 &&
        data.map((repo, index) => (
          <Link
            to="/repoDetails"
            state={{ data: { owner: repo.owner, repo: repo.name } }}
          >
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: "12px",
                backgroundColor: "gray",
                borderRadius: 25,
                padding: "16px",
              }}
              onClick={() => {
                setQuery(repo.name);
                setShowSuggestion(false);
              }}
            >
              <div>Name: {repo.name}</div>
              <div>Description :{repo.description}</div>
              <div>Owner: {repo.owner}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Home;
