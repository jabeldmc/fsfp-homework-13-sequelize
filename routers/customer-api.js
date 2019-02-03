/*** routers/customer-api.js
***/


// require
const express = require( 'express' );
const models = require( '../models' );


// global variables
var router = express.Router();


/*** GET '/api/customer/all'

Get all customers.

***/

router.get(
    '/api/customer/all' ,
    async ( request , response ) => {
        console.group( `# GET '/api/customer/all'` );
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var responseData;

        try {
            var queryResult = await models.Customer.findAll( { include: [ models.Burger ] } );
            responseData = queryResult;
        }
        catch ( error ) {
            responseData = error;
        }

        console.group( '[DEBUG] responseData :' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route GET '/api/customer/all' completed.` );
        console.groupEnd();
    }
);


/*** POST '/api/customer/create'

Create new customer.

***/

router.post(
    '/api/customer/create' ,
    async ( request , response ) => {
        console.group( `# POST '/api/customer/create'` );
        console.group( '[DEBUG] request.url :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl :' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method :' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params :' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query :' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body :' ); console.debug( request.body ); console.groupEnd();

        var responseData;

        try {
            var customerData = request.body;
            var queryResult = await models.Customer.create( customerData );
            responseData = queryResult;
        }
        catch( error )
        {
            responseData = error;
        }

        console.group( '[DEBUG] responseData :' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route POST '/api/customer/create' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
