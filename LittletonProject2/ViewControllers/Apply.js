//When document is ready, run what's in this block
var apply_view_model = new ApplyViewModel();
$(function () {
    //Set up the viewmodel
    ko.applyBindings(apply_view_model, $('.koNode')[0]);
    getStates();
    getMilitaryBranches();
    getSchoolTypes();
    applySubscriptions();

    //Activate the datepicker!
    $('.datepicker').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    });

    //Setup modal popping up
    $('#addWorkExp').click(function () {
        $('#addWorkExpModal').modal();
    })
    $('#addMilitaryExp').click(function () {
        $('#addMilitaryExpModal').modal();
    })
    $('#addReference').click(function () {
        $('#addReferenceModal').modal();
    })
    $('#addEducation').click(function () {
        $('#addEducationModal').modal();
    })
    //Save App Modal
    $('#saveAppModal').click(function () {
        $('#applicationSaveModal').modal();
    })
    //Load App Modal
    $('#loadAppModal').click(function () {
        $('#applicationLoadModal').modal();
    })

    //Submit Modal Button
    $('#saveApp').click(function () {
        $.post("/Apply/SaveData", { 'Application': ko.toJSON(apply_view_model) }, function (data) {
            alert("Your application id is: " + data
              + ". Please keep this in your records.");
            console.log(data);
        }).error(function () {
            alert("There was a problem, please alert your sysadmin.");
        });
    })

    //Load Modal Button
    $('#loadApp').click(function () {
        $.post("/Apply/LoadData", { 'id': $('#appKey').val() }, function (data) {
            apply_view_model = ko.mapping.fromJSON(data, apply_view_model);
            ko.cleanNode($('.koNode')[0]);
            ko.applyBindings(apply_view_model, $('.koNode')[0])
            alert("Your application was loaded successfully, continue it at your leisure!");
        }).error(function () {
            alert("Application failed to load, please check your id.");
        });
    })

    applyValidation();

    //Clear out modals when they close
    $('.modal').on('hidden.bs.modal, show.bs.modal', function () {
        $(this).find('input:text').val("");
        $(this).find('input:checkbox').attr('checked', false);
        $(this).find('select.employerState').val("AL");
        $(this).find('textarea').val("");
        $(this).find('input[type="number"]').val("");
    });

    function getStates() {
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

    function getMilitaryBranches() {
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

    function getSchoolTypes() {
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


    $('#saveWorkExp').click(function () {
        /*if ($('#addWorkExpModal').find(':invalid').length > 0)
            return false;

        if (!(checkDates(apply_view_model.employerStartDate(), apply_view_model.employerEndDate())))
            return false;*/

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
    })

    $('#saveMilitaryExp').click(function () {
        if ($('#addMilitaryExpModal').find(':invalid').length > 0)
            return false;

        apply_view_model.militaryExp.push({
            years: apply_view_model.militaryYears(),
            branch: apply_view_model.militaryBranch(),
            reserve: apply_view_model.inReserve(),
            discharge: apply_view_model.honorableDischarge()
        });

        $('#addMilitaryExpModal').modal('hide');
    })

    $('#saveReference').click(function () {
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
    })

    $('#saveEducation').click(function () {
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
    })
})

//Check if one date comes before another
function checkDates(value, comparedTo) {
    value = value.split(/\D+/g);
    comparedTo = comparedTo.split(/\D+/g);
    var FirstDate = new Date(value[2],value[1],value[0]);
    var SecondDate = new Date(comparedTo[2],comparedTo[1],comparedTo[0]);

    return FirstDate.getTime() < SecondDate.getTime();
}

function applyValidation() {
    //LiveValidation for personal info
    new LiveValidation('firstName').add(Validate.Presence);
    new LiveValidation('lastName').add(Validate.Presence);
    new LiveValidation('City').add(Validate.Presence);
    new LiveValidation('streetAddress').add(Validate.Presence);
    new LiveValidation('mobilePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
    
    
    //LiveValidation for Employment Info 
    //new LiveValidation('dateAvailableEmployment').add(Validate.Presence).add(Validate.Format, { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i });
    //new LiveValidation('dateAvaliableEmployment').add(Validate.Presence);

    //LiveValidation for AddEmployer Modal
    new LiveValidation('employerName').add(Validate.Presence);
    new LiveValidation('employerEmail').add(Validate.Presence).add(Validate.Format, { pattern: /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/i });
    new LiveValidation('employerStreet').add(Validate.Presence);
    new LiveValidation('employerCity').add(Validate.Presence);
    new LiveValidation('employerLastBoss').add(Validate.Presence);
    new LiveValidation('employerPhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i }); 
    new LiveValidation('employerStartDate').add(Validate.Presence).add(Validate.Format, { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i });
    new LiveValidation('employerEndDate').add(Validate.Presence).add(Validate.Format, { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i });
    new LiveValidation('employerDuties').add(Validate.Presence);

    //LiveValidation for Reference Modal
    new LiveValidation('referenceName').add(Validate.Presence);
    new LiveValidation('referenceTitle').add(Validate.Presence);
    new LiveValidation('referenceCompany').add(Validate.Presence);
    new LiveValidation('referenceStreetAddress').add(Validate.Presence);
    new LiveValidation('referenceCity').add(Validate.Presence);
    new LiveValidation('referencePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
    new LiveValidation('referenceEmail').add(Validate.Presence).add(Validate.Format, { pattern: /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/i });

    //LiveValidation for Education Modal
    new LiveValidation('schoolName').add(Validate.Presence);
    new LiveValidation('schoolCity').add(Validate.Presence);
    new LiveValidation('gradDate').add(Validate.Presence).add(Validate.Format, { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i });
    new LiveValidation('majorDegCert').add(Validate.Presence); 
}

function applySubscriptions() {
    apply_view_model.allAvailableTracker.subscribe(function () {
        apply_view_model.availableMonday(apply_view_model.allAvailableTracker());
        apply_view_model.availableTuesday(apply_view_model.allAvailableTracker());
        apply_view_model.availableWednesday(apply_view_model.allAvailableTracker());
        apply_view_model.availableThursday(apply_view_model.allAvailableTracker());
        apply_view_model.availableFriday(apply_view_model.allAvailableTracker());
        apply_view_model.availableSaturday(apply_view_model.allAvailableTracker());
        apply_view_model.availableSunday(apply_view_model.allAvailableTracker());
        apply_view_model.allAvailableTracker(!apply_view_model.allAvailableTracker());
    });
}


function removeEmployer(data) {
    apply_view_model.employers.remove(data);
}
function removeMilitaryExp(data) {
    apply_view_model.militaryExp.remove(data);
}
function removeReference(data) {
    apply_view_model.references.remove(data);
}
function removeEducation(data) {
    apply_view_model.education.remove(data);
}