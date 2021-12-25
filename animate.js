'use strict';

const animate = (targetElement, startPosition, finalPosition, id, style) => {
    clearInterval(id);
    let targetPosition = startPosition;
    function frame() {
            if (style == 'marginLeft') {
                if (startPosition == finalPosition) {
                    clearInterval(id);
                } else {
                    if (finalPosition > startPosition) {
                        startPosition = startPosition + 2;
                    } else {
                        startPosition = startPosition - 2;
                    }
                }
                targetElement.style.marginLeft = startPosition + 'px';
            } else if (style == 'opacity') {
                if (startPosition < finalPosition) {
                    if (targetPosition >= finalPosition) {
                        clearInterval(id);
                    } else {
                        targetPosition += 0.1;
                    }
                } else if (startPosition > finalPosition) {
                    if (targetPosition <= 0) {
                        clearInterval(id);
                    } else {
                        targetPosition -= 0.1;
                    }
                }
                targetElement.style.opacity = targetPosition;
            }
    }
    id = setInterval(frame, 3);

}

export {animate};