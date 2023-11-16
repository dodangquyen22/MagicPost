const express = require('express');
const route = express.Router();

import tracking from '../app/controller/trackController';

route.get('/:packageID', tracking.trackPackage);