import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPhoto(data) {
    yield put({type: "PHOTO_LOADING"});
   
    try{
        var fetcheddata;
        yield axios.get(`http://jsonplaceholder.typicode.com/photos?_start=${data.payload.page}&_limit=${data.payload.size}`)
            .then(response => {fetcheddata =response});  
        yield put({ type: "PHOTO_RECEIVED", data: fetcheddata });
    }catch (error){}
}
function* actionWatcher() {
     yield takeLatest('GET_PHOTOS', fetchPhoto);
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}