module.exports = (sequelize, Sequelize) => {
    const Newsfeed = sequelize.define("newsfeed", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        group: {
            type:   Sequelize.ENUM,
            values: ['vs', 'isp', 'kd', 'is', 'SYSt']
        }

    });

    return Newsfeed;
};