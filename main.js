// Define the company hierarchy with employees and their salaries
const company = {
  name: 'CEO', salary: 300000, subordinates: [
    { 
      name: 'CTO', salary: 200000, subordinates: [
        { name: 'Dev1', salary: 100000, subordinates: [] },
        { name: 'Dev2', salary: 110000, subordinates: [] }
      ]
    },
    {
      name: 'CFO', salary: 190000, subordinates: [
        { name: 'Accountant1', salary: 90000, subordinates: [] },
        { name: 'Accountant2', salary: 95000, subordinates: [] }
      ]
    }
  ]
};

// Function to go through the hierarchy and collect information
function traverseHierarchy(employee, departmentSummary) {
  // Start with the employee's own salary
  let totalSalary = employee.salary;
  // Start with the employee's own name
  let employeeNames = [employee.name];

  // Check if this employee has the highest salary seen so far
  if (!traverseHierarchy.highestPaid || employee.salary > traverseHierarchy.highestPaid.salary) {
    traverseHierarchy.highestPaid = employee;
  }

  // Process each subordinate (employee working under this employee)
  for (const subordinate of employee.subordinates) {
    // Get information from the subordinate
    const subResult = traverseHierarchy(subordinate, departmentSummary);
    // Add the subordinate's total salary to this employee's total salary
    totalSalary += subResult.totalSalary;
    // Add the subordinate's names to this employee's list of names
    employeeNames = employeeNames.concat(subResult.employeeNames);
  }

  // Save the total salary and names for this employee's department
  departmentSummary[employee.name] = { totalSalary, employeeNames };

  // Return the total salary and names for further use
  return { totalSalary, employeeNames };
}

// Function to process the whole company hierarchy
function processCompanyHierarchy(company) {
  // Object to store information about each department
  const departmentSummary = {};
  // Reset the highest paid employee tracker
  traverseHierarchy.highestPaid = null;
  // Start the hierarchy traversal from the top (CEO)
  traverseHierarchy(company, departmentSummary);
  // Get the highest paid employee found
  const highestPaidEmployee = traverseHierarchy.highestPaid;
  // Get the top 3 departments by total salary, sorted in descending order
  const topDepartments = Object.entries(departmentSummary)
    .sort((a, b) => b[1].totalSalary - a[1].totalSalary)
    .slice(0, 3)
    .map(([name, summary]) => ({ name, ...summary }));

  // Return the collected information
  return { departmentSummary, highestPaidEmployee, topDepartments };
}

// Process the company hierarchy and get the results
const result = processCompanyHierarchy(company);

// results
console.log('Department Summary:');
for (const [department, summary] of Object.entries(result.departmentSummary)) {
  console.log(`Department: ${department}\nTotal Salary: ${summary.totalSalary}\nEmployees: ${summary.employeeNames.join(', ')}\n`);
}

console.log('Highest Paid Employee:');
console.log(`Name: ${result.highestPaidEmployee.name}\nSalary: ${result.highestPaidEmployee.salary}\n`);

console.log('Top 3 Departments by Total Salary:');
result.topDepartments.forEach((dept, index) => {
  console.log(`${index + 1}. Department: ${dept.name}\n   Total Salary: ${dept.totalSalary}\n   Employees: ${dept.employeeNames.join(', ')}\n`);
});

  