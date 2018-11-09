/* eslint-env jquery */
'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function() {
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/randycole';

  function getItems(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
     

  }

  function createItem(newItemObject, callbackSuccess, callbackError) {
  
    //for item name
    const newItem = JSON.stringify(newItemObject);

    console.log('>>> new item data: ', newItemObject);
 
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callbackSuccess,
      error: callbackError
    });
  
  }

  function updateItem(id,updateData,callbackSuccess, callbackError){

    const stringifiedUpdateData = JSON.stringify(updateData);

    //testing
    console.log('--> to go to seerver: ',updateData);

    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      //url: `${BASE_URL}/items/${id}`,
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
      //url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callbackSuccess,
      error: callbackError
    });
  }

  return {getItems, createItem, updateItem, deleteItem};
}());
