Pads = new Meteor.Collection('pads');

Meteor.methods({
    post: function (content) {
        var user = Meteor.user(),
            padOfUser = Pads.findOne({'u_id': user._id});
 
        if (!user) {
            throw new Meteor.Error(401, "You need to login to do stuff");
        }

        if (!padOfUser) {
            Pads.insert({
                'u_id': user._id,
                'u_name': user.username,
                'u_pad': content
            });
        } else {
            Pads.update({'u_id': user._id}, {$set: {'u_pad': content}});
        }
    }
});