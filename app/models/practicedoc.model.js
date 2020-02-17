module.exports = (sequelize, Sequelize) => {
  const Practicedoc = sequelize.define("practicedoc", {

    praktika_ettevote: {
      type: Sequelize.STRING
    },
    praktika_telefon: {
      type: Sequelize.INTEGER
    },
    praktika_email: {
      type: Sequelize.STRING,
      validate: { isEmail: true }
    },
    juriidiline_aadress: {
      type: Sequelize.STRING
    },
    lepingusolmija_nimi: {
      type: Sequelize.STRING
    },
    lepingusolmija_amet: {
      type: Sequelize.STRING
    },
    lepingu_alus: {
      type: Sequelize.STRING
    },
    juhendaja_nimi: {
      type: Sequelize.STRING
    },
    juhendaja_amet: {
      type: Sequelize.STRING
    },
    juhendaja_telefon: {
      type: Sequelize.INTEGER
    }

});


  return Practicedoc;
};

