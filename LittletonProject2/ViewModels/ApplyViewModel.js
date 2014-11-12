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

    this.getStates = function () {
        
        $.ajax({
            type: "GET",
            url: '/Apply/GetStates',
            dataType: "JSON",
            success: function (data) {
                apply_view_model.listOfStates(data);
            },
            error: function (data) {
                console.log("Failure, please alert sysadmin.");
            }
        });
    }

    this.getMilitaryBranches = function () {
        
        $.ajax({
            type: "GET",
            url: '/Apply/GetMilitaryBranches',
            dataType: "JSON",
            success: function (data) {
                apply_view_model.militaryBranches(data);
            },
            error: function (data) {
                console.log("Failure, please alert sysadmin.");
            }
        });
    }

    this.getSchoolTypes = function () {
        
        $.ajax({
            type: "GET",
            url: '/Apply/GetSchoolTypes',
            dataType: "JSON",
            success: function (data) {
                apply_view_model.schoolTypes(data);
            },
            error: function (data) {
                console.log("Failure, please alert sysadmin.");
            }
        });
    }

    this.addEmployer = function (event) {
        if ($('#addWorkExpModal').find(':invalid').length > 0)
            return false;

        if (!(checkDates(apply_view_model.employerStartDate(), apply_view_model.employerEndDate())))
            return false;

        apply_view_model.employers.push({
            name: apply_view_model.employerName(),
            email: apply_view_model.employerEmail(),
            canContact: apply_view_model.employerCanContact(),
            street: apply_view_model.employerStreet(),
            city: apply_view_model.employerCity(),
            state: apply_view_model.employerState(),
            boss: apply_view_model.employerPrevBoss(),
            phone: apply_view_model.employerPhone(),
            startDate: apply_view_model.employerStartDate(),
            endDate: apply_view_model.employerEndDate(),
            duties: apply_view_model.employerDuties()
        });

        $('#addWorkExpModal').modal('hide');
    }

    this.addMilitaryExp = function () {
        if ($('#addMilitaryExpModal').find(':invalid').length > 0)
            return false;

        
        apply_view_model.militaryExp.push({
            years: apply_view_model.militaryYears(),
            branch: apply_view_model.militaryBranch(),
            reserve: apply_view_model.inReserve(),
            discharge: apply_view_model.honorableDischarge()
        });

        $('#addMilitaryExpModal').modal('hide');
    }

    this.addReference = function () {
        if ($('#addReferenceModal').find(':invalid').length > 0)
            return false;

        
        apply_view_model.references.push({
            name: apply_view_model.referenceName(),
            title: apply_view_model.referenceTitle(),
            company: apply_view_model.referenceCompany(),
            street: apply_view_model.referenceStreet(),
            city: apply_view_model.referenceCity(),
            state: apply_view_model.referenceState(),
            phone: apply_view_model.referencePhone(),
            email: apply_view_model.referenceEmail()
        });

        $('#addReferenceModal').modal('hide');
    }

    this.saveEducation = function () {
        if ($('#addEducationModal').find(':invalid').length > 0)
            return false;
        
        apply_view_model.education.push({
            schoolType: apply_view_model.schoolType(),
            schoolName: apply_view_model.schoolName(),
            schoolCity: apply_view_model.schoolCity(),
            schoolState: apply_view_model.schoolState(),
            gradDate: apply_view_model.graduationDate(),
            majorDegCert: apply_view_model.majorDegCert()
        });

        $('#addEducationModal').modal('hide');
    }

    this.removeEmployer = function () {
        apply_view_model.employers.remove(this);
    }

    this.removeMilitaryExp = function (viewModel, data) {
        apply_view_model.militaryExp.remove(this);
    }

    this.removeReference = function (viewModel, data) {
        apply_view_model.references.remove(this);
    }

    this.removeEducation = function (viewModel, data) {
        apply_view_model.education.remove(this);
    }
}