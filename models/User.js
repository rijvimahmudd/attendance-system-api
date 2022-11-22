const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return v.match(regex);
      },
      message: (props) => `Invalid email ${props.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password is too short'],
  },
  roles: {
    type: [String],
    required: true,
    default: ['STUDENT'],
  },
  accountStatus: {
    type: String,
    default: 'PENDING',
    enum: ['ACTIVE', 'PENDING', 'REJECTED'],
    required: true,
  },
});

const User = model('User', userSchema);

module.exports = User;
