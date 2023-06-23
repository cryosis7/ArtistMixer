import { ToTitleCase } from "../../../Utils";
import { MediaItem, SelectedMedia } from "../SelectArtists";

interface SelectedMediaListProps {
  selectedMedia: SelectedMedia;
}

export const SelectedMediaList: React.FC<SelectedMediaListProps> = ({
  selectedMedia,
}) => {
  return (
    <div>
      {Object.entries(selectedMedia).map(([contentType, media]) => {
        return (
          <div key={contentType}>
            <h2>{ToTitleCase(contentType)}</h2>
            <ul>
              {Object.entries(media as MediaItem).map(([id, item]) => {
                return <li key={id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
