// module.exports = app => {
//     const Login = require("../controllers/login.controller.js");

//     var router = require("express").Router();

//     router.post("/", Login.login);

//     router.post("/verifyLogin", Login.verifyLogin);

//     app.use('/api/login', router);
// };

const router = require("express").Router();

const Login = require("../controllers/login.controller.js");




// router.get('/info', (req, res, next) => {

//     // Hi ha una excepcio

//     if(req.hasOwnProperty('usuario') && req.usuario === 'Mariolo'){
//         return res.json({hello: true});
//     }

//     const error = new Error('Ets un imbecil');
//     error.status = 400;
//     return next(error);

    
//   });

// router.use('*', (req, res, next) => {
//     console.log('Hola mario, soc el middleware');
//     req.usuario = 'Mariolo';

//     return next();
// });
  
router.post("/login", Login.login);
router.post("/verifyLogin", Login.verifyLogin);

module.exports = router;