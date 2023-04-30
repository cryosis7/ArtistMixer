import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { redirect } from "react-router-dom";

interface SearchProps {
  setSearchResults: React.Dispatch<
    React.SetStateAction<SpotifyApi.SearchResponse>
  >;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContentTypes = "artist" | "album" | "track";
const contentTypes: ContentTypes[] = ["artist", "album", "track"];

export const SearchForm: React.FC<SearchProps> = ({
  setSearchResults,
  setIsSearching,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [contentType, setContentType] = useState<ContentTypes>("artist");
  const token = localStorage.getItem("token") ?? "";

  if (!token) {
    console.error("No token found - Auth test must be failing");
  }

  const handleSearch = () => {
    setIsSearching(true);

    const url =
      "https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search";
    const params = new URLSearchParams();
    params.set("q", searchTerm);
    params.set("type", contentType);
    params.set("token", token);
    const requestUrl = `${url}?${params.toString()}`;

    fetch(requestUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      })
      .catch((err) => {
        // If unauthorized, redirect to login
        if (err.status === 401) {
          redirect("/login");
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
    >
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

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
};
