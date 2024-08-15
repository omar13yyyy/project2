const express = require('express');
const commitsql = require('../../../database/commitsql')
const path = require("path");
const fs = require('fs');
const multer = require("multer");
const { canUploadImages,
    canEnterForm
 } = require('../../requestStatus')
const router = express.Router();

const storageEngine = multer.diskStorage({
    destination: "./images/b",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});


const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (/*mimeType &&*/ extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};


async function enterForm(req, res, next) {
    /*res =>   answers: [
    { idRequest: 15, idFormItem: 1, answer: 'a' },
    { idRequest: 15, idFormItem: 2, answer: 'aa' },
    { idRequest: 15, idFormItem: 3, answer: 'aaa' }
  ]

تم التعديل حسب شغل فريزة




    */

    console.log(req.body)

        if (await canEnterForm(req.body.answers[0].idRequest)) {

            for(let i =0 ; i < req.body.answers.length ; i++)
            await commitsql(`INSERT INTO "enteredForm" ("requestId","formItemId",answer,"createDate") VALUES ($1,$2,$3,$4) ON CONFLICT
            ("requestId","formItemId") DO UPDATE SET answer =$3`, [req.body.answers[i].idRequest, req.body.answers[i].idFormItem, req.body.answers[i].answer, new Date().toISOString()]);
            res.send("Done");

        } else
            res.status(400).send('condition error');


             
          try {  } catch {
        console.log("catch")
        res.status(400).send('catch');
    }
}

async function uploadImages(req, res, next) {

    try {
        if (await canUploadImages(req.body.idRequest)) {
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    await commitsql(`INSERT INTO "documentImage" ("imageUrl","requestId","createDate") VALUES ($1,$2,$3)`, [req.files[i].path, req.body.idRequest, new Date().toISOString()]);
                }
                let status = await commitsql(`Select status from request where id =$1`, [req.body.idRequest]);
                status = status.rows[0].status
                await commitsql(`UPDATE "sendTeam"  SET done = $1 WHERE requestid = $2`, [true, req.body.idRequest]);

                if ((status % 2) == 1) {
                    status -= 1;
                    //تم تحديد وقت زيارة
                }
                if (((status / 2) % 2) == 1) {
                    status -= 2;
                    //تمت الزيارة
                }
                else
                    await commitsql(`UPDATE request SET status = status + 2   where id =$1`, [req.body.idRequest])

                res.send("Done");

            } else
                res.status(400).send('please send any image');
        } else
            res.status(400).send('condition error');

    } catch {
        console.log("catch")
        res.status(400).send('catch');
    }
}


router.route('/enterForm').post(enterForm);
router.route('/uploadImages').post(upload.array("images"), uploadImages);
module.exports = router;