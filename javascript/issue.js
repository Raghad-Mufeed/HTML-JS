id_list = [];

class Issue {
    constructor(description, severity, assignedTo) {
        this.description = description;
        this.severity = severity;
        this.assignedTo = assignedTo;
        this.date = new Date().toLocaleString();;
        this.status = 'open';
        this.id = this.generateID();
    }
    generateID() {
        let possibleIdCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 5; i++) {
            let size = Math.random() * 10 + 1;
            for (let j = 0; j < size; j++) {
                id += possibleIdCharacters.charAt(Math.floor(Math.random() * possibleIdCharacters.length));
            }
            if (i !== 4) {
                id += '-';
            }
        }
        while (id_list.indexOf(id) !== -1) {
            id = this.generateID();
        }
        id_list.push(id);
        return id;
    }
};

function changeBackgroundColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById('background').style = 'background-color:#' + color + '80';
}

function setServerityinLocalSrorage(severity) {
    window.localStorage.setItem('severity', severity);
    window.location.reload();
}

function checkSelectedSeverity(severity) {
    let selectedSeverity = window.localStorage.getItem('severity');
    return severity === selectedSeverity ? 'selected' : '';

}

function setStatusinLocalSrorage(status) {
    window.localStorage.setItem('status', status);
    window.location.reload();
}

function checkSelectedStatus(status) {
    let selectedStatus = window.localStorage.getItem('status');
    return status === selectedStatus ? 'selected' : '';
}

function resetFilters() {
    window.localStorage.setItem('severity', 'null');
    window.localStorage.setItem('status', 'null');
    window.location.reload();
}

function setAddIssueDisabled() {
    let description = document.getElementById('description');
    let severity = document.getElementById('severity');
    let assignedTo = document.getElementById('assignedTo');
    if (description.value.trim() === '' ||
        assignedTo.value.trim() === '') {
        document.getElementById('addButton').disabled = true;
        return;
    }
    let issues = JSON.parse(window.localStorage.getItem('issues_list')) || [];
    let foundElement = issues.find(issue =>
        issue.description === description.value &&
        issue.severity === severity.value &&
        issue.assignedTo === assignedTo.value
    );
    if (foundElement) {
        document.getElementById('addButton').disabled = true;
        window.confirm('The issue is already in the system');
    } else {
        document.getElementById('addButton').disabled = false;
    }
}

function severityFilter(issues) {
    let severity = window.localStorage.getItem('severity');
    if (severity !== null && severity !== 'null') {
        return issues.filter(issue => {
            return issue.severity === severity;
        })
    }
    return issues;
}

function statusFilter(issues) {
    let status = window.localStorage.getItem('status');
    if (status !== null && status !== 'null') {
        return issues.filter(function(issue) {
            return issue.status === status;
        })
    }
    return issues;
}

function addIssue() {
    let issue = new Issue(document.getElementById('description').value,
        document.getElementById('severity').value, document.getElementById('assignedTo').value);
    let issues = JSON.parse(window.localStorage.getItem('issues_list')) || [];
    issues.push(issue);
    window.localStorage.setItem('issues_list', JSON.stringify(issues));
    window.location.reload();
}

function orderIssues() {
    var issues = JSON.parse(window.localStorage.getItem('issues_list'));
    var lowIssues = issues.filter(function(issue) {
        return issue.severity === 'Low'
    });
    var mediumIssues = issues.filter(function(issue) {
        return issue.severity === 'Medium'
    });
    var highIssues = issues.filter(function(issue) {
        return issue.severity === 'High'
    });
    issues = [...lowIssues, ...mediumIssues];
    issues = [...issues, ...highIssues];
    window.localStorage.setItem('issues_list', JSON.stringify(issues));
    window.location.reload();
}

function closeIssue(id) {
    let issues = JSON.parse(window.localStorage.getItem('issues_list'));
    let issue = issues.find(issue => issue.id === id);
    issue.status = 'closed';
    window.localStorage.setItem('issues_list', JSON.stringify(issues));
    window.location.reload();
}

function openDeleteDialog(id) {
    if (window.confirm('Do you really want to delete the selected issue?')) {
        deleteIssue(id);
    }
}

function deleteIssue(id) {
    let issues = JSON.parse(window.localStorage.getItem('issues_list'));
    issues = issues.filter(issue => {
        return issue.id !== id
    })
    window.localStorage.setItem('issues_list', JSON.stringify(issues));
    window.location.reload();
}