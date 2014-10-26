var ApplyViewModel = function () {
    this.listOfStates = ko.observableArray();
}

ApplyViewModel.prototype.getStates = function () {
    var self = this;
    $.ajax({
        type: "POST",
        url: '/Apply/GetStates',
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            self.listOfStates(data);
        },
        error: function (data) {
            console.log("Failure, please alert sysadmin.");
        }
    });
}