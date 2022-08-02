import { plainToClass } from "class-transformer";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";

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

    async getEmployeeId(id: string){

        const employee = await this.employeeRepo.getEmployeeId(id);
        if(!employee){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        return employee
    }

    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {
            const newEmployee= plainToClass(Employee,{
                name: employeeDetails.name,
                joiningDate:employeeDetails.joiningDate,
                departmentId: employeeDetails.departmentId,
                username: employeeDetails.username,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10): '',
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







