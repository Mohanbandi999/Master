import { AppRoutingModule } from "../app-routing.module";

export interface ProfileUser {
    uid?: string;
    firstName?: string;
    lastName?: string;
    dob?:string;
    phone?: string;
    email?: string;
    officeEmail?:string;
    doj?:string;
    designation?:string;
    project?:string;
    address?: string;
    skillSet?:Array<string>;
    photoURL?:string;
    userId?:string;

    
    
    // internal use properties
    emailVerified?: boolean;    
    password?:string;
    confirmPassword?:string;
    displayName?: string;
    gender?:string;
    //hiredate?:string;
    role?:string;
    isActive?:boolean;
  }