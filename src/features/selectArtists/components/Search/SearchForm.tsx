import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/GridLegacy';
import React, { useState } from 'react';
import { useAuth } from '@features/auth/hooks/useAuth';
import { apiGet } from '@shared/utils/apiClient';
import type { ArtistSearchResponse } from '@shared/types/search';

interface SearchProps {
  setSearchResults: React.Dispatch<React.SetStateAction<ArtistSearchResponse | null>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContentTypes = 'artist' | 'album' | 'track';
const contentType: ContentTypes = 'artist';

export const SearchForm: React.FC<SearchProps> = ({ setSearchResults, setIsSearching }) => {
  const { token } = useAuth();
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

    apiGet('/search', token, {
      q: searchTerm,
      type: contentType,
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
