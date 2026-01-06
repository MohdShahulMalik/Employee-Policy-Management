use serde::{Deserialize, Serialize};
use surrealdb::RecordId;

use crate::models::utils::Name;

#[derive(Debug, Serialize)]
pub struct PolicyId {
    pub id: RecordId,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Policy {
    pub id: RecordId,
    pub employee_id: RecordId,
    pub name: Name,
    pub plan: String,
    pub status: String,
    pub effective_date: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PolicyData {
    pub employee_id: RecordId,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<Name>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub plan: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub status: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub effective_date: Option<String>,
}
