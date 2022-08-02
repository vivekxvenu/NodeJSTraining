import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import {CreateEmployeeDto} from "../dto/CreateEmployeeDto";
import validationMiddleware from "../middleware/validationMiddleware";
import { UuidDto } from "../dto/UuidDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.employeeResponse);
    this.router.post(`${this.path}`,validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),this.createEmployee);
        // this.asyncRouteHandler(this.createEmployee)
    this.router.delete(`${this.path}/:id`,validationMiddleware(UuidDto, APP_CONSTANTS.params), this.softDeleteEmployeeById)
    this.router.put(`${this.path}/:id`,validationMiddleware(UuidDto, APP_CONSTANTS.params),validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body), this.updateEmployeeDetails)
    this.router.get(`${this.path}/:id`,validationMiddleware(UuidDto, APP_CONSTANTS.params), this.getEmployeeId)
  }
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private softDeleteEmployeeById = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.employeeService.softDeleteEmployeeById(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateEmployeeDetails = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.employeeService.updateEmployeeDetails(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private getEmployeeId = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const {id} = request.params;
      const data = await this.employeeService.getEmployeeId(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

}

export default EmployeeController;
