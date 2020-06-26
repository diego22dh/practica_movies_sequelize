module.exports = (sequelize, dataTypes) => {
    const Actor = sequelize.define("Actor", {
        id: { type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true},
        first_name: dataTypes.STRING(100),
        last_name: dataTypes.STRING(100),
        rating: dataTypes.DECIMAL(3, 1),
    });
    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            foreignKey: "favorite_movie_id",
        });
    };
    return Actor;
};
