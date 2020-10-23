import {
	TYPE_ONE,
	TYPE_TWO,
  HYDRATE_VIBES,
  UPDATE_CURRENT_VIBE,
  UPDATE_CREATORS,
  UPDATE_SONGS
} from '../types';

// ACTION CREATORS -- functions that return actions.  now can dispatch() from component
export const typeOneAction = (arg) => {
	return {
		type : TYPE_ONE,
		arg
	};
};

export const typeTwoAction = (arg) => {
	return {
		type : TYPE_TWO,
		arg
	};
};

export const hydrateVibes = (vibes) => {
	return {
		type : HYDRATE_VIBES,
		vibes
	};
};

export const updateCurrentVibe = (vibeId) => {
  // console.log('vibeId from action creator', vibeId)
	return {
		type : UPDATE_CURRENT_VIBE,
		vibeId
	};
};

// export const updateCreators = (arg) => {
// 	return {
// 		type : UPDATE_CREATORS,
// 		arg
// 	};
// };

// export const updateSongs = (arg) => {
// 	return {
// 		type : UPDATE_SONGS,
// 		arg
// 	};
// };
