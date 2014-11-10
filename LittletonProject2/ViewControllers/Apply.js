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
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });

    //Pick days of week you can work
    $('.buttonDays').click(function () {
        $(this).toggleClass('round-button-selected');
    });
    var allTracker = true;
    $('.selectAll').click(function () {
        if (allTracker) {
            $('.buttonDays').addClass('round-button-selected');
            allTracker = false;
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
    })
    $('#PartTime').click(function () {
        $('#FullTime').removeClass('active');
        $('#PartTime').addClass('active');
    })
    $('#NightsYes').click(function () {
        $('#NightsYes').addClass('active');
        $('#NightsNo').removeClass('active');
    })
    $('#NightsNo').click(function () {
        $('#NightsYes').removeClass('active');
        $('#NightsNo').addClass('active');
    })
    $('#FiredYes').click(function () {
        $('#FiredYes').addClass('active');
        $('#FiredNo').removeClass('active');
    })
    $('#FiredNo').click(function () {
        $('#FiredYes').removeClass('active');
        $('#FiredNo').addClass('active');
    })

    //Clear out modals when they close
    $('.modal').on('hidden.bs.modal, show.bs.modal', function () {
        $(this).find('input:text').val("");
        $(this).find('input:checkbox').attr('checked', false);
        $(this).find('select.employerState').val("AL");
        $(this).find('textarea').val("");
        $(this).find('input[type="number"]').val("");
    });
})