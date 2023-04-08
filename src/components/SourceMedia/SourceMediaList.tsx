import { ToTitleCase } from "../../Utils";
import { MediaItem, SourceMedia } from "./SourceMediaContainer";

interface SourceMediaListProps {
  sourceMedia: SourceMedia;
}

export const SourceMediaList: React.FC<SourceMediaListProps> = ({
  sourceMedia,
}) => {
  return (
    <div>
      {Object.entries(sourceMedia).map(([contentType, media]) => {
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
