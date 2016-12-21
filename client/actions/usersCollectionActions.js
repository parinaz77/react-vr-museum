import axios from 'axios';
import store from '../store'

export function getCollectionTitle(userId, art_object) {
  return function(dispatch) {
    axios.get(`https://vr-museum-api.herokuapp.com/v1/users/${userId}/collections/?title=true&art_object=${art_object}`)
      .then((response) => {
        console.log(response, '****************TITLES**********');
        dispatch({type: 'FETCH_COLLECTION_TITLE_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'FETCH_COLLECTION_TITLE_REJECTED', payload: err});
      });
  };
}

// export function closeArtObjectModal() {
//   return {
//     type: 'HIDE_ART_OBJECT_MODAL'
//   };
// }

export function addArtObjectToCollection(userId,art_object_id,collection_id,access_token) {
  return function(dispatch) {
    axios.post(`https://vr-museum-api.herokuapp.com/v1/users/${userId}/collections/${collection_id}/art_objects`, {art_object_id: art_object_id},
      { headers: {
        'Authorization': access_token
      }}
      )

      .then((response) => {
        console.log(response);
        store.dispatch(getCollectionTitle(userId, art_object_id));
        dispatch({type: 'ADD_ART_OBJECT_TO_COLLECTION_FULFILLED', payload: 'Art Object Successfuly added'});
      })
      .catch((err) => {
        dispatch({type: 'ADD_ART_OBJECT_TO_COLLECTION_REJECTED', payload: err});
      });
  };
}
