import { atomWithStorage } from 'jotai/utils';

export type AppMode = 'mixer' | 'ranker';

export const appModeAtom = atomWithStorage<AppMode>('appMode', 'mixer');

