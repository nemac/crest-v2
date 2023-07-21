import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';

export const handleExportImage = async (chartType) => {
  const elId = `${chartType}-container`;
  await html2canvas(document.getElementById(elId), {
    logging: false,
    backgroundColor: null,
    useCORS: true, // Enable CORS to avoid cross-origin issues
    allowTaint: true, // Allow images from other domains
    useUnsafeCSS: true // Allow unsafe CSS (if needed)
  }).then((canvas) => {
    const png = canvas.toDataURL('image/png', 1.0);
    const fileName = `${chartType}.png`;
    FileSaver.saveAs(png, fileName);
  });
};
