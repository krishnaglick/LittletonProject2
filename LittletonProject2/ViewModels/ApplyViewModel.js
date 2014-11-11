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

    //Military Modal
    this.militaryYears = ko.observable();
    this.militaryBranch = ko.observable();
    this.inReserve = ko.observable(false);
    this.honorableDischarge = ko.observable(false);

    //Work Exp Modal
    this.employerName = ko.observable();
    this.employerEmail = ko.observable();
    this.employerCanContact = ko.observable(false);
    this.employerStreet = ko.observable();
    this.employerCity = ko.observable();
    this.employerState = ko.observable();
    this.employerPrevBoss = ko.observable();
    this.employerPhone = ko.observable();
    this.employerStartDate = ko.observable();
    this.employerEndDate = ko.observable();
    this.employerDuties = ko.observable();

    //Reference Modal
    this.referenceName = ko.observable();
    this.referenceTitle = ko.observable();
    this.referenceCompany = ko.observable();
    this.referenceStreet = ko.observable();
    this.referenceCity = ko.observable();
    this.referenceState = ko.observable();
    this.referencePhone = ko.observable();
    this.referenceEmail = ko.observable();

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

    var self = this;
    if (!(checkDates(self.employerStartDate(), self.employerEndDate())))
        return false;

    this.employers.push({
        name: self.employerName(),
        email: self.employerEmail(),
        canContact: self.employerCanContact(),
        street: self.employerStreet(),
        city: self.employerCity(),
        state: self.employerState(),
        boss: self.employerPrevBoss(),
        phone: self.employerPhone(),
        startDate: self.employerStartDate(),
        endDate: self.employerEndDate(),
        duties: self.employerDuties()
    });

    $('#addWorkExpModal').modal('hide');
}

ApplyViewModel.prototype.addMilitaryExp = function () {
    if ($('#addMilitaryExpModal').find(':invalid').length > 0)
        return false;

    var self = this;
    this.militaryExp.push({
        years: self.militaryYears(),
        branch: self.militaryBranch(),
        reserve: self.inReserve(),
        discharge: self.honorableDischarge()
    });

    $('#addMilitaryExpModal').modal('hide');
}

ApplyViewModel.prototype.addReference = function () {
    if ($('#addReferenceModal').find(':invalid').length > 0)
        return false;

    var self = this;
    this.references.push({
        name: self.referenceName(),
        title: self.referenceTitle(),
        company: self.referenceCompany(),
        street: self.referenceStreet(),
        city: self.referenceCity(),
        state: self.referenceState(),
        phone: self.referencePhone(),
        email: self.referenceEmail()
    });

    $('#addReferenceModal').modal('hide');
}

ApplyViewModel.prototype.saveEducation = function () {
    if ($('#addEducationModal').find(':invalid').length > 0)
        return false;

    var self = this;
    this.education.push({
        schoolType: self.schoolType(),
        schoolName: self.schoolName(),
        schoolCity: self.schoolCity(),
        schoolState: self.schoolState(),
        gradDate: self.graduationDate(),
        majorDegCert: self.majorDegCert()
    });

    $('#addEducationModal').modal('hide');
}

ApplyViewModel.prototype.removeEmployer = function (viewModel, data) {
    viewModel.employers.remove(data);
}

ApplyViewModel.prototype.removeMilitaryExp = function (viewModel, data) {
    viewModel.militaryExp.remove(data);
}

ApplyViewModel.prototype.removeReference = function (viewModel, data) {
    viewModel.references.remove(data);
}

ApplyViewModel.prototype.removeEducation = function (viewModel, data) {
    viewModel.education.remove(data);
}