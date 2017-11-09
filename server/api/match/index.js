'use strict';

const express = require('express'),
  controller = require('./match.controller');
import * as auth from '../../auth/auth.service';

const router = express.Router();

router.get('/next', controller.getNextMatches);
router.get('/prev', controller.getPrevMatches);
router.get('/:id', controller.getMatchById);
router.post('/', auth.hasRole('admin'), controller.createMatch);
router.put('/:id', auth.hasRole('admin'), controller.updateMatch);
router.delete('/:id', auth.hasRole('admin'), controller.deleteMatch);

module.exports = router;
