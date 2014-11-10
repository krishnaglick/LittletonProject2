//When document is ready, run what's in this block
$(function () {
    var apply_view_model = new ApplyViewModel();
    ko.applyBindings(apply_view_model);
    apply_view_model.getStates();
    apply_view_model.getMilitaryBranches();
    apply_view_model.getSchoolTypes();

    $('.datepicker').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });

    $('.dates input:button').not('.selectAll').click(function () {
        $(this).toggleClass('selected');
    });

    $('.dates .selectAll').click(function () {
        $('.dates input:button').not('.selectAll').click();
    });

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

    $('#addReference').click(function () {

    })

    $('#saveWorkExp').click(function () {

    })

    $('#saveEducation').click(function() {

    })


    //LiveValidation is done here 
    new LiveValidation('firstName').add(Validate.Presence);
    new LiveValidation('lastName').add(Validate.Presence);
    new LiveValidation('City').add(Validate.Presence);
    new LiveValidation('streetAddress').add(Validate.Presence);
    new LiveValidation('mobilePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });
    new LiveValidation('homePhone').add(Validate.Presence).add(Validate.Format, { pattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i });

   
    $('.modal').on('hidden.bs.modal, show.bs.modal', function () {
        $(this).find('input:text').val("");
        $(this).find('input:checkbox').attr('checked', false);
        $(this).find('select.employerState').val("AL");
        $(this).find('textarea').val("");
        $(this).find('input[type="number"]').val("");
    });
})