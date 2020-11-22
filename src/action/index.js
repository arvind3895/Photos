export const getPhotos = (payload) => ({
    type: 'GET_PHOTOS',
    payload
});
export const deletePhoto = (payload) => ({
    type:"DELETE_PHOTO",
    payload
})