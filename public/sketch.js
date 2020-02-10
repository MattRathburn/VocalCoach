//
//
//

let mic, fft;

var micOn = true;
var micToggle;
var micLevel;

// Happens first
function setup() {
    createCanvas(900, 500);

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    
    micToggle = createButton('Sound ON');
    micToggle.mousePressed(toggleMic);
}


// Happens constantly after setup()
function draw() {
    background(0);

    let spectrum = fft.analyze();
    noStroke();

    fill(0,255,0);

    for(var i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h);
    }

    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255, 0, 0);
    strokeWeight(1);
    //vertex(0, height);
    for (i = 0; i < spectrum.length; i++) {
        //vertex(1, map(spectrum[i], 0, 255, height, 0));
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }

    endShape();
}

function toggleMic() {
    if(micOn == true) {
        mic.stop();
        micOn = false;
        micToggle.html('Start Mic');
    } else {
        mic.start();
        micOn = true;
        micToggle.html('Stop Mic');
    }
}