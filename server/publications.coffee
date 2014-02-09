Meteor.publish 'pads', ->
    Pads.find({'u_id': @userId}) 