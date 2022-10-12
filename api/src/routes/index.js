const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const pokeroute = require("./pokemonroute")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokeroute)


module.exports = router;
