var url = require('url');
var requestImageSize = require('request-image-size');
// TODO: Can't handle "https://giphy.com/gifs/meme-random-einstein-iZkua1UPocHgQ"

exports.prepareGiphyUrls = function(mediaCard){
  return new Promise(function (resolve, reject) {
    var giphyUrl = mediaCard.mediaUrl;
    var url_parts = url.parse(giphyUrl, true);
    if ( !(/\.(gif|mp4|webp)$/i).test( giphyUrl ) && url_parts.host == "giphy.com" ) {
      giphyUrl = "https://media.giphy.com/media/" + url_parts.path.replace("\/gifs\/", "") + "/giphy.gif";
      requestImageSize(giphyUrl)
        .then(function(size){
          console.log(size);
          mediaCard.mediaUrl = giphyUrl;
          mediaCard.width = size.width;
          mediaCard.height = size.height;
          resolve(mediaCard);
        })
        .catch(function(err){
           mediaCard.error = err;
           mediaCard.width = 480;
           mediaCard.height = 270;
           resolve(mediaCard);
        });
   
    }else if( (/\.(gif)$/i).test( giphyUrl ) ){
      requestImageSize(giphyUrl)
        .then(function(size){
          console.log(size);
          mediaCard.width = size.width;
          mediaCard.height = size.height;
          resolve(mediaCard);
        })
        .catch(function(err){
           mediaCard.error = err;
           mediaCard.width = 480;
           mediaCard.height = 270;
           resolve(mediaCard);
        });    
    }else{
      resolve(mediaCard);
    }


  })
}