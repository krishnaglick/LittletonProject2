//When document is ready, run what's in this block
$(function () {
    var apply_view_model = new ApplyViewModel();
    ko.applyBindings(apply_view_model);
    apply_view_model.getStates();
    apply_view_model.getMilitaryBranches();

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

    $('#addReference').click(function () {

    })

    $('#saveWorkExp').click(function () {

    })

    $('.modal').on('hidden.bs.modal, show.bs.modal', function () {
        $(this).find('input:text').val("");
        $(this).find('input:checkbox').attr('checked', false);
        $(this).find('select.employerState').val("AL");
        $(this).find('textarea').val("");
        $(this).find('input[type="number"]').val("");
    });
})