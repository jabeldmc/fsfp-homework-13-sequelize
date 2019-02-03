/*** models/burger.js

Generated by Sequelize CLI.

```
$ node_modules/.bin/sequelize model:create --name Burger --attributes burgerName:string,isDevoured:boolean
```

[Reference](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-)

***/

'use strict';

module.exports = ( sequelize , DataTypes ) => {
    const Burger = sequelize.define(
        'Burger',
        {
            burgerName: {
                type: DataTypes.STRING ,
                unique: true ,
                allowNull: false ,
                validate: {
                    notEmpty: true
                }
            } ,
            isDevoured: {
                type: DataTypes.BOOLEAN ,
                allowNull: false ,
                defaultValue: false
            }
        } ,
        {}
    );

    Burger.associate = function( models ) {
        // associations can be defined here
        Burger.belongsTo(
            models.Customer,
            {
                foreignKey: {
                    allowNull: false
                }
            }
        );
    };

    return Burger;
};
