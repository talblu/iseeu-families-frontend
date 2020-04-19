function onReady(callback) {
    let intervalID = window.setInterval(checkReady, 1000);
    let element = null;

    function checkReady() {
        if (location.href.indexOf('main') !== -1) {
            element = document.getElementById('patients_list');
        }
        else if (location.href.indexOf('patient_info') !== -1) {
            element = document.getElementById('patient_id');
        }
        else {
            element = document.getElementsByTagName('body')[0];
            if (element !== undefined) {
                window.clearInterval(intervalID);
                callback.call(this);
                return;
            }
        }
        if (element !== undefined && element.value !== "") {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('page', true);
    show('loading', false);
});