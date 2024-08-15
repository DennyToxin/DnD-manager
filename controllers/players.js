const { prisma } = require("../prisma/prisma-client");

/**
 * @description Retrieves a list of all players.
 *
 * @route GET /api/players
 * @access Private
 * @param {object} req - The incoming HTTP request.
 * @param {object} res - The outgoing HTTP response.
 * @return {object} A JSON response containing the list of players or an error message.
 */
const all = async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      where: {
        userId: req.user.id,
      },
    });
    if (players.length === 0) {
      res.status(404).json({ message: "No players found" });
    }
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Failed to get players" });
  }
};

/**
 * @description Creates a new player in the database.
 *
 * @route POST /api/players/add
 * @access Private
 * @param {object} req - The incoming HTTP request containing player data.
 * @param {object} res - The outgoing HTTP response.
 * @return {object} A JSON response containing the newly created player or an error message.
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName) {
      res.status(400).json({ message: "Some fields are missing" });
    }

    const player = await prisma.player.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: "Failed to add player" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.player.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Player removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove player" });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const player = await prisma.player.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit player" });
  }
};

const player = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: "Failed to get player" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  player,
};
