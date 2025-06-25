import express from 'express'
import CompanyController from '../controllers/CompanyController.js'
import verifyJwtToken from '../middlewares/authJwt.js'

const CompanyRoutes = express.Router()

CompanyRoutes.get('/', CompanyController.getAllCompanys)
CompanyRoutes.get('/:id', CompanyController.getCompanyById)
CompanyRoutes.post('/', CompanyController.createCompany)
CompanyRoutes.put('/:id', CompanyController.updateCompany)
CompanyRoutes.delete('/:id', CompanyController.deleteCompany)

export default CompanyRoutes;
