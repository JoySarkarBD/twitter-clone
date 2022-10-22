// Dependencies
const upload = require("multer-uploader");
const path = require('path')


function avatarUpload(req, res, next) {
    const uploadDirectory = path.join(__dirname, '/../../public/uploads');
    const maxFileSize = 10000000;
    const allowedMimeType = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg+xml' ];
    

    upload(uploadDirectory, maxFileSize, allowedMimeType).single("avatarProfile")(req, res, (err) => {
        
        if (err) {
            const user = req.body;

            const error = {
                avatarProfile: {
                    msg: err?.message
                },
                firstname: {
                    msg: "First name is required"
                }
            }
            
            res.render('pages/signup' ,{
                user,
                error
            })
        } else {
            next()
        }
    })
}



// Module Export
module.exports = avatarUpload;