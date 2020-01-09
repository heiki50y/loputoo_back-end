module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define("document", {
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

  return Document;
};
