const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @description Handles user login functionality.
 *
 * @route POST /api/user/login
 * @access Public
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object to send back to the client.
 * @return {Object} A JSON response containing user data or an error message.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));

    const sercret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && sercret) {
      res.status(200).json({
        id: user.id,
        emeil: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, sercret, { expiresIn: "1h" }),
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Registers a new user.
 *
 * @route POST /api/user/register
 * @access Public
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object to send back to the client.
 * @return {Promise<void>} A JSON response containing user data or an error message.
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await brypt.genSalt(10);
    const hashedPassword = await brypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const sercret = process.env.JWT_SECRET;

    if ((user, sercret)) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, sercret, { expiresIn: "1h" }),
      });
    } else {
      return res.status(400).json({ message: "Failed to create a user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Returns the currently authenticated user.
 *
 * @route GET /api/user/current
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} A JSON response containing the user data.
 */
const current = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
