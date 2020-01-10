module.exports = (sequelize, Sequelize) => {
    const Studentdoc = sequelize.define("studentdoc", {
  
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
      }
      
    });
  
    return Studentdoc;
};