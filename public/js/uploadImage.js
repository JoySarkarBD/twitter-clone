/* selection */

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

imgUploader(imageInput, `1/1`, avatarImgTagEl);
imgUploader(coverImgInput, `16/9`, coverImgTagEl);
// 16/9

/* upload image */
uploadProfileImgBtn.addEventListener("click", function (e) {
  const fileName = imageInput?.files[0]?.name || `profileAvatar.png`;
  const canvas = cropper?.getCroppedCanvas();
  if (canvas) {
    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append("avatar", blob, fileName);

      const url = `${window.location.origin}/profile/avatar`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data._id) {
            window.location.reload();
          } else {
            alert("Upload Failed");
          }
        });
    });
  } else {
    alert("Please insert an Image");
  }
});

/* upload cover image*/

uploadCoverImgBtn.addEventListener("click", function (e) {
  const coverImgFileName = coverImgInput?.files[0]?.name;

  const canvas = cropper.getCroppedCanvas();
  if (canvas) {
    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append("coverPhoto", blob, coverImgFileName);
      const url = `${window.location.origin}/profile/coverphoto`;
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
