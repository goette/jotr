syncr =
    fire: ->
        @cancel()
        @timeoutID = window.setTimeout =>
            @update()
        , 500

    cancel: ->
        if typeof @timeoutID is "number"
            window.clearTimeout(@timeoutID)
            delete @timeoutID;

    update: ->
        @writeToDb()
        delete @timeoutID

    writeToDb: ->
        content = $('#padin').val()
        Meteor.call 'post', content, (error, id) ->
            alert(error.reason) if (error)


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