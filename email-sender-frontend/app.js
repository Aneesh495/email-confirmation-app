var app = angular.module("emailApp", []);

app.controller("FormController", function ($scope, $http) {
  $scope.formData = {};
  $scope.successMessage = "";
  $scope.errorMessage = "";
  $scope.isLoading = false;
  $scope.isDarkMode = false;

  $scope.submitForm = function () {
    $scope.successMessage = "";
    $scope.errorMessage = "";
    $scope.isLoading = true;

    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      $scope.errorMessage = "Please complete the reCAPTCHA.";
      $scope.isLoading = false;
      return;
    }

    const data = {
      name: $scope.formData.name,
      email: $scope.formData.email,
      recaptcha: recaptchaResponse,
    };

    $http
      .post("http://localhost:3001/submit", data)
      .then(function (response) {
        $scope.successMessage = response.data.message;
        $scope.formData = {};
        grecaptcha.reset(); // Reset reCAPTCHA
      })
      .catch(function () {
        $scope.errorMessage = "Submission failed. Try again.";
      })
      .finally(function () {
        $scope.isLoading = false;
      });
  };
});
