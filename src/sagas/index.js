import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPhoto() {
//   const json = yield fetch('https://newsapi.org/v1/articles? 
//         source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
//         .then(response => response.json(), );  
console.log("trying to fetch photos using the sagas");
var json;
yield axios.get("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5").then(response => {json =response});  
  yield put({ type: "PHOTO_RECEIVED", json: json });
}
function* actionWatcher() {
    console.log("action wacters");
     yield takeLatest('GET_PHOTOS', fetchPhoto)
}
export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}