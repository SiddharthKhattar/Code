function updateSliderHandle(sliderContainer, sliderHandle, value) {
    const min = 0;
    const max = 100;
    value = Math.min(Math.max(value, min), max);
    const offsetPercentage = ((value - min) / (max - min)) * 100;
    sliderHandle.style.left = offsetPercentage + "%";

    // Update the slider track's width
    const sliderWidth = sliderContainer.offsetWidth;
    const handleWidth = sliderHandle.offsetWidth;
    sliderContainer.querySelector(".slider-track").style.width = offsetPercentage + "%";
}

function setValueFromOffset(sliderContainer, sliderHandle, offsetX) {
    const sliderWidth = sliderContainer.offsetWidth;
    const handleWidth = sliderHandle.offsetWidth;
    const min = 0;
    const max = 100;
    const value = Math.round(((offsetX - handleWidth / 2) / (sliderWidth - handleWidth)) * (max - min) + min);
    return value;
}

function setupSlider(sliderContainer) {
    const sliderHandle = sliderContainer.querySelector(".slider-handle");

    let isDragging = false;
    let offsetX = 0;
    let oldValue = 50; // Initial value

    sliderHandle.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - sliderHandle.getBoundingClientRect().left;
        document.body.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const sliderWidth = sliderContainer.offsetWidth;
            const handleWidth = sliderHandle.offsetWidth;
            let newX = event.clientX - sliderContainer.getBoundingClientRect().left - offsetX;

            // Keep the handle within the slider track
            newX = Math.max(newX, 0);
            newX = Math.min(newX, sliderWidth - handleWidth);

            // Update the handle position and slider track's width
            updateSliderHandle(sliderContainer, sliderHandle, setValueFromOffset(sliderContainer, sliderHandle, newX));

            // Calculate the value from the handle position and update the slider
            const newValue = setValueFromOffset(sliderContainer, sliderHandle, newX);
            if (newValue !== oldValue) {
                oldValue = newValue;
                // Optional: You can do something with the new value here
                console.log("New Value:", newValue);
            }
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.cursor = "default";
    });
}

window.onload = () => {
    const sliderContainers = document.querySelectorAll(".slider-container");
    sliderContainers.forEach((sliderContainer) => setupSlider(sliderContainer));
};
