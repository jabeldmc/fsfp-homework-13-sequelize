/*** models/customer.js

Generated by Sequelize CLI.

```
$ node_modules/.bin/sequelize model:create --name Customer --attributes customerName:string
```

[Reference](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-)

***/

'use strict';

module.exports = ( sequelize , DataTypes ) => {
    const Customer = sequelize.define(
        'Customer' ,
        {
            customerName: {
                type: DataTypes.STRING ,
                unique: true ,
                allowNull: false ,
                validate: {
                    notEmpty: true
                }
            }
        } ,
        {}
    );

    Customer.associate = function(models) {
        // associations can be defined here
        Customer.hasMany(
            models.Burger ,
            { onDelete: "cascade" }
        );
    };

    return Customer;
};