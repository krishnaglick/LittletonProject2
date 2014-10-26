ApplyViewModel = function () {
    this.listOfStates = ko.observable();
}

ApplyViewModel.prototype.getStates = function () {
    var self = this;
    $.ajax({
        type: "POST",
        url: '/Apply/GetStates',
        dataType: "JSON",
        success: function (data) {
            self.listOfStates(data);
        }
    });
}