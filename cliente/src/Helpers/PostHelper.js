import Axios from 'axios'

export async  function addLike(_id,ownerPostId) {
   
     await Axios.post(`/api/posts/${_id}/likes`,{ownerPostId:ownerPostId});
   
}

export async  function removeLike(_id,ownerPostId) {
   
    await Axios.delete(`/api/posts/${_id}/likes`,{ownerPostId:ownerPostId});
  }


 
  export  async  function postComment(_id, message,ownerPostId) {
     const retornoMensaje = await Axios.post(`/api/posts/${_id}/comentarios`, {
       mensaje: message,
       ownerPostId:ownerPostId,
       
     });
     const retorno = retornoMensaje.data;
     return retorno;
   }
   
  