const config = {
    editable: true // Hard-coded value for now
};

// Function to set the editable flag
export function setEditable(value) {
    config.editable = value;
}

// Function to get the editable flag
export function isEditable() {
    return config.editable;
}