$(document).ready(function () {
    jQuery.validator.addMethod("password", function(value, element) {
        var result = this.optional(element) || value.length >= 6 && /\d/.test(value) && /[a-z]/i.test(value);
        // if (!result) {
        //     element.value = "";
        //     var validator = this;
        //     setTimeout(function() {
        //         validator.blockFocusCleanup = true;
        //         element.focus();
        //         validator.blockFocusCleanup = false;
        //     }, 1);
        // }
        return result;
    }, "Your password must be at least 6 characters long and contain at least one number and one character.");

    $('#registration-form').validate({
        rules:{
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter a name",
                minlength: "Name should be at least 2 characters long"
            }
        },
        onkeyup: false
    });

});