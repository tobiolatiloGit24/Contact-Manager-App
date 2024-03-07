const express = require('express');
const router = express.Router();
// const { dashboard } = require('../controllers/userController')
const customerController = require('../controllers/customerController');
const validateToken = require("../middleware/validateTokenHandler")

/**
 *  Customer Routes 
*/

// router.use((req, res, next) => { validateToken(req, res, next) })


router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.viewCustomer);
router.get('/update/:id', customerController.updateCustomer);
router.put('/update/:id', customerController.updatePostCustomer);
router.delete('/update/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomers);



module.exports = router;