import { DepartmentModel } from "../models/Departments.js";
import dotenv from "dotenv";
dotenv.config();

export const addDepartment = async (req,res)=>{
    try{
    const { name , description } = req.body;

    let department = await DepartmentModel.findOne({departmentName:name})
    if(department){
        return res.json({
            responsecode: "402",
            message: "This department name is already added.",
        });
    }

    department = await new DepartmentModel({ departmentName:name, departmentDescription:description }).save();

    return res.json({
        responsecode: "200",
        message: "Successfully added.",
    });
}catch(err){
    console.log(err);
		return res.status(500).send({
			responsecode: "500",
			message: "Please contact technical support.",
		});
}
}