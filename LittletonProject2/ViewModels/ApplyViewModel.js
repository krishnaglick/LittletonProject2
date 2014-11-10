var ApplyViewModel = function () {
    //Stuff used from pullback
    this.listOfStates = ko.observableArray([]);
    this.militaryBranches = ko.observableArray([]);
    //Tracking
    this.employers = ko.observableArray([]);
    this.militaryExp = ko.observableArray([]);
    this.references = ko.observableArray([]);

    //Applicant Info
    this.FirstName = ko.observable();
    this.LastName = ko.observable();
    this.Over18 = ko.observable(false);
    this.Street = ko.observable();
    this.City = ko.observable();
    this.State = ko.observable();
    this.MobilePhone = ko.observable();
    this.HomePhone = ko.observable();

    //Employment Info
    this.DaysAvailable = ko.observableArray([]);
    this.EmploymentType = ko.observable("Full Time");
    this.HoursAvailable = ko.observable(40);
    this.WorkNights = ko.observable(false);
    this.FiredBefore = ko.observable(false);
    this.DateAvailable = ko.observable();
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

/*  Planning to use selectors to build a new item to push into one of my obserables, for showing on a page.
    Not sure if this is the best way though.                                                             */

ApplyViewModel.prototype.addEmployer = function (event) {
    if ($('#addWorkExpModal').find(':invalid').length > 0)
        return false;

    if (!(checkDates($('#employerStartDate').val(), $('#employerEndDate').val())))
        return false;

    this.employers.push({
        name: $('#employerName').val(),
        email: $('#employerEmail').val(),
        canContact: $('#employerCanContact').is(':checked'),
        street: $('#employerStreet').val(),
        city: $('#employerCity').val(),
        state: $('#employerState').val(),
        boss: $('#employerLastBoss').val(),
        phone: $('#employerPhone').val(),
        startDate: $('#employerStartDate').val(),
        endDate: $('#employerEndDate').val(),
        duties: $('#employerDuties').val()
    });

    $('#addWorkExpModal').modal('hide');
}

ApplyViewModel.prototype.addMilitaryExp = function () {
    if ($('#addMilitaryExpModal').find(':invalid').length > 0)
        return false;

    this.militaryExp.push({
        years: $('#yearsInMilitary').val(),
        years: $('#militaryBranch').val(),
        reserve: $('#inReserve').is(':checked'),
        discharge: $('#honorableDischarge').is(':checked')
    });

    $('#addMilitaryExpModal').modal('hide');
}

ApplyViewModel.prototype.addReference = function () {
    if ($('#addReferenceModal').find(':invalid').length > 0)
        return false;

    this.references.push({
        name: $('#referenceName').val(),
        title: $('#yearsInMilitary').val(),
        company: $('#referenceTitle').val(),
        street: $('#referenceStreetAddress').val(),
        city: $('#referenceCity').val(),
        state: $('#referenceState').val(),
        phone: $('#referencePhone').val(),
        email: $('#referenceEmail').val()
    });

    $('#addReferenceModal').modal('hide');
}