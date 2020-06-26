const {Genre, Movie } = require("../database/models");
const e = require("express");


const genresController = {
    
    allGenres: async (req, res) => {
      const genre = await Genre.findAll();
        
            res.render("genres", { genres})
        
    },
    detail: async (req, res) => {
        const genres = await Genre.findByPk(req.params.id, 
            {
                include: [{ association: "movies" }, { association: "actors" }],
            })
            
            if (genres == null) {
                res.redirect("/");
            }
            res.render("movie-genre", { genres });
            
            
            ;
        },
        
    };

module.exports = genresController;
