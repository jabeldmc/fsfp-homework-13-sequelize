/*** routers/view.js
***/


// require
const express = require( 'express' );
const models = require( '../models' );



// global variables
var router = express.Router();


/*** GET '/'

Render home page

***/
router.get(
    '/' ,
    async ( request , response ) => {
        console.group( `# GET '/'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var responseData;

        try {
            var queryResult = await models.Burger.findAll( { include: [ models.Customer ] } );
            console.group( '[DEBUG] queryResult:' ); console.debug( queryResult ); console.groupEnd();
            var handlebarsData = { burgers: queryResult };
        }
        catch ( error ) {
            responseData = error;
        }

        console.group( '[DEBUG] handlebarsData:' ); console.debug( handlebarsData ); console.groupEnd();
        response.render( 'index' , handlebarsData );

        console.info( `[INFO] Route GET '/' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
