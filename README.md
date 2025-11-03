# Artist Mixer Frontend - React + TypeScript + Vite

A feature-rich web application for creating and managing Spotify playlists based on artist selections.

## Project Structure

This project follows a **feature-first architecture** with clear separation of concerns:

```
src/
  app/
    App.tsx                    # Main app component
    App.css                    # Global styles
    App.test.tsx               # App tests
    providers/                 # App-level context providers
      AuthProvider.tsx         # Authentication context & state
      PlaylistProvider.tsx     # Playlist state management
      SelectedArtistsProvider.tsx  # Selected artists state
    hooks/                     # App-level custom hooks
      usePlaylist.ts
      useSelectedArtists.ts
    index.ts                   # App exports

  features/
    auth/                      # Authentication feature
      components/              # Auth UI components
      services/
        spotifyAuth.ts         # Spotify OAuth & token logic
      hooks/
        useAuth.ts             # Auth context hook
      index.ts

    selectArtists/             # Artist selection feature
      components/
        SelectArtists.tsx      # Main component
        Search/                # Search sub-components
        SelectedArtists/       # Selected artists display
      types/
        SelectedArtists.ts     # Types for selected artists
      index.ts

    generatePlaylist/          # Playlist generation feature
      components/
        Generate.tsx           # Generation UI
        GeneratePlaylistControl.tsx
      services/
        createSpotifyPlaylist.ts  # API calls
      index.ts

    refinePlaylist/            # Playlist refinement feature
      components/
        RefinePlaylist.tsx     # Main refinement UI
        DraftPlaylist.tsx      # Draft playlist display
      index.ts

  shared/                      # Shared utilities & components
    components/
      NavigationBar.tsx        # Step navigation
    constants/
      steps.ts                 # Step definitions
    types/
      playlist.ts              # Playlist & Song interfaces
    utils/
      index.ts                 # Utility functions
    hooks/                     # Shared hooks (future)
    api/                       # API client (future)
```

## State Management

The app uses **React Context + Hooks** for state management:

- **AuthProvider**: Manages authentication state, tokens, and login flow
- **PlaylistProvider**: Manages the current playlist state
- **SelectedArtistsProvider**: Manages the pool of selected artists

All providers are composed at the root level in `App.tsx`.

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of:
import { SelectArtists } from '../../../../features/selectArtists/components/SelectArtists';

// Use:
import { SelectArtists } from '@features/selectArtists';
```

Available aliases:
- `@app/*` → `src/app/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`

## Adding a New Feature

1. Create a new folder under `src/features/<feature-name>`
2. Organize by purpose:
   ```
   src/features/myFeature/
     components/
     services/
     hooks/
     types/
     index.ts  (export public API)
   ```
3. Export public types and components from `index.ts`
4. Use path aliases in imports

## Testing

- Feature-level tests live alongside components
- App-level tests in `src/app/App.test.tsx`
- Tests wrapped with necessary providers

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development & builds
- **Material-UI (MUI)** for component library
- **Spotify Web API** for backend integration

## Configuration

### TypeScript Path Aliases

Configured in `tsconfig.app.json` and `vite.config.ts` for both TS and Vite resolution.

### ESLint

Strict TypeScript linting with:
- `noUnusedLocals` and `noUnusedParameters`
- `strict` mode enabled
- Verbatim module syntax for proper type imports

## Getting Started

```bash
# Install dependencies
yarn install

# Development server
yarn dev

# Build for production
yarn build

# Lint code
yarn lint

# Run tests
yarn test
yarn test:watch
```

## Future Improvements

- Add React Router for multi-page support
- Extract API client layer
- Add shared hooks for common patterns
- Server-side playlist persistence
