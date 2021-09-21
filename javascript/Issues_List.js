//issues_list=[];
id_list = [];
//number = 1;
BODY = "";
possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function check_duplication(description, severity, assignedTo, add_button) {
    let issues_list=JSON.parse(window.localStorage.getItem('issues_list'));
    for (let i = 0; i < issues_list.length; i++) {
        if (issues_list[i].description === description && issues_list[i].value === severity &&
            issues_list[i].assignedTo === assignedTo) {
            add_button.disabled = true;
            window.confirm("The issue is already in the system");
            break;
        }
    }
}
class Issues_List {
    static addIssue(description, severity, assignedTo, body) {
        /*BODY = body;
        if (Issues_List.check_empty_list()) {
            Issues_List.add_order_issues_button();
        }*/
        let date_time = new Date().toLocaleString();
        let issue = new Issue(description.value, severity.value, assignedTo.value, date_time);
        let issues_list=[];
        issues_list= JSON.parse(window.localStorage.getItem('issues_list')) || [];
        issues_list.push(issue);
       // BODY.innerHTML += Issues_List.create_issue_box(issue);
        Issues_List.reset_form(description, severity, assignedTo);
        window.localStorage.setItem('issues_list',JSON.stringify(issues_list));
        window.location.reload();
    }
    static reset_form(description, severity, assignedTo) {
        description.value = "";
        severity.value = 1;
        assignedTo.value = "";
    }
    static create_issue_box(issue) {
        let enabled = issue.status == "open" ? "" : "disabled";
        return issue_box(issue,enabled);
    }
    static add_order_issues_button() {
        BODY.innerHTML = order_issues_button();
    }
    static check_empty_list() {
        if (issues_list.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    static orderIssues() {
        let issues_list=[];
        issues_list=JSON.parse(window.localStorage.getItem('issues_list'));
        issues_list.sort(function (a, b) {
            return a.value - b.value;
        });
        //Issues_List.build_issues_area();
        window.localStorage.setItem('issues_list',JSON.stringify(issues_list));
        window.location.reload(); 
    }
    static callClose(id) {
        let issues_list=[];
        issues_list=JSON.parse(window.localStorage.getItem('issues_list'));
        issues_list.filter(function (item) {
            if (item.number === id) {
                item.status = "closed";
            }
        })
        //Issues_List.build_issues_area();
        window.localStorage.setItem('issues_list',JSON.stringify(issues_list));
        window.location.reload(); 
    }
    static build_issues_area() {
        BODY.innerHTML = "";
        if (!Issues_List.check_empty_list()) {
            Issues_List.add_order_issues_button()
        }
        for (let i = 0; i < issues_list.length; i++) {
            BODY.innerHTML += Issues_List.create_issue_box(issues_list[i]);
        }
    }
    static callDelete(id) {
        if (window.confirm("Do you really want to delete the selected issue?")) {
            Issues_List.deleteIssue(id);
        }
    }
    static deleteIssue(id) {
        let issues_list=[];
        issues_list=JSON.parse(window.localStorage.getItem('issues_list'));
        issues_list = issues_list.filter(function (item) {
            return item.number !== id
        })
        //Issues_List.build_issues_area();
        window.localStorage.setItem('issues_list',JSON.stringify(issues_list));
        window.location.reload(); 
    }
}

class Issue {
    constructor(description, severity, assignedTo, date_time) {
        this.description = description;
        if (severity == 1)
            this.severity = "Low";
        else if (severity == 2)
            this.severity = "Medium";
        else
            this.severity = "High";
        this.value = severity;
        this.assignedTo = assignedTo;
        this.date_time = date_time;
        this.status = "open";
        this.ID = this.generateID();
        this.number =parseInt(window.localStorage.getItem('number'));
        window.localStorage.setItem('number',this.number+1);
    }
    generateID() {
        let id = "";
        for (let i = 0; i < 5; i++) {
            let size = Math.random() * 10 + 1;
            for (let j = 0; j < size; j++) {
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            if (i != 4) {
                id += "-";
            }
        }
        while(id_list.indexOf(id)!=-1){
            id=this.generateID();
        }
        id_list.push(id);
        return id;
    }
};
