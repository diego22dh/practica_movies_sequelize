var express = require("express");
var router = express.Router();
const { Movie, Actor, Genre } = require("../database/models");
const moviesController = require ("../controllers/movies");
const actorsController = require("../controllers/actors");
const genresController = require("../controllers/genres");

const { check, body, validationResult } = require("express-validator");

//Mostrar todas las peliculas//
router.get("/", moviesController.home);
router.get("/movies", moviesController.allMovies);
router.get("/genres", genresController.allGenres);

router.get("/genres/detail/:id", genresController.detail);
router.get("/actors/detail/:id", actorsController.detail);


//Mostrar detalle de las peliculas//
router.get("/movies/detail/:id", moviesController.detail);


//Crear Pelicula//

router.get("/movies/create", moviesController.showToCreate);
router.post("/movies/create", moviesController.create);



//Editar Pelicula//

router.get("/movies/edit/:id", moviesController.showToEdit);
router.put(
    "/movies/edit/:id",
    [
        check("awards").isInt({ min: 0 }).withMessage("Los Preios deben ser 0 o mayor que 0"),
        check("revenue").isInt({ min: 0 }).withMessage("Las Ganancias deben ser mayor que 0"),
    ],
    moviesController.edit
);

//Borrar Pelicula//
router.delete("/movies/edit/:id", moviesController.delete);


module.exports = router;



