#!/bin/bash

# Arrays for realistic data
first_names=("James" "Mary" "John" "Patricia" "Robert" "Jennifer" "Michael" "Linda" "William" "Elizabeth" "David" "Susan" "Joseph" "Jessica" "Thomas" "Sarah" "Charles" "Karen" "Christopher" "Nancy")
last_names=("Smith" "Johnson" "Williams" "Brown" "Jones" "Garcia" "Miller" "Davis" "Rodriguez" "Martinez" "Hernandez" "Lopez" "Gonzalez" "Wilson" "Anderson" "Thomas" "Taylor" "Moore" "Jackson" "Martin")
roles=("Software Engineer" "Project Manager" "Designer" "QA Engineer" "DevOps Engineer" "Product Manager" "Data Scientist" "HR Manager")
policy_names=("Health Insurance" "Dental Insurance" "Vision Insurance" "Life Insurance" "Retirement Plan")
policy_plans=("Basic" "Standard" "Premium" "Gold" "Platinum")
policy_statuses=("Active" "Inactive" "Pending")

# Array to store employee IDs
declare -a employee_ids

# Function to get a random element from an array
get_random() {
  arr=("$@")
  echo "${arr[$RANDOM % ${#arr[@]}]}"
}

# Add 51 Employees
echo "Adding 51 employees..."
for i in {1..51}
do
  first_name=$(get_random "${first_names[@]}")
  last_name=$(get_random "${last_names[@]}")
  role=$(get_random "${roles[@]}")
  email="${first_name,,}.${last_name,,}${i}@test.com" # Using ,, for lowercase in bash 4+

  # Send POST request to add employee and capture the response
  response=$(curl -s -X POST -H "Content-Type: application/json" -d '{
    "name": { "first_name": "'"${first_name}"'", "last_name": "'"${last_name}"'" },
    "email": "'"${email}"'",
    "role": "'"${role}"'"
  }' http://127.0.0.1:3100/employees)

  # Extract the employee ID from the response using grep and sed
  id=$(echo "${response}" | grep -o '"String":"[^"]*"' | sed 's/"String":"\(.*\)"/\1/')
  employee_ids+=("${id}")
  echo "Added employee: ${first_name} ${last_name}"
done

# Add 102 Policies (2 for each employee)
echo "Adding 102 policies..."
for id in "${employee_ids[@]}"
do
  for j in {1..2}
  do
    policy_name=$(get_random "${policy_names[@]}")
    policy_plan=$(get_random "${policy_plans[@]}")
    policy_status=$(get_random "${policy_statuses[@]}")
    year=$((2020 + $RANDOM % 6))
    month=$(printf "%02d" $((1 + $RANDOM % 12)))
    day=$(printf "%02d" $((1 + $RANDOM % 28)))
    effective_date="${year}-${month}-${day}"
    
    # Split policy name into first and last name for the model
    policy_first_name=$(echo $policy_name | cut -d' ' -f1)
    policy_last_name=$(echo $policy_name | cut -d' ' -f2-)

    # Add policy for the employee
    curl -s -X POST -H "Content-Type: application/json" -d '{
      "employee_id": { "tb": "employees", "id": { "String": "'${id}'" } },
      "name": { "first_name": "'"${policy_first_name}"'", "last_name": "'"${policy_last_name}"'" },
      "plan": "'"${policy_plan}"'",
      "status": "'"${policy_status}"'",
      "effective_date": "'"${effective_date}"'"
    }' http://127.0.0.1:3100/policies
  done
done

echo "Database population complete."
