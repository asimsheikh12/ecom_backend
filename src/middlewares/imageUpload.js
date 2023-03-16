const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, 'public/uploads');
  },
  filename(_req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const upload = multer({ storage });
exports.uploadMultiple = upload.array('image', 8);
