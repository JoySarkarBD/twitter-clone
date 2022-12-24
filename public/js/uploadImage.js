/* avatar image upload  selection*/
const imageInput = document.querySelector("input#updateInputAvatar");
const avatarImgTagEl = document.querySelector("img#avatarPreview");
const uploadProfileImgBtn = document.querySelector("button#saveAvatarImage");

/* cover image upload selection */
const coverImgInput = document.querySelector("input#updateInputCover");
const coverImgTagEl = document.querySelector("img#CoverPreview");
const uploadCoverImgBtn = document.querySelector("button#saveCoverImage");

/* global variable */
let cropper;

/* image cropped function */
function imgUploader(imgInputHandler, ratio, imgTag) {
  imgInputHandler.addEventListener("change", function (e) {
    const imageFile = this.files[0];
    if (this.files && imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgTag.src = this.result;
        cropper = new Cropper(imgTag, {
          aspectRatio: ratio,
          background: false,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  });
}
/* load profile avatar image  on cropper*/
imgUploader(imageInput, `1/1`, avatarImgTagEl);

/* load cover image  on cropper */
imgUploader(coverImgInput, `16/9`, coverImgTagEl);

/* image uploader [profile avatar || cover image] */
function uploadImage(uploadBtn, imgInput, filename, path) {
  uploadBtn.addEventListener("click", function (e) {
    const ImgFileName = imgInput?.files[0]?.name;
    const canvas = cropper.getCroppedCanvas();
    if (canvas) {
      canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append(filename, blob, ImgFileName);
        const url = `${window.location.origin}/profile/${path}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            if (data._id) {
              window.location.reload();
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    } else {
      alert("Image not Found");
    }
  });
}
/* upload profile avatar */
uploadImage(uploadProfileImgBtn, imageInput, `avatar`, `avatar`);

/* upload cover image */
uploadImage(uploadCoverImgBtn, coverImgInput, `coverPhoto`, `coverphoto`);
