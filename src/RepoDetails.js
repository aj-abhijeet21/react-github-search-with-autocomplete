import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RepoDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const [details, setDetails] = useState();
  useEffect(() => {
    const getRepoDetails = async () => {
      const url = `https://api.github.com/repos/${data.owner}/${data.repo}`;
      const result = await fetch(url);
      const response = await result.json();
      setDetails({
        name: response.name,
        description: response.description,
        owner: response.owner.login,
        language: response.language,
        licenses: response.licenses,
        forks: response.forks,
        watchers: response.watchers,
        created_at: response.created_at,
        teams_url: response.teams_url,
      });
    };
    getRepoDetails();
  }, []);

  return (
    <>
      {details !== undefined && (
        <div>
          <h2>RepoDetails</h2>
          <h5>Name: {details.name}</h5>
          <h5>Description: {details.description}</h5>
          <h5>Owner: {details.owner}</h5>
          <h5>Language: {details.language}</h5>
          <h5>Licenses: {details.licenses}</h5>
          <h5>Forks: {details.forks}</h5>
          <h5>Watchers: {details.watchers}</h5>
          <h5>Created at: {details.created_at}</h5>
          <h5>Organization Url: {details.teams_url}</h5>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}

export default RepoDetails;
