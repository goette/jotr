Meteor.publish('pads', function () {
    return Pads.find();
});