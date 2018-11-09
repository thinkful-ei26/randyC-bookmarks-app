/* eslint-env jquery */
'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  
  //API base url
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/randycole';

  //GET
  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
     
  }

  //POST
  function createItem(newItemObject, callbackSuccess, callbackError) {
  
    const newItem = JSON.stringify(newItemObject);
  
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callbackSuccess,
      error: callbackError
    });
  
  }

  //PATCH
  function updateItem(id,updateData,callbackSuccess, callbackError){

    const stringifiedUpdateData = JSON.stringify(updateData);

    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: stringifiedUpdateData,
      success: callbackSuccess,
      error: callbackError
    });
  }

  function deleteItem(id, callbackSuccess, callbackError) {

    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callbackSuccess,
      error: callbackError
    });
  }

  return {getItems, createItem, updateItem, deleteItem};
}());
