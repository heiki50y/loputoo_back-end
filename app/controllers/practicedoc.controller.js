const db = require("../models");
const Practicedoc = db.practicedocs;
const Op = db.Sequelize.Op;

// Create Company data
exports.createCompanyDoc = async (req, res, next) => {

  try {
    const company = await Practicedoc.create(req.body);

    res.status(201).json({
      sucesss: true,
      data: company
    })

  } catch (err) {
    next(err)
  }
};

// Get all company data
exports.getAllCompanyDoc = async (req, res, next) => {
  try {
    const company = await Practicedoc.findAll();

    res.status(200).json({ 
      success: true, 
      count: company.length, 
      data: company
    });
  } catch (err) {
      next(err);
  }
};

// Find company
exports.getCompanyDoc = async (req, res, next) => {
  try {
    const company = await Practicedoc.findByPk(req.params.id);

    if(!company) {
      return  next(
          new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
      );
    }

      res.status(200).json({
        success: true,
        data: company 
      });

  } catch (err) {
      next(err);
  }
};

// Update Company
exports.updateCompanyDoc = async (req, res, next) => {
  const id = req.params.id;
  const company = await Practicedoc.findByPk(req.params.id);
  try {
    
    if(!company) {
      return  next(
          new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
      );
    }

    await Practicedoc.update({
      praktika_ettevote: req.body.praktika_ettevote,
      praktika_telefon: req.body.praktika_telefon,
      praktika_email: req.body.email,
      juriidiline_aadress: req.body.juriidiline_aadress,
      lepingusolmija_nimi: req.body.lepingusolmija_nimi,
      lepingusolmija_amet: req.body.lepingusolmija_amet,
      lepingu_alus: req.body.lepingu_alus,
      juhendaja_nimi: req.body.juhendaja_nimi,
      juhendaja_amet: req.body.juhendaja_amet,
      juhendaja_telefon: req.body.juhendaja_telefon

    }, { where: {id: id} })
                                          
    res.status(200).json({success: true, data: req.body});

  } catch (err) {
    next(err);
  }
};

// Delete a Practicedoc with the specified id in the request
exports.deleteCompanyDoc = async (req, res, next) => {
  const id = req.params.id;
  const company = await Practicedoc.findByPk(req.params.id);
  try {

    if(!company) {
      return  next(
          new ErrorResponse(`Company not found with id of ${req.params.id}`, 404)
      );
    }

    await Practicedoc.destroy({
      where: { id: id }
    })
 
    res.status(200).json({success: true, data: {}});

  } catch (err) {
    next(err);
  }
};
