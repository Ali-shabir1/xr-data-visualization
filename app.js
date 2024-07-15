// Fetch the dataset and process it using D3.js
d3.json('data.json').then(data => {
    processData(data);
});

function processData(data) {
    let matrix = [];
    data.data.forEach(item => {
        matrix.push([item.category, item.value]);
    });
    visualizeData(matrix);
}

function visualizeData(matrix) {
    const chartEntity = document.querySelector('#bar-chart');

    const barWidth = 1;
    const barDepth = 1;
    const gap = 0.5;

    matrix.forEach((d, i) => {
        const barHeight = d[1];

        // Create bar entity
        const bar = document.createElement('a-box');
        bar.setAttribute('position', `${i * (barWidth + gap)} ${barHeight / 2} 0`);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('depth', barDepth);
        bar.setAttribute('color', 'blue');
        bar.setAttribute('hoverable', '');
        bar.setAttribute('tooltip', `value: ${d[1]}, category: ${d[0]}`);
        chartEntity.appendChild(bar);
    });
}

// Define custom A-Frame components for hover and tooltip interactions
AFRAME.registerComponent('hoverable', {
    init: function () {
        const el = this.el;
        el.addEventListener('mouseenter', () => {
            el.setAttribute('color', 'orange');
        });
        el.addEventListener('mouseleave', () => {
            el.setAttribute('color', 'blue');
        });
    }
});

AFRAME.registerComponent('tooltip', {
    schema: { default: '' },
    init: function () {
        const el = this.el;
        const data = this.data;

        // Create tooltip text
        const tooltip = document.createElement('a-text');
        tooltip.setAttribute('value', data);
        tooltip.setAttribute('position', '0 2 1'); // Adjust position to be higher and forward above the bar
        tooltip.setAttribute('align', 'center');
        tooltip.setAttribute('visible', 'false');
        tooltip.setAttribute('color', 'black');
        tooltip.setAttribute('look-at', '#camera'); // Make tooltip face the camera

        // Create background rectangle for tooltip
        const tooltipBg = document.createElement('a-plane');
        tooltipBg.setAttribute('width', '3');
        tooltipBg.setAttribute('height', '1');
        tooltipBg.setAttribute('color', 'white');
        tooltipBg.setAttribute('opacity', '0.8');
        tooltipBg.setAttribute('position', '0 2 1'); // Adjust position to match the text position
        tooltipBg.setAttribute('visible', 'false');
        tooltipBg.setAttribute('look-at', '#camera'); // Make tooltip background face the camera

        el.appendChild(tooltipBg);
        el.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
            tooltip.setAttribute('visible', 'true');
            tooltipBg.setAttribute('visible', 'true');
        });
        el.addEventListener('mouseleave', () => {
            tooltip.setAttribute('visible', 'false');
            tooltipBg.setAttribute('visible', 'false');
        });
    }
});
