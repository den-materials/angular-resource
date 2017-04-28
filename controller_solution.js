angular.module("criminalsApp")
	.controller("CriminalsController", CriminalsController);

var allCriminals = [
	{name: "Omar Little",
		location: "Balmore",
		status: "deceased"
	}
];

CriminalsController.$inject = ["$http", "Criminal"];
function CriminalsController($http, Criminal) {
	var self = this;
	self.getCriminals = getCriminals;
	self.addCriminal = addCriminal;
	self.deleteCriminal = deleteCriminal;
	function getCriminals() {
		self.criminals = Criminal.query(); // query() returns all criminals
	}
	getCriminals();

	function addCriminal() {
		Criminal.save(self.newCriminal, function() {
			self.getCriminals();
			self.newCriminal = {};
		}); // save() posts whatever is put in first argument
	}
	function deleteCriminal(id) {
		Criminal.delete({id: id}, function() {
			getCriminals();
		}); // delete() deletes the item with given id
	}
}
