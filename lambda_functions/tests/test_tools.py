import copy
import subprocess
from types import SimpleNamespace

import pytest

from src import config as cfg
from tools import batch_cogeotiff, cogeotiff, download_rasters


@pytest.fixture
def commands(monkeypatch):
    recorded = []
    monkeypatch.setattr(subprocess, "run", lambda command, **kwargs: recorded.append((command, kwargs)))
    return recorded


def test_download_rasters_builds_one_copy_per_dataset(commands):
    config = cfg.load_config()
    download_rasters.download_region(config, "north_atlantic", "/tmp/na")
    assert len(commands) == len(config["datasets"]["north_atlantic"])
    source = f"s3://{config['dataset_bucket']}/{config['datasets']['north_atlantic'][0]['path']}"
    assert commands[0] == (["aws", "s3", "cp", source, "/tmp/na"], {"check": True})


def test_download_rasters_main_rejects_unknown_region(commands):
    with pytest.raises(KeyError):
        download_rasters.main(["--dir", "/tmp/x", "--region", "atlantis"])


def test_cogeotiff_passes_a_hostile_filename_as_one_argument(commands, tmp_path):
    hostile = str(tmp_path / "a; rm -rf ~ $(whoami).tif")
    cogeotiff.main(["--convert_nodata", "-ext", "cog.tif", hostile])
    vrt = f"{hostile}.vrt"
    translate = commands[1][0]
    assert commands[0] == (["gdalbuildvrt", "-vrtnodata", "255", vrt, hostile], {"check": True})
    assert translate[0] == "gdal_translate" and translate[-2:] == [vrt, f"{hostile[:-4]}.cog.tif"]
    assert commands[2][0][0] == "gdaladdo"


def test_cogeotiff_moves_the_source_aside_when_it_would_overwrite_it(commands, tmp_path):
    src = tmp_path / "layer.tif"
    src.write_bytes(b"")
    cogeotiff.main([str(src)])
    assert not src.exists() and (tmp_path / "layer.tif.old").exists()
    assert commands[0][0][-2:] == [f"{src}.old", str(src)]


def test_cogeotiff_scale_reads_stats_from_the_source_path(monkeypatch):
    calls = []

    def fake_run(command, **kwargs):
        calls.append(command)
        return SimpleNamespace(stdout='{"stats": [{"min": 1, "max": 9}]}')

    monkeypatch.setattr(subprocess, "run", fake_run)
    assert cogeotiff.scale_options("/data/layer.tif") == ["-scale_1", "1", "9", "0", "254"]
    assert calls == [["rio", "info", "-v", "/data/layer.tif"]]


def test_cogeotiff_stops_when_a_gdal_command_fails(monkeypatch, tmp_path):
    def failing_run(command, **kwargs):
        raise subprocess.CalledProcessError(1, command)

    monkeypatch.setattr(subprocess, "run", failing_run)
    with pytest.raises(subprocess.CalledProcessError):
        cogeotiff.main(["-ext", "cog.tif", str(tmp_path / "layer.tif")])


def test_batch_cogeotiff_converts_matching_files_in_order(monkeypatch, tmp_path):
    for name in ["b.tif", "a.tif", "notes.txt"]:
        (tmp_path / name).write_bytes(b"")
    converted = []
    monkeypatch.setattr(cogeotiff, "main", converted.append)
    batch_cogeotiff.main([str(tmp_path)])
    assert converted == [["--convert_nodata", str(tmp_path / "a.tif")], ["--convert_nodata", str(tmp_path / "b.tif")]]


def test_prep_hubs_imports_and_reprojects():
    pytest.importorskip("fiona")
    pyproj = pytest.importorskip("pyproj")
    from tools import prep_hubs

    transformer = pyproj.Transformer.from_crs("epsg:26918", "epsg:4326", always_xy=True)
    polygon = {"type": "Polygon", "coordinates": [[[500000, 4400000], [500000, 4401000], [501000, 4400000], [500000, 4400000]]]}
    multi = {"type": "MultiPolygon", "coordinates": [copy.deepcopy(polygon["coordinates"])]}
    out = prep_hubs.transform_geom(polygon, transformer)
    assert out["coordinates"][0][0] == pytest.approx([-75.0, 39.7499], abs=1e-3)
    assert prep_hubs.transform_geom(multi, transformer)["coordinates"][0][0][0] == out["coordinates"][0][0]
    with pytest.raises(ValueError):
        prep_hubs.transform_geom({"type": "Point", "coordinates": [0, 0]}, transformer)
    assert set(prep_hubs.config) <= set(cfg.load_config()["regions"])


def test_prep_hubs_conform_feature_fills_the_schema():
    pytest.importorskip("fiona")
    from tools import prep_hubs

    feature = {"type": "Feature", "geometry": None, "properties": {"STATEFP": "45", "mean": {"exposure": 4.5, "sea_level_rise": 2.0, "lc_open_water": 10.0}}}
    props = prep_hubs.conform_feature(feature, "continental_us")["properties"]
    assert list(props) == list(prep_hubs.config["continental_us"]["schema"]["properties"])
    assert props["exposure"] == 4.5 and props["slr"] == 2.0 and props["hubs"] is None
    assert "mean" not in props and "lc_open_water" not in props
