module.exports = (sequelize, Sequelize) => {
  const Studentdoc = sequelize.define("studentdoc", {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    eriala_valdkond: {
      type: Sequelize.STRING
    },
    opilase_nimi: {
      type: Sequelize.STRING
    },
    praktika_periood: {
      type: Sequelize.STRING
    },
    prakika_maht: {
      type: Sequelize.STRING
    },
    praktika_email: {
      type: Sequelize.STRING,
      validate: { isEmail: true }
    },
    userId: Sequelize.INTEGER
    
  });

  Studentdoc.associate = (models) => {
    Studentdoc.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'studentdoc'
    });
  };
  
  
  return Studentdoc;
};