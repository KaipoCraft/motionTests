// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let serial;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/dkgV5wkAF/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let oldlabel;
let confidence;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  serial = new p5.SerialPort();
  serial.list();
  serial.open('COM5');
  serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);

}

function setup() {
  createCanvas(500, 500);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(oldlabel, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  label = String(results[0].label);
  confidence = String(results[0].confidence);
  // console.log(results);
  if(label!= oldlabel && confidence > 0.97){
    oldlabel=label;
    console.log(confidence);
    
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  
  // console.log(label);
  if(label==="belvita"){
        serial.write(1);
    console.log("belvita");
      }
    
    if(label=="Blued"){
        serial.write(1);
    console.log("Blued");
      }
    
    if(label==="Enevp"){
        serial.write(1);
    console.log("Enevp");
      }
    
    if(label==="Pepsi"){
        serial.write(2);
    console.log("Pepsi");
      }
    if(label==="Celsius"){
        serial.write(2);
    console.log("Celsius");
      }
    if(label==="Bud"){
        serial.write(2);
    console.log("Bud");
      }
    if(label==="Plasticcup"){
        serial.write(2);
    console.log("Plasticcup");
      }
    if(label==="papcup"){
        serial.write(2);
    console.log("papcup");
      }
    if(label==="Cig"){
        serial.write(3);
    console.log("Cig");
      }
    if(label==="Tissue"){
        serial.write(4);
    console.log("Tissue");
      }
    if(label==="Egg shell"){
        serial.write(4);
    console.log("Egg shell");
      }
    if(label==="Place trash"){
        serial.write(5);
    console.log("Place trash");
      }
    
  }
  // Classifiy again!
    classifyVideo();
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}