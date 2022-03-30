import LoadingVideo from "./blots/video.js";

import "./quill.mediaUploader.css";

class VideoUploader {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.range = null;

        if (typeof this.options.upload !== "function")
            console.warn(
                "[Missing config] upload function that returns a promise is required"
            );

        var toolbar = this.quill.getModule("toolbar");
        toolbar.addHandler("video", this.selectLocalVideo.bind(this));

        this.handleDrop = this.handleDrop.bind(this);

        this.quill.root.addEventListener("drop", this.handleDrop, false);
        this.quill.root.addEventListener("paste", this.handlePaste, false);
    }

    selectLocalVideo() {
        this.range = this.quill.getSelection();
        this.fileHolder = document.createElement("input");
        this.fileHolder.setAttribute("type", "file");
        this.fileHolder.setAttribute("accept", "video/*");
        this.fileHolder.setAttribute("style", "visibility:hidden");

        this.fileHolder.onchange = this.fileChanged.bind(this);

        document.body.appendChild(this.fileHolder);

        this.fileHolder.click();

        window.requestAnimationFrame(() => {
            document.body.removeChild(this.fileHolder);
        });
    }

    handleDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (
            evt.dataTransfer &&
            evt.dataTransfer.files &&
            evt.dataTransfer.files.length
        ) {
            if (document.caretRangeFromPoint) {
                const selection = document.getSelection();
                const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(
                        range.startContainer,
                        range.startOffset,
                        range.startContainer,
                        range.startOffset
                    );
                }
            } else {
                const selection = document.getSelection();
                const range = document.caretPositionFromPoint(evt.clientX, evt.clientY);
                if (selection && range) {
                    selection.setBaseAndExtent(
                        range.offsetNode,
                        range.offset,
                        range.offsetNode,
                        range.offset
                    );
                }
            }

            this.range = this.quill.getSelection();
            let file = evt.dataTransfer.files[0];

            setTimeout(() => {
                this.range = this.quill.getSelection();
                this.readAndUploadFile(file);
            }, 0);
        }
    }

    readAndUploadFile(file) {
        let isUploadReject = false;

        const fileReader = new FileReader();

        fileReader.addEventListener(
            "load",
            () => {
                if (!isUploadReject) {
                    let videoSrc = fileReader.result;
                    this.insertVideo(videoSrc);
                }
            },
            false
        );

        if (file) {
            fileReader.readAsDataURL(file);
        }

        this.options.upload(file).then(
            (videoUrl) => {
                this.insertToEditor(videoUrl);
            },
            (error) => {
                isUploadReject = true;
                this.removeVideo();
                console.warn(error);
            }
        );
    }

    fileChanged() {
        const file = this.fileHolder.files[0];
        this.readAndUploadFile(file);
    }

    insertVideo(url) {
        const range = this.range;
        this.quill.insertEmbed(
            range.index,
            LoadingVideo.blotName,
            `${url}`,
            "user"
        );
    }

    insertToEditor(url) {
        const range = this.range;
        // Delete the placeholder image
        this.quill.deleteText(range.index, 3, "user");
        // Insert the server saved image
        this.quill.insertEmbed(range.index, "video", `${url}`, "user");

        range.index++;
        this.quill.setSelection(range, "user");
    }

    removeVideo() {
        const range = this.range;
        this.quill.deleteText(range.index, 3, "user");
    }
}

window.VideoUploader = VideoUploader;
export default VideoUploader;