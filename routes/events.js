const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
//Todas tienen que pasar por la validación del JWT

/*
    Event Routes
    /api/events
*/

//Validar token para todos los routers de la siguiente forma, si necesidad de poner el middleware en todos los routes

router.use( validarJWT );


//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo eventos
router.get(
    '/new',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], 
    crearEvento);

//Actualizar eventos
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

//Borrar eventos
router.delete('/:id', eliminarEvento);


module.exports = router;