# Runtime shared libraries

`libexpat.so.1` is expat 2.8.3 from Amazon Linux 2023 (package `expat-2.8.3-1.amzn2023.0.1.x86_64`,
extracted 2026-10-05). The GDAL bundled in the rasterio wheel links to it as a system library, and the
Lambda Python 3.13 runtime no longer ships it. The Makefile copies this directory into every function
package; Lambda has `/var/task/lib` on its library path.
