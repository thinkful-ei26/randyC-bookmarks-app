/* global bookmarkList, shoppingList, store, Item, api, api_test */
/* eslint-env jquery */
'use strict';
/*
$(document).ready(function() {
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });
  shoppingList.bindEventListeners();
  shoppingList.render();
});
*/


$(document).ready(function() {
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
  bookmarkList.render();
});
