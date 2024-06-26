import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';

interface SearchProps {
  setSearchResults: React.Dispatch<React.SetStateAction<SpotifyApi.SearchResponse>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}

type ContentTypes = 'artist' | 'album' | 'track';
const contentType: ContentTypes = 'artist';

export const SearchForm: React.FC<SearchProps> = ({ setSearchResults, setIsSearching, token }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  if (token === '') {
    console.error('No token found - Auth test must be failing');
  }

  const isInvalid = () => {
    setHasError(searchTerm === '');
    return searchTerm === '';
  };

  const handleSearch = () => {
    setIsSearching(true);

    const url = 'https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api/spotify/search';
    const params = new URLSearchParams();
    params.set('q', searchTerm);
    params.set('type', contentType);
    params.set('token', token);
    const requestUrl = `${url}?${params.toString()}`;

    fetch(requestUrl, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isInvalid()) {
      return;
    }

    handleSearch();
  };

  const handleChange = (newText: string) => {
    if (hasError && newText !== '') {
      setHasError(false);
    }

    setSearchTerm(newText);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
    >
      <Grid2 container spacing={2} alignItems="center" justifyContent="end">
        <Grid2 sm={8} md={6} lg={4}>
          <TextField
            label="Artist Name"
            variant="outlined"
            value={searchTerm}
            size="small"
            fullWidth
            onChange={(e) => handleChange(e.target.value)}
            error={hasError}
          />
        </Grid2>
        <Grid2>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};
