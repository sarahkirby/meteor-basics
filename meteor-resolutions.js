Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function() {
      // if we have a session variable 'hideFinished' and it is equal to true
      if (Session.get('hideFinished')) {
        //  only return the resolutions that have not been checked yet
        return Resolutions.find({checked: {$ne: true}});
      } else {
        // otherwise return all of the resolutions
        return Resolutions.find();
      }
    },
    hideFinished: function() {
      return Session.get('hideFinished');
    }
}); 

Template.body.events({
  // class of form is new-resolution. When submitted run this function. event is form data. 
  'submit .new-resolution': function(event) {
    // what the target event is(new resolution form. title is the field 'name' and it's value).
    var title = event.target.title.value;
    // Meteor call, calls function at the end of page, Meteor.methods - addResolution
    Meteor.call("addResolution", title);
      // insert into database and updates view
      // Resolutions.insert({
        // title is equal to the variable 'title' - data from form.
        // title: title,
        // createdAt: new Date()
      // });
      // clear the form input
      event.target.title.value = "";
      // make sure the page doesn't refresh
      return false;
  },
  // change event
  'change .hide-finished': function(event) {
    // Starting session. 'hideFinished' is the variable name of the session. 
    Session.set('hideFinished', event.target.checked);
  }
});

Template.resolution.events({
  'click .toggle-checked': function() {
    // updating the state - if clicked it will be the opposite of what it was before
    Resolutions.update(this._id, {$set: {checked: !this.checked}});
  },
  'click .delete': function() {
    Resolutions.remove(this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });
  }
});
