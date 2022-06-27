let raindrops = '12Ɛ45789abcdefghijklmnopqrstuvwxyzｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ日: ." = * + - <> '.split('');

let container = document.getElementById('container');
container.width = window.innerWidth;
container.height = window.innerHeight;
let ctx = container.getContext('2d');

let rows = Math.floor(container.height / 18);
let cols = Math.floor(container.width / 18);

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, container.width, container.height);
    ctx.font = 18 + 'px monospace';


    //get random vertical position
    function randomVericalPosition() { // min and max included 
        return 18 * (Math.floor(Math.random() * (cols + 1);
    }

    for (let k = 0; k < cols; k++) {
        for (let i = 0; i < rows; i++) {
            let randomDropIndex = Math.floor(Math.random() * raindrops.length);
            console.log(randomDropIndex);
            ctx.fillText(raindrops[randomDropIndex], k * 18, randomVericalPosition());
            ctx.fillStyle = '#0F0';
        }
    }
}

setInterval(draw, 30)
