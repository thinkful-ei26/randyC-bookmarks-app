/* global */
'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const addItem = function(item) {

    //should be set to false eventually for startup
    //add expandedView key and sets it to true
    item.expandedView = false;

    //add key for user to filer by rating
    //item.userFilter = '1';

    //add key for eror handling mode
    //item.errorMode = null;

    //Item being EDITED key could be added here...

    this.items.push(item);

  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  // const findAndToggleChecked = function(id) {
  //   const item = this.findById(id);
  //   item.checked = !item.checked;
  // };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  //update stuff in items
  const findAndUpdate = function(id, newData){

    const item = this.findById(id);
 
    Object.assign(item,newData); 

  };



  //update stuff in store
  /*
  const findAndUpdateStore = function(newData){

    const storeUpdate = 
 
    Object.assign(item,newData); 

  };
*/
  
  // const findAndUpdateName = function(id, name) {
  //   try {
  //     Item.validateName(name);
  //     const item = this.findById(id);
  //     item.name = name;
  //   } catch(e) {
  //     console.log('Cannot update name: ' + e.message);
  //   }
  // };

  const toggleCheckedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };

  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };



  //Added to store object:
  // viewMode
  // userSort
  // errorMode
   

  return {
    items: [],
    viewMode: 'first_mode',
    userSort: 'no sort',
    errorMode: false,

    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleCheckedFilter,
    setSearchTerm,
    setItemIsEditing,
  };
  
}());
