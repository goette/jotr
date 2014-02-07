Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('pads');
    }
});

Router.map(function () {
    this.route('default', {
        path: '/'
    });
});