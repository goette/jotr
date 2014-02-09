Router.configure
    layoutTemplate: 'layout'
    loadingTemplate: 'loading'
    waitOn: ->
        return Meteor.subscribe('pads')

Router.map ->
    @route('default', {path: '/'})