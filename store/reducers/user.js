const initialState = {
  clips: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLIP':
      return {
        ...state,
        clips: [...state.clips, action.clip.clip],
      };
    case 'DELETE_CLIP':
      return {
        ...state,
        clips: state.clips.filter(clip => clip.url !== action.clip.clip.url),
      };
    default:
      return state;
  }
};

export default reducer;
