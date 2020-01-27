module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
  
        email: {
            type: Sequelize.STRING,
            validate: { isEmail: true },
            allowNull: false,
            unique: {
                args: true,
                msg: 'Looks like already have an account with this email address',
            },
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    });

    
    return User;
  };