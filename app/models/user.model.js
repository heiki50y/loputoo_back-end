const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('student', 'admin'),
            defaultValue: 'student'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    }, {
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        defaultScope: {
            attributes: { exclude: ['password'] }
        }  
    });

    User.prototype.getSignedJwtToken = function() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
    }

    User.prototype.matchPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    }
    
    return User;
};