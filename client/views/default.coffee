Template.default.helpers
    content: ->
        Session.get('content');

Template.default.rendered = ->
    Deps.autorun ->
        data = Pads.findOne
            'u_id': Meteor.userId()
        Session.set('content', data.u_pad) if data

Template.default.events
    'keyup #padin': () ->
        syncr.fire() if Meteor.user()

    'paste #padin': () ->
        syncr.fire() if Meteor.user()