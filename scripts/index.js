/* global bookmarkList, store, api */
/* eslint-env jquery */
'use strict';
 
$(document).ready(function() {
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
  bookmarkList.render();
});

