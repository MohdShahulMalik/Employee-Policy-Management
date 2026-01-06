use actix_web::{HttpResponse, ResponseError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError{
    #[error("Database error: {0}")]
    DatabaseError(#[from] Box<surrealdb::Error>),

    #[error("Some internal server error occurred")]
    Internal,

    #[error("Requested data doesn't exists on the database")]
    NotExists,

    #[error("Incorrect Data: {0}")]
    IncorrectDataFormat(String),
}

impl ResponseError for AppError {
    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        match self {
            AppError::DatabaseError(e) => HttpResponse::InternalServerError().body(format!("Database Error: {e}")),

            AppError::Internal => HttpResponse::InternalServerError().body("Some internal error occured"),

            AppError::NotExists => HttpResponse::NotFound().body("Requested data doesn't exists on the database"),

            AppError::IncorrectDataFormat(msg) => HttpResponse::BadRequest().body(format!("Incorrect Data: {msg}"))
        }
    }
}
