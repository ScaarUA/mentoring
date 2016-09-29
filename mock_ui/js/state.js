angular.module('fileUpload', ['ngFileUpload'])
    .controller('StateCtrl', ['Upload', '$window', '$http', function (Upload, $window, $http) {
        this.isUpdateMode = false;

        this.submit = function () { //function to call on form submit
            if (this.state) { //check if from is valid
                let formData = new FormData();

                for (let info in this.state) {
                    if (this.state.hasOwnProperty(info)) {
                        formData.append(info, this.state[info]);
                    }
                }

                $http({
                    method: this.isUpdateMode ? 'PUT' : 'POST',
                    url: this.generateUrl(),
                    data: formData,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                    .then((response) => {
                        this.response = response.data;
                        this.id = response.data._id;
                    })
                    .catch((error) => {
                        this.response = error;
                    })

            }
        };

        this.generateUrl = function () {
            let url = 'http://localhost:8888/api/states';
            if (this.isUpdateMode){
                url = `${url}/${this.id}`;
            }
            return url;
        };

        this.getLinkDownload = function () {
            return `http://localhost:8888/api/states/${this.id}/image`
        }
    }]);