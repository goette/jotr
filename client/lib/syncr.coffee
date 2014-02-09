class Syncr
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

@syncr = new Syncr