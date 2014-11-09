var ApplyViewModel = function () {
    this.listOfStates = ko.observableArray([]);
    this.militaryBranches = ko.observableArray([]);
    this.schoolTypes = ko.observableArray([]);
    this.employers = ko.observableArray([]);
    this.militaryExp = ko.observableArray([]);
    this.references = ko.observableArray([]);
}

ApplyViewModel.prototype.getStates = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: '/Apply/GetStates',
        dataType: "JSON",
        success: function (data) {
            self.listOfStates(data);
        },
        error: function (data) {
            console.log("Failure, please alert sysadmin.");
        }
    });
}

ApplyViewModel.prototype.getMilitaryBranches = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: '/Apply/GetMilitaryBranches',
        dataType: "JSON",
        success: function (data) {
            self.militaryBranches(data);
        },
        error: function (data) {
            console.log("Failure, please alert sysadmin.");
        }
    });
}

ApplyViewModel.prototype.getSchoolTypes = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: '/Apply/GetSchoolTypes',
        dataType: "JSON",
        success: function (data) {
            self.schoolTypes(data);
        },
        error: function (data) {
            console.log("Failure, please alert sysadmin.");
        }
    });
}

/*  Planning to use selectors to build a new item to push into one of my obserables, for showing on a page.
    Not sure if this is the best way though.                                                             */

ApplyViewModel.prototype.addEmployer = function () {
    var self = this;
    console.log($('#employerDuties').val());
}

ApplyViewModel.prototype.addMilitaryExp = function () {
    var self = this;
}

ApplyViewModel.prototype.addReference = function () {
    var self = this;
}