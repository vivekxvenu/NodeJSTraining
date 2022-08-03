import { DeepPartial, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees():Promise<Employee[]>{
         const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find();
    }

    public async saveEmployeeDetails(employeeDetails: Employee): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    
    public async softDeleteEmployeeById(employee: Employee): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(employee);
    } 

    async getEmployeeId(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({
            where: {
                id,
            },
            relations: ['address'],
        });
    }


    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails);
        return updateEmployeeDetails;
    }

    public async getEmployeeByName(userName: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: userName },
        });
        return employeeDetail;
    }
    }
