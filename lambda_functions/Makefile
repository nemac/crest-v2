PYTHON ?= python3
WHEELS = --platform manylinux2014_x86_64 --python-version 3.13 --implementation cp --abi cp313 --only-binary=:all:

define build_function
	$(PYTHON) -m pip install -q --upgrade $(WHEELS) --target "$(ARTIFACTS_DIR)" -r $(1)
	rm -rf "$(ARTIFACTS_DIR)/src"
	cp -R src "$(ARTIFACTS_DIR)/src"
	rm -rf "$(ARTIFACTS_DIR)/lib"
	cp -R lib "$(ARTIFACTS_DIR)/lib"
	find "$(ARTIFACTS_DIR)" -name "__pycache__" -type d -prune -exec rm -rf {} +
	find "$(ARTIFACTS_DIR)/src" -name "*.local.vrt" -delete
endef

build-IdentifyFunction:
	$(call build_function,requirements.txt)

build-ZonalStatsFunction:
	$(call build_function,requirements.txt)

build-ShareReadFunction:
	$(call build_function,requirements-light.txt)

build-ShareWriteFunction:
	$(call build_function,requirements-light.txt)

# Regenerate the hash-locked requirements*.txt from requirements*.in (needs pip-tools in the venv).
LOCK = $(PYTHON) -m piptools compile -q --generate-hashes --strip-extras --no-emit-index-url

lock:
	$(LOCK) requirements.in -o requirements.txt
	$(LOCK) requirements-light.in -o requirements-light.txt
	$(LOCK) requirements-dev.in -o requirements-dev.txt
	$(LOCK) requirements-tools.in -o requirements-tools.txt

lint:
	$(PYTHON) -m ruff check .

.PHONY: lock lint
