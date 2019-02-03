/*** /static/asset/script/script.js
***/


/*** Globals
***/


/*** FUNCTION createObject()

Converts from serialized format (array of `{ name , value }`) to
object format (`{ name : value , ... }`)

***/

const createObject = function( formData ) {
    console.group( 'createObject()' );

    var formDataObject = {};
    formData.forEach(
        ( formElement , formElementIndex ) => {
            formDataObject[ formElement.name ] = formElement.value;
    }
    );

    console.groupEnd();
    return formDataObject;
}


/*** FUNCTION createCustomerData()

Maps fields of form data to customer data.

***/

const createCustomerData = function( formDataObject ) {
    console.group( 'createCustomerData()' );

    var customerData = {
        customerName : formDataObject[ 'customer-name' ]
    };

    console.groupEnd();
    return customerData;
}


/*** FUNCTION createBurgerData()

Maps fields of form data to burget data.

***/

const createBurgerData = function( formDataObject ) {
    console.group( 'createBurgerData()' );

    var burgerData = {
        burgerName : formDataObject[ 'burger-name' ] ,
        customerName : formDataObject[ 'customer-name' ]
    };

    console.groupEnd();
    return burgerData;
}


/*** FUNCTION handleFormSubmit()
***/

const handleFormSubmit = async function( event ) {
    console.group( 'handleFormSubmit()' );

    // set DOM event handling
    event.stopPropagation();
    event.preventDefault();

    // get burger data from form data
    var formData = $( '#create-burger-form' ).serializeArray();
    console.log( 'formData:' , formData );

    // create new customer
    var requestData = createCustomerData( createObject( formData ) );
    console.log( 'requestData:' , requestData );
    await $.ajax(
        {
            url : '/api/customer/create' ,
            method : 'POST' ,
            data : requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( 'data: ' , data );
            console.log( 'textStatus: ' , textStatus );
        }
    );

    // create new burger
    var requestData = createBurgerData( createObject( formData ) );
    console.log( 'requestData:' , requestData );
    await $.ajax(
        {
            url : '/api/burger/create' ,
            method : 'POST' ,
            data : requestData ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( 'data: ' , data );
            console.log( 'textStatus: ' , textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleDevourButtonClick()
***/

const handleDevourButtonClick = async function( event ) {
    console.group( 'handleDevourButtonClick()' );

    // get burger ID
    var burgerId = $( this ).attr( 'data-burger-id' );
    var url = `/api/burger/devour/?${ jQuery.param( { id : burgerId } ) }`

    // devour burger
    await $.ajax(
        {
            url : url ,
            method : 'PUT' ,
            dataType: 'json'
        }
    )
    .then(
        ( data , textStatus , jqXHR ) => {
            console.log( data );
            console.log( textStatus );
        }
    );

    // refresh window
    location.reload();

    console.groupEnd();
}


/*** FUNCTION handleReady()
***/

const handleReady = function( event ) {
    console.group( 'handleReady()' );

    // register form event handler
    $( '#create-burger-form' ).on( 'submit' , handleFormSubmit );
    // register button event handlers, including post-cretion
    $( document ).on( 'click' , '.devour-button' , handleDevourButtonClick );


    console.groupEnd();
}


/*** Start
***/

$( handleReady );    // $( document ).ready( handleReady )
