const reducer = (state = {photos:{name:"aravind"},loading:false}, action) => {
    switch (action.type) {
     //  case 'GET_PHOTOS':
     //       return { ...state, loading: true };
      case 'PHOTO_RECEIVED':
           return { ...state, photos: action.json, loading: false }
      default: 
           return state;
    }
   };
   export default reducer;