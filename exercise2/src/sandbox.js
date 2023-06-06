//Sandbox with solution practicing

const employees = [
	{
		empId: 'E1',
		empName: 'Employee1',
		position: 'dev',
		managerId: 'E5',
		isManager: 'N'
	},
	{
		empId: 'E2',
		empName: 'Employee2',
		position: 'techLead',
		managerId: 'E10',
		isManager: 'Y'
	},
	{
		empId: 'E3',
		empName: 'Employee3',
		position: 'dev',
		managerId: 'E2',
		isManager: 'N'
	},
	{
		empId: 'E4',
		empName: 'Employee4',
		position: 'tester',
		managerId: 'E5',
		isManager: 'N'
	},
	{
		empId: 'E5',
		empName: 'Employee5',
		position: 'lead',
		managerId: 'E8',
		isManager: 'Y'
	},
	{
		empId: 'E6',
		empName: 'Employee6',
		position: 'dev',
		managerId: 'E2',
		isManager: 'N'
	},
	{
		empId: 'E7',
		empName: 'Employee7',
		position: 'director',
		managerId: 'E8',
		isManager: 'Y'
	},
	{
		empId: 'E8',
		empName: 'Employee8',
		position: 'exec',
		managerId: 'E9',
		isManager: 'Y'
	},
	{
		empId: 'E9',
		empName: 'Employee9',
		position: 'ceo',
		isManager: 'Y'
	},
	{
		empId: 'E10',
		empName: 'Employee10',
		position: 'exec',
		managerId: 'E9',
		isManager: 'Y'
	}
]

let managers = employees.filter(employee => employee.isManager === 'Y');
let hierarchyTree = [];
let result = [];

function buildHierarchyTree() {
	for (let manager of managers) {
		let subordinates = [];

		for (let i = 0; i < employees.length; i++) {
			if (employees[i].managerId === manager.empId) {
				subordinates.push(employees[i])
			}
		}

		let managerNode = { "manager": manager, "subordinates": subordinates }
		hierarchyTree.push(managerNode);
	}
}

function setRoot(hierarchyTree) {
	hierarchyTree.forEach(node => {
		if (node.manager.position === 'ceo') {
			result.push(node.manager);
			result.push(...node.subordinates);

			hierarchyTree.splice(hierarchyTree.indexOf(node), 1);
		}
	});
}

function sortEmployees(hierarchyTree) {
	let i = 1;

	while (i < result.length) {
		hierarchyTree.forEach(node => {
			if (result[i].empId === node.manager.empId) {
				result.push(...node.subordinates);
				hierarchyTree.splice(hierarchyTree.indexOf(node), 1);
			}
		});

		i++;
	}

	if (hierarchyTree.length > 0) sortEmployees(hierarchyTree);
}

buildHierarchyTree();
setRoot(hierarchyTree);
sortEmployees(hierarchyTree);

var fs = require('fs');
fs.writeFile("sorted.json", JSON.stringify(result), function (err, result) {
	if (err) console.log('error', err);
});

fs.writeFile("hierarchyTree.json", JSON.stringify(hierarchyTree), function (err, result) {
	if (err) console.log('error', err);
});
