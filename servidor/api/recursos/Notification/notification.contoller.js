const { Notifications } = require("./notification.model");
const usuarios = require("../usuarios/usuarios.controller");
const posts = require("../posts/posts.controller");

async function postNotification(userOwnerId, userActionId, event, postId) {
  console.log(userOwnerId, userActionId, event, postId);
  const user = await usuarios.obtenerUsuariosID(userActionId);
  const userOwner = await usuarios.obtenerUsuariosID(userOwnerId);
  const post = postId ? await posts.obtenerPostsId(postId) : null;
  return new Notifications({
    userOwnerId,
    userOwnerUserName: userOwner[0].username,
    userOwnerImage: userOwner[0].imagen,
    userActionId,
    userActionUserName: user[0].username,
    userActionImage: user[0].imagen,
    postId,
    postImage: post ? post[0].url : "",
    event,
  }).save();
}

async function findNotifactions(ownerId) {
  return await Notifications.find({
     userOwnerId: ownerId , 
     check: false 
  })
    
    .limit(20);
}

async function findAllNotifactions(ownerId) {
  return await Notifications.find({
     userOwnerId: ownerId  
  })
    .sort({ date_create: -1 })
    .limit(20);
}

async function checkNotifications(ownerId) {
  console.log("intenta actualizar campos")
  return await Notifications.updateMany(
    { userOwnerId: ownerId },
    { $set: { check: true } },
    {
      multi: true,
    }
  );
}
async function deleteNotification(userOwnerId, userActionId, event, postId) {
  if (postId) {
    return await Notifications.findOneAndRemove({
      userActionId: userActionId,

      event: event,
      postId: postId,
    });
  } else {
    return await Notifications.findOneAndRemove({
      userActionId: userActionId,
      userOwnerId: userOwnerId,
      event: event,
    });
  }
}
module.exports = {
  postNotification,
  findNotifactions,
  deleteNotification,
  checkNotifications,
  findAllNotifactions
};
