module.exports = (sequelize, dataTypes) => {
    const Movie = sequelize.define("Movie", {
        title: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        id: { type: dataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true},
        awards: { type: dataTypes.INTEGER(11).UNSIGNED },
        revenue: { type: dataTypes.STRING(255) },
        release_date: { type: dataTypes.DATE },
        length: { type: dataTypes.INTEGER(10) },
    });
    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id",
        });
        Movie.hasMany(models.Actor, {
            as: "actorsFavorite",
            foreignKey: "favorite_movie_id",
        });
        Movie.belongsToMany(models.Actor, {
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
        });
    };
    return Movie;
};
