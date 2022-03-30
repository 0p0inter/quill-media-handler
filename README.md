# Quill mediaHandler Module

Based on ![quill-image-uploader](https://github.com/NoelOConnell/quill-image-uploader)

A module for Quill rich text editor to allow media (images and videos) to be uploaded to a server.
Adds a button to the toolbar for users to click, also handles drag,dropped and pasted images.

## Demo

[Image of Yaktocat](/static/quill-example.gif)

### Install

Install with npm:

```bash
npm install quill-media-uploader --save
```

### Webpack/ES6

```javascript
import Quill from "quill";
import ImageUploader from "quill.imageUploader.js";
import VideoUploader from "quill.videoUploader.js";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/videoUploader", VideoUploader);

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
            );
          }, 3500);
        });
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
  },
});
```

### Quickstart (React with react-quill)

React Example on [CodeSandbox](https://codesandbox.io/s/react-quill-demo-qr8xd)

### Quickstart (script tag)

Example on [CodeSandbox](https://codesandbox.io/s/mutable-tdd-lrsvh)

```javascript
// A link to quill.js
<script src="/dist/quill.js"></script>
<script src="/dist/quill.mediaUploader.min.js"></script>
<link href="/dist/quill.mediaUploader.min.css" rel="stylesheet" type="text/css" />

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/videoUploader", VideoUploader);

var quill = new Quill(editor, {
  // ...
  modules: {
    // ...
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
  }
});
```
