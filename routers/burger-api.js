/*** routers/burger-api.js
***/


// require
const express = require( 'express' );
const models = require( '../models' );


// global variables
var router = express.Router();


/*** GET '/api/burger/all'

Get all burgers.

***/

router.get(
    '/api/burger/all' ,
    async ( request , response ) => {
        console.group( `# GET '/api/burger/all'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var responseData;

        try {
            var queryResult = await models.Burger.findAll( { include: [ models.Customer ] } );
            responseData = queryResult;
        }
        catch ( error ) {
            responseData = error;
        }

        console.group( '[DEBUG] responseData:' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route GET '/api/burger/all' completed.` );
        console.groupEnd();
    }
);


/*** POST '/api/burger/create'

Create new burger.

***/

router.post(
    '/api/burger/create' ,
    async ( request , response ) => {
        console.group( `# POST '/api/burger/create'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var responseData;
        var customerName = request.body.customerName;

        try {
            var customerQueryResult = await models.Customer.findOne(
                {
                    where: {
                        customerName: {
                            [ models.Sequelize.Op.eq ]: customerName
                        }
                    }
                }
            );

            var burgerData = {
                burgerName: request.body.burgerName ,
                CustomerId: customerQueryResult.id
            };
            var burgerQueryResult = await models.Burger.create( burgerData );
            responseData = burgerQueryResult;
        }
        catch( error )
        {
            responseData = error;
        }

        console.group( '[DEBUG] responseData:' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route POST '/api/burger/create' completed.` );
        console.groupEnd();
    }
);


/*** PUT '/api/burger/devour'

Set burger as devoured.

***/

router.put(
    '/api/burger/devour' ,
    async ( request , response ) => {
        console.group( `# PUT '/api/burger/devour'` );
        console.group( '[DEBUG] request.url:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.originalUrl:' ); console.debug( request.originalUrl ); console.groupEnd();
        console.group( '[DEBUG] request.method:' ); console.debug( request.method ); console.groupEnd();
        console.group( '[DEBUG] request.params:' ); console.debug( request.params ); console.groupEnd();
        console.group( '[DEBUG] request.query:' ); console.debug( request.query ); console.groupEnd();
        console.group( '[DEBUG] request.body:' ); console.debug( request.body ); console.groupEnd();

        var responseData;
        var burgerId = request.query.id;

        try {
            var queryResult = await models.Burger.update(
                { isDevoured: true } ,
                {
                    where: {
                        id: {
                            [ models.Sequelize.Op.eq ]: burgerId
                        }
                    }
                }
            );
            responseData = queryResult;
        }
        catch ( error ) {
            responseData = error;
        }

        console.group( '[DEBUG] responseData:' ); console.debug( responseData ); console.groupEnd();
        response.json( responseData );

        console.info( `[INFO] Route PUT '/api/burger/devour' completed.` );
        console.groupEnd();
    }
);


// export
module.exports = router;
