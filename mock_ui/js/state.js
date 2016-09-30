angular.module('fileUpload', ['ngFileUpload'])
    .controller('StateCtrl', ['Upload', '$window', '$http', function (Upload, $window, $http) {
        this.isUpdateMode = false;
        this.state = { onCloud: false };
        this.submit = function () { //function to call on form submit
            if (this.state && this.state.file) {
                let formData = new FormData();

                for (let info in this.state) {
                    if (this.state.hasOwnProperty(info)) {
                        formData.append(info, this.state[info]);
                    }
                }
                this.requestInProgress = true;
                this.response = null;
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
                    .finally(() => {
                        this.requestInProgress = false;
                    });

            }
        };

        this.generateUrl = function () {
            let url = '/api/states';
            if (this.isUpdateMode){
                url = `${url}/${this.id}`;
            }
            return url;
        };

        this.getLinkDownload = function () {
            if (this.response && this.response.image.onCloud) {
                return this.response.image.path
            }
            return `/api/states/${this.id}/image`
        }
    }]);