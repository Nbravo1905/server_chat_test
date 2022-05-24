const { Schema, model } = require('mongoose');


const MessageSchema = Schema({

  from: { // DE
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: { //PARA
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

MessageSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject();
  return object;
});

const User = model('Message', MessageSchema);

module.exports = User;