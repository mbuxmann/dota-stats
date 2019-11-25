/**
 * This function creates object which draws
 * chart.
 * Usage:
 *     var chart = new myChart();
 *     chart.init('canvas');
 *
 * Author: numlock
 * email: faraslacks@gmail.com
 * Created: 26.11.14.
 */
function CircleChart() {

    var context = null;
    var canvasWidth = 270;
    var canvasHeight = 250;
    var lightColor = '#c2d56a';
    var darkColor = '#8abc4b';
    var inc = true;
    var mouseX = -10;
    var mouseY = -10;

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /**
     * Canvas width setter.
     * @param width
     */
    function setWidth(width) {
        canvasWidth = width;
    }

    /**
     * Canvas width getter.
     * @returns {number}
     */
    function getWidth() {
        return canvasWidth;
    }

    /**
     * Canvas height setter.
     * @param height
     */
    function setHeight(height) {
        canvasWidth = height;
    }

    /**
     * Canvas height getter.
     * @returns {number}
     */
    function getHeight() {
        return canvasHeight;
    }

    /**
     * Percentage setter.
     * @param percent
     */
    function setPercent(percent) {
        chartPercent = percent;
    }

    /**
     * Percentage getter.
     * @returns {number}
     */
    function getPercent() {
        return chartPercent;
    }

    function shadowOff() {
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    }

    function shadowOn() {
        context.shadowBlur = 7;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 4;
        context.shadowColor = 'black';
    }

    function drawText() {
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'normal bold 36px Ubuntu';
        context.fillStyle = "#ffffff"
        context.shadowBlur = 7;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 4;
        context.shadowColor = 'black';
        context.fillText(getPercent() + '%', canvasWidth / 2, canvasHeight / 2);
    }

    /**
     * Function draws chart by set params.
     */
    function draw() {
        shadowOff();

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        var x = canvasWidth / 2;
        var y = canvasHeight / 2;
        var startAngle = 1.5 * Math.PI;
        var stopAngle =  2 * (getPercent()/100) * Math.PI + startAngle;

        drawText();

        context.beginPath();

        context.arc(x, y, canvasHeight / 2.5, 0, 2 * Math.PI, false);
        context.strokeStyle = lightColor;
        context.lineWidth = 25; // TODO: Make a param.
        context.stroke();
        shadowOn();

        context.beginPath();

        context.arc(x, y, canvasHeight / 2.5, startAngle, stopAngle, false);
        context.strokeStyle = darkColor;
        context.lineWidth = 35; // TODO: Make a param.
        context.stroke();

        shadowOff();

        context.beginPath();
        context.arc(mouseX, mouseY, 3, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
    }

    function animate() {
        requestAnimFrame(animate);
        /*
        if (inc) {
            setPercent(getPercent() + 1);
            if (getPercent() > 100) {
                inc = false;
            }
        } else {
            setPercent(getPercent() - 1);
            if (getPercent() <= 0) {
                inc = true;
            }
        }
        */
        draw();
    }

    function enhanceContext(canvas, context) {
        // console.log(window.devicePixelRatio);
        var ratio = window.devicePixelRatio || 1,
            width = canvas.width,
            height = canvas.height;
        if (ratio > 1) {
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            context.scale(ratio, ratio);
        }
    }

    function setColors(lightCol, darkCol) {
        lightColor = lightCol;
        darkColor = darkCol;
    }

    function setCallbacks(canvasElement) {
        canvasElement.addEventListener('mousemove', function (event) {
            mouseX = event.x - canvasElement.offsetLeft;
            mouseY = event.y - canvasElement.offsetTop;
            // console.log(mouseX + ' ' + mouseY)
        });
        canvasElement.addEventListener('mouseout', function (event) {
            mouseX = -10;
            mouseY = -10;
        });
    }

    /**
     * Function init should be called after creation
     * by 'new'.
     * @param canvasId
     */
    function init(canvasId, initialPercent) {
        if (initialPercent != null) {
            setPercent(initialPercent)
        }
        var canvasElement = document.getElementById(canvasId);
        setCallbacks(canvasElement);
        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;
        context = canvasElement.getContext('2d');
        enhanceContext(canvasElement, context);
        animate();
    }

    return {
        init: init,
        setWidth: setWidth,
        getWidth: getWidth,
        setHeight: setHeight,
        getHeight: getHeight,
        getPercent: getPercent,
        setPercent: setPercent,
        setColors: setColors
    }

}