import Quill from "quill";

const InlineBlot = Quill.import("blots/block");

class LoadingVideo extends InlineBlot {
    static create(src) {
        const node = super.create(src);
        if (src === true) return node;

        const video = document.createElement("iframe");
        video.setAttribute("src", src);
        node.appendChild(video);
        return node;
    }
    deleteAt(index, length) {
        super.deleteAt(index, length);
        this.cache = {};
    }
    static value(domNode) {
        const { src, custom } = domNode.dataset;
        return { src, custom };
    }
}

LoadingVideo.blotName = "videolot";
LoadingVideo.className = "media-uploading";
LoadingVideo.tagName = "span";
Quill.register({ "formats/videoBlot": LoadingVideo });

export default LoadingVideo;