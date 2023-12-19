const express = require('express');
const route = express.route();

import transactionSpotController from '../app/controller/transactionSpotController';
import orderController from '../app/controller/orderController';
import accountController from '../app/controller/accountController';

route.get('/:spotID/orders', orderController.getOrders);

route.get('/:spotID/accounts', accountController.getAccounts);

route.get('/', transactionSpotController.getTransactionSpots);

route.get('/statistic', transactionSpotController.statistics);
