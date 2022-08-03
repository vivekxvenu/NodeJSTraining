import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find();
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    
    public async softDeleteEmployeeById(employee: Employee) {
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
    // async getEmployeeId(id: string){
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     return employeeRepo.findOne(id);
    // }

    // public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     const updateEmployeeDetails = await employeeRepo.update( {id: employeeId, deletedAt: null} , {
    //         name: employeeDetails.name ? employeeDetails.name : undefined,
    //         departmentId: employeeDetails.departmentId ? employeeDetails.departmentId : undefined
    //     });
    //     return updateEmployeeDetails;
    // }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        //console.log(employeeDetails)
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save({deletedAt: null},employeeDetails);
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
