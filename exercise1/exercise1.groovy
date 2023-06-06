import groovy.json.JsonSlurper
import groovy.json.JsonBuilder

inputFile = new File("C:\\Users\\vladb\\OneDrive\\Desktop\\SAP exercise\\exercise1\\input.json")
data = new JsonSlurper().parseText(inputFile.text)

def exerciseA() {
  def employeeIds = data["Employees"].findAll {
    it["Manager"] == "Emp2"
  }.collect {
    it["ID"]
  }

  def output = employeeIds.join(';');

  println(output)
}

def exerciseB() {
  def managers = dataTest = data["Employees"].findAll {
    it["IsManager"] == true
  }

  def output = new groovy.json.JsonBuilder(data).toPrettyString()

  println(output)
}

def exerciseC() {
  def managers = data["Employees"].findAll {
    it["IsManager"]
  }

  def output = [: ]
  output["Managers"] = [];

  managers.each {
    manager ->
      def employees = data["Employees"].findAll {
        it["Manager"] == manager["ID"]
      }.each(employee -> employee.remove("Manager"))

    def managerNode = ["ID": manager["ID"], "Employees": employees]

    output["Managers"].push(["ID": manager["ID"], "Employees": employees])
  }

  def jsonBuilder = new JsonBuilder(output)
  def jsonResult = jsonBuilder.toPrettyString()

  println(jsonResult)
}

exerciseA()
exerciseB()
exerciseC()