import Quill from "quill";
import ImageUploader from "./quill.imageUploader.js";
import VideoUploader from "./quill.videoUploader.js";

Quill.debug("warn");
Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/videoUploader", VideoUploader);

const fullToolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    ["clean"],
    ["image", "video"],
];
var quill = new Quill("#editor", {
    theme: "snow",
    modules: {
        toolbar: {
            container: fullToolbarOptions,
        },
        imageUploader: {
            upload: file => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                    );
                  }, 3500);
                });
            }
        },
        videoUploader: {
            upload: file => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(
                      "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"
                    );
                  }, 3500);
                });
            }
        },
    },
});

quill.on("text-change", function(delta, oldDelta, source) {
    if (source == "api") {
        console.log("An API call triggered this change.");
    } else if (source == "user") {
        console.log("A user action triggered this change.");
    }
    console.log(oldDelta, delta);
});

quill.on("selection-change", function(range, oldRange, source) {
    if (range) {
        if (range.length == 0) {
            console.log("User cursor is on", range.index);
        } else {
            var text = quill.getText(range.index, range.length);
            console.log("User has highlighted", text);
        }
    } else {
        console.log("Cursor not in the editor");
    }
});