const fs = require('fs');
const parser = require('xml-js');

const xmlData = fs.readFileSync('../data/employeesIn.xml', { encoding: 'utf-8' });
const jsonData = parser.xml2json(xmlData, { compact: true, spaces: 4 });

let employees = JSON.parse(jsonData).root.employee;
let output = [];
let hierarchyTree = [];
let managers = employees.filter(employee => employee.isManager._text === 'Y');

function buildHierarchyTree() {
    for (let manager of managers) {
        let subordinates = [];

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

//Sorting algorithm is not finished
function sortEmployees() {
    hierarchyTree.forEach(node => {
        if (node.manager.position._text === 'ceo') {
            output.push(node.manager);

            node.subordinates.forEach(subordinate => {
                output.push(subordinate);
            })

            hierarchyTree.splice(hierarchyTree.indexOf(node, 1));
        }
    });
}

buildHierarchyTree();
sortEmployees();

module.exports = output;