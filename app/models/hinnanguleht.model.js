module.exports = (sequelize, Sequelize) => {
    const Hinnanguleht = sequelize.define("hinnanguleht", {
        
        fileName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type:   Sequelize.ENUM,
            values: ['vs18', 'vs19', 'isp18']
        }

    });

    
    return Hinnanguleht;
};