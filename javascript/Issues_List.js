issues_list = [];
number = 1;
BODY = "";
possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
class Issues_List {
    static addIssue(description, severity, assignedTo, body) {
        BODY = body;
        if ( Issues_List.check_empty_list()) {
            Issues_List.add_order_issues_button();
        }
        let date_time = new Date().toLocaleString();
        let issue = new Issue(description.value, severity.value, assignedTo.value, date_time);
        issues_list.push(issue);
        BODY.innerHTML += Issues_List.create_issue_box(issue);
        Issues_List.reset_form(description,severity,assignedTo);
    }
    static reset_form(description,severity,assignedTo){
        description.value="";
        severity.value=1;
        assignedTo.value="";
    }
    static create_issue_box(issue){
        let enabled=issue.status=="open"?"":"disabled";
        return  '<div class="rounded secondary-color p-3 pt-4 mb-3">' +
            '<div class="row issue-id px-3 mb-2">Issue ID: ' + issue.ID + '</div>' +
            '<div class="row issue-id px-3 mb-2">' +
            '<button type="button" class="btn btn-info btn-sm px-1 py-0 button-title font-weight-bold" disabled>' +
            issue.status + '</button></div>' +
            '<div class="row form-title px-3 mb-2">' + issue.description + '</div>' +
            '<div class="mb-2 issue-id"><i class="fa fa-history mr-1"></i>' + issue.severity + '</div>' +
            '<div class="mb-2 issue-id"><i class="fa fa-user mr-1"></i>' + issue.assignedTo + '</div>' +
            '<div class="mb-2 issue-id"><i class="fa fa-calendar mr-1"></i>' + issue.date_time + '</div>' +
            '<div class="row issue-id px-3 mb-2">' +
            '<button type="button" class="btn btn-warning btn-sm mr-1 white-font button-title font-weight-bold"' +
            'id="' + issue.number + '" onclick="Issues_List.callClose(' + issue.number + ');"'+
            enabled+'>Close</button>' +
            '<button type="button" class="btn btn-danger btn-sm button-title font-weight-bold"' +
            'id="' + issue.number + '" onclick="Issues_List.callDelete(' + issue.number + ')">Delete</button></div>' +
            '</div>';
    }
    static add_order_issues_button() {
        BODY.innerHTML = '<div class="mb-2">' +
            '<button type = "button" class="btn btn-secondary btn-sm button-title font-weight-bold"' +
            'onclick = "Issues_List.orderIssues()" >' +
            'order Issues</button >' +
            '</div > ';
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
        issues_list.sort(function (a, b) {
            return a.value - b.value;
        });
        Issues_List.build_issues_area();
    }
    static callClose(id) {
        issues_list.filter(function (item) {
            if (item.number === id) {
                item.status = "closed";
            }
        })
        Issues_List.build_issues_area();
    }
    static build_issues_area(){
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
        issues_list = issues_list.filter(function (item) {
            return item.number !== id
        })
        Issues_List.build_issues_area();
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
        this.number = number++;
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
        return id;
    }
};
