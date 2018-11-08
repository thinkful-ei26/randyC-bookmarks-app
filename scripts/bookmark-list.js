/* global store, api, api_test $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){
 
  function generateItemElement(item) {


    //VIEW MODES

    //COMPACT MODE

    //EXPANDED MODE

    //EDIT MODE

    //ADD MODE
 

    console.log(api_test.helloThere);//testing alternate module


    
    //?
    const checkedClass = item.itemExpanded ? 'shopping-item__checked' : '';

    //if checked edit is disabled
    const editBtnStatus = item.itemExpanded ? 'disabled' : '';

    


    //REF let itemTitle = `<span class="shopping-item ${checkedClass}">${item.name}</span>`;
    let itemTitle = `<span class="bookmark-item ${checkedClass}">${item.title}</span>`;

    let itemDescription = `<span class="bookmark-item ${checkedClass}">${item.desc}</span>`;

    let itemUrl = `<span class="bookmark-item ${checkedClass}">${item.url}</span>`;
 
    let itemRating = `<span class="bookmark-item ${checkedClass}">${item.rating}</span>`;

    let showExpandedVal = `<span class="bookmark-item ${checkedClass}">${item.itemExpanded}</span>`;

    //default to collapsed...?
    let itemView = `

      <li class="js-item-element" data-item-id="${item.id}">
      <p> nothing...</p>
      </li>
     
    `;


    // >>>  COMPACT MODE -- itemView: 'compact'
    //TITLE
    //RATING

    // >>> EXPANDED MODE -- itemView: 'expanded'
    //TITLE
    //DESCRIPTION
    //URL
    //RATING

 
    //review for add and edit ...
    if (item.isEditing) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="bookmark-item type="text" value="${item.title}" />
        </form>
      `;
    }

    //expanded view of item
    if(item.itemExpanded === true){

      itemView = `

      <li class="js-item-element" data-item-id="${item.id}">
      <p> expanded view...</p>
      </li>
       
      `;
       
 
    } 


    //collapsed view of item only Title and rating
    if(item.itemExpanded === false){

      itemView = `
       
      <li class="js-item-element" data-item-id="${item.id}">
      <p> collapsed view...</p>
      </li>

      `;
       
 
    } 
  
    //default expanded view ... 

    console.log('item expanded ? >>>>> ',item.itemExpanded);//testing alternate module

    
    return `
    
    <li class="js-item-element" data-item-id="${item.id}">
    
    ${itemTitle}
    ${itemDescription} 
    ${itemUrl}
    ${itemRating} 
    ${showExpandedVal}
    <div class="shopping-item-controls">
      <button class="bookmark-item-edit js-item-edit" ${editBtnStatus}>
        <span class="button-label">edit</span>
      </button>
      <button class="bookmark-item-toggle js-collapse-button">
        <span class="button-label">collapse/expand</span>
      </button>
      <button class="bookmark-item-delete js-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>
  `;   
   

    //compacted view test... 
    /*
    return `
    
    <li class="js-item-element" data-item-id="${item.id}">
    ${itemTitle}
    ${itemRating} 
    </li>
  `;   
    */

  
    //adjust for expanded or collapsed
    /*
    return `
    ${itemView}
      
   `;
    */
    

  }
  
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  //Update DOM with store
  function render() {
 

    // Filter item list if store prop is true by item.checked === false
    
    let items = [ ...store.items ];//refresh item array

    /*
    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
    */


    // Filter item list if store prop `searchTerm` is not empty
    /*
    if (store.searchTerm) {
      items = items.filter(item => item.name.includes(store.searchTerm));
    }
    */
    


    const bookmarkItemsString = generateShoppingItemsString(items);
    
    //ViewMode
    /*
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
    */


    ////////

    // insert that HTML into the DOM
    //$('.bookmark-add').html(itemAddControl);
    //$('.js-shopping-list-form').html(itemAddForm);

    let itemAddForm = ''; 

    if(store.viewMode === 'add_mode'){

      itemAddForm = `
      
      <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="Add title here -- something snappy">
      <br><br>
      <input type="text" name="bookmark-desc-entry" class="js-bookmark-desc-entry" placeholder="Add general description">
      <br><br>
      <input type="text" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="Add url here ... http://.... enter url">
      <br><br>
      <button type="submit" class = "general-submit-button">SUBMIT</button>
      <br><br> 
      
      `;
 
 
    }

    if(store.viewMode === 'reg_mode'){

      itemAddForm = `
 
      
      `;
 
 
    }


    $('.js-add-form').html(itemAddForm);
    $('.js-bookmark-list').html(bookmarkItemsString);



    // render the bookmark in the DOM
    console.log('>>> RENDERED');
    

  }


  //START ADD ITEM MODE with form
  function handleStartItemSubmit() {
    $('.bookmark-add').on('click', '.js-start-add-button', event => {
 
      store.viewMode = 'add_mode';

      console.log('>>> handle item submit ADD', event);

      console.log('>>> viewMode is now: ', store.viewMode);

      render();

    });
  
  }
 

  
  //get new item details from input boxes
  function handleNewItemSubmit() {
    $('#js-add-bookmark-form').submit(function (event) {

      event.preventDefault();

      //ref const newItemName = $('.js-shopping-list-entry').val();
        
      const newItemTitle = $('.js-bookmark-title-entry').val(); 
      
      //clear text input box
      $('js-bookmark-title-entry').val('');
  

      //testing -- will get from input text
      const newItemDescription = $('.js-bookmark-desc-entry').val(); 

      //clear text input box
      $('js-bookmark-desc-entry').val('');

      //testing -- will get from input box
      const newItemUrl = $('.js-bookmark-url-entry').val();

      //clear text input box
      $('js-bookmark-url-entry').val('');
      
      
      //testing -- will get from input text
      const newItemRating = '1';
      

      //testing -- gets generated
      const newItemId = 'not yet';


      //added new item object 
      const newItemObject = {

        id: newItemId,
        title: newItemTitle,
        desc: newItemDescription,
        url: newItemUrl,
        rating: newItemRating,
        

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
  
  //this will be the Expand when item is in collapsed view bookmark-item-toggle

  //REF $('.js-bookmark-list').on('click', '.js-item-toggle', event => {



  //this for collapse/expand item
  function handleItemCheckClicked() {
    $('.js-bookmark-list').on('click', '.js-collapse-button', event => {
      const item = store.findById(getItemIdFromElement(event.currentTarget));
      api.updateItem(item.id, {checked: !item.itemExpanded}, () => {
        //store.findAndUpdate(item.id, {checked: !item.checked});
        store.findAndUpdate(item.id, {itemExpanded: !item.itemExpanded});
        render();
      }, (error) => {window.alert(error.responseJSON.message);});
    });
  }
  


  //delete works
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      }, (error) => {window.alert(error.responseJSON.message);});
    });
  }
  

  function handleEditShoppingItemSubmit() {
    $('.js-bookmark-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.bookmark-item').val();

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
  
  /*
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }
*/


  function handleItemStartEditing() {
    $('.js-bookmark-list').on('click', '.js-item-edit', event => {
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
    //handleShoppingListSearch();
    handleItemStartEditing();
    handleStartItemSubmit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
