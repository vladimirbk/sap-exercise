const fs = require('fs');
const parser = require('xml-js');

const xmlData = fs.readFileSync('../data/employeesIn.xml', { encoding: 'utf-8' });
const jsonData = parser.xml2json(xmlData, { compact: true, spaces: 4 });
const employees = JSON.parse(jsonData).root.employee;
const output = [];
const hierarchyTree = [];
const managers = employees.filter(employee => employee.isManager._text === 'Y');

function buildHierarchyTree() {
	for (let manager of managers) {
		const subordinates = [];

		for (let i = 0; i < employees.length; i++) {
			if (!employees[i].managerId) continue;

			if (employees[i].managerId._text === manager.empId._text) {
				subordinates.push(employees[i])
			}
		}

		let managerNode = { "manager": manager, "subordinates": subordinates }
		hierarchyTree.push(managerNode);
	}
}

function setRoot(hierarchyTree) {
	hierarchyTree.forEach(node => {
		if (node.manager.position._text === 'ceo') {
			output.push(node.manager);
			output.push(...node.subordinates);

			hierarchyTree.splice(hierarchyTree.indexOf(node), 1);
		}
	});
}

function sortEmployees(hierarchyTree) {
	let i = 1;

	while (i < output.length) {
		hierarchyTree.forEach(node => {
			if (output[i].empId._text === node.manager.empId._text) {
				output.push(...node.subordinates);
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

module.exports = output;