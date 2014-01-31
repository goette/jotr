Meteor.methods({
    getCurrentUser: function () {

        var user = Meteor.user();
        console.log(user);
        if (user) {
            return user.username; 
        } else {
            return null;
        }
    }
});