var user = Meteor.call('getCurrentUser');
console.log(user);

if (user && Notes.find().count() === 0) {
    Notes.insert({
        user: Meteor.user().username,
        content:''
    });
} 