window.onload = function () {

    //tutorial from https://github.com/gg-1414/music-visualizer/blob/master/index.html

    const file = document.getElementById("fileupload");
    const canvas = document.getElementById("canvas");
    const h3 = document.getElementById('filename')
    const audio = document.getElementById("audio");

    file.onchange = function () {

        const files = this.files; // FileList containing File objects selected by the user (DOM File API)
        console.log('FILES[0]: ', files[0])
        audio.src = URL.createObjectURL(files[0]); // Creates a DOMString containing the specified File object

        const name = files[0].name
        h3.innerText = `${name}` // Sets <h3> to the name of the file

        ///////// <CANVAS> INITIALIZATION //////////
        canvas.width = 0.8*window.innerWidth;
        canvas.height = 0.8*window.innerHeight;
        const ctx = canvas.getContext("2d");
        ///////////////////////////////////////////


        const context = new AudioContext(); // (Interface) Audio-processing graph
        let src = context.createMediaElementSource(audio); // Give the audio context an audio source,
        // to which can then be played and manipulated
        const analyser = context.createAnalyser(); // Create an analyser for the audio context

        src.connect(analyser); // Connects the audio context source to the analyser
        analyser.connect(context.destination); // End destination of an audio graph in a given context
        // Sends sound to the speakers or headphones


        /////////////// ANALYSER FFTSIZE ////////////////////////
        // analyser.fftSize = 32;
        // analyser.fftSize = 64;
        // analyser.fftSize = 128;
        // analyser.fftSize = 256;
        // analyser.fftSize = 512;
        // analyser.fftSize = 1024;
        // analyser.fftSize = 2048;
        // analyser.fftSize = 4096;
        // analyser.fftSize = 8192;
        analyser.fftSize = 16384;
        // analyser.fftSize = 32768;

        // (FFT) is an algorithm that samples a signal over a period of time
        // and divides it into its frequency components (single sinusoidal oscillations).
        // It separates the mixed signals and shows what frequency is a violent vibration.

        // (FFTSize) represents the window size in samples that is used when performing a FFT

        // Lower the size, the less bars (but wider in size)
        ///////////////////////////////////////////////////////////


        const bufferLength = analyser.frequencyBinCount; // (read-only property)
        // Unsigned integer, half of fftSize (so in this case, bufferLength = 8192)
        // Equates to number of data values you have to play with for the visualization

        // The FFT size defines the number of bins used for dividing the window into equal strips, or bins.
        // Hence, a bin is a spectrum sample, and defines the frequency resolution of the window.

        const dataArray = new Uint8Array(bufferLength); // Converts to 8-bit unsigned integer array
        // At this point dataArray is an array with length of bufferLength but no values
        console.log('DATA-ARRAY: ', dataArray) // Check out this array of frequency values!

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT)

        const barWidth = (WIDTH / bufferLength) * 13;
        console.log('BARWIDTH: ', barWidth)

        console.log('TOTAL WIDTH: ', (117 * 10) + (118 * barWidth)) // (total space between bars)+(total width of all bars)

        let barHeight;
        let x = 0;

        function renderFrame() {
            requestAnimationFrame(renderFrame); // Takes callback function to invoke before rendering

            x = 0;

            analyser.getByteFrequencyData(dataArray); // Copies the frequency data into dataArray
            // Results in a normalized array of values between 0 and 255
            // Before this step, dataArray's values are all zeros (but with length of 8192)

            ctx.fillStyle = "rgba(0,0,0,0.2)"; // Clears canvas before rendering bars (black with opacity 0.2)
            ctx.fillRect(0, 0, WIDTH, HEIGHT); // Fade effect, set opacity to 1 for sharper rendering of bars

            let r, g, b;
            let bars = 140; // Set total number of bars you want per frame

            for (let i = 0; i < bars; i++) {
                barHeight = (dataArray[i] * 2.5);

                //let me get my colours

                if (dataArray[i] <= 42.5) { // red
                    r = 255;
                    g = 0;
                    b = 0;
                } else if (dataArray[i] > 42.5 && dataArray[i] <= 85) { // orange
                    r = 255;
                    g = 128;
                    b = 0;
                } else if (dataArray[i] > 85 && dataArray[i] <= 127.5) { //yellow
                    r = 255;
                    g = 255;
                    b = 0;

                } else if (dataArray[i] > 127.5 && dataArray[i] <= 212.5) { //green
                    r = 0;
                    g = 255;
                    b = 0;

                } else if (dataArray[i] > 212.5 && dataArray[i] <= 212.5) { // blue
                    r = 0;
                    g = 128;
                    b = 255;
                } else { // violet
                    r = 127;
                    g = 0;
                    b = 255;
                }

                // if (i === 0){
                //   console.log(dataArray[i])
                // }

                ctx.fillStyle = `rgb(${r},${g},${b})`;
                //original for bars
                // ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight);
                ctx.fillRect(x, (HEIGHT - barHeight), 2, 2);

           

                // (x, y, i, j)
                // (x, y) Represents start point
                // (i, j) Represents end point

                x += barWidth + 10 // Gives 10px space between each bar
            }
        }

        audio.play();
        renderFrame();
    };
};