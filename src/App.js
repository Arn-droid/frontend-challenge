import React, { useState, useEffect } from "react";
import Element from "./components/Element";
import "./App.css";
import TimeAgo from "react-timeago";
function App() {
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState();

  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + (dd - 1);
  let relativeDate = today;

  const query = `q=created:>${relativeDate}`;

  const mainUrl = `https://api.github.com/search/repositories?${query}&sort=stars&order=desc&page=${page}`;

  const fetchRepositories = async () => {
    setLoading(true);
    let url;
    if (query) {
      url = `${mainUrl}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRepositories((oldRepositories) => {
        if (query && page === 1) {
          return data.items;
        } else if (query) {
          return [...oldRepositories, ...data.items];
        } else {
          return [...oldRepositories, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <div className="app">
      {repositories.map((rep, index) => {
        const {name, description, stargazers_count, open_issues_count, pushed_at, } = rep; 
        const { avatar_url, login} = rep.owner
        return (
          <div key={index}>
            <Element
              avatar={avatar_url}
              repositoryName={name}
              repositoryDescription={description}
              numberOfStars={stargazers_count}
              numberOfIssues={open_issues_count}
              timeInterval={<TimeAgo date={pushed_at} />}
              ownerName={login}
            />
          </div>
        );
      })}
      {loading && <h2>Loading...</h2>}
    </div>
  );
}

export default App;
