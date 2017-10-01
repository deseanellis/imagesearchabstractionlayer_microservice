const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchSchema = new Schema({
  term: String,
  when: Date
});

searchSchema.statics.createOrUpdate = async function(obj) {
  var _term = await this.findOne(obj);
  if (_term) {
      return await this.update(obj, {when: Date()});
      } else {
        var _search = new this({term: obj.term, when: Date()});
        return await _search.save();
      }
};

mongoose.model('searches', searchSchema);