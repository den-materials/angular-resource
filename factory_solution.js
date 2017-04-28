angular.module("criminalsApp")
	.factory("Criminal", CriminalFactory);

CriminalFactory.$inject = ["$resource"];

function CriminalFactory($resource) {
	return $resource("http://localhost:3000/criminals/:id");
}
