$(function() {

    //Show login
    $(document).on("click", "#show-login", function(e) {
        helpers.showPopup();
        $('#popup').html(Handlebars.templates["login"]({register: false}));
    });

    //Show register
    $(document).on("click", "#show-register", function(e) {
        helpers.showPopup();
        $('#popup').html(Handlebars.templates["login"]({register: true}));
    });

    //Hide popup
    $(document).on("click", "#close-popup", function(e) {
        helpers.hidePopup();
    });

    //Log in
    $(document).on("click", "#login-button", function(e) {
        e.preventDefault();
        var username = $("#login-form input[name=username]").val();
        $.post(
            '/users/login',
            { username: username }
        ).done(function(response) {
            currentUser = response.content.user;
            helpers.hidePopup();
            loadPage({currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError("#login-error",response.err);
        });
    });

    //Log in
    $(document).on("click", "#register-button", function(e) {
        e.preventDefault();
        var username = $("#register-form input[name=username]").val();
        $.post(
            '/users/create',
            { username: username }
        ).done(function(response) {
            currentUser = response.content.user;
            helpers.hidePopup();
            loadPage({currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError("#login-error",response.err);
        });
    });

    //Log out
    $(document).on("click", "#logout-button", function(e) {
        currentUser = undefined;
        $.post(
            '/users/logout'
        ).done(function(response) {
            currentUser = undefined;
            loadPage({currentUser: currentUser});
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            helpers.displayError("#login-error",response.err);
        }); 
    });
});