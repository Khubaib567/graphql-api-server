module.exports = (sequelize, DataTypes) => {
const Employee = sequelize.define("employees", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 1
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    age : {
      type: DataTypes.INTEGER,
      required : true
    },
    class: {
      type: DataTypes.STRING,
      required: true
    },
    subjects: {
      type: DataTypes.STRING,
      required: true
    },
    attendance : {
      type: DataTypes.STRING,
      required: true
    },
    createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    }

})
    return Employee;
};


 