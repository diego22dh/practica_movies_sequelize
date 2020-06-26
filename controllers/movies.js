const { Movie, Genre} = require("../database/models");
const { check, body, validationResult } = require("express-validator");

const moviesController = {
    home: (req, res) => {
        res.redirect("/movies");
    },
    allMovies: async (req, res) => {
        const movies = await Movie.findAll();
        res.render("movies", { movies });
    },
    detail: async (req, res) => {
        const movie = await Movie.findByPk(req.params.id, {
            include: [
                { association: "genre" },
                { association: "actors" },
                { association: "actorsFavorite"},
            ],
        });
        if (movie == null) {
            res.redirect("/");
        }
        // res.send({ movie});
        res.render("movie-detail",{ movie});
        
    },
    showToCreate: async (req, res) => {
        const genres = await Genre.findAll();

        res.render("movie-create", { genres });
    },
    create: (req, res) => {
        const movie =  Movie.create({
            ...req.body,
        });
        
        res.redirect("/movies/");
    },
    showToEdit: async (req, res) => {
        const movie = await Movie.findByPk(req.params.id);
        const genres = await Genre.findAll();
        res.render("movie-edit", { movie, genres });
    },
    edit: async (req, res) => {
        const movie = await Movie.findByPk(req.params.id);
        let errors = validationResult(req);

        if (errors.isEmpty()){

        Movie.update({
            ...req.body,
        }, {
            where : {
                id: req.params.id
            }
        });
        res.redirect("/movies/edit/" +req.params.id);}
        else {
            return res.render("movie-edit", { movie, errors: errors.errors})
        }
    },
    delete: (req, res) => {
        
        Movie.destroy({
            where : {
                id: req.params.id
            }
        });
        res.redirect("/movies");

    }
};

module.exports = moviesController;