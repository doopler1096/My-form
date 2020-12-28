export const valName = (value)=>{
    return !/[^A-Za-z\s\,]/.test(value);
  }
  
  export const valCorreo = (value)=>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
  }
  
  
  export const valEdad = (value)=>{
    return /^([0-9])*$/.test(value);
  }