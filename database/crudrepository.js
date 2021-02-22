const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:", {
  define: { timestamps: false },
}); // Example for sqlite

/*
const sequelize = new Sequelize("test", "", "", {
  dialect: "mariadb",
  define: {
    timestamps: false,
  },
});*/

// Location will be the table name to be Locations,
// even person -> people will work!
const Location = sequelize.define("Location", {
  latitude: { type: DataTypes.DOUBLE, defaultValue: 60 },
  longitude: { type: DataTypes.DOUBLE, defaultValue: 60 },
});

const crudFunctions = {
  connect: async () => {
    await sequelize.authenticate();
    // creates the table if it doesn't exist
    await Location.sync();
  },

  findAll: () => Location.findAll(),

  save: (location) => Location.create(location),

  findById: async (id) => {
    let arr = await Location.findAll({ where: { id } });
    return arr.pop();
  },

  // TODO: test
  deleteById: (id) => Location.destroy({ where: { id } }),
};

module.exports = crudFunctions;
