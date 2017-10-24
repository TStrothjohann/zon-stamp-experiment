var url = require('url');
// TODO: https://media.giphy.com/media/meme-random-einstein-iZkua1UPocHgQ/giphy.webp
exports.prepareGiphyUrls = function(giphyUrl){
  if ( !(/\.(gif|mp4|webp)$/i).test( giphyUrl ) ) {
    var url_parts = url.parse(giphyUrl, true);
    if (url_parts.host == "giphy.com") {
      giphyUrl = "https://media.giphy.com/media/" + url_parts.path.replace("\/gifs\/", "") + "/giphy.webp";
    }  
  }
  return giphyUrl;
}