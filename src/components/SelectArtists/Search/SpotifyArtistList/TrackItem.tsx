import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

interface TrackItemProps {
  track: SpotifyApi.TrackObjectFull;
  addTrack: (track: SpotifyApi.TrackObjectFull) => void;
}

/**
 * A list item for a track
 * @param track The track to display
 * @param addTrack A callback to add the track to the playlist
 * @returns A list item for the track
 */
export const TrackItem: React.FC<TrackItemProps> = ({ track, addTrack }) => {
  return (
    <ListItemButton onClick={() => addTrack({ ...track, type: 'track' })}>
      {track.album.images && <Avatar src={track.album.images[0].url} />}
      <ListItemText
        inset={track.album.images.length === 0}
        primary={track.name}
        secondary={track.artists.map((artist) => artist.name).join(', ')}
        sx={{ paddingLeft: '1em' }}
      />
      <ListItemSecondaryAction>
        <IconButton color="primary" aria-label="Add Song">
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};
