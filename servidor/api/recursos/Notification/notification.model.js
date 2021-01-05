const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const notificationSchema = new mongoose.Schema(
  {
    userOwnerId: {
      type: ObjectId,
      required: [
        true,
        "El usuario propietario del post o perfil debe tener un ID",
      ],
      ref: "userOwner",
      index: true,
    },
    userOwnerUserName: {
      type: String,
      required: [
        true,
        "El usuario propietario de post o perfil debe tener un nombre de usuario",
      ],
    },
    userOwnerImage: {
      type: String,
      default: null,
    },
    userActionId: {
      type: ObjectId,
      required: [
        true,
        "El usuario que da like, comienza a segir o comenta un post debe tener una id",
      ],
      ref: "userActionId",
    },
    userActionUserName: {
      type: String,
      required: [
        true,
        "El usuarioque da like, comienza a segir o comenta un post debe tener un nombre de usuario",
      ],
    },
    userActionImage: {
      type: String,
      default: null,
    },
    postId: {
      type: ObjectId,
      required: [false, "Puede o no contener la id del post"],
      ref: "postId",
      index: true,
    },
    postImage: {
      type: String,
      default: null,
    },
    event: {
      type: String,
      required: [true, "Se debe indicar el tipo de evento a registrar"],
    },
    check: {
      type: Boolean,
      required: [true, "Se debe indicar el tipo de evento a registrar"],
      default: false,
    },
  },
  { timestamps: { createdAt: "date_create", updatedAt: "date_upload" } }
);

const Notifications = mongoose.model("notifications", notificationSchema);

module.exports = {
  Notifications,
};
