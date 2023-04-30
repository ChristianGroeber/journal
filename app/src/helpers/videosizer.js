// TODO: make sure only videos on the main page (no admin pages) are being resized.
// Maybe check if it's a child element of a day element
function resizeVideos() {
    const videos = getVideoElements();
    videos.map(renderVideo)
}

function renderVideo(video) {
    let videoStr = "<video controls>";
    videoStr += "<source src=\"" + video.src + "\">"
    videoStr += "</video>";

    const videoElement = htmlToElement(videoStr);

    video.parentElement.replaceChild(videoElement, video);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;

    return template.content.firstChild;
}

function getVideoElements() {
    const imgElements = getImgElements();
    const videos = [];
    for (const imgElement of imgElements) {
        if (isVideo(imgElement.src)) {
            videos.push(imgElement);
        }
    }

    return videos;
}

function isVideo(srcName) {
    const videoExtensions = ['mkv', 'mov', 'webm', 'mp4'];
    for (const ext of videoExtensions) {
        if (srcName.endsWith(ext)) {
            return true;
        }
    }

    return false;
}

function getImgElements() {
    return document.getElementsByTagName('img');
}

module.export = resizeVideos