/* 
    Even though, i had to map employees object myself,
    using the solution below, i was able to omit 'xml-js' library,
    which potentially icreases programs performance.
    In addition to that, mapping the object manually without using any library,
    allowed me not to use '._text' key when accessing employee object's values.
*/

const fs = require('fs');
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser

const xmlData = fs.readFileSync('../../data/employeesIn.xml', { encoding: 'utf-8' });
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlData.replace(/\s/g, ''), "text/xml");
const mappedEmployees = [];
const hierarchyTree = [];
const output = [];
const employees = xmlDoc.getElementsByTagName("employee");
let managers = [];

//Map employees object
function mapEmployeesObject() {
    for (let i = 0; i < employees.length; i++) {
        const employeeObject = {}

        for (let j = 0; j < employees[i].childNodes.length; j++) {
            employeeObject[employees[i].childNodes[j].nodeName] = employees[i].childNodes[j].innerHTML
        }
        mappedEmployees.push(employeeObject)
    }
}

//Build hierarchy tree containing manager and corresponding subordinates
function buildHierarchyTree() {
    for (let manager of managers) {
        const subordinates = [];

        for (let i = 0; i < mappedEmployees.length; i++) {
            if (mappedEmployees[i].managerId === manager.empId) {
                subordinates.push(mappedEmployees[i])
            }
        }

        let managerNode = { "manager": manager, "subordinates": subordinates }
        hierarchyTree.push(managerNode);
    }
}

//Set the root (ceo) of the output data and it's subordinates
function setRoot(hierarchyTree) {
    hierarchyTree.forEach(node => {
        if (node.manager.position === 'ceo') {
            output.push(node.manager);
            output.push(...node.subordinates);

            hierarchyTree.splice(hierarchyTree.indexOf(node), 1);
        }
    });
}

//Flatten hierarchy tree to properly sorted array, using recursion
function sortEmployees(hierarchyTree) {
    let i = 1;

    while (i < output.length) {
        hierarchyTree.forEach(node => {
            if (output[i].empId === node.manager.empId) {
                output.push(...node.subordinates);
                hierarchyTree.splice(hierarchyTree.indexOf(node), 1);
            }
        });

        i++;
    }

    if (hierarchyTree.length > 0) sortEmployees(hierarchyTree);
}

mapEmployeesObject();

managers = mappedEmployees.filter(employee => employee.isManager === 'Y');

buildHierarchyTree();
setRoot(hierarchyTree);
sortEmployees(hierarchyTree);

module.exports = output;