PYTHON ?= python3
WHEELS = --platform manylinux2014_x86_64 --python-version 3.13 --implementation cp --abi cp313 --only-binary=:all:

define build_function
	$(PYTHON) -m pip install -q --upgrade $(WHEELS) --target "$(ARTIFACTS_DIR)" -r $(1)
	rm -rf "$(ARTIFACTS_DIR)/src"
	cp -R src "$(ARTIFACTS_DIR)/src"
	find "$(ARTIFACTS_DIR)" -name "__pycache__" -type d -prune -exec rm -rf {} +
	find "$(ARTIFACTS_DIR)/src" -name "*.local.vrt" -delete
endef

build-IdentifyFunction:
	$(call build_function,requirements.txt)

build-ZonalStatsFunction:
	$(call build_function,requirements.txt)

build-UploadShapeFunction:
	$(call build_function,requirements-light.txt)

build-ShareReadFunction:
	$(call build_function,requirements-light.txt)

build-ShareWriteFunction:
	$(call build_function,requirements-light.txt)
