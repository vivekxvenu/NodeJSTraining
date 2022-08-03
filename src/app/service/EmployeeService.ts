import { plainToClass } from "class-transformer";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { Address } from "../entities/Address";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";

export class EmployeeService {
    constructor(private employeeRepo: EmployeeRespository) { }
    async getAllEmployees() {
        return await this.employeeRepo.getAllEmployees();

    }

    public async softDeleteEmployeeById(id: string){
      
      const employee = await this.getEmployeeId(id)
    
      return await this.employeeRepo.softDeleteEmployeeById(employee); 
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: UpdateEmployeeDto) {
      try{
        const newAddress = plainToClass(Address,{
          id: employeeDetails.address.id,
          line1: employeeDetails.address.line1,
          line2: employeeDetails.address.line2,
          city: employeeDetails.address.city,
          state: employeeDetails.address.state,
          country: employeeDetails.address.country,
          pincode: employeeDetails.address.pincode
        });

        const newEmployee= plainToClass(Employee,{
          id: employeeId,
          name: employeeDetails.name,
          joiningDate:employeeDetails.joiningDate,
          departmentId: employeeDetails.departmentId,
          username: employeeDetails.username,
          password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10): '',
          role: employeeDetails.role,
          experience: employeeDetails.experience,
          address: newAddress,
          isActive: true,
        });

        return await this.employeeRepo.updateEmployeeDetails(employeeId,newEmployee);
        }
        catch(err){
          throw(err)
        }
      
        
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

          const newAddress = plainToClass(Address,{
            
            line1: employeeDetails.address.line1,
            line2: employeeDetails.address.line2,
            city: employeeDetails.address.city,
            state: employeeDetails.address.state,
            country: employeeDetails.address.country,
            pincode: employeeDetails.address.pincode

          })
            const newEmployee= plainToClass(Employee,{
                name: employeeDetails.name,
                joiningDate:employeeDetails.joiningDate,
                departmentId: employeeDetails.departmentId,
                username: employeeDetails.username,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10): '',
                role: employeeDetails.role,
                experience: employeeDetails.experience,
                address: newAddress,
                isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "")
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}







