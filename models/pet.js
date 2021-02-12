module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define('pet', {
        dogname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        citylocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        statelocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photourl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Pet;
};