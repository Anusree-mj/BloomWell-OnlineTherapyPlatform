import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationPath;
        // Use custom destination if set
        if (req.customDestination) {
            console.log('license got')
            destinationPath = path.join(__dirname, `../public/${req.customDestination}`);
        } else {
            destinationPath = path.join(__dirname, '../public/profileImages'); // fallback path
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only image files and PDFs are allowed.'));
    }
};

export const upload = multer({ storage, fileFilter });
