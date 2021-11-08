objects = [];
status_ = "";
alarm = "alert_noise.wav";

function preload() {
  alarm = loadSound("alert_noise.wav");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!");
  status_ = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status_ != "")
      {
        r = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          fill(r);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x+20, objects[i].y+20);
          noFill();
          stroke(r);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if(objects[i].label == "person") {
            document.getElementById("number_objects").innerHTML = "Baby/babies Found";
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            alarm.stop();
          } else {
            document.getElementById("number_objects").innerHTML = "Baby no where to be seen";
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            alarm.play();
          }
        }
      }
}
