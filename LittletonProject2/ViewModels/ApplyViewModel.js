var ApplyViewModel = function () {
    //Stuff used from pullback
    this.listOfStates = ko.observableArray([]);
    this.militaryBranches = ko.observableArray([]);
    this.schoolTypes = ko.observableArray([]);
    //Tracking
    this.employers = ko.observableArray([]);
    this.militaryExp = ko.observableArray([]);
    this.references = ko.observableArray([]);
    this.education = ko.observableArray([]);

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

    //School Modal
    this.schoolType = ko.observable();
    this.schoolName = ko.observable();
    this.schoolCity = ko.observable();
    this.schoolState = ko.observable();
    this.graduationDate = ko.observable();
    this.majorDegCert = ko.observable();
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

ApplyViewModel.prototype.saveEducation = function () {
    if ($('#addEducationModal').find(':invalid').length > 0)
        return false;

    var self = this;
    this.education.push({
        schoolType: self.schoolType,
        schoolName: self.schoolName,
        schoolCity: self.schoolCity,
        schoolState: self.schoolState,
        gradDate: self.graduationDate,
        majorDegCert: self.majorDegCert
    });

    $('#addEducationModal').modal('hide');
}