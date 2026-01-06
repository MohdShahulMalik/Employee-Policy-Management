#!/bin/bash

# Arrays for realistic data
first_names=("James" "Mary" "John" "Patricia" "Robert" "Jennifer" "Michael" "Linda" "William" "Elizabeth" "David" "Susan" "Joseph" "Jessica" "Thomas" "Sarah" "Charles" "Karen" "Christopher" "Nancy")
last_names=("Smith" "Johnson" "Williams" "Brown" "Jones" "Garcia" "Miller" "Davis" "Rodriguez" "Martinez" "Hernandez" "Lopez" "Gonzalez" "Wilson" "Anderson" "Thomas" "Taylor" "Moore" "Jackson" "Martin")
roles=("Software Engineer" "Project Manager" "Designer" "QA Engineer" "DevOps Engineer" "Product Manager" "Data Scientist" "HR Manager")
policy_names=("Health Insurance" "Dental Insurance" "Vision Insurance" "Life Insurance" "Retirement Plan")
policy_plans=("Basic" "Standard" "Premium" "Gold" "Platinum")
policy_statuses=("Active" "Inactive" "Pending")

# Function to get a random element from an array
get_random() {
  arr=("$@")
  echo "${arr[$RANDOM % ${#arr[@]}]}"
}

# Add 1 Employee
echo "Adding 1 employee..."
first_name=$(get_random "${first_names[@]}")
last_name=$(get_random "${last_names[@]}")
role=$(get_random "${roles[@]}")
email="${first_name,,}.${last_name,,}1@test.com"

response=$(curl -s -X POST -H "Content-Type: application/json" -d '{
  "name": { "first_name": "'"${first_name}"'", "last_name": "'"${last_name}"'" },
  "email": "'"${email}"'",
  "role": "'"${role}"'"
}' http://127.0.0.1:3100/employees)

id=$(echo "${response}" | grep -o '"String":"[^"]*"' | sed 's/"String":"\(.*\)"/\1/')
echo "Added employee: ${first_name} ${last_name} with ID: ${id}"

# Add 1 Policy
echo "Adding 1 policy..."
policy_name=$(get_random "${policy_names[@]}")
policy_plan=$(get_random "${policy_plans[@]}")
policy_status=$(get_random "${policy_statuses[@]}")
year=$((2020 + $RANDOM % 6))
month=$(printf "%02d" $((1 + $RANDOM % 12)))
day=$(printf "%02d" $((1 + $RANDOM % 28)))
effective_date="${year}-${month}-${day}"

policy_first_name=$(echo $policy_name | cut -d' ' -f1)
policy_last_name=$(echo $policy_name | cut -d' ' -f2-)

# Add policy for the employee and print the server response
curl -s -X POST -H "Content-Type: application/json" -d '{
  "employee_id": { "tb": "employees", "id": { "String": "'${id}'" } },
  "name": { "first_name": "'"${policy_first_name}"'", "last_name": "'"${policy_last_name}"'" },
  "plan": "'"${policy_plan}"'",
  "status": "'"${policy_status}"'",
  "effective_date": "'"${effective_date}"'"
}' http://127.0.0.1:3100/policies
