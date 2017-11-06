var url = require('url');
var requestImageSize = require('request-image-size');
// TODO: Can't handle "https://giphy.com/gifs/meme-random-einstein-iZkua1UPocHgQ"

exports.mediaCardUrls = function(mediaCard){
  return new Promise(function (resolve, reject) {
    var mediaUrl = mediaCard.mediaUrl;
    var url_parts = url.parse(mediaUrl, true);
    
    if ( !(/\.(gif|mp4|webp)$/i).test( mediaUrl ) && url_parts.host == "giphy.com" ) {
      mediaUrl = "https://media.giphy.com/media/" + url_parts.path.replace("\/gifs\/", "") + "/giphy.gif";
      requestImageSize(mediaUrl)
        .then(function(size){
          mediaCard.gif = {
            "mediaUrl": mediaUrl,
            "width": size.width,
            "height": size.height
          }
          resolve(mediaCard);
        })
        .catch(function(err){
          mediaCard.gif = {
            "error": err,
            "mediaUrl": mediaUrl,
            "width": 480,
            "height": 270
          }
          resolve(mediaCard);
        });
   
    }else if( (/\.(gif)$/i).test( mediaUrl ) ){
      requestImageSize(mediaUrl)
        .then(function(size){
          mediaCard.gif = {
            "mediaUrl": mediaUrl,
            "width": size.width,
            "height": size.height
          }
          resolve(mediaCard);
        })
        .catch(function(err){
          mediaCard.gif = {
            "error": err,
            "mediaUrl": mediaUrl,
            "width": 480,
            "height": 270
          }
          resolve(mediaCard);
        });    
    }else if( (/youtube\.com\/watch\?v=/g).test(mediaUrl) ){
      mediaCard.youtube = {
        "id": url_parts.query.v,
        "mediaUrl": mediaUrl
      }
      resolve(mediaCard);
    }else{
      resolve(mediaCard);
    }


  })
}