/* global store, api, $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){
  
  function generateItemElement(item) {
     
    //REF<li class="js-item-element" data-item-id="${item.id}">
    let itemView = '';


    // >>>  COMPACT MODE -- itemView: 'compact'
    //TITLE
    //RATING
    //GO TO LINK

    // >>> EXPANDED MODE -- itemView: 'expanded'
    //TITLE
    //DESCRIPTION
    //URL
    //RATING
    //GO TO LINK
 
    //REF for add and edit ...
    /*
    if (item.isEditing) {
      itemTitle = `
        <form class="js-edit-item">
          <input class="bookmark-item type="text" value="${item.title}" />
        </form>
      `;
    }
    */

    //first time store is viewd collapse all item views
    if(store.viewMode === 'first_mode'){

      item.expandedView = false;
 
    }

    //SHOW EXPANDED
    if(item.expandedView === true){

      //REF let itemTitle = `<span class="shopping-item ${checkedClass}">${item.name}</span>`;
      let itemTitle = `<span class="Bigger_Title">${item.title}</span>`;

      let itemDescription = `<span class="bookmark-item_desc">${item.desc}</span>`;

      let itemUrl = `<span class="bookmark-item_url">${item.url}</span>`;
 
      let itemRating = `<span>${item.rating}</span>`;

      //let showExpandedVal = `<span class="bookmark-item">${item.expandedView}</span>`;




      itemView = `

      <li class="js-item-element" data-item-id="${item.id}">
      <p class = "right-rating" >RATING: ${itemRating}</p>
      ${itemTitle}
      ${itemDescription} 
      ${itemUrl}
       
      <div class="shopping-item-controls">
        <button class="bookmark-item-toggle js-collapse-button">
          <span class="button-label">collapse/expand</span>
        </button>
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
        <p> 
        <a class="js-go-button" href="${item.url}">GO TO LINK!</a>
        </p>
      </div>
      </li>
       
      `;
       
 
    } 
 
    //collapsed view of item only Title and rating
    //Title should get bigger
    //Button to got to link
    //Button to uncollapse
    //Rating should show

    //SHOW COLLAPSED
    if(item.expandedView === false){

      //REF let itemTitle = `<span class="shopping-item ${checkedClass}">${item.name}</span>`;
      let itemTitle = `<span class="Bigger_Title">${item.title}</span>`;

      let itemDescription = `<span class="bookmark-item">${item.desc}</span>`;

      let itemUrl = `<span class="bookmark-item">${item.url}</span>`;
 
      let itemRating = `<span>${item.rating}</span>`;

      //let showExpandedVal = `<span class="bookmark-item">${item.expandedView}</span>`;
 
      itemView = `
       
      <li class="js-item-element" data-item-id="${item.id}">
      <p class = "right-rating" >RATING: ${itemRating}</p>
      <p>${itemTitle}</p>
      <button class="js-expand-button">
          <span class="button-label">SHOW DETAILS</span>
      </button>
        <p> 
        <a class="js-go-button" href="${item.url}">GO TO LINK!</a>
        </p>
      </li>

      `;
       
 
    } 
   
    //DISPLAY ITEMS LIST
    return `
    ${itemView}
  `;   
    

  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
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
     
    // Filter item list...

    //set var for userSort
    let myUserSortOption = store.userSort;

    console.log('store.userSort = ',myUserSortOption);
    
    if (myUserSortOption !== 'no sort') {

      myUserSortOption = parseInt(myUserSortOption);
      
      if(myUserSortOption < 5){

        items = items.filter(item => item.rating > myUserSortOption);

      }
       
      if(myUserSortOption === 5){

        items = items.filter(item => item.rating === myUserSortOption);

      }

    }

     

    const bookmarkItemsString = generateBookmarkItemsString(items);
     
    ////////

    // insert that HTML into the DOM
    //$('.bookmark-add').html(itemAddControl);
    //$('.js-shopping-list-form').html(itemAddForm);

    let itemAddForm = ''; 

    if(store.viewMode === 'add_mode'){

      let errorMessage = '';
      let placeholder_title = 'class="js-bookmark-title-entry" placeholder="Add title here -- something snappy';
      let placeholder_url = 'class="js-bookmark-url-entry" placeholder="Add url here ... http://.... enter url';
      
      //ERROR MODE
       
      if (store.errorMode === true){

        errorMessage = '<p class = "error_class"> Whoops! Please add Title and Url... </p>';
        //placeholder_title = 'class="js-bookmark-title-entry_error" placeholder="TITLE IS REQUIRED';
        //placeholder_url = 'class="js-bookmark-url-entry_error" placeholder="URL IS REQUIRED ... http://.... enter url';
 
      }
       

      
      itemAddForm = `
      
      <form id="js-add-bookmark-form" class = "js-add-form" aria-label="Sort Bookmarks by rating">

      <h3>Add the bookmark details:</h3>
      ${errorMessage}
      <br> 
      Title: <input type="text" name="bookmark-title-entry" ${placeholder_title}">
      <br>
      Description: <input type="text" name="bookmark-desc-entry" class="js-bookmark-desc-entry" placeholder="Add general description">
      <br>
      http://www. <input type="text" name="bookmark-url-entry" ${placeholder_url}">
      <br>
       
      <p>Rating: </p>
       
      <input type="radio" name="rating" value="1" checked> 1 star<br>
      <input type="radio" name="rating" value="2"> 2 stars<br>
      <input type="radio" name="rating" value="3"> 3 stars<br>
      <input type="radio" name="rating" value="4"> 4 stars<br>
      <input type="radio" name="rating" value="5"> 5 stars<br>
      
      
       
      <br><br>
      <button type="submit" class = "general-submit-button">SUBMIT</button>
      <button type="button" class = "js-cancel-button">CANCEL</button>
      <br>
      </form>
      
      
      `;
 
 
    }

    if(store.viewMode === 'reg_mode' || store.viewMode === 'first_mode'){

      itemAddForm = `
 
      
      `;
 
 
    }


    $('#form_container').html(itemAddForm);
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
 
  // $('#js-add-bookmark-form').submit(function (event) {
  
  //get new item details from input boxes
  function handleNewItemSubmit() {
    $('#form_container').on('submit','#js-add-bookmark-form', (event) => {

      event.preventDefault();

      //ref const newItemName = $('.js-shopping-list-entry').val();
      
      let newItemTitle = '';

      newItemTitle = $('.js-bookmark-title-entry').val(); 

      /*
      if (store.errorMode === false){
      
        newItemTitle = $('.js-bookmark-title-entry').val(); 

      }

      if (store.errorMode === true){
      
        newItemTitle = $('.js-bookmark-title-entry_error').val(); 

      }
      */
      
      
  

      //testing -- will get from input text
      let newItemDescription = $('.js-bookmark-desc-entry').val(); 

      if(newItemDescription === ''){

        newItemDescription = 'Sorry no description for this one...';

      }

      

      //testing -- will get from input box

      //need to check if person types http it and if so ignore adding it....

      //if first six vals === http:// then dont add http:// instead jsut use it....


      let newItemUrl = '';
  
      newItemUrl = $('.js-bookmark-url-entry').val();
      
      //Append Http to item 
      if(newItemUrl !== ''){

        newItemUrl = 'http://www.' + newItemUrl;

      }
         
       
      if(newItemUrl === 'http://www. '){

        newItemUrl = '';

      }

     
      
      
      //testing -- will get from input text
 
      let newItemRating = $('input[name="rating"]:checked').val();
 
      

      //testing -- gets generated
      const newItemId = 'not yet';

      //
      const newItemExpanded = false;


      //added new item object 
      const newItemObject = {

        id: newItemId,
        title: newItemTitle,
        desc: newItemDescription,
        url: newItemUrl,
        rating: newItemRating,
        expandedView: newItemExpanded,
        

      };

      //call to create new item now sends object ...

      //REF api.createItem(newItemName, (newItem) => {
      api.createItem(newItemObject, function (newItem){
 
        store.addItem(newItem);


        //clear text input box
        $('js-bookmark-title-entry').val('');

        //clear text input box
        $('js-bookmark-url-entry').val('');

        //clear text input box
        $('js-bookmark-desc-entry').val('');


        //change back to regular view since adding is now done....
        store.viewMode = 'reg_mode';

        store.errorMode = false;

        render();

      }, (error) => {
        
        //window.alert(error.responseJSON.message);

        let myMessage = error;

        store.errorMode = true;

        render();

        
      
      });
      
      //REF (error) => {window.alert(error.responseJSON.message);});
    });
  }


  
  //this for expand when its collapsed when show details button is clicked
  function handleItemCancelClicked() {

    $('#form_container').on('click', '.js-cancel-button', event => {
       
      const id = getItemIdFromElement(event.currentTarget);

      console.log('>>> id >>> ',id);
 
      store.viewMode = 'reg_mode';
 
      render();
       

    });


  }




  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
   
  //this for collapse when collapse button is visible
  function handleItemCollapseClicked() {

    $('.js-bookmark-list').on('click', '.js-collapse-button', event => {
        
      const id = getItemIdFromElement(event.currentTarget);

      console.log('>>> id >>> ',id);

      store.findAndUpdate(id, {expandedView: false});
      
      render();
       
 
    });


  }
  
  
  //this for expand when its collapsed when show details button is clicked
  function handleItemExpandClicked() {

    $('.js-bookmark-list').on('click', '.js-expand-button', event => {
       
      const id = getItemIdFromElement(event.currentTarget);

      console.log('>>> id >>> ',id);
 
      store.findAndUpdate(id, {expandedView: true});


      //change to reg mode after intial view
   
      if(store.viewMode === 'first_mode'){

        store.viewMode = 'reg_mode';

      }
   


      
      render();
       

    });


  }
 

  //SET SORTING OPTION
  function handleSortOptionSubmit() {
    $('.js-rating-form').submit(function (event) {

      event.preventDefault();

      const userSortOption = $('#rating_value').val();

      console.log('rating sort option: ',userSortOption);

      store.userSort = userSortOption;

      render();

    });

  }
 
  //delete button works!
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
   
  function bindEventListeners() {
    handleSortOptionSubmit();
    handleNewItemSubmit();
    handleItemExpandClicked();
    handleItemCollapseClicked();
    handleDeleteItemClicked();
    handleItemCancelClicked();
    //handleItemGoClicked();
    //handleEditShoppingItemSubmit();
    //handleToggleFilterClick();
    //handleItemStartEditing();
    handleStartItemSubmit();
  }

  
  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

  

}());
