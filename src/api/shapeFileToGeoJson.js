// import JSZip from 'jszip';

// // Shapefile library must be imported with require.
// const shapefile = require('shapefile');

// const readFileAsync = async (file, readFunc, resolveUndefinedFiles) => {
//   const promise = new Promise((resolve, reject) => {
//     if (file !== undefined) {
//       const fileReader = new FileReader();
//       fileReader.onload = (event) => {
//         resolve(event.target.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//       fileReader[readFunc](file);
//     } else if (resolveUndefinedFiles) {
//       resolve();
//     } else {
//       reject(new Error('No file specified.'));
//     }
//   });
//   return promise;
// };

// const getFileExtension = (filename) => filename.split('.').pop();

// const readZipFolders = (files) => {
//   const folders = { top: [] };
//   files.forEach((f) => {
//     let dir = f.name.split('/').slice(0, -1).join('');
//     if (!dir) dir = 'top';
//     if (!folders[dir]) folders[dir] = [];
//     folders[dir].push(f);
//   });
//   return folders;
// };

// const isValidFile = (file) => {
//   const validExts = ['geojson', 'json', 'shp', 'dbf', 'prj'];
//   const isValid = validExts.filter((ext) => ext === getFileExtension(file.name)).length;
//   return Boolean(isValid);
// };

// const readZip = async (archive) => {
//   const jszip = new JSZip();
//   let folders;
//   try {
//     folders = await jszip.loadAsync(archive).then(
//       (zip) => {
//         const files = [];
//         Object.keys(zip.files).forEach((key) => {
//           const entry = zip.files[key];
//           if (!entry.dir) files.push(entry);
//         });
//         return readZipFolders(files);
//       }
//     );
//   } catch (e) {
//     // alert('Error opening zip archive.');
//     folders = {};
//   }
//   const fileSets = [];
//   const keys = Object.keys(folders);
//   for (let i = 0; i < keys.length; i += 1) {
//     const key = keys[i];
//     const fileProms = folders[key]
//       .filter((file) => isValidFile(file))
//       .map((file) => {
//         try {
//           const filename = file.name.split('/').slice(-1).join('');
//           return file.async('blob').then(
//             (blob) => new File([blob], filename)
//           );
//         } catch (e) {
//           return null;
//         }
//       })
//     // filter undefined entries
//       .filter((prom) => prom);
//     const files = await Promise.all(fileProms);
//     fileSets.push(files);
//   }
//   return fileSets;
// };

// export const Shape2GeoJSON = async (file, readFunc = 'readAsArrayBuffer', resolveUndefinedFiles = true) => {
//   const fileExtension = getFileExtension(file.name);
//   if (fileExtension !== 'zip') {
//     return null;
//   }

//   // let zipContents = await readZip(file);
//   // // readZip returns array of arrays
//   // zipContents = zipContents[0];
//   // // filter returns arrays so take 0th element
//   // const shpFile = zipContents.filter((content) => getFileExtension(content.name) === 'shp')[0];
//   // const dbfFile = zipContents.filter((content) => getFileExtension(content.name) === 'dbf')[0];
//   // const shp = await readFileAsync(shpFile, readFunc, resolveUndefinedFiles);
//   // const dbf = await readFileAsync(dbfFile, readFunc, resolveUndefinedFiles);
//   // const geojson = await shapefile.read(shp, dbf);
//   // return geojson;
// };
