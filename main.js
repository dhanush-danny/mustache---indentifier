nose_x = "";
nose_y = "";

left_eye_x="";
left_eye_y="";
right_eye_x="";
right_eye_y="";

function preload() {
    mus_img = loadImage("m.png");
}

function setup() {
    canvas = createCanvas(450, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 400);
    video.hide();
    posenet_model = ml5.poseNet(video, model_loaded);
    posenet_model.on("pose", get_result);
}

function draw() {
    image(video, 0, 0, 450, 400);
image(mus_img,nose_x-48,nose_y,100,50);
    noFill();
    stroke("black");
    strokeWeight(3);
    circle(left_eye_x+5,left_eye_y,50);
    circle(right_eye_x+5,right_eye_y,50);
    line(right_eye_x+25,right_eye_y,left_eye_x-18,left_eye_y);
}

function get_result(result) {
    if (result.length > 0) {
         console.log(result)
        nose_x = result[0].pose.nose.x;
        nose_y = result[0].pose.nose.y;
        left_eye_x=result[0].pose.leftEye.x;
        left_eye_y=result[0].pose.leftEye.y;
        right_eye_x=result[0].pose.rightEye.x;
        right_eye_y=result[0].pose.rightEye.y;
        // console.log("nose x is", nose_x);
        // console.log("nose y is", nose_y);
    }
}

function take_pic() {
    save("your picture.png");
}

function model_loaded() {
    console.log("pose net model loaded successfuly");
}