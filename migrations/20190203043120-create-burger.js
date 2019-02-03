/*** migrations/20190203043120-create-burger.js

Generated by Sequelize CLI.

```
$ node_modules/.bin/sequelize model:create --name Burger --attributes burgerName:string,isDevoured:boolean
```

Run

```
node_modules/.bin/sequelize db:migrate
```

Undo

```
node_modules/.bin/sequelize db:migrate:undo
```

[Reference: Creating First Model (And Migration)](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-)
[Reference: Running Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html#running-migrations)
[Reference: Undoing Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html#undoing-migrations)

***/

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Burgers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      burgerName: {
        type: Sequelize.STRING
      },
      isDevoured: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Burgers');
  }
};