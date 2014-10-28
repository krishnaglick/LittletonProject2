var ApplyViewModel = function () {
    this.listOfStates = ko.observableArray([]);
    this.militaryBranches = ko.observableArray([]);
}

ApplyViewModel.prototype.getStates = function () {
    var self = this;
    $.ajax({
        type: "POST",
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
        type: "POST",
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