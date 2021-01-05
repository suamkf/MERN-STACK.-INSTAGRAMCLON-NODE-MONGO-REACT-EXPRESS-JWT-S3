const express = require("express");
const passport = require("passport");
const log = require("./../../../utils/logger");

const procesarErrores = require("../../libs/errorHandler").procesarErrores;
const { validarId } = require("../../libs/mongoUtils");


const jwtAuthenticate = passport.authenticate("jwt", { session: false });
const auxiliarRouter = express.Router();

auxiliarRouter.get(
  "/:username",  
  procesarErrores(async (req, res) => {
    res.redirect(`https://intercambiagram-server-europe.herokuapp.com/`)
    return 
  })
);

auxiliarRouter.get(
    "/",  
    procesarErrores(async (req, res) => {
      res.redirect(`https://intercambiagram-server-europe.herokuapp.com/`)
      return 
    })
  );
  
module.exports = auxiliarRouter;
