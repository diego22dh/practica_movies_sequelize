const { Actor, Movie } = require("../database/models");
const e = require("express");

const actorsController = {
    allActors: async (req, res) => {
        const actor = await Actor.findAll();

        res.render("actors", { actor });
    },
    detail: async (req, res) => {
        const actor = await Actor.findByPk(req.params.id,
            {
                include : { association: "movies" },
            });
        const movie = await Movie.findAll();

          
        
        res.render("actor-movie", { actor, movie });
    },
};

module.exports = actorsController;
