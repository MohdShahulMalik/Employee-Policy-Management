use serde::{Deserialize, Serialize};
use surrealdb::RecordId;

use crate::models::utils::Name;

#[derive(Debug, Serialize)]
pub struct EmployeeId {
    pub id: RecordId,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Employee {
    pub name: Name,
    pub id: RecordId,
    pub email: String,
    pub role: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EmployeeData {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<Name>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
}
