'use strict';

const express = require('express'),
      controller = require('./priceSchema.controller.js');
import * as auth from '../../auth/auth.service';

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.view);
router.put('/:id', auth.hasRole('admin'), controller.savePriceSchema);
router.delete('/:id', auth.hasRole('admin'), controller.deletePrice);


module.exports = router;
