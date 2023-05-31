//Sandbox with solution practicing

const employees = [
  {
    "empId": "E1",
    "empName": "Employee1",
    "position": "dev",
    "managerId": "E5",
    "isManager": "N"
  },
  {
    "empId": "E2",
    "empName": "Employee2",
    "position": "techLead",
    "managerId": "E10",
    "isManager": "Y"
  },
  {
    "empId": "E3",
    "empName": "Employee3",
    "position": "dev",
    "managerId": "E2",
    "isManager": "N"
  },
  {
    "empId": "E8",
    "empName": "Employee8",
    "position": "exec",
    "managerId": "E9",
    "isManager": "Y"
  },
  {
    "empId": "E5",
    "empName": "Employee5",
    "position": "lead",
    "managerId": "E8",
    "isManager": "Y"
  },
  {
    "empId": "E4",
    "empName": "Employee4",
    "position": "tester",
    "managerId": "E5",
    "isManager": "N"
  },
  {
    "empId": "E6",
    "empName": "Employee6",
    "position": "dev",
    "managerId": "E2",
    "isManager": "N"
  },
  {
    "empId": "E7",
    "empName": "Employee7",
    "position": "director",
    "managerId": "E8",
    "isManager": "Y"
  },
  {
    "empId": "E9",
    "empName": "Employee9",
    "position": "ceo",
    "isManager": "Y"
  },
  {
    "empId": "E10",
    "empName": "Employee10",
    "position": "exec",
    "managerId": "E9",
    "isManager": "Y"
  }
];

let managers = employees.filter(employee => employee.isManager === 'Y');
let hierarchyTree = [];
let result = [];

function buildHierarchyTree() {
  for (let manager of managers) {
    let subordinates = [];

    for (let i = 0; i < employees.length; i++) {
      // if (!employees[i].managerId) continue;

      if (employees[i].managerId === manager.empId) {
        subordinates.push(employees[i])
      }
    }

    let managerNode = { "manager": manager, "subordinates": subordinates }
    hierarchyTree.push(managerNode);
  }
}

function sortEmployees() {
  hierarchyTree.forEach(node => {
    if (node.manager.position === 'ceo') {
      result.push(node.manager);

      node.subordinates.forEach(subordinate => {
        result.push(subordinate);
      })

      hierarchyTree.splice(hierarchyTree.indexOf(node, 1));
    }
  });
}

buildHierarchyTree();
sortEmployees();
