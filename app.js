// app.js
angular
  .module("csvCrudApp", [])
  .constant("API_BASE_URL", "http://localhost:3000") // Set the base URL here
  .controller("MainController", function ($scope, $http, API_BASE_URL) {
    $scope.newData = {};
    $scope.allData = [];

    // Function to fetch all data from the backend
    function fetchData() {
      $http
        .get(`${API_BASE_URL}/api/data`)
        .then(function (response) {
          $scope.allData = response.data;
        })
        .catch(function (error) {
          console.error("Failed to fetch data:", error);
        });
    }

    // Initial data load
    fetchData();

    // Function to add new data to the backend
    $scope.addData = function () {
      $http
        .post(`${API_BASE_URL}/api/data`, $scope.newData)
        .then(function (response) {
          $scope.allData.push(response.data);
          $scope.newData = {};
        })
        .catch(function (error) {
          console.error("Failed to add data:", error);
        });
    };

    // Function to update existing data in the backend
    $scope.updateData = function (data) {
      const updatedData = {
        id: prompt("Update ID:", data.id),
        name: prompt("Update Name:", data.name),
        age: prompt("Update Age:", data.age),
        email: prompt("Update Email:", data.email),
        location: prompt("Update Location:", data.location),
      };

      $http
        .put(`${API_BASE_URL}/api/data/${data.id}`, updatedData)
        .then(function (response) {
          const index = $scope.allData.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            $scope.allData[index] = response.data;
          }
        })
        .catch(function (error) {
          console.error("Failed to update data:", error);
        });
    };

    // Function to delete data from the backend
    $scope.deleteData = function (data) {
      if (confirm("Are you sure you want to delete this data?")) {
        $http
          .delete(`${API_BASE_URL}/api/data/${data.id}`)
          .then(function () {
            const index = $scope.allData.findIndex(
              (item) => item.id === data.id
            );
            if (index !== -1) {
              $scope.allData.splice(index, 1);
            }
          })
          .catch(function (error) {
            console.error("Failed to delete data:", error);
          });
      }
    };
  });
