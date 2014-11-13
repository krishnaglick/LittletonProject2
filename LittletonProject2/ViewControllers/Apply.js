//When document is ready, run what's in this block
var apply_view_model = new ApplyViewModel();
$(function () {
    //Set up the viewmodel
    ko.applyBindings(apply_view_model);
    apply_view_model.getStates();
    apply_view_model.getMilitaryBranches();
    apply_view_model.getSchoolTypes();

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
    //Show Save Modal 
    $('#saveButton').click(function () {
        $('#applicationModal').modal();
    })
    //Show Load Modal
    $('#loadButton').click(function () {
        $('#loadApplicationModal').modal();
    })
    
    //Submit Modal Button
    $('#submitAppButton').click(function () {
        $.post("/Apply/SaveData", { 'Application': ko.toJSON(apply_view_model) }, function (data) {
            alert("Your application id is: " + data
              + ". Please keep this in your records.");
        }).error(function () {
            alert('Error! Please alert your sysadmin!');
        });
    })

    //Load Modal Button
    $('#loadButtonModal').click(function () {
        $.post("/Apply/LoadData", { 'id': $('#loadKey').val() }, function (data) {
            alert("Application loaded, please feel free to continue editing!");
            apply_view_model = data;
        }).error(function () {
            alert("There has been an error loading your application, please try again later.");
        });
    });

    applyValidation();

    //Clear out modals when they close
    $('.modal').on('hidden.bs.modal, show.bs.modal', function () {
        $(this).find('input:text').val("");
        $(this).find('input:checkbox').attr('checked', false);
        $(this).find('select.employerState').val("AL");
        $(this).find('textarea').val("");
        $(this).find('input[type="number"]').val("");
    });
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
    new LiveValidation('homePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
    
    //LiveValidation for Employment Info 
    new LiveValidation('dateAvailableEmployment').add(Validate.Presence).add(Validate.Format, { pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/i});

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