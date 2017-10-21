var stampServerURL = process.env.STAMP_SERVER_URL;

function Relateds(relateds, callback){
  this.data = {};
  this.data['Lesen Sie jetzt'] = [];

  var self = this;

  for (var i = relateds.length - 1; i >= 0; i--) {
    var template = {};
    template.title = relateds[i].data.name
    template.url = stampServerURL + "/stamp/" + relateds[i].cms.id
    template.image = relateds[i].data.image.data.file.url
    self.data['Lesen Sie jetzt'].push(template);
  }

  callback(this.data); 
}

module.exports = Relateds;