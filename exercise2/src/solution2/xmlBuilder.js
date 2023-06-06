const { create } = require('xmlbuilder2');
const fs = require('fs');
const output = require('./sortEmployees2.js');

let xmlStr = '<root>';

for (let employee of output) {
	if (!employee.managerId) {
		xmlStr = xmlStr +
			`<employee>
                <empId>${employee.empId}</empId>
                <empName>${employee.empName}</empName>
		        <position>${employee.position}</position>
		        <isManager>${employee.isManager}</isManager>  
            </employee>`
	} else {
		xmlStr = xmlStr +
			`<employee>
            <empId>${employee.empId}</empId>
            <empName>${employee.empName}</empName>
		    <position>${employee.position}</position>
		    <managerId>${employee.managerId}</managerId>
		    <isManager>${employee.isManager}</isManager>  
        </employee>`
	}
}

const doc = create(xmlStr);
const xml = doc.end({ prettyPrint: true });

fs.writeFile('./dist/employeesSorted.xml', xml, (err) => {
	if (err) {
		console.error('Error writing XML file:', err);
	} else {
		console.log('XML file created successfully!');
	}
});