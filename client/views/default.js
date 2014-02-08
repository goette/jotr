var syncr = {
    fire: function () {
        var self = this;
        self.cancel();
        self.timeoutID = window.setTimeout(function () {
            self.update();
        }, 500);
    },
    cancel: function () {
        if(typeof this.timeoutID === "number") {
            window.clearTimeout(this.timeoutID);
            delete this.timeoutID;
        }
    },
    update: function () {
        this.writeToDb();
        delete this.timeoutID;
    },
    writeToDb: function () {
        var content = $('#padin').val();
        Meteor.call('post', content, function (error, id) {
            if (error){
                return alert(error.reason);
            }
        });
    }
};

Template.default.helpers({
    content: function () {
        return Session.get('content');
    },
    content_formated: function () {
        var che = Session.get('content');
        return linkify(che);
    },
    userImageUrl: function () {
        if (Meteor.user().services) {
            return Meteor.user().services.google.picture;
        }
    }
});

Template.default.rendered = function () {
    Deps.autorun(function () {
        var data = Pads.findOne({'u_id': Meteor.userId()});
        if (data) {
            Session.set('content', data.u_pad);
        } 
    });
};

Template.default.events({
    'keyup #padin': function () {
        if (Meteor.user()) {
            syncr.fire();
        }
    },
    'paste #padin': function () {
        if (Meteor.user()) {
            syncr.fire();
        }
    }
});

/*
syncr =
    fire: ->
        @cancel()
        @timeoutID = window.setTimeout =>
            @update()
        , 1000
    cancel: ->
        if typeof @timeoutID is "number"
            window.clearTimeout(@timeoutID)
            delete @timeoutID
    update: ->
        @writeToDb()
        delete @timeoutID
    writeToDb: ->
        content = $('#padin').val()
        Meteor.call 'post', content, (error, id) ->
            alert error.reason if error

Template.app.helpers
    content: ->
        Session.get 'content'
    userImageUrl: ->
        Meteor.user().services.google.picture if Meteor.user().services.google

Template.app.rendered = ->
    Deps.autorun ->
        data = Pads.findOne
            'u_id': Meteor.userId()
        Session.set('content', data.u_pad) if data 

Template.app.events
    'keyup #padin': (e) ->
        syncr.fire() if Meteor.user() 
*/