function disable_add(add_button, description, assignedTo) {
    if (description.value.trim() === "" || assignedTo.value.trim() === "") {
        add_button.disabled = true;
    } else {
        add_button.disabled = false;
    }
}