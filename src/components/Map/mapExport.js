import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import { MAP_OVERLAY_CLASS } from "./MapOverlay.jsx";

export const EXPORT_FILE_NAME = "CREST Map.png";

const EXCLUDED_CLASSES = [MAP_OVERLAY_CLASS, "maplibregl-control-container"];

export const isExcludedFromExport = (element) =>
  EXCLUDED_CLASSES.some((name) => element.classList?.contains(name));

export const exportMapImage = async (map, fileName = EXPORT_FILE_NAME) => {
  const canvas = await html2canvas(map.getContainer(), {
    useCORS: true,
    backgroundColor: null,
    logging: false,
    ignoreElements: isExcludedFromExport,
  });
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      FileSaver.saveAs(blob, fileName);
      resolve();
    });
  });
};
