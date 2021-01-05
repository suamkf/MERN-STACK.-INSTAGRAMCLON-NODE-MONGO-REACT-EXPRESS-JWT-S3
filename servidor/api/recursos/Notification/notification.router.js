const express = require("express");
const passport = require("passport");

const log = require("./../../../utils/logger");

const procesarErrores = require("../../libs/errorHandler").procesarErrores;
const { validarId } = require("../../libs/mongoUtils");
const Notifications = require("./notification.contoller");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });
const notificationsRouter = express.Router();

notificationsRouter.get(
  "/:id/all",
  [jwtAuthenticate,validarId],
  procesarErrores(async (req, res) => {
    return res.json(await Notifications.findAllNotifactions(req.params.id));
  })
);

notificationsRouter.get(
  "/:id",
  [jwtAuthenticate,validarId],
  procesarErrores(async (req, res) => {
    return res.json(await Notifications.findNotifactions(req.params.id));
  })
);

notificationsRouter.post(
    "/:id",
    [jwtAuthenticate,validarId],
    procesarErrores(async (req, res) => {
      return await Notifications.checkNotifications(req.params.id);
    })
  );

module.exports = notificationsRouter;
