function issue_box(issue,enabled){
    return '<div class="mb-4 px-3">' +
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
            'id="' + issue.number + '" onclick="Issues_List.callClose(' + issue.number + ');"' +
            enabled + '>Close</button>' +
            '<button type="button" class="btn btn-danger btn-sm button-title font-weight-bold"' +
            'id="' + issue.number + '" onclick="Issues_List.callDelete(' + issue.number + ')">Delete</button></div>' +
            '</div>';
}