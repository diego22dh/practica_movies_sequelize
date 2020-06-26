const {Genre, Movie } = require("../database/models");
const e = require("express");


const genresController = {
    
    allGenres: async (req, res) => {
      const genres = await Genre.findAll();
        
            res.render("genres", { genres})
        
    },
    detail: async (req, res) => {
        const genres = await Genre.findByPk(req.params.id, 
            {
                include: [{ association: "movies" }],
            })
            
            if (genres == null) {
                res.redirect("/");
            }
            res.render("genre-movie", { genres });
            
            
            ;
        },
        
    };

module.exports = genresController;
