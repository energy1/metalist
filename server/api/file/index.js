'use strict';

const express = require('express'),
  controller = require('./file.controller');
import * as auth from '../../auth/auth.service';

const router = express.Router();

router.get('/teamLogos', auth.hasRole('admin'), controller.getTeamLogos);
router.post('/upload', auth.hasRole('admin'), controller.uploadFile);

module.exports = router;