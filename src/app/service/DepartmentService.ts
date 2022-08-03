import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";
import { ErrorCodes } from "../util/errorCode";


export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository){}
    async getAllDepartments(){
        return await this.departmentRepo.getAllDepartments();
        
    }
    public async softDeleteDepartmentById(id: string) {
        return await this.departmentRepo.softDeleteDepartmentById(id);
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: any) {
        return await this.departmentRepo.updateDepartmentDetails(departmentId,departmentDetails);
    }

    async getDepartmentId(id: string){
        const department = await this.departmentRepo.getDepartmentId(id);
        if(!department){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        return department
        //return await this.departmentRepo.getDepartmentId(id);
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw(err)
        }
    }
    }
    
    
    
    
    
    
    
    