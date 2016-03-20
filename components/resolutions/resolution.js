if (Meteor.isClient) {
	Template.resolution.events({
	  'click .toggle-checked': function() {
	    // calling the method 'updateResolution' and passing the parameter values for id and checked
	    Meteor.call("updateResolution", this._id, !this.checked);
	  },
	  'click .delete': function() {
	    Meteor.call("deleteResolution", this._id);
	  }
	});
}