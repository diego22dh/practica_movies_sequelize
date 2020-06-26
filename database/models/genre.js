module.exports = (sequelize, dataTypes) => {
    const Genre = sequelize.define("Genre", {
        name: dataTypes.STRING(100),
        ranking: dataTypes.INTEGER(10).UNSIGNED,
        active: dataTypes.BOOLEAN,
    });
    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "genre_id",
        });
    };
    return Genre;
};
