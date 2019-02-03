/*** routers/index.js
***/


// export
// other controllers/routers can be added
// `Express.Application.use()` allows multiple modules in an array
module.exports = [
    require( './customer-api' ) ,
    require( './burger-api' ) ,
    require( './view' )
];
