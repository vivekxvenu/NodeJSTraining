import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService {
    constructor(private employeeRepo: EmployeeRespository) { }
    async getAllEmployees() {
        return await this.employeeRepo.getAllEmployees();

    }

    public async softDeleteEmployeeById(id: string) {
        return await this.employeeRepo.softDeleteEmployeeById(id);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        return await this.employeeRepo.updateEmployeeDetails(employeeId,employeeDetails);
    }

    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee= plainToClass(Employee,{
                name: employeeDetails.name,
                joiningDate:employeeDetails.joining_date,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role,
                experience: employeeDetails.experience,
                isActive: true,
            });
            // const newEmployee= {
            //     name: employeeDetails.name,
            //     username: employeeDetails.username,
            //     age: employeeDetails.age,
            //     departmentId: employeeDetails.departmentId,
            //     isActive: true,
            // } as Employee;
            // const newEmployee = employeeDetails as Employee;
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
            throw err;
        }
    }
}







