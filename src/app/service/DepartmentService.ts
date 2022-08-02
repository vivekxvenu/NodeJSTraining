import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";


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
        return await this.departmentRepo.getDepartmentId(id);
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                //username: employeeDetails.username,
                //age: employeeDetails.age,
                //departmentId: departmentDetails.departmentId,
                //isActive: true,
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
    }
    }
    
    
    
    
    
    
    
    