const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/database.sqlite',
    logging: true,
});

sequelize.sync()
    .then(() => {
        console.log('✅ Database synchronized');
    })
    .catch(err => {
        console.error('❌ Unable to synchronize the database:', err);
    });


module.exports = sequelize;