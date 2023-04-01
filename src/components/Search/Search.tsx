import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { redirect } from "react-router-dom";

interface SearchProps {}

type ContentTypes = "artist" | "album" | "track" | "playlist";
const contentTypes: ContentTypes[] = ["artist", "album", "track", "playlist"];

export const Search: React.FC<SearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [contentType, setContentType] = useState<ContentTypes>("artist");
  const [searchResults, setSearchResults] = useState<string>("");
  const token = localStorage.getItem("token") ?? "";

  if (!token) {
    console.error("No token found - Auth test must be failing");
  }

  return (
    <>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <div>
          <TextField
            label="Search Term"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputLabel id="content-type-label">Content Type</InputLabel>
          <Select
            labelId="content-type-label"
            id="content-type"
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentTypes)}
          >
            {contentTypes.map((type) => (
              <MenuItem key={type} value={type} selected={type === contentType}>
                {type.split("")[0].toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button
          variant="contained"
          onClick={() => {
            const url =
              "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search";
            const params = new URLSearchParams();
            params.set("q", encodeURIComponent(searchTerm));
            params.set("type", encodeURIComponent(contentType));
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
      </form>

      {searchResults ?? <div>{searchResults}</div>}
    </>
  );
};
