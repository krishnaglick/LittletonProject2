//When document is ready, run what's in this block
$(function () {
    //Set up the viewmodel
    var apply_view_model = new ApplyViewModel();
    ko.applyBindings(apply_view_model);
    apply_view_model.getStates();
    apply_view_model.getMilitaryBranches();

    //Activate the datepicker!
    $('.datepicker').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    });

    //Pick days of week you can work
    $('.buttonDays').click(function () {
        $(this).toggleClass('round-button-selected');
        if ($(this).hasClass('round-button-selected'))
            apply_view_model.DaysAvailable.push($(this).val());
        else
            apply_view_model.DaysAvailable.remove($(this).val());
    });
    var allTracker = true;
    $('.selectAll').click(function () {
        apply_view_model.DaysAvailable.removeAll();
        if (allTracker) {
            $('.buttonDays').addClass('round-button-selected');
            allTracker = false;
            apply_view_model.DaysAvailable.push("Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun");
        }
        else {
            $('.buttonDays').removeClass('round-button-selected');
            allTracker = true;
        }
    });

    //Activate the modals!
    $('#addWorkExp').click(function () {
        $('#addWorkExpModal').modal();
    })
    $('#addMilitaryExp').click(function () {
        $('#addMilitaryExpModal').modal();
    })
    $('#addReference').click(function () {
        $('#addReferenceModal').modal();
    })

    //Button toggling cause bootstrap don't do that shit on its own
    $('#FullTime').click(function () {
        $('#FullTime').addClass('active');
        $('#PartTime').removeClass('active');
        apply_view_model.EmploymentType("Full Time");
    })
    $('#PartTime').click(function () {
        $('#FullTime').removeClass('active');
        $('#PartTime').addClass('active');
        apply_view_model.EmploymentType("Part Time");
    })
    $('#NightsYes').click(function () {
        $('#NightsYes').addClass('active');
        $('#NightsNo').removeClass('active');
        apply_view_model.WorkNights(true);
    })
    $('#NightsNo').click(function () {
        $('#NightsYes').removeClass('active');
        $('#NightsNo').addClass('active');
        apply_view_model.WorkNights(false);
    })
    $('#FiredYes').click(function () {
        $('#FiredYes').addClass('active');
        $('#FiredNo').removeClass('active');
        apply_view_model.FiredBefore(true);
    })
    $('#FiredNo').click(function () {
        $('#FiredYes').removeClass('active');
        $('#FiredNo').addClass('active');
        apply_view_model.FiredBefore(false);
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
})

//Check if one date comes before another
function checkDates(value, comparedTo){
    value = value.split(/\D+/g);
    comparedTo = comparedTo.split(/\D+/g);
    var FirstDate = new Date(value[2],value[1],value[0]);
    var SecondDate = new Date(comparedTo[2],comparedTo[1],comparedTo[0]);

    return FirstDate.getTime() < SecondDate.getTime();
}

function applyValidation() {
    //LiveValidation is done here
    new LiveValidation('firstName').add(Validate.Presence);
    new LiveValidation('lastName').add(Validate.Presence);
    new LiveValidation('City').add(Validate.Presence);
    new LiveValidation('streetAddress').add(Validate.Presence);
    new LiveValidation('mobilePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
    new LiveValidation('homePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
}