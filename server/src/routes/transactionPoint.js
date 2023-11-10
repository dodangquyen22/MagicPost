const express = require('express');
const route = express.Router();

import transactionSpotController from '../app/controller/transactionSpotController';
import orderController from '../app/controller/orderController';
import accountController from '../app/controller/accountController';
import { router } from '../app';

router.get('/:spotID/orders', orderController.getOrders);

router.get('/:spotID/accounts', accountController.getAccounts);

router.get('/', transactionSpotController.getTransactionSpots);

router.get('/statistic', transactionSpotController.statistics);
