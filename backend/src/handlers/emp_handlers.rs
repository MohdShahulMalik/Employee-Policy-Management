use actix_web::{web, HttpResponse};
use crate::{
    database::initialize::get_db,
    error::AppError,
    models::{emp::{Employee, EmployeeData, EmployeeId}, utils::Count},
};

pub async fn add_emp(emp: web::Json<EmployeeData>) -> Result<HttpResponse, AppError> {
    let emp_data: EmployeeData = emp.into_inner();
    let db = get_db();

    let emp_record_option: Option<Employee> = db.create("employees")
        .content(emp_data)
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;
    let emp_record = emp_record_option.ok_or(AppError::NotExists)?;
    let emp_id = EmployeeId { id: emp_record.id };

    Ok(HttpResponse::Created().json(emp_id))
}

pub async fn delete_emp(id: web::Path<String>) -> Result<HttpResponse, AppError> {
    let record_id = id.into_inner();
    let db = get_db();
    let _: Option<Employee> = db.delete(("employees", record_id))
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().body("Employee Deleted successfully"))
}

pub async fn get_emp() -> Result<HttpResponse, AppError> {
    let db = get_db();

    let emp_records: Vec<Employee> = db.select("employees")
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().json(emp_records))
}

pub async fn get_emp_no() -> Result<HttpResponse, AppError>{
   let db = get_db();
   let mut response = db.query("Select count() FROM employees GROUP ALL")
       .await
       .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

   let count: Option<i64> = response.take("count")
       .map_err(|e| AppError::DatabaseError(Box::new(e)))?;
   let count_response = {
       if let Some(c) = count {
           Count {
               count: c,
           }
       }else {
           Err(AppError::Internal)?
       }
   };

   Ok(HttpResponse::Ok().json(count_response))
}

pub async fn update_emp(emp: web::Json<EmployeeData>, id: web::Path<String>) -> Result<HttpResponse, AppError> {
    let new_emp: EmployeeData = emp.into_inner();
    let record_id = id.into_inner();

    let db = get_db();
    let _: Option<Employee> = db.update(("employees", record_id))
        .merge(new_emp)
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().body("Successfully updated the employee"))
}
