const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

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
        group: {
            type:   Sequelize.ENUM,
            values: ['vs', 'isp', 'kd', 'is', 'SYSt']
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        
        
    }, {
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        scopes: {
            withoutPassword: {
              attributes: { exclude: ['password'] },
            }
        }  
    });

    User.associate = (models) => {
        User.hasOne(models.Studenddoc, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          },
          as: 'studendoc'
        });
    };

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