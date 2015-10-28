var closestToOffset = function(selector, offsetTop, offsetLeft) {
    var el = null;
    var elOffset;
    var x = offsetLeft;
    var y = offsetTop;
    var distance;
    var dx;
    var dy;
    var minDistance;
    var elementsArray = document.querySelectorAll(selector);

    for (var element of elementsArray) {
        elOffset = element.getBoundingClientRect();
        if ((x >= elOffset.left)  && (x <= elOffset.right) && (y >= elOffset.top)   && (y <= elOffset.bottom)) {
            el = element;
            return false;
        }
        var offsets = [[elOffset.left, elOffset.top], [elOffset.right, elOffset.top], [elOffset.left, elOffset.bottom], [elOffset.right, elOffset.bottom]];
        for (var off in offsets) {
            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            distance = Math.sqrt((dx*dx) + (dy*dy));
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                el = element;
            }
        }
    }
    return el;
};

module.exports = closestToOffset;
