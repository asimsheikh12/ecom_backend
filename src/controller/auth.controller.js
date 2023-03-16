const { User } = require('../models');
const { jwtService, bcryptService } = require('../services');

exports.signupHandler = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ message: 'Email already exists' });
    }
    const data = await User.create({ firstName, lastName, email, password });
    return res
      .status(201)
      .json({ statusCode: 201, message: 'Signup Successfully!', data });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.loginHandler = async (req, res, _) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.json({ message: 'Invalid credentials' });
    }
    if (!(await user.matchPassword(password))) {
      return res.json({ message: 'Invalid credentials' });
    }
    const token = jwtService.signToken(user._id);

    return res.status(200).json({
      statusCode: 200,
      message: 'Login successfully!',
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.changePassword = async (req, res, _) => {
  try {
    const { user, currentPassword, newPassword } = req.body;

    const data = await User.findOne({ _id: user._id }).select('+password');
    // Check current password
    if (!(await data.matchPassword(currentPassword))) {
      return res.json({
        message: 'Please enter correct password',
      });
    }
    if (await data.matchPassword(newPassword)) {
      return res.json({
        message: 'New password should be different from current password',
      });
    }
    const hashedPassword = await bcryptService.hashPassword(newPassword);
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      statusCode: 200,
      message: 'Password changed successfully!',
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.forgotPassword = async (req, res, _) => {
  try {
    const { user, password } = req.body;

    const data = await User.findOne({ _id: user._id }).select('+password');

    if (await data.matchPassword(password)) {
      return res.json({
        message: 'New password should be different from current password',
      });
    }
    const hashedPassword = await bcryptService.hashPassword(password);
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      statusCode: 200,
      message: 'Password updated successfully!',
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.updateUser = async (req, res, _) => {
  try {
    const { user, email, firstName, lastName } = req.body;

    const data = await User.findOne({ _id: user._id }).select('+password');

    if (!data) {
      return res.json({
        message: 'user does not exist!',
      });
    }
    const result = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          email,
          firstName,
          lastName,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      statusCode: 200,
      message: 'User updated successfully!',
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
