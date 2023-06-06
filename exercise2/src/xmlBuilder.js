const { create } = require('xmlbuilder2');
const fs = require('fs');
const output = require('./sortEmployees.js');

let xmlStr = '<root>';

for (let employee of output) {
	if (!employee.managerId) {
		xmlStr = xmlStr +
			`<employee>
                <empId>${employee.empId._text}</empId>
                <empName>${employee.empName._text}</empName>
		        <position>${employee.position._text}</position>
		        <isManager>${employee.isManager._text}</isManager>  
            </employee>`
	} else {
		xmlStr = xmlStr +
			`<employee>
            <empId>${employee.empId._text}</empId>
            <empName>${employee.empName._text}</empName>
		    <position>${employee.position._text}</position>
		    <managerId>${employee.managerId._text}</managerId>
		    <isManager>${employee.isManager._text}</isManager>  
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