﻿var ApplyViewModel = function () {
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
    this.FirstName = ko.observable('');
    this.LastName = ko.observable('');
    this.Over18 = ko.observable(false);
    this.Street = ko.observable('');
    this.City = ko.observable('');
    this.State = ko.observable('');
    this.MobilePhone = ko.observable('');
    this.HomePhone = ko.observable('');

    //Employment Info
    this.HoursAvailable = ko.observable(40);
    this.EmploymentType = ko.observable(true);
    this.WorkNights = ko.observable(true);
    this.FiredBefore = ko.observable(false);
    this.DateAvailable = ko.observable('');

    //Days Available to Work
    this.allAvailableTracker = ko.observable(false);
    this.availableMonday = ko.observable(false);
    this.availableTuesday = ko.observable(false);
    this.availableWednesday = ko.observable(false);
    this.availableThursday = ko.observable(false);
    this.availableFriday = ko.observable(false);
    this.availableSaturday = ko.observable(false);
    this.availableSunday = ko.observable(false);

    //Military Modal
    this.militaryYears = ko.observable('');
    this.militaryBranch = ko.observable('');
    this.inReserve = ko.observable(false);
    this.honorableDischarge = ko.observable(false);

    //Work Exp Modal
    this.employerName = ko.observable('');
    this.employerEmail = ko.observable('');
    this.employerCanContact = ko.observable(false);
    this.employerStreet = ko.observable('');
    this.employerCity = ko.observable('');
    this.employerState = ko.observable('');
    this.employerPrevBoss = ko.observable('');
    this.employerPhone = ko.observable('');
    this.employerStartDate = ko.observable('');
    this.employerEndDate = ko.observable('');
    this.employerDuties = ko.observable('');

    //Reference Modal
    this.referenceName = ko.observable('');
    this.referenceTitle = ko.observable('');
    this.referenceCompany = ko.observable('');
    this.referenceStreet = ko.observable('');
    this.referenceCity = ko.observable('');
    this.referenceState = ko.observable('');
    this.referencePhone = ko.observable('');
    this.referenceEmail = ko.observable('');

    //School Modal
    this.schoolType = ko.observable('');
    this.schoolName = ko.observable('');
    this.schoolCity = ko.observable('');
    this.schoolState = ko.observable('');
    this.graduationDate = ko.observable('');
    this.majorDegCert = ko.observable('');
}