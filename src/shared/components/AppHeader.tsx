import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useAtom } from 'jotai';
import { appModeAtom } from '@state/appModeAtom';

export const AppHeader = () => {
  const [mode, setMode] = useAtom(appModeAtom);
  
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6">ArtistMixer</Typography>
        <ToggleButtonGroup
          color="standard"
          exclusive
          value={mode}
          onChange={(_, v) => v && setMode(v)}
          aria-label="App mode"
        >
          <ToggleButton value="mixer" aria-label="Mixer">
            Mixer
          </ToggleButton>
          <ToggleButton value="ranker" aria-label="Ranker">
            Ranker
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

