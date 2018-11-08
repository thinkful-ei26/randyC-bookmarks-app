/* global store, api, api_test $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){
 
  function generateItemElement(item) {


    //VIEW MODES

    //COMPACT MODE

    //EXPANDED MODE

    //EDIT MODE

    //ADD MODE





    console.log(api_test.helloThere);//testing alternate module

    const checkedClass = item.checked ? 'shopping-item__checked' : '';
    const editBtnStatus = item.checked ? 'disabled' : '';

    


    //REF let itemTitle = `<span class="shopping-item ${checkedClass}">${item.name}</span>`;
    let itemTitle = `<span class="shopping-item ${checkedClass}">${item.title}</span>`;

    let itemUrl = `<span class="shopping-item ${checkedClass}">${item.url}</span>`;


    // >>>  COMPACT MODE -- itemView: 'compact'
    //TITLE
    //RATING

    // >>> EXPANDED MODE -- itemView: 'expanded'
    //TITLE
    //DESCRIPTION
    //URL
    //RATING

 

    if (item.isEditing) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="shopping-item type="text" value="${item.title}" />
        </form>
      `;
    }
  
    return `
       
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        ${itemUrl}
        <div class="shopping-item-controls">
          <button class="shopping-item-edit js-item-edit" ${editBtnStatus}>
            <span class="button-label">edit</span>
          </button>
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {
 

    // Filter item list if store prop is true by item.checked === false
    
    let items = [ ...store.items ];//refresh item array

    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = items.filter(item => item.name.includes(store.searchTerm));
    }
   


    const shoppingListItemsString = generateShoppingItemsString(items);
    
    //ViewMode

    let itemAddForm = '';
    let itemAddControl = '';

    //REG MODE
    if(store.viewMode === 'reg_mode'){ 
     
      itemAddControl = `
      <button class="js-bookmark-add">
      <span class="button-label">Add A New Bookmark</span>
      </button>
      `;


    }

    //ADD ITEM MODE
    if(store.viewMode === 'add_mode'){

      itemAddForm = ` 
      <label for="shopping-list-entry">Add a bookmark title</label>
      <input type="text" name="shopping-list-entry" class="js-shopping-list-entry" placeholder="something snappy">
      <button type="submit">ADD A NEW BOOKMARK</button>
      `;

    }



    ////////

    // insert that HTML into the DOM
    //$('.bookmark-add').html(itemAddControl);
    //$('.js-shopping-list-form').html(itemAddForm);
    $('.js-shopping-list').html(shoppingListItemsString);



    // render the bookmark in the DOM
    console.log('>>>RENDER');
    

  }


  //start ADD ITEM MODE
  function handleStartItemSubmit() {
    $('.bookmark-add').on('click', '.js-bookmark-add', event => {

      //const id = getItemIdFromElement(event.target);
      //store.setItemIsEditing(id, true);
      //render();

      store.viewMode = 'add_mode';

      console.log('>>>HEY!', event);

      render();

    });
  
  }


  
  //get new item details from input boxes
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {

      event.preventDefault();

      const newItemTitle = $('.js-shopping-list-entry').val();//newItemName
      $('.js-shopping-list-entry').val('');
  
      const newItemUrl = 'http://test url goes here';//testing

      //added new item object 
      const newItemObject = {

        title: newItemTitle,
        url: newItemUrl

      };

      //call to create new item now sends object ...

      //REF api.createItem(newItemName, (newItem) => {
      api.createItem(newItemObject, function (newItem){
        
        store.addItem(newItem);
        render();

      }, (error) => {window.alert(error.responseJSON.message);});
      
      //render();
    });
  }
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const item = store.findById(getItemIdFromElement(event.currentTarget));
      api.updateItem(item.id, {checked: !item.checked}, () => {
        store.findAndUpdate(item.id, {checked: !item.checked});
        render();
      }, (error) => {window.alert(error.responseJSON.message);});
    });
  }
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      }, (error) => {window.alert(error.responseJSON.message);});
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();

      api.updateItem(id, {name: itemName}, () => {
        store.findAndUpdate(id, {name: itemName});
        render();
      }, (error) => {window.alert(error.responseJSON.message);});
      store.setItemIsEditing(id, false);
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }

  function handleItemStartEditing() {
    $('.js-shopping-list').on('click', '.js-item-edit', event => {
      const id = getItemIdFromElement(event.target);
      store.setItemIsEditing(id, true);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
    handleItemStartEditing();
    handleStartItemSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
