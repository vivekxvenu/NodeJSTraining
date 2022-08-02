import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import {CreateDepartmentDto} from "../dto/CreateDepartmentDto";
import { UuidDto } from "../dto/UuidDto";
import authorize from "../middleware/authorize";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`,authorize(['sde','admin']), this.departmentResponse);
    this.router.post(`${this.path}`,authorize(['admin']),validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),this.createDepartment);
    this.router.put(`${this.path}/:id`,authorize(['admin']), validationMiddleware(UuidDto, APP_CONSTANTS.params), validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),this.updateDepartmentDetails)
    this.router.delete(`${this.path}/:id`,authorize(['admin']), validationMiddleware(UuidDto, APP_CONSTANTS.params), this.softDeleteDepartmentById)
    this.router.get(`${this.path}/:id`,authorize(['sde','admin']),validationMiddleware(UuidDto, APP_CONSTANTS.params), this.getDepartmentId)
  }
  private departmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private softDeleteDepartmentById = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.departmentService.softDeleteDepartmentById(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateDepartmentDetails = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const data = await this.departmentService.updateDepartmentDetails(request.params.id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private getDepartmentId = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try {
      const {id} = request.params;
      const data = await this.departmentService.getDepartmentId(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  
}

export default DepartmentController;
