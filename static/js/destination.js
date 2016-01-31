function set_datepicker(elem) { $( "#" + elem + "" ).datepicker(); }

function set_elements() {
    set_datepicker("arrival_date");
    set_datepicker("departure_date");
}

document.addEventListener("DOMContentLoaded", function(event) {
    set_elements();
});
