import express from 'express'
import CompanyController from '../controllers/CompanyController.js'
import verifyJwtToken from '../middlewares/authJwt.js'

const companyRoutes = express.Router()

companyRoutes.get('/', CompanyController.getAllCompanys)
companyRoutes.post('/', CompanyController.createCompany)
companyRoutes.put('/:id', CompanyController.updateCompany)
companyRoutes.delete('/:id', CompanyController.deleteCompany)

export default companyRoutes;
