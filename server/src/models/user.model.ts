import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
      minLength: 5,
      maxLength: 64,
    },
    salt: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id; // Just incase I turn set virtuals to false..
        delete ret._id;
        delete ret.password;
        delete ret.salt;
        return ret;
      },
    },
  }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
