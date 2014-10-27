//When document is ready, run what's in this block
$(function () {
    var apply_view_model = new ApplyViewModel();
    ko.applyBindings(apply_view_model);
    apply_view_model.getStates();
    $('.datepicker').datepicker();
})

