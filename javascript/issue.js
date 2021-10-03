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
        const possibleIdCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 5; i++) {
            const size = Math.random() * 10 + 1;
            for (let j = 0; j < size; j++) {
                id += possibleIdCharacters.charAt(Math.floor(Math.random() * possibleIdCharacters.length));
            }
            if (i !== 4) {
                id += '-';
            }
        }
        const issues = JSON.parse(window.localStorage.getItem('issuesList')) || [];
        while (issues.find(issue => issue.id === id)) {
            id = this.generateID();
        }
        return id;
    }
};

function changeBackgroundColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById('background').style = 'background-color:#' + color + '80';
}

function setServerityinLocalSrorage(severity) {
    severity !== 'null' ? window.localStorage.setItem('severity', severity) : window.localStorage.removeItem('severity');
    window.location.reload();
}

function checkSelectedSeverity(severity) {
    const selectedSeverity = window.localStorage.getItem('severity');
    return severity === selectedSeverity ? 'selected' : '';
}

function setStatusinLocalSrorage(status) {
    status !== 'null' ? window.localStorage.setItem('status', status) : window.localStorage.removeItem('status');
    window.location.reload();
}

function checkSelectedStatus(status) {
    const selectedStatus = window.localStorage.getItem('status');
    return status === selectedStatus ? 'selected' : '';
}

function resetFilters() {
    window.localStorage.removeItem('severity');
    window.localStorage.removeItem('status');
    window.location.reload();
}

function setAddIssueDisabled() {
    const description = document.getElementById('description');
    const severity = document.getElementById('severity');
    const assignedTo = document.getElementById('assignedTo');
    if (description.value.trim() === '' ||
        assignedTo.value.trim() === '') {
        document.getElementById('addButton').disabled = true;
        return;
    }
    const issues = JSON.parse(window.localStorage.getItem('issueList')) || [];
    const foundElement = issues.find(issue =>
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

function filterBySeverity(issues) {
    const severity = window.localStorage.getItem('severity');
    return severity ? issues.filter(issue => issue.severity === severity) : issues;
}

function filterByStatus(issues) {
    const status = window.localStorage.getItem('status');
    return status ? issues.filter(issue => issue.status === status) : issues;
}

function addIssue() {
    const issue = new Issue(document.getElementById('description').value,
        document.getElementById('severity').value, document.getElementById('assignedTo').value);
    const issues = JSON.parse(window.localStorage.getItem('issuesList')) || [];
    issues.push(issue);
    window.localStorage.setItem('issuesList', JSON.stringify(issues));
    window.location.reload();
}

function orderIssues() {
    let issues = JSON.parse(window.localStorage.getItem('issuesList'));
    const lowIssues = issues.filter(issue => issue.severity === 'Low');
    const mediumIssues = issues.filter(issue => issue.severity === 'Medium');
    const highIssues = issues.filter(issue => issue.severity === 'High');
    issues = [...lowIssues, ...mediumIssues];
    issues = [...issues, ...highIssues];
    window.localStorage.setItem('issuesList', JSON.stringify(issues));
    window.location.reload();
}

function closeIssue(id) {
    const issues = JSON.parse(window.localStorage.getItem('issuesList'));
    let issue = issues.find(issue => issue.id === id);
    issue.status = 'closed';
    window.localStorage.setItem('issuesList', JSON.stringify(issues));
    window.location.reload();
}

function openDeleteDialog(id) {
    if (window.confirm('Do you really want to delete the selected issue?')) {
        deleteIssue(id);
    }
}

function deleteIssue(id) {
    let issues = JSON.parse(window.localStorage.getItem('issuesList'));
    issues = issues.filter(issue => issue.id !== id);
    window.localStorage.setItem('issuesList', JSON.stringify(issues));
    window.location.reload();
}