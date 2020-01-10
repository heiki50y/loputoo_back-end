module.exports = (sequelize, Sequelize) => {
  const Practicedoc = sequelize.define("practicedoc", {
    eriala: {
      type: Sequelize.STRING
    },
    opilase_nimi: {
      type: Sequelize.STRING
    },
    praktika_periood: {
      type: Sequelize.STRING
    },
    praktika_maht: {
      type: Sequelize.STRING
    },
    praktika_nimi: {
      type: Sequelize.STRING
    },
    praktika_reg: {
      type: Sequelize.INTEGER
    },
    praktika_telefon: {
      type: Sequelize.INTEGER
    },
    /*praktika_email: {
      type: Sequelize.INTEGER,
      validate: {
        isEmail: true 
      }
    }*/
    // jur_aadress: {
    //   type: Sequelize.INTEGER
    // },
    // lepingusolmija_nimi: {
    //   type: Sequelize.STRING
    // },
    // lepingusolmija_amet: {
    //   type: Sequelize.STRING
    // },
    // lepingu_alus: {
    //   type: Sequelize.STRING
    // },
    // juhendaja_nimi: {
    //   type: Sequelize.STRING
    // },
    // juhendaja_amet: {
    //   type: Sequelize.STRING
    // },
    // juhendaja_telefon: {
    //   type: Sequelize.INTEGER
    // },
  });

  return Practicedoc;
};

/*module.exports = (sequelize, Sequelize) => {
  const Practicedoc = sequelize.define("practicedoc", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Practicedoc;
};*/

