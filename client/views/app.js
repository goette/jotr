Template.app.helpers({
    placeholdR: function () {
        var current = Meteor.user();
        if (current) {
            return'Hey ' + current.username + ', write some stuff...';
        } else {
            return 'Hey Nobody, you should login...';
        }
    }
});

Template.app.events({
    'keyup .pad': function () {
        $('.text').text($('textarea.pad').val());
    }
});