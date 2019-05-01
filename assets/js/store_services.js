$(document).ready(function () {
    var selectedFile;
    $("#file").on("change", function (event) {
        selectedFile = event.target.files[0];
    });

    $("#btnServices2").on("click", function () {
        var fileName = selectedFile.name;
        //var sotorageRef = firebase.storage.ref("/servicesImages/"+fileName);
        var uploadTask = sotorageRef.child('/servicesImages/' + fileName).put(selectedFile);
        //var uploadTask = sotorageRef.put(selectedFile);

        var url;

        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads

            alert(error);
            console.log(error);
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                url = downloadURL;

                var service = $("#inputService").val();
                var gender = $("#inputGender").val();
                var des = $("#inputDes").val();
                var branch = $("#inputBranch").val();
                var time = $("#inputTime").val();
                var price = $("#inputPrice").val();
                var img = url;

                var newService = {
                    service: service,
                    gender: gender,
                    des: des,
                    brach: branch,
                    time: time,
                    price: price,
                    img: img
                }
                mambodb.ref("/service").push(newService);
            });
        });


    });

});