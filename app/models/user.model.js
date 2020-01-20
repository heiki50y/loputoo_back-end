module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
  
        email: {
            type: Sequelize.STRING,
            validate: { isEmail: true },
            unique: {
                args: true,
                msg: 'Looks like already have an account with this email address',
            },
        },
        firstName: {
            type: Sequelize.STRING,
            required: {
                args: true,
                msg: 'Please add a firstname'
            }
        },
        lastName: {
            type: Sequelize.STRING,
            required: {
                args: true,
                msg: 'Please add a lastname'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return User;
  };