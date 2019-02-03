/*** server.js
***/


// check environment variables
console.group( '# Environment Variables' );
console.group( '[DEBUG] process.env.PORT:' ); console.debug( process.env.PORT ); console.groupEnd();
console.group( '[DEBUG] process.env.NODE_ENV:' ); console.debug( process.env.NODE_ENV ); console.groupEnd();
console.group( '[DEBUG] process.env.JAWSDB_URL:' ); console.debug( process.env.JAWSDB_URL ); console.groupEnd();
console.group( '[DEBUG] process.env.SEQUELIZE_FORCE_SYNC:' ); console.debug( process.env.SEQUELIZE_FORCE_SYNC ); console.groupEnd();
console.groupEnd();


// require
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const models = require( './models' );
const handlebars = require( 'express-handlebars' );


// global variables
const DEFAULT_PORT = 8080;
const PORT = ( process.env.PORT || DEFAULT_PORT );
const SEQUELIZE_FORCE_SYNC = ( process.env.SEQUELIZE_FORCE_SYNC === 'true' );
console.group( '# Global Variables' );
console.group( '[DEBUG] PORT:' ); console.debug( PORT ); console.groupEnd();
console.group( '[DEBUG] SEQUELIZE_FORCE_SYNC:' ); console.debug( SEQUELIZE_FORCE_SYNC ); console.groupEnd();
console.groupEnd();

var app;



/*** FUNCTION initialize()
***/

const initialize = function() {
    // create Express app
    app = express();

    // data handlers
    app.use( bodyParser.urlencoded( { extended: true } ) );    // MIME type application/x-www-form-urlencoded
    app.use( express.json() );    // MIME type application/json

    // static directory
    app.use( express.static( 'static' ) );

    // render engine
    app.engine( 'handlebars' , handlebars( { defaultLayout : 'main' } ) );
    app.set( 'view engine' , 'handlebars' );

    // routes
    var routers = require( './routers' );
    app.use( routers );
}


/*** FUNCTION start()
***/

const start = async function() {
    // connect to database
    await models.sequelize.sync( { force: SEQUELIZE_FORCE_SYNC } );

    // start Express app
    app.listen(
        PORT ,
        () => {
            console.info( `[INFO] Express app listening to http://localhost:${PORT}` );
        }
    );
}


// start
initialize();
start();
