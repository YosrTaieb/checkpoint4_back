// Ce fichier contient toutes les routes disponibles c'est le ROUTER de notre serveur
// Il importe tous les controllers

import articleController from '../controllers/articleController.js';
import securityController from '../controllers/securityController.js';
import adminController from '../controllers/adminController.js';

// Il exporte toutes les routes de l'application
export const setupRoutes = (app) => {
    app.use('/', articleController);
    app.use('/security', securityController);
    app.use('/admin', adminController);
    // ... les autres routes ...
}