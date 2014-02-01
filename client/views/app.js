var syncr = {
    fire: function () {
        var self = this;
        self.cancel();
        self.timeoutID = window.setTimeout(function () {
            self.update();
        }, 1000);
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

Template.app.helpers({
    content: function () {
        return Session.get('content');
    }
});

Template.app.rendered = function () {
    Deps.autorun(function () {
        var data = Pads.findOne({'u_id': Meteor.userId()});
        if (data) {
            Session.set('content', data.u_pad);
        } 
    });
};

Template.app.events({
    'keyup #padin': function (e) {
        syncr.fire();
    }
});