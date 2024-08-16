const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

module.exports.UploadImage = async(req, res) => {
    try {
        console.log(req);
        
        const image = req.file;

        const { originalname, mimetype, buffer } = image;


        cloudinary.uploader.upload_stream((error, result) => {
            if(error) throw error;

            const { public_id } = result;
            
            const url = cloudinary.url(public_id, {
                width : 650,
                height : 450,
                crop : "fill"
            });

            const data = {
                name : originalname,
                type : mimetype,
                url : url,
                public_id : public_id
            }

            console.log("Uploaded image data: ", data);

            res.send({
                message : "Image uploaded sucesssfully",
                imageURL : data.url
            })
        }).end(buffer);

    } catch(error) {
        console.error(error);

        res.status(500)
           .send({ message : "Internal server error"});

        throw error;
    }
}