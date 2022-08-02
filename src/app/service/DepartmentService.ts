import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";


export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository){}
    async getAllDepartments(){
        return await this.departmentRepo.getAllDepartments();
        
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                dept_name: departmentDetails.name,
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
    
    
    
    
    
    
    
    