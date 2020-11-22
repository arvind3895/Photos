const reducer = (state = {photos:{name:"aravind"},loading:false}, action) => {
    switch (action.type) {
     case "PHOTO_LOADING":
          return { ...state, photos: [], loading: true }
     case 'PHOTO_RECEIVED':
           return { ...state, photos: action.data, loading: false }
     case "DELETE_PHOTO":
          var photos= [...state.photos.data];
          alert(`You are about to delete ${JSON.stringify(photos.splice(action.payload.index,1)[0].title)}`);
          return {...state,photos:{data:photos}}
      default: 
          return state;
    }
};
export default reducer;