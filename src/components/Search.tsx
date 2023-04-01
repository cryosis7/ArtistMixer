import Button from "@mui/material/Button";
import { useState } from "react";
import { redirect } from "react-router-dom";

interface SearchProps {
  token: string;
}

export const Search: React.FC<SearchProps> = ({ token }) => {
  const [searchResults, setSearchResults] = useState<string>("");

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          const url =
            "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search";
          const params = new URLSearchParams();
          params.set("q", "NF");
          params.set("type", "artist");
          params.set("token", token);
          const requestUrl = `${url}?${params.toString()}`;

          fetch(requestUrl, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setSearchResults(JSON.stringify(data));
              console.log(data);
            })
            .catch((err) => {
              // If unauthorized, redirect to login
              if (err.status === 401) {
                redirect("/login");
              }
            });
        }}
      >
        Search
      </Button>
      {searchResults ?? <div>{searchResults}</div>}
    </>
  );
};
