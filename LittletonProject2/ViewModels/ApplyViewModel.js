var ApplyViewModel = function () {
    var self = this;
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
    this.HoursAvailable = ko.observable(40);

    this.EmploymentType = ko.observable(true);
    this.EmpTypeStling = ko.computed(function () {
        $('#FullTime').toggleClass('active', self.EmploymentType());
        $('#PartTime').toggleClass('active', !self.EmploymentType());
    });

    this.WorkNights = ko.observable(true);
    this.WorkNightsStyling = ko.computed(function () {
        $('#NightsYes').toggleClass('active', self.WorkNights());
        $('#NightsNo').toggleClass('active', !self.WorkNights());
    });

    this.FiredBefore = ko.observable(false);
    this.FiredBeforeStyling = ko.computed(function () {
        $('#FiredYes').toggleClass('active', self.FiredBefore());
        $('#FiredNo').toggleClass('active', !self.FiredBefore());
    });

    this.DateAvailable = ko.observable();

    this.availableMonday = ko.observable(false);
    this.availableTuesday = ko.observable(false);
    this.availableWednesday = ko.observable(false);
    this.availableThursday = ko.observable(false);
    this.availableFriday = ko.observable(false);
    this.availableSaturday = ko.observable(false);
    this.availableSunday = ko.observable(false);

    this.daysAvailable = ko.computed(function () {
        $('div.dates input:button[value="Mon"]').toggleClass('round-button-selected', self.availableMonday());
        $('div.dates input:button[value="Tue"]').toggleClass('round-button-selected', self.availableTuesday());
        $('div.dates input:button[value="Wed"]').toggleClass('round-button-selected', self.availableWednesday());
        $('div.dates input:button[value="Thr"]').toggleClass('round-button-selected', self.availableThursday());
        $('div.dates input:button[value="Fri"]').toggleClass('round-button-selected', self.availableFriday());
        $('div.dates input:button[value="Sat"]').toggleClass('round-button-selected', self.availableSaturday());
        $('div.dates input:button[value="Sun"]').toggleClass('round-button-selected', self.availableSunday());
    });

    this.allAvailableTracker = ko.observable(false);
    this.allAvailable = function () {
        self.availableMonday(self.allAvailableTracker());
        self.availableTuesday(self.allAvailableTracker());
        self.availableWednesday(self.allAvailableTracker());
        self.availableThursday(self.allAvailableTracker());
        self.availableFriday(self.allAvailableTracker());
        self.availableSaturday(self.allAvailableTracker());
        self.availableSunday(self.allAvailableTracker());
        self.allAvailableTracker(!self.allAvailableTracker());
    };


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
                self.listOfStates(data);
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
                self.militaryBranches(data);
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
                self.schoolTypes(data);
            },
            error: function (data) {
                console.log("Failure, please alert sysadmin.");
            }
        });
    }

    this.addEmployer = function () {
        if ($('#addWorkExpModal').find(':invalid').length > 0)
            return false;

        if (!(checkDates(self.employerStartDate(), self.employerEndDate())))
            return false;

        self.employers.push({
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

    this.addMilitaryExp = function () {
        if ($('#addMilitaryExpModal').find(':invalid').length > 0)
            return false;

        
        self.militaryExp.push({
            years: self.militaryYears(),
            branch: self.militaryBranch(),
            reserve: self.inReserve(),
            discharge: self.honorableDischarge()
        });

        $('#addMilitaryExpModal').modal('hide');
    }

    this.addReference = function () {
        if ($('#addReferenceModal').find(':invalid').length > 0)
            return false;

        
        self.references.push({
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

    this.saveEducation = function () {
        if ($('#addEducationModal').find(':invalid').length > 0)
            return false;
        
        self.education.push({
            schoolType: self.schoolType(),
            schoolName: self.schoolName(),
            schoolCity: self.schoolCity(),
            schoolState: self.schoolState(),
            gradDate: self.graduationDate(),
            majorDegCert: self.majorDegCert()
        });

        $('#addEducationModal').modal('hide');
    }

    this.removeEmployer = function () {
        self.employers.remove(this);
    }

    this.removeMilitaryExp = function (viewModel, data) {
        self.militaryExp.remove(this);
    }

    this.removeReference = function (viewModel, data) {
        self.references.remove(this);
    }

    this.removeEducation = function (viewModel, data) {
        self.education.remove(this);
    }
}