import { Button, Flex, Slider, Typography } from "antd";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/getCroppedImg";
import styles from "./CropperImg.module.scss";
import { useDispatch } from "react-redux";
import { addFoto } from "../../store";

export const CropperImg = ({ img, isEdit = false }) => {
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  console.log(croppedImage, "croppedImage!!!!");

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  console.log(img, "img!!!!!!!!!!");

  const showCroppedImage = async () => {
    try {
      const blob = await getCroppedImg(img, croppedAreaPixels, rotation);

      const file = new File([blob], "cropped.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const fileListFormat = {
        file: {
          uid: file.uid || `${Date.now()}`,
        },
        fileList: [
          {
            uid: file.uid || `${Date.now()}`,
            lastModified: file.lastModified,
            lastModifiedDate: new Date(file.lastModified),
            name: file.name,
            size: file.size,
            type: file.type,
            percent: 0,
            originFileObj: file,
          },
        ],
      };

      setCroppedImage(fileListFormat);
      dispatch(addFoto(fileListFormat));
    } catch (e) {
      console.error("Ошибка обрезки", e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div>
      <div className={styles.cropContainer}>
        <Cropper
          image={img}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={3 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <Flex vertical style={{ paddingTop: "10px" }}>
        <div>
          <Flex justify="space-between" align="center">
            <Typography variant="overline" className={styles.sliderLabel}>
              Вращение изображения
            </Typography>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              type="primary"
              className={styles.cropButton}
            >
              Обрезать
            </Button>
          </Flex>

          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            onChange={(val) => setRotation(val)}
          />
        </div>
      </Flex>
    </div>
  );
};
