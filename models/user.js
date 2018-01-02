const timestamps = require('mongoose-timestamp');

module.exports = function userModel(mongoose, modelName) {
  const schema = new mongoose.Schema({
    username: {
      type: String,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      select: false,
    },
    isEnabled: {
      type: Boolean,
      index: true,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    segments: {
      type: [String],
    },
    profilePic: {
      type: String,
      required: false,
    },
    meta: {
      type: {},
    },
  });

  schema.plugin(timestamps);

  mongoose.model(modelName, schema);
};
