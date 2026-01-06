use actix_web::{web, HttpResponse};
use crate::{
    database::initialize::get_db,
    error::AppError,
    models::{policy::{Policy, PolicyData, PolicyId}, utils::Count},
};

pub async fn add_policy(policy: web::Json<PolicyData>) -> Result<HttpResponse, AppError> {
    let policy_data: PolicyData = policy.into_inner();
    let db = get_db();

    let policy_option: Option<Policy> = db.create("policies")
        .content(policy_data)
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;
    let policy_record = policy_option.ok_or(AppError::NotExists)?;
    let policy_id = PolicyId { id: policy_record.id };

    Ok(HttpResponse::Created().json(policy_id))
}

pub async fn delete_policy(id: web::Path<String>) -> Result<HttpResponse, AppError> {
    let record_id = id.into_inner();
    let db = get_db();
    let _: Option<Policy> = db.delete(("policies", record_id))
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().body("Policy Deleted successfully"))
}

pub async fn get_policy() -> Result<HttpResponse, AppError> {
    let db = get_db();

    let policy_records: Vec<Policy> = db.select("policies")
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().json(policy_records))
}

pub async fn get_policy_no() -> Result<HttpResponse, AppError>{
   let db = get_db();
   let mut response = db.query("Select count() FROM policies GROUP ALL")
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

pub async fn update_policy(policy: web::Json<PolicyData>, id: web::Path<String>) -> Result<HttpResponse, AppError> {
    let new_policy: PolicyData = policy.into_inner();
    let record_id = id.into_inner();

    let db = get_db();
    let _: Option<Policy> = db.update(("policies", record_id))
        .merge(new_policy)
        .await
        .map_err(|e| AppError::DatabaseError(Box::new(e)))?;

    Ok(HttpResponse::Ok().body("Successfully updated the policy"))
}
